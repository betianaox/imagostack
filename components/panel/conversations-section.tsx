"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { Dictionary } from "@/lib/dictionaries";
import { useSession } from "@/lib/store/session";
import {
  selectCurrentConversation,
  usePanel,
  type PanelConversation,
} from "@/lib/store/panel";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CONVERSACIONES
 * ─────────────────────────────────────────────────────────────────────────────
 * Este módulo aporta tres piezas al panel:
 *
 *   useConversationsFeed   el listener, montado una sola vez
 *   ConversationsNav       la lista, que va como hijos del menú lateral
 *   ConversationsSection   el chat, que ocupa el área grande
 *
 * Están separadas porque viven en lugares distintos de la pantalla, y juntas
 * en un archivo porque miran los mismos datos. Lo que las conecta es el store
 * del panel, no props: el caparazón es genérico y no sabe de conversaciones.
 *
 * Todo es en tiempo real por listeners de Firestore: tomar una conversación se
 * refleja en el navegador del visitante al instante, sin servidor en el medio.
 */

type Message = {
  id: string;
  role: "user" | "assistant";
  by?: "bot" | "operator" | null;
  text: string;
  at: number;
};

/** Minutos sin escribir tras los cuales la conversación vuelve sola al bot. */
const OPERATOR_TIMEOUT_MINUTES = 5;

/**
 * Reloj compartido. Los estados dependen del paso del tiempo —"hace 3m", "sin
 * actividad"— y sin un tick quedarían congelados hasta que algo más provocara
 * un re-render. Leer la hora al pintar, además, haría impuro el render.
 */
function useNow(): number {
  const [now, setNow] = useState(0);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return now;
}

/**
 * Trae las conversaciones al store. Se monta en la composición del panel, no
 * en el menú: si viviera en la lista, plegar el grupo cortaría el listener y
 * el chat abierto se quedaría sin su conversación.
 */
export function useConversationsFeed() {
  const allowed = useSession((state) => state.canOperate);
  const setConversations = usePanel((state) => state.setConversations);

  useEffect(() => {
    if (!allowed) return;
    let stop: (() => void) | undefined;

    (async () => {
      const [{ getDb }, firestore] = await Promise.all([
        import("@/lib/firebase/client"),
        import("firebase/firestore"),
      ]);

      const ref = firestore.query(
        firestore.collection(getDb(), COLLECTIONS.conversations),
        firestore.orderBy("updatedAt", "desc"),
        firestore.limit(50),
      );

      stop = firestore.onSnapshot(ref, (snapshot) => {
        setConversations(
          snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              ownerId: String(data.ownerId ?? ""),
              mode: data.mode === "operator" ? "operator" : "bot",
              lang: String(data.lang ?? "es"),
              operatorId: data.operatorId ?? null,
              operatorSeenAt: data.operatorSeenAt ?? null,
              updatedAtMs: data.updatedAt?.toMillis?.() ?? 0,
            };
          }),
        );
      });
    })();

    return () => stop?.();
  }, [allowed, setConversations]);
}

// ── Lista, dentro del menú lateral ──────────────────────────────────────────

/**
 * Las conversaciones como hijos del grupo del menú. Se despliegan y se pliegan
 * con él, así que cuando no hacen falta no ocupan pantalla.
 */
export function ConversationsNav({ dict }: { dict: Dictionary }) {
  const panel = dict.panel;
  const uid = useSession((state) => state.user?.uid);
  const conversations = usePanel((state) => state.conversations);
  const selectedId = usePanel((state) => state.selectedId);
  const select = usePanel((state) => state.select);
  const now = useNow();

  if (conversations === null) {
    return <p className="px-3 py-2 text-xs text-ink/45">{panel.loading}</p>;
  }

  if (conversations.length === 0) {
    return (
      <div className="px-3 py-2">
        <p className="text-xs text-ink/55">{panel.empty}</p>
        <p className="mt-1 text-[11px] text-ink/40">{panel.emptyHint}</p>
      </div>
    );
  }

  return (
    <ul className="max-h-80 overflow-y-auto">
      {conversations.map((conversation) => (
        <li key={conversation.id}>
          <button
            type="button"
            onClick={() => select(conversation.id)}
            aria-current={conversation.id === selectedId}
            className={`flex w-full flex-col items-start gap-1 rounded-xl px-2.5 py-2 text-left transition ${
              conversation.id === selectedId
                ? "bg-brand-50"
                : "hover:bg-brand-50/60"
            }`}
          >
            <span className="flex w-full items-center justify-between gap-2">
              <StateBadge
                conversation={conversation}
                uid={uid}
                panel={panel}
                now={now}
              />
              <span className="shrink-0 text-[10px] text-ink/40 tabular-nums">
                {formatTime(conversation.updatedAtMs, now)}
              </span>
            </span>
            <span className="truncate font-mono text-[10px] text-ink/45">
              {conversation.id.slice(0, 10)} · {conversation.lang}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

// ── Chat, en el área grande ─────────────────────────────────────────────────

export function ConversationsSection({ dict }: { dict: Dictionary }) {
  const panel = dict.panel;
  const user = useSession((state) => state.user);
  const allowed = useSession((state) => state.canOperate);

  const selectedId = usePanel((state) => state.selectedId);
  const selected = usePanel(selectCurrentConversation);
  const now = useNow();

  const [draft, setDraft] = useState("");
  const threadRef = useRef<HTMLDivElement>(null);

  /**
   * Los mensajes van atados a su conversación en el mismo estado: al cambiar
   * de hilo se derivan vacíos, sin limpiarlos desde un efecto y sin que
   * aparezcan por un instante los del anterior.
   */
  const [thread, setThread] = useState<{ id: string; messages: Message[] }>({
    id: "",
    messages: [],
  });

  useEffect(() => {
    if (!allowed || !selectedId) return;
    let stop: (() => void) | undefined;

    (async () => {
      const [{ getDb }, firestore] = await Promise.all([
        import("@/lib/firebase/client"),
        import("firebase/firestore"),
      ]);

      const ref = firestore.query(
        firestore.collection(
          getDb(),
          COLLECTIONS.conversations,
          selectedId,
          COLLECTIONS.messages,
        ),
        firestore.orderBy("at", "asc"),
      );

      stop = firestore.onSnapshot(ref, (snapshot) => {
        setThread({
          id: selectedId,
          messages: snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              role: data.role === "user" ? "user" : "assistant",
              by: data.by ?? null,
              text: String(data.text ?? ""),
              at: Number(data.at ?? 0),
            };
          }),
        });
      });
    })();

    return () => stop?.();
  }, [allowed, selectedId]);

  const messages = thread.id === selectedId ? thread.messages : [];
  const isMine = Boolean(selected && selected.operatorId === user?.uid);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight });
  }, [thread]);

  // ── Acciones ──────────────────────────────────────────────────────────────
  const setMode = useCallback(
    async (conversation: PanelConversation, mode: "bot" | "operator") => {
      const [{ getDb }, firestore] = await Promise.all([
        import("@/lib/firebase/client"),
        import("firebase/firestore"),
      ]);

      await firestore.updateDoc(
        firestore.doc(getDb(), COLLECTIONS.conversations, conversation.id),
        {
          mode,
          operatorId: mode === "operator" ? (user?.uid ?? null) : null,
          operatorSeenAt: Date.now(),
          updatedAt: firestore.serverTimestamp(),
        },
      );
    },
    [user?.uid],
  );

  const send = useCallback(async () => {
    const text = draft.trim();
    if (!text || !selected) return;

    setDraft("");

    const [{ getDb }, firestore] = await Promise.all([
      import("@/lib/firebase/client"),
      import("firebase/firestore"),
    ]);
    const db = getDb();

    // `ownerId` es el del visitante, no el mío: es lo que permite que su
    // consulta filtrada encuentre este mensaje y que las reglas lo dejen leer.
    await firestore.addDoc(
      firestore.collection(
        db,
        COLLECTIONS.conversations,
        selected.id,
        COLLECTIONS.messages,
      ),
      {
        ownerId: selected.ownerId,
        role: "assistant",
        by: "operator",
        text: text.slice(0, 5000),
        at: Date.now(),
      },
    );

    // Renueva el turno: sin esto la conversación volvería sola al bot.
    await firestore.updateDoc(
      firestore.doc(db, COLLECTIONS.conversations, selected.id),
      { operatorSeenAt: Date.now(), updatedAt: firestore.serverTimestamp() },
    );
  }, [draft, selected]);

  return (
    /*
      Altura acotada a propósito: si el bloque creciera con los mensajes, la
      página entera se estiraría y habría que scrollear el documento para leer
      lo último. Acá el alto es fijo y lo que scrollea es el hilo por dentro.
    */
    <div className="flex h-[calc(100vh-17rem)] min-h-96 flex-col overflow-hidden rounded-2xl border border-brand-500/10 bg-white">
      {!selected ? (
        <div className="grid flex-1 place-items-center p-8 text-sm text-ink/50">
          {panel.selectOne}
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-500/10 px-4 py-3">
            <span className="flex items-center gap-2.5">
              <StateBadge
                conversation={selected}
                uid={user?.uid}
                panel={panel}
                now={now}
              />
              <span className="font-mono text-[11px] text-ink/45">
                {selected.id.slice(0, 10)} · {selected.lang}
              </span>
            </span>

            <button
              type="button"
              onClick={() =>
                setMode(
                  selected,
                  selected.mode === "operator" ? "bot" : "operator",
                )
              }
              className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                selected.mode === "operator"
                  ? "border border-brand-500/20 text-brand-700 hover:bg-brand-50"
                  : "bg-coral-500 text-white hover:bg-coral-600"
              }`}
            >
              {selected.mode === "operator" ? panel.release : panel.take}
            </button>
          </div>

          <div ref={threadRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message) => (
              <PanelMessage key={message.id} message={message} panel={panel} />
            ))}
          </div>

          <div className="border-t border-brand-500/10 p-3">
            {isMine && selected.mode === "operator" ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void send();
                }}
                className="flex items-end gap-2"
              >
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void send();
                    }
                  }}
                  rows={1}
                  maxLength={5000}
                  placeholder={panel.placeholder}
                  className="max-h-28 flex-1 resize-none rounded-xl border border-brand-500/20 px-3.5 py-2.5 text-sm transition focus:border-brand-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  aria-label={panel.send}
                  className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-700 disabled:opacity-40"
                >
                  <Icon name="arrowRight" className="size-4.5" />
                </button>
              </form>
            ) : (
              <p className="px-1 py-1.5 text-center text-xs text-ink/50">
                {panel.takeFirst}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/** Color y texto del estado, que es lo que se mira de un vistazo. */
function StateBadge({
  conversation,
  uid,
  panel,
  now,
}: {
  conversation: PanelConversation;
  uid?: string;
  panel: Dictionary["panel"];
  /** Reloj del componente padre: leer la hora acá haría impuro el render */
  now: number;
}) {
  const mine = conversation.operatorId === uid;
  const stale =
    conversation.mode === "operator" &&
    now - (conversation.operatorSeenAt ?? 0) >
      OPERATOR_TIMEOUT_MINUTES * 60_000;

  if (conversation.mode === "bot") {
    return <Badge tone="green">{panel.modeBot}</Badge>;
  }
  if (stale) {
    return <Badge tone="amber">{panel.expiring}</Badge>;
  }
  return (
    <Badge tone={mine ? "blue" : "gray"}>
      {mine ? panel.modeMine : panel.modeOther}
    </Badge>
  );
}

function Badge({
  tone,
  children,
}: {
  tone: "green" | "blue" | "amber" | "gray";
  children: React.ReactNode;
}) {
  const tones = {
    green: "bg-emerald-50 text-emerald-700",
    blue: "bg-brand-50 text-brand-700",
    amber: "bg-amber-50 text-amber-700",
    gray: "bg-ink/5 text-ink/55",
  };

  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function PanelMessage({
  message,
  panel,
}: {
  message: Message;
  panel: Dictionary["panel"];
}) {
  const fromVisitor = message.role === "user";
  const author = fromVisitor
    ? panel.visitor
    : message.by === "operator"
      ? panel.you
      : panel.bot;

  return (
    <div className={fromVisitor ? "flex justify-start" : "flex justify-end"}>
      <div className="max-w-[80%]">
        <p
          className={`mb-1 text-[11px] font-medium text-ink/45 ${
            fromVisitor ? "" : "text-right"
          }`}
        >
          {author}
        </p>
        <div
          className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
            fromVisitor
              ? "rounded-bl-md bg-ink/5 text-ink/85"
              : message.by === "operator"
                ? "rounded-br-md bg-brand-600 text-white"
                : "rounded-br-md bg-brand-50 text-ink/85"
          }`}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
}

function formatTime(ms: number, now: number): string {
  if (!ms || !now) return "";
  const minutes = Math.floor((now - ms) / 60_000);
  if (minutes < 1) return "ahora";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

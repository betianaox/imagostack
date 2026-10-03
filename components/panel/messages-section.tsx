"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { fillText, type Dictionary } from "@/lib/dictionaries";
import { useSession } from "@/lib/store/session";
import { usePanel, type PanelInquiry } from "@/lib/store/panel";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SECCIÓN: MENSAJES
 * ─────────────────────────────────────────────────────────────────────────────
 * Las consultas del formulario de contacto. El servidor las manda por correo y
 * además las guarda en `inquiries`; acá se leen y se marcan como leídas.
 *
 *   useInquiriesFeed   los listeners, montados una sola vez en el panel
 *   MessagesSection    la bandeja: lista y mensaje abierto
 *
 * El listener vive en la composición y no en la sección por lo mismo que el de
 * conversaciones: el contador de sin leer del menú tiene que moverse aunque la
 * sección esté cerrada, que es justamente cuando sirve.
 */

/** Cuántos mensajes trae la lista. El contador de sin leer no tiene techo. */
const LIST_LIMIT = 100;

/**
 * Trae los mensajes y el número de sin leer al store, en tiempo real.
 *
 * Son dos consultas a propósito: la lista corta en los últimos cien, y un
 * mensaje viejo que nadie abrió tiene que seguir sumando en el contador.
 */
export function useInquiriesFeed() {
  const allowed = useSession((state) => state.canOperate);
  const setInquiries = usePanel((state) => state.setInquiries);
  const setUnreadInquiries = usePanel((state) => state.setUnreadInquiries);

  useEffect(() => {
    if (!allowed) return;
    const stops: (() => void)[] = [];
    let cancelled = false;

    (async () => {
      const [{ getDb }, firestore] = await Promise.all([
        import("@/lib/firebase/client"),
        import("firebase/firestore"),
      ]);
      if (cancelled) return;

      const collection = firestore.collection(getDb(), COLLECTIONS.inquiries);

      stops.push(
        firestore.onSnapshot(
          firestore.query(
            collection,
            firestore.orderBy("createdAt", "desc"),
            firestore.limit(LIST_LIMIT),
          ),
          (snapshot) => {
            setInquiries(
              snapshot.docs.map((docSnap) => {
                const data = docSnap.data();
                return {
                  id: docSnap.id,
                  name: String(data.name ?? ""),
                  email: String(data.email ?? ""),
                  about: String(data.about ?? ""),
                  message: String(data.message ?? ""),
                  read: data.read === true,
                  createdAtMs: data.createdAt?.toMillis?.() ?? 0,
                };
              }),
            );
          },
          (error) => console.warn("Panel: no se pudieron leer los mensajes", error),
        ),
      );

      stops.push(
        firestore.onSnapshot(
          firestore.query(collection, firestore.where("read", "==", false)),
          (snapshot) => setUnreadInquiries(snapshot.size),
          (error) => console.warn("Panel: no se pudo contar los sin leer", error),
        ),
      );
    })();

    return () => {
      cancelled = true;
      stops.forEach((stop) => stop());
    };
  }, [allowed, setInquiries, setUnreadInquiries]);
}

export function MessagesSection({ dict }: { dict: Dictionary }) {
  const panel = dict.panel;
  const uid = useSession((state) => state.user?.uid ?? null);
  const inquiries = usePanel((state) => state.inquiries);
  const unread = usePanel((state) => state.unreadInquiries);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const selected = inquiries?.find((item) => item.id === selectedId) ?? null;

  const setRead = async (inquiry: PanelInquiry, read: boolean) => {
    setError(false);
    try {
      const [{ getDb }, firestore] = await Promise.all([
        import("@/lib/firebase/client"),
        import("firebase/firestore"),
      ]);
      await firestore.updateDoc(
        firestore.doc(getDb(), COLLECTIONS.inquiries, inquiry.id),
        read
          ? { read: true, readBy: uid, readAt: firestore.serverTimestamp() }
          : { read: false, readBy: null, readAt: null },
      );
    } catch (cause) {
      console.warn("Panel: no se pudo actualizar el mensaje", cause);
      setError(true);
    }
  };

  // Abrirlo es leerlo: no hace falta un botón aparte para lo que pasa siempre.
  const open = (inquiry: PanelInquiry) => {
    setSelectedId(inquiry.id);
    if (!inquiry.read) void setRead(inquiry, true);
  };

  return (
    <div className="flex h-[calc(100dvh-13rem)] min-h-96 md:h-[calc(100vh-17rem)] flex-col overflow-hidden rounded-2xl border border-brand-500/10 bg-white">
      <div className="flex shrink-0 items-start justify-between gap-3 border-b border-brand-500/10 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-ink">
            {panel.sections.messages}
          </p>
          <p className="mt-0.5 text-xs text-ink/50">{panel.messagesIntro}</p>
        </div>
        {unread > 0 && (
          <span className="shrink-0 rounded-full bg-coral-50 px-2.5 py-1 text-[11px] font-semibold text-coral-700 tabular-nums">
            {fillText(panel.unreadCount, { count: unread })}
          </span>
        )}
      </div>

      {error && (
        <p className="shrink-0 border-b border-coral-500/20 bg-coral-50 px-4 py-2.5 text-xs text-coral-700">
          {panel.messageError}
        </p>
      )}

      {inquiries === null && (
        <p className="p-4 text-sm text-ink/50">{panel.loading}</p>
      )}

      {inquiries?.length === 0 && (
        <div className="grid flex-1 place-items-center p-8">
          <div className="max-w-sm text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-700">
              <Icon name="mail" className="size-5.5" />
            </span>
            <p className="mt-4 text-sm text-ink/65">{panel.messagesEmpty}</p>
            <p className="mt-1 text-xs text-ink/45">{panel.messagesEmptyHint}</p>
          </div>
        </div>
      )}

      {inquiries && inquiries.length > 0 && (
        /*
          En escritorio, lista y mensaje lado a lado. En el celular no caben
          los dos: con uno abierto se ve solo el mensaje, y "Volver" regresa.
        */
        <div className="grid min-h-0 flex-1 md:grid-cols-[18rem_1fr]">
          <ul
            className={`min-h-0 overflow-y-auto overscroll-contain md:border-r md:border-brand-500/10 ${
              selected ? "hidden md:block" : ""
            }`}
          >
            {inquiries.map((inquiry) => (
              <li key={inquiry.id}>
                <button
                  type="button"
                  onClick={() => open(inquiry)}
                  aria-current={inquiry.id === selectedId}
                  className={`flex w-full gap-2.5 border-b border-brand-500/5 px-4 py-3 text-left transition ${
                    inquiry.id === selectedId
                      ? "bg-brand-50"
                      : "hover:bg-brand-50/60"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mt-1.5 size-2 shrink-0 rounded-full ${
                      inquiry.read ? "bg-transparent" : "bg-coral-500"
                    }`}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span
                        className={`truncate text-sm ${
                          inquiry.read
                            ? "font-medium text-ink/70"
                            : "font-semibold text-ink"
                        }`}
                      >
                        {inquiry.name || inquiry.email}
                      </span>
                      <span className="shrink-0 text-[10px] text-ink/40 tabular-nums">
                        {formatShort(inquiry.createdAtMs)}
                      </span>
                    </span>
                    {inquiry.about && (
                      <span className="mt-0.5 block truncate text-[11px] font-medium text-brand-700">
                        {inquiry.about}
                      </span>
                    )}
                    <span
                      className={`mt-0.5 line-clamp-2 text-[11px] leading-snug ${
                        inquiry.read ? "text-ink/45" : "text-ink/65"
                      }`}
                    >
                      {inquiry.message}
                    </span>
                    {!inquiry.read && (
                      <span className="sr-only">{panel.unread}</span>
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div
            className={`min-h-0 overflow-y-auto ${selected ? "" : "hidden md:block"}`}
          >
            {selected ? (
              <article className="p-4 md:p-6">
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="mb-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-700 md:hidden"
                >
                  <Icon name="chevronLeft" className="size-4" />
                  {panel.backToList}
                </button>

                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold tracking-tight text-ink">
                      {selected.name}
                    </h2>
                    <p className="truncate text-sm text-ink/55">
                      {selected.email}
                    </p>
                    <p className="mt-1 text-xs text-ink/40">
                      {formatLong(selected.createdAtMs)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => void setRead(selected, false)}
                      disabled={!selected.read}
                      className="min-h-10 rounded-xl border border-brand-500/20 px-3 text-xs font-semibold text-ink/70 transition hover:bg-brand-50 disabled:opacity-40"
                    >
                      {panel.markUnread}
                    </button>
                    <a
                      href={replyHref(selected, panel.replySubject)}
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-brand-600 px-3 text-xs font-semibold text-white transition hover:bg-brand-700"
                    >
                      <Icon name="mail" className="size-4" />
                      {panel.reply}
                    </a>
                  </div>
                </div>

                {selected.about && (
                  <p className="mt-4 text-xs text-ink/50">
                    {panel.messageAbout}:{" "}
                    <span className="font-semibold text-brand-700">
                      {selected.about}
                    </span>
                  </p>
                )}

                <div className="mt-4 border-l-3 border-coral-500 pl-4 text-sm leading-relaxed whitespace-pre-wrap text-ink">
                  {selected.message}
                </div>
              </article>
            ) : (
              <p className="grid h-full place-items-center p-8 text-sm text-ink/45">
                {panel.messagesSelect}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function replyHref(inquiry: PanelInquiry, fallback: string): string {
  const subject = `Re: ${inquiry.about || fallback}`;
  return `mailto:${inquiry.email}?subject=${encodeURIComponent(subject)}`;
}

/** Hoy, la hora; antes, el día. En el idioma del navegador de quien lee. */
function formatShort(ms: number): string {
  if (!ms) return "";
  const date = new Date(ms);
  const today = new Date().toDateString() === date.toDateString();
  return today
    ? date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
    : date.toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

function formatLong(ms: number): string {
  if (!ms) return "";
  return new Date(ms).toLocaleString(undefined, {
    dateStyle: "long",
    timeStyle: "short",
  });
}

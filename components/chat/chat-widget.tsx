"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { OPEN_CHAT_EVENT } from "@/components/chat/open-chat-link";
import { useConversation } from "@/components/chat/use-conversation";
import { Icon } from "@/components/icons";
import { Inline } from "@/components/rich-text";
import type { Dictionary } from "@/lib/dictionaries";
import { path, type Locale } from "@/lib/i18n";

type Bubble = {
  id: string;
  role: "user" | "assistant";
  text: string;
  at: number;
  /** Estado especial: el bot no pudo responder y hay que derivar */
  handoff?: boolean;
  /** Lo escribió una persona del equipo, no el bot */
  fromOperator?: boolean;
};

/**
 * Widget de chat. Habla con `/api/chat` por SSE y va pintando la respuesta a
 * medida que llega.
 *
 * Se monta en todas las páginas pero no carga nada hasta que alguien lo abre:
 * el componente es liviano y la conversación arranca vacía.
 */
export function ChatWidget({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const chat = dict.chat;
  const [open, setOpen] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [streaming, setStreaming] = useState("");

  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // La persistencia se activa recién al abrir el chat: hasta entonces no se
  // carga nada de Firebase.
  const conversation = useConversation(lang, open);
  const attended = conversation.mode === "operator";

  // Hilo visible: lo local más lo que escribió el operador, en orden temporal
  const thread: Bubble[] = [
    ...bubbles,
    ...conversation.operatorMessages.map((message) => ({
      id: message.id,
      role: "assistant" as const,
      text: message.text,
      at: message.at,
      fromOperator: true,
    })),
  ].sort((a, b) => a.at - b.at);

  // Sigue el final del hilo mientras entra texto
  useEffect(() => {
    threadRef.current?.scrollTo({
      top: threadRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [bubbles, streaming]);

  // Cualquier parte del sitio puede abrir el chat emitiendo este evento
  useEffect(() => {
    const openChat = () => setOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, openChat);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, openChat);
  }, []);

  // Cierra con Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const ask = useCallback(
    async (text: string) => {
      const message = text.trim();
      if (!message || busy) return;

      const mine: Bubble = {
        id: crypto.randomUUID(),
        role: "user",
        text: message,
        at: Date.now(),
      };

      setBubbles((current) => [...current, mine]);
      setDraft("");
      setStreaming("");

      // Se guarda siempre, aunque atienda una persona: es lo que el operador
      // necesita leer en el panel.
      void conversation.persist({ role: "user", text: message });

      // Con una persona atendiendo, el bot no interviene. El guardia también
      // está en el servidor; este evita la llamada de entrada.
      if (conversation.mode === "operator") return;

      setBusy(true);
      let answer = "";
      let handoff = false;

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message,
            lang,
            conversationId: conversation.conversationId ?? undefined,
            history: bubbles.map((b) => ({ role: b.role, text: b.text })),
          }),
        });

        if (!response.ok || !response.body) throw new Error("sin respuesta");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Normaliza CRLF: nuestro endpoint usa LF, pero así el lector sirve
          // igual si algún día hay un proxy que reescriba los saltos
          buffer += decoder
            .decode(value, { stream: true })
            .replace(/\r\n/g, "\n");
          let boundary = buffer.indexOf("\n\n");

          while (boundary !== -1) {
            const raw = buffer.slice(0, boundary).replace(/^data:\s*/, "");
            buffer = buffer.slice(boundary + 2);
            boundary = buffer.indexOf("\n\n");

            if (!raw) continue;
            const event = JSON.parse(raw);

            if (event.type === "delta") {
              answer += event.text;
              setStreaming(answer);
            }
            if (event.type === "handoff") handoff = true;
            if (event.type === "limited") {
              answer = chat.limited;
            }
            if (event.type === "operator") answer = chat.operator;
          }
        }
      } catch {
        handoff = true;
      }

      const reply = handoff ? chat.handoff : answer;

      setStreaming("");
      setBubbles((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: reply,
          at: Date.now(),
          handoff,
        },
      ]);
      setBusy(false);
      inputRef.current?.focus();

      // El respaldo no se guarda: no es una respuesta, es un aviso de que no
      // pudimos responder, y ensuciaría el hilo que lee el operador.
      if (!handoff && answer) {
        void conversation.persist({ role: "assistant", text: answer });
      }
    },
    [bubbles, busy, chat, conversation, lang],
  );

  return (
    <>
      {/* Burbuja flotante */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? chat.close : chat.open}
        className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-brand-600 text-white shadow-xl shadow-brand-950/30 transition hover:-translate-y-0.5 hover:bg-brand-700 md:right-6 md:bottom-6"
      >
        <Icon name={open ? "close" : "chat"} className="size-6" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={chat.title}
          className="fixed inset-x-3 bottom-22 z-40 flex max-h-[min(34rem,75vh)] flex-col overflow-hidden rounded-3xl border border-brand-500/15 bg-white shadow-2xl shadow-brand-950/25 sm:inset-x-auto sm:right-6 sm:w-96 md:bottom-24"
        >
          {/* Encabezado: acá va a vivir el indicador de operador */}
          <div className="flex items-center gap-3 border-b border-brand-500/10 bg-brand-50/60 px-4 py-3.5">
            {/*
              El indicador cambia en las dos direcciones: avisa cuando entra
              una persona y también cuando la conversación vuelve al bot por
              inactividad, para que nadie siga esperando a alguien que se fue.
            */}
            <span
              className={`grid size-9 shrink-0 place-items-center rounded-xl text-white ${
                attended ? "bg-coral-500" : "bg-brand-600"
              }`}
            >
              <Icon name={attended ? "users" : "sparkles"} className="size-4.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-tight font-semibold text-ink">
                {chat.title}
              </p>
              <p
                className={`text-xs ${attended ? "font-medium text-coral-600" : "text-ink/50"}`}
              >
                {attended ? chat.operator : chat.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={chat.close}
              className="grid size-8 place-items-center rounded-lg text-ink/45 transition hover:bg-white hover:text-ink"
            >
              <Icon name="close" className="size-4" />
            </button>
          </div>

          {/* Hilo */}
          <div
            ref={threadRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            <Message role="assistant">{chat.greeting}</Message>

            {thread.map((bubble) => (
              <Message
                key={bubble.id}
                role={bubble.role}
                fromOperator={bubble.fromOperator}
              >
                <Inline text={bubble.text} />
                {bubble.handoff && (
                  <Link
                    href={`${path("/", lang)}#contacto`}
                    onClick={() => setOpen(false)}
                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-coral-600 hover:text-coral-700"
                  >
                    {chat.handoffCta}
                    <Icon name="arrowRight" className="size-3.5" />
                  </Link>
                )}
              </Message>
            ))}

            {streaming && <Message role="assistant">{streaming}</Message>}

            {busy && !streaming && (
              <Message role="assistant">
                <span className="text-ink/45">{chat.thinking}</span>
              </Message>
            )}

            {bubbles.length === 0 && !busy && (
              <div className="flex flex-wrap gap-2 pt-1">
                {chat.suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => ask(suggestion)}
                    className="rounded-full border border-brand-500/20 bg-white px-3 py-1.5 text-xs font-medium text-brand-700 transition hover:border-brand-500/40 hover:bg-brand-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Entrada */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              ask(draft);
            }}
            className="border-t border-brand-500/10 px-3 py-3"
          >
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    ask(draft);
                  }
                }}
                rows={1}
                maxLength={800}
                placeholder={chat.placeholder}
                className="max-h-28 flex-1 resize-none rounded-xl border border-brand-500/20 px-3.5 py-2.5 text-sm text-ink transition placeholder:text-ink/35 focus:border-brand-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy || !draft.trim()}
                aria-label={chat.send}
                className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-700 disabled:opacity-40"
              >
                <Icon name="arrowRight" className="size-4.5" />
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-ink/40">
              {chat.disclaimer}
            </p>
          </form>
        </div>
      )}
    </>
  );
}

function Message({
  role,
  fromOperator,
  children,
}: {
  role: "user" | "assistant";
  fromOperator?: boolean;
  children: React.ReactNode;
}) {
  const mine = role === "user";

  // Los mensajes de una persona se distinguen de los del bot: si no, el
  // visitante no sabe con quién está hablando.
  const style = mine
    ? "rounded-br-md bg-brand-600 text-white"
    : fromOperator
      ? "rounded-bl-md border border-coral-200 bg-coral-50 text-ink/85"
      : "rounded-bl-md bg-brand-50 text-ink/85";

  return (
    <div className={mine ? "flex justify-end" : "flex justify-start"}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 ${style} ${
          mine ? "" : "[&_a]:text-brand-700"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

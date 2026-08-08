import { renderContext } from "@/lib/chat/retrieval";
import type { ChatConfig, ChatMessage, Conversation } from "@/lib/chat/types";
import { ProviderError } from "@/lib/chat/types";
import type { Locale } from "@/lib/i18n";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * MOTOR
 * ─────────────────────────────────────────────────────────────────────────────
 * Orquesta el turno completo y no sabe nada del sitio: recibe una `ChatConfig`
 * con las cuatro piezas intercambiables y decide qué pasa.
 *
 * El resultado es un `AsyncIterable` de eventos, para que la ruta HTTP los
 * traduzca a SSE y el widget los pinte a medida que llegan.
 */

export type ChatEvent =
  | { type: "start"; conversationId: string; mode: Conversation["mode"] }
  | { type: "delta"; text: string }
  | { type: "done"; text: string }
  /** El bot no puede responder; hay que derivar a una persona. */
  | { type: "handoff"; reason: "quota" | "error" }
  | { type: "limited"; retryAfter?: number }
  /** Una persona tomó la conversación: el bot se calla. */
  | { type: "operator" };

export type TurnInput = {
  conversationId?: string;
  message: string;
  lang: Locale;
  /** Clave para los límites: IP, o identificador de sesión */
  clientKey: string;
  /**
   * Historial aportado por el cliente, para los almacenes que no persisten.
   * Viaja por el turno y no por el almacén a propósito: si viviera en el
   * almacén compartido, dos visitantes concurrentes en la misma instancia
   * podrían pisarse el contexto entre sí.
   */
  history?: ChatMessage[];
};

export class ChatEngine {
  constructor(private readonly config: ChatConfig) {}

  async *turn(input: TurnInput): AsyncIterable<ChatEvent> {
    const { config } = this;
    const message = input.message.trim().slice(0, config.maxMessageLength);

    if (!message) return;

    // 1. Límites de uso, antes de gastar cualquier cosa
    const limit = await config.limiter.check(input.clientKey);
    if (!limit.ok) {
      yield { type: "limited", retryAfter: limit.retryAfter };
      return;
    }

    // 2. Conversación
    const conversation = await this.resolveConversation(
      input.conversationId,
      input.lang,
    );

    yield {
      type: "start",
      conversationId: conversation.id,
      mode: conversation.mode,
    };

    await config.store.append(conversation.id, {
      id: newId(),
      role: "user",
      text: message,
      at: new Date().toISOString(),
    });

    // 3. Si hay una persona atendiendo, el bot no dice nada.
    //    Este es todo el guardia que hace falta para la toma manual.
    if (conversation.mode === "operator") {
      yield { type: "operator" };
      return;
    }

    // 4. Contexto e instrucciones
    const chunks = await config.retriever.retrieve(message, input.lang);
    const system = [
      config.persona(input.lang),
      "",
      "# Información del sitio",
      renderContext(chunks),
    ].join("\n");

    // El almacén manda cuando persiste; si no, vale lo que trajo el cliente
    const history = config.store.persists
      ? await config.store.history(conversation.id, config.historyWindow)
      : (input.history ?? []).slice(-config.historyWindow);

    // 5. Generación
    let answer = "";
    try {
      for await (const delta of config.provider.generate({
        system,
        history,
        message,
      })) {
        answer += delta;
        yield { type: "delta", text: delta };
      }
    } catch (error) {
      const quota = error instanceof ProviderError && error.quotaExhausted;
      console.error(
        quota ? "Chat: cuota agotada" : "Chat: fallo del proveedor",
        error,
      );
      // No se le cuenta al visitante qué pasó: se lo deriva a una persona.
      yield { type: "handoff", reason: quota ? "quota" : "error" };
      return;
    }

    if (!answer.trim()) {
      yield { type: "handoff", reason: "error" };
      return;
    }

    await config.store.append(conversation.id, {
      id: newId(),
      role: "assistant",
      text: answer,
      at: new Date().toISOString(),
      by: "bot",
    });

    yield { type: "done", text: answer };
  }

  /**
   * Carga la conversación o la crea. Acá se resuelve también el timeout del
   * operador: si tomó la conversación y lleva demasiado sin escribir, vuelve
   * sola a modo bot. Sin proceso de fondo ni tareas programadas — se evalúa
   * en el momento en que alguien habla, que es cuando importa.
   */
  private async resolveConversation(
    id: string | undefined,
    lang: Locale,
  ): Promise<Conversation> {
    const now = new Date();

    if (id) {
      const existing = await this.config.store.load(id);
      if (existing) {
        if (existing.mode === "operator" && this.operatorExpired(existing, now)) {
          return { ...existing, mode: "bot", updatedAt: now.toISOString() };
        }
        return existing;
      }
    }

    return this.config.store.create({
      id: id ?? newId(),
      lang,
      mode: "bot",
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    });
  }

  private operatorExpired(conversation: Conversation, now: Date): boolean {
    const seen = conversation.operatorSeenAt ?? conversation.updatedAt;
    const minutes = (now.getTime() - new Date(seen).getTime()) / 60000;
    return minutes > this.config.operatorTimeoutMinutes;
  }
}

/** Identificador corto, sin dependencias. */
export function newId(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 20);
}

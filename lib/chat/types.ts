import type { Locale } from "@/lib/i18n";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CONTRATO DEL MOTOR DE CHAT
 * ─────────────────────────────────────────────────────────────────────────────
 * Este archivo no sabe nada de ImagoStack: define las piezas que el motor
 * necesita y deja que cada sitio las implemente. Mudar el motor a otro proyecto
 * es escribir implementaciones nuevas de estas interfaces, no tocar el motor.
 *
 *   LLMProvider       de dónde salen las respuestas (Gemini, otro, simulado)
 *   Retriever         qué contexto se le da al modelo (todo / vectorial)
 *   RateLimiter       cuántas consultas se permiten (memoria / Redis)
 *   ConversationStore dónde vive la conversación (en ningún lado / Firestore)
 */

export type Role = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: Role;
  text: string;
  /** ISO 8601 */
  at: string;
  /**
   * Quién escribió, cuando el rol es "assistant": el bot o una persona.
   * Existe desde la v1 aunque todavía no haya operadores, para no tener que
   * migrar los mensajes cuando se sume el panel.
   */
  by?: "bot" | "operator";
};

/**
 * Modo de la conversación. En la v1 siempre es "bot", pero el guardia que lo
 * respeta ya está escrito: cuando exista el panel de operadora, alcanza con
 * que algo escriba "operator" en este campo para que el bot se calle.
 */
export type ConversationMode = "bot" | "operator";

export type Conversation = {
  id: string;
  lang: Locale;
  mode: ConversationMode;
  createdAt: string;
  updatedAt: string;
  /** Última señal de vida del operador; con esto se resuelve el timeout. */
  operatorSeenAt?: string;
};

/** Un fragmento de conocimiento que el bot puede citar. */
export type KnowledgeChunk = {
  id: string;
  /** Título legible, se le muestra al modelo para que sepa de qué habla */
  title: string;
  /** Ruta interna del sitio, para que el bot pueda enlazar de verdad */
  url?: string;
  text: string;
  /** Palabras clave para la recuperación por texto; opcional */
  tags?: string[];
};

/** Estrategia de recuperación de contexto. */
export interface Retriever {
  readonly name: string;
  /**
   * Devuelve los fragmentos relevantes para una consulta.
   * La implementación de contexto completo ignora `query` y devuelve todo.
   */
  retrieve(query: string, lang: Locale): Promise<KnowledgeChunk[]>;
}

export type GenerateRequest = {
  /** Instrucciones del sistema ya armadas (personalidad + contexto + reglas) */
  system: string;
  /** Historial, del más viejo al más nuevo, sin el mensaje actual */
  history: ChatMessage[];
  /** El mensaje que hay que responder */
  message: string;
};

/**
 * Proveedor de generación. Devuelve el texto por partes para poder mostrarlo
 * a medida que llega.
 */
export interface LLMProvider {
  readonly name: string;
  generate(request: GenerateRequest): AsyncIterable<string>;
}

/**
 * Error de un proveedor. `quotaExhausted` es el que dispara el modo respaldo:
 * el bot deja de responder y la consulta se deriva a una persona.
 */
export class ProviderError extends Error {
  readonly quotaExhausted: boolean;
  readonly status?: number;

  constructor(
    message: string,
    options: { quotaExhausted?: boolean; status?: number } = {},
  ) {
    super(message);
    this.name = "ProviderError";
    this.quotaExhausted = options.quotaExhausted ?? false;
    this.status = options.status;
  }
}

export type RateLimitResult = {
  ok: boolean;
  /** Segundos hasta que se pueda reintentar, si no está permitido */
  retryAfter?: number;
  /** Motivo, para poder distinguir en los logs */
  reason?: "rate" | "session" | "daily";
};

export interface RateLimiter {
  readonly name: string;
  check(key: string): Promise<RateLimitResult>;
}

/**
 * Persistencia de la conversación. La v1 de ImagoStack usa una implementación
 * que no guarda nada; Anabella usará Firestore, y ahí aparecen el historial
 * compartido, el panel y la toma manual sin tocar el resto del motor.
 */
export interface ConversationStore {
  readonly name: string;
  readonly persists: boolean;
  load(id: string): Promise<Conversation | null>;
  create(conversation: Conversation): Promise<Conversation>;
  append(id: string, message: ChatMessage): Promise<void>;
  history(id: string, limit: number): Promise<ChatMessage[]>;
}

/** Todo lo que el motor necesita para funcionar en un sitio concreto. */
export type ChatConfig = {
  provider: LLMProvider;
  retriever: Retriever;
  limiter: RateLimiter;
  store: ConversationStore;
  /** Personalidad y reglas, por idioma */
  persona: (lang: Locale) => string;
  /** Cuántos mensajes previos se le mandan al modelo */
  historyWindow: number;
  /** Largo máximo de un mensaje del visitante */
  maxMessageLength: number;
  /**
   * Minutos sin actividad del operador tras los cuales la conversación vuelve
   * sola a modo bot. Se evalúa al recibir un mensaje: no hace falta un proceso
   * de fondo ni tareas programadas.
   */
  operatorTimeoutMinutes: number;
};

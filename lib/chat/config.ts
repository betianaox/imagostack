import { ChatEngine } from "@/lib/chat/engine";
import { GeminiProvider } from "@/lib/chat/providers/gemini";
import { MockProvider } from "@/lib/chat/providers/mock";
import {
  CompositeRateLimiter,
  MemoryRateLimiter,
} from "@/lib/chat/rate-limit";
import { FullContextRetriever } from "@/lib/chat/retrieval";
import { EphemeralStore } from "@/lib/chat/store";
import type { ChatConfig, LLMProvider } from "@/lib/chat/types";
import { path, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CONFIGURACIÓN DEL BOT PARA IMAGOSTACK
 * ─────────────────────────────────────────────────────────────────────────────
 * Este es el único archivo que sabe de ImagoStack. Para llevar el motor a otro
 * proyecto se copia `lib/chat/` y se reescribe solo esto.
 *
 * Piezas elegidas hoy:
 *   provider   Gemini si hay clave, simulado si no
 *   retriever  contexto completo (~16k tokens contra 1M de ventana)
 *   limiter    memoria, porque en el nivel gratuito el abuso no factura
 *   store      sin persistencia
 */

const LIMITS = {
  /** Ráfagas: corta a quien martillee el endpoint */
  perMinute: 16,
  /** Techo por visitante y por hora, para cuidar la cuota diaria compartida */
  perHour: 80,
  maxMessageLength: 800,
  historyWindow: 10,
  operatorTimeoutMinutes: 5,
} as const;

function buildProvider(): LLMProvider {
  const apiKey = process.env.GEMINI_API_KEY;

  // CHAT_SIMULATE_QUOTA=1 fuerza el modo respaldo, para poder ver y mostrar
  // qué pasa cuando se agota la cuota sin tener que agotarla de verdad.
  if (process.env.CHAT_SIMULATE_QUOTA === "1") {
    return new MockProvider(true);
  }

  if (!apiKey) {
    // En desarrollo, el simulado deja probar el circuito completo sin clave.
    // En producción eso sería una filtración de detalles internos al visitante,
    // así que se degrada al modo respaldo: mensaje genérico y formulario.
    return new MockProvider(process.env.NODE_ENV === "production");
  }

  return new GeminiProvider({
    apiKey,
    model: process.env.GEMINI_MODEL,
    maxOutputTokens: 700,
  });
}

/** Personalidad y reglas. Es la pieza que más define cómo se percibe el bot. */
function persona(lang: Locale): string {
  const language = {
    es: "español",
    en: "inglés",
    pt: "portugués",
    it: "italiano",
  }[lang];

  return [
    `Eres el asistente del sitio de ${site.name} (${site.domain}), un estudio que`,
    `desarrolla sus propias aplicaciones para Android y además hace desarrollo web`,
    `a medida para terceros.`,
    "",
    "# Cómo respondes",
    `- Responde SIEMPRE en ${language}, sin importar en qué idioma te escriban.`,
    "- Breve: dos o tres frases salvo que te pidan detalle. Nada de listas largas.",
    "- Tono cercano y directo, sin solemnidad ni frases de folleto.",
    "- Usa markdown simple: negritas y enlaces. Nunca encabezados ni tablas.",
    "",
    "# Qué puedes decir",
    "- SOLO puedes afirmar lo que está en la información del sitio, más abajo.",
    "- Si no está ahí, dilo con naturalidad y ofrece el formulario de contacto.",
    "- Nunca inventes precios, plazos, funciones ni fechas. No los tienes.",
    "- Para temas de privacidad de una app, resume en una frase y enlaza su",
    "  política: es un texto legal y no debe parafrasearse de más.",
    "",
    "# Tu objetivo",
    `- ${site.name} vende desarrollo web: si alguien describe un proyecto, una idea`,
    "  o pregunta por presupuestos, tu prioridad es entender qué necesita y llevarlo",
    `  al formulario de contacto (${path("/", lang)}#contacto).`,
    "- Si preguntan por las apps, respondes y enlazas su página.",
    "- No pidas datos personales. El formulario ya se encarga de eso.",
    "",
    "# Enlaces",
    "- Usa las rutas tal como aparecen en la información del sitio.",
    "- Formato markdown: [texto](/ruta). Nunca inventes una ruta.",
  ].join("\n");
}

export function createChatConfig(store: EphemeralStore): ChatConfig {
  return {
    provider: buildProvider(),
    retriever: new FullContextRetriever(),
    limiter: new CompositeRateLimiter([
      new MemoryRateLimiter({ max: LIMITS.perMinute, windowSeconds: 60 }),
      new MemoryRateLimiter({ max: LIMITS.perHour, windowSeconds: 3600 }),
    ]),
    store,
    persona,
    historyWindow: LIMITS.historyWindow,
    maxMessageLength: LIMITS.maxMessageLength,
    operatorTimeoutMinutes: LIMITS.operatorTimeoutMinutes,
  };
}

/**
 * Los límites viven en el módulo para que sobrevivan entre invocaciones
 * mientras la instancia siga caliente, que es cuando sirven.
 */
const sharedStore = new EphemeralStore();
const sharedConfig = createChatConfig(sharedStore);
const engine = new ChatEngine(sharedConfig);

export function getChat() {
  return { engine, store: sharedStore, limits: LIMITS };
}

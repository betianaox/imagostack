import { buildKnowledge, estimateTokens } from "@/lib/chat/knowledge";
import type { Locale } from "@/lib/i18n";
import type { KnowledgeChunk, Retriever } from "@/lib/chat/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * RECUPERACIÓN DE CONTEXTO
 * ─────────────────────────────────────────────────────────────────────────────
 * Tres escalones posibles, en orden de crecimiento del contenido:
 *
 *   1. FullContextRetriever   todo el corpus en el prompt        ← hoy
 *   2. Vectorial en memoria   embeddings del build + coseno
 *   3. Firestore findNearest  búsqueda vectorial en la base
 *
 * Hoy el corpus del sitio ronda los 16k tokens contra una ventana de 1M, así
 * que mandarlo entero no solo alcanza: es *mejor* que recuperar fragmentos,
 * porque una búsqueda puede traer el fragmento equivocado y el modelo responde
 * mal con información que sí teníamos.
 *
 * Cambiar de estrategia es cambiar la implementación en `lib/chat/config.ts`.
 */

/** El corpus se arma una vez por idioma y queda cacheado en el proceso. */
const cache = new Map<Locale, KnowledgeChunk[]>();

export function knowledgeFor(lang: Locale): KnowledgeChunk[] {
  const cached = cache.get(lang);
  if (cached) return cached;

  const chunks = buildKnowledge(lang);
  cache.set(lang, chunks);
  return chunks;
}

/** Manda el corpus completo. Sin búsqueda, sin índice, sin poder fallar. */
export class FullContextRetriever implements Retriever {
  readonly name = "full-context";

  async retrieve(_query: string, lang: Locale): Promise<KnowledgeChunk[]> {
    return knowledgeFor(lang);
  }
}

/**
 * Recuperación por palabras, sin embeddings. No la usamos por defecto, pero
 * sirve para dos cosas: comparar contra el contexto completo, y como respaldo
 * híbrido cuando exista la vectorial —los sistemas reales combinan las dos,
 * porque la búsqueda semántica sola falla justo en las coincidencias exactas
 * (nombres de producto, "MySQL", el nombre de una app).
 */
export class KeywordRetriever implements Retriever {
  readonly name = "keyword";

  constructor(private readonly limit = 6) {}

  async retrieve(query: string, lang: Locale): Promise<KnowledgeChunk[]> {
    const terms = normalize(query)
      .split(/\s+/)
      .filter((term) => term.length > 2);

    if (terms.length === 0) return knowledgeFor(lang).slice(0, this.limit);

    const scored = knowledgeFor(lang).map((chunk) => {
      const haystack = normalize(
        `${chunk.title} ${chunk.tags?.join(" ") ?? ""} ${chunk.text}`,
      );
      const title = normalize(`${chunk.title} ${chunk.tags?.join(" ") ?? ""}`);

      let score = 0;
      for (const term of terms) {
        if (title.includes(term)) score += 3;
        else if (haystack.includes(term)) score += 1;
      }
      return { chunk, score };
    });

    return scored
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, this.limit)
      .map((item) => item.chunk);
  }
}

/** Quita acentos y baja a minúsculas, para que "vigía" encuentre "vigia". */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/** Arma el bloque de contexto que se le pasa al modelo. */
export function renderContext(chunks: KnowledgeChunk[]): string {
  return chunks
    .map((chunk) => {
      const header = chunk.url
        ? `## ${chunk.title} (${chunk.url})`
        : `## ${chunk.title}`;
      return `${header}\n${chunk.text}`;
    })
    .join("\n\n");
}

/** Diagnóstico: cuánto pesa el corpus de un idioma. */
export function knowledgeSize(lang: Locale) {
  const chunks = knowledgeFor(lang);
  return { chunks: chunks.length, tokens: estimateTokens(chunks) };
}

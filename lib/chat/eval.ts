import { KeywordRetriever, knowledgeFor } from "@/lib/chat/retrieval";
import type { Locale } from "@/lib/i18n";
import type { Retriever } from "@/lib/chat/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * BANCO DE PRUEBAS DE RECUPERACIÓN
 * ─────────────────────────────────────────────────────────────────────────────
 * Un RAG que "parece que anda" y uno que anda se distinguen midiendo, no
 * leyendo respuestas. Esto responde una sola pregunta:
 *
 *   ¿la búsqueda trae el fragmento que hacía falta?
 *
 * Es la parte que casi nadie construye y la que hace falta el día que se sume
 * la recuperación vectorial: sin esto no hay forma de saber si el cambio
 * mejoró o empeoró las respuestas.
 *
 * No consume nada del modelo: la recuperación es local.
 */

export type EvalCase = {
  question: string;
  /** Id del fragmento que tiene que aparecer entre los recuperados */
  expect: string;
};

/** Casos escritos contra los ids que genera `buildKnowledge`. */
export const CASES: EvalCase[] = [
  { question: "¿qué apps tienen?", expect: "app-vigia" },
  { question: "para qué sirve Vigia", expect: "app-vigia" },
  { question: "cómo funciona lo del pádel", expect: "app-vigia" },
  { question: "qué es Oráculos", expect: "app-oraculos" },
  { question: "el tarot está en español?", expect: "app-oraculos" },
  { question: "qué datos guarda Oráculos", expect: "privacidad-oraculos" },
  { question: "Vigia recolecta datos personales?", expect: "privacidad-vigia" },
  { question: "hacen páginas web a medida", expect: "servicios" },
  { question: "trabajan con MySQL?", expect: "servicios" },
  { question: "usan inteligencia artificial", expect: "servicios" },
  { question: "cuánto tardan en responder", expect: "faq-0" },
  { question: "encontré un error en la app", expect: "faq-1" },
  { question: "cómo los contacto", expect: "contacto" },
  { question: "quiero pedir un presupuesto", expect: "contacto" },
  { question: "cómo trabajan", expect: "principios" },
  { question: "quiénes son ustedes", expect: "empresa" },
];

export type EvalResult = {
  question: string;
  expect: string;
  /** Posición del fragmento esperado, o -1 si no apareció */
  rank: number;
  hit: boolean;
  got: string[];
};

export async function runEval(
  retriever: Retriever,
  lang: Locale = "es",
  cases: EvalCase[] = CASES,
): Promise<{ results: EvalResult[]; hits: number; total: number }> {
  const results: EvalResult[] = [];

  for (const testCase of cases) {
    const chunks = await retriever.retrieve(testCase.question, lang);
    const ids = chunks.map((chunk) => chunk.id);
    const rank = ids.indexOf(testCase.expect);

    results.push({
      question: testCase.question,
      expect: testCase.expect,
      rank,
      hit: rank !== -1,
      got: ids.slice(0, 4),
    });
  }

  return {
    results,
    hits: results.filter((result) => result.hit).length,
    total: results.length,
  };
}

/**
 * Comparación entre estrategias. Hoy contrasta el contexto completo —que por
 * definición acierta siempre— con la búsqueda por palabras, que es la que
 * puede fallar. Cuando exista la vectorial se suma acá y se ve, con la misma
 * regla, si mejora o no.
 */
export async function compareRetrievers(lang: Locale = "es") {
  const keyword = new KeywordRetriever();
  const corpus = knowledgeFor(lang);
  const report = await runEval(keyword, lang);

  return {
    corpus: { chunks: corpus.length, ids: corpus.map((c) => c.id) },
    keyword: report,
  };
}

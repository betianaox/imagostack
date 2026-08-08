import { compareRetrievers } from "@/lib/chat/eval";
import { knowledgeSize } from "@/lib/chat/retrieval";
import { isLocale, type Locale } from "@/lib/i18n";

/**
 * Diagnóstico del conocimiento y de la recuperación: cuántos fragmentos hay,
 * cuánto pesan y si la búsqueda encuentra lo que corresponde.
 *
 * Solo responde en desarrollo. En producción devuelve 404, para no exponer la
 * estructura interna del corpus.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }

  const url = new URL(request.url);
  const param = url.searchParams.get("lang") ?? undefined;
  const lang: Locale = isLocale(param) ? param : "es";

  const report = await compareRetrievers(lang);
  const size = knowledgeSize(lang);

  return Response.json({
    lang,
    corpus: { ...size, ids: report.corpus.ids },
    keyword: {
      score: `${report.keyword.hits}/${report.keyword.total}`,
      misses: report.keyword.results
        .filter((result) => !result.hit)
        .map((result) => ({
          question: result.question,
          expected: result.expect,
          got: result.got,
        })),
    },
  });
}

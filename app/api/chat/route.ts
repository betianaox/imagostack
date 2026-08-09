import { getChat } from "@/lib/chat/config";
import { newId } from "@/lib/chat/engine";
import type { ChatMessage } from "@/lib/chat/types";
import { verificarAppCheck } from "@/lib/firebase/verificar-app-check";
import { isLocale, type Locale } from "@/lib/i18n";

/**
 * Endpoint del chat. Traduce los eventos del motor a SSE para que el widget
 * pinte la respuesta a medida que llega.
 *
 * La clave de Gemini vive solo acá, del lado del servidor. Sin
 * `GEMINI_API_KEY` el motor usa el proveedor simulado y el sitio sigue
 * funcionando.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  message?: string;
  conversationId?: string;
  lang?: string;
  history?: { role?: string; text?: string }[];
};

export async function POST(request: Request) {
  // Antes que nada: que el pedido venga de este sitio y no de un script. Este
  // endpoint recibe texto libre que va al modelo, así que sin esto quien
  // encuentre la URL tiene un modelo de lenguaje gratis a nuestra cuenta.
  // Mientras App Check no esté configurado, esto deja pasar todo.
  if (!(await verificarAppCheck(request))) {
    return Response.json({ error: "app_check" }, { status: 401 });
  }

  let payload: Payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const message = typeof payload.message === "string" ? payload.message : "";
  if (!message.trim()) {
    return Response.json({ error: "empty_message" }, { status: 400 });
  }

  const lang: Locale = isLocale(payload.lang) ? payload.lang : "es";
  const { engine, limits } = getChat();

  // El historial lo aporta el cliente porque no persistimos nada. Se recorta
  // acá para que nadie pueda inflar el prompt desde el navegador, y viaja
  // dentro del turno para que dos visitantes concurrentes no se pisen.
  const history = sanitizeHistory(payload.history, limits.historyWindow);

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();
      let closed = false;

      /**
       * Si el visitante cierra el chat o se va a mitad de respuesta, el
       * controlador queda cerrado y seguir escribiendo lanza. Se corta acá en
       * vez de dejar que reviente el turno entero.
       */
      const send = (event: unknown) => {
        if (closed) return false;
        try {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(event)}\n\n`),
          );
          return true;
        } catch {
          closed = true;
          return false;
        }
      };

      try {
        for await (const event of engine.turn({
          message,
          lang,
          history,
          conversationId:
            typeof payload.conversationId === "string"
              ? payload.conversationId.slice(0, 40)
              : undefined,
          clientKey: clientKey(request),
        })) {
          // Si el cliente se fue, no tiene sentido seguir generando
          if (!send(event)) break;
        }
      } catch (error) {
        console.error("Chat: error inesperado", error);
        send({ type: "handoff", reason: "error" });
      } finally {
        if (!closed) {
          closed = true;
          try {
            controller.close();
          } catch {
            // Ya estaba cerrado por el otro lado
          }
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

/** Identifica al visitante para los límites: IP real detrás del proxy. */
function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "anon";
}

function sanitizeHistory(
  history: Payload["history"],
  limit: number,
): ChatMessage[] {
  if (!Array.isArray(history)) return [];

  return history
    .filter(
      (item): item is { role: string; text: string } =>
        typeof item?.text === "string" &&
        (item.role === "user" || item.role === "assistant"),
    )
    .slice(-limit)
    .map((item) => ({
      id: newId(),
      role: item.role as ChatMessage["role"],
      text: item.text.slice(0, 2000),
      at: new Date().toISOString(),
    }));
}

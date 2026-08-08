import type { GenerateRequest, LLMProvider } from "@/lib/chat/types";
import { ProviderError } from "@/lib/chat/types";

/**
 * Proveedor Gemini por REST, sin SDK.
 *
 * Se habla directo con la API por dos motivos: no sumar dependencias a un
 * sitio que vende ser liviano, y que cambiar de proveedor sea escribir otra
 * clase de ~80 líneas en vez de desenredar un framework.
 *
 * El error 429 (cuota agotada del nivel gratuito) se traduce a
 * `quotaExhausted`, que es lo que dispara el modo respaldo del motor.
 */
export class GeminiProvider implements LLMProvider {
  readonly name = "gemini";

  private readonly apiKey: string;
  private readonly model: string;
  private readonly maxOutputTokens: number;

  constructor(options: {
    apiKey: string;
    model?: string;
    maxOutputTokens?: number;
  }) {
    this.apiKey = options.apiKey;
    // La familia 2.5 dejó de estar disponible para proyectos nuevos (404).
    // flash-lite alcanza de sobra para un chat de sitio: contexto chico y
    // respuestas cortas. `gemini-flash-lite-latest` es la alternativa que
    // sigue siempre la versión vigente, a cambio de que pueda cambiar sola.
    this.model = options.model ?? "gemini-3.1-flash-lite";
    this.maxOutputTokens = options.maxOutputTokens ?? 700;
  }

  async *generate(request: GenerateRequest): AsyncIterable<string> {
    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/` +
      `${this.model}:streamGenerateContent?alt=sse`;

    const body = {
      systemInstruction: { parts: [{ text: request.system }] },
      contents: [
        ...request.history.map((message) => ({
          // La API llama "model" a lo que nosotros llamamos "assistant"
          role: message.role === "assistant" ? "model" : "user",
          parts: [{ text: message.text }],
        })),
        { role: "user", parts: [{ text: request.message }] },
      ],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: this.maxOutputTokens,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // En cabecera y no en la query, para que la clave no quede en logs
        "x-goog-api-key": this.apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok || !response.body) {
      const detail = await response.text().catch(() => "");
      throw new ProviderError(
        `Gemini respondió ${response.status}: ${detail.slice(0, 300)}`,
        {
          // 429 = cuota agotada. 503 = saturado; se trata igual porque para el
          // visitante el resultado es el mismo y conviene derivarlo.
          quotaExhausted: response.status === 429 || response.status === 503,
          status: response.status,
        },
      );
    }

    yield* readSse(response.body);
  }
}

/** Lee el stream SSE y va emitiendo solo el texto generado. */
async function* readSse(
  stream: ReadableStream<Uint8Array>,
): AsyncIterable<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Google termina cada evento con CRLF CRLF. Se normaliza a LF para que
      // el corte por línea en blanco funcione con los dos formatos.
      buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, "\n");

      // Los eventos SSE se separan por línea en blanco
      let boundary = buffer.indexOf("\n\n");
      while (boundary !== -1) {
        const event = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);
        boundary = buffer.indexOf("\n\n");

        for (const line of event.split("\n")) {
          if (!line.startsWith("data:")) continue;

          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;

          const text = extractText(payload);
          if (text) yield text;
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

function extractText(payload: string): string {
  try {
    const parsed = JSON.parse(payload);
    const parts = parsed?.candidates?.[0]?.content?.parts;
    if (!Array.isArray(parts)) return "";
    return parts.map((part: { text?: string }) => part.text ?? "").join("");
  } catch {
    // Un fragmento incompleto no debe romper la respuesta entera
    return "";
  }
}

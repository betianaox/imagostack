import type { GenerateRequest, LLMProvider } from "@/lib/chat/types";
import { ProviderError } from "@/lib/chat/types";

/**
 * Proveedor simulado, para desarrollar y probar el flujo completo —widget,
 * streaming, límites, modo respaldo— sin gastar cuota ni necesitar API key.
 *
 * Se activa solo cuando no hay `GEMINI_API_KEY` en el entorno.
 */
export class MockProvider implements LLMProvider {
  readonly name = "mock";

  /** Si es true, simula que se agotó la cuota, para probar el modo respaldo. */
  constructor(private readonly simulateQuotaExhausted = false) {}

  async *generate(request: GenerateRequest): AsyncIterable<string> {
    if (this.simulateQuotaExhausted) {
      throw new ProviderError("Cuota simulada agotada", {
        quotaExhausted: true,
        status: 429,
      });
    }

    const reply = [
      "**Respuesta simulada** (no hay `GEMINI_API_KEY` configurada).",
      "",
      `Tu mensaje: “${request.message}”`,
      "",
      `El motor está funcionando: recibí ${request.history.length} mensajes de historial`,
      `y un contexto de ${request.system.length.toLocaleString("es")} caracteres.`,
      "",
      "Cargá la clave en el entorno y esta misma respuesta va a salir del modelo real.",
    ].join("\n");

    // Se emite por partes para ejercitar el streaming de punta a punta
    const size = 18;
    for (let index = 0; index < reply.length; index += size) {
      await new Promise((resolve) => setTimeout(resolve, 25));
      yield reply.slice(index, index + size);
    }
  }
}

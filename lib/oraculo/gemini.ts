import { datos, instrucciones } from "./prompt";
import type { Consulta } from "./tipos";

/**
 * Llamada a Gemini para una lectura. Sin streaming: la app espera la lectura
 * entera antes de mostrarla, así que no hay nada que ganar con SSE y sí una
 * pieza menos que puede fallar.
 *
 * Se habla por REST y sin SDK: cambiar de proveedor es reescribir este archivo.
 */
const MODELO = process.env.GEMINI_MODEL ?? "gemini-3.1-flash-lite";

/** Alta a propósito: dos lecturas seguidas no deberían sonar calcadas. */
const TEMPERATURA = 0.95;

/** Tres párrafos de ~40 palabras entran de sobra; el techo corta fugas. */
const MAX_TOKENS = 600;

export class ErrorOraculo extends Error {
  readonly estado: number;
  /** Cuota agotada o servicio saturado: se resuelve esperando, no reintentando. */
  readonly cuota: boolean;

  constructor(mensaje: string, estado: number) {
    super(mensaje);
    this.name = "ErrorOraculo";
    this.estado = estado;
    this.cuota = estado === 429 || estado === 503;
  }
}

export async function generarLectura(
  consulta: Consulta,
  apiKey: string,
  senal: AbortSignal,
): Promise<string> {
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/" +
    `${MODELO}:generateContent`;

  const respuesta = await fetch(url, {
    method: "POST",
    signal: senal,
    headers: {
      "Content-Type": "application/json",
      // En cabecera y no en la query, para que no quede en logs intermedios.
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: instrucciones(consulta.idioma) }] },
      contents: [{ role: "user", parts: [{ text: datos(consulta) }] }],
      generationConfig: {
        temperature: TEMPERATURA,
        maxOutputTokens: MAX_TOKENS,
      },
    }),
  });

  if (!respuesta.ok) {
    const detalle = await respuesta.text().catch(() => "");
    throw new ErrorOraculo(
      `Gemini respondió ${respuesta.status}: ${detalle.slice(0, 200)}`,
      respuesta.status,
    );
  }

  const cuerpo = await respuesta.json();
  const partes = cuerpo?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(partes)) {
    throw new ErrorOraculo("Gemini devolvió una forma inesperada", 502);
  }

  return partes.map((p: { text?: string }) => p.text ?? "").join("");
}

/**
 * Convierte el texto crudo en párrafos, o devuelve null si no sirve.
 *
 * Se valida acá y no en la app para que el cliente reciba una respuesta buena o
 * ninguna: si esto devuelve null, la app usa su motor propio y el usuario no se
 * entera de nada.
 */
export function aParrafos(crudo: string): string[] | null {
  const limpiar = (p: string) =>
    p
      .replace(/^#{1,6}\s*/gm, "")
      .replace(/^[-*+]\s+/gm, "")
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/\s+/g, " ")
      .trim();

  const partir = (texto: string, patron: RegExp) =>
    texto.split(patron).map(limpiar).filter((p) => p.length > 0);

  // Se corta por línea en blanco, que es lo pedido. A veces el modelo separa
  // con un salto simple: sin este segundo intento se descartaría una respuesta
  // perfectamente buena.
  let parrafos = partir(crudo, /\n\s*\n/);
  if (parrafos.length < 2) parrafos = partir(crudo, /\n+/);

  if (parrafos.length < 2) return null;
  if (parrafos.some((p) => p.length < 40)) return null;

  // Una respuesta cortada por el techo de tokens suele terminar sin puntuación.
  if (!/[.!?…"»)]$/.test(parrafos[parrafos.length - 1])) return null;

  return parrafos;
}

import { ErrorOraculo, aParrafos, generarLectura } from "@/lib/oraculo/gemini";
import { permitir } from "@/lib/oraculo/limite";
import { validar } from "@/lib/oraculo/tipos";

/**
 * Endpoint de lecturas para la app de Oráculos.
 *
 * Existe por una sola razón: la clave de Gemini no puede vivir en la app. Todo
 * lo que se compila en un APK se puede extraer del binario, así que la app
 * manda las piezas de la tirada acá y la clave nunca sale de este servidor.
 *
 * Contrato con la app: si algo falla —cuota, red, límite, respuesta inservible—
 * este endpoint responde 204 SIN CUERPO, y la app usa su motor propio de
 * plantillas. El usuario nunca ve un error; ve otra lectura. Por eso casi nada
 * de acá devuelve un código de error: para el cliente, "no pude" y "no quise"
 * son lo mismo.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Más que esto y la app ya siguió con su propia lectura: no vale la pena esperar. */
const TIMEOUT_MS = 9000;

/** Sin cuerpo: la app lo lee como "arreglate con tu motor". */
const sinLectura = () => new Response(null, { status: 204 });

export async function POST(request: Request) {
  // ┌─────────────────────────────────────────────────────────────────────┐
  // │ POR QUÉ ESTA CLAVE ES DISTINTA A LA DEL CHAT (GEMINI_API_KEY)       │
  // │                                                                     │
  // │ El nivel gratuito de Gemini da 500 peticiones POR DÍA y POR         │
  // │ PROYECTO de Google Cloud. Mientras el chat del sitio y la app de    │
  // │ Oráculos usaron la misma clave, compartieron esas 500: un día de    │
  // │ trabajo pesado del lado de la app agotó la cuota y dejó al chatbot  │
  // │ caído también.                                                      │
  // │                                                                     │
  // │ Por eso hay dos proyectos separados en la misma cuenta de Google:   │
  // │   "ImagoStack Chatbot"  -> GEMINI_API_KEY           (chat del sitio)│
  // │   "ImagoStack Oraculos" -> ORACULOS_GEMINI_API_KEY  (esta ruta)     │
  // │                                                                     │
  // │ Cada uno con sus propias 500 diarias. Si uno se agota, el otro      │
  // │ sigue andando. NO unificar estas variables.                         │
  // └─────────────────────────────────────────────────────────────────────┘
  const apiKey = process.env.ORACULOS_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Oráculo: falta ORACULOS_GEMINI_API_KEY");
    return sinLectura();
  }

  const limite = permitir(clienteKey(request));
  if (!limite.ok) {
    // El global se loguea como error porque significa que se acabó la cuota del
    // día para todos; el del visitante es ruido esperable.
    if (limite.motivo === "global") console.error("Oráculo: techo diario alcanzado");
    return sinLectura();
  }

  let cuerpo: unknown;
  try {
    cuerpo = await request.json();
  } catch {
    return sinLectura();
  }

  const revision = validar(cuerpo);
  if (!revision.ok) {
    // El motivo se loguea pero NO se devuelve: decirle a quien sondea el
    // endpoint qué campo falló es ayudarlo a armar el pedido válido.
    console.warn("Oráculo: pedido inválido —", revision.motivo);
    return sinLectura();
  }

  const controlador = new AbortController();
  const corte = setTimeout(() => controlador.abort(), TIMEOUT_MS);

  try {
    const crudo = await generarLectura(revision.consulta, apiKey, controlador.signal);
    const parrafos = aParrafos(crudo);
    if (!parrafos) {
      console.warn("Oráculo: la respuesta no pasó la validación");
      return sinLectura();
    }
    return Response.json({ parrafos });
  } catch (error) {
    const cuota = error instanceof ErrorOraculo && error.cuota;
    console.error(cuota ? "Oráculo: cuota agotada" : "Oráculo: fallo al generar", error);
    return sinLectura();
  } finally {
    clearTimeout(corte);
  }
}

/** Identifica al visitante para los límites: IP real detrás del proxy. */
function clienteKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "anon";
}

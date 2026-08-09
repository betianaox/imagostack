import { getApps, initializeApp, cert, type App } from "firebase-admin/app";
import { getAppCheck } from "firebase-admin/app-check";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * VERIFICACIÓN DE APP CHECK (servidor)
 * ─────────────────────────────────────────────────────────────────────────────
 * Comprueba que el token que mandó el cliente lo emitió Google para ESTE
 * proyecto. Es lo único que hace que App Check sirva: sin verificar del lado
 * del servidor, la cabecera es decorativa y cualquiera manda un texto cualquiera.
 *
 * Se apaga solo si falta configuración, y ahí `verificarAppCheck` devuelve
 * `true`. Es deliberado: preferimos un chat que funcione sin attestación a un
 * chat caído porque falta una variable de entorno. La protección se enciende
 * cuando se completa la configuración, no antes.
 */

let cacheApp: App | null | undefined;

/**
 * La cuenta de servicio, como JSON en una sola variable. Se guarda así y no
 * como archivo porque en Vercel no hay disco donde dejarlo.
 */
function credenciales(): { projectId: string; clientEmail: string; privateKey: string } | null {
  const crudo = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!crudo) return null;

  try {
    const json = JSON.parse(crudo);
    if (!json.project_id || !json.client_email || !json.private_key) return null;
    return {
      projectId: json.project_id,
      clientEmail: json.client_email,
      // Al pasar por una variable de entorno los saltos de línea de la clave
      // quedan escapados. Sin esto, la firma no valida y el error que da es
      // completamente opaco.
      privateKey: String(json.private_key).replace(/\\n/g, "\n"),
    };
  } catch {
    console.error("App Check: FIREBASE_SERVICE_ACCOUNT no es un JSON válido");
    return null;
  }
}

function adminApp(): App | null {
  if (cacheApp !== undefined) return cacheApp;

  const cred = credenciales();
  if (!cred) {
    cacheApp = null;
    return null;
  }

  // `cert()` e `initializeApp()` lanzan si la credencial está mal formada —una
  // clave privada cortada, por ejemplo—. Sin este catch, un secreto mal pegado
  // tira TODO el chat con un 500, que es exactamente lo contrario de lo que se
  // busca acá: la attestación es una mejora, no un requisito para responder.
  try {
    const existente = getApps().find((a) => a.name === "app-check");
    cacheApp = existente ?? initializeApp({ credential: cert(cred) }, "app-check");
  } catch (error) {
    console.error("App Check: credencial inválida, se sigue sin verificar", error);
    cacheApp = null;
  }
  return cacheApp;
}

export function appCheckActivo(): boolean {
  return adminApp() !== null;
}

/**
 * ¿El pedido trae un token válido?
 *
 * Devuelve `true` cuando App Check no está configurado: la puerta queda abierta
 * hasta que se termine de configurar, en vez de cerrarse sobre los visitantes.
 */
export async function verificarAppCheck(request: Request): Promise<boolean> {
  let app: App | null;
  try {
    app = adminApp();
  } catch (error) {
    // Red final: pase lo que pase acá, el chat responde.
    console.error("App Check: fallo al inicializar", error);
    return true;
  }
  if (!app) return true;

  const token = request.headers.get("X-Firebase-AppCheck");
  if (!token) return false;

  try {
    await getAppCheck(app).verifyToken(token);
    return true;
  } catch {
    // No se loguea el token ni el detalle: es una credencial.
    return false;
  }
}

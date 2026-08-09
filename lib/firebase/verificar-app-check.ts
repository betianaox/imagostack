/**
 * ─────────────────────────────────────────────────────────────────────────────
 * VERIFICACIÓN DE APP CHECK (servidor)
 * ─────────────────────────────────────────────────────────────────────────────
 * Comprueba que el token que mandó el cliente lo emitió Google para ESTE
 * proyecto. Es lo único que hace que App Check sirva: sin verificar del lado
 * del servidor, la cabecera es decorativa.
 *
 * TODO acá falla hacia el lado seguro: si algo no se puede verificar —falta la
 * credencial, está mal formada, el SDK no carga— se responde igual y se loguea.
 * La attestación es una mejora sobre el chat, no un requisito para que conteste.
 *
 * `firebase-admin` se importa DENTRO de la función y no arriba del archivo. Es
 * un SDK pesado de Node: importado arriba, cualquier problema al resolverlo en
 * el entorno serverless tumba el módulo entero antes de ejecutar una línea, y
 * la ruta devuelve 500 con cuerpo vacío. Así, además, no se carga nunca si App
 * Check no está configurado.
 */

/** Tipo mínimo: no se importa el del SDK para no arrastrarlo al bundle. */
type AppAdmin = { name: string };

let cacheApp: AppAdmin | null | undefined;

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
      // quedan escapados. Sin esto la firma no valida y el error es opaco.
      privateKey: String(json.private_key).replace(/\\n/g, "\n"),
    };
  } catch {
    console.error("App Check: FIREBASE_SERVICE_ACCOUNT no es un JSON válido");
    return null;
  }
}

async function adminApp(): Promise<AppAdmin | null> {
  if (cacheApp !== undefined) return cacheApp;

  const cred = credenciales();
  if (!cred) {
    cacheApp = null;
    return null;
  }

  try {
    const { getApps, initializeApp, cert } = await import("firebase-admin/app");
    const existente = getApps().find((a) => a.name === "app-check");
    cacheApp = existente ?? initializeApp({ credential: cert(cred) }, "app-check");
  } catch (error) {
    console.error("App Check: no se pudo inicializar, se sigue sin verificar", error);
    cacheApp = null;
  }
  return cacheApp;
}

export async function appCheckActivo(): Promise<boolean> {
  return (await adminApp()) !== null;
}

/**
 * ¿El pedido trae un token válido?
 *
 * Devuelve `true` cuando App Check no está configurado o no se pudo cargar: la
 * puerta queda abierta en vez de cerrarse sobre los visitantes.
 */
export async function verificarAppCheck(request: Request): Promise<boolean> {
  let app: AppAdmin | null = null;
  try {
    app = await adminApp();
  } catch (error) {
    console.error("App Check: fallo inesperado al inicializar", error);
    return true;
  }
  if (!app) return true;

  const token = request.headers.get("X-Firebase-AppCheck");
  if (!token) return false;

  try {
    const { getAppCheck } = await import("firebase-admin/app-check");
    // El tipo real lo pone el SDK; acá alcanza con la instancia.
    await getAppCheck(app as never).verifyToken(token);
    return true;
  } catch {
    // No se loguea el token ni el detalle: es una credencial.
    return false;
  }
}

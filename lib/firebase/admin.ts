/**
 * ─────────────────────────────────────────────────────────────────────────────
 * FIREBASE ADMIN (servidor)
 * ─────────────────────────────────────────────────────────────────────────────
 * La cuenta de servicio y el acceso a Firestore con privilegios de servidor.
 * Lo que se escribe por acá saltea las reglas: es lo que permite guardar los
 * mensajes del formulario sin abrirle a nadie la escritura desde el navegador.
 *
 * Igual que en App Check, `firebase-admin` se importa dentro de las funciones
 * y nunca arriba del archivo: un problema al resolver el SDK en el entorno
 * serverless no puede tumbar la ruta entera antes de ejecutar una línea.
 */

export type ServiceAccount = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

/**
 * La cuenta de servicio, como JSON en una sola variable. Se guarda así y no
 * como archivo porque en Vercel no hay disco donde dejarlo.
 */
export function serviceAccount(): ServiceAccount | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) return null;

  try {
    const json = JSON.parse(raw);
    if (!json.project_id || !json.client_email || !json.private_key) return null;
    return {
      projectId: json.project_id,
      clientEmail: json.client_email,
      // Al pasar por una variable de entorno los saltos de línea de la clave
      // quedan escapados. Sin esto la firma no valida y el error es opaco.
      privateKey: String(json.private_key).replace(/\\n/g, "\n"),
    };
  } catch {
    console.error("Firebase Admin: FIREBASE_SERVICE_ACCOUNT no es un JSON válido");
    return null;
  }
}

/** Tipo mínimo: no se importa el del SDK para no arrastrarlo al bundle. */
type Firestore = import("firebase-admin/firestore").Firestore;

let cachedDb: Firestore | null | undefined;

/** Firestore con privilegios de servidor, o null si no hay credencial. */
export async function adminDb(): Promise<Firestore | null> {
  if (cachedDb !== undefined) return cachedDb;

  const credential = serviceAccount();
  if (!credential) {
    cachedDb = null;
    return null;
  }

  try {
    const { getApps, initializeApp, cert } = await import("firebase-admin/app");
    const { getFirestore } = await import("firebase-admin/firestore");
    const app =
      getApps().find((item) => item.name === "server") ??
      initializeApp({ credential: cert(credential) }, "server");
    cachedDb = getFirestore(app);
  } catch (error) {
    console.error("Firebase Admin: no se pudo inicializar Firestore", error);
    cachedDb = null;
  }
  return cachedDb;
}

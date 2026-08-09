"use client";

import { COLLECTIONS, type UserProfile } from "@/lib/firebase/collections";
import type { Locale } from "@/lib/i18n";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PUENTE ENTRE FIREBASE Y EL STORE DE SESIÓN
 * ─────────────────────────────────────────────────────────────────────────────
 * Todo el SDK se importa dinámicamente: quien no abra el chat ni entre al
 * panel no descarga una línea de Firebase.
 *
 * El perfil se crea al iniciar sesión, no antes. Los visitantes anónimos
 * tienen uid —lo necesitan para que las reglas protejan su conversación— pero
 * no documento en `users`: no tiene sentido llenar la colección con gente que
 * probablemente no vuelva.
 */

/**
 * Errores del popup que significan "acá no se puede abrir una ventana", no
 * "el usuario se arrepintió". Solo con estos vale la pena redirigir: si
 * alguien cerró el popup a propósito, mandarlo a otra página sería peor.
 */
const POPUP_UNAVAILABLE = new Set([
  "auth/popup-blocked",
  "auth/operation-not-supported-in-this-environment",
  "auth/web-storage-unsupported",
]);

function popupUnavailable(error: unknown): boolean {
  const code = (error as { code?: string })?.code;
  return Boolean(code && POPUP_UNAVAILABLE.has(code));
}

/**
 * Inicia sesión con Google. Devuelve el uid, o `null` si la página se está
 * yendo a Google por redirección —en ese caso la sesión vuelve resuelta y
 * quien la recoge es `SessionSync`, no esta llamada—.
 *
 * Empieza por el popup porque no saca a nadie de la página. Pero en el
 * celular no siempre hay popup: los navegadores embebidos —el que abre
 * WhatsApp o Instagram al tocar un link— los bloquean, y sin este respaldo el
 * botón no haría nada visible.
 */
export async function signInWithGoogle(): Promise<string | null> {
  const [{ getAuthClient }, auth] = await Promise.all([
    import("@/lib/firebase/client"),
    import("firebase/auth"),
  ]);

  const provider = new auth.GoogleAuthProvider();
  // Fuerza el selector de cuenta: en una máquina con varias sesiones de Google
  // conviene elegir a propósito y no que decida el navegador.
  provider.setCustomParameters({ prompt: "select_account" });

  const client = getAuthClient();

  try {
    const credential = await auth.signInWithPopup(client, provider);
    return credential.user.uid;
  } catch (error) {
    if (!popupUnavailable(error)) throw error;

    // No devuelve: a partir de acá la página se va a Google.
    await auth.signInWithRedirect(client, provider);
    return null;
  }
}

/**
 * Cierra el viaje de vuelta desde Google cuando se entró por redirección.
 *
 * La sesión se restaura sola, pero pedir el resultado es lo que deja ver el
 * error si algo falló en el camino: sin esto, un login rechazado se vería como
 * una pantalla de login que sencillamente no pasa nada.
 */
export async function completeRedirectSignIn(): Promise<void> {
  const [{ getAuthClient }, auth] = await Promise.all([
    import("@/lib/firebase/client"),
    import("firebase/auth"),
  ]);

  await auth.getRedirectResult(getAuthClient());
}

export async function signOut(): Promise<void> {
  const [{ getAuthClient }, auth] = await Promise.all([
    import("@/lib/firebase/client"),
    import("firebase/auth"),
  ]);
  await auth.signOut(getAuthClient());
}

/**
 * Carga el perfil, creándolo la primera vez.
 *
 * El rol inicial es siempre `visitor`: promover es potestad de un
 * administrador, y las reglas lo hacen cumplir además de esta función.
 */
export async function loadOrCreateProfile(
  user: { uid: string; email: string | null; displayName: string | null; photoURL: string | null },
  lang: Locale,
): Promise<UserProfile | null> {
  const [{ getDb }, firestore] = await Promise.all([
    import("@/lib/firebase/client"),
    import("firebase/firestore"),
  ]);

  const ref = firestore.doc(getDb(), COLLECTIONS.users, user.uid);
  const snapshot = await firestore.getDoc(ref);

  if (snapshot.exists()) {
    return snapshot.data() as UserProfile;
  }

  const now = Date.now();
  const profile: UserProfile = {
    role: "visitor",
    lang,
    email: user.email,
    name: user.displayName,
    photoURL: user.photoURL,
    createdAt: now,
    updatedAt: now,
  };

  await firestore.setDoc(ref, profile);
  return profile;
}

/** Guarda el idioma preferido del usuario. */
export async function saveLanguagePreference(
  uid: string,
  lang: Locale,
): Promise<void> {
  const [{ getDb }, firestore] = await Promise.all([
    import("@/lib/firebase/client"),
    import("firebase/firestore"),
  ]);

  await firestore.updateDoc(firestore.doc(getDb(), COLLECTIONS.users, uid), {
    lang,
    updatedAt: Date.now(),
  });
}

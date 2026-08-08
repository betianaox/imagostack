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

/** Inicia sesión con Google. Devuelve el uid. */
export async function signInWithGoogle(): Promise<string> {
  const [{ getAuthClient }, auth] = await Promise.all([
    import("@/lib/firebase/client"),
    import("firebase/auth"),
  ]);

  const provider = new auth.GoogleAuthProvider();
  // Fuerza el selector de cuenta: en una máquina con varias sesiones de Google
  // conviene elegir a propósito y no que decida el navegador.
  provider.setCustomParameters({ prompt: "select_account" });

  const credential = await auth.signInWithPopup(getAuthClient(), provider);
  return credential.user.uid;
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

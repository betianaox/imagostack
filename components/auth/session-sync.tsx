"use client";

import { useEffect } from "react";
import { completeRedirectSignIn, loadOrCreateProfile } from "@/lib/firebase/session";
import { useSession } from "@/lib/store/session";
import type { Locale } from "@/lib/i18n";

/**
 * Mantiene el store de sesión al día con Firebase Auth.
 *
 * Se monta una sola vez en el layout: esa es la razón de que la sesión viva en
 * un store y no en un hook por componente. Un único listener, una única
 * lectura del perfil, y cualquier parte del sitio lee el estado sin volver a
 * preguntarle a Firebase.
 *
 * Solo se activa cuando alguien ya tiene sesión iniciada: no fuerza el login
 * anónimo, que lo dispara el chat cuando hace falta.
 */
export function SessionSync({ lang }: { lang: Locale }) {
  const setUser = useSession((state) => state.setUser);
  const setProfile = useSession((state) => state.setProfile);
  const setStatus = useSession((state) => state.setStatus);

  useEffect(() => {
    let active = true;
    let stop: (() => void) | undefined;

    (async () => {
      try {
        const [{ isFirebaseConfigured, getAuthClient }, auth] =
          await Promise.all([
            import("@/lib/firebase/client"),
            import("firebase/auth"),
          ]);

        if (!isFirebaseConfigured() || !active) {
          setStatus("anonymous");
          return;
        }

        // Si venimos de vuelta de Google por redirección, esto lo cierra. Es
        // inofensivo cuando no fue el caso: no hay resultado y sigue de largo.
        try {
          await completeRedirectSignIn();
        } catch (error) {
          console.warn("Sesión: la vuelta desde Google falló", error);
        }

        if (!active) return;

        stop = auth.onAuthStateChanged(getAuthClient(), async (user) => {
          if (!active) return;

          if (!user) {
            setUser(null);
            setProfile(null);
            return;
          }

          setUser({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
            isAnonymous: user.isAnonymous,
          });

          // Los anónimos no tienen perfil: viven solo en su conversación.
          if (user.isAnonymous) {
            setProfile(null);
            return;
          }

          try {
            setProfile(await loadOrCreateProfile(user, lang));
          } catch (error) {
            console.warn("Sesión: no se pudo cargar el perfil", error);
            setProfile(null);
          }
        });
      } catch (error) {
        console.warn("Sesión: Firebase no disponible", error);
        if (active) setStatus("error");
      }
    })();

    return () => {
      active = false;
      stop?.();
    };
  }, [lang, setProfile, setStatus, setUser]);

  return null;
}

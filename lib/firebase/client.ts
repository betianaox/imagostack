import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  type Auth,
  type User,
} from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CLIENTE DE FIREBASE
 * ─────────────────────────────────────────────────────────────────────────────
 * Se inicializa perezosamente: el SDK no se carga hasta que alguien abre el
 * chat o entra al panel. La home no paga un solo byte de Firebase — importa
 * en un sitio que vende que hace apps rápidas.
 *
 * Toda la configuración viene de variables `NEXT_PUBLIC_`, que son públicas por
 * diseño: viajan en el bundle del navegador. Lo que protege los datos son las
 * reglas de Firestore, no ocultar estos valores.
 */

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** Sin configuración, el chat sigue funcionando: solo pierde la persistencia. */
export function isFirebaseConfigured(): boolean {
  return Boolean(config.apiKey && config.projectId);
}

let app: FirebaseApp | undefined;

function getApp(): FirebaseApp {
  if (app) return app;
  app = getApps()[0] ?? initializeApp(config);
  return app;
}

export function getDb(): Firestore {
  return getFirestore(getApp());
}

export function getAuthClient(): Auth {
  return getAuth(getApp());
}

/**
 * Identidad del visitante. Con auth anónima cada uno recibe un uid propio y
 * estable en el navegador, que es lo que permite que las reglas digan
 * "solo podés ver lo tuyo" sin pedirle a nadie que se registre.
 */
export function ensureAnonymousUser(): Promise<User> {
  const auth = getAuthClient();

  return new Promise((resolve, reject) => {
    const stop = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          stop();
          resolve(user);
          return;
        }
        signInAnonymously(auth).catch((error) => {
          stop();
          reject(error);
        });
      },
      (error) => {
        stop();
        reject(error);
      },
    );
  });
}

/** Correo habilitado para atender conversaciones desde el panel. */
export function operatorEmail(): string {
  return process.env.NEXT_PUBLIC_OPERATOR_EMAIL ?? "";
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ConversationMode } from "@/lib/chat/types";
import type { Locale } from "@/lib/i18n";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CONVERSACIÓN PERSISTIDA
 * ─────────────────────────────────────────────────────────────────────────────
 * El navegador escribe directo en Firestore: no hay servidor propio en el
 * medio, y lo que protege los datos son las reglas.
 *
 * Todo el SDK de Firebase se importa dinámicamente dentro del hook, así la
 * home no carga un solo byte de Firebase hasta que alguien abre el chat.
 *
 * Si no hay configuración de Firebase, el hook queda inerte y el chat sigue
 * funcionando sin persistencia. Eso es intencional: el chat nunca depende de
 * que la base esté disponible.
 */

export type PersistedMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  by?: "bot" | "operator";
  at: number;
};

type State = {
  ready: boolean;
  conversationId: string | null;
  mode: ConversationMode;
  /** Mensajes escritos por el operador que el visitante todavía no vio */
  operatorMessages: PersistedMessage[];
};

const STORAGE_KEY = "imagostack:chat:conversation";

export function useConversation(lang: Locale, enabled: boolean) {
  const [state, setState] = useState<State>({
    ready: false,
    conversationId: null,
    mode: "bot",
    operatorMessages: [],
  });

  // Se guardan en refs para que las funciones no cambien de identidad
  const dbRef = useRef<unknown>(null);
  const uidRef = useRef<string | null>(null);
  const idRef = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    (async () => {
      try {
        const [{ isFirebaseConfigured, getDb, ensureAnonymousUser }, firestore] =
          await Promise.all([
            import("@/lib/firebase/client"),
            import("firebase/firestore"),
          ]);

        if (!isFirebaseConfigured() || cancelled) return;

        const user = await ensureAnonymousUser();
        if (cancelled) return;

        const db = getDb();
        dbRef.current = db;
        uidRef.current = user.uid;

        // Se reutiliza la conversación del navegador para que el operador
        // pueda retomarla si el visitante vuelve.
        const stored = readStoredId();
        const id = stored ?? firestore.doc(firestore.collection(db, "conversations")).id;
        idRef.current = id;
        writeStoredId(id);

        const ref = firestore.doc(db, "conversations", id);

        if (!stored) {
          await firestore.setDoc(ref, {
            ownerId: user.uid,
            mode: "bot",
            lang,
            createdAt: firestore.serverTimestamp(),
            updatedAt: firestore.serverTimestamp(),
          });
        }

        if (cancelled) return;

        // El modo y los mensajes del operador llegan en tiempo real: esto es
        // lo que hace que el visitante vea cuando una persona toma la charla.
        const unsubMode = firestore.onSnapshot(ref, (snapshot) => {
          const data = snapshot.data();
          if (!data) return;
          setState((current) => ({
            ...current,
            mode: (data.mode as ConversationMode) ?? "bot",
          }));
        });

        // El filtro por `ownerId` no es opcional: las reglas de Firestore no
        // filtran resultados, validan la consulta. Sin esta condición no puede
        // probar que solo devolverá documentos permitidos y rechaza todo con
        // permission-denied, aunque el usuario sea efectivamente el dueño.
        const messagesRef = firestore.query(
          firestore.collection(db, "conversations", id, "messages"),
          firestore.where("ownerId", "==", user.uid),
          firestore.where("by", "==", "operator"),
          firestore.orderBy("at", "asc"),
        );

        const unsubMessages = firestore.onSnapshot(messagesRef, (snapshot) => {
          const messages = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              role: "assistant" as const,
              text: String(data.text ?? ""),
              by: "operator" as const,
              at: Number(data.at ?? 0),
            };
          });
          setState((current) => ({ ...current, operatorMessages: messages }));
        });

        unsubscribe = () => {
          unsubMode();
          unsubMessages();
        };

        setState((current) => ({ ...current, ready: true, conversationId: id }));
      } catch (error) {
        // Sin persistencia el chat sigue andando: no se rompe nada
        console.warn("Chat: sin persistencia", error);
      }
    })();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [enabled, lang]);

  /** Guarda un mensaje en la conversación. Silencioso si no hay persistencia. */
  const persist = useCallback(
    async (message: { role: "user" | "assistant"; text: string }) => {
      const db = dbRef.current;
      const uid = uidRef.current;
      const id = idRef.current;
      if (!db || !uid || !id) return;

      try {
        const firestore = await import("firebase/firestore");
        await firestore.addDoc(
          firestore.collection(db as never, "conversations", id, "messages"),
          {
            ownerId: uid,
            role: message.role,
            text: message.text.slice(0, 5000),
            by: message.role === "assistant" ? "bot" : null,
            at: Date.now(),
          },
        );
        await firestore.updateDoc(
          firestore.doc(db as never, "conversations", id),
          { updatedAt: firestore.serverTimestamp() },
        );
      } catch (error) {
        console.warn("Chat: no se pudo guardar el mensaje", error);
      }
    },
    [],
  );

  return { ...state, persist };
}

function readStoredId(): string | null {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStoredId(id: string) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, id);
  } catch {
    // Modo incógnito: la conversación no sobrevive a la recarga, y está bien
  }
}

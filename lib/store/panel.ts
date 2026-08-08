"use client";

import { create } from "zustand";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ESTADO DEL PANEL
 * ─────────────────────────────────────────────────────────────────────────────
 * La lista de conversaciones se dibuja en el menú lateral y el chat en el área
 * grande: son dos componentes lejanos entre sí que miran los mismos datos.
 *
 * Pasarlos por props obligaría a que el caparazón —que es genérico y no sabe
 * nada de conversaciones— los cargara. Con un store, el listener vive en un
 * lado y los dos leen de acá.
 */

export type PanelConversation = {
  id: string;
  ownerId: string;
  mode: "bot" | "operator";
  lang: string;
  operatorId?: string | null;
  operatorSeenAt?: number | null;
  updatedAtMs: number;
  /**
   * Copia del último mensaje, guardada en la conversación misma. Sirve para
   * dos cosas que de otro modo costarían una lectura por hilo: mostrar de qué
   * se está hablando sin abrirlo, y poder buscar por contenido.
   */
  lastMessage?: string;
};

type PanelState = {
  /** null mientras todavía no llegó la primera respuesta de Firestore */
  conversations: PanelConversation[] | null;
  selectedId: string | null;
  /** Menú lateral en pantallas chicas, donde es un cajón y no una columna */
  navOpen: boolean;

  setConversations: (list: PanelConversation[]) => void;
  select: (id: string | null) => void;
  setNavOpen: (open: boolean) => void;
  reset: () => void;
};

export const usePanel = create<PanelState>((set) => ({
  conversations: null,
  selectedId: null,
  navOpen: false,

  setConversations: (conversations) => set({ conversations }),

  // Elegir una conversación cierra el cajón: en el celular el chat ocupa la
  // pantalla entera y dejarlo tapado por el menú obligaría a un toque extra.
  select: (selectedId) => set({ selectedId, navOpen: false }),

  setNavOpen: (navOpen) => set({ navOpen }),

  reset: () => set({ conversations: null, selectedId: null, navOpen: false }),
}));

/** La conversación abierta, ya resuelta contra la lista. */
export function selectCurrentConversation(
  state: PanelState,
): PanelConversation | null {
  return (
    state.conversations?.find((item) => item.id === state.selectedId) ?? null
  );
}

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
  /**
   * Cuándo la abrió alguien del equipo por primera vez; 0 si nadie. Es
   * compartido, no por persona: el panel lo atiende un equipo chico y lo que
   * importa es que alguien la haya visto, no quién.
   */
  panelOpenedAtMs: number;
};

/**
 * Nadie del equipo la abrió todavía. Una vez abierta deja de contar aunque
 * sigan llegando mensajes: el contador avisa de chats nuevos, no de actividad.
 */
export function isConversationUnopened(conversation: PanelConversation): boolean {
  return conversation.panelOpenedAtMs === 0;
}

/** Un mensaje del formulario, tal como lo muestra la sección Mensajes. */
export type PanelInquiry = {
  id: string;
  name: string;
  email: string;
  about: string;
  message: string;
  read: boolean;
  createdAtMs: number;
};

type PanelState = {
  /** null mientras todavía no llegó la primera respuesta de Firestore */
  conversations: PanelConversation[] | null;
  selectedId: string | null;
  /** null mientras no llegó la primera respuesta, igual que las conversaciones */
  inquiries: PanelInquiry[] | null;
  /**
   * Sin leer, contados aparte de la lista: la lista trae los últimos cien y
   * un mensaje viejo sin abrir tiene que seguir contando aunque no entre.
   */
  unreadInquiries: number;
  /** Menú lateral en pantallas chicas, donde es un cajón y no una columna */
  navOpen: boolean;

  setConversations: (list: PanelConversation[]) => void;
  setInquiries: (list: PanelInquiry[]) => void;
  setUnreadInquiries: (count: number) => void;
  select: (id: string | null) => void;
  setNavOpen: (open: boolean) => void;
  reset: () => void;
};

export const usePanel = create<PanelState>((set) => ({
  conversations: null,
  selectedId: null,
  inquiries: null,
  unreadInquiries: 0,
  navOpen: false,

  setConversations: (conversations) => set({ conversations }),
  setInquiries: (inquiries) => set({ inquiries }),
  setUnreadInquiries: (unreadInquiries) => set({ unreadInquiries }),

  // Elegir una conversación cierra el cajón: en el celular el chat ocupa la
  // pantalla entera y dejarlo tapado por el menú obligaría a un toque extra.
  select: (selectedId) => set({ selectedId, navOpen: false }),

  setNavOpen: (navOpen) => set({ navOpen }),

  reset: () =>
    set({
      conversations: null,
      selectedId: null,
      inquiries: null,
      unreadInquiries: 0,
      navOpen: false,
    }),
}));

/** La conversación abierta, ya resuelta contra la lista. */
export function selectCurrentConversation(
  state: PanelState,
): PanelConversation | null {
  return (
    state.conversations?.find((item) => item.id === state.selectedId) ?? null
  );
}

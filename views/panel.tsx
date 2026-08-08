"use client";

import {
  ConversationsNav,
  ConversationsSection,
  useConversationsFeed,
} from "@/components/panel/conversations-section";
import { MessagesSection } from "@/components/panel/messages-section";
import { PanelShell, type PanelSection } from "@/components/panel/panel-shell";
import { UsersSection } from "@/components/panel/users-section";
import type { Dictionary } from "@/lib/dictionaries";
import { useSession } from "@/lib/store/session";

/**
 * Composición del panel.
 *
 * Sumar una sección es agregar una entrada a este array: el caparazón se
 * encarga del login, el control de acceso y la navegación.
 *
 * Conversaciones cuelga su lista del menú lateral: los hilos se ven debajo del
 * grupo cuando está desplegado y desaparecen al plegarlo, así el área grande
 * queda entera para el chat.
 */
export function PanelView({ dict }: { dict: Dictionary }) {
  const isAdmin = useSession((state) => state.isAdmin);

  // Acá y no en la lista: si el listener viviera en el menú, plegar el grupo
  // lo cortaría y el chat abierto se quedaría sin su conversación.
  useConversationsFeed();

  const sections: PanelSection[] = [
    {
      id: "conversations",
      label: dict.panel.sections.conversations,
      icon: "chat",
      nav: <ConversationsNav dict={dict} />,
      content: <ConversationsSection dict={dict} />,
    },
    {
      id: "messages",
      label: dict.panel.sections.messages,
      icon: "mail",
      content: <MessagesSection dict={dict} />,
    },
  ];

  // Gestionar roles es potestad de un administrador; las reglas de Firestore
  // dicen lo mismo, esto solo evita mostrar una sección que fallaría al leer.
  if (isAdmin) {
    sections.push({
      id: "users",
      label: dict.panel.sections.users,
      icon: "users",
      content: <UsersSection dict={dict} />,
    });
  }

  return <PanelShell dict={dict} sections={sections} />;
}

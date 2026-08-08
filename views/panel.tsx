"use client";

import { ConversationsSection } from "@/components/panel/conversations-section";
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
 * Conversaciones es un grupo: sus hijos son los bots. Hoy hay uno solo —el
 * asistente del sitio— pero cuando cada cliente tenga el suyo, agregarlo es
 * sumar un hijo con su propio origen, no otra pantalla.
 */
export function PanelView({ dict }: { dict: Dictionary }) {
  const isAdmin = useSession((state) => state.isAdmin);

  const sections: PanelSection[] = [
    {
      id: "conversations",
      label: dict.panel.sections.conversations,
      icon: "chat",
      content: <ConversationsSection dict={dict} />,
      children: [
        {
          id: "site-bot",
          label: dict.panel.sections.siteBot,
          icon: "sparkles",
          content: <ConversationsSection dict={dict} />,
        },
      ],
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

"use client";

import { Icon } from "@/components/icons";

/** Evento que abre el widget desde cualquier parte del sitio. */
export const OPEN_CHAT_EVENT = "imagostack:open-chat";

/**
 * Enlace que abre el chat.
 *
 * Va por un evento del navegador en vez de compartir estado con el widget:
 * así cualquier sección puede invitarlo a probarlo sin que el widget tenga
 * que saber quién lo llamó ni volverse un contexto global.
 */
export function OpenChatLink({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT))}
      className="group/chat mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-coral-600 transition hover:text-coral-700"
    >
      {label}
      <Icon
        name="arrowRight"
        className="size-3.5 transition-transform duration-300 group-hover/chat:translate-x-0.5"
      />
    </button>
  );
}

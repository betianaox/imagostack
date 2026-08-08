"use client";

import { Icon } from "@/components/icons";
import type { Dictionary } from "@/lib/dictionaries";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SECCIÓN: MENSAJES
 * ─────────────────────────────────────────────────────────────────────────────
 * Va a listar las consultas enviadas desde los formularios del sitio.
 *
 * Hoy el formulario solo manda un correo por Resend y no guarda nada: para que
 * esta sección tenga qué mostrar hay que empezar a persistir cada envío en
 * Firestore —además de mandarlo— y ajustar la política de privacidad, que
 * ahora mismo dice que los mensajes no se guardan en ninguna base de datos.
 *
 * Está acá vacía a propósito: el menú del panel ya tiene su lugar, así que
 * llenarla es escribir el listado, no rehacer la navegación.
 */
export function MessagesSection({ dict }: { dict: Dictionary }) {
  const panel = dict.panel;

  return (
    <div className="flex h-[calc(100vh-17rem)] min-h-96 flex-col overflow-hidden rounded-2xl border border-brand-500/10 bg-white">
      <div className="shrink-0 border-b border-brand-500/10 px-4 py-3">
        <p className="text-sm font-semibold text-ink">
          {panel.sections.messages}
        </p>
        <p className="mt-0.5 text-xs text-ink/50">{panel.messagesIntro}</p>
      </div>

      <div className="grid flex-1 place-items-center p-8">
        <div className="max-w-sm text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-700">
            <Icon name="mail" className="size-5.5" />
          </span>
          <p className="mt-4 text-sm leading-relaxed text-ink/60">
            {panel.messagesSoon}
          </p>
        </div>
      </div>
    </div>
  );
}

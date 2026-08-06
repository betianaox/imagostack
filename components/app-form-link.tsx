"use client";

import { Icon } from "@/components/icons";

/**
 * Lleva al formulario de contacto de la misma página con la app ya elegida.
 *
 * El `select` del formulario no es controlado (los valores se leen con
 * FormData al enviar), así que alcanza con escribirle el valor directamente
 * antes de hacer scroll — no hace falta compartir estado entre secciones.
 */
export function AppFormLink({
  appName,
  label,
}: {
  appName: string;
  label: string;
}) {
  const goToForm = () => {
    const select = document.getElementById("app");
    if (select instanceof HTMLSelectElement) {
      select.value = appName;
    }

    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
    // Deja el cursor listo en el mensaje, sin robarle el scroll a la animación
    const message = document.getElementById("mensaje");
    if (message instanceof HTMLTextAreaElement) {
      message.focus({ preventScroll: true });
    }
  };

  return (
    <button
      type="button"
      onClick={goToForm}
      className="inline-flex items-center gap-1 text-sm font-semibold text-coral-600 transition hover:text-coral-700"
    >
      {label}
      <Icon name="arrowRight" className="size-3.5" />
    </button>
  );
}

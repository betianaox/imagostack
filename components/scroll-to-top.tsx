"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Lleva la ventana al tope al cambiar de página.
 *
 * El App Router alinea el inicio del contenido en vez de ir a cero, y como el
 * header es sticky quedaba corrido justo su altura. Además el
 * `scroll-behavior: smooth` global animaba ese salto, y la animación se cortaba
 * cuando el contenido nuevo cambiaba de alto al montarse — de ahí que a veces
 * quedara a mitad de camino.
 *
 * Se usa `instant` a propósito: anula el smooth del CSS solo para este caso,
 * sin perderlo en los enlaces con ancla (#contacto, #nosotros).
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const previous = useRef<string | null>(null);

  useEffect(() => {
    const changed = previous.current !== null && previous.current !== pathname;
    previous.current = pathname;

    // En la primera carga no se toca: si alguien recarga a mitad de página,
    // o llega con un ancla, hay que respetar dónde está.
    if (!changed) return;
    if (window.location.hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

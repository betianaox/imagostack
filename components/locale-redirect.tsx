"use client";

import { useEffect } from "react";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n";

const STORAGE_KEY = "imagostack:lang";

/** Guarda la elección manual del visitante para no volver a redirigirlo. */
export function rememberLocale(lang: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Modo incógnito o storage bloqueado: no pasa nada, se detecta cada vez
  }
}

/**
 * Detección de idioma del navegador.
 *
 * El sitio se exporta estático, así que no hay middleware que pueda leer el
 * header `Accept-Language`: la detección se hace acá, en el cliente, y solo
 * cuando se cumplen las tres condiciones:
 *
 *   1. El visitante está en una URL sin prefijo (es decir, en español).
 *   2. Nunca eligió un idioma a mano (no hay nada en localStorage).
 *   3. El idioma de su navegador es uno de los que traducimos.
 *
 * Así, quien entra desde un buscador a la versión en español y quiere leerla
 * en español, la sigue viendo en español si ya lo eligió alguna vez.
 */
export function LocaleRedirect({ currentLang }: { currentLang: Locale }) {
  useEffect(() => {
    if (currentLang !== defaultLocale) {
      // Ya está en una versión con prefijo: esa visita define su preferencia
      rememberLocale(currentLang);
      return;
    }

    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return;
    }

    if (stored) return;

    const preferred = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];

    const match = preferred
      .map((tag) => tag.slice(0, 2).toLowerCase())
      .find((tag) => isLocale(tag) && tag !== defaultLocale);

    if (!match || !isLocale(match) || !locales.includes(match)) return;

    const { pathname, search, hash } = window.location;
    window.location.replace(`/${match}${pathname}${search}${hash}`);
  }, [currentLang]);

  return null;
}

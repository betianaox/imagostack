import { en } from "@/lib/dictionaries/en";
import { es, type Dictionary } from "@/lib/dictionaries/es";
import { it } from "@/lib/dictionaries/it";
import { pt } from "@/lib/dictionaries/pt";
import type { Locale } from "@/lib/i18n";

const dictionaries: Record<Locale, Dictionary> = { es, en, pt, it };

/** Diccionario completo de un idioma. Todo el texto del sitio sale de acá. */
export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

export type { Dictionary };

/** Reemplaza `{clave}` por su valor: fill("Hola {name}", {name: "Bet"}). */
export function fillText(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match,
  );
}

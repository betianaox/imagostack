/**
 * ─────────────────────────────────────────────────────────────────────────────
 * IDIOMAS
 * ─────────────────────────────────────────────────────────────────────────────
 * El español vive en la raíz (`/apps`) y los demás idiomas cuelgan de un
 * prefijo (`/en/apps`, `/pt/apps`, `/it/apps`). Así la versión principal conserva
 * sus URLs y es la canónica para Google.
 *
 * El italiano existe porque Italia es el segundo mercado de pádel del mundo y las
 * fichas de Play están traducidas a ese idioma: si la política de privacidad no lo
 * estuviera, el enlace desde la app llevaría a una página en otro idioma.
 *
 * Como el sitio se exporta estático no hay middleware que redirija por
 * `Accept-Language`: la detección del idioma del navegador la hace
 * `components/locale-redirect.tsx` en el cliente, una sola vez y solo si el
 * visitante no eligió idioma antes.
 */

export const locales = ["es", "en", "pt", "it"] as const;

export type Locale = (typeof locales)[number];

/** Idioma por defecto: el que se sirve sin prefijo en la URL. */
export const defaultLocale: Locale = "es";

/** Idiomas con prefijo, los únicos que genera `app/[lang]`. */
export const prefixedLocales = locales.filter(
  (locale) => locale !== defaultLocale,
);

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
  pt: "Português",
  it: "Italiano",
};

/** Etiqueta corta para el selector del header. */
export const localeShortNames: Record<Locale, string> = {
  es: "ES",
  en: "EN",
  pt: "PT",
  it: "IT",
};

/** Valor del atributo `lang` y de los `hreflang`. */
export const localeTags: Record<Locale, string> = {
  es: "es",
  en: "en",
  pt: "pt",
  it: "it",
};

/** Locale de Open Graph. */
export const localeOgTags: Record<Locale, string> = {
  es: "es_AR",
  en: "en_US",
  pt: "pt_BR",
  it: "it_IT",
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

/**
 * Arma una ruta interna para un idioma.
 * `path("/apps", "es") → "/apps"` · `path("/apps", "en") → "/en/apps"`
 */
export function path(route: string, lang: Locale): string {
  const clean = route === "/" ? "" : route;
  return lang === defaultLocale ? clean || "/" : `/${lang}${clean}`;
}

/** Un texto con sus cuatro traducciones. */
export type L10n<T> = Record<Locale, T>;

/** Devuelve la variante del idioma pedido. */
export function t<T>(value: L10n<T>, lang: Locale): T {
  return value[lang];
}

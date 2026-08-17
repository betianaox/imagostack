import type { Locale } from "@/lib/i18n";

/**
 * Configuración global del sitio.
 * Todo lo que se repite en metadatos, footer y páginas legales sale de aquí.
 */
export const site = {
  name: "ImagoStack",
  legalName: "ImagoStack",
  domain: "imagostack.com",
  url: "https://imagostack.com",
  /** Slogan de marca */
  tagline: "Full-cycle, full-stack",
  /** Bajada descriptiva, para metadatos y footer */
  pitch: "Apps móviles que se sienten bien de usar",
  description:
    "ImagoStack diseña, desarrolla y publica aplicaciones móviles para Android de punta a punta. Descubre nuestras apps en Google Play.",
  locale: "es_AR",
  /**
   * Las dos únicas casillas del sitio. Las consultas de privacidad y de
   * eliminación de datos también van a `support`, que es la dirección que se
   * publica en Google Play.
   */
  email: {
    /** Contacto general y comercial */
    general: "info@imagostack.com",
    /** Soporte de usuarios, privacidad y borrado de datos */
    support: "support@imagostack.com",
  },
  /** Ubicación declarada en las políticas (jurisdicción aplicable) */
  jurisdiction: "República Argentina",
  /** Última actualización de las políticas legales del sitio (ISO) */
  legalUpdatedAt: "2026-08-06",
  /** Perfil de desarrollador en Google Play. Dejar vacío si todavía no existe. */
  playStoreDeveloperUrl: "",
  social: {
    linkedin: "",
    instagram: "",
    github: "",
  },
} as const;

/**
 * Va tipado con `Locale` a proposito: cuando se agrego el italiano este mapa
 * era un `Record<string, string>` y el compilador no dijo nada, asi que las
 * fechas de las paginas legales en italiano salieron en castellano. Con el
 * tipo estricto, agregar un idioma sin su formato de fecha no compila.
 */
const dateLocales: Record<Locale, string> = {
  es: "es-AR",
  en: "en-GB",
  pt: "pt-BR",
  it: "it-IT",
};

/** Formatea una fecha ISO al formato legible de cada idioma. */
export function formatDate(iso: string, lang: Locale = "es"): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(dateLocales[lang], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * El nombre del pais en cada idioma. `site.jurisdiction` es el nombre oficial en
 * castellano, y al interpolarlo tal cual las otras versiones quedaban mezcladas
 * ("operating from República Argentina", "opera dalla República Argentina").
 */
const jurisdictionNames: Record<Locale, string> = {
  es: "República Argentina",
  // En inglés el nombre oficial ("the Argentine Republic") queda forzado en las
  // frases donde se interpola —"ImagoStack — the Argentine Republic."—, así que
  // ahí se usa el nombre corriente del país.
  en: "Argentina",
  pt: "República Argentina",
  it: "Repubblica Argentina",
};

export function jurisdictionName(lang: Locale): string {
  return jurisdictionNames[lang];
}

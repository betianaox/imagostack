/**
 * Configuración global del sitio.
 * Todo lo que se repite en metadatos, footer y páginas legales sale de aquí.
 */
export const site = {
  name: "Imagostack",
  legalName: "Imagostack",
  domain: "imagostack.com",
  url: "https://imagostack.com",
  /** Slogan de marca */
  tagline: "Full-cycle, full-stack",
  /** Bajada descriptiva, para metadatos y footer */
  pitch: "Apps móviles que se sienten bien de usar",
  description:
    "Imagostack diseña, desarrolla y publica aplicaciones móviles para Android de punta a punta. Descubre nuestras apps en Google Play.",
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

const dateLocales: Record<string, string> = {
  es: "es-AR",
  en: "en-GB",
  pt: "pt-BR",
};

/** Formatea una fecha ISO al formato legible de cada idioma. */
export function formatDate(iso: string, lang = "es"): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(
    dateLocales[lang] ?? "es-AR",
    { day: "numeric", month: "long", year: "numeric" },
  );
}

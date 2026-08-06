import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { locales, localeOgTags, localeTags, path, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

/**
 * Alternates de una ruta: canónica del idioma actual + hreflang de los otros.
 * `route` va sin prefijo de idioma, ej "/apps" o "/".
 */
export function alternates(route: string, lang: Locale) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[localeTags[locale]] = `${site.url}${path(route, locale)}`;
  }
  // x-default apunta al idioma por defecto, que es el que vive en la raíz
  languages["x-default"] = `${site.url}${path(route, "es")}`;

  return { canonical: `${site.url}${path(route, lang)}`, languages };
}

/** Metadatos comunes a todas las páginas de un idioma. */
export function pageMetadata({
  lang,
  route,
  title,
  description,
  ogTitle,
  ogImage = "/og.png",
}: {
  lang: Locale;
  route: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogImage?: string;
}): Metadata {
  const dict = getDictionary(lang);

  return {
    title,
    description,
    keywords: dict.meta.keywords,
    alternates: alternates(route, lang),
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: localeOgTags[lang],
      url: `${site.url}${path(route, lang)}`,
      title: ogTitle ?? title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description,
      images: [ogImage],
    },
  };
}

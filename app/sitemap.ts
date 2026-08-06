import type { MetadataRoute } from "next";
import { apps } from "@/lib/apps";
import { locales, localeTags, path } from "@/lib/i18n";
import { site } from "@/lib/site";

// Requerido por `output: "export"`: el sitemap se resuelve en build time.
export const dynamic = "force-static";

type Route = {
  route: string;
  lastModified: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const staticRoutes: Route[] = [
  { route: "/", lastModified: site.legalUpdatedAt, changeFrequency: "monthly", priority: 1 },
  { route: "/apps", lastModified: site.legalUpdatedAt, changeFrequency: "monthly", priority: 0.9 },
  { route: "/soporte", lastModified: site.legalUpdatedAt, changeFrequency: "yearly", priority: 0.6 },
  { route: "/privacidad", lastModified: site.legalUpdatedAt, changeFrequency: "yearly", priority: 0.4 },
  { route: "/terminos", lastModified: site.legalUpdatedAt, changeFrequency: "yearly", priority: 0.3 },
  { route: "/eliminar-datos", lastModified: site.legalUpdatedAt, changeFrequency: "yearly", priority: 0.4 },
];

const appRoutes: Route[] = apps.flatMap((app) => [
  {
    route: `/apps/${app.slug}`,
    lastModified: app.privacy.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    route: `/apps/${app.slug}/privacidad`,
    lastModified: app.privacy.updatedAt,
    changeFrequency: "yearly" as const,
    priority: 0.4,
  },
]);

/**
 * Una entrada por ruta y por idioma, cada una declarando sus alternativas.
 * Así Google entiende que /apps, /en/apps y /pt/apps son la misma página en
 * distintos idiomas y no contenido duplicado.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const all = [...staticRoutes, ...appRoutes];

  return all.flatMap((entry) => {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[localeTags[locale]] = `${site.url}${path(entry.route, locale)}`;
    }

    return locales.map((locale) => ({
      url: `${site.url}${path(entry.route, locale)}`,
      lastModified: entry.lastModified,
      changeFrequency: entry.changeFrequency,
      priority: locale === "es" ? entry.priority : entry.priority * 0.9,
      alternates: { languages },
    }));
  });
}

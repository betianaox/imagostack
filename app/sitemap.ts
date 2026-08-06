import type { MetadataRoute } from "next";
import { apps } from "@/lib/apps";
import { site } from "@/lib/site";

// Requerido por `output: "export"`: el sitemap se resuelve en build time.
export const dynamic = "force-static";

/** Se genera en build time y sale como /sitemap.xml en la exportación estática. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/apps", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/soporte", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/privacidad", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/terminos", priority: 0.3, changeFrequency: "yearly" as const },
    {
      path: "/eliminar-datos",
      priority: 0.4,
      changeFrequency: "yearly" as const,
    },
  ].map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: site.legalUpdatedAt,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const appRoutes = apps.flatMap((app) => [
    {
      url: `${site.url}/apps/${app.slug}`,
      lastModified: app.privacy.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${site.url}/apps/${app.slug}/privacidad`,
      lastModified: app.privacy.updatedAt,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
  ]);

  return [...staticRoutes, ...appRoutes];
}

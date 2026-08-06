import { notFound } from "next/navigation";
import { apps, getApp } from "@/lib/apps";
import { t } from "@/lib/i18n";
import { ogImage } from "@/lib/og-image";

export const dynamic = "force-static";

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

/**
 * Tarjeta social de cada app: /apps/<slug>/og.png
 * Es única y en español; la comparten las tres versiones de idioma porque el
 * nombre de la app y su imagen son los mismos en todas.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  return ogImage({
    kicker: `${t(app.category, "es")} · Android`,
    title: app.name,
    description: t(app.tagline, "es"),
    // El acento claro de la app + el azul de marca: los dos tonos oscuros de
    // algunas apps dejarían el fondo casi negro.
    accent: [app.accent[1], "#26689b"],
  });
}

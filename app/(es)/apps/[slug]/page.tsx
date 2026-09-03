import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { appsVisibles, getApp } from "@/lib/apps";
import { fillText, getDictionary } from "@/lib/dictionaries";
import { t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { AppDetailView } from "@/views/app-detail";

export function generateStaticParams() {
  return appsVisibles.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/apps/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return {};

  const dict = getDictionary("es");
  return pageMetadata({
    lang: "es",
    route: `/apps/${app.slug}`,
    title: fillText(dict.meta.appTitle, {
      app: t(app.name, "es"),
      category: t(app.category, "es").toLowerCase(),
    }),
    description: t(app.description, "es"),
    ogTitle: `${t(app.name, "es")} — ${t(app.tagline, "es")}`,
    ogImage: `/apps/${app.slug}/og.png`,
  });
}

export default async function Page({ params }: PageProps<"/apps/[slug]">) {
  const { slug } = await params;
  const app = getApp(slug);
  // Las ocultas no tienen ficha: existen solo por su política de privacidad, y
  // esa vive en otra ruta. Sin esto, entrar a mano a /apps/<slug> mostraría una
  // ficha vacía de una app que todavía no existe.
  if (!app || app.oculta) notFound();

  return <AppDetailView app={app} lang="es" />;
}

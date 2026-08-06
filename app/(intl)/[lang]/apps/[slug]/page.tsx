import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { apps, getApp } from "@/lib/apps";
import { fillText, getDictionary } from "@/lib/dictionaries";
import { isLocale, prefixedLocales, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { AppDetailView } from "@/views/app-detail";

export function generateStaticParams() {
  return prefixedLocales.flatMap((lang) =>
    apps.map((app) => ({ lang, slug: app.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/apps/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const app = getApp(slug);
  if (!app || !isLocale(lang)) return {};

  const dict = getDictionary(lang);
  return pageMetadata({
    lang,
    route: `/apps/${app.slug}`,
    title: fillText(dict.meta.appTitle, {
      app: app.name,
      category: t(app.category, lang).toLowerCase(),
    }),
    description: t(app.description, lang),
    ogTitle: `${app.name} — ${t(app.tagline, lang)}`,
    ogImage: `/apps/${app.slug}/og.png`,
  });
}

export default async function Page({
  params,
}: PageProps<"/[lang]/apps/[slug]">) {
  const { lang, slug } = await params;
  const app = getApp(slug);
  if (!app || !isLocale(lang)) notFound();

  return <AppDetailView app={app} lang={lang} />;
}

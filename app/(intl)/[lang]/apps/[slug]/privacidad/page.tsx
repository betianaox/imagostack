import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { apps, getApp } from "@/lib/apps";
import { fillText, getDictionary } from "@/lib/dictionaries";
import { isLocale, prefixedLocales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { AppPrivacyView } from "@/views/app-privacy";

export function generateStaticParams() {
  return prefixedLocales.flatMap((lang) =>
    apps.map((app) => ({ lang, slug: app.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/apps/[slug]/privacidad">): Promise<Metadata> {
  const { lang, slug } = await params;
  const app = getApp(slug);
  if (!app || !isLocale(lang)) return {};

  const dict = getDictionary(lang);
  return pageMetadata({
    lang,
    route: `/apps/${app.slug}/privacidad`,
    title: fillText(dict.meta.appPrivacyTitle, { app: app.name }),
    description: fillText(dict.meta.appPrivacyDescription, { app: app.name }),
  });
}

export default async function Page({
  params,
}: PageProps<"/[lang]/apps/[slug]/privacidad">) {
  const { lang, slug } = await params;
  const app = getApp(slug);
  if (!app || !isLocale(lang)) notFound();

  return <AppPrivacyView app={app} lang={lang} />;
}

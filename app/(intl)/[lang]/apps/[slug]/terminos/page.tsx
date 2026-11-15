import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { apps, getApp } from "@/lib/apps";
import { fillText, getDictionary } from "@/lib/dictionaries";
import { isLocale, prefixedLocales, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { AppTermsView } from "@/views/app-terms";

export function generateStaticParams() {
  return prefixedLocales.flatMap((lang) =>
    apps.map((app) => ({ lang, slug: app.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/apps/[slug]/terminos">): Promise<Metadata> {
  const { lang, slug } = await params;
  const app = getApp(slug);
  if (!app || !isLocale(lang)) return {};

  const dict = getDictionary(lang);
  return pageMetadata({
    lang,
    route: `/apps/${app.slug}/terminos`,
    title: fillText(dict.meta.appTermsTitle, { app: t(app.name, lang) }),
    description: fillText(dict.meta.appTermsDescription, { app: t(app.name, lang) }),
  });
}

export default async function Page({
  params,
}: PageProps<"/[lang]/apps/[slug]/terminos">) {
  const { lang, slug } = await params;
  const app = getApp(slug);
  if (!app || !isLocale(lang)) notFound();

  return <AppTermsView app={app} lang={lang} />;
}

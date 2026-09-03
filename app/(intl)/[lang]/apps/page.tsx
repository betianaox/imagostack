import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { appsVisibles } from "@/lib/apps";
import { fillText, getDictionary } from "@/lib/dictionaries";
import { isLocale, prefixedLocales, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { AppsListView } from "@/views/apps-list";

export function generateStaticParams() {
  return prefixedLocales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/apps">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = getDictionary(lang);
  const list = appsVisibles
    .map((app) => `${t(app.name, lang)} (${t(app.category, lang).toLowerCase()})`)
    .join(", ");

  return pageMetadata({
    lang,
    route: "/apps",
    title: dict.meta.appsTitle,
    description: fillText(dict.meta.appsDescription, { list }),
    ogTitle: dict.meta.appsOgTitle,
  });
}

export default async function Page({ params }: PageProps<"/[lang]/apps">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <AppsListView lang={lang} />;
}

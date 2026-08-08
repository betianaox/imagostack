import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PanelView } from "@/views/panel";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, prefixedLocales } from "@/lib/i18n";

export function generateStaticParams() {
  return prefixedLocales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/panel">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  return {
    title: getDictionary(lang).panel.title,
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: PageProps<"/[lang]/panel">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <PanelView dict={getDictionary(lang)} />;
}

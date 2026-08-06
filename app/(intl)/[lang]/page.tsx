import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, prefixedLocales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { HomeView } from "@/views/home";

export function generateStaticParams() {
  return prefixedLocales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = getDictionary(lang);
  return pageMetadata({
    lang,
    route: "/",
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    ogTitle: dict.meta.ogHomeTitle,
  });
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <HomeView lang={lang} />;
}

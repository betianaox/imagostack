import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, prefixedLocales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { SupportView } from "@/views/support";

export function generateStaticParams() {
  return prefixedLocales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/soporte">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = getDictionary(lang);
  return pageMetadata({
    lang,
    route: "/soporte",
    title: dict.meta.supportTitle,
    description: dict.meta.supportDescription,
    ogTitle: dict.meta.supportOgTitle,
  });
}

export default async function Page({ params }: PageProps<"/[lang]/soporte">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <SupportView lang={lang} />;
}

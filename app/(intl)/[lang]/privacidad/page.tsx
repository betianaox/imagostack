import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, prefixedLocales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { PrivacyView } from "@/views/legal";

export function generateStaticParams() {
  return prefixedLocales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/privacidad">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = getDictionary(lang);
  return pageMetadata({
    lang,
    route: "/privacidad",
    title: dict.meta.privacyTitle,
    description: dict.meta.privacyDescription,
  });
}

export default async function Page({ params }: PageProps<"/[lang]/privacidad">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <PrivacyView lang={lang} />;
}

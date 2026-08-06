import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, prefixedLocales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { TermsView } from "@/views/legal";

export function generateStaticParams() {
  return prefixedLocales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/terminos">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = getDictionary(lang);
  return pageMetadata({
    lang,
    route: "/terminos",
    title: dict.meta.termsTitle,
    description: dict.meta.termsDescription,
  });
}

export default async function Page({ params }: PageProps<"/[lang]/terminos">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <TermsView lang={lang} />;
}

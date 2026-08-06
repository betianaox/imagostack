import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, prefixedLocales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { DeleteDataView } from "@/views/legal";

export function generateStaticParams() {
  return prefixedLocales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/eliminar-datos">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = getDictionary(lang);
  return pageMetadata({
    lang,
    route: "/eliminar-datos",
    title: dict.meta.deleteDataTitle,
    description: dict.meta.deleteDataDescription,
  });
}

export default async function Page({ params }: PageProps<"/[lang]/eliminar-datos">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <DeleteDataView lang={lang} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { apps, getApp } from "@/lib/apps";
import { fillText, getDictionary } from "@/lib/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { AppTermsView } from "@/views/app-terms";
import { t } from "@/lib/i18n";

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/apps/[slug]/terminos">): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return {};

  const dict = getDictionary("es");
  return pageMetadata({
    lang: "es",
    route: `/apps/${app.slug}/terminos`,
    title: fillText(dict.meta.appTermsTitle, { app: t(app.name, "es") }),
    description: fillText(dict.meta.appTermsDescription, { app: t(app.name, "es") }),
  });
}

export default async function Page({
  params,
}: PageProps<"/apps/[slug]/terminos">) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  return <AppTermsView app={app} lang="es" />;
}

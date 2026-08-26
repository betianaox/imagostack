import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { apps, getApp } from "@/lib/apps";
import { fillText, getDictionary } from "@/lib/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { AppPrivacyView } from "@/views/app-privacy";
import { t } from "@/lib/i18n";

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/apps/[slug]/privacidad">): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return {};

  const dict = getDictionary("es");
  return pageMetadata({
    lang: "es",
    route: `/apps/${app.slug}/privacidad`,
    title: fillText(dict.meta.appPrivacyTitle, { app: t(app.name, "es") }),
    description: fillText(dict.meta.appPrivacyDescription, { app: t(app.name, "es") }),
  });
}

export default async function Page({
  params,
}: PageProps<"/apps/[slug]/privacidad">) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  return <AppPrivacyView app={app} lang="es" />;
}

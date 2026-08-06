import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppCard } from "@/components/app-card";
import { AppIcon } from "@/components/app-visuals";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { StoreBadge } from "@/components/store-badge";
import { apps, getApp } from "@/lib/apps";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/apps/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return {};

  return {
    title: `${app.name} — ${app.tagline}`,
    description: app.description,
    alternates: { canonical: `/apps/${app.slug}` },
    openGraph: {
      title: `${app.name} · ${site.name}`,
      description: app.description,
      url: `${site.url}/apps/${app.slug}`,
      type: "website",
    },
  };
}

export default async function AppPage({ params }: PageProps<"/apps/[slug]">) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  const others = apps.filter((other) => other.slug !== app.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    applicationCategory: "MobileApplication",
    operatingSystem: "Android",
    url: `${site.url}/apps/${app.slug}`,
    ...(app.playStoreUrl ? { installUrl: app.playStoreUrl } : {}),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: site.legalName, url: site.url },
  };

  return (
    <>
      {/* ───────────────────────── Encabezado ───────────────────────── */}
      <section className="relative overflow-hidden text-white">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(150deg, ${app.accent[0]}, ${app.accent[1]})`,
          }}
        />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="grid-lines absolute inset-0" />

        <div className="shell relative py-14 md:py-20">
          <Link
            href="/apps"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition hover:text-white"
          >
            <Icon name="chevronLeft" className="size-4" />
            Todas las apps
          </Link>

          <div className="mt-8 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div className="flex items-start gap-5">
              <AppIcon app={app} className="size-20 shrink-0 md:size-24" />
              <div>
                <p className="text-[13px] font-semibold tracking-[0.14em] text-white/65 uppercase">
                  {app.category}
                </p>
                <h1 className="mt-2 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance md:text-5xl">
                  {app.name}
                </h1>
                <p className="mt-3 max-w-lg text-lg text-white/80">
                  {app.tagline}
                </p>
                <p className="mt-4 text-xs text-white/60">
                  {app.languages.join(" · ")}
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <StoreBadge url={app.playStoreUrl} />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Capturas ───────────────────────── */}
      <section className="shell py-14 md:py-20">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
            Así se ve
          </h2>
          {app.screenshots.length > 1 && (
            <p className="mt-2 text-sm text-ink/60">
              Elegí una miniatura para recorrer las pantallas, o tocá la captura
              grande para ampliarla.
            </p>
          )}
        </Reveal>

        <div className="mt-8">
          <ScreenshotGallery
            shots={app.screenshots}
            accent={app.accent}
            appName={app.name}
          />
        </div>
      </section>

      {/* ───────────────────────── Detalle ───────────────────────── */}
      <section className="border-y border-brand-500/10 bg-brand-50/50 py-16 md:py-24">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-balance md:text-3xl">
              Sobre {app.name}
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink/70">
              {app.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            {app.claim && (
              <p
                className="mt-6 border-l-2 pl-4 text-lg leading-snug font-medium text-brand-800 italic"
                style={{ borderColor: app.accent[1] }}
              >
                {app.claim}
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={`/apps/${app.slug}/privacidad`}
                className="inline-flex items-center gap-2 rounded-xl border border-brand-500/20 bg-white px-4 py-2.5 text-sm font-semibold text-brand-700 transition hover:border-brand-500/40"
              >
                <Icon name="shield" className="size-4" />
                Política de privacidad
              </Link>
              <Link
                href="/soporte"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-white"
              >
                <Icon name="mail" className="size-4" />
                Necesito ayuda
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {app.features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 80}>
                <div className="h-full rounded-2xl border border-brand-500/10 bg-white p-6">
                  <span
                    className="grid size-11 place-items-center rounded-xl text-white shadow-sm"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${app.accent[0]}, ${app.accent[1]})`,
                    }}
                  >
                    <Icon name={feature.icon} className="size-5.5" />
                  </span>
                  <h3 className="mt-5 font-semibold tracking-tight text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Descarga: solo si ya está en Google Play ─────────────── */}
      {app.playStoreUrl && (
        <section className="shell py-16 md:py-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-4xl bg-ink px-7 py-12 text-white md:px-12">
              <div className="aurora absolute inset-0 opacity-50" />
              <div className="relative flex flex-col items-start gap-7 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-[-0.02em] text-balance md:text-3xl">
                    Descargá {app.name}
                  </h2>
                  <p className="mt-2.5 max-w-lg text-white/70">
                    Disponible para Android en Google Play.
                  </p>
                </div>
                <StoreBadge url={app.playStoreUrl} />
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ───────────────────────── Otras apps ───────────────────────── */}
      {others.length > 0 && (
        <section className="shell pt-16 pb-20 md:pt-24 md:pb-28">
          <h2 className="text-xl font-semibold tracking-[-0.02em] md:text-2xl">
            Otras apps
          </h2>
          <div className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {others.slice(0, 3).map((other, index) => (
              <Reveal key={other.slug} delay={index * 90}>
                <AppCard app={other} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

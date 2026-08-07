import Link from "next/link";
import { AppCard } from "@/components/app-card";
import { AppIcon } from "@/components/app-visuals";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { StoreBadge } from "@/components/store-badge";
import { apps, type App } from "@/lib/apps";
import { fillText, getDictionary } from "@/lib/dictionaries";
import { path, t, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function AppDetailView({ app, lang }: { app: App; lang: Locale }) {
  const dict = getDictionary(lang);
  const others = apps.filter((other) => other.slug !== app.slug);
  const appUrl = `${site.url}${path(`/apps/${app.slug}`, lang)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: app.name,
        description: t(app.description, lang),
        applicationCategory: "MobileApplication",
        applicationSubCategory: t(app.category, lang),
        operatingSystem: "Android",
        url: appUrl,
        image: `${site.url}/apps/${app.slug}/og.png`,
        screenshot: app.screenshots.map((shot) => `${site.url}${shot.src}`),
        inLanguage: app.languages.en,
        ...(app.playStoreUrl ? { installUrl: app.playStoreUrl } : {}),
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: dict.nav.home,
            item: `${site.url}${path("/", lang)}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: dict.nav.apps,
            item: `${site.url}${path("/apps", lang)}`,
          },
          { "@type": "ListItem", position: 3, name: app.name, item: appUrl },
        ],
      },
    ],
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
            href={path("/apps", lang)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition hover:text-white"
          >
            <Icon name="chevronLeft" className="size-4" />
            {dict.appPage.backToApps}
          </Link>

          <div className="mt-8 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div className="flex items-start gap-5">
              <AppIcon app={app} className="size-20 shrink-0 md:size-24" />
              <div>
                <p className="text-[13px] font-semibold tracking-[0.14em] text-white/65 uppercase">
                  {t(app.category, lang)}
                </p>
                <h1 className="mt-2 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance md:text-5xl">
                  {app.name}
                </h1>
                <p className="mt-3 max-w-lg text-lg text-white/80">
                  {t(app.tagline, lang)}
                </p>
                <p className="mt-4 text-xs text-white/60">
                  {dict.appPage.availableIn}: {t(app.languages, lang).join(" · ")}
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
            {dict.appPage.screenshotsTitle}
          </h2>
          {app.screenshots.length > 1 && (
            <p className="mt-2 text-sm text-ink/60">
              {dict.appPage.screenshotsHint}
            </p>
          )}
        </Reveal>

        <div className="mt-8">
          <ScreenshotGallery
            shots={app.screenshots}
            accent={app.accent}
            appName={app.name}
            lang={lang}
            dict={dict}
          />
        </div>
      </section>

      {/* ───────────────────────── Detalle ───────────────────────── */}
      <section className="border-y border-brand-500/10 bg-brand-50/50 py-16 md:py-24">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-balance md:text-3xl">
              {fillText(dict.appPage.aboutTitle, { app: app.name })}
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink/70">
              {t(app.body, lang).map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <p
              className="mt-6 border-l-2 pl-4 text-lg leading-snug font-medium text-brand-800 italic"
              style={{ borderColor: app.accent[1] }}
            >
              {t(app.claim, lang)}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={path(`/apps/${app.slug}/privacidad`, lang)}
                className="inline-flex items-center gap-2 rounded-xl border border-brand-500/20 bg-white px-4 py-2.5 text-sm font-semibold text-brand-700 transition hover:border-brand-500/40"
              >
                <Icon name="shield" className="size-4" />
                {dict.appPage.privacyLink}
              </Link>
              <Link
                href={path("/soporte", lang)}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-white"
              >
                <Icon name="mail" className="size-4" />
                {dict.appPage.helpLink}
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {app.features.map((feature, index) => (
              <Reveal key={feature.title.es} delay={index * 80} className="h-full">
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
                    {t(feature.title, lang)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">
                    {t(feature.description, lang)}
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
                    {fillText(dict.appPage.downloadTitle, { app: app.name })}
                  </h2>
                  <p className="mt-2.5 max-w-lg text-white/70">
                    {dict.appPage.downloadText}
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
            {dict.appPage.otherApps}
          </h2>
          <div className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {others.slice(0, 3).map((other, index) => (
              <Reveal key={other.slug} delay={index * 90} className="h-full">
                <AppCard app={other} lang={lang} dict={dict} />
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

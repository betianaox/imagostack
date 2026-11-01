import Link from "next/link";
import { AppCard } from "@/components/app-card";
import { AppIcon } from "@/components/app-visuals";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { StoreBadge } from "@/components/store-badge";
import { TECH_AREAS, appsVisibles, getApp, type App, type AppTechItem } from "@/lib/apps";
import { fillText, getDictionary, type Dictionary } from "@/lib/dictionaries";
import { path, t, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

/**
 * La ficha de una app.
 *
 * Una app suelta se ve como siempre: encabezado, capturas, detalle y descarga.
 * Si declara secciones extra en `lib/apps.ts` —una app compañera, "Cómo
 * funciona", la ficha técnica o preguntas frecuentes— la ficha se extiende sola
 * con esos bloques. Es lo que permite contar un producto de dos apps (como
 * Mallnest y Mallnest Business) en una sola página, sin duplicar fichas.
 */
export function AppDetailView({ app, lang }: { app: App; lang: Locale }) {
  const dict = getDictionary(lang);
  const companion = app.companion ? getApp(app.companion) : undefined;
  const family = [app, ...(companion ? [companion] : [])];
  const others = appsVisibles.filter(
    (other) => !family.some((member) => member.slug === other.slug),
  );
  const appUrl = `${site.url}${path(`/apps/${app.slug}`, lang)}`;
  const anyPublished = family.some((member) => member.playStoreUrl);

  const softwareLd = (member: App) => ({
    "@type": "SoftwareApplication",
    name: t(member.name, lang),
    description: t(member.description, lang),
    applicationCategory: "MobileApplication",
    applicationSubCategory: t(member.category, lang),
    operatingSystem: "Android",
    url: appUrl,
    image: `${site.url}/apps/${app.slug}/og.png`,
    screenshot: member.screenshots.map((shot) => `${site.url}${shot.src}`),
    inLanguage: member.languages.en,
    ...(member.playStoreUrl ? { installUrl: member.playStoreUrl } : {}),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": `${site.url}/#organization` },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...family.map(softwareLd),
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
          { "@type": "ListItem", position: 3, name: t(app.name, lang), item: appUrl },
        ],
      },
      ...(app.faq?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: app.faq.map((item) => ({
                "@type": "Question",
                name: t(item.q, lang),
                acceptedAnswer: { "@type": "Answer", text: t(item.a, lang) },
              })),
            },
          ]
        : []),
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
              <AppIcon app={app} lang={lang} className="size-20 shrink-0 md:size-24" />
              <div>
                <p className="text-[13px] font-semibold tracking-[0.14em] text-white/65 uppercase">
                  {companion ? dict.appPage.productKicker : t(app.category, lang)}
                </p>
                <h1 className="mt-2 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance md:text-5xl">
                  {t(app.name, lang)}
                </h1>
                <p className="mt-3 max-w-lg text-lg text-white/80">
                  {t(app.tagline, lang)}
                </p>
                <p className="mt-4 text-xs text-white/60">
                  {dict.appPage.availableIn}: {t(app.languages, lang).join(" · ")}
                </p>
              </div>
            </div>

            {!companion && (
              <div className="shrink-0">
                <Download app={app} lang={lang} dict={dict} />
              </div>
            )}
          </div>

          {/* Las dos caras del producto, cada una con su descarga */}
          {companion && (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {family.map((member) => (
                <div
                  key={member.slug}
                  className="flex flex-col gap-4 rounded-2xl border border-white/15 bg-white/8 p-5 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3.5">
                    <AppIcon app={member} lang={lang} className="size-12 shrink-0" />
                    <div className="min-w-0">
                      {member.audience && (
                        <p className="text-[12px] font-semibold tracking-[0.12em] text-white/60 uppercase">
                          {t(member.audience, lang)}
                        </p>
                      )}
                      <p className="truncate text-lg font-semibold">{t(member.name, lang)}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-white/75">{t(member.tagline, lang)}</p>
                  <div className="mt-auto">
                    <Download app={member} lang={lang} dict={dict} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ───────────────────────── Capturas ───────────────────────── */}
      <Screens app={app} lang={lang} dict={dict} titled={!!companion} />

      {/* ───────────────────────── Detalle ───────────────────────── */}
      <About app={app} lang={lang} dict={dict} tint />

      {/* ─────────────── La app compañera, dentro de la misma ficha ─────────────── */}
      {companion && (
        <>
          <Screens app={companion} lang={lang} dict={dict} titled />
          <About app={companion} lang={lang} dict={dict} tint />
        </>
      )}

      {/* ───────────────────────── Cómo funciona ───────────────────────── */}
      {app.howItWorks && (
        <section className="shell py-16 md:py-24">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
              {dict.appPage.howItWorksTitle}
            </h2>
            {app.howItWorks.intro && (
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink/65">
                {t(app.howItWorks.intro, lang)}
              </p>
            )}
          </Reveal>
          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {app.howItWorks.steps.map((step, index) => (
              <Reveal key={step.title.es} delay={index * 80} className="h-full">
                <li className="h-full list-none rounded-2xl border border-brand-500/10 bg-white p-6">
                  <span
                    className="grid size-10 place-items-center rounded-full text-sm font-semibold text-white"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${app.accent[0]}, ${app.accent[1]})`,
                    }}
                  >
                    {index + 1}
                  </span>
                  <h3 className="mt-5 font-semibold tracking-tight text-ink">{t(step.title, lang)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{t(step.description, lang)}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>
      )}

      {/* ───────────────────────── Ficha técnica ───────────────────────── */}
      {/*
        Siempre visible pero discreta: una lista sobre una franja gris,
        distinta del celeste de "Sobre la app", sin tarjetas ni bloque oscuro. Quien solo quiere la app la pasa de largo;
        quien mira el portfolio tiene el stack completo a la vista.
      */}
      {app.tech && (
        <section
          id="ficha-tecnica"
          className="scroll-mt-20 border-y border-ink/15 bg-[#e6e9ee] py-14 md:py-20"
        >
          <div className="shell grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
            <div>
              <h2 className="text-lg font-semibold tracking-[-0.01em] text-ink md:text-xl">
                {dict.appPage.techTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">{t(app.tech.intro, lang)}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {app.tech.items.map((item) => (
                  <li
                    key={techName(item.name, lang)}
                    className="rounded-full border border-ink/10 bg-white px-2.5 py-0.5 text-[12px] text-ink/65"
                  >
                    {techName(item.name, lang)}
                  </li>
                ))}
              </ul>
            </div>
            <dl className="divide-y divide-ink/15">
              {TECH_AREAS.map((area) => ({
                area,
                items: app.tech!.items.filter((item) => item.area === area),
              }))
                .filter((group) => group.items.length > 0)
                .map((group) => (
                  <div key={group.area} className="grid gap-2 py-4 first:pt-0 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <dt className="text-[11px] font-semibold tracking-[0.12em] text-ink/50 uppercase sm:pt-0.5">
                      {dict.appPage.techAreas[group.area]}
                    </dt>
                    <dd className="space-y-3">
                      {group.items.map((item) => (
                        <div key={techName(item.name, lang)}>
                          <p className="text-sm font-medium text-ink/85">{techName(item.name, lang)}</p>
                          <p className="mt-0.5 text-[13px] leading-relaxed text-ink/55">{t(item.role, lang)}</p>
                        </div>
                      ))}
                    </dd>
                  </div>
                ))}
            </dl>
          </div>
        </section>
      )}

      {/* ───────────────────────── Preguntas frecuentes ───────────────────────── */}
      {app.faq && app.faq.length > 0 && (
        <section className="shell py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                {dict.appPage.faqTitle}
              </h2>
              {/* Una política por app: Google Play pide una URL propia para cada una */}
              <div className="mt-6 flex flex-col items-start gap-2">
                {family.map((member) => (
                  <Link
                    key={member.slug}
                    href={path(`/apps/${member.slug}/privacidad`, lang)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline"
                  >
                    <Icon name="shield" className="size-4" />
                    {fillText(dict.appPage.privacyOf, { app: t(member.name, lang) })}
                  </Link>
                ))}
              </div>
            </Reveal>
            <div className="divide-y divide-brand-500/10 rounded-2xl border border-brand-500/10 bg-white">
              {app.faq.map((item) => (
                <details key={item.q.es} className="group px-6 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                    {t(item.q, lang)}
                    <Icon
                      name="chevronDown"
                      className="size-4 shrink-0 text-ink/40 transition group-open:rotate-180"
                    />
                  </summary>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{t(item.a, lang)}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────── Descarga: solo si ya está en Google Play ─────────────── */}
      {anyPublished && (
        <section className="shell py-16 md:py-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-4xl bg-ink px-7 py-12 text-white md:px-12">
              <div className="aurora absolute inset-0 opacity-50" />
              <div className="relative flex flex-col items-start gap-7 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-[-0.02em] text-balance md:text-3xl">
                    {fillText(dict.appPage.downloadTitle, { app: t(app.name, lang) })}
                  </h2>
                  <p className="mt-2.5 max-w-lg text-white/70">{dict.appPage.downloadText}</p>
                </div>
                <div className="flex flex-col gap-4">
                  {family
                    .filter((member) => member.playStoreUrl)
                    .map((member) => (
                      <div key={member.slug} className="flex flex-col gap-1.5">
                        {companion && member.audience && (
                          <span className="text-xs font-semibold tracking-[0.12em] text-white/60 uppercase">
                            {t(member.audience, lang)}
                          </span>
                        )}
                        <StoreBadge
                          url={member.playStoreUrl}
                          lang={lang}
                          label={fillText(dict.appPage.downloadTitle, { app: t(member.name, lang) })}
                        />
                      </div>
                    ))}
                </div>
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

/**
 * El botón de Google Play, o un aviso de "Muy pronto" mientras la app está en
 * testing cerrado. Nunca un link roto.
 */
function Download({
  app,
  lang,
  dict,
  size = "md",
}: {
  app: App;
  lang: Locale;
  dict: Dictionary;
  size?: "sm" | "md";
}) {
  if (app.playStoreUrl) {
    return (
      <StoreBadge
        url={app.playStoreUrl}
        lang={lang}
        size={size}
        label={fillText(dict.appPage.downloadTitle, { app: t(app.name, lang) })}
      />
    );
  }
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85">
      <Icon name="download" className="size-4" />
      {dict.appPage.comingSoon}
    </span>
  );
}

function Screens({
  app,
  lang,
  dict,
  titled,
}: {
  app: App;
  lang: Locale;
  dict: Dictionary;
  /** En una ficha de dos apps, cada galería dice de cuál es. */
  titled: boolean;
}) {
  return (
    <section className="shell py-14 md:py-20">
      <Reveal>
        {titled && app.audience && (
          <p className="text-[13px] font-semibold tracking-[0.14em] uppercase" style={{ color: app.accent[1] }}>
            {t(app.audience, lang)}
          </p>
        )}
        <h2 className="mt-1 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
          {titled
            ? fillText(dict.appPage.screenshotsOf, { app: t(app.name, lang) })
            : dict.appPage.screenshotsTitle}
        </h2>
        {app.screenshots.length > 1 && (
          <p className="mt-2 text-sm text-ink/60">{dict.appPage.screenshotsHint}</p>
        )}
      </Reveal>

      <div className="mt-8">
        <ScreenshotGallery
          shots={app.screenshots}
          accent={app.accent}
          appName={t(app.name, lang)}
          lang={lang}
          dict={dict}
        />
      </div>
    </section>
  );
}

function About({
  app,
  lang,
  dict,
  tint,
}: {
  app: App;
  lang: Locale;
  dict: Dictionary;
  tint: boolean;
}) {
  return (
    <section
      className={
        tint ? "border-y border-brand-500/10 bg-brand-50/50 py-16 md:py-24" : "py-16 md:py-24"
      }
    >
      <div className="shell grid gap-14 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-balance md:text-3xl">
            {fillText(dict.appPage.aboutTitle, { app: t(app.name, lang) })}
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
                <h3 className="mt-5 font-semibold tracking-tight text-ink">{t(feature.title, lang)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{t(feature.description, lang)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** El nombre de una pieza de la ficha técnica: propio (texto) o traducido. */
function techName(name: AppTechItem["name"], lang: Locale): string {
  return typeof name === "string" ? name : t(name, lang);
}

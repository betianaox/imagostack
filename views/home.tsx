import Link from "next/link";
import { AppCard } from "@/components/app-card";
import { AppIcon } from "@/components/app-visuals";
import { ContactForm } from "@/components/contact-form";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { apps } from "@/lib/apps";
import { getDictionary } from "@/lib/dictionaries";
import { path, t, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function HomeView({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const heroApps = apps.slice(0, 2);

  return (
    <>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="aurora absolute inset-0 opacity-70" />
        <div className="grid-lines absolute inset-0" />

        <div className="shell relative pt-16 pb-16 md:pt-24 md:pb-20">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium tracking-wide text-white/85 backdrop-blur">
            <span className="size-1.5 rounded-full bg-coral-400" />
            {dict.home.badge}
          </span>

          {/*
            El slogan de marca es el título del sitio, en una sola línea: el
            clamp lo hace escalar con el viewport para que nunca corte.
          */}
          <h1 className="mt-6 text-[clamp(1.5rem,7.7vw,4.4rem)] leading-[1.05] font-semibold tracking-[-0.035em] whitespace-nowrap">
            Full-cycle,{" "}
            <span className="bg-linear-to-r from-coral-300 via-coral-400 to-coral-500 bg-clip-text text-transparent">
              full-stack
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:mt-6 sm:text-lg">
            {dict.home.intro}
          </p>

          {/* En mobile los botones ocupan el ancho completo, uno por fila */}
          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={path("/apps", lang)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-coral-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-coral-900/30 transition hover:-translate-y-0.5 hover:bg-coral-600"
            >
              {dict.home.seeApps}
              <Icon name="arrowRight" className="size-4" />
            </Link>
            <Link
              href="#nosotros"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/90 transition hover:border-white/40 hover:bg-white/5"
            >
              {dict.home.howWeWork}
            </Link>
          </div>

          {/* Accesos directos a cada app, al pie del bloque oscuro */}
          <div className="mt-10 grid gap-3 border-t border-white/10 pt-8 sm:mt-14 sm:grid-cols-2 sm:gap-4 sm:pt-10 md:mt-16">
            {heroApps.map((app) => (
              <Link
                key={app.slug}
                href={path(`/apps/${app.slug}`, lang)}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur transition duration-300 hover:border-white/25 hover:bg-white/10 sm:p-5"
              >
                <AppIcon app={app} className="size-12 shrink-0 sm:size-16" />
                <div className="min-w-0 flex-1">
                  <h2 className="leading-tight font-semibold tracking-tight">
                    {app.name}
                  </h2>
                  <p className="mt-1 text-[11px] font-medium tracking-widest text-white/40 uppercase">
                    {t(app.category, lang)}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-white/60">
                    {t(app.tagline, lang)}
                  </p>
                </div>
                <Icon
                  name="arrowRight"
                  className="size-5 shrink-0 text-white/40 transition duration-300 group-hover:translate-x-1 group-hover:text-white"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── Apps ───────────────────────── */}
      <section id="apps" className="shell scroll-mt-24 py-20 md:py-28">
        <Reveal>
          <SectionKicker>{dict.home.appsKicker}</SectionKicker>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            {/* Desde lg entra en una sola línea; abajo envuelve normalmente */}
            <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance md:text-[2.6rem] lg:whitespace-nowrap">
              {dict.home.appsTitle}
            </h2>
            <Link
              href={path("/apps", lang)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              {dict.home.appsLink}
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, index) => (
            <Reveal key={app.slug} delay={index * 90}>
              <AppCard app={app} lang={lang} dict={dict} />
            </Reveal>
          ))}

          {/* Slot abierto: el catálogo crece a medida que se suman apps */}
          <Reveal delay={apps.length * 90}>
            <div className="flex h-full min-h-72 flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-brand-500/25 bg-brand-50/40 p-8 text-center">
              <span className="grid size-12 place-items-center rounded-2xl bg-white text-brand-500 shadow-sm">
                <Icon name="sparkles" className="size-6" />
              </span>
              <div>
                <h3 className="font-semibold text-brand-800">
                  {dict.home.ideaTitle}
                </h3>
                <p className="mt-1.5 text-sm text-ink/60">
                  {dict.home.ideaText}
                </p>
              </div>
              <Link
                href="#contacto"
                className="text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                {dict.home.ideaLink}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────── Nosotros ───────────────────────── */}
      <section
        id="nosotros"
        className="scroll-mt-20 border-y border-brand-500/10 bg-brand-50/50 py-20 md:py-28"
      >
        <div className="shell">
          <Reveal>
            <SectionKicker>{dict.home.aboutKicker}</SectionKicker>
            <h2 className="mt-4 max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-balance md:text-[2.75rem]">
              {dict.home.aboutTitle}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dict.home.pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 80}>
                <div className="h-full rounded-2xl border border-brand-500/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-900/5">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-600 text-white shadow-sm shadow-brand-900/20">
                    <Icon name={pillar.icon} className="size-5.5" />
                  </span>
                  <h3 className="mt-5 font-semibold tracking-tight text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Proceso */}
          <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {dict.home.steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 80}>
                <div className="relative">
                  <span className="block text-3xl leading-none font-semibold tracking-[-0.03em] text-coral-500 md:text-4xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-4 mb-4 h-px bg-linear-to-r from-brand-500/30 to-transparent" />
                  <h3 className="font-semibold tracking-tight text-brand-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── Contacto ───────────────────────── */}
      {/*
        En mobile el bloque va a sangre y pegado al footer —que también es
        oscuro, así que se leen como una sola pieza— para no perder ancho útil
        del formulario en padding. Desde md vuelve a ser una tarjeta redondeada.
      */}
      <section id="contacto" className="scroll-mt-24 pt-20 md:pt-28 md:pb-28">
        <div className="mx-auto w-full max-w-304 md:px-8">
          <Reveal>
            <div className="relative overflow-hidden bg-ink px-5 pt-14 pb-20 text-white md:rounded-4xl md:px-14 md:py-20">
              <div className="aurora absolute inset-0 opacity-55" />
              <div className="grid-lines absolute inset-0" />

              {/* El mismo formulario que en /soporte */}
              <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
                <div>
                  <SectionKicker tone="dark">
                    {dict.home.contactKicker}
                  </SectionKicker>
                  <h2 className="mt-4 text-3xl leading-tight font-semibold tracking-tight text-balance md:text-[2.6rem]">
                    {dict.home.contactTitle}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-white/70">
                    {dict.home.contactText}
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a
                      href={`mailto:${site.email.general}`}
                      className="inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-white/90 transition hover:border-white/40 hover:bg-white/5"
                    >
                      <Icon name="mail" className="size-4.5" />
                      {site.email.general}
                    </a>
                    <Link
                      href={path("/soporte", lang)}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-white/90 transition hover:border-white/40 hover:bg-white/5"
                    >
                      {dict.home.supportCenter}
                      <Icon name="arrowRight" className="size-4" />
                    </Link>
                  </div>
                </div>

                <ContactForm dict={dict} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function SectionKicker({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`text-[13px] font-semibold tracking-[0.14em] uppercase ${
        tone === "dark" ? "text-coral-300" : "text-coral-600"
      }`}
    >
      {children}
    </p>
  );
}

import Link from "next/link";
import { AppFormLink } from "@/components/app-form-link";
import { AppIcon } from "@/components/app-visuals";
import { ContactForm } from "@/components/contact-form";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Inline } from "@/components/rich-text";
import { apps } from "@/lib/apps";
import { fillText, getDictionary } from "@/lib/dictionaries";
import { path, t, type Locale } from "@/lib/i18n";
import { legalValues } from "@/lib/legal";
import { site } from "@/lib/site";

export function SupportView({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  /** Las mismas preguntas de la página, en el formato que Google puede destacar. */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: dict.support.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="aurora absolute inset-0 opacity-55" />
        <div className="grid-lines absolute inset-0" />

        <div className="shell relative py-16 md:py-24">
          <p className="text-[13px] font-semibold tracking-[0.14em] text-coral-300 uppercase">
            {dict.support.kicker}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.03em] text-balance md:text-6xl">
            {dict.support.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            {dict.support.intro}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="#contacto"
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-brand-950/25 transition hover:-translate-y-0.5"
            >
              {dict.support.writeUs}
              <Icon name="arrowRight" className="size-4" />
            </Link>
            <a
              href={`mailto:${site.email.support}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/90 transition hover:border-white/40 hover:bg-white/5"
            >
              <Icon name="mail" className="size-4.5" />
              {site.email.support}
            </a>
          </div>
        </div>
      </section>

      {/* Formulario de contacto */}
      <section id="contacto" className="shell scroll-mt-24 py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {dict.support.formTitle}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/65">
              {dict.support.formIntro}
            </p>

            <ul className="mt-7 space-y-3.5 text-sm text-ink/65">
              {dict.support.formTips.map((tip) => (
                <li key={tip} className="flex items-start gap-2.5">
                  <Icon
                    name="check"
                    className="mt-0.5 size-4 shrink-0 text-coral-500"
                  />
                  {tip}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={90}>
            <ContactForm dict={dict} />
          </Reveal>
        </div>
      </section>

      {/* Accesos por app */}
      <section className="shell pb-16 md:pb-20">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {dict.support.perAppTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink/60">
            {dict.support.perAppText}
          </p>
        </Reveal>

        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {apps.map((app, index) => (
            <Reveal key={app.slug} delay={index * 90}>
              <div className="flex h-full flex-col gap-5 rounded-2xl border border-brand-500/10 bg-white p-6 sm:flex-row sm:items-center">
                <AppIcon app={app} className="size-14 shrink-0" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold tracking-tight text-ink">
                    {app.name}
                  </h3>
                  <p className="mt-1 text-sm text-ink/60">
                    {t(app.tagline, lang)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm font-semibold">
                    <Link
                      href={path(`/apps/${app.slug}`, lang)}
                      className="text-brand-700 hover:text-brand-800"
                    >
                      {dict.support.seeApp}
                    </Link>
                    <Link
                      href={path(`/apps/${app.slug}/privacidad`, lang)}
                      className="text-brand-700 hover:text-brand-800"
                    >
                      {dict.support.privacy}
                    </Link>
                    <AppFormLink
                      appName={app.name}
                      label={fillText(dict.support.writeAbout, {
                        app: app.name,
                      })}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section className="border-t border-brand-500/10 bg-brand-50/50 py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {dict.support.faqTitle}
            </h2>
          </Reveal>

          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            {dict.support.faqs.map((faq, index) => (
              <Reveal key={faq.question} delay={index * 60}>
                <details className="group rounded-2xl border border-brand-500/10 bg-white p-5 md:p-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold tracking-tight text-ink">
                    {faq.question}
                    <Icon
                      name="chevronRight"
                      className="mt-0.5 size-5 shrink-0 text-brand-500 transition-transform group-open:rotate-90"
                    />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-10 text-sm text-ink/60 [&_a]:font-semibold [&_a]:text-brand-700 [&_a]:underline [&_a]:underline-offset-4">
              <Inline
                text={fillText(dict.support.faqFooter, legalValues(lang))}
              />
            </p>
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}

import { AppCard } from "@/components/app-card";
import { Reveal } from "@/components/reveal";
import { apps } from "@/lib/apps";
import { fillText, getDictionary } from "@/lib/dictionaries";
import { path, t, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function AppsListView({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const categories = [...new Set(apps.map((app) => t(app.category, lang)))];

  const subtitle =
    categories.length === 1
      ? fillText(dict.appsPage.subtitleOne, {
          count: apps.length,
          category: categories[0].toLowerCase(),
        })
      : fillText(dict.appsPage.subtitleMany, {
          count: apps.length,
          categories: categories.length,
        });

  const catalogJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: dict.meta.appsOgTitle,
    numberOfItems: apps.length,
    itemListElement: apps.map((app, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: app.name,
      description: t(app.tagline, lang),
      url: `${site.url}${path(`/apps/${app.slug}`, lang)}`,
    })),
  };

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="aurora absolute inset-0 opacity-60" />
        <div className="grid-lines absolute inset-0" />

        <div className="shell relative py-16 md:py-24">
          <p className="text-[13px] font-semibold tracking-[0.14em] text-coral-300 uppercase">
            {dict.appsPage.kicker}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.03em] text-balance md:text-6xl">
            {dict.appsPage.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            {subtitle}
          </p>
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, index) => (
            <Reveal key={app.slug} delay={index * 90} className="h-full">
              <AppCard app={app} lang={lang} dict={dict} />
            </Reveal>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }}
      />
    </>
  );
}

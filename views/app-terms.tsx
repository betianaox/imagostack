import { LegalPage } from "@/components/legal-page";
import { Blocks, type Block } from "@/components/rich-text";
import { getAppTerms } from "@/lib/app-terms";
import type { App } from "@/lib/apps";
import { fillText, getDictionary } from "@/lib/dictionaries";
import { path, t, type Locale } from "@/lib/i18n";
import { legalValues } from "@/lib/legal";

/**
 * Términos del servicio de cada app: /apps/<slug>/terminos.
 *
 * Es la URL que se pega en Google Play Console (Contenido de la app → Estado
 * de operador → Términos del servicio), que pide unos términos específicos de
 * la app. Las secciones comunes se eligen según lo declarado en `lib/apps.ts`
 * —así los términos nunca dicen que hay anuncios si la app no los tiene— y se
 * suman las cláusulas propias de `lib/app-terms.ts`.
 */
export function AppTermsView({ app, lang }: { app: App; lang: Locale }) {
  const dict = getDictionary(lang);
  const s = dict.appTerms;
  const { privacy } = app;
  const extra = getAppTerms(app.slug);

  const base = {
    ...legalValues(lang),
    app: t(app.name, lang),
    termsUrl: path("/terminos", lang),
    appPrivacyUrl: path(`/apps/${app.slug}/privacidad`, lang),
  };
  const text = (template: string, more: Record<string, string> = {}) =>
    fillText(template, { ...base, ...more });

  // Cada sección es un título y sus bloques; la numeración se calcula al final
  // porque cuáles aparecen depende de la app.
  const sections: { title: string; blocks: Block[] }[] = [
    { title: s.acceptance, blocks: [{ p: text(s.acceptanceP) }] },
    { title: text(s.about), blocks: [{ p: t(app.description, lang) }] },
    { title: s.license, blocks: [{ p: text(s.licenseP) }] },
    {
      title: s.age,
      blocks: [
        {
          p: privacy.minAge
            ? text(s.ageMin, { age: String(privacy.minAge) })
            : text(s.ageAll),
        },
      ],
    },
    ...(privacy.showsAds
      ? [
          {
            title: s.ads,
            blocks: [
              { p: text(s.adsP) },
              { p: text(s.adsRewarded) },
              ...(privacy.hasInAppPurchases ? [] : [{ p: text(s.noPurchases) }]),
            ],
          },
        ]
      : []),
    ...(privacy.hasInAppPurchases
      ? [{ title: s.purchases, blocks: [{ p: text(s.purchasesP) }] }]
      : []),
    ...(extra?.sections ?? []).map((section) => ({
      title: text(t(section.title, lang)),
      blocks: [{ ul: t(section.items, lang).map((item) => text(item)) }],
    })),
    ...(privacy.thirdParties.length > 0
      ? [
          {
            title: s.thirdParties,
            blocks: [
              {
                p: text(s.thirdPartiesP, {
                  list: privacy.thirdParties.map((party) => party.name).join(", "),
                }),
              },
            ],
          },
        ]
      : []),
    {
      title: s.data,
      blocks: [
        { p: privacy.processedOnDevice ? text(s.dataDevice) : text(s.dataServer) },
      ],
    },
    {
      title: s.warranty,
      blocks: [{ p: text(s.warrantyP) }, { p: text(s.consumerP) }],
    },
    { title: s.termination, blocks: [{ p: text(s.terminationP) }] },
    { title: s.changes, blocks: [{ p: text(s.changesP) }] },
    { title: s.law, blocks: [{ p: text(s.lawP) }] },
    { title: s.contact, blocks: [{ p: text(s.contactP) }] },
  ];

  const blocks: Block[] = sections.flatMap((section, index) => [
    { h2: `${index + 1}. ${section.title}` },
    ...section.blocks,
  ]);

  return (
    <LegalPage
      lang={lang}
      kicker={t(app.name, lang)}
      title={text(s.title)}
      intro={text(s.intro)}
      updatedAt={extra?.updatedAt ?? privacy.updatedAt}
      updatedAtLabel={dict.legal.updatedAt}
      backHref={path(`/apps/${app.slug}`, lang)}
      backLabel={fillText(dict.legal.backToApp, { app: t(app.name, lang) })}
    >
      <Blocks blocks={blocks} />
    </LegalPage>
  );
}

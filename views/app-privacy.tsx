import { LegalHighlight, LegalPage } from "@/components/legal-page";
import { Blocks, Inline, type Block } from "@/components/rich-text";
import type { App } from "@/lib/apps";
import { fillText, getDictionary } from "@/lib/dictionaries";
import { path, t, type Locale } from "@/lib/i18n";
import { legalValues } from "@/lib/legal";

/**
 * Política de privacidad de cada app. Los bloques se arman a partir de los
 * datos declarados en `lib/apps.ts`, así el texto legal nunca contradice lo
 * que la app realmente hace ni lo declarado en Google Play Console.
 */
export function AppPrivacyView({ app, lang }: { app: App; lang: Locale }) {
  const dict = getDictionary(lang);
  const s = dict.appPrivacy;
  const { privacy } = app;

  const base = { ...legalValues(lang), app: app.name };
  const text = (template: string, extra: Record<string, string> = {}) =>
    fillText(template, { ...base, ...extra });

  const collectsNothing = privacy.collects.length === 0;
  // Con publicidad o servicios de terceros no se puede afirmar que nada sale
  // del dispositivo: la política usa entonces las variantes correspondientes.
  const shares = privacy.showsAds || privacy.thirdParties.length > 0;

  const summary = [
    s.summaryLead,
    collectsNothing
      ? text(s.summaryNoData)
      : privacy.processedOnDevice
        ? shares
          ? text(s.summaryOnDeviceShared)
          : text(s.summaryOnDevice)
        : text(s.summaryServer),
    privacy.showsAds ? s.adsYes : s.adsNo,
    privacy.hasInAppPurchases ? s.iapYes : s.iapNo,
  ].join(" ");

  const blocks: Block[] = [
    { h2: s.s1 },
    { p: text(s.s1p) },

    { h2: s.s2 },
    ...(collectsNothing
      ? [{ p: text(s.s2none) }]
      : [
          { p: s.s2intro },
          {
            ul: privacy.collects.map((item) =>
              text(s.s2item, {
                type: t(item.type, lang),
                purpose: t(item.purpose, lang),
                storage: item.storage === "dispositivo" ? s.s2device : s.s2server,
              }),
            ),
          },
          { p: privacy.showsAds ? s.s2closingAds : s.s2closing },
        ]),

    { h2: s.s3 },
    { p: privacy.processedOnDevice ? text(s.s3device) : text(s.s3server) },
    // Aclaración propia de la app, cuando el texto genérico no alcanza para
    // explicar qué sale del dispositivo y hacia dónde.
    ...(privacy.processingNote
      ? [{ p: text(t(privacy.processingNote, lang)) }]
      : []),
    { p: text(s.s3backup) },

    { h2: s.s4 },
    ...(privacy.permissions.length === 0
      ? [{ p: text(s.s4none) }]
      : [
          { p: s.s4intro },
          {
            ul: privacy.permissions.map((permission) =>
              text(s.s4item, {
                name: permission.name,
                reason: t(permission.reason, lang),
              }),
            ),
          },
        ]),

    { h2: s.s5 },
    ...(privacy.thirdParties.length === 0
      ? [{ p: text(s.s5none) }]
      : [
          { p: privacy.showsAds ? text(s.s5ads) : s.s5intro },
          {
            ul: privacy.thirdParties.map((party) =>
              text(s.s5item, {
                name: party.name,
                purpose: t(party.purpose, lang),
                url: party.policyUrl,
              }),
            ),
          },
        ]),
    { p: s.s5legal },

    { h2: s.s6 },
    { p: text(s.s6p) },

    { h2: s.s7 },
    ...(privacy.directedToChildren
      ? [{ p: text(s.s7children) }]
      : [
          {
            p: [
              text(s.s7notChildren),
              privacy.minAge
                ? text(s.s7minAge, { age: String(privacy.minAge) })
                : "",
              text(s.s7report),
            ]
              .filter(Boolean)
              .join(" "),
          },
        ]),

    { h2: s.s8 },
    ...(privacy.processedOnDevice
      ? [{ ul: s.s8device.map((item) => text(item)) }]
      : [{ p: text(s.s8server) }]),
    { p: text(s.s8more) },

    { h2: s.s9 },
    {
      p: `${text(s.s9p)} ${
        privacy.processedOnDevice ? text(s.s9device) : text(s.s9server)
      }`,
    },

    { h2: s.s10 },
    { p: s.s10p },

    { h2: s.s11 },
    { p: s.s11p },

    { h2: s.s12 },
    { p: text(s.s12p) },
  ];

  return (
    <LegalPage
      lang={lang}
      kicker={app.name}
      title={text(s.title)}
      intro={text(s.intro)}
      updatedAt={privacy.updatedAt}
      updatedAtLabel={dict.legal.updatedAt}
      backHref={path(`/apps/${app.slug}`, lang)}
      backLabel={fillText(dict.legal.backToApp, { app: app.name })}
    >
      <LegalHighlight>
        <p>
          <Inline text={summary} />
        </p>
      </LegalHighlight>

      <Blocks blocks={blocks} />
    </LegalPage>
  );
}

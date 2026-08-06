import Link from "next/link";
import { LegalHighlight, LegalPage } from "@/components/legal-page";
import { Blocks, Inline, fill } from "@/components/rich-text";
import { apps } from "@/lib/apps";
import { fillText, getDictionary } from "@/lib/dictionaries";
import { path, type Locale } from "@/lib/i18n";
import { legalValues } from "@/lib/legal";
import { site } from "@/lib/site";

/** /privacidad — política general del sitio. */
export function PrivacyView({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const values = legalValues(lang);

  return (
    <LegalPage
      lang={lang}
      kicker={dict.legal.kicker}
      title={dict.privacyPage.title}
      intro={dict.privacyPage.intro}
      updatedAt={site.legalUpdatedAt}
      updatedAtLabel={dict.legal.updatedAt}
    >
      <LegalHighlight>
        <p>
          <Inline text={dict.privacyPage.highlight} />
        </p>
      </LegalHighlight>

      <p>
        <Inline text={fillText(dict.privacyPage.perAppIntro, values)} />
      </p>
      <ul>
        {apps.map((app) => (
          <li key={app.slug}>
            <Link href={path(`/apps/${app.slug}/privacidad`, lang)}>
              {fillText(dict.privacyPage.perAppLink, { app: app.name })}
            </Link>
          </li>
        ))}
      </ul>

      <Blocks blocks={fill(dict.privacyPage.blocks, values)} />
    </LegalPage>
  );
}

/** /terminos */
export function TermsView({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const values = legalValues(lang);

  return (
    <LegalPage
      lang={lang}
      kicker={dict.legal.kicker}
      title={dict.termsPage.title}
      intro={fillText(dict.termsPage.intro, values)}
      updatedAt={site.legalUpdatedAt}
      updatedAtLabel={dict.legal.updatedAt}
    >
      <Blocks blocks={fill(dict.termsPage.blocks, values)} />
    </LegalPage>
  );
}

/** /eliminar-datos — requisito de la política de datos de Google Play. */
export function DeleteDataView({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const values = legalValues(lang);

  return (
    <LegalPage
      lang={lang}
      kicker={dict.legal.yourData}
      title={dict.deleteDataPage.title}
      intro={dict.deleteDataPage.intro}
      updatedAt={site.legalUpdatedAt}
      updatedAtLabel={dict.legal.updatedAt}
    >
      <LegalHighlight>
        <p>
          <Inline text={dict.deleteDataPage.highlight} />
        </p>
      </LegalHighlight>

      <Blocks blocks={fill(dict.deleteDataPage.blocks, values)} />

      <ul>
        {apps.map((app) => (
          <li key={app.slug}>
            <Link href={path(`/apps/${app.slug}/privacidad`, lang)}>
              {fillText(dict.deleteDataPage.appLink, { app: app.name })}
            </Link>
          </li>
        ))}
      </ul>
      <p>
        <Inline text={fillText(dict.deleteDataPage.seeAlso, values)} />
      </p>
    </LegalPage>
  );
}

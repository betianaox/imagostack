import { SessionSync } from "@/components/auth/session-sync";
import { ChatWidget } from "@/components/chat/chat-widget";
import { LocaleRedirect } from "@/components/locale-redirect";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "@/lib/dictionaries";
import { localeTags, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

/**
 * Header + footer + datos estructurados del sitio, en el idioma de la página.
 *
 * El `lang` del `<html>` lo fija cada layout; acá se envuelve el contenido para
 * no repetir esta estructura en los dos árboles de rutas (raíz y `/[lang]`).
 */
export function SiteShell({
  lang,
  children,
}: {
  lang: Locale;
  children: React.ReactNode;
}) {
  const dict = getDictionary(lang);

  const siteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.legalName,
        alternateName: site.tagline,
        url: site.url,
        logo: {
          "@type": "ImageObject",
          url: `${site.url}/logo.png`,
          width: 660,
          height: 175,
        },
        image: `${site.url}/og.png`,
        description: dict.meta.homeDescription,
        email: site.email.general,
        slogan: site.tagline,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: site.email.support,
            availableLanguage: ["Spanish", "English", "Portuguese"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: dict.meta.homeDescription,
        inLanguage: localeTags[lang],
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {dict.nav.skipToContent}
      </a>
      <SiteHeader lang={lang} dict={dict} />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <SiteFooter lang={lang} dict={dict} />
      <ChatWidget lang={lang} dict={dict} />
      <SessionSync lang={lang} />
      <ScrollToTop />
      <LocaleRedirect currentLang={lang} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
      />
    </>
  );
}

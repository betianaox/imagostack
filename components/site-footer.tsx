import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import { apps } from "@/lib/apps";
import { path, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function SiteFooter({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-ink text-white/70">
      <div className="shell grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-16">
        <div>
          <Image
            src="/logo.png"
            alt="Imagostack"
            width={660}
            height={175}
            className="h-12 w-auto brightness-0 invert md:h-14"
          />
          <p className="mt-4 text-sm font-medium tracking-wide text-white/90">
            {site.tagline}
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed">
            {dict.footer.pitch}
          </p>
        </div>

        <FooterColumn title={dict.footer.apps}>
          {apps.map((app) => (
            <FooterLink key={app.slug} href={path(`/apps/${app.slug}`, lang)}>
              {app.name}
            </FooterLink>
          ))}
          <FooterLink href={path("/apps", lang)}>
            {dict.footer.allApps}
          </FooterLink>
        </FooterColumn>

        <FooterColumn title={dict.footer.company}>
          <FooterLink href={`${path("/", lang)}#nosotros`}>
            {dict.nav.about}
          </FooterLink>
          <FooterLink href={path("/soporte", lang)}>
            {dict.nav.support}
          </FooterLink>
          <FooterLink href={`${path("/", lang)}#contacto`}>
            {dict.nav.contact}
          </FooterLink>
        </FooterColumn>

        <FooterColumn title={dict.footer.legal}>
          <FooterLink href={path("/privacidad", lang)}>
            {dict.footer.privacy}
          </FooterLink>
          <FooterLink href={path("/terminos", lang)}>
            {dict.footer.terms}
          </FooterLink>
          <FooterLink href={path("/eliminar-datos", lang)}>
            {dict.footer.deleteData}
          </FooterLink>
        </FooterColumn>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. {dict.footer.rights}
          </p>
          <p className="text-white/45">{dict.footer.trademark}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-3.5 text-[11px] font-semibold tracking-[0.14em] text-white/45 uppercase">
        {title}
      </h2>
      <ul className="space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link href={href} className="transition hover:text-white">
        {children}
      </Link>
    </li>
  );
}

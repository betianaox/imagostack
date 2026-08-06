import Image from "next/image";
import Link from "next/link";
import { apps } from "@/lib/apps";
import { site } from "@/lib/site";

export function SiteFooter() {
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
            {site.pitch}. Diseñamos, desarrollamos y mantenemos nuestras propias
            apps para Android, de la idea a la Play Store.
          </p>
        </div>

        <FooterColumn title="Apps">
          {apps.map((app) => (
            <FooterLink key={app.slug} href={`/apps/${app.slug}`}>
              {app.name}
            </FooterLink>
          ))}
          <FooterLink href="/apps">Ver todas</FooterLink>
        </FooterColumn>

        <FooterColumn title="Compañía">
          <FooterLink href="/#nosotros">Nosotros</FooterLink>
          <FooterLink href="/soporte">Soporte</FooterLink>
          <FooterLink href="/#contacto">Contacto</FooterLink>
        </FooterColumn>

        <FooterColumn title="Legales">
          <FooterLink href="/privacidad">Privacidad</FooterLink>
          <FooterLink href="/terminos">Términos de uso</FooterLink>
          <FooterLink href="/eliminar-datos">Eliminar mis datos</FooterLink>
        </FooterColumn>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. Todos los derechos reservados.
          </p>
          <p className="text-white/45">
            Google Play y el logo de Google Play son marcas registradas de Google
            LLC.
          </p>
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

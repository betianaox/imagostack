import Link from "next/link";
import { Icon } from "@/components/icons";
import type { Locale } from "@/lib/i18n";
import { formatDate } from "@/lib/site";

/** Encabezado y contenedor común de todas las páginas legales. */
export function LegalPage({
  kicker,
  title,
  intro,
  updatedAt,
  updatedAtLabel,
  lang,
  backHref,
  backLabel,
  children,
}: {
  kicker: string;
  title: string;
  intro?: string;
  /** Fecha ISO de última actualización */
  updatedAt: string;
  updatedAtLabel: string;
  lang: Locale;
  backHref?: string;
  backLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="aurora absolute inset-0 opacity-45" />
        <div className="grid-lines absolute inset-0" />

        <div className="shell relative py-14 md:py-18">
          {backHref && (
            <Link
              href={backHref}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition hover:text-white"
            >
              <Icon name="chevronLeft" className="size-4" />
              {backLabel}
            </Link>
          )}

          <p className="mt-7 text-[13px] font-semibold tracking-[0.14em] text-coral-300 uppercase">
            {kicker}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl leading-[1.1] font-semibold tracking-[-0.03em] text-balance md:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
              {intro}
            </p>
          )}
          <p className="mt-6 text-xs text-white/50">
            {updatedAtLabel} {formatDate(updatedAt, lang)}
          </p>
        </div>
      </section>

      <section className="shell py-14 md:py-18">
        <div className="prose-legal">{children}</div>
      </section>
    </>
  );
}

/** Bloque destacado para resumir lo importante arriba de todo. */
export function LegalHighlight({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-10 rounded-2xl border border-brand-500/15 bg-brand-50/60 p-5 md:p-6">
      <div className="[&>*:last-child]:mb-0">{children}</div>
    </div>
  );
}

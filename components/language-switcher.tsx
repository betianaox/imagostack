"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { rememberLocale } from "@/components/locale-redirect";
import {
  defaultLocale,
  isLocale,
  localeNames,
  localeShortNames,
  locales,
  type Locale,
} from "@/lib/i18n";

/**
 * Devuelve la URL equivalente de la página actual en otro idioma:
 * estando en /en/apps/vigia, portugués es /pt/apps/vigia.
 */
function useLocaleHrefs() {
  const pathname = usePathname();

  // Ruta sin prefijo de idioma: "/en/apps" → "/apps"
  const segments = pathname.split("/").filter(Boolean);
  const route = isLocale(segments[0])
    ? `/${segments.slice(1).join("/")}`
    : pathname;
  const clean = route === "/" || route === "//" ? "" : route.replace(/\/$/, "");

  return (locale: Locale) =>
    locale === defaultLocale ? clean || "/" : `/${locale}${clean}`;
}

/** Píldoras con los tres idiomas. Se usa desde `md` para arriba. */
export function LanguageSwitcher({
  current,
  label,
  className = "",
}: {
  current: Locale;
  label: string;
  className?: string;
}) {
  const hrefFor = useLocaleHrefs();

  return (
    <div
      className={`flex items-center gap-0.5 rounded-full border border-brand-500/15 bg-brand-50/60 p-0.5 ${className}`}
      role="group"
      aria-label={label}
    >
      {locales.map((locale) => {
        const isCurrent = locale === current;
        return (
          <Link
            key={locale}
            href={hrefFor(locale)}
            hrefLang={locale}
            lang={locale}
            aria-current={isCurrent ? "true" : undefined}
            title={localeNames[locale]}
            onClick={() => rememberLocale(locale)}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
              isCurrent
                ? "bg-white text-brand-700 shadow-sm"
                : "text-ink/50 hover:text-brand-700"
            }`}
          >
            {localeShortNames[locale]}
          </Link>
        );
      })}
    </div>
  );
}

/**
 * Versión desplegable para mobile: un botón compacto con el idioma actual que
 * abre un menú con los nombres completos. En pantallas chicas las tres
 * píldoras compiten por espacio con el logo y el botón de menú.
 */
export function LanguageMenu({
  current,
  label,
  className = "",
}: {
  current: Locale;
  label: string;
  className?: string;
}) {
  const hrefFor = useLocaleHrefs();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cierra al tocar fuera o al apretar Escape
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`${label}: ${localeNames[current]}`}
        className="flex h-10 items-center gap-1.5 rounded-xl border border-brand-500/15 px-2.5 text-brand-700 transition hover:bg-brand-50"
      >
        <Icon name="globe" className="size-4.5" />
        <span className="text-xs font-semibold">
          {localeShortNames[current]}
        </span>
        <Icon
          name="chevronDown"
          className={`size-3.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={label}
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-brand-500/15 bg-white p-1.5 shadow-xl shadow-brand-950/10"
        >
          {locales.map((locale) => {
            const isCurrent = locale === current;
            return (
              <Link
                key={locale}
                href={hrefFor(locale)}
                hrefLang={locale}
                lang={locale}
                role="menuitem"
                aria-current={isCurrent ? "true" : undefined}
                onClick={() => {
                  rememberLocale(locale);
                  setOpen(false);
                }}
                className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  isCurrent
                    ? "bg-brand-50 font-semibold text-brand-700"
                    : "font-medium text-ink/75 hover:bg-brand-50/60"
                }`}
              >
                {localeNames[locale]}
                {isCurrent && <Icon name="check" className="size-4" />}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

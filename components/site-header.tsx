"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";

const nav = [
  { href: "/apps", label: "Apps" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/soporte", label: "Soporte" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition duration-300 ${
        scrolled
          ? "border-b border-brand-500/10 bg-white/55 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-20 items-center justify-between gap-4 md:h-24">
        <Link
          href="/"
          className="flex items-center gap-3.5"
          aria-label="Imagostack — inicio"
        >
          <Image
            src="/logo.png"
            alt="Imagostack"
            width={660}
            height={175}
            priority
            className="h-11 w-auto md:h-14"
          />
          <span className="hidden border-l border-brand-500/20 pl-3.5 text-[11px] leading-tight font-medium tracking-wide text-ink/45 lg:block">
            Full-cycle,
            <br />
            full-stack
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-ink/70 transition hover:bg-brand-50 hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contacto"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4.5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-900/20 transition hover:bg-brand-700"
          >
            Contacto
            <Icon name="arrowRight" className="size-4" />
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Abrir menú"
          className="grid size-10 place-items-center rounded-xl border border-brand-500/15 text-brand-700 transition hover:bg-brand-50 md:hidden"
        >
          <Icon name={menuOpen ? "close" : "menu"} className="size-5" />
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-brand-500/10 bg-white/95 backdrop-blur-xl md:hidden">
          <nav className="shell flex flex-col py-3">
            {[...nav, { href: "/#contacto", label: "Contacto" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                // El menú se cierra al navegar
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-[15px] font-medium text-ink/80 transition hover:bg-brand-50 hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

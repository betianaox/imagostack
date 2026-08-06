import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { Icon } from "@/components/icons";
import { getDictionary } from "@/lib/dictionaries";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * 404 global. Como el proyecto usa dos root layouts (uno por grupo de rutas),
 * esta página no hereda ninguno y tiene que traer su propio documento.
 * Se sirve en español, que es el idioma por defecto del dominio.
 */
export default function NotFound() {
  const dict = getDictionary("es");

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">
        <section className="relative flex min-h-screen items-center overflow-hidden bg-ink text-white">
          <div className="aurora absolute inset-0 opacity-55" />
          <div className="grid-lines absolute inset-0" />

          <div className="shell relative py-20 text-center">
            <p className="font-mono text-sm font-semibold tracking-[0.2em] text-coral-300">
              {dict.notFound.code}
            </p>
            <h1 className="mx-auto mt-5 max-w-2xl text-4xl leading-[1.08] font-semibold tracking-[-0.03em] text-balance md:text-6xl">
              {dict.notFound.title}
            </h1>
            <p className="mx-auto mt-5 max-w-md text-lg text-white/70">
              {dict.notFound.text}
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-brand-950/25 transition hover:-translate-y-0.5"
              >
                {dict.notFound.home}
              </Link>
              <Link
                href="/apps"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/90 transition hover:border-white/40 hover:bg-white/5"
              >
                {dict.notFound.apps}
                <Icon name="arrowRight" className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}

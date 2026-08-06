import Link from "next/link";
import { Icon } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-ink text-white">
      <div className="aurora absolute inset-0 opacity-55" />
      <div className="grid-lines absolute inset-0" />

      <div className="shell relative py-20 text-center">
        <p className="font-mono text-sm font-semibold tracking-[0.2em] text-coral-300">
          ERROR 404
        </p>
        <h1 className="mx-auto mt-5 max-w-2xl text-4xl leading-[1.08] font-semibold tracking-[-0.03em] text-balance md:text-6xl">
          Esta pantalla no existe
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-white/70">
          La página que buscabas se movió o nunca estuvo acá. Probá desde el
          inicio o mirá el catálogo de apps.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-brand-950/25 transition hover:-translate-y-0.5"
          >
            Ir al inicio
          </Link>
          <Link
            href="/apps"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/90 transition hover:border-white/40 hover:bg-white/5"
          >
            Ver las apps
            <Icon name="arrowRight" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

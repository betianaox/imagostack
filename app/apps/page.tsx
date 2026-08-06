import type { Metadata } from "next";
import { AppCard } from "@/components/app-card";
import { Reveal } from "@/components/reveal";
import { apps } from "@/lib/apps";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nuestras apps",
  description: `Todas las aplicaciones de ${site.name} disponibles para Android en Google Play.`,
  alternates: { canonical: "/apps" },
};

export default function AppsPage() {
  const categories = [...new Set(apps.map((app) => app.category))];

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="aurora absolute inset-0 opacity-60" />
        <div className="grid-lines absolute inset-0" />

        <div className="shell relative py-16 md:py-24">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-coral-300 uppercase">
            Catálogo
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.03em] text-balance md:text-6xl">
            Nuestras apps
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            {apps.length} aplicaciones para Android, en{" "}
            {categories.length === 1
              ? categories[0].toLowerCase()
              : `${categories.length} categorías`}
            . Todas se descargan desde Google Play.
          </p>
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, index) => (
            <Reveal key={app.slug} delay={index * 90}>
              <AppCard app={app} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { AppCard } from "@/components/app-card";
import { AppIcon } from "@/components/app-visuals";
import { Icon, type IconName } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { apps } from "@/lib/apps";
import { site } from "@/lib/site";

const pillars: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "palette",
    title: "Diseño primero",
    description:
      "Cada pantalla se prototipa y se prueba antes de escribirse una línea de código. Si una función no se entiende sola, todavía no está lista.",
  },
  {
    icon: "bolt",
    title: "Rápidas de verdad",
    description:
      "Apps livianas, que arrancan al instante y no se comen la batería ni los datos del teléfono.",
  },
  {
    icon: "shield",
    title: "Privacidad como default",
    description:
      "Recolectamos lo mínimo indispensable, lo declaramos con claridad y nunca vendemos información de nuestros usuarios.",
  },
  {
    icon: "users",
    title: "Soporte real",
    description:
      "Del otro lado del mail hay personas. Respondemos todas las consultas en menos de 48 horas hábiles.",
  },
];

const steps = [
  {
    label: "01",
    title: "Idea y validación",
    description:
      "Definimos el problema concreto que resuelve la app y descartamos todo lo que no aporte a eso.",
  },
  {
    label: "02",
    title: "Diseño y prototipo",
    description:
      "Armamos el flujo completo en prototipos navegables para probarlo con usuarios reales.",
  },
  {
    label: "03",
    title: "Desarrollo",
    description:
      "Construimos con foco en performance, accesibilidad y compatibilidad con la mayor cantidad de dispositivos.",
  },
  {
    label: "04",
    title: "Publicación y mejora",
    description:
      "Publicamos en Google Play y seguimos iterando con las métricas y el feedback de la comunidad.",
  },
];

/** Fichas de acceso rápido al pie del hero. */
const heroApps = apps.slice(0, 2);

export default function Home() {
  return (
    <>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="aurora absolute inset-0 opacity-70" />
        <div className="grid-lines absolute inset-0" />

        <div className="shell relative pt-16 pb-16 md:pt-24 md:pb-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium tracking-wide text-white/85 backdrop-blur">
            <span className="size-1.5 rounded-full bg-coral-400" />
            Apps propias para Android
          </span>

          {/*
            El slogan de marca es el título del sitio, en una sola línea: el
            clamp lo hace escalar con el viewport para que nunca corte.
          */}
          <h1 className="mt-6 text-[clamp(1.55rem,7vw,4.4rem)] leading-[1.05] font-semibold tracking-[-0.035em] whitespace-nowrap">
            Full-cycle,{" "}
            <span className="bg-linear-to-r from-coral-300 via-coral-400 to-coral-500 bg-clip-text text-transparent">
              full-stack
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:mt-6 sm:text-lg">
            Somos {site.name}: pensamos, diseñamos, desarrollamos, publicamos y
            mantenemos nuestras propias aplicaciones para Android. Todo el ciclo,
            toda la pila — sin intermediarios.
          </p>

          {/* En mobile los botones ocupan el ancho completo, uno por fila */}
          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/apps"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-coral-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-coral-900/30 transition hover:-translate-y-0.5 hover:bg-coral-600"
            >
              Ver nuestras apps
              <Icon name="arrowRight" className="size-4" />
            </Link>
            <Link
              href="#nosotros"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/90 transition hover:border-white/40 hover:bg-white/5"
            >
              Así trabajamos
            </Link>
          </div>

          {/* Accesos directos a cada app, al pie del bloque oscuro */}
          <div className="mt-10 grid gap-3 border-t border-white/10 pt-8 sm:mt-14 sm:gap-4 sm:pt-10 sm:grid-cols-2 md:mt-16">
            {heroApps.map((app) => (
              <Link
                key={app.slug}
                href={`/apps/${app.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur transition duration-300 hover:border-white/25 hover:bg-white/10 sm:p-5"
              >
                <AppIcon app={app} className="size-12 shrink-0 sm:size-16" />
                <div className="min-w-0 flex-1">
                  <h2 className="leading-tight font-semibold tracking-tight">
                    {app.name}
                  </h2>
                  <p className="mt-1 text-[11px] font-medium tracking-widest text-white/40 uppercase">
                    {app.category}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-white/60">
                    {app.tagline}
                  </p>
                </div>
                <Icon
                  name="arrowRight"
                  className="size-5 shrink-0 text-white/40 transition duration-300 group-hover:translate-x-1 group-hover:text-white"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── Apps ───────────────────────── */}
      <section id="apps" className="shell scroll-mt-24 py-20 md:py-28">
        <Reveal>
          <SectionKicker>Nuestras apps</SectionKicker>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-2xl text-3xl leading-tight font-semibold tracking-tight text-balance md:text-[2.75rem]">
              Calidad profesional, sin excepciones
            </h2>
            <Link
              href="/apps"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Ver el catálogo completo
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, index) => (
            <Reveal key={app.slug} delay={index * 90}>
              <AppCard app={app} />
            </Reveal>
          ))}

          {/* Slot abierto: el catálogo crece a medida que se suman apps */}
          <Reveal delay={apps.length * 90}>
            <div className="flex h-full min-h-72 flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-brand-500/25 bg-brand-50/40 p-8 text-center">
              <span className="grid size-12 place-items-center rounded-2xl bg-white text-brand-500 shadow-sm">
                <Icon name="sparkles" className="size-6" />
              </span>
              <div>
                <h3 className="font-semibold text-brand-800">
                  ¿Tenés una idea?
                </h3>
                <p className="mt-1.5 text-sm text-ink/60">
                  Si hay un problema que te gustaría resolver con una app,
                  queremos escucharlo.
                </p>
              </div>
              <Link
                href="#contacto"
                className="text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                Contarnos una idea →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────── Nosotros ───────────────────────── */}
      <section
        id="nosotros"
        className="scroll-mt-20 border-y border-brand-500/10 bg-brand-50/50 py-20 md:py-28"
      >
        <div className="shell">
          <Reveal>
            <SectionKicker>Nosotros</SectionKicker>
            <h2 className="mt-4 max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-balance md:text-[2.75rem]">
              Así trabajamos
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 80}>
                <div className="h-full rounded-2xl border border-brand-500/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-900/5">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-600 text-white shadow-sm shadow-brand-900/20">
                    <Icon name={pillar.icon} className="size-5.5" />
                  </span>
                  <h3 className="mt-5 font-semibold tracking-tight text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Proceso */}
          <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.label} delay={index * 80}>
                <div className="relative">
                  <span className="block text-3xl leading-none font-semibold tracking-[-0.03em] text-coral-500 md:text-4xl">
                    {step.label}
                  </span>
                  <div className="mt-4 mb-4 h-px bg-linear-to-r from-brand-500/30 to-transparent" />
                  <h3 className="font-semibold tracking-tight text-brand-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── Contacto ───────────────────────── */}
      <section id="contacto" className="shell scroll-mt-24 py-20 md:py-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl bg-ink px-7 py-14 text-white md:px-14 md:py-20">
            <div className="aurora absolute inset-0 opacity-55" />
            <div className="grid-lines absolute inset-0" />

            <div className="relative max-w-2xl">
              <SectionKicker tone="dark">Hablemos</SectionKicker>
              <h2 className="mt-4 text-3xl leading-tight font-semibold tracking-tight text-balance md:text-[2.6rem]">
                ¿Tenés una idea, una consulta o encontraste un error?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                Escribinos y te respondemos en menos de 48 horas hábiles. Si es
                sobre alguna de nuestras apps, contanos el modelo de tu teléfono
                y la versión de Android para poder ayudarte más rápido.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email.general}`}
                  className="inline-flex items-center gap-2.5 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-brand-950/25 transition hover:-translate-y-0.5"
                >
                  <Icon name="mail" className="size-4.5" />
                  {site.email.general}
                </a>
                <Link
                  href="/soporte"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/90 transition hover:border-white/40 hover:bg-white/5"
                >
                  Centro de soporte
                  <Icon name="arrowRight" className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function SectionKicker({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`text-[11px] font-semibold tracking-[0.16em] uppercase ${
        tone === "dark" ? "text-coral-300" : "text-coral-600"
      }`}
    >
      {children}
    </p>
  );
}

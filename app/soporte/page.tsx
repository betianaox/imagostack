import type { Metadata } from "next";
import Link from "next/link";
import { AppIcon } from "@/components/app-visuals";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { apps } from "@/lib/apps";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Soporte",
  description: `Ayuda para las aplicaciones de ${site.name}: cómo contactarnos, tiempos de respuesta y respuestas a las preguntas más frecuentes.`,
  alternates: { canonical: "/soporte" },
};

const faqs = [
  {
    question: "¿Cuánto tardan en responder?",
    answer:
      "Menos de 48 horas hábiles. Escribe una persona del equipo, no un bot ni una respuesta automática.",
  },
  {
    question: "Encontré un error, ¿qué información les sirve?",
    answer:
      "El nombre de la app, el modelo de tu teléfono, la versión de Android y, si podés, una captura de pantalla y los pasos para reproducir el problema. Con eso solemos resolverlo en la primera respuesta.",
  },
  {
    question: "¿Puedo pasar mis datos a otro teléfono?",
    answer:
      "Depende de la app: las que guardan historial incluyen funciones de exportar e importar. Si no encontrás la opción, escribinos y te guiamos.",
  },
  {
    question: "¿Cómo borro toda mi información?",
    answer:
      "Podés hacerlo desde la propia app o desinstalándola, ya que los datos viven en tu dispositivo. El procedimiento completo está en la página de eliminación de datos.",
  },
  {
    question: "Tengo una idea para una app, ¿la leen?",
    answer:
      "Sí, y con gusto. Varias de las funciones que hoy existen salieron de mensajes de usuarios. Escribinos contando el problema que te gustaría resolver.",
  },
  {
    question: "¿Cómo reporto un problema de facturación de Google Play?",
    answer:
      "Los cobros, reembolsos y suscripciones los administra Google Play. Para esos casos conviene usar el soporte de Google, aunque si nos escribís te ayudamos a encontrar el camino.",
  },
];

export default function SupportPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="aurora absolute inset-0 opacity-55" />
        <div className="grid-lines absolute inset-0" />

        <div className="shell relative py-16 md:py-24">
          <p className="text-[13px] font-semibold tracking-[0.14em] text-coral-300 uppercase">
            Soporte
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.03em] text-balance md:text-6xl">
            Estamos del otro lado
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            Si algo no funciona, si te falta una función o si simplemente querés
            contarnos algo, escribinos. Respondemos en menos de 48 horas hábiles.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email.support}`}
              className="inline-flex items-center gap-2.5 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-brand-950/25 transition hover:-translate-y-0.5"
            >
              <Icon name="mail" className="size-4.5" />
              {site.email.support}
            </a>
          </div>
        </div>
      </section>

      {/* Accesos por app */}
      <section className="shell py-16 md:py-20">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Ayuda por aplicación
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink/60">
            Cada app tiene su ficha y su política de privacidad propia. Si tu
            consulta es sobre una en particular, mencionala en el asunto del mail.
          </p>
        </Reveal>

        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {apps.map((app, index) => (
            <Reveal key={app.slug} delay={index * 90}>
              <div className="flex h-full flex-col gap-5 rounded-2xl border border-brand-500/10 bg-white p-6 sm:flex-row sm:items-center">
                <AppIcon app={app} className="size-14 shrink-0" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold tracking-tight text-ink">
                    {app.name}
                  </h3>
                  <p className="mt-1 text-sm text-ink/60">{app.tagline}</p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm font-semibold">
                    <Link
                      href={`/apps/${app.slug}`}
                      className="text-brand-700 hover:text-brand-800"
                    >
                      Ver la app
                    </Link>
                    <Link
                      href={`/apps/${app.slug}/privacidad`}
                      className="text-brand-700 hover:text-brand-800"
                    >
                      Privacidad
                    </Link>
                    <a
                      href={`mailto:${site.email.support}?subject=${encodeURIComponent(
                        `[${app.name}] `,
                      )}`}
                      className="text-coral-600 hover:text-coral-700"
                    >
                      Escribir sobre {app.name}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section className="border-t border-brand-500/10 bg-brand-50/50 py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Preguntas frecuentes
            </h2>
          </Reveal>

          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            {faqs.map((faq, index) => (
              <Reveal key={faq.question} delay={index * 60}>
                <details className="group rounded-2xl border border-brand-500/10 bg-white p-5 md:p-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold tracking-tight text-ink">
                    {faq.question}
                    <Icon
                      name="chevronRight"
                      className="mt-0.5 size-5 shrink-0 text-brand-500 transition-transform group-open:rotate-90"
                    />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-10 text-sm text-ink/60">
              ¿No estaba tu pregunta?{" "}
              <a
                href={`mailto:${site.email.support}`}
                className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
              >
                Escribinos
              </a>{" "}
              y la resolvemos. También podés revisar cómo{" "}
              <Link
                href="/eliminar-datos"
                className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
              >
                eliminar tus datos
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

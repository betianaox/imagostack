import Link from "next/link";
import type { App } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionaries";
import { AppIcon, PhoneFrame } from "@/components/app-visuals";
import { Icon } from "@/components/icons";
import { path, t, type Locale } from "@/lib/i18n";

/** Tarjeta de app para la grilla del home y de /apps. */
export function AppCard({
  app,
  lang,
  dict,
}: {
  app: App;
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <Link
      href={path(`/apps/${app.slug}`, lang)}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand-500/10 bg-white shadow-[0_1px_2px_rgba(11,22,34,0.04),0_12px_40px_-24px_rgba(11,22,34,0.25)] transition duration-500 hover:-translate-y-1 hover:border-brand-500/25 hover:shadow-[0_1px_2px_rgba(11,22,34,0.04),0_28px_60px_-28px_rgba(11,22,34,0.35)]"
    >
      {/* Cabecera con el degradado propio de la app y una captura asomando */}
      <div
        className="relative h-44 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(140deg, ${app.accent[0]}, ${app.accent[1]})`,
        }}
      >
        <div className="grid-lines absolute inset-0 opacity-60" />

        <div className="absolute -bottom-14 left-1/2 w-32 -translate-x-1/2 transition duration-500 group-hover:-translate-y-2">
          <PhoneFrame
            shot={app.screenshots[0]}
            lang={lang}
            accent={app.accent}
            label={app.name}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start gap-3.5">
          <AppIcon app={app} className="size-12 shrink-0" rounded="rounded-xl" />
          <div className="min-w-0">
            <h3 className="text-lg leading-tight font-semibold tracking-tight text-ink">
              {app.name}
            </h3>
            <p className="mt-0.5 text-[13px] font-medium text-brand-600">
              {t(app.category, lang)}
            </p>
          </div>
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/65">
          {t(app.tagline, lang)}
        </p>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
          {dict.support.seeApp}
          <Icon
            name="arrowRight"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}

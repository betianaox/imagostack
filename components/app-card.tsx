import Image from "next/image";
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
      {/* CABECERA: EL GRAFICO DE FUNCIONES DE PLAY.
          Antes era el degradado de la app con una captura de telefono asomando.
          El banner de la tienda le gana por dos motivos: esta pensado para
          leerse a este tamaño —una captura recortada a 176 de alto no se lee— y
          es la misma imagen que ve quien encuentra la app en Play, asi que el
          sitio y la tienda muestran lo mismo.

          LA CABECERA TIENE LA PROPORCION DEL BANNER (1024/500) en vez de un
          alto fijo. Con un alto fijo, cualquier ancho de tarjeta que no diera
          justo esa proporcion recortaba de los costados — y buscar "el alto
          correcto" no sirve, porque la tarjeta mide distinto en una, dos o tres
          columnas. Atada a la proporcion, el banner entra entero siempre y el
          alto lo decide el ancho disponible.

          Si una app no tiene feature todavia, cae al degradado de antes. */}
      {app.feature ? (
        <div className="relative aspect-[1024/500] overflow-hidden">
          <Image
            src={app.feature}
            alt={t(app.name, lang)}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div
          className="relative aspect-[1024/500] overflow-hidden"
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
              label={t(app.name, lang)}
            />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start gap-3.5">
          <AppIcon app={app} lang={lang} className="size-12 shrink-0" rounded="rounded-xl" />
          <div className="min-w-0">
            <h3 className="text-lg leading-tight font-semibold tracking-tight text-ink">
              {t(app.name, lang)}
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

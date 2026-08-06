import Image from "next/image";
import type { App, Screenshot } from "@/lib/apps";
import { t, type Locale } from "@/lib/i18n";
import { Icon } from "@/components/icons";

/** Icono de la app: usa el PNG si existe, si no un monograma con su degradado. */
export function AppIcon({
  app,
  className = "size-14",
  rounded = "rounded-2xl",
}: {
  app: App;
  className?: string;
  rounded?: string;
}) {
  if (app.icon) {
    return (
      <Image
        src={app.icon}
        alt={app.name}
        width={128}
        height={128}
        className={`${className} ${rounded} object-cover shadow-lg shadow-brand-950/20 ring-1 ring-black/5`}
      />
    );
  }

  const monogram = app.name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className={`${className} ${rounded} grid place-items-center font-semibold text-white shadow-lg shadow-brand-950/20 ring-1 ring-black/5`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${app.accent[0]}, ${app.accent[1]})`,
      }}
    >
      <span className="text-[0.42em] tracking-tight">{monogram}</span>
    </span>
  );
}

/**
 * Marco de teléfono. Si no recibe captura, dibuja un placeholder — así el sitio
 * se ve completo antes de tener las imágenes finales.
 */
export function PhoneFrame({
  shot,
  lang,
  accent,
  label,
  priority = false,
  className = "",
}: {
  shot?: Screenshot;
  lang: Locale;
  accent: [string, string];
  /** Texto del placeholder cuando no hay captura */
  label?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-9/19 w-full rounded-4xl bg-ink p-0.75 shadow-2xl shadow-brand-950/40 ring-1 ring-white/10 ${className}`}
    >
      {/* Muesca superior */}
      <span className="absolute top-2.5 left-1/2 z-20 h-1.5 w-14 -translate-x-1/2 rounded-full bg-white/15" />

      <div className="relative h-full w-full overflow-hidden rounded-[1.85rem] bg-brand-950">
        {shot ? (
          <Image
            src={shot.src}
            alt={t(shot.alt, lang)}
            fill
            sizes="(max-width: 640px) 70vw, 280px"
            priority={priority}
            className="object-cover"
          />
        ) : (
          <div
            className="grid h-full w-full place-items-center"
            style={{
              backgroundImage: `linear-gradient(160deg, ${accent[0]}, ${accent[1]})`,
            }}
          >
            <div className="flex flex-col items-center gap-3 px-5 text-center text-white/80">
              <Icon name="device" className="size-8" />
              {label && (
                <span className="text-[11px] leading-snug font-medium tracking-wide">
                  {label}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

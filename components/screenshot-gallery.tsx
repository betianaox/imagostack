"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Screenshot } from "@/lib/apps";
import { Icon } from "@/components/icons";
import { PhoneFrame } from "@/components/app-visuals";
import { fillText, type Dictionary } from "@/lib/dictionaries";
import { t, type Locale } from "@/lib/i18n";

/**
 * Visor de capturas: una pantalla grande con miniaturas para cambiar de una a
 * otra, y ampliación a pantalla completa al tocar la grande.
 */
export function ScreenshotGallery({
  shots,
  accent,
  appName,
  lang,
  dict,
}: {
  shots: Screenshot[];
  accent: [string, string];
  appName: string;
  lang: Locale;
  dict: Dictionary;
}) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const step = useCallback(
    (dir: -1 | 1) =>
      setActive((current) => (current + dir + shots.length) % shots.length),
    [shots.length],
  );

  // Flechas del teclado: navegan la galería, y también el visor ampliado
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "Escape") setZoomed(false);
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [step]);

  // Bloquea el scroll de fondo mientras la captura está ampliada
  useEffect(() => {
    if (!zoomed) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [zoomed]);

  if (shots.length === 0) {
    return (
      <div className="mx-auto w-full max-w-60">
        <PhoneFrame lang={lang} accent={accent} label={appName} />
      </div>
    );
  }

  const current = shots[active];
  const currentAlt = t(current.alt, lang);

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-[17rem_1fr] lg:items-start lg:gap-14">
        {/* Captura activa */}
        <div className="mx-auto w-full max-w-60 lg:mx-0 lg:max-w-none">
          <button
            type="button"
            onClick={() => setZoomed(true)}
            aria-label={fillText(dict.gallery.zoom, { alt: currentAlt })}
            className="block w-full cursor-zoom-in rounded-4xl transition duration-500 hover:-translate-y-1"
          >
            <PhoneFrame shot={current} lang={lang} accent={accent} priority />
          </button>

          {shots.length > 1 && (
            <div className="mt-5 flex items-center justify-center gap-2 lg:justify-start">
              <StepButton
                dir={-1}
                onClick={() => step(-1)}
                label={dict.gallery.previous}
              />
              <span className="min-w-14 text-center text-xs font-medium text-ink/50 tabular-nums">
                {active + 1} / {shots.length}
              </span>
              <StepButton
                dir={1}
                onClick={() => step(1)}
                label={dict.gallery.next}
              />
            </div>
          )}
        </div>

        {/* Descripción de la pantalla activa + miniaturas */}
        <div>
          <p
            className="border-l-2 pl-4 text-[15px] leading-relaxed text-ink/70"
            style={{ borderColor: accent[1] }}
          >
            {currentAlt}
          </p>

          <ul className="mt-7 grid grid-cols-4 gap-3 sm:grid-cols-5 sm:gap-4 lg:grid-cols-6">
            {shots.map((shot, index) => {
              const isActive = index === active;
              return (
                <li key={shot.src}>
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={fillText(dict.gallery.thumb, {
                      n: index + 1,
                      app: appName,
                    })}
                    aria-current={isActive}
                    className={`relative block w-full overflow-hidden rounded-xl transition duration-300 ${
                      isActive
                        ? "ring-2 ring-offset-2 ring-offset-white"
                        : "opacity-55 hover:opacity-100"
                    }`}
                    style={
                      isActive
                        ? ({
                            "--tw-ring-color": accent[1],
                          } as React.CSSProperties)
                        : undefined
                    }
                  >
                    <span className="relative block aspect-9/19 w-full bg-brand-950">
                      <Image
                        src={shot.src}
                        alt=""
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Visor a pantalla completa */}
      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentAlt}
          onClick={() => setZoomed(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            type="button"
            onClick={() => setZoomed(false)}
            aria-label={dict.gallery.close}
            className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <Icon name="close" className="size-5" />
          </button>

          {shots.length > 1 && (
            <>
              <ZoomNav
                dir={-1}
                onClick={() => step(-1)}
                label={dict.gallery.previous}
              />
              <ZoomNav
                dir={1}
                onClick={() => step(1)}
                label={dict.gallery.next}
              />
            </>
          )}

          <div
            onClick={(event) => event.stopPropagation()}
            className="relative h-full max-h-[86vh] w-auto"
          >
            <Image
              src={current.src}
              alt={currentAlt}
              width={900}
              height={1900}
              className="h-full w-auto rounded-3xl object-contain shadow-2xl"
            />
          </div>

          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/80 tabular-nums">
            {active + 1} / {shots.length}
          </span>
        </div>
      )}
    </>
  );
}

function StepButton({
  dir,
  onClick,
  label,
}: {
  dir: -1 | 1;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-9 place-items-center rounded-full border border-brand-500/20 bg-white text-brand-600 shadow-sm transition hover:border-brand-500/40 hover:bg-brand-50"
    >
      <Icon
        name={dir === -1 ? "chevronLeft" : "chevronRight"}
        className="size-4.5"
      />
    </button>
  );
}

function ZoomNav({
  dir,
  onClick,
  label,
}: {
  dir: -1 | 1;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      aria-label={label}
      className={`absolute z-10 grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 ${
        dir === -1 ? "left-3 sm:left-6" : "right-3 sm:right-6"
      }`}
    >
      <Icon
        name={dir === -1 ? "chevronLeft" : "chevronRight"}
        className="size-5"
      />
    </button>
  );
}

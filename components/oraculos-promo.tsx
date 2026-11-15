"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { StoreBadge } from "@/components/store-badge";
import type { Locale } from "@/lib/i18n";

/**
 * Banda de videos promocionales de Oráculos: tres videos verticales en fila
 * (el botón del tarot, la carpa egipcia y la máquina de los ángeles).
 *
 * Son los mismos videos de TikTok, con el cierre en el idioma de la página
 * (`public/videos/oraculos/<video>-<idioma>.mp4`). Los navegadores solo dejan
 * arrancar solo a un video sin sonido, así que empiezan mudos y cada uno tiene
 * su botón para escuchar la música; al activar uno, los demás se silencian.
 *
 * Se reproducen solo mientras están en pantalla, y si la persona pidió reducir
 * el movimiento no arrancan solos: se ve el póster y se tocan para verlos.
 */

const VIDEOS = ["tarot", "egipcio", "angeles"] as const;
type VideoKey = (typeof VIDEOS)[number];

export type OraculosPromoText = {
  kicker: string;
  title: string;
  text: string;
  soundOn: string;
  soundOff: string;
  play: string;
  badgeLabel: string;
  videos: Record<VideoKey, string>;
};

export function OraculosPromo({
  lang,
  text,
  playStoreUrl,
}: {
  lang: Locale;
  text: OraculosPromoText;
  playStoreUrl?: string;
}) {
  const [audible, setAudible] = useState<VideoKey | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#0b0a1f] text-white">
      {/* Cielo de fondo, el mismo clima de los videos */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 10%, rgba(120,60,170,.35), transparent 70%), radial-gradient(50% 45% at 85% 90%, rgba(40,110,150,.3), transparent 70%), radial-gradient(40% 35% at 50% 50%, rgba(240,200,120,.12), transparent 70%)",
        }}
      />
      <div aria-hidden className="oraculos-stars absolute inset-0 opacity-60" />

      <div className="shell relative py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[13px] font-semibold tracking-[0.14em] text-[#f0d28c] uppercase">
            {text.kicker}
          </p>
          <h2 className="mt-4 text-3xl leading-tight font-semibold tracking-tight text-[#f3e9d2] text-balance md:text-[2.75rem]">
            {text.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
            {text.text}
          </p>
          {playStoreUrl && (
            <div className="mt-7 flex justify-center">
              <StoreBadge url={playStoreUrl} lang={lang} label={text.badgeLabel} />
            </div>
          )}
        </div>

        {/* En mobile se deslizan de a uno; desde md entran los tres en fila */}
        <div className="-mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mx-auto md:grid md:max-w-5xl md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0">
          {VIDEOS.map((key) => (
            <PromoVideo
              key={key}
              src={`/videos/oraculos/${key}-${lang}.mp4`}
              poster={`/videos/oraculos/${key}-${lang}.jpg`}
              label={text.videos[key]}
              audible={audible === key}
              onToggleSound={() => setAudible((current) => (current === key ? null : key))}
              soundOn={text.soundOn}
              soundOff={text.soundOff}
              play={text.play}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PromoVideo({
  src,
  poster,
  label,
  audible,
  onToggleSound,
  soundOn,
  soundOff,
  play,
}: {
  src: string;
  poster: string;
  label: string;
  audible: boolean;
  onToggleSound: () => void;
  soundOn: string;
  soundOff: string;
  play: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Reproducir solo mientras se ve; con movimiento reducido, solo a pedido
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(prefersReduced);
    if (prefersReduced || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (video) video.muted = !audible;
  }, [audible]);

  return (
    <figure className="relative w-[72vw] max-w-80 shrink-0 snap-center md:w-auto md:max-w-none">
      {/* Marco dorado, como el de los videos */}
      <div className="rounded-[1.75rem] bg-linear-to-b from-[#f6dc9a] via-[#b98a3e] to-[#f0d28c] p-[3px] shadow-[0_0_40px_rgba(240,200,120,.25)]">
        <div className="relative overflow-hidden rounded-[1.6rem] bg-black">
          <video
            ref={ref}
            className="aspect-9/16 w-full object-cover"
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload="none"
            aria-label={label}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />

          {reduced && !playing && (
            <button
              type="button"
              onClick={() => ref.current?.play().catch(() => {})}
              className="absolute inset-0 grid place-items-center bg-black/30"
              aria-label={`${play}: ${label}`}
            >
              <span className="grid size-16 place-items-center rounded-full bg-[#f0d28c] text-[#191028] shadow-lg">
                <Icon name="arrowRight" className="size-7" />
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={onToggleSound}
            aria-pressed={audible}
            aria-label={audible ? soundOff : soundOn}
            className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-black/75"
          >
            <SpeakerIcon muted={!audible} />
            <span>{audible ? soundOff : soundOn}</span>
          </button>
        </div>
      </div>
    </figure>
  );
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" />
      {muted ? (
        <path d="m16 9 5 6m0-6-5 6" />
      ) : (
        <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
      )}
    </svg>
  );
}

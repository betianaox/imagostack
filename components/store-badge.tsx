import Image from "next/image";
import type { Locale } from "@/lib/i18n";

/**
 * Badge de descarga en Google Play, en el idioma de la página.
 *
 * HAY UN ARCHIVO POR IDIOMA Y SON LOS DE GOOGLE, sin tocar. Las reglas de marca
 * piden usar su artwork tal cual: no se recolorea, no se recorta y no se rehace
 * con el texto traducido aunque quede idéntico. Por eso los nombres son los que
 * traen al descargarlos — renombrarlos invita a que alguien crea que son
 * nuestros y los edite.
 *
 * Los cuatro miden 478×142, así que la proporción es la misma para todos y el
 * alto de la fila no cambia al cambiar de idioma.
 *
 * Si la app todavía no tiene URL cargada, no se renderiza nada: nunca mostramos
 * un link roto ni un cartel de espera.
 */
const BADGES: Record<Locale, string> = {
  es: "/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM.png",
  en: "/GetItOnGooglePlay_Badge_Web_color_English.png",
  pt: "/GetItOnGooglePlay_Badge_Web_color_Portuguese-Brazil.png",
  it: "/GetItOnGooglePlay_Badge_Web_color_Italian.png",
};

export function StoreBadge({
  url,
  lang,
  label,
  size = "md",
  className = "",
}: {
  url: string;
  lang: Locale;
  /** Nombre accesible del enlace, ya traducido (ej. "Descarga Óraculos"). */
  label: string;
  size?: "sm" | "md";
  className?: string;
}) {
  // EN DESARROLLO SE DIBUJA AUNQUE NO HAYA URL, para poder revisarlo.
  // Las dos apps tienen `playStoreUrl` vacia mientras esten en prueba cerrada,
  // asi que sin esto el badge no se ve en ningun lado y no hay forma de mirar
  // como quedo. En produccion NODE_ENV vale "production" y vuelve a devolver
  // null: nunca se publica un enlace que no lleva a ninguna parte.
  //
  // Cuando las dos apps tengan su URL cargada en `lib/apps.ts`, esto se puede
  // sacar: deja de hacer falta.
  const enDesarrollo = process.env.NODE_ENV === "development";
  if (!url && !enDesarrollo) return null;

  const height = size === "sm" ? "h-11" : "h-13 md:h-14";

  return (
    <a
      href={url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`inline-block transition duration-300 hover:-translate-y-0.5 hover:brightness-110 ${className}`}
    >
      <Image
        src={BADGES[lang]}
        alt={label}
        width={478}
        height={142}
        className={`${height} w-auto`}
      />
    </a>
  );
}

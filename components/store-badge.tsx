import Image from "next/image";

/**
 * Badge de descarga en Google Play (public/googleplay.png, 839×258).
 * Si la app todavía no tiene URL cargada, no se renderiza nada: nunca mostramos
 * un link roto ni un cartel de espera.
 */
export function StoreBadge({
  url,
  size = "md",
  className = "",
}: {
  url: string;
  size?: "sm" | "md";
  className?: string;
}) {
  if (!url) return null;

  const height = size === "sm" ? "h-11" : "h-13 md:h-14";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Descargar en Google Play"
      className={`inline-block transition duration-300 hover:-translate-y-0.5 hover:brightness-110 ${className}`}
    >
      <Image
        src="/googleplay.png"
        alt="Disponible en Google Play"
        width={839}
        height={258}
        className={`${height} w-auto`}
      />
    </a>
  );
}

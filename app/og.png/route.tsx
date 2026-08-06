import { getDictionary } from "@/lib/dictionaries";
import { ogImage } from "@/lib/og-image";

// Se emite como archivo estático /og.png durante `next build`.
export const dynamic = "force-static";

/**
 * Tarjeta social del sitio. Es una sola, en español: el título es el slogan de
 * marca, que no se traduce, y el resto es la bajada de la empresa.
 */
export function GET() {
  const dict = getDictionary("es");

  return ogImage({
    kicker: dict.og.kicker,
    title: "Full-cycle,",
    accentTitle: "full-stack",
    description: dict.og.description,
  });
}

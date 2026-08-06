import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Tarjeta social 1200×630 compartida por el sitio y por cada app.
 * Se renderiza a PNG durante `next build`; `next/og` solo soporta flexbox y un
 * subconjunto de CSS, así que no hay grid ni clases de Tailwind acá.
 */
export function ogImage({
  kicker,
  title,
  accentTitle,
  description,
  accent = ["#26689b", "#ea6852"],
}: {
  kicker: string;
  title: string;
  /** Segunda parte del título, en color de acento */
  accentTitle?: string;
  description: string;
  /** Par de colores para las manchas de luz del fondo */
  accent?: [string, string];
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0b1622",
          backgroundImage: `radial-gradient(620px 520px at 10% 6%, ${accent[0]} 0%, transparent 66%), radial-gradient(540px 470px at 94% 22%, ${accent[1]} 0%, transparent 62%)`,
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 25,
            letterSpacing: 3,
            color: "rgba(255,255,255,0.62)",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#ea6852",
            }}
          />
          {kicker.toUpperCase()}
        </div>

        <div
          style={{
            marginTop: 26,
            display: "flex",
            flexWrap: "wrap",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -3,
            lineHeight: 1.06,
          }}
        >
          <span>{title}</span>
          {accentTitle ? (
            <span style={{ color: "#f7a294" }}>&nbsp;{accentTitle}</span>
          ) : null}
        </div>

        <div
          style={{
            marginTop: 30,
            maxWidth: 900,
            fontSize: 33,
            lineHeight: 1.4,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          {description}
        </div>

        <div
          style={{ marginTop: 42, fontSize: 25, color: "rgba(255,255,255,0.5)" }}
        >
          {site.domain}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}

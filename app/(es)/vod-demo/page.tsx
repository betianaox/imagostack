/*
  Demo del widget de Voice On Demand de Movilgate.

  Sirve para probar la integración desde otro dominio: el widget se embebe en
  el sitio de OTRO, así que acá se ve si el CSS no se filtra y si el CORS
  funciona entre orígenes distintos.

  El fragmento es exactamente el que genera el panel. Cuando anda, el envío
  registra una llamada telefónica real.
*/
import type { Metadata } from "next";

/**
 * El id aparece dos veces --en el id del div y en `data-vod`-- y el widget
 * busca su contenedor por `vod-<id>`: si se cambia uno solo, no monta.
 */
const VOD = "6ac520c2a6d8cb3e6ef85373";
const SRC = "https://voicera.movilgate.com/vod/widget.v1.js";

export const metadata: Metadata = {
  title: "Demo · Voice On Demand",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main
      style={{
        maxWidth: 820,
        margin: "0 auto",
        padding: "72px 24px",
      }}
    >
      <h1 style={{ fontSize: 32, marginBottom: 12 }}>¿Querés que te llamemos?</h1>
      <p style={{ opacity: 0.7, marginBottom: 40, lineHeight: 1.5 }}>
        Dejanos tus datos y un asistente te llama en el momento.
      </p>

      {/* Movilgate Voice On Demand — inicio */}
      <div id={`vod-${VOD}`} />
      <script
        src={SRC}
        data-vod={VOD}
        data-color-primary="#2f5c9e"
        data-color-base="#ffffff"
        data-width="100%"
        data-columns="auto"
        data-caption="Quiero que me llamen"
        data-error="Dato obligatorio"
        data-format="Formato incorrecto"
        async
      />
      {/* Movilgate Voice On Demand — fin */}
    </main>
  );
}

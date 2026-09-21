/*
  Demo del widget de Voice On Demand de Froneus.

  Está acá y no en el sitio de Froneus a propósito: el widget se embebe en el
  sitio de OTRO, y probarlo en un dominio propio no prueba lo que importa —que
  el CSS no se filtre, que el CORS funcione entre orígenes distintos—.

  Apunta al host productivo de Froneus. El script se descarga de ahí y el
  formulario le habla a esa misma zona, que por dentro consulta el gateway con
  un usuario de servicio.

  OJO, dos condiciones para que esto muestre algo:

    1. La zona /vod tiene que estar deployada con el widget. Al día de hoy
       responde, pero `widget.v1.js` todavía da 404: lo que está en producción
       es anterior.
    2. VOD_PROD tiene que ser un VOD que exista EN PRODUCCIÓN. El id de abajo
       salió de QA y en producción no existe; mientras sea ese, el formulario
       no se va a dibujar.

  Si falla, la consola dice por qué. No se muestra nada roto al visitante: si el
  widget no puede traer los campos, se esconde.

  Para probar contra el monorepo local, cambiar SRC por
  `http://localhost:4012/vod/widget.v1.js` y levantar `pnpm dev` en `apps/vod`.

  El fragmento es exactamente el que genera el panel de Froneus, con todos los
  atributos escritos aunque coincidan con el default: así es como le llega a un
  cliente, y así se documenta solo qué puede cambiar sin pedirnos nada.

  Cuando ande de verdad, el envío registra una llamada telefónica real.
*/
import type { Metadata } from "next";

/**
 * El VOD que se muestra. Va en una constante porque el id aparece dos veces
 * --en el id del div y en `data-vod`-- y el widget busca su contenedor por
 * `vod-<id>`: si se cambia uno solo, no monta y no avisa.
 */
const VOD = "6aac3ebe8e936edaa6295cb6";
const SRC = "https://clientes.froneus.com/vod/widget.v1.js";

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
        Dejanos tus datos y un asistente te llama en el momento. El formulario de
        abajo es el widget embebido, corriendo en este sitio como lo haría en el
        de cualquier cliente.
      </p>

      {/* Froneus Voice On Demand — inicio */}
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
      {/* Froneus Voice On Demand — fin */}
    </main>
  );
}

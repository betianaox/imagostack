import type { Metadata } from "next";
import Link from "next/link";
import { LegalHighlight, LegalPage } from "@/components/legal-page";
import { apps } from "@/lib/apps";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Eliminar mis datos",
  description: `Cómo borrar la información de las aplicaciones de ${site.name} desde tu dispositivo o solicitando su eliminación.`,
  alternates: { canonical: "/eliminar-datos" },
};

export default function DeleteDataPage() {
  return (
    <LegalPage
      kicker="Tus datos"
      title="Eliminar mis datos"
      intro="Esta página explica cómo borrar la información asociada a nuestras aplicaciones, tal como lo requiere la política de datos de usuario de Google Play."
      updatedAt={site.legalUpdatedAt}
    >
      <LegalHighlight>
        <p>
          <strong>Lo más importante:</strong> nuestras aplicaciones no requieren
          crear una cuenta y guardan la información en tu propio dispositivo. Eso
          significa que <strong>vos controlás el borrado</strong>: no hay una
          cuenta en nuestros servidores que haya que dar de baja.
        </p>
      </LegalHighlight>

      <h2>Opción 1 — Borrar desde la aplicación</h2>
      <p>
        Es la forma más precisa, porque te permite eliminar solo lo que querés
        eliminar:
      </p>
      <ul>
        <li>
          Abrí la app y entrá al listado correspondiente (por ejemplo, el
          historial o la lista de registros).
        </li>
        <li>
          Usá el icono de eliminar de cada elemento para borrarlo
          individualmente.
        </li>
        <li>
          Si querés empezar de cero, borrá todos los elementos del listado o usá
          la opción de restablecer, cuando la app la ofrezca.
        </li>
      </ul>

      <h2>Opción 2 — Borrar los datos desde Android</h2>
      <p>
        Elimina de una sola vez todo lo que la aplicación tenga guardado en el
        dispositivo, sin desinstalarla:
      </p>
      <ol>
        <li>
          Abrí <em>Ajustes</em> en tu teléfono.
        </li>
        <li>
          Entrá a <em>Aplicaciones</em> y elegí la app.
        </li>
        <li>
          Tocá <em>Almacenamiento</em>.
        </li>
        <li>
          Tocá <em>Borrar datos</em> (o <em>Borrar almacenamiento</em>) y
          confirmá.
        </li>
      </ol>
      <p>
        El nombre exacto de cada opción puede variar según el fabricante y la
        versión de Android.
      </p>

      <h2>Opción 3 — Desinstalar la aplicación</h2>
      <p>
        Al desinstalar, Android elimina el almacenamiento privado de la app junto
        con ella. Tené en cuenta que{" "}
        <strong>esta acción no se puede deshacer</strong>: si querés conservar tu
        información, exportala antes desde la app.
      </p>

      <h2>Copias de seguridad del sistema</h2>
      <p>
        Si tenés activada la copia de seguridad de Google, el sistema operativo
        puede haber respaldado los datos de la app en tu cuenta de Google. Ese
        respaldo lo administra Google, no {site.legalName}, y podés gestionarlo
        desde <em>Ajustes → Google → Copia de seguridad</em>.
      </p>

      <h2>Solicitar la eliminación por escrito</h2>
      <p>
        Si aun así preferís que gestionemos nosotros un pedido de eliminación, o
        si mantuvimos correspondencia por correo y querés que borremos ese
        intercambio, escribinos a{" "}
        <a href={`mailto:${site.email.support}`}>{site.email.support}</a> desde la
        dirección involucrada, indicando:
      </p>
      <ul>
        <li>El nombre de la aplicación.</li>
        <li>Qué información querés eliminar.</li>
      </ul>
      <p>
        Confirmamos la recepción y resolvemos el pedido en un plazo máximo de 30
        días corridos. No cobramos por este trámite.
      </p>

      <h2>Qué conservamos y por cuánto tiempo</h2>
      <p>
        No mantenemos bases de datos de usuarios de nuestras aplicaciones. Cuando
        nos escribís, conservamos el intercambio de correos solo mientras sea útil
        para dar seguimiento a tu consulta, y luego lo eliminamos. Si una
        obligación legal, contable o de defensa de derechos nos exige retener
        algún dato, lo conservamos únicamente por el plazo que esa obligación
        imponga.
      </p>

      <h2>Detalle por aplicación</h2>
      <p>
        Cada app describe exactamente qué información maneja en su propia
        política:
      </p>
      <ul>
        {apps.map((app) => (
          <li key={app.slug}>
            <Link href={`/apps/${app.slug}/privacidad`}>
              Política de privacidad de {app.name}
            </Link>
          </li>
        ))}
      </ul>
      <p>
        Ver también nuestra{" "}
        <Link href="/privacidad">política de privacidad general</Link>.
      </p>
    </LegalPage>
  );
}

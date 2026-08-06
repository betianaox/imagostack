import type { Metadata } from "next";
import Link from "next/link";
import { LegalHighlight, LegalPage } from "@/components/legal-page";
import { apps } from "@/lib/apps";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Cómo trata ${site.name} los datos personales en su sitio web y en sus aplicaciones.`,
  alternates: { canonical: "/privacidad" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      kicker="Legales"
      title="Política de privacidad"
      intro={`Qué datos maneja ${site.name}, para qué los usa y qué control tenés sobre ellos.`}
      updatedAt={site.legalUpdatedAt}
    >
      <LegalHighlight>
        <p>
          <strong>En resumen:</strong> este sitio no usa cookies de seguimiento
          ni sistemas de analítica. Nuestras apps guardan la información que
          cargás en tu propio dispositivo. No vendemos datos y no compartimos
          información con terceros para publicidad.
        </p>
      </LegalHighlight>

      <p>
        Esta política aplica al sitio <strong>{site.domain}</strong> y, de forma
        general, a las aplicaciones publicadas por {site.legalName}. Cada app
        tiene además su propia política específica, que es la que rige en caso de
        diferencia:
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

      <h2>1. Responsable del tratamiento</h2>
      <p>
        <strong>{site.legalName}</strong>, con domicilio en {site.jurisdiction},
        es responsable del tratamiento de los datos descritos en esta política.
        Contacto:{" "}
        <a href={`mailto:${site.email.support}`}>{site.email.support}</a>.
      </p>

      <h2>2. Datos que tratamos en este sitio</h2>
      <h3>Navegación</h3>
      <p>
        {site.domain} es un sitio estático. No usamos cookies propias de
        seguimiento, ni píxeles publicitarios, ni herramientas de analítica que
        elaboren perfiles. Nuestro proveedor de hosting puede registrar de forma
        automática datos técnicos —dirección IP, tipo de navegador, fecha y hora
        del pedido— en sus registros de servidor, con la única finalidad de
        operar el servicio y prevenir abusos.
      </p>

      <h3>Correo electrónico</h3>
      <p>
        Si nos escribís, tratamos tu dirección de correo y el contenido del
        mensaje con el único fin de responderte. Conservamos esa correspondencia
        el tiempo necesario para dar seguimiento a tu consulta y luego la
        eliminamos.
      </p>

      <h2>3. Datos que tratan nuestras aplicaciones</h2>
      <p>
        Nuestras apps están construidas para funcionar sin necesidad de que
        tengamos tus datos: no requieren crear una cuenta y la información que
        cargás se guarda en el almacenamiento privado de tu dispositivo. Para el
        detalle de cada una, consultá su política específica en la lista de
        arriba.
      </p>

      <h2>4. Finalidad y base legal</h2>
      <p>
        Tratamos datos únicamente para: (a) responder tus consultas, sobre la
        base de tu consentimiento; (b) mantener el sitio y las apps operativos y
        seguros, sobre la base de nuestro interés legítimo; y (c) cumplir
        obligaciones legales cuando corresponda.
      </p>

      <h2>5. Terceros y transferencias</h2>
      <p>
        No vendemos, alquilamos ni cedemos datos personales. Utilizamos
        proveedores de infraestructura para alojar este sitio y de correo para
        gestionar nuestras casillas, que actúan como encargados del tratamiento y
        pueden operar servidores fuera de {site.jurisdiction}. Las apps se
        distribuyen a través de Google Play: la descarga, el pago (cuando
        corresponde) y las métricas agregadas de la tienda las gestiona Google
        LLC según su propia política de privacidad.
      </p>

      <h2>6. Conservación</h2>
      <p>
        Conservamos los datos solo mientras exista una finalidad que lo
        justifique. Los datos que viven en tu dispositivo los controlás vos y se
        eliminan al borrarlos desde la app o al desinstalarla.
      </p>

      <h2>7. Tus derechos</h2>
      <p>
        Podés solicitar acceso, rectificación, actualización, supresión,
        portabilidad o limitación del tratamiento de tus datos, y oponerte a él,
        escribiendo a{" "}
        <a href={`mailto:${site.email.support}`}>{site.email.support}</a>.
        Respondemos dentro de los plazos legales aplicables.
      </p>
      <p>
        En {site.jurisdiction}, la Agencia de Acceso a la Información Pública es
        el órgano de control de la Ley 25.326 y tiene la atribución de atender
        denuncias por incumplimientos.
      </p>

      <h2>8. Menores de edad</h2>
      <p>
        Ni este sitio ni nuestras apps están dirigidos a menores de 13 años, y no
        recolectamos sus datos de forma consciente.
      </p>

      <h2>9. Seguridad</h2>
      <p>
        El sitio se sirve íntegramente sobre HTTPS. Aplicamos medidas técnicas y
        organizativas razonables para proteger la información, empezando por la
        más efectiva: recolectar lo mínimo indispensable.
      </p>

      <h2>10. Cambios</h2>
      <p>
        Publicamos cualquier actualización en esta misma dirección, con su fecha
        de vigencia en el encabezado.
      </p>

      <h2>11. Contacto</h2>
      <p>
        {site.legalName} — {site.jurisdiction}
        <br />
        Soporte y privacidad:{" "}
        <a href={`mailto:${site.email.support}`}>{site.email.support}</a>
        <br />
        Consultas generales:{" "}
        <a href={`mailto:${site.email.general}`}>{site.email.general}</a>
      </p>
    </LegalPage>
  );
}

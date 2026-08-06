import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalHighlight, LegalPage } from "@/components/legal-page";
import { apps, getApp } from "@/lib/apps";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/apps/[slug]/privacidad">): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return {};

  return {
    title: `Política de privacidad de ${app.name}`,
    description: `Cómo trata ${app.name} tus datos: qué información maneja, dónde se guarda y cómo podés borrarla.`,
    alternates: { canonical: `/apps/${app.slug}/privacidad` },
  };
}

export default async function AppPrivacyPage({
  params,
}: PageProps<"/apps/[slug]/privacidad">) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  const { privacy } = app;
  const collectsNothing = privacy.collects.length === 0;

  return (
    <LegalPage
      kicker={app.name}
      title={`Política de privacidad de ${app.name}`}
      intro={`Esta política explica qué datos maneja ${app.name}, para qué los usa y qué control tenés sobre ellos.`}
      updatedAt={privacy.updatedAt}
      backHref={`/apps/${app.slug}`}
      backLabel={`Volver a ${app.name}`}
    >
      <LegalHighlight>
        <p>
          <strong>En resumen:</strong>{" "}
          {collectsNothing
            ? `${app.name} no recolecta datos personales.`
            : privacy.processedOnDevice
              ? `${app.name} guarda la información que cargás únicamente en tu dispositivo. No tenemos servidores con tus datos, no hace falta crear una cuenta y no vendemos ni compartimos información con terceros.`
              : `${app.name} maneja los datos detallados más abajo, con la única finalidad de que la app funcione.`}
          {privacy.showsAds
            ? " La app muestra publicidad."
            : " La app no muestra publicidad."}
          {privacy.hasInAppPurchases
            ? " Incluye compras dentro de la aplicación."
            : " No incluye compras dentro de la aplicación."}
        </p>
      </LegalHighlight>

      <h2>1. Quiénes somos</h2>
      <p>
        {app.name} es una aplicación desarrollada y publicada por{" "}
        <strong>{site.legalName}</strong> (“nosotros”). Para cualquier consulta
        sobre privacidad podés escribirnos a{" "}
        <a href={`mailto:${site.email.support}`}>{site.email.support}</a>.
      </p>

      <h2>2. Qué datos maneja la aplicación</h2>
      {collectsNothing ? (
        <p>
          {app.name} <strong>no recolecta ningún dato personal</strong>. No pide
          registro, no accede a tus contactos, a tu ubicación ni a tus archivos,
          y no genera identificadores para seguirte.
        </p>
      ) : (
        <>
          <p>
            La app maneja solamente la información que vos cargás para que
            funcione. En detalle:
          </p>
          <ul>
            {privacy.collects.map((item) => (
              <li key={item.type}>
                <strong>{item.type}.</strong> {item.purpose} Se almacena en{" "}
                {item.storage === "dispositivo"
                  ? "tu propio dispositivo"
                  : "nuestros servidores"}
                .
              </li>
            ))}
          </ul>
          <p>
            No recolectamos tu nombre, tu correo, tu ubicación, tu agenda de
            contactos ni identificadores publicitarios. Tampoco creamos perfiles
            de usuario ni hacemos seguimiento entre aplicaciones.
          </p>
        </>
      )}

      <h2>3. Dónde se guardan tus datos</h2>
      {privacy.processedOnDevice ? (
        <p>
          Toda la información se procesa y se guarda{" "}
          <strong>localmente en tu dispositivo</strong>, dentro del
          almacenamiento privado de la aplicación. No se transmite a nuestros
          servidores porque, para el funcionamiento de {app.name}, no
          necesitamos tenerla.
        </p>
      ) : (
        <p>
          Parte de la información se procesa en servidores propios o de
          proveedores de infraestructura contratados por {site.legalName}, con
          medidas de seguridad acordes al tipo de dato.
        </p>
      )}
      <p>
        Si hacés una copia de seguridad de tu teléfono, el sistema operativo
        puede incluir los datos de la app en ese respaldo. Ese respaldo lo
        gestiona Google o el fabricante de tu dispositivo según sus propias
        políticas, no {site.legalName}.
      </p>

      <h2>4. Permisos que solicita la app</h2>
      {privacy.permissions.length === 0 ? (
        <p>
          {app.name} no solicita permisos sensibles de Android: ni cámara, ni
          micrófono, ni ubicación, ni contactos, ni almacenamiento externo.
        </p>
      ) : (
        <>
          <p>
            Solo pedimos los permisos estrictamente necesarios, y siempre
            explicando para qué:
          </p>
          <ul>
            {privacy.permissions.map((permission) => (
              <li key={permission.name}>
                <strong>{permission.name}.</strong> {permission.reason}
              </li>
            ))}
          </ul>
        </>
      )}

      <h2>5. Compartir información con terceros</h2>
      {privacy.thirdParties.length === 0 ? (
        <p>
          <strong>
            No compartimos, vendemos, alquilamos ni cedemos información a
            terceros.
          </strong>{" "}
          {app.name} no integra SDK de publicidad, de analítica ni de redes
          sociales.
        </p>
      ) : (
        <>
          <p>
            Para que algunas funciones existan, la app usa los siguientes
            servicios de terceros, que pueden tratar datos según sus propias
            políticas:
          </p>
          <ul>
            {privacy.thirdParties.map((party) => (
              <li key={party.name}>
                <strong>{party.name}.</strong> {party.purpose}{" "}
                <a href={party.policyUrl} target="_blank" rel="noreferrer">
                  Ver su política de privacidad
                </a>
                .
              </li>
            ))}
          </ul>
        </>
      )}
      <p>
        Podemos divulgar información únicamente si nos lo exige una autoridad
        competente mediante una orden legal válida.
      </p>

      <h2>6. Contenido que compartís vos</h2>
      <p>
        Si usás una función de la app para compartir contenido (por ejemplo,
        enviar una imagen o un resumen por mensajería), ese envío lo realizás vos
        mediante la aplicación que elijas. {site.legalName} no interviene en ese
        contenido ni conserva una copia.
      </p>

      <h2>7. Menores de edad</h2>
      {privacy.directedToChildren ? (
        <p>
          {app.name} está diseñada para el público infantil y cumple con la{" "}
          <em>Families Policy</em> de Google Play.
        </p>
      ) : (
        <p>
          {app.name} <strong>no está dirigida a menores de 13 años</strong> y no
          recolecta datos de menores de forma consciente.
          {privacy.minAge
            ? ` Por el tipo de contenido, recomendamos su uso a partir de los ${privacy.minAge} años.`
            : ""}{" "}
          Si creés que un menor nos entregó información, escribinos a{" "}
          <a href={`mailto:${site.email.support}`}>{site.email.support}</a> y la
          eliminamos.
        </p>
      )}

      <h2>8. Cómo borrar tus datos</h2>
      {privacy.processedOnDevice ? (
        <ul>
          <li>
            Desde la app podés borrar registros individuales o vaciar tu
            historial cuando quieras.
          </li>
          <li>
            Si desinstalás {app.name}, Android elimina los datos locales de la
            aplicación junto con ella.
          </li>
          <li>
            También podés hacerlo desde{" "}
            <em>Ajustes → Aplicaciones → {app.name} → Almacenamiento → Borrar datos</em>
            .
          </li>
        </ul>
      ) : (
        <p>
          Podés solicitar la eliminación de tus datos escribiéndonos a{" "}
          <a href={`mailto:${site.email.support}`}>{site.email.support}</a>.
          Procesamos el pedido dentro de los 30 días.
        </p>
      )}
      <p>
        Más detalles en la página de{" "}
        <a href="/eliminar-datos">eliminación de datos</a>.
      </p>

      <h2>9. Tus derechos</h2>
      <p>
        Según la normativa que te aplique (entre otras, la Ley 25.326 de
        Protección de Datos Personales de {site.jurisdiction} y el RGPD europeo),
        tenés derecho a acceder a tus datos, rectificarlos, suprimirlos,
        limitarlos u oponerte a su tratamiento.{" "}
        {privacy.processedOnDevice
          ? `Como los datos de ${app.name} viven en tu dispositivo, esos derechos los ejercés directamente desde la app; de todos modos, estamos a disposición para ayudarte.`
          : "Escribinos para ejercerlos."}
      </p>

      <h2>10. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas razonables para proteger la información,
        incluido el uso del almacenamiento privado del sistema operativo. Ningún
        método es infalible, pero minimizamos el riesgo con la estrategia más
        simple: no acumular datos que no necesitamos.
      </p>

      <h2>11. Cambios en esta política</h2>
      <p>
        Si actualizamos esta política, publicamos la nueva versión en esta misma
        dirección y cambiamos la fecha del encabezado. Si el cambio es
        significativo, lo avisamos dentro de la app.
      </p>

      <h2>12. Contacto</h2>
      <p>
        {site.legalName} — {site.jurisdiction}
        <br />
        Soporte y privacidad:{" "}
        <a href={`mailto:${site.email.support}`}>{site.email.support}</a>
      </p>
    </LegalPage>
  );
}

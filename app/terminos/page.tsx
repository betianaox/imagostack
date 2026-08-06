import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos de uso",
  description: `Condiciones de uso del sitio y de las aplicaciones de ${site.name}.`,
  alternates: { canonical: "/terminos" },
};

export default function TermsPage() {
  return (
    <LegalPage
      kicker="Legales"
      title="Términos de uso"
      intro={`Las condiciones bajo las que ponemos a disposición el sitio ${site.domain} y nuestras aplicaciones.`}
      updatedAt={site.legalUpdatedAt}
    >
      <h2>1. Aceptación</h2>
      <p>
        Al descargar, instalar o usar cualquiera de las aplicaciones de{" "}
        <strong>{site.legalName}</strong>, o al utilizar este sitio, aceptás estos
        términos. Si no estás de acuerdo, no uses el servicio.
      </p>

      <h2>2. Licencia de uso</h2>
      <p>
        Te otorgamos una licencia personal, limitada, revocable, no exclusiva y no
        transferible para instalar y usar nuestras aplicaciones en dispositivos
        que controlés, con fines personales y no comerciales. La licencia no
        implica transferencia de propiedad.
      </p>
      <p>No está permitido:</p>
      <ul>
        <li>
          Copiar, modificar, traducir o crear obras derivadas de la aplicación.
        </li>
        <li>
          Aplicar ingeniería inversa, descompilar o desensamblar el software,
          salvo en la medida en que la ley lo permita expresamente.
        </li>
        <li>
          Redistribuir, revender, sublicenciar o publicar la aplicación en otras
          tiendas o repositorios.
        </li>
        <li>
          Eliminar o alterar avisos de autoría, marcas o notas de propiedad
          intelectual.
        </li>
        <li>
          Usar la aplicación para actividades ilegales o que vulneren derechos de
          terceros.
        </li>
      </ul>

      <h2>3. Distribución a través de Google Play</h2>
      <p>
        Nuestras aplicaciones se distribuyen mediante Google Play. La descarga,
        actualización y —cuando corresponda— el cobro se rigen también por los
        términos de Google. Las devoluciones de compras realizadas en la tienda se
        gestionan según la política de reembolsos de Google Play.
      </p>

      <h2>4. Contenido y responsabilidad del usuario</h2>
      <p>
        La información que cargás en nuestras apps es tuya y sos responsable de
        ella, incluido el respaldo. Cuando los datos se almacenan únicamente en tu
        dispositivo, no tenemos forma de recuperarlos si los borrás, si perdés el
        teléfono o si desinstalás la aplicación.
      </p>

      <h2>5. Contenido de entretenimiento</h2>
      <p>
        Algunas de nuestras aplicaciones ofrecen contenido de carácter simbólico,
        recreativo o de entretenimiento —por ejemplo, lecturas de oráculos— y
        están destinadas a la reflexión y el esparcimiento. Ese contenido{" "}
        <strong>
          no constituye asesoramiento profesional de ningún tipo
        </strong>{" "}
        (médico, psicológico, legal, financiero ni de otra índole) y no debe
        usarse como base para tomar decisiones que requieran la opinión de un
        profesional matriculado. Las estadísticas y métricas que generan nuestras
        apps deportivas dependen de la información que cargue quien las usa y no
        pretenden ser un registro oficial.
      </p>

      <h2>6. Disponibilidad y cambios</h2>
      <p>
        Trabajamos para que todo funcione, pero el servicio se ofrece “tal como
        está”. Podemos actualizar, modificar, suspender o discontinuar
        funcionalidades o aplicaciones enteras. Cuando el cambio sea relevante,
        vamos a intentar avisar con antelación razonable.
      </p>

      <h2>7. Garantías</h2>
      <p>
        En la máxima medida permitida por la ley, las aplicaciones se
        proporcionan sin garantías de ningún tipo, expresas o implícitas, incluidas
        las de comerciabilidad, adecuación a un fin determinado o funcionamiento
        ininterrumpido y libre de errores. Nada de lo aquí dispuesto limita los
        derechos que te correspondan como consumidor conforme a la normativa
        aplicable, incluida la Ley 24.240 de Defensa del Consumidor de{" "}
        {site.jurisdiction}.
      </p>

      <h2>8. Limitación de responsabilidad</h2>
      <p>
        En la máxima medida permitida por la ley, {site.legalName} no será
        responsable por daños indirectos, incidentales, especiales o
        consecuentes, ni por pérdida de datos, de oportunidades o de beneficios,
        derivados del uso o de la imposibilidad de uso de las aplicaciones.
      </p>

      <h2>9. Propiedad intelectual</h2>
      <p>
        El software, los diseños, las ilustraciones, los textos, la marca{" "}
        {site.name} y los nombres de nuestras aplicaciones son de titularidad de{" "}
        {site.legalName} o de sus licenciantes, y están protegidos por las leyes
        de propiedad intelectual. Google Play y el logo de Google Play son marcas
        registradas de Google LLC.
      </p>

      <h2>10. Terminación</h2>
      <p>
        Podés dejar de usar el servicio en cualquier momento desinstalando la
        aplicación. Podemos suspender la licencia si incumplís estos términos.
      </p>

      <h2>11. Ley aplicable y jurisdicción</h2>
      <p>
        Estos términos se rigen por las leyes de {site.jurisdiction}. Cualquier
        controversia se someterá a los tribunales competentes de esa jurisdicción,
        sin perjuicio de las normas de protección al consumidor que resulten
        aplicables en tu lugar de residencia.
      </p>

      <h2>12. Contacto</h2>
      <p>
        Cualquier duda sobre estos términos:{" "}
        <a href={`mailto:${site.email.general}`}>{site.email.general}</a>.
      </p>
    </LegalPage>
  );
}

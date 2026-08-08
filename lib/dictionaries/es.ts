import type { Block } from "@/components/rich-text";
import type { IconName } from "@/components/icons";

/**
 * Diccionario base. Define la forma que deben cumplir `en.ts` y `pt.ts`:
 * si aquí se agrega una clave, TypeScript va a exigirla en los otros idiomas.
 */
export const es = {
  nav: {
    apps: "Apps",
    about: "Nosotros",
    support: "Soporte",
    contact: "Contacto",
    home: "Inicio",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    skipToContent: "Saltar al contenido",
    languageLabel: "Idioma",
    homeAria: "ImagoStack — inicio",
  },

  footer: {
    pitch:
      "Apps móviles que se sienten bien de usar. Diseñamos, desarrollamos y mantenemos nuestras propias apps para Android, de la idea a la Play Store.",
    apps: "Apps",
    allApps: "Ver todas",
    company: "Compañía",
    legal: "Legales",
    privacy: "Privacidad",
    terms: "Términos de uso",
    deleteData: "Eliminar mis datos",
    rights: "Todos los derechos reservados.",
    trademark:
      "Google Play y el logo de Google Play son marcas registradas de Google LLC.",
  },

  home: {
    badge: "Apps propias para Android",
    intro:
      "Somos ImagoStack: pensamos, diseñamos, desarrollamos, publicamos y mantenemos nuestras propias aplicaciones para Android. Todo el ciclo, toda la pila — sin intermediarios.",
    seeApps: "Ver nuestras apps",
    howWeWork: "Así trabajamos",
    appsKicker: "Nuestras apps",
    appsTitle: "Calidad profesional, sin excepciones",
    appsLink: "Ver el catálogo completo",
    ideaTitle: "¿Tienes una idea?",
    ideaText:
      "Si hay un problema que te gustaría resolver con una app, queremos escucharlo.",
    ideaLink: "Cuéntanos tu idea →",
    aboutKicker: "Nosotros",
    aboutTitle: "Materializamos ideas",
    contactKicker: "Hablemos",
    contactTitle: "¿Tienes una idea, consulta o encontraste un error?",
    contactText:
      "Escríbenos y te respondemos en menos de 48 horas hábiles. Si es sobre alguna de nuestras apps, cuéntanos el modelo de tu teléfono y la versión de Android para poder ayudarte más rápido.",
    supportCenter: "Centro de soporte",
    pillars: [
      {
        icon: "palette",
        title: "Diseño primero",
        description:
          "Cada pantalla se prototipa y se prueba antes de escribirse una línea de código. Si una función no se entiende sola, todavía no está lista.",
      },
      {
        icon: "bolt",
        title: "Rápidas de verdad",
        description:
          "Apps livianas, que arrancan al instante y no se comen la batería ni los datos del teléfono.",
      },
      {
        icon: "shield",
        title: "Privacidad como default",
        description:
          "Recolectamos lo mínimo indispensable, lo declaramos con claridad y nunca vendemos información de nuestros usuarios.",
      },
      {
        icon: "users",
        title: "Soporte real",
        description:
          "Del otro lado del mail hay personas. Respondemos todas las consultas en menos de 48 horas hábiles.",
      },
    ] as { icon: IconName; title: string; description: string }[],
    steps: [
      {
        title: "Idea y validación",
        description:
          "Definimos el problema concreto que resuelve la app y descartamos todo lo que no aporte a eso.",
      },
      {
        title: "Diseño y prototipo",
        description:
          "Armamos el flujo completo en prototipos navegables para probarlo con usuarios reales.",
      },
      {
        title: "Desarrollo",
        description:
          "Construimos con foco en performance, accesibilidad y compatibilidad con la mayor cantidad de dispositivos.",
      },
      {
        title: "Publicación y mejora",
        description:
          "Publicamos en Google Play y seguimos iterando con las métricas y el feedback de la comunidad.",
      },
    ],
  },

  services: {
    kicker: "También hacemos",
    title: "Desarrollo web de punta a punta",
    intro:
      "La misma forma de trabajar que aplicamos a nuestras apps la ponemos a disposición de otros proyectos: productos web completos, con backend, admin, datos y capa de inteligencia.",
    cards: [
      {
        icon: "code",
        title: "Aplicaciones web a medida",
        description:
          "Sitio y backend en un mismo proyecto, con React y TypeScript. Rápidos, accesibles y listos para escalar desde el primer día.",
      },
      {
        icon: "layout",
        title: "Panel a medida",
        description:
          "Para que administres tu negocio sin depender de nadie: cargar productos, precios, turnos o contenido, con permisos por usuario.",
      },
      {
        icon: "database",
        title: "Datos, cuentas y archivos",
        description:
          "Bases de datos en tiempo real, registro e inicio de sesión, y almacenamiento de archivos en la nube.",
      },
      {
        icon: "chat",
        title: "Chatbot con inteligencia artificial",
        description:
          "Conectado a la información real de tu negocio, no respuestas genéricas. Atiende consultas a toda hora y deriva a una persona cuando hace falta.",
        action: "chat",
      },
      {
        icon: "card",
        title: "Integración con Mercado Pago",
        description:
          "Cobra en tu sitio con la plataforma que tus clientes ya usan, con el estado de cada pago reflejado en tu panel.",
      },
      {
        icon: "message",
        title: "WhatsApp Business API",
        description:
          "El canal donde tus clientes ya están: avisos, confirmaciones y recordatorios automáticos desde tu sistema.",
      },
      {
        icon: "chart",
        title: "Google Analytics y medición",
        description:
          "Saber de dónde llega la gente, qué mira y qué la hace comprar. Configurado desde el primer día, no después.",
      },
      {
        icon: "link",
        title: "Integraciones y automatizaciones",
        description:
          "Correo, calendarios, APIs de terceros y todo lo que haya que conectar para que el producto funcione solo.",
      },
    ] as {
      icon: IconName;
      title: string;
      description: string;
      action?: "chat";
    }[],
    /** Enlace especial de la ficha del chatbot: abre el widget */
    chatCta: "Pruébalo aquí",
    stackLabel: "Con qué trabajamos",
    stack: [
      "Next.js",
      "React",
      "React Native",
      "TypeScript",
      "Node.js",
      "Vercel",
      "Firebase",
      "MongoDB",
      "MySQL",
      "Redis",
      "RAG",
      "IA generativa",
    ],
    cta: "Cuéntanos tu proyecto",
  },

  appsPage: {
    kicker: "Catálogo",
    title: "Nuestras apps",
    /** {count} apps · {categories} categorías */
    subtitleMany: "{count} aplicaciones para Android, en {categories} categorías. Todas se descargan desde Google Play.",
    subtitleOne: "{count} aplicaciones para Android de {category}. Todas se descargan desde Google Play.",
  },

  appPage: {
    backToApps: "Todas las apps",
    screenshotsTitle: "Así se ve",
    screenshotsHint:
      "Elige una miniatura para recorrer las pantallas, o toca la captura grande para ampliarla.",
    aboutTitle: "Sobre {app}",
    privacyLink: "Política de privacidad",
    helpLink: "Necesito ayuda",
    downloadTitle: "Descarga {app}",
    downloadText: "Disponible para Android en Google Play.",
    otherApps: "Otras apps",
    availableIn: "Disponible en",
  },

  gallery: {
    zoom: "Ampliar: {alt}",
    thumb: "Ver captura {n} de {app}",
    previous: "Captura anterior",
    next: "Captura siguiente",
    close: "Cerrar",
  },

  support: {
    kicker: "Soporte",
    title: "Estamos del otro lado",
    intro:
      "Si algo no funciona, si te falta una función o si simplemente quieres contarnos algo, escríbenos. Respondemos en menos de 48 horas hábiles.",
    writeUs: "Escríbenos",
    formTitle: "Escríbenos",
    formIntro:
      "Completa el formulario y lo respondemos en menos de 48 horas hábiles. Cuanto más contexto nos des, más rápido lo resolvemos.",
    formTips: [
      "Cuéntanos qué esperabas que pasara y qué pasó en su lugar.",
      "Suma el modelo de tu teléfono y la versión de Android.",
      "Si puedes, adjunta una captura cuando respondas el correo.",
    ],
    perAppTitle: "Ayuda por aplicación",
    perAppText:
      "Cada app tiene su ficha y su política de privacidad propia. Si tu consulta es sobre una en particular, toca su acceso y el formulario queda listo con esa app elegida.",
    seeApp: "Ver la app",
    privacy: "Privacidad",
    writeAbout: "Escribir sobre {app}",
    faqTitle: "Preguntas frecuentes",
    faqFooter:
      "¿No estaba tu pregunta? [Escríbenos](mailto:{email}) y la resolvemos. También puedes revisar cómo [eliminar tus datos]({deleteDataUrl}).",
    faqs: [
      {
        question: "¿Cuánto tardan en responder?",
        answer:
          "Menos de 48 horas hábiles. Escribe una persona del equipo, no un bot ni una respuesta automática.",
      },
      {
        question: "Encontré un error, ¿qué información les sirve?",
        answer:
          "El nombre de la app, el modelo de tu teléfono, la versión de Android y, si puedes, una captura de pantalla y los pasos para reproducir el problema. Con eso solemos resolverlo en la primera respuesta.",
      },
      {
        question: "¿Puedo pasar mis datos a otro teléfono?",
        answer:
          "Depende de la app: las que guardan historial incluyen funciones de exportar e importar. Si no encontrás la opción, escríbenos y te guiamos.",
      },
      {
        question: "¿Cómo borro toda mi información?",
        answer:
          "Puedes hacerlo desde la propia app o desinstalándola, ya que los datos viven en tu dispositivo. El procedimiento completo está en la página de eliminación de datos.",
      },
      {
        question: "Tengo una idea para una app, ¿la leen?",
        answer:
          "Sí, y con gusto. Varias de las funciones que hoy existen salieron de mensajes de usuarios. Escríbenos contando el problema que te gustaría resolver.",
      },
      {
        question: "¿Cómo reporto un problema de facturación de Google Play?",
        answer:
          "Los cobros, reembolsos y suscripciones los administra Google Play. Para esos casos conviene usar el soporte de Google, aunque si nos escribes te ayudamos a encontrar el camino.",
      },
    ],
  },

  form: {
    name: "Tu nombre",
    namePlaceholder: "Cómo te llamas",
    email: "Tu correo",
    emailPlaceholder: "para poder responderte",
    about: "¿Sobre qué nos escribes?",
    general: "Consulta general",
    idea: "Tengo una idea para una app",
    message: "Tu mensaje",
    messagePlaceholder:
      "Si es un problema técnico, cuéntanos el modelo de tu teléfono y la versión de Android.",
    submit: "Enviar mensaje",
    sending: "Enviando…",
    sentTitle: "¡Mensaje enviado!",
    sentText:
      "Lo recibimos y te respondemos a tu correo en menos de 48 horas hábiles.",
    sendAnother: "Enviar otro mensaje",
    privacyNote:
      "Usamos tu nombre y tu correo únicamente para responderte. No los compartimos con nadie ni te sumamos a ninguna lista.",
    errorText:
      "No pudimos enviar el mensaje. Puede ser un problema momentáneo de conexión.",
    errorAction: "Escríbenos por correo",
    /** Etiquetas del mensaje de respaldo, cuando falla el envío */
    bodyName: "Nombre",
    bodyEmail: "Correo",
    bodyAbout: "Sobre",
  },

  chat: {
    /** Etiqueta accesible del botón flotante */
    open: "Abrir el chat",
    close: "Cerrar el chat",
    title: "Asistente de ImagoStack",
    subtitle: "Responde al instante",
    greeting:
      "¡Hola! Puedo contarte sobre nuestras apps o sobre el desarrollo web que hacemos. ¿Qué necesitas?",
    placeholder: "Escribe tu consulta…",
    send: "Enviar",
    thinking: "Escribiendo…",
    /** Sugerencias iniciales, para que no arranque en blanco */
    suggestions: [
      "¿Qué apps tienen?",
      "¿Hacen sitios a medida?",
      "¿Qué tecnologías usan?",
    ],
    /** Cuando el bot no puede responder: no se explica el motivo real */
    handoff:
      "No puedo responderte en este momento. Déjanos tu consulta en el formulario y te contestamos en menos de 48 horas hábiles.",
    handoffCta: "Ir al formulario",
    limited:
      "Demasiadas consultas seguidas. Espera un momento y vuelve a intentar.",
    /** Una persona tomó la conversación */
    operator: "A partir de ahora te atiende una persona del equipo.",
    disclaimer: "Asistente automático. Puede equivocarse.",
    retry: "Reintentar",
  },

  notFound: {
    code: "ERROR 404",
    title: "Esta pantalla no existe",
    text: "La página que buscabas se movió o nunca estuvo aquí. Prueba desde el inicio o mira el catálogo de apps.",
    home: "Ir al inicio",
    apps: "Ver las apps",
  },

  legal: {
    kicker: "Legales",
    updatedAt: "Última actualización:",
    back: "Volver",
    backToApp: "Volver a {app}",
    yourData: "Tus datos",
  },

  privacyPage: {
    title: "Política de privacidad",
    intro:
      "Qué datos maneja ImagoStack, para qué los usa y qué control tienes sobre ellos.",
    highlight:
      "**En resumen:** este sitio no usa cookies de seguimiento ni sistemas de analítica. Nuestras apps guardan la información que cargas en tu propio dispositivo. No vendemos datos y no compartimos información con terceros para publicidad.",
    perAppIntro:
      "Esta política aplica al sitio **{domain}** y, de forma general, a las aplicaciones publicadas por {company}. Cada app tiene además su propia política específica, que es la que rige en caso de diferencia:",
    perAppLink: "Política de privacidad de {app}",
    blocks: [
      { h2: "1. Responsable del tratamiento" },
      {
        p: "**{company}**, con domicilio en {jurisdiction}, es responsable del tratamiento de los datos descritos en esta política. Contacto: [{email}](mailto:{email}).",
      },
      { h2: "2. Datos que tratamos en este sitio" },
      { h3: "Navegación" },
      {
        p: "{domain} es un sitio estático. No usamos cookies propias de seguimiento, ni píxeles publicitarios, ni herramientas de analítica que elaboren perfiles. Nuestro proveedor de hosting puede registrar de forma automática datos técnicos —dirección IP, tipo de navegador, fecha y hora del pedido— en sus registros de servidor, con la única finalidad de operar el servicio y prevenir abusos.",
      },
      { h3: "Formulario de contacto" },
      {
        p: "Cuando enviás el formulario, tu nombre, tu correo y tu mensaje viajan a nuestro servidor y se despachan a nuestra casilla a través de **Resend**, el proveedor de envío de correo que utilizamos. **No guardamos ese contenido en ninguna base de datos**: llega a nuestro correo y ahí se trata como cualquier otro mensaje. Lo usamos únicamente para responderte, y puedes ver la [política de privacidad de Resend](https://resend.com/legal/privacy-policy).",
      },
      { h3: "Correo electrónico" },
      {
        p: "Si nos escribes, tratamos tu dirección de correo y el contenido del mensaje con el único fin de responderte. Conservamos esa correspondencia el tiempo necesario para dar seguimiento a tu consulta y luego la eliminamos.",
      },
      { h2: "3. Datos que tratan nuestras aplicaciones" },
      {
        p: "Nuestras apps están construidas para funcionar sin necesidad de que tengamos tus datos: no requieren crear una cuenta y la información que cargas se guarda en el almacenamiento privado de tu dispositivo. Para el detalle de cada una, consulta su política específica en la lista de arriba.",
      },
      { h2: "4. Finalidad y base legal" },
      {
        p: "Tratamos datos únicamente para: (a) responder tus consultas, sobre la base de tu consentimiento; (b) mantener el sitio y las apps operativos y seguros, sobre la base de nuestro interés legítimo; y (c) cumplir obligaciones legales cuando corresponda.",
      },
      { h2: "5. Terceros y transferencias" },
      {
        p: "No vendemos, alquilamos ni cedemos datos personales. Utilizamos proveedores de infraestructura para alojar este sitio, **Resend** para despachar los mensajes del formulario de contacto y un proveedor de correo para gestionar nuestras casillas. Todos actúan como encargados del tratamiento y pueden operar servidores fuera de {jurisdiction}. Las apps se distribuyen a través de Google Play: la descarga, el pago (cuando corresponde) y las métricas agregadas de la tienda las gestiona Google LLC según su propia política de privacidad.",
      },
      { h2: "6. Conservación" },
      {
        p: "Conservamos los datos solo mientras exista una finalidad que lo justifique. Los datos que viven en tu dispositivo los controlas tú y se eliminan al borrarlos desde la app o al desinstalarla.",
      },
      { h2: "7. Tus derechos" },
      {
        p: "Puedes solicitar acceso, rectificación, actualización, supresión, portabilidad o limitación del tratamiento de tus datos, y oponerte a él, escribiendo a [{email}](mailto:{email}). Respondemos dentro de los plazos legales aplicables.",
      },
      {
        p: "En {jurisdiction}, la Agencia de Acceso a la Información Pública es el órgano de control de la Ley 25.326 y tiene la atribución de atender denuncias por incumplimientos.",
      },
      { h2: "8. Menores de edad" },
      {
        p: "Ni este sitio ni nuestras apps están dirigidos a menores de 13 años, y no recolectamos sus datos de forma consciente.",
      },
      { h2: "9. Seguridad" },
      {
        p: "El sitio se sirve íntegramente sobre HTTPS. Aplicamos medidas técnicas y organizativas razonables para proteger la información, empezando por la más efectiva: recolectar lo mínimo indispensable.",
      },
      { h2: "10. Cambios" },
      {
        p: "Publicamos cualquier actualización en esta misma dirección, con su fecha de vigencia en el encabezado.",
      },
      { h2: "11. Contacto" },
      {
        p: "{company} — {jurisdiction}. Soporte y privacidad: [{email}](mailto:{email}). Consultas generales: [{generalEmail}](mailto:{generalEmail}).",
      },
    ] as Block[],
  },

  termsPage: {
    title: "Términos de uso",
    intro:
      "Las condiciones bajo las que ponemos a disposición el sitio {domain} y nuestras aplicaciones.",
    blocks: [
      { h2: "1. Aceptación" },
      {
        p: "Al descargar, instalar o usar cualquiera de las aplicaciones de **{company}**, o al utilizar este sitio, aceptás estos términos. Si no estás de acuerdo, no uses el servicio.",
      },
      { h2: "2. Licencia de uso" },
      {
        p: "Te otorgamos una licencia personal, limitada, revocable, no exclusiva y no transferible para instalar y usar nuestras aplicaciones en dispositivos que controlés, con fines personales y no comerciales. La licencia no implica transferencia de propiedad.",
      },
      { p: "No está permitido:" },
      {
        ul: [
          "Copiar, modificar, traducir o crear obras derivadas de la aplicación.",
          "Aplicar ingeniería inversa, descompilar o desensamblar el software, salvo en la medida en que la ley lo permita expresamente.",
          "Redistribuir, revender, sublicenciar o publicar la aplicación en otras tiendas o repositorios.",
          "Eliminar o alterar avisos de autoría, marcas o notas de propiedad intelectual.",
          "Usar la aplicación para actividades ilegales o que vulneren derechos de terceros.",
        ],
      },
      { h2: "3. Distribución a través de Google Play" },
      {
        p: "Nuestras aplicaciones se distribuyen mediante Google Play. La descarga, actualización y —cuando corresponda— el cobro se rigen también por los términos de Google. Las devoluciones de compras realizadas en la tienda se gestionan según la política de reembolsos de Google Play.",
      },
      { h2: "4. Contenido y responsabilidad del usuario" },
      {
        p: "La información que cargas en nuestras apps es tuya y eres responsable de ella, incluido el respaldo. Cuando los datos se almacenan únicamente en tu dispositivo, no tenemos forma de recuperarlos si los borras, si perdés el teléfono o si desinstalas la aplicación.",
      },
      { h2: "5. Contenido de entretenimiento" },
      {
        p: "Algunas de nuestras aplicaciones ofrecen contenido de carácter simbólico, recreativo o de entretenimiento —por ejemplo, lecturas de oráculos— y están destinadas a la reflexión y el esparcimiento. Ese contenido **no constituye asesoramiento profesional de ningún tipo** (médico, psicológico, legal, financiero ni de otra índole) y no debe usarse como base para tomar decisiones que requieran la opinión de un profesional matriculado. Las estadísticas y métricas que generan nuestras apps deportivas dependen de la información que cargue quien las usa y no pretenden ser un registro oficial.",
      },
      { h2: "6. Disponibilidad y cambios" },
      {
        p: "Trabajamos para que todo funcione, pero el servicio se ofrece “tal como está”. Podemos actualizar, modificar, suspender o discontinuar funcionalidades o aplicaciones enteras. Cuando el cambio sea relevante, vamos a intentar avisar con antelación razonable.",
      },
      { h2: "7. Garantías" },
      {
        p: "En la máxima medida permitida por la ley, las aplicaciones se proporcionan sin garantías de ningún tipo, expresas o implícitas, incluidas las de comerciabilidad, adecuación a un fin determinado o funcionamiento ininterrumpido y libre de errores. Nada de lo aquí dispuesto limita los derechos que te correspondan como consumidor conforme a la normativa aplicable, incluida la Ley 24.240 de Defensa del Consumidor de {jurisdiction}.",
      },
      { h2: "8. Limitación de responsabilidad" },
      {
        p: "En la máxima medida permitida por la ley, {company} no será responsable por daños indirectos, incidentales, especiales o consecuentes, ni por pérdida de datos, de oportunidades o de beneficios, derivados del uso o de la imposibilidad de uso de las aplicaciones.",
      },
      { h2: "9. Propiedad intelectual" },
      {
        p: "El software, los diseños, las ilustraciones, los textos, la marca ImagoStack y los nombres de nuestras aplicaciones son de titularidad de {company} o de sus licenciantes, y están protegidos por las leyes de propiedad intelectual. Google Play y el logo de Google Play son marcas registradas de Google LLC.",
      },
      { h2: "10. Terminación" },
      {
        p: "Puedes dejar de usar el servicio en cualquier momento desinstalando la aplicación. Podemos suspender la licencia si incumplís estos términos.",
      },
      { h2: "11. Ley aplicable y jurisdicción" },
      {
        p: "Estos términos se rigen por las leyes de {jurisdiction}. Cualquier controversia se someterá a los tribunales competentes de esa jurisdicción, sin perjuicio de las normas de protección al consumidor que resulten aplicables en tu lugar de residencia.",
      },
      { h2: "12. Contacto" },
      {
        p: "Cualquier duda sobre estos términos: [{generalEmail}](mailto:{generalEmail}).",
      },
    ] as Block[],
  },

  deleteDataPage: {
    title: "Eliminar mis datos",
    intro:
      "Esta página explica cómo borrar la información asociada a nuestras aplicaciones, tal como lo requiere la política de datos de usuario de Google Play.",
    highlight:
      "**Lo más importante:** nuestras aplicaciones no requieren crear una cuenta y guardan la información en tu propio dispositivo. Eso significa que **tú controlas el borrado**: no hay una cuenta en nuestros servidores que haya que dar de baja.",
    blocks: [
      { h2: "Opción 1 — Borrar desde la aplicación" },
      {
        p: "Es la forma más precisa, porque te permite eliminar solo lo que quieres eliminar:",
      },
      {
        ul: [
          "Abre la app y entrá al listado correspondiente (por ejemplo, el historial o la lista de registros).",
          "Usa el icono de eliminar de cada elemento para borrarlo individualmente.",
          "Si quieres empezar de cero, borrá todos los elementos del listado o usá la opción de restablecer, cuando la app la ofrezca.",
        ],
      },
      { h2: "Opción 2 — Borrar los datos desde Android" },
      {
        p: "Elimina de una sola vez todo lo que la aplicación tenga guardado en el dispositivo, sin desinstalarla:",
      },
      {
        ol: [
          "Abre _Ajustes_ en tu teléfono.",
          "Entra a _Aplicaciones_ y elige la app.",
          "Toca _Almacenamiento_.",
          "Toca _Borrar datos_ (o _Borrar almacenamiento_) y confirmá.",
        ],
      },
      {
        p: "El nombre exacto de cada opción puede variar según el fabricante y la versión de Android.",
      },
      { h2: "Opción 3 — Desinstalar la aplicación" },
      {
        p: "Al desinstalar, Android elimina el almacenamiento privado de la app junto con ella. Ten en cuenta que **esta acción no se puede deshacer**: si quieres conservar tu información, expórtala antes desde la app.",
      },
      { h2: "Copias de seguridad del sistema" },
      {
        p: "Si tienes activada la copia de seguridad de Google, el sistema operativo puede haber respaldado los datos de la app en tu cuenta de Google. Ese respaldo lo administra Google, no {company}, y puedes gestionarlo desde _Ajustes → Google → Copia de seguridad_.",
      },
      { h2: "Solicitar la eliminación por escrito" },
      {
        p: "Si aun así prefieres que gestionemos nosotros un pedido de eliminación, o si mantuvimos correspondencia por correo y quieres que borremos ese intercambio, escríbenos a [{email}](mailto:{email}) desde la dirección involucrada, indicando:",
      },
      {
        ul: [
          "El nombre de la aplicación.",
          "Qué información quieres eliminar.",
        ],
      },
      {
        p: "Confirmamos la recepción y resolvemos el pedido en un plazo máximo de 30 días corridos. No cobramos por este trámite.",
      },
      { h2: "Qué conservamos y por cuánto tiempo" },
      {
        p: "No mantenemos bases de datos de usuarios de nuestras aplicaciones. Cuando nos escribes, conservamos el intercambio de correos solo mientras sea útil para dar seguimiento a tu consulta, y luego lo eliminamos. Si una obligación legal, contable o de defensa de derechos nos exige retener algún dato, lo conservamos únicamente por el plazo que esa obligación imponga.",
      },
      { h2: "Detalle por aplicación" },
      {
        p: "Cada app describe exactamente qué información maneja en su propia política:",
      },
    ] as Block[],
    appLink: "Política de privacidad de {app}",
    seeAlso: "Ver también nuestra [política de privacidad general]({privacyUrl}).",
  },

  appPrivacy: {
    title: "Política de privacidad de {app}",
    intro:
      "Esta política explica qué datos maneja {app}, para qué los usa y qué control tienes sobre ellos.",
    summaryLead: "**En resumen:**",
    summaryNoData: "{app} no recolecta datos personales.",
    summaryOnDevice:
      "{app} guarda la información que cargas únicamente en tu dispositivo. No tenemos servidores con tus datos, no hace falta crear una cuenta y no vendemos ni compartimos información con terceros.",
    /** Variante cuando hay publicidad o algún servicio de terceros */
    summaryOnDeviceShared:
      "{app} guarda en tu dispositivo únicamente lo que se detalla más abajo, y no hace falta crear una cuenta. No tenemos servidores con tus datos ni vendemos información. Para mostrar los anuncios, el proveedor de publicidad puede tratar identificadores de tu dispositivo, como se explica en la sección 5.",
    summaryServer:
      "{app} maneja los datos detallados más abajo, con la única finalidad de que la app funcione.",
    adsYes: "La app muestra publicidad.",
    adsNo: "La app no muestra publicidad.",
    iapYes: "Incluye compras dentro de la aplicación.",
    iapNo: "No incluye compras dentro de la aplicación.",

    s1: "1. Quiénes somos",
    s1p: "{app} es una aplicación desarrollada y publicada por **{company}** (“nosotros”). Para cualquier consulta sobre privacidad puedes escribirnos a [{email}](mailto:{email}).",

    s2: "2. Qué datos maneja la aplicación",
    s2none:
      "{app} **no recolecta ningún dato personal**. No pide registro, no accede a tus contactos, a tu ubicación ni a tus archivos, y no genera identificadores para seguirte.",
    s2intro:
      "La app maneja solamente la información que tú cargas para que funcione. En detalle:",
    s2item: "**{type}.** {purpose} Se almacena en {storage}.",
    s2device: "tu propio dispositivo",
    s2server: "nuestros servidores",
    s2closing:
      "No recolectamos tu nombre, tu correo, tu ubicación, tu agenda de contactos ni identificadores publicitarios. Tampoco creamos perfiles de usuario ni hacemos seguimiento entre aplicaciones.",
    /** Variante cuando la app muestra publicidad */
    s2closingAds:
      "No recolectamos tu nombre, tu correo, tu ubicación ni tu agenda de contactos, y no creamos perfiles de usuario con esos datos. Los identificadores publicitarios los trata el proveedor de anuncios, no nosotros: el detalle está en la sección 5.",

    s3: "3. Dónde se guardan tus datos",
    s3device:
      "Toda la información se procesa y se guarda **localmente en tu dispositivo**, dentro del almacenamiento privado de la aplicación. No se transmite a nuestros servidores porque, para el funcionamiento de {app}, no necesitamos tenerla.",
    s3server:
      "Parte de la información se procesa en servidores propios o de proveedores de infraestructura contratados por {company}, con medidas de seguridad acordes al tipo de dato.",
    s3backup:
      "Si haces una copia de seguridad de tu teléfono, el sistema operativo puede incluir los datos de la app en ese respaldo. Ese respaldo lo gestiona Google o el fabricante de tu dispositivo según sus propias políticas, no {company}.",

    s4: "4. Permisos que solicita la app",
    s4none:
      "{app} no solicita permisos sensibles de Android: ni cámara, ni micrófono, ni ubicación, ni contactos, ni almacenamiento externo.",
    s4intro:
      "Solo pedimos los permisos estrictamente necesarios, y siempre explicando para qué:",
    s4item: "**{name}.** {reason}",

    s5: "5. Compartir información con terceros",
    s5none:
      "**No compartimos, vendemos, alquilamos ni cedemos información a terceros.** {app} no integra SDK de publicidad, de analítica ni de redes sociales.",
    s5intro:
      "Para que algunas funciones existan, la app usa los siguientes servicios de terceros, que pueden tratar datos según sus propias políticas:",
    /** Se antepone a la lista cuando la app muestra publicidad */
    s5ads:
      "{app} se financia con **anuncios en video con recompensa**: son opcionales y se muestran solo si eliges verlos a cambio de un beneficio dentro de la app. Nunca aparecen de forma automática ni interrumpen una lectura. Para servirlos usamos el siguiente proveedor, que puede tratar el identificador de publicidad de tu dispositivo y datos técnicos de la sesión según su propia política:",
    s5item: "**{name}.** {purpose} [Ver su política de privacidad]({url}).",
    s5legal:
      "Podemos divulgar información únicamente si nos lo exige una autoridad competente mediante una orden legal válida.",

    s6: "6. Contenido que compartís tú",
    s6p: "Si usas una función de la app para compartir contenido (por ejemplo, enviar una imagen o un resumen por mensajería), ese envío lo realizás tú mediante la aplicación que elijas. {company} no interviene en ese contenido ni conserva una copia.",

    s7: "7. Menores de edad",
    s7children:
      "{app} está diseñada para el público infantil y cumple con la _Families Policy_ de Google Play.",
    s7notChildren:
      "{app} **no está dirigida a menores de 13 años** y no recolecta datos de menores de forma consciente.",
    s7minAge:
      "Por el tipo de contenido, recomendamos su uso a partir de los {age} años.",
    s7report:
      "Si creés que un menor nos entregó información, escríbenos a [{email}](mailto:{email}) y la eliminamos.",

    s8: "8. Cómo borrar tus datos",
    s8device: [
      "Desde la app puedes borrar registros individuales o vaciar tu historial cuando quieras.",
      "Si desinstalas {app}, Android elimina los datos locales de la aplicación junto con ella.",
      "También puedes hacerlo desde _Ajustes → Aplicaciones → {app} → Almacenamiento → Borrar datos_.",
    ],
    s8server:
      "Puedes solicitar la eliminación de tus datos escribiéndonos a [{email}](mailto:{email}). Procesamos el pedido dentro de los 30 días.",
    s8more: "Más detalles en la página de [eliminación de datos]({deleteDataUrl}).",

    s9: "9. Tus derechos",
    s9p: "Según la normativa que te aplique (entre otras, la Ley 25.326 de Protección de Datos Personales de {jurisdiction} y el RGPD europeo), tienes derecho a acceder a tus datos, rectificarlos, suprimirlos, limitarlos u oponerte a su tratamiento.",
    s9device:
      "Como los datos de {app} viven en tu dispositivo, esos derechos los ejerces directamente desde la app; de todos modos, estamos a disposición para ayudarte.",
    s9server: "Escríbenos para ejercerlos.",

    s10: "10. Seguridad",
    s10p: "Aplicamos medidas técnicas razonables para proteger la información, incluido el uso del almacenamiento privado del sistema operativo. Ningún método es infalible, pero minimizamos el riesgo con la estrategia más simple: no acumular datos que no necesitamos.",

    s11: "11. Cambios en esta política",
    s11p: "Si actualizamos esta política, publicamos la nueva versión en esta misma dirección y cambiamos la fecha del encabezado. Si el cambio es significativo, lo avisamos dentro de la app.",

    s12: "12. Contacto",
    s12p: "{company} — {jurisdiction}. Soporte y privacidad: [{email}](mailto:{email}).",
  },

  meta: {
    homeTitle: "ImagoStack — Apps para Android | Full-cycle, full-stack",
    homeDescription:
      "ImagoStack diseña, desarrolla y publica aplicaciones móviles para Android de punta a punta. Descubre nuestras apps en Google Play.",
    ogHomeTitle: "ImagoStack — Apps para Android",
    appsTitle: "Nuestras apps para Android",
    appsDescription: "Todas las aplicaciones de ImagoStack para Android: {list}.",
    appsOgTitle: "Apps de ImagoStack para Android",
    appTitle: "{app} — app de {category} para Android",
    supportTitle: "Soporte y contacto",
    supportDescription:
      "Ayuda para las aplicaciones de ImagoStack: escríbenos por el formulario, mira las preguntas frecuentes y conocé nuestros tiempos de respuesta.",
    supportOgTitle: "Soporte de ImagoStack",
    privacyTitle: "Política de privacidad",
    privacyDescription:
      "Cómo trata ImagoStack los datos personales en su sitio web y en sus aplicaciones.",
    termsTitle: "Términos de uso",
    termsDescription:
      "Condiciones de uso del sitio y de las aplicaciones de ImagoStack.",
    deleteDataTitle: "Eliminar mis datos",
    deleteDataDescription:
      "Cómo borrar la información de las aplicaciones de ImagoStack desde tu dispositivo o solicitando su eliminación.",
    appPrivacyTitle: "Política de privacidad de {app}",
    appPrivacyDescription:
      "Cómo trata {app} tus datos: qué información maneja, dónde se guarda y cómo puedes borrarla.",
    keywords: [
      "ImagoStack",
      "apps para Android",
      "desarrollo de aplicaciones móviles",
      "Google Play",
      "estudio de apps",
      "Vigía pádel",
      "estadísticas de pádel",
      "app de oráculos",
      "tarot app",
    ],
  },

  og: {
    kicker: "ImagoStack",
    description:
      "Diseñamos, desarrollamos y publicamos nuestras propias aplicaciones para Android.",
  },
};

export type Dictionary = typeof es;

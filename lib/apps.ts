import type { IconName } from "@/components/icons";
import type { L10n } from "@/lib/i18n";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CATÁLOGO DE APPS
 * ─────────────────────────────────────────────────────────────────────────────
 * Única fuente de verdad de las apps. A partir de este array se generan solas,
 * en los tres idiomas:
 *
 *   • La grilla del home y de /apps
 *   • La ficha /apps/<slug> con su galería de capturas
 *   • La política de privacidad por app /apps/<slug>/privacidad
 *     (la URL que hay que pegar en la ficha de Google Play Console)
 *   • Las tarjetas sociales /apps/<slug>/og.png
 *   • El sitemap.xml
 *
 * AGREGAR UNA APP: copia un objeto, cambia el `slug` y completa los textos en
 * los cuatro idiomas. No hay que tocar ninguna otra parte del sitio.
 *
 * AGREGAR CAPTURAS: poné los archivos en public/apps/<slug>/ y listalos en
 * `screenshots`. La primera es la que se usa en las tarjetas.
 */

export type Screenshot = {
  /** Ruta pública, ej: "/apps/vigia/01.jpeg" */
  src: string;
  /** Descripción de la pantalla (accesibilidad + SEO) */
  alt: L10n<string>;
};

export type AppFeature = {
  icon: IconName;
  title: L10n<string>;
  description: L10n<string>;
};

/** Un tipo de dato que la app maneja, en los términos de Google Play. */
export type DataPoint = {
  type: L10n<string>;
  purpose: L10n<string>;
  /** Dónde vive el dato */
  storage: "dispositivo" | "servidor";
};

export type AppPermission = {
  /** Ej: "Notificaciones (android.permission.POST_NOTIFICATIONS)" */
  name: string;
  reason: L10n<string>;
};

export type AppPrivacy = {
  /** Última actualización de esta política (ISO: YYYY-MM-DD) */
  updatedAt: string;
  /** Datos que maneja la app. Array vacío = no maneja ninguno. */
  collects: DataPoint[];
  /** Permisos de Android que solicita, con su justificación. */
  permissions: AppPermission[];
  /** ¿Todo el procesamiento ocurre en el dispositivo? */
  processedOnDevice: boolean;
  /**
   * Nota propia de la app para la sección "Dónde se guardan tus datos". El
   * texto genérico de esa sección habla de infraestructura y no alcanza cuando
   * hay que explicar qué sale del dispositivo, hacia dónde y por qué. Si está,
   * se renderiza justo después de ese texto; si no, la sección queda igual que
   * siempre para el resto de las apps.
   */
  processingNote?: L10n<string>;
  thirdParties: { name: string; purpose: L10n<string>; policyUrl: string }[];
  /** ¿Está dirigida a menores de 13 años? (Families Policy de Google Play) */
  directedToChildren: boolean;
  showsAds: boolean;
  hasInAppPurchases: boolean;
  /** Edad mínima recomendada. null = para todo público. */
  minAge: number | null;
};

/** Un paso del recorrido de "Cómo funciona". */
export type AppStep = {
  title: L10n<string>;
  description: L10n<string>;
};

/**
 * Áreas de la ficha técnica, en el orden en que se muestran. Los nombres de
 * cada área se traducen en `appPage.techAreas` de los diccionarios.
 */
export const TECH_AREAS = [
  "app",
  "arquitectura",
  "nativo",
  "ia",
  "backend",
  "datos",
  "auth",
  "integraciones",
  "monetizacion",
  "entrega",
] as const;

export type TechArea = (typeof TECH_AREAS)[number];

/** Una pieza de la ficha técnica. */
export type AppTechItem = {
  /** Dónde se agrupa en la ficha. */
  area: TechArea;
  /**
   * Nombre de la pieza. Un nombre propio ("Firebase") va como texto y no se
   * traduce; uno descriptivo ("Realidad aumentada sin ARCore") va traducido.
   */
  name: string | L10n<string>;
  /** Qué hace en esta app. */
  role: L10n<string>;
};

export type AppFaq = {
  q: L10n<string>;
  a: L10n<string>;
};

/**
 * Secciones extra de la ficha, para productos que necesitan contarse más que
 * una app suelta (por ejemplo, para portfolio). Todas son opcionales: una app
 * que no las declara se ve exactamente igual que siempre.
 */
export type AppExtended = {
  /**
   * Para quién es esta app, cuando el producto tiene más de una cara. Se usa
   * como título de su bloque y de su botón de descarga: "Para comprar".
   */
  audience?: L10n<string>;
  /**
   * Slug de la app compañera: otra app del mismo producto (la versión para
   * comercios, por ejemplo). Se muestra DENTRO de esta ficha, con su propio
   * texto, funciones, capturas, descarga y política de privacidad. Lo normal es
   * que la compañera esté `oculta`, para no tener dos fichas del mismo producto.
   */
  companion?: string;
  /** Recorrido del producto en pasos. */
  howItWorks?: { intro?: L10n<string>; steps: AppStep[] };
  /**
   * Ficha técnica: qué tecnologías usa la app y para qué. Suma como portfolio,
   * así que conviene que TODAS las apps la tengan y que no quede nada afuera
   * (auth, backend, IA, servicios), siempre con lo que la app usa de verdad.
   */
  tech?: { intro: L10n<string>; items: AppTechItem[] };
  /** Preguntas frecuentes de la app. También se publican como FAQPage. */
  faq?: AppFaq[];
};

export type App = AppExtended & {
  slug: string;
  /**
   * No aparece en el catálogo, pero su política de privacidad SÍ existe.
   *
   * Google pide una URL de política por app para poder configurar el mensaje de
   * consentimiento de anuncios, y esa URL hace falta ANTES de publicar la app —
   * cuando todavía no hay ficha, ni capturas, ni nada que mostrar.
   *
   * Con esto la política vive en /apps/<slug>/privacidad y funciona, mientras la
   * app no se lista en ningún lado y su ficha devuelve 404. Cuando llegue el
   * momento se saca la marca y aparece entera.
   */
  oculta?: boolean;
  /**
   * El nombre SE TRADUCE, y la fuente de verdad es la app misma: lo que dice
   * su `app.nombre` en cada idioma es lo que tiene que decir el sitio. Oraculos
   * se llama "Oracles" en ingles, y hasta ahora la ficha en ingles decia
   * "Download Oraculos" — un nombre que quien la busca en Play no encuentra.
   *
   * Vigia no se traduce y lleva el mismo texto en los cuatro; eso no lo
   * convierte en un caso especial, solo en uno donde las cuatro coinciden.
   */
  name: L10n<string>;
  tagline: L10n<string>;
  /** Un párrafo; se usa también como meta description de la ficha */
  description: L10n<string>;
  /** Descripción larga: un string por párrafo */
  body: L10n<string[]>;
  /** Cierre corto, tipo claim */
  claim: L10n<string>;
  /** Categoría de Google Play */
  category: L10n<string>;
  /** URL de la ficha en Google Play. Vacío = todavía no publicada. */
  playStoreUrl: string;
  /** Icono cuadrado. Vacío = monograma con el degradado. */
  icon: string;
  /**
   * El gráfico de funciones de Google Play (1024×500), el banner de la ficha.
   *
   * Se usa tambien en la tarjeta de la app del sitio, en lugar de una captura
   * asomando sobre un degradado. Es la misma pieza que ve quien la encuentra en
   * Play, asi que el sitio y la tienda muestran lo mismo — y una imagen pensada
   * para leerse chica siempre le va a ganar a una captura recortada.
   *
   * Vacío = la tarjeta cae al degradado con la captura, como era antes.
   */
  feature: string;
  /** Par de colores del degradado de la app (hex) */
  accent: [string, string];
  /** Idiomas en los que está disponible la app (no los del sitio) */
  languages: L10n<string[]>;
  features: AppFeature[];
  screenshots: Screenshot[];
  privacy: AppPrivacy;
};

export const apps: App[] = [
  {
    slug: "floppy",
    name: { es: "Floppy", en: "Floppy", pt: "Floppy", it: "Floppy" },
    tagline: {
      es: "Habla, saca una foto o comparte: Floppy lo guarda y lo ordena solo.",
      en: "Speak, snap a photo or share: Floppy saves it and sorts it for you.",
      pt: "Fale, tire uma foto ou compartilhe: o Floppy guarda e organiza sozinho.",
      it: "Parla, scatta una foto o condividi: Floppy lo salva e lo ordina da solo.",
    },
    description: {
      es: "Floppy es el lugar donde guardar todo lo que hoy queda desordenado en el celular. Una nota de voz se convierte en tareas con fecha, la foto de un ticket en un gasto con su categoría, y un enlace compartido desde otra app en un guardado con resumen y etiquetas. Después se encuentra todo con un buscador que entiende lo que buscas.",
      en: "Floppy is the place for everything that ends up scattered on your phone. A voice note becomes dated tasks, a receipt photo becomes an expense with its category, and a link shared from another app becomes a saved item with a summary and tags. Then you find it all with a search that understands what you mean.",
      pt: "Floppy é o lugar para guardar tudo o que hoje fica bagunçado no celular. Uma nota de voz vira tarefas com data, a foto de um cupom vira um gasto com a sua categoria, e um link compartilhado de outro app vira um item salvo com resumo e etiquetas. Depois tudo se encontra com uma busca que entende o que você procura.",
      it: "Floppy è il posto dove salvare tutto quello che oggi resta in disordine sul telefono. Una nota vocale diventa attività con una data, la foto di uno scontrino una spesa con la sua categoria, e un link condiviso da un'altra app un elemento salvato con riassunto ed etichette. Poi si ritrova tutto con una ricerca che capisce cosa cerchi.",
    },
    body: {
      es: [
        "Floppy tiene una sola puerta de entrada: hablar, sacar una foto, escribir o compartir desde cualquier otra app. No hay que elegir dónde va cada cosa: la inteligencia artificial entiende qué es y lo manda a su lugar.",
        "Lo que hay que hacer va a la Agenda, con su fecha. Lo que gastaste va a Gastos, con el comercio, el total y la categoría, para ver mes a mes en qué se va la plata. Las notas, los enlaces y las fotos que te interesan van a Guardados, con un resumen y etiquetas automáticas.",
        "Un mismo audio puede dejar una tarea y un gasto a la vez, y una foto de un papel con anotaciones se convierte en una lista de pendientes. Para encontrar algo no hace falta recordar cómo lo guardaste: el buscador entiende frases como \"la receta que vi la semana pasada\".",
        "Floppy está en desarrollo.",
      ],
      en: [
        "Floppy has a single way in: speak, snap a photo, type or share from any other app. You don't choose where things go: AI understands what each one is and sends it to its place.",
        "Things to do go to the Agenda, with their date. What you spent goes to Expenses, with the merchant, the total and the category, so you can see month by month where the money goes. Notes, links and photos you care about go to Saved, with a summary and automatic tags.",
        "A single voice note can leave a task and an expense at once, and a photo of a handwritten note becomes a to-do list. To find something you don't need to remember how you saved it: search understands phrases like \"the recipe I saw last week\".",
        "Floppy is in development.",
      ],
      pt: [
        "O Floppy tem uma única porta de entrada: falar, tirar uma foto, escrever ou compartilhar de qualquer outro app. Não é preciso escolher onde vai cada coisa: a inteligência artificial entende o que é e manda para o seu lugar.",
        "O que é preciso fazer vai para a Agenda, com a sua data. O que você gastou vai para Gastos, com a loja, o total e a categoria, para ver mês a mês para onde vai o dinheiro. As notas, os links e as fotos que interessam vão para Salvos, com resumo e etiquetas automáticas.",
        "Um mesmo áudio pode deixar uma tarefa e um gasto ao mesmo tempo, e a foto de um papel com anotações vira uma lista de pendências. Para encontrar algo não é preciso lembrar como você salvou: a busca entende frases como \"a receita que vi na semana passada\".",
        "O Floppy está em desenvolvimento.",
      ],
      it: [
        "Floppy ha un'unica porta d'ingresso: parlare, scattare una foto, scrivere o condividere da qualsiasi altra app. Non bisogna scegliere dove va ogni cosa: l'intelligenza artificiale capisce cos'è e la manda al suo posto.",
        "Le cose da fare vanno nell'Agenda, con la loro data. Quello che hai speso va in Spese, con il negozio, il totale e la categoria, per vedere mese per mese dove vanno i soldi. Le note, i link e le foto che ti interessano vanno in Salvati, con un riassunto ed etichette automatiche.",
        "Uno stesso audio può lasciare un'attività e una spesa insieme, e la foto di un foglio con appunti diventa una lista di cose da fare. Per trovare qualcosa non serve ricordare come l'hai salvato: la ricerca capisce frasi come \"la ricetta che ho visto la settimana scorsa\".",
        "Floppy è in sviluppo.",
      ],
    },
    claim: {
      es: "Guardar, como siempre. Ordenar, nunca más.",
      en: "Save it, as always. Sort it, never again.",
      pt: "Guardar, como sempre. Organizar, nunca mais.",
      it: "Salvare, come sempre. Ordinare, mai più.",
    },
    category: { es: "Productividad", en: "Productivity", pt: "Produtividade", it: "Produttività" },
    // En desarrollo: el botón muestra "Muy pronto en Google Play".
    playStoreUrl: "",
    icon: "/apps/floppy/icon.png",
    feature: "/apps/floppy/feature.png",
    // El verde del logo y su versión oscura
    accent: ["#0f5c4c", "#1f957d"],
    languages: {
      es: ["Español", "Inglés", "Portugués"],
      en: ["Spanish", "English", "Portuguese"],
      pt: ["Espanhol", "Inglês", "Português"],
      it: ["Spagnolo", "Inglese", "Portoghese"],
    },
    features: [
      {
        icon: "sparkles",
        title: { es: "Una sola entrada", en: "One way in", pt: "Uma só entrada", it: "Un solo ingresso" },
        description: {
          es: "Voz, foto, texto o compartir desde otra app. La IA decide si es una tarea, un gasto o un guardado.",
          en: "Voice, photo, text or share from another app. AI decides whether it's a task, an expense or a saved item.",
          pt: "Voz, foto, texto ou compartilhar de outro app. A IA decide se é uma tarefa, um gasto ou um item salvo.",
          it: "Voce, foto, testo o condivisione da un'altra app. L'IA decide se è un'attività, una spesa o un elemento salvato.",
        },
      },
      {
        icon: "check",
        title: { es: "Agenda", en: "Agenda", pt: "Agenda", it: "Agenda" },
        description: {
          es: "Las tareas con su fecha, en un calendario, y un resumen de lo que hay para hoy.",
          en: "Tasks with their dates, on a calendar, plus a summary of what's on for today.",
          pt: "As tarefas com a sua data, em um calendário, e um resumo do que há para hoje.",
          it: "Le attività con la loro data, in un calendario, e un riepilogo di cosa c'è oggi.",
        },
      },
      {
        icon: "chart",
        title: { es: "Gastos", en: "Expenses", pt: "Gastos", it: "Spese" },
        description: {
          es: "Del ticket a la planilla sin escribir: comercio, total y categoría, con el cierre de cada mes.",
          en: "From receipt to spreadsheet without typing: merchant, total and category, with a monthly wrap-up.",
          pt: "Do cupom à planilha sem digitar: loja, total e categoria, com o fechamento de cada mês.",
          it: "Dallo scontrino al foglio senza scrivere: negozio, totale e categoria, con la chiusura di ogni mese.",
        },
      },
      {
        icon: "search",
        title: { es: "Guardados y buscador", en: "Saved and search", pt: "Salvos e busca", it: "Salvati e ricerca" },
        description: {
          es: "Notas, enlaces y fotos con resumen y etiquetas, y un buscador que encuentra por significado.",
          en: "Notes, links and photos with summaries and tags, and a search that finds things by meaning.",
          pt: "Notas, links e fotos com resumo e etiquetas, e uma busca que encontra pelo significado.",
          it: "Note, link e foto con riassunto ed etichette, e una ricerca che trova per significato.",
        },
      },
    ],
    // Capturas provisorias del modo demo: se reemplazan por las del teléfono.
    screenshots: [
      {
        src: "/apps/floppy/01.jpg",
        alt: { es: "Inicio: la entrada única para hablar, sacar una foto, escribir o guardar un enlace", en: "Home: one way in to speak, snap a photo, type or save a link", pt: "Início: a entrada única para falar, tirar uma foto, escrever ou salvar um link", it: "Home: l'unico ingresso per parlare, scattare una foto, scrivere o salvare un link" },
      },
      {
        src: "/apps/floppy/02.jpg",
        alt: { es: "Lo que entendió la IA: una tarea, un gasto y una nota de un solo texto", en: "What the AI understood: a task, an expense and a note from a single text", pt: "O que a IA entendeu: uma tarefa, um gasto e uma nota de um único texto", it: "Cosa ha capito l'IA: un'attività, una spesa e una nota da un solo testo" },
      },
      {
        src: "/apps/floppy/03.jpg",
        alt: { es: "Agenda: calendario del mes y tareas del día", en: "Agenda: monthly calendar and the day's tasks", pt: "Agenda: calendário do mês e tarefas do dia", it: "Agenda: calendario del mese e attività del giorno" },
      },
      {
        src: "/apps/floppy/04.jpg",
        alt: { es: "Gastos: total del mes y distribución por categoría", en: "Expenses: month total and breakdown by category", pt: "Gastos: total do mês e distribuição por categoria", it: "Spese: totale del mese e ripartizione per categoria" },
      },
      {
        src: "/apps/floppy/05.jpg",
        alt: { es: "Guardados: notas, enlaces y fotos con resumen y etiquetas", en: "Saved: notes, links and photos with summaries and tags", pt: "Salvos: notas, links e fotos com resumo e etiquetas", it: "Salvati: note, link e foto con riassunto ed etichette" },
      },
      {
        src: "/apps/floppy/06.jpg",
        alt: { es: "Buscador: responde preguntas a partir de lo guardado", en: "Search: answers questions from what you saved", pt: "Busca: responde perguntas a partir do que foi salvo", it: "Ricerca: risponde alle domande a partire da ciò che hai salvato" },
      },
      {
        src: "/apps/floppy/07.jpg",
        alt: { es: "Inicio en tema oscuro", en: "Home in dark theme", pt: "Início no tema escuro", it: "Home con tema scuro" },
      },
      {
        src: "/apps/floppy/08.jpg",
        alt: { es: "Ingreso con código por correo", en: "Sign-in with an email code", pt: "Login com código por e-mail", it: "Accesso con codice via email" },
      },
    ],
    tech: {
      intro: {
        es: "Floppy usa n8n como backend: los flujos reciben lo que manda la app, lo pasan por un modelo multimodal que devuelve datos estructurados y lo guardan en Postgres. Las piezas marcadas en desarrollo son las próximas etapas.",
        en: "Floppy uses n8n as its backend: workflows receive what the app sends, run it through a multimodal model that returns structured data and store it in Postgres. Pieces marked in progress are the next stages.",
        pt: "O Floppy usa o n8n como backend: os fluxos recebem o que o app envia, passam por um modelo multimodal que devolve dados estruturados e salvam no Postgres. As peças marcadas em desenvolvimento são as próximas etapas.",
        it: "Floppy usa n8n come backend: i flussi ricevono ciò che invia l'app, lo passano a un modello multimodale che restituisce dati strutturati e lo salvano in Postgres. I pezzi segnati in sviluppo sono le prossime fasi.",
      },
      items: [
        { area: "app", name: "React Native + Expo + TypeScript", role: { es: "App Android con grabación de audio, cámara y recepción de contenido compartido desde otras apps.", en: "Android app with audio recording, camera and receiving content shared from other apps.", pt: "App Android com gravação de áudio, câmera e recebimento de conteúdo compartilhado de outros apps.", it: "App Android con registrazione audio, fotocamera e ricezione di contenuti condivisi da altre app." } },
        { area: "backend", name: "n8n", role: { es: "Orquesta todo: el flujo de entrada (webhook, IA, base y respuesta), los resúmenes programados y el agente que responde preguntas.", en: "Orchestrates everything: the intake workflow (webhook, AI, database and response), scheduled summaries and the agent that answers questions.", pt: "Orquestra tudo: o fluxo de entrada (webhook, IA, banco e resposta), os resumos programados e o agente que responde perguntas.", it: "Orchestra tutto: il flusso di ingresso (webhook, IA, database e risposta), i riepiloghi programmati e l'agente che risponde alle domande." } },
        { area: "ia", name: "Google Gemini", role: { es: "Entiende audio, imágenes y texto en una sola llamada y devuelve tareas y gastos como JSON validado contra un esquema.", en: "Understands audio, images and text in a single call and returns tasks and expenses as JSON validated against a schema.", pt: "Entende áudio, imagens e texto em uma única chamada e devolve tarefas e gastos como JSON validado contra um esquema.", it: "Capisce audio, immagini e testo in un'unica chiamata e restituisce attività e spese come JSON validato con uno schema." } },
        { area: "datos", name: "Supabase (Postgres)", role: { es: "Tareas, gastos y guardados en tablas con restricciones; las consultas del mes y de la agenda se resuelven en SQL.", en: "Tasks, expenses and saved items in constrained tables; monthly and agenda queries are solved in SQL.", pt: "Tarefas, gastos e itens salvos em tabelas com restrições; as consultas do mês e da agenda são resolvidas em SQL.", it: "Attività, spese ed elementi salvati in tabelle con vincoli; le query del mese e dell'agenda si risolvono in SQL." } },
        { area: "ia", name: { es: "Búsqueda semántica con pgvector (en desarrollo)", en: "Semantic search with pgvector (in progress)", pt: "Busca semântica com pgvector (em desenvolvimento)", it: "Ricerca semantica con pgvector (in sviluppo)" }, role: { es: "Embeddings de cada guardado para buscar por significado, y un agente que responde con lo que encuentra (RAG).", en: "Embeddings for each saved item to search by meaning, and an agent that answers from what it finds (RAG).", pt: "Embeddings de cada item salvo para buscar pelo significado, e um agente que responde com o que encontra (RAG).", it: "Embedding di ogni elemento salvato per cercare per significato, e un agente che risponde con ciò che trova (RAG)." } },
        { area: "auth", name: { es: "Supabase Auth (en desarrollo)", en: "Supabase Auth (in progress)", pt: "Supabase Auth (em desenvolvimento)", it: "Supabase Auth (in sviluppo)" }, role: { es: "Inicio de sesión con correo o Google; cada dato guardado con su dueño, listo para espacios compartidos.", en: "Sign-in with email or Google; every record stored with its owner, ready for shared spaces.", pt: "Login com e-mail ou Google; cada dado salvo com o seu dono, pronto para espaços compartilhados.", it: "Accesso con email o Google; ogni dato salvato con il suo proprietario, pronto per spazi condivisi." } },
        { area: "datos", name: { es: "Python (en desarrollo)", en: "Python (in progress)", pt: "Python (em desenvolvimento)", it: "Python (in sviluppo)" }, role: { es: "Informe mensual de gastos con gráficos, generado a partir de la base.", en: "Monthly expense report with charts, generated from the database.", pt: "Relatório mensal de gastos com gráficos, gerado a partir do banco.", it: "Report mensile delle spese con grafici, generato dal database." } },
      ],
    },
    privacy: {
      updatedAt: "2026-11-09",
      collects: [
        {
          type: { es: "Datos de la cuenta", en: "Account data", pt: "Dados da conta", it: "Dati dell'account" },
          purpose: {
            es: "Tu correo electrónico y tu nombre, para crear tu cuenta e iniciar sesión.",
            en: "Your email address and name, to create your account and sign in.",
            pt: "O seu e-mail e o seu nome, para criar a sua conta e fazer login.",
            it: "La tua email e il tuo nome, per creare il tuo account e accedere.",
          },
          storage: "servidor",
        },
        {
          type: { es: "Lo que guardas", en: "What you save", pt: "O que você salva", it: "Quello che salvi" },
          purpose: {
            es: "Tareas, gastos, notas, enlaces y fotos que cargas, para mostrártelos, ordenarlos y buscarlos.",
            en: "The tasks, expenses, notes, links and photos you add, to show, sort and search them for you.",
            pt: "Tarefas, gastos, notas, links e fotos que você adiciona, para mostrar, organizar e buscar.",
            it: "Attività, spese, note, link e foto che aggiungi, per mostrarli, ordinarli e cercarli.",
          },
          storage: "servidor",
        },
        {
          type: { es: "Audio e imágenes", en: "Audio and images", pt: "Áudio e imagens", it: "Audio e immagini" },
          purpose: {
            es: "Las notas de voz y las fotos se envían para extraer su contenido con inteligencia artificial. El audio no se conserva después de procesarlo.",
            en: "Voice notes and photos are sent to extract their content with AI. Audio is not kept after processing.",
            pt: "As notas de voz e as fotos são enviadas para extrair o seu conteúdo com inteligência artificial. O áudio não é guardado depois do processamento.",
            it: "Le note vocali e le foto vengono inviate per estrarne il contenuto con l'intelligenza artificiale. L'audio non viene conservato dopo l'elaborazione.",
          },
          storage: "servidor",
        },
      ],
      permissions: [
        {
          name: "Micrófono (android.permission.RECORD_AUDIO)",
          reason: { es: "Para grabar notas de voz, solo cuando tocas el botón de hablar.", en: "To record voice notes, only when you tap the speak button.", pt: "Para gravar notas de voz, só quando você toca no botão de falar.", it: "Per registrare note vocali, solo quando tocchi il pulsante per parlare." },
        },
        {
          name: "Cámara (android.permission.CAMERA)",
          reason: { es: "Para sacar fotos de tickets, papeles o cualquier cosa que quieras guardar.", en: "To take photos of receipts, notes or anything you want to save.", pt: "Para tirar fotos de cupons, papéis ou qualquer coisa que você queira salvar.", it: "Per scattare foto di scontrini, appunti o qualsiasi cosa tu voglia salvare." },
        },
      ],
      processedOnDevice: false,
      thirdParties: [
        {
          name: "Google Gemini",
          purpose: { es: "Entender el audio, las imágenes y el texto que envías y convertirlos en tareas, gastos y guardados.", en: "To understand the audio, images and text you send and turn them into tasks, expenses and saved items.", pt: "Entender o áudio, as imagens e o texto que você envia e transformá-los em tarefas, gastos e itens salvos.", it: "Capire l'audio, le immagini e il testo che invii e trasformarli in attività, spese ed elementi salvati." },
          policyUrl: "https://policies.google.com/privacy",
        },
        {
          name: "Supabase",
          purpose: { es: "Alojar la base de datos y la cuenta.", en: "To host the database and your account.", pt: "Hospedar o banco de dados e a conta.", it: "Ospitare il database e l'account." },
          policyUrl: "https://supabase.com/privacy",
        },
      ],
      directedToChildren: false,
      showsAds: false,
      hasInAppPurchases: false,
      minAge: 13,
    },
  },
  {
    slug: "mallnest",
    audience: { es: "Para comprar", en: "For shoppers", pt: "Para comprar", it: "Per chi compra" },
    companion: "mallnest-business",
    howItWorks: {
      intro: { es: "Dos apps que se hablan entre sí: el comercio arma su local en Mallnest Business y el cliente lo ve y compra en Mallnest. Shopify sigue haciendo lo que mejor sabe hacer: productos, stock, pagos y pedidos.", en: "Two apps that talk to each other: the business sets up its shop in Mallnest Business and the customer sees it and buys in Mallnest. Shopify keeps doing what it does best: products, stock, payments and orders.", pt: "Dois apps que conversam entre si: o comércio monta o seu espaço no Mallnest Business e o cliente vê e compra no Mallnest. A Shopify continua fazendo o que faz de melhor: produtos, estoque, pagamentos e pedidos.", it: "Due app che si parlano: il negozio allestisce il suo spazio in Mallnest Business e il cliente lo vede e compra in Mallnest. Shopify continua a fare ciò che sa fare meglio: prodotti, giacenze, pagamenti e ordini." },
      steps: [
        { title: { es: "El comercio conecta su Shopify", en: "The business connects its Shopify", pt: "O comércio conecta a sua Shopify", it: "Il negozio collega il suo Shopify" }, description: { es: "Desde Mallnest Business autoriza el acceso a su tienda. Sus productos, precios y stock quedan sincronizados sin cargar nada a mano.", en: "From Mallnest Business it authorizes access to its store. Products, prices and stock stay in sync without entering anything by hand.", pt: "Pelo Mallnest Business autoriza o acesso à sua loja. Produtos, preços e estoque ficam sincronizados sem cadastrar nada à mão.", it: "Da Mallnest Business autorizza l'accesso al suo negozio. Prodotti, prezzi e giacenze restano sincronizzati senza inserire nulla a mano." } },
        { title: { es: "Arma su local", en: "Sets up its shop", pt: "Monta o seu espaço", it: "Allestisce il suo spazio" }, description: { es: "Elige logo, colores, banners y colecciones destacadas, con sugerencias de textos hechas con IA, y lo envía a revisión.", en: "It picks its logo, colors, banners and featured collections, with AI-made text suggestions, and sends it for review.", pt: "Escolhe logo, cores, banners e coleções em destaque, com sugestões de textos feitas com IA, e envia para revisão.", it: "Sceglie logo, colori, banner e collezioni in evidenza, con suggerimenti di testo fatti con l'IA, e lo invia in revisione." } },
        { title: { es: "Aparece en el shopping", en: "It appears in the mall", pt: "Aparece no shopping", it: "Compare nel centro commerciale" }, description: { es: "Una vez aprobado, el local se suma al listado de Mallnest y se puede compartir con un link o un QR.", en: "Once approved, the shop joins the Mallnest list and can be shared with a link or a QR code.", pt: "Depois de aprovado, o espaço entra na lista do Mallnest e pode ser compartilhado com um link ou um QR.", it: "Una volta approvato, lo spazio entra nell'elenco di Mallnest e si può condividere con un link o un QR." } },
        { title: { es: "El cliente compra", en: "The customer buys", pt: "O cliente compra", it: "Il cliente compra" }, description: { es: "Elige la tienda, que queda como predeterminada, o le pide al personal shopper lo que busca. Paga en el checkout de Shopify de esa tienda.", en: "They pick the store, which becomes their default, or ask the personal shopper for what they want. They pay in that store's Shopify checkout.", pt: "Escolhe a loja, que fica como padrão, ou pede ao personal shopper o que procura. Paga no checkout da Shopify daquela loja.", it: "Sceglie il negozio, che diventa il predefinito, o chiede al personal shopper quello che cerca. Paga nel checkout Shopify di quel negozio." } },
      ],
    },
    tech: {
      intro: { es: "Mallnest es un proyecto de ImagoStack pensado de punta a punta: dos apps nativas que comparten código, un backend serverless propio y la integración con Shopify y con un modelo de IA. Estas son las piezas de su arquitectura y el rol de cada una.", en: "Mallnest is an ImagoStack project designed end to end: two native apps sharing code, our own serverless backend and the integration with Shopify and an AI model. These are the pieces of its architecture and the role of each one.", pt: "Mallnest é um projeto da ImagoStack pensado de ponta a ponta: dois apps nativos que compartilham código, um backend serverless próprio e a integração com a Shopify e com um modelo de IA. Estas são as peças da sua arquitetura e o papel de cada uma.", it: "Mallnest è un progetto di ImagoStack pensato da cima a fondo: due app native che condividono codice, un backend serverless proprio e l'integrazione con Shopify e con un modello di IA. Questi sono i pezzi della sua architettura e il ruolo di ciascuno." },
      items: [
        { area: "app", name: "React Native + Expo", role: { es: "Las dos apps, Mallnest y Mallnest Business, para Android.", en: "Both apps, Mallnest and Mallnest Business, for Android.", pt: "Os dois apps, Mallnest e Mallnest Business, para Android.", it: "Le due app, Mallnest e Mallnest Business, per Android." } },
        { area: "arquitectura", name: "TypeScript (monorepo)", role: { es: "Un solo repositorio con las dos apps y los paquetes compartidos: componentes, sistema de temas y clientes de API.", en: "A single repository with both apps and the shared packages: components, theming system and API clients.", pt: "Um só repositório com os dois apps e os pacotes compartilhados: componentes, sistema de temas e clientes de API.", it: "Un solo repository con le due app e i pacchetti condivisi: componenti, sistema di temi e client API." } },
        { area: "integraciones", name: "Shopify Storefront API", role: { es: "Catálogo, carrito y checkout de cada tienda, con GraphQL.", en: "Each store's catalog, cart and checkout, over GraphQL.", pt: "Catálogo, carrinho e checkout de cada loja, com GraphQL.", it: "Catalogo, carrello e checkout di ogni negozio, con GraphQL." } },
        { area: "integraciones", name: "Shopify Admin API (OAuth)", role: { es: "La conexión de cada comercio con su tienda, con el permiso guardado solo en el servidor.", en: "Each business's connection to its store, with the permission kept only on the server.", pt: "A conexão de cada comércio com a sua loja, com a permissão guardada só no servidor.", it: "Il collegamento di ogni negozio al suo store, con il permesso conservato solo sul server." } },
        { area: "backend", name: "AWS Lambda", role: { es: "El backend: listado de tiendas, configuración, aprobación y el paso hacia la IA.", en: "The backend: store list, configuration, approval and the bridge to the AI.", pt: "O backend: lista de lojas, configuração, aprovação e a ponte para a IA.", it: "Il backend: elenco dei negozi, configurazione, approvazione e il ponte verso l'IA." } },
        { area: "datos", name: { es: "Amazon DynamoDB y S3", en: "Amazon DynamoDB and S3", pt: "Amazon DynamoDB e S3", it: "Amazon DynamoDB e S3" }, role: { es: "Datos de cada tienda, con un orden de listado flexible, e imágenes de marca.", en: "Each store's data, with a flexible list order, and brand images.", pt: "Dados de cada loja, com uma ordem de lista flexível, e imagens de marca.", it: "Dati di ogni negozio, con un ordine dell'elenco flessibile, e immagini del marchio." } },
        { area: "auth", name: "Amazon Cognito", role: { es: "Inicio de sesión de los comercios, con correo o Google.", en: "Sign-in for businesses, with email or Google.", pt: "Login dos comércios, com e-mail ou Google.", it: "Accesso dei negozi, con email o Google." } },
        { area: "ia", name: "Google Gemini", role: { es: "El personal shopper y las sugerencias de textos, con una cadena de modelos de respaldo y la app funcionando igual si la IA no está disponible.", en: "The personal shopper and text suggestions, with a chain of fallback models and the app still working if the AI is unavailable.", pt: "O personal shopper e as sugestões de textos, com uma cadeia de modelos de reserva e o app funcionando igual se a IA não estiver disponível.", it: "Il personal shopper e i suggerimenti di testo, con una catena di modelli di riserva e l'app che funziona comunque se l'IA non è disponibile." } },
        { area: "nativo", name: "Android App Links + Play Install Referrer", role: { es: "El link o QR de cada tienda abre la app directo en esa tienda; si no está instalada, pasa por Google Play y llega igual a la tienda después de instalar.", en: "Each store's link or QR opens the app straight into that store; if it isn't installed, it goes through Google Play and still lands on the store after installing.", pt: "O link ou QR de cada loja abre o app direto naquela loja; se não estiver instalado, passa pelo Google Play e chega à loja depois de instalar.", it: "Il link o QR di ogni negozio apre l'app direttamente in quel negozio; se non è installata, passa da Google Play e arriva comunque al negozio dopo l'installazione." } },
        { area: "integraciones", name: "Shopify Checkout Kit", role: { es: "El pago se hace en el checkout de Shopify de cada tienda, dentro de la app.", en: "Payment happens in each store's Shopify checkout, inside the app.", pt: "O pagamento é feito no checkout da Shopify de cada loja, dentro do app.", it: "Il pagamento avviene nel checkout Shopify di ogni negozio, dentro l'app." } },
      ],
    },
    faq: [
      { q: { es: "¿Cuánto cuesta usar Mallnest?", en: "How much does Mallnest cost?", pt: "Quanto custa usar o Mallnest?", it: "Quanto costa usare Mallnest?" }, a: { es: "Para comprar, nada: la app es gratis y no pide cuenta. Para los comercios, sumarse y armar su local también es gratis; solo necesitan su propia tienda en Shopify.", en: "For shoppers, nothing: the app is free and needs no account. For businesses, joining and setting up their shop is free too; they only need their own Shopify store.", pt: "Para comprar, nada: o app é grátis e não pede conta. Para os comércios, entrar e montar o espaço também é grátis; só precisam da sua própria loja na Shopify.", it: "Per chi compra, niente: l'app è gratuita e non chiede account. Per i negozi, entrare e allestire lo spazio è gratis; serve solo il proprio negozio su Shopify." } },
      { q: { es: "¿Quién me vende y quién cobra?", en: "Who sells to me and who charges?", pt: "Quem vende e quem cobra?", it: "Chi vende e chi incassa?" }, a: { es: "Cada tienda. Mallnest es la vidriera; la compra se hace en el checkout de Shopify de la tienda elegida, que es la vendedora y se encarga del pago, el envío y la factura.", en: "Each store. Mallnest is the shop window; you buy in the chosen store's Shopify checkout, and that store is the seller, handling payment, shipping and invoicing.", pt: "Cada loja. O Mallnest é a vitrine; a compra é feita no checkout da Shopify da loja escolhida, que é a vendedora e cuida do pagamento, do envio e da nota.", it: "Ogni negozio. Mallnest è la vetrina; si compra nel checkout Shopify del negozio scelto, che è il venditore e si occupa di pagamento, spedizione e fattura." } },
      { q: { es: "¿Mallnest ve los datos de mi tarjeta?", en: "Does Mallnest see my card details?", pt: "O Mallnest vê os dados do meu cartão?", it: "Mallnest vede i dati della mia carta?" }, a: { es: "No. El pago lo procesa la pasarela que cada tienda tiene configurada en Shopify. Mallnest nunca recibe ni guarda los datos de tu tarjeta.", en: "No. Payment is processed by the provider each store has set up in Shopify. Mallnest never receives or stores your card details.", pt: "Não. O pagamento é processado pelo meio de pagamento que cada loja configurou na Shopify. O Mallnest nunca recebe nem guarda os dados do seu cartão.", it: "No. Il pagamento lo gestisce il sistema che ogni negozio ha configurato su Shopify. Mallnest non riceve né conserva mai i dati della tua carta." } },
      { q: { es: "¿Cómo funciona el personal shopper?", en: "How does the personal shopper work?", pt: "Como funciona o personal shopper?", it: "Come funziona il personal shopper?" }, a: { es: "Le escribes lo que buscas con tus palabras y una IA lo busca entre los productos reales de las tiendas, en una o en todas. Si la IA no está disponible, la app usa la búsqueda común.", en: "You type what you want in your own words and an AI looks for it among the stores' real products, in one or in all of them. If the AI is unavailable, the app falls back to the regular search.", pt: "Você escreve o que procura com as suas palavras e uma IA busca entre os produtos reais das lojas, em uma ou em todas. Se a IA não estiver disponível, o app usa a busca comum.", it: "Scrivi quello che cerchi con parole tue e un'IA lo cerca tra i prodotti reali dei negozi, in uno o in tutti. Se l'IA non è disponibile, l'app usa la ricerca normale." } },
      { q: { es: "Tengo una tienda en Shopify, ¿cómo me sumo?", en: "I have a Shopify store, how do I join?", pt: "Tenho uma loja na Shopify, como entro?", it: "Ho un negozio su Shopify, come mi unisco?" }, a: { es: "Descarga Mallnest Business, conecta tu tienda, personaliza tu local y envíalo a revisión. Tu tienda Shopify sigue funcionando igual: Mallnest es un canal más.", en: "Download Mallnest Business, connect your store, customize your shop and send it for review. Your Shopify store keeps working the same: Mallnest is one more channel.", pt: "Baixe o Mallnest Business, conecte a sua loja, personalize o seu espaço e envie para revisão. A sua loja Shopify continua funcionando igual: o Mallnest é mais um canal.", it: "Scarica Mallnest Business, collega il tuo negozio, personalizza il tuo spazio e invialo in revisione. Il tuo negozio Shopify continua a funzionare uguale: Mallnest è un canale in più." } },
      { q: { es: "¿Por qué revisan cada tienda?", en: "Why is every store reviewed?", pt: "Por que cada loja é revisada?", it: "Perché ogni negozio viene revisionato?" }, a: { es: "Porque todas las tiendas conviven en la misma app. Revisar cada local antes de publicarlo mantiene el shopping confiable para quienes compran.", en: "Because every store lives in the same app. Reviewing each shop before publishing it keeps the mall trustworthy for shoppers.", pt: "Porque todas as lojas convivem no mesmo app. Revisar cada espaço antes de publicá-lo mantém o shopping confiável para quem compra.", it: "Perché tutti i negozi convivono nella stessa app. Revisionare ogni spazio prima di pubblicarlo mantiene il centro commerciale affidabile per chi compra." } },
    ],
    name: { es: "Mallnest", en: "Mallnest", pt: "Mallnest", it: "Mallnest" },
    tagline: {
      es: "Un shopping de tiendas en tu teléfono. Elige tu tienda, compra fácil y deja que la IA busque por ti.",
      en: "A mall of stores on your phone. Pick your store, shop easily and let AI search for you.",
      pt: "Um shopping de lojas no seu telefone. Escolha a sua loja, compre fácil e deixe a IA procurar por você.",
      it: "Un centro commerciale di negozi sul tuo telefono. Scegli il tuo negozio, compra facilmente e lascia che l'IA cerchi per te.",
    },
    description: {
      es: "Mallnest reúne tiendas independientes en una sola app. Cada tienda conserva su marca, sus colores y sus productos, y la compra se hace con el checkout seguro de Shopify. Un personal shopper con IA te ayuda a encontrar lo que buscas, en una tienda o en todas.",
      en: "Mallnest brings independent stores together in a single app. Each store keeps its brand, its colors and its products, and you pay through Shopify's secure checkout. An AI personal shopper helps you find what you're looking for, in one store or across all of them.",
      pt: "Mallnest reúne lojas independentes em um só app. Cada loja mantém a sua marca, as suas cores e os seus produtos, e a compra é feita pelo checkout seguro da Shopify. Um personal shopper com IA ajuda você a encontrar o que procura, em uma loja ou em todas.",
      it: "Mallnest riunisce negozi indipendenti in un'unica app. Ogni negozio mantiene il suo marchio, i suoi colori e i suoi prodotti, e si paga con il checkout sicuro di Shopify. Un personal shopper con IA ti aiuta a trovare quello che cerchi, in un negozio o in tutti.",
    },
    body: {
      es: [
        "Mallnest es como un shopping, pero en el teléfono: cada tienda es un local con su propia marca, sus colores y sus productos. Entras, eliges la que te interesa y desde ese momento la app se abre directamente ahí, como si fuera la app de esa tienda. Si quieres ver otras, siempre puedes volver al listado.",
        "Cada tienda funciona con Shopify, así que los productos, el stock y los precios están siempre al día, y el pago se hace con el checkout de Shopify: los datos de tu tarjeta los maneja la pasarela de pago de la tienda, nunca Mallnest.",
        "Si no sabes bien qué buscar, puedes pedírselo con tus palabras al personal shopper: \"algo para regalar hasta 20.000\" o \"café para filtro\". La IA busca entre los productos reales de las tiendas y te muestra las opciones que coinciden, en una tienda o en todas a la vez.",
        "Para los comercios, Mallnest es un canal más: mantienen su tienda Shopify como siempre y suman un local móvil dentro de un shopping compartido, que se configura desde la app Mallnest Business.",
      ],
      en: [
        "Mallnest is like a mall, but on your phone: each store is a shop with its own brand, colors and products. You browse, pick the one you like and from then on the app opens straight into it, as if it were that store's own app. If you want to see others, you can always go back to the list.",
        "Every store runs on Shopify, so products, stock and prices are always up to date, and you pay through Shopify's checkout: your card details are handled by the store's payment provider, never by Mallnest.",
        "If you're not sure what you're after, just tell the personal shopper in your own words: \"a gift under $20\" or \"coffee for filter brewing\". The AI searches the stores' real products and shows you the matching options, in one store or in all of them at once.",
        "For businesses, Mallnest is one more sales channel: they keep their Shopify store as always and add a mobile shop inside a shared mall, set up from the Mallnest Business app.",
      ],
      pt: [
        "Mallnest é como um shopping, mas no telefone: cada loja é um espaço com a sua própria marca, cores e produtos. Você entra, escolhe a que interessa e a partir daí o app abre direto nela, como se fosse o app daquela loja. Se quiser ver outras, sempre pode voltar à lista.",
        "Cada loja funciona com a Shopify, então os produtos, o estoque e os preços estão sempre atualizados, e o pagamento é feito pelo checkout da Shopify: os dados do seu cartão são tratados pelo meio de pagamento da loja, nunca pelo Mallnest.",
        "Se não sabe bem o que procurar, peça com as suas palavras ao personal shopper: \"algo para presentear até 100 reais\" ou \"café para coar\". A IA procura entre os produtos reais das lojas e mostra as opções que combinam, em uma loja ou em todas ao mesmo tempo.",
        "Para os comércios, Mallnest é mais um canal: mantêm a sua loja Shopify como sempre e somam um espaço móvel dentro de um shopping compartilhado, configurado pelo app Mallnest Business.",
      ],
      it: [
        "Mallnest è come un centro commerciale, ma sul telefono: ogni negozio è uno spazio con il suo marchio, i suoi colori e i suoi prodotti. Entri, scegli quello che ti interessa e da quel momento l'app si apre direttamente lì, come se fosse l'app di quel negozio. Se vuoi vederne altri, puoi sempre tornare all'elenco.",
        "Ogni negozio funziona con Shopify, quindi prodotti, giacenze e prezzi sono sempre aggiornati, e si paga con il checkout di Shopify: i dati della tua carta li gestisce il sistema di pagamento del negozio, mai Mallnest.",
        "Se non sai bene cosa cercare, chiedilo con parole tue al personal shopper: \"un regalo sotto i 20 euro\" o \"caffè per filtro\". L'IA cerca tra i prodotti reali dei negozi e ti mostra le opzioni che corrispondono, in un negozio o in tutti insieme.",
        "Per i negozi, Mallnest è un canale in più: mantengono il loro negozio Shopify come sempre e aggiungono uno spazio mobile in un centro commerciale condiviso, configurato dall'app Mallnest Business.",
      ],
    },
    claim: {
      es: "Muchas tiendas. Un solo lugar.",
      en: "Many stores. One place.",
      pt: "Muitas lojas. Um só lugar.",
      it: "Tanti negozi. Un solo posto.",
    },
    category: { es: "Compras", en: "Shopping", pt: "Compras", it: "Shopping" },
    // Todavía no está publicada: el botón muestra "Muy pronto en Google Play".
    playStoreUrl: "",
    // Icono provisorio: el nido con la bolsa, en blanco sobre el azul de la marca.
    icon: "/apps/mallnest/icon.png",
    // El gráfico de la carpeta de Business, elegido para la tarjeta de Mallnest.
    feature: "/apps/mallnest-business/feature.png",
    // El azul marino del logo de Mallnest
    accent: ["#0a264c", "#2a5fa8"],
    languages: {
      es: ["Español", "Inglés", "Portugués"],
      en: ["Spanish", "English", "Portuguese"],
      pt: ["Espanhol", "Inglês", "Português"],
      it: ["Spagnolo", "Inglese", "Portoghese"],
    },
    features: [
      {
        icon: "layout",
        title: {
          es: "Un shopping de tiendas",
          en: "A mall of stores",
          pt: "Um shopping de lojas",
          it: "Un centro commerciale di negozi",
        },
        description: {
          es: "Todas las tiendas en un listado con buscador. La que eliges queda como predeterminada y la app se abre directamente en ella.",
          en: "Every store in one list with search. The one you pick becomes your default and the app opens straight into it.",
          pt: "Todas as lojas em uma lista com busca. A que você escolhe fica como padrão e o app abre direto nela.",
          it: "Tutti i negozi in un elenco con ricerca. Quello che scegli diventa il predefinito e l'app si apre direttamente lì.",
        },
      },
      {
        icon: "palette",
        title: {
          es: "Cada tienda con su marca",
          en: "Every store with its brand",
          pt: "Cada loja com a sua marca",
          it: "Ogni negozio con il suo marchio",
        },
        description: {
          es: "Logo, colores, banners y colecciones propias: entrar a una tienda se siente como usar su propia app.",
          en: "Its own logo, colors, banners and collections: walking into a store feels like using its own app.",
          pt: "Logo, cores, banners e coleções próprias: entrar em uma loja parece usar o app dela.",
          it: "Logo, colori, banner e collezioni propri: entrare in un negozio è come usare la sua app.",
        },
      },
      {
        icon: "sparkles",
        title: {
          es: "Personal shopper con IA",
          en: "AI personal shopper",
          pt: "Personal shopper com IA",
          it: "Personal shopper con IA",
        },
        description: {
          es: "Pide lo que buscas con tus palabras y la IA lo encuentra entre los productos reales, en una tienda o en todas.",
          en: "Ask for what you want in your own words and the AI finds it among real products, in one store or in all of them.",
          pt: "Peça o que procura com as suas palavras e a IA encontra entre os produtos reais, em uma loja ou em todas.",
          it: "Chiedi quello che cerchi con parole tue e l'IA lo trova tra i prodotti reali, in un negozio o in tutti.",
        },
      },
      {
        icon: "shield",
        title: {
          es: "Checkout seguro de Shopify",
          en: "Secure Shopify checkout",
          pt: "Checkout seguro da Shopify",
          it: "Checkout sicuro di Shopify",
        },
        description: {
          es: "El pago, el envío y los mails de confirmación los resuelve el checkout de Shopify de cada tienda. Mallnest no ve los datos de tu tarjeta.",
          en: "Payment, shipping and confirmation emails are handled by each store's Shopify checkout. Mallnest never sees your card details.",
          pt: "O pagamento, o envio e os e-mails de confirmação são resolvidos pelo checkout da Shopify de cada loja. O Mallnest não vê os dados do seu cartão.",
          it: "Pagamento, spedizione ed email di conferma li gestisce il checkout Shopify di ogni negozio. Mallnest non vede i dati della tua carta.",
        },
      },
    ],
    // Capturas provisorias del prototipo (datos de ejemplo). Se reemplazan por
    // capturas reales del teléfono antes de publicar.
    screenshots: [
      {
        src: "/apps/mallnest/01.jpg",
        alt: { es: "Listado de tiendas con el personal shopper arriba", en: "Store list with the personal shopper at the top", pt: "Lista de lojas com o personal shopper no topo", it: "Elenco dei negozi con il personal shopper in alto" },
      },
      {
        src: "/apps/mallnest/02.jpg",
        alt: { es: "Personal shopper: se pide algo con palabras y busca en todas las tiendas", en: "Personal shopper: ask for something in your own words and it searches every store", pt: "Personal shopper: você pede algo com palavras e ele busca em todas as lojas", it: "Personal shopper: chiedi qualcosa a parole e cerca in tutti i negozi" },
      },
      {
        src: "/apps/mallnest/03.jpg",
        alt: { es: "Inicio de una pastelería con su marca, banners y colecciones", en: "A bakery's home with its own brand, banners and collections", pt: "Início de uma confeitaria com a sua marca, banners e coleções", it: "Home di una pasticceria con il suo marchio, banner e collezioni" },
      },
      {
        src: "/apps/mallnest/04.jpg",
        alt: { es: "Inicio de un pet shop: cada tienda tiene sus propios colores", en: "A pet shop's home: every store has its own colors", pt: "Início de um pet shop: cada loja tem as suas próprias cores", it: "Home di un pet shop: ogni negozio ha i suoi colori" },
      },
      {
        src: "/apps/mallnest/05.jpg",
        alt: { es: "Catálogo de una tienda filtrado por colección", en: "A store's catalog filtered by collection", pt: "Catálogo de uma loja filtrado por coleção", it: "Catalogo di un negozio filtrato per collezione" },
      },
      {
        src: "/apps/mallnest/06.jpg",
        alt: { es: "Ficha de un producto con sus variantes", en: "Product page with its variants", pt: "Página de um produto com as suas variantes", it: "Scheda di un prodotto con le sue varianti" },
      },
      {
        src: "/apps/mallnest/07.jpg",
        alt: { es: "Carrito antes de pagar en el checkout de Shopify", en: "Cart before paying in the Shopify checkout", pt: "Carrinho antes de pagar no checkout da Shopify", it: "Carrello prima di pagare nel checkout Shopify" },
      },
      {
        src: "/apps/mallnest/08.jpg",
        alt: { es: "Inicio de una tienda de moda", en: "A fashion store's home", pt: "Início de uma loja de moda", it: "Home di un negozio di moda" },
      },
    ],
    privacy: {
      updatedAt: "2026-11-01",
      collects: [
        {
          type: {
            es: "Tienda predeterminada y carrito",
            en: "Default store and cart",
            pt: "Loja padrão e carrinho",
            it: "Negozio predefinito e carrello",
          },
          purpose: {
            es: "Recordar qué tienda elegiste para abrir la app directamente en ella, y los productos que agregaste al carrito de cada tienda mientras compras.",
            en: "To remember which store you picked so the app opens straight into it, and the products you added to each store's cart while shopping.",
            pt: "Lembrar qual loja você escolheu para abrir o app direto nela, e os produtos que você adicionou ao carrinho de cada loja enquanto compra.",
            it: "Ricordare quale negozio hai scelto per aprire l'app direttamente lì, e i prodotti che hai aggiunto al carrello di ogni negozio mentre compri.",
          },
          storage: "dispositivo",
        },
      ],
      permissions: [],
      // Las búsquedas del personal shopper salen del dispositivo hacia Gemini, y
      // la compra se completa en el checkout de Shopify de cada tienda.
      processedOnDevice: false,
      processingNote: {
        es: "Mallnest no pide cuenta para comprar. Cuando usas el personal shopper, el texto de tu búsqueda y la lista de productos disponibles se envían a la API de Gemini, de Google, a través de nuestro servidor, para encontrar los productos que coinciden; ni {company} ni la app conservan una copia de tus búsquedas. Si ese servicio no está disponible, la app usa la búsqueda común. Al pagar, completas la compra en el checkout de Shopify de la tienda elegida: tus datos de envío y de pago los recibe esa tienda, como vendedora, según su propia política de privacidad. Mallnest no ve ni guarda los datos de tu tarjeta.",
        en: "Mallnest requires no account to shop. When you use the personal shopper, the text of your search and the list of available products are sent to Google's Gemini API through our server to find the matching products; neither {company} nor the app keeps a copy of your searches. If that service is unavailable, the app falls back to the regular search. When you pay, you complete the purchase in the chosen store's Shopify checkout: your shipping and payment details go to that store, as the seller, under its own privacy policy. Mallnest never sees or stores your card details.",
        pt: "Mallnest não pede conta para comprar. Quando você usa o personal shopper, o texto da sua busca e a lista de produtos disponíveis são enviados à API Gemini, do Google, por meio do nosso servidor, para encontrar os produtos que combinam; nem a {company} nem o app guardam cópia das suas buscas. Se esse serviço não estiver disponível, o app usa a busca comum. Ao pagar, você conclui a compra no checkout da Shopify da loja escolhida: os seus dados de envio e de pagamento vão para essa loja, como vendedora, segundo a sua própria política de privacidade. O Mallnest não vê nem guarda os dados do seu cartão.",
        it: "Mallnest non chiede un account per comprare. Quando usi il personal shopper, il testo della tua ricerca e l'elenco dei prodotti disponibili vengono inviati all'API Gemini di Google tramite il nostro server, per trovare i prodotti che corrispondono; né {company} né l'app conservano una copia delle tue ricerche. Se quel servizio non è disponibile, l'app usa la ricerca normale. Al pagamento, completi l'acquisto nel checkout Shopify del negozio scelto: i tuoi dati di spedizione e pagamento li riceve quel negozio, come venditore, secondo la sua informativa. Mallnest non vede né conserva i dati della tua carta.",
      },
      thirdParties: [
        {
          name: "Shopify",
          purpose: {
            es: "Mostrar los productos de cada tienda y procesar la compra en su checkout. Cada tienda es la vendedora y responsable de los datos de tu pedido.",
            en: "To show each store's products and process the purchase in its checkout. Each store is the seller and responsible for your order data.",
            pt: "Mostrar os produtos de cada loja e processar a compra no checkout. Cada loja é a vendedora e responsável pelos dados do seu pedido.",
            it: "Mostrare i prodotti di ogni negozio e gestire l'acquisto nel suo checkout. Ogni negozio è il venditore e responsabile dei dati del tuo ordine.",
          },
          policyUrl: "https://www.shopify.com/legal/privacy",
        },
        {
          name: "Google Gemini (API)",
          purpose: {
            es: "Interpretar lo que pides al personal shopper y elegir los productos que coinciden. Google trata ese texto bajo las condiciones de su propio servicio. Te pedimos que no escribas datos que te identifiquen ni información sensible en tus búsquedas.",
            en: "To interpret what you ask the personal shopper and pick the matching products. Google processes that text under its own service terms. We ask you not to type identifying details or sensitive information in your searches.",
            pt: "Interpretar o que você pede ao personal shopper e escolher os produtos que combinam. O Google trata esse texto sob as condições do próprio serviço. Pedimos que você não escreva dados que o identifiquem nem informações sensíveis nas suas buscas.",
            it: "Interpretare quello che chiedi al personal shopper e scegliere i prodotti che corrispondono. Google tratta quel testo secondo le condizioni del proprio servizio. Ti chiediamo di non scrivere dati che ti identifichino né informazioni sensibili nelle tue ricerche.",
          },
          policyUrl: "https://policies.google.com/privacy",
        },
        {
          name: "Amazon Web Services",
          purpose: {
            es: "Alojar el servidor de Mallnest: el listado de tiendas, su configuración y el paso de las búsquedas hacia Gemini.",
            en: "To host Mallnest's server: the store list, its configuration and passing searches on to Gemini.",
            pt: "Hospedar o servidor do Mallnest: a lista de lojas, a sua configuração e o envio das buscas ao Gemini.",
            it: "Ospitare il server di Mallnest: l'elenco dei negozi, la loro configurazione e l'inoltro delle ricerche a Gemini.",
          },
          policyUrl: "https://aws.amazon.com/privacy/",
        },
      ],
      directedToChildren: false,
      showsAds: false,
      hasInAppPurchases: false,
      minAge: null,
    },
  },
  {
    slug: "mallnest-business",
    audience: { es: "Para tu comercio", en: "For your business", pt: "Para o seu comércio", it: "Per il tuo negozio" },
    // Oculta: existe su política de privacidad (la pide Google Play antes de
    // publicar), pero no aparece en el catálogo. Mallnest es la cara pública.
    oculta: true,
    name: {
      es: "Mallnest Business",
      en: "Mallnest Business",
      pt: "Mallnest Business",
      it: "Mallnest Business",
    },
    tagline: {
      es: "Tu tienda Shopify, también en Mallnest. Configúrala desde el celular.",
      en: "Your Shopify store, in Mallnest too. Set it up from your phone.",
      pt: "A sua loja Shopify, também no Mallnest. Configure pelo celular.",
      it: "Il tuo negozio Shopify, anche su Mallnest. Configuralo dal telefono.",
    },
    description: {
      es: "La app para comercios de Mallnest: conecta tu tienda Shopify, personaliza tu local con tu logo, tus colores y tus banners, y compártelo con un link y un QR. Gratis y desde el celular.",
      en: "Mallnest's app for businesses: connect your Shopify store, customize your shop with your logo, colors and banners, and share it with a link and a QR code. Free and from your phone.",
      pt: "O app para comércios do Mallnest: conecte a sua loja Shopify, personalize o seu espaço com o seu logo, as suas cores e os seus banners, e compartilhe com um link e um QR. Grátis e pelo celular.",
      it: "L'app per negozi di Mallnest: collega il tuo negozio Shopify, personalizza il tuo spazio con logo, colori e banner, e condividilo con un link e un QR. Gratis e dal telefono.",
    },
    body: {
      es: [
        "Mallnest Business es donde los comercios arman su local dentro de Mallnest. Conectas tu tienda Shopify, eliges tu logo, tus colores, tus banners y las colecciones que se ven primero, y lo envías a revisión. Cuando se aprueba, tu tienda aparece en Mallnest.",
        "Los productos, los precios, el stock y los pedidos los sigues manejando en Shopify, como siempre. Mallnest Business se ocupa de cómo se ve tu tienda y de ayudarte a difundirla, con sugerencias de textos hechas con IA.",
      ],
      en: [
        "Mallnest Business is where businesses set up their shop inside Mallnest. You connect your Shopify store, choose your logo, colors, banners and the collections shown first, and send it for review. Once approved, your store appears in Mallnest.",
        "You keep managing products, prices, stock and orders in Shopify, as always. Mallnest Business takes care of how your store looks and helps you promote it, with AI-made text suggestions.",
      ],
      pt: [
        "Mallnest Business é onde os comércios montam o seu espaço dentro do Mallnest. Você conecta a sua loja Shopify, escolhe o seu logo, as suas cores, os seus banners e as coleções que aparecem primeiro, e envia para revisão. Quando é aprovada, a sua loja aparece no Mallnest.",
        "Os produtos, os preços, o estoque e os pedidos você continua gerenciando na Shopify, como sempre. O Mallnest Business cuida de como a sua loja aparece e ajuda a divulgá-la, com sugestões de textos feitas com IA.",
      ],
      it: [
        "Mallnest Business è dove i negozi allestiscono il loro spazio dentro Mallnest. Colleghi il tuo negozio Shopify, scegli logo, colori, banner e le collezioni da mostrare per prime, e lo invii in revisione. Una volta approvato, il tuo negozio compare su Mallnest.",
        "Prodotti, prezzi, giacenze e ordini continui a gestirli su Shopify, come sempre. Mallnest Business si occupa di come appare il tuo negozio e ti aiuta a farlo conoscere, con suggerimenti di testo fatti con l'IA.",
      ],
    },
    claim: {
      es: "Tu tienda, un local más.",
      en: "Your store, one more shop.",
      pt: "A sua loja, mais um espaço.",
      it: "Il tuo negozio, uno spazio in più.",
    },
    category: { es: "Empresa", en: "Business", pt: "Empresa", it: "Affari" },
    playStoreUrl: "",
    // Icono provisorio: el mismo logo invertido, azul sobre blanco.
    icon: "/apps/mallnest-business/icon.png",
    feature: "/apps/mallnest-business/feature.png",
    accent: ["#081a33", "#1c4680"],
    languages: {
      es: ["Español", "Inglés", "Portugués"],
      en: ["Spanish", "English", "Portuguese"],
      pt: ["Espanhol", "Inglês", "Português"],
      it: ["Spagnolo", "Inglese", "Portoghese"],
    },
    features: [
      {
        icon: "link",
        title: { es: "Conecta tu Shopify", en: "Connect your Shopify", pt: "Conecte a sua Shopify", it: "Collega il tuo Shopify" },
        description: { es: "Autorizas el acceso una vez y tus productos, precios y stock aparecen en Mallnest, siempre al día.", en: "You authorize access once and your products, prices and stock show up in Mallnest, always up to date.", pt: "Você autoriza o acesso uma vez e os seus produtos, preços e estoque aparecem no Mallnest, sempre atualizados.", it: "Autorizzi l'accesso una volta e prodotti, prezzi e giacenze compaiono su Mallnest, sempre aggiornati." },
      },
      {
        icon: "palette",
        title: { es: "Tu marca, tu local", en: "Your brand, your shop", pt: "A sua marca, o seu espaço", it: "Il tuo marchio, il tuo spazio" },
        description: { es: "Logo, colores, banners y colecciones destacadas, con vista previa de cómo lo ven tus clientes.", en: "Logo, colors, banners and featured collections, with a preview of how your customers see it.", pt: "Logo, cores, banners e coleções em destaque, com prévia de como os seus clientes veem.", it: "Logo, colori, banner e collezioni in evidenza, con anteprima di come lo vedono i tuoi clienti." },
      },
      {
        icon: "sparkles",
        title: { es: "Textos con IA", en: "AI-written texts", pt: "Textos com IA", it: "Testi con l'IA" },
        description: { es: "Sugerencias para la frase de tu tienda y los banners, para elegir o editar. Si la IA no está disponible, escribes a mano.", en: "Suggestions for your store's tagline and banners, to pick or edit. If the AI is unavailable, you write them yourself.", pt: "Sugestões para a frase da sua loja e os banners, para escolher ou editar. Se a IA não estiver disponível, você escreve à mão.", it: "Suggerimenti per la frase del negozio e i banner, da scegliere o modificare. Se l'IA non è disponibile, scrivi a mano." },
      },
      {
        icon: "device",
        title: { es: "Link y QR para compartir", en: "A link and QR code to share", pt: "Link e QR para compartilhar", it: "Link e QR da condividere" },
        description: { es: "Lleva a tus clientes directo a tu local en Mallnest, desde Instagram, WhatsApp o el mostrador.", en: "Take your customers straight to your shop in Mallnest, from Instagram, WhatsApp or the counter.", pt: "Leve os seus clientes direto para o seu espaço no Mallnest, pelo Instagram, WhatsApp ou balcão.", it: "Porta i tuoi clienti direttamente al tuo spazio su Mallnest, da Instagram, WhatsApp o dal bancone." },
      },
    ],
    // Capturas provisorias del prototipo (datos de ejemplo). Se reemplazan por
    // capturas reales del teléfono antes de publicar.
    screenshots: [
      {
        src: "/apps/mallnest-business/01.jpg",
        alt: { es: "Inicio de sesión del comercio", en: "Business sign-in", pt: "Login do comércio", it: "Accesso del negozio" },
      },
      {
        src: "/apps/mallnest-business/02.jpg",
        alt: { es: "Personalizar el local con sugerencias de textos hechas con IA", en: "Customizing the shop with AI text suggestions", pt: "Personalizar o espaço com sugestões de textos feitas com IA", it: "Personalizzare lo spazio con suggerimenti di testo fatti con l'IA" },
      },
      {
        src: "/apps/mallnest-business/03.jpg",
        alt: { es: "Panel del local con su estado de aprobación", en: "The shop's dashboard with its approval status", pt: "Painel do espaço com o status de aprovação", it: "Pannello dello spazio con lo stato di approvazione" },
      },
      {
        src: "/apps/mallnest-business/04.jpg",
        alt: { es: "Vitrina: banners y colecciones del inicio", en: "Showcase: home banners and collections", pt: "Vitrine: banners e coleções do início", it: "Vetrina: banner e collezioni della home" },
      },
      {
        src: "/apps/mallnest-business/05.jpg",
        alt: { es: "Vista previa de la tienda tal como la ven los clientes", en: "Store preview as customers see it", pt: "Prévia da loja como os clientes a veem", it: "Anteprima del negozio come la vedono i clienti" },
      },
      {
        src: "/apps/mallnest-business/06.jpg",
        alt: { es: "Link y QR para compartir la tienda", en: "Link and QR code to share the store", pt: "Link e QR para compartilhar a loja", it: "Link e QR per condividere il negozio" },
      },
    ],
    privacy: {
      updatedAt: "2026-11-01",
      collects: [
        {
          type: {
            es: "Datos de la cuenta",
            en: "Account data",
            pt: "Dados da conta",
            it: "Dati dell'account",
          },
          purpose: {
            es: "Tu correo electrónico y tu nombre, para crear tu cuenta e iniciar sesión, con correo o con Google.",
            en: "Your email address and name, to create your account and sign in, with email or with Google.",
            pt: "O seu e-mail e o seu nome, para criar a sua conta e fazer login, com e-mail ou com o Google.",
            it: "La tua email e il tuo nome, per creare il tuo account e accedere, con email o con Google.",
          },
          storage: "servidor",
        },
        {
          type: {
            es: "Conexión con tu tienda Shopify",
            en: "Connection to your Shopify store",
            pt: "Conexão com a sua loja Shopify",
            it: "Collegamento al tuo negozio Shopify",
          },
          purpose: {
            es: "La dirección de tu tienda y el permiso de acceso que otorgas al conectarla, para mostrar tus productos en Mallnest. El permiso se guarda solo en nuestro servidor, nunca en el teléfono.",
            en: "Your store's address and the access permission you grant when connecting it, to show your products in Mallnest. The permission is stored only on our server, never on the phone.",
            pt: "O endereço da sua loja e a permissão de acesso que você concede ao conectá-la, para mostrar os seus produtos no Mallnest. A permissão fica guardada só no nosso servidor, nunca no telefone.",
            it: "L'indirizzo del tuo negozio e il permesso di accesso che concedi collegandolo, per mostrare i tuoi prodotti su Mallnest. Il permesso resta solo sul nostro server, mai sul telefono.",
          },
          storage: "servidor",
        },
        {
          type: {
            es: "Configuración de tu local",
            en: "Your shop's configuration",
            pt: "Configuração do seu espaço",
            it: "Configurazione del tuo spazio",
          },
          purpose: {
            es: "Nombre, frase, rubro, logo, colores, banners y colecciones destacadas, que se muestran públicamente en Mallnest una vez aprobada tu tienda.",
            en: "Name, tagline, category, logo, colors, banners and featured collections, shown publicly in Mallnest once your store is approved.",
            pt: "Nome, frase, segmento, logo, cores, banners e coleções em destaque, exibidos publicamente no Mallnest depois que a sua loja é aprovada.",
            it: "Nome, frase, categoria, logo, colori, banner e collezioni in evidenza, mostrati pubblicamente su Mallnest una volta approvato il negozio.",
          },
          storage: "servidor",
        },
      ],
      permissions: [],
      processedOnDevice: false,
      processingNote: {
        es: "Cuando pides sugerencias de textos con IA, el nombre, el rubro y los textos de tu tienda se envían a la API de Gemini, de Google, a través de nuestro servidor; ni {company} ni la app conservan una copia de ese pedido. Si ese servicio no está disponible, escribes los textos a mano. Para eliminar tu cuenta y la configuración de tu local, escríbenos a [{email}](mailto:{email}) desde el correo de tu cuenta.",
        en: "When you ask for AI text suggestions, your store's name, category and texts are sent to Google's Gemini API through our server; neither {company} nor the app keeps a copy of that request. If that service is unavailable, you write the texts yourself. To delete your account and your shop's configuration, write to [{email}](mailto:{email}) from your account's email.",
        pt: "Quando você pede sugestões de textos com IA, o nome, o segmento e os textos da sua loja são enviados à API Gemini, do Google, por meio do nosso servidor; nem a {company} nem o app guardam cópia desse pedido. Se esse serviço não estiver disponível, você escreve os textos à mão. Para excluir a sua conta e a configuração do seu espaço, escreva para [{email}](mailto:{email}) a partir do e-mail da sua conta.",
        it: "Quando chiedi suggerimenti di testo con l'IA, il nome, la categoria e i testi del tuo negozio vengono inviati all'API Gemini di Google tramite il nostro server; né {company} né l'app conservano una copia di quella richiesta. Se quel servizio non è disponibile, scrivi i testi a mano. Per eliminare il tuo account e la configurazione del tuo spazio, scrivici a [{email}](mailto:{email}) dall'email del tuo account.",
      },
      thirdParties: [
        {
          name: "Amazon Web Services (Cognito, Lambda, DynamoDB, S3)",
          purpose: {
            es: "Iniciar sesión y guardar tu cuenta, la conexión con tu tienda y la configuración de tu local.",
            en: "To sign in and store your account, your store connection and your shop's configuration.",
            pt: "Fazer login e guardar a sua conta, a conexão com a sua loja e a configuração do seu espaço.",
            it: "Accedere e salvare il tuo account, il collegamento al negozio e la configurazione del tuo spazio.",
          },
          policyUrl: "https://aws.amazon.com/privacy/",
        },
        {
          name: "Shopify",
          purpose: {
            es: "Conectar tu tienda y leer tus productos y colecciones con el permiso que otorgas.",
            en: "To connect your store and read your products and collections with the permission you grant.",
            pt: "Conectar a sua loja e ler os seus produtos e coleções com a permissão que você concede.",
            it: "Collegare il tuo negozio e leggere prodotti e collezioni con il permesso che concedi.",
          },
          policyUrl: "https://www.shopify.com/legal/privacy",
        },
        {
          name: "Google Gemini (API)",
          purpose: {
            es: "Generar sugerencias de textos para tu local. Google trata ese texto bajo las condiciones de su propio servicio.",
            en: "To generate text suggestions for your shop. Google processes that text under its own service terms.",
            pt: "Gerar sugestões de textos para o seu espaço. O Google trata esse texto sob as condições do próprio serviço.",
            it: "Generare suggerimenti di testo per il tuo spazio. Google tratta quel testo secondo le condizioni del proprio servizio.",
          },
          policyUrl: "https://policies.google.com/privacy",
        },
      ],
      directedToChildren: false,
      showsAds: false,
      hasInAppPurchases: false,
      minAge: 18,
    },
  },
  {
    slug: "cryptaura",
    name: {
      es: "Cryptaura",
      en: "Cryptaura",
      pt: "Cryptaura",
      it: "Cryptaura",
    },
    tagline: {
      es: "El mercado cripto en tiempo real: precios, libro de órdenes y comparación entre exchanges.",
      en: "The crypto market in real time: prices, order book and cross-exchange comparison.",
      pt: "O mercado cripto em tempo real: preços, livro de ofertas e comparação entre exchanges.",
      it: "Il mercato cripto in tempo reale: prezzi, book degli ordini e confronto tra exchange.",
    },
    description: {
      es: "Cryptaura muestra el mercado cripto en vivo, como lo ve un trader: precios, velas, el libro de órdenes con su profundidad, las últimas operaciones y el mismo par comparado entre Kraken, Coinbase y Binance. Es solo información: no compra, no vende y no guarda fondos.",
      en: "Cryptaura shows the crypto market live, the way a trader sees it: prices, candles, the order book with its depth, the latest trades and the same pair compared across Kraken, Coinbase and Binance. Information only: it doesn't buy, sell or hold funds.",
      pt: "Cryptaura mostra o mercado cripto ao vivo, como um trader o vê: preços, velas, o livro de ofertas com a sua profundidade, as últimas operações e o mesmo par comparado entre Kraken, Coinbase e Binance. É só informação: não compra, não vende e não guarda fundos.",
      it: "Cryptaura mostra il mercato cripto dal vivo, come lo vede un trader: prezzi, candele, il book degli ordini con la sua profondità, gli ultimi scambi e la stessa coppia confrontata tra Kraken, Coinbase e Binance. Solo informazione: non compra, non vende e non custodisce fondi.",
    },
    body: {
      es: [
        "Cryptaura es una ventana al mercado cripto en tiempo real. La lista de mercados se actualiza en vivo con el precio, la variación del día y el volumen de cada par, y se puede ordenar por volumen, por las mayores subas o por las mayores bajas.",
        "Al entrar a un par aparece todo lo que mira un trader: el gráfico de velas en varios intervalos, el libro de órdenes con barras de profundidad y el spread, y la cinta de las últimas operaciones. El libro se verifica mensaje a mensaje con el checksum que publica el exchange, así que lo que se ve es exactamente el estado del mercado.",
        "El mismo par se compara entre Kraken, Coinbase y Binance: dónde está la mejor compra, dónde la mejor venta y cuánta diferencia hay entre ellos.",
        "Además tiene alertas de precio, de movimiento y de spread, un panorama del mercado con el índice de miedo y codicia, y un simulador para practicar con dinero ficticio contra precios reales, con órdenes de mercado y límite. En camino: notificaciones con la app cerrada y resúmenes hechos con IA que explican qué está pasando sin recomendar nunca qué hacer. Cryptaura es solo información: no es asesoramiento financiero.",
      ],
      en: [
        "Cryptaura is a window into the crypto market in real time. The market list updates live with each pair's price, daily change and volume, and can be sorted by volume, top gainers or top losers.",
        "Open a pair and you get everything a trader looks at: a candlestick chart in several intervals, the order book with depth bars and the spread, and the tape of the latest trades. The book is verified message by message with the checksum the exchange publishes, so what you see is exactly the state of the market.",
        "The same pair is compared across Kraken, Coinbase and Binance: where the best bid is, where the best ask is and how far apart they are.",
        "It also has price, move and spread alerts, a market overview with the Fear & Greed index, and a simulator to practice with fake money against real prices, with market and limit orders. Coming next: notifications with the app closed and AI briefs that explain what is happening without ever recommending what to do. Cryptaura is information only: it is not financial advice.",
      ],
      pt: [
        "Cryptaura é uma janela para o mercado cripto em tempo real. A lista de mercados se atualiza ao vivo com o preço, a variação do dia e o volume de cada par, e pode ser ordenada por volume, pelas maiores altas ou pelas maiores baixas.",
        "Ao abrir um par aparece tudo o que um trader olha: o gráfico de velas em vários intervalos, o livro de ofertas com barras de profundidade e o spread, e a fita das últimas operações. O livro é verificado mensagem a mensagem com o checksum que a exchange publica, então o que se vê é exatamente o estado do mercado.",
        "O mesmo par é comparado entre Kraken, Coinbase e Binance: onde está a melhor compra, onde está a melhor venda e quanta diferença há entre elas.",
        "Também tem alertas de preço, de movimento e de spread, um panorama do mercado com o índice de medo e ganância, e um simulador para praticar com dinheiro fictício e preços reais, com ordens a mercado e limite. A caminho: notificações com o app fechado e resumos feitos com IA que explicam o que está acontecendo sem nunca recomendar o que fazer. Cryptaura é só informação: não é assessoria financeira.",
      ],
      it: [
        "Cryptaura è una finestra sul mercato cripto in tempo reale. L'elenco dei mercati si aggiorna dal vivo con prezzo, variazione del giorno e volume di ogni coppia, e si può ordinare per volume, per i maggiori rialzi o per i maggiori ribassi.",
        "Aprendo una coppia compare tutto quello che guarda un trader: il grafico a candele in vari intervalli, il book degli ordini con le barre di profondità e lo spread, e il nastro degli ultimi scambi. Il book viene verificato messaggio per messaggio con il checksum pubblicato dall'exchange, quindi ciò che si vede è esattamente lo stato del mercato.",
        "La stessa coppia viene confrontata tra Kraken, Coinbase e Binance: dov'è il miglior prezzo in acquisto, dove quello in vendita e quanta differenza c'è tra loro.",
        "Ha anche avvisi di prezzo, di movimento e di spread, una panoramica del mercato con l'indice di paura e avidità, e un simulatore per esercitarsi con denaro fittizio su prezzi reali, con ordini a mercato e limite. In arrivo: notifiche con l'app chiusa e riassunti fatti con l'IA che spiegano cosa sta succedendo senza mai raccomandare cosa fare. Cryptaura è solo informazione: non è consulenza finanziaria.",
      ],
    },
    claim: {
      es: "El mercado, en vivo.",
      en: "The market, live.",
      pt: "O mercado, ao vivo.",
      it: "Il mercato, dal vivo.",
    },
    category: { es: "Finanzas", en: "Finance", pt: "Finanças", it: "Finanza" },
    // Todavía no está publicada: el botón muestra "Muy pronto en Google Play".
    playStoreUrl: "",
    // Icono provisorio: el símbolo del logo, sin el texto, sobre el fondo de la app.
    icon: "/apps/cryptaura/icon.png",
    feature: "/apps/cryptaura/feature.png",
    // El fondo oscuro de la app y el dorado del logo
    accent: ["#0b0e14", "#8a5e00"],
    languages: {
      es: ["Inglés", "Español", "Portugués"],
      en: ["English", "Spanish", "Portuguese"],
      pt: ["Inglês", "Espanhol", "Português"],
      it: ["Inglese", "Spagnolo", "Portoghese"],
    },
    features: [
      {
        icon: "bolt",
        title: {
          es: "Mercados en vivo",
          en: "Live markets",
          pt: "Mercados ao vivo",
          it: "Mercati dal vivo",
        },
        description: {
          es: "Precio, variación y volumen de cada par, actualizados en tiempo real, con buscador y orden por volumen, subas o bajas.",
          en: "Price, change and volume for every pair, updated in real time, with search and sorting by volume, gainers or losers.",
          pt: "Preço, variação e volume de cada par, atualizados em tempo real, com busca e ordem por volume, altas ou baixas.",
          it: "Prezzo, variazione e volume di ogni coppia, aggiornati in tempo reale, con ricerca e ordinamento per volume, rialzi o ribassi.",
        },
      },
      {
        icon: "chart",
        title: {
          es: "Libro de órdenes y velas",
          en: "Order book and candles",
          pt: "Livro de ofertas e velas",
          it: "Book degli ordini e candele",
        },
        description: {
          es: "El libro con su profundidad y el spread, verificado con el checksum del exchange, el gráfico de velas y la cinta de operaciones.",
          en: "The book with its depth and spread, verified with the exchange's checksum, plus the candlestick chart and the trade tape.",
          pt: "O livro com a sua profundidade e o spread, verificado com o checksum da exchange, o gráfico de velas e a fita de operações.",
          it: "Il book con la sua profondità e lo spread, verificato con il checksum dell'exchange, il grafico a candele e il nastro degli scambi.",
        },
      },
      {
        icon: "search",
        title: {
          es: "Comparación entre exchanges",
          en: "Cross-exchange comparison",
          pt: "Comparação entre exchanges",
          it: "Confronto tra exchange",
        },
        description: {
          es: "El mismo par en Kraken, Coinbase y Binance: la mejor compra, la mejor venta y la diferencia entre ellos.",
          en: "The same pair on Kraken, Coinbase and Binance: the best bid, the best ask and the gap between them.",
          pt: "O mesmo par na Kraken, Coinbase e Binance: a melhor compra, a melhor venda e a diferença entre elas.",
          it: "La stessa coppia su Kraken, Coinbase e Binance: il miglior acquisto, la miglior vendita e la differenza tra loro.",
        },
      },
      {
        icon: "shield",
        title: {
          es: "Solo información",
          en: "Information only",
          pt: "Só informação",
          it: "Solo informazione",
        },
        description: {
          es: "Sin cuenta y sin conectar exchanges: no compra, no vende ni guarda fondos, y nunca recomienda qué hacer.",
          en: "No account and no exchange connection: it doesn't buy, sell or hold funds, and never recommends what to do.",
          pt: "Sem conta e sem conectar exchanges: não compra, não vende nem guarda fundos, e nunca recomenda o que fazer.",
          it: "Nessun account e nessun collegamento agli exchange: non compra, non vende né custodisce fondi, e non raccomanda mai cosa fare.",
        },
      },
    ],
    // Capturas provisorias, con la fuente demo de la app. Se reemplazan por
    // capturas reales del teléfono antes de publicar.
    screenshots: [
      {
        src: "/apps/cryptaura/01.jpg",
        alt: { es: "Lista de mercados en vivo con precio, variación y volumen, en tema oscuro", en: "Live market list with price, change and volume, in dark theme", pt: "Lista de mercados ao vivo com preço, variação e volume, no tema escuro", it: "Elenco dei mercati dal vivo con prezzo, variazione e volume, in tema scuro" },
      },
      {
        src: "/apps/cryptaura/02.jpg",
        alt: { es: "Detalle de BTC/USD con el gráfico de velas y volumen y el resumen del mercado", en: "BTC/USD detail with the candlestick and volume chart and the market brief", pt: "Detalhe de BTC/USD com o gráfico de velas e volume e o resumo do mercado", it: "Dettaglio di BTC/USD con il grafico a candele e volumi e il riassunto del mercato" },
      },
      {
        src: "/apps/cryptaura/03.jpg",
        alt: { es: "Libro de órdenes verificado con checksum, desequilibrio y profundidad del mercado", en: "Checksum-verified order book, book imbalance and market depth", pt: "Livro de ofertas verificado por checksum, desequilíbrio e profundidade do mercado", it: "Book degli ordini verificato con checksum, squilibrio e profondità del mercato" },
      },
      {
        src: "/apps/cryptaura/04.jpg",
        alt: { es: "Comparación de ETH/USD entre Kraken, Coinbase y Binance y operaciones recientes", en: "ETH/USD compared across Kraken, Coinbase and Binance, plus recent trades", pt: "Comparação de ETH/USD entre Kraken, Coinbase e Binance e operações recentes", it: "Confronto di ETH/USD tra Kraken, Coinbase e Binance e scambi recenti" },
      },
      {
        src: "/apps/cryptaura/05.jpg",
        alt: { es: "Panorama del mercado con el resumen del día y el índice de miedo y codicia", en: "Market overview with the daily brief and the Fear & Greed index", pt: "Panorama do mercado com o resumo do dia e o índice de medo e ganância", it: "Panoramica del mercato con il riassunto del giorno e l'indice di paura e avidità" },
      },
      {
        src: "/apps/cryptaura/06.jpg",
        alt: { es: "Simulador con el valor de la cuenta, posiciones y órdenes abiertas", en: "Simulator with account value, positions and open orders", pt: "Simulador com o valor da conta, posições e ordens abertas", it: "Simulatore con valore del conto, posizioni e ordini aperti" },
      },
      {
        src: "/apps/cryptaura/07.jpg",
        alt: { es: "Pantalla para operar en el simulador, en tema claro", en: "Simulator trade ticket, in light theme", pt: "Tela para operar no simulador, no tema claro", it: "Schermata per operare nel simulatore, in tema chiaro" },
      },
      {
        src: "/apps/cryptaura/08.jpg",
        alt: { es: "Alertas activas e historial de alertas disparadas", en: "Active alerts and triggered alert history", pt: "Alertas ativos e histórico de alertas disparados", it: "Avvisi attivi e storico degli avvisi scattati" },
      },
      {
        src: "/apps/cryptaura/09.jpg",
        alt: { es: "Detalle de SOL/USD en tema claro", en: "SOL/USD detail in light theme", pt: "Detalhe de SOL/USD no tema claro", it: "Dettaglio di SOL/USD in tema chiaro" },
      },
      {
        src: "/apps/cryptaura/10.jpg",
        alt: { es: "Ajustes de tema, idioma y fuente de datos", en: "Theme, language and data source settings", pt: "Ajustes de tema, idioma e fonte de dados", it: "Impostazioni di tema, lingua e fonte dei dati" },
      },
    ],
    tech: {
      intro: { es: "Cryptaura es un proyecto de datos en tiempo real: la app consume las WebSocket públicas de los exchanges y mantiene un libro de órdenes verificado mensaje a mensaje. La lógica de mercado vive en paquetes sin React y con tests, pensados para compartirse con el backend serverless, que es la fase siguiente.", en: "Cryptaura is a real-time data project: the app consumes the exchanges' public WebSockets and keeps an order book verified message by message. The market logic lives in React-free, tested packages, designed to be shared with the serverless backend, which is the next phase.", pt: "Cryptaura é um projeto de dados em tempo real: o app consome as WebSockets públicas das exchanges e mantém um livro de ofertas verificado mensagem a mensagem. A lógica de mercado fica em pacotes sem React e com testes, pensados para serem compartilhados com o backend serverless, que é a próxima fase.", it: "Cryptaura è un progetto di dati in tempo reale: l'app consuma le WebSocket pubbliche degli exchange e mantiene un book degli ordini verificato messaggio per messaggio. La logica di mercato vive in pacchetti senza React e con test, pensati per essere condivisi con il backend serverless, che è la fase successiva." },
      items: [
        { area: "app", name: "React Native + Expo + TypeScript", role: { es: "App Android con Expo Router, en un monorepo con npm workspaces y TypeScript estricto.", en: "Android app with Expo Router, in an npm workspaces monorepo with strict TypeScript.", pt: "App Android com Expo Router, em um monorepo com npm workspaces e TypeScript estrito.", it: "App Android con Expo Router, in un monorepo con npm workspaces e TypeScript rigoroso." } },
        { area: "datos", name: "Kraken WebSocket API v2", role: { es: "Fuente principal: ticker, libro de órdenes, operaciones, velas e instrumentos en tiempo real.", en: "Main source: ticker, order book, trades, candles and instruments in real time.", pt: "Fonte principal: ticker, livro de ofertas, operações, velas e instrumentos em tempo real.", it: "Fonte principale: ticker, book degli ordini, scambi, candele e strumenti in tempo reale." } },
        { area: "datos", name: "Coinbase + Binance", role: { es: "Datos de mercado públicos para comparar el mismo par entre exchanges, con cada fuente que falla aislada sin cortar la comparación.", en: "Public market data to compare the same pair across exchanges, with any failing source isolated without breaking the comparison.", pt: "Dados de mercado públicos para comparar o mesmo par entre exchanges, com cada fonte que falha isolada sem interromper a comparação.", it: "Dati di mercato pubblici per confrontare la stessa coppia tra exchange, isolando ogni fonte che non risponde senza interrompere il confronto." } },
        { area: "arquitectura", name: { es: "Libro de órdenes verificado por checksum", en: "Checksum-verified order book", pt: "Livro de ofertas verificado por checksum", it: "Book degli ordini verificato con checksum" }, role: { es: "Snapshot más actualizaciones, recorte a la profundidad suscrita y verificación CRC32 en cada mensaje; si no coincide, pide un snapshot nuevo solo.", en: "Snapshot plus updates, truncation to the subscribed depth and CRC32 verification on every message; on a mismatch it requests a fresh snapshot by itself.", pt: "Snapshot mais atualizações, corte na profundidade assinada e verificação CRC32 em cada mensagem; se não bate, pede um snapshot novo sozinho.", it: "Snapshot più aggiornamenti, taglio alla profondità sottoscritta e verifica CRC32 a ogni messaggio; se non coincide, richiede da solo un nuovo snapshot." } },
        { area: "arquitectura", name: { es: "Modelo de mercado normalizado", en: "Normalized market model", pt: "Modelo de mercado normalizado", it: "Modello di mercato normalizzato" }, role: { es: "Cada exchange tiene un adaptador hacia un modelo común; las pantallas no conocen los mensajes de ningún exchange y sumar uno es escribir un adaptador.", en: "Each exchange has an adapter to a common model; screens never see any exchange's messages, and adding one means writing an adapter.", pt: "Cada exchange tem um adaptador para um modelo comum; as telas não conhecem as mensagens de nenhuma exchange e somar uma é escrever um adaptador.", it: "Ogni exchange ha un adattatore verso un modello comune; le schermate non conoscono i messaggi di nessun exchange e aggiungerne uno significa scrivere un adattatore." } },
        { area: "arquitectura", name: { es: "Conexión resistente", en: "Resilient connection", pt: "Conexão resiliente", it: "Connessione resiliente" }, role: { es: "Reconexión con espera exponencial y variación aleatoria, detección de conexión muerta, reenvío de suscripciones y una sola conexión compartida con conteo de referencias.", en: "Reconnection with exponential backoff and jitter, stale-connection detection, resubscription, and a single shared connection with reference counting.", pt: "Reconexão com espera exponencial e variação aleatória, detecção de conexão morta, reenvio de assinaturas e uma só conexão compartilhada com contagem de referências.", it: "Riconnessione con attesa esponenziale e variazione casuale, rilevamento della connessione morta, nuove sottoscrizioni e un'unica connessione condivisa con conteggio dei riferimenti." } },
        { area: "nativo", name: { es: "Redibujado controlado", en: "Throttled rendering", pt: "Redesenho controlado", it: "Ridisegno controllato" }, role: { es: "Los datos llegan cientos de veces por segundo y la interfaz se redibuja entre 2 y 8 veces por segundo, con filas memorizadas y gráficos en react-native-svg.", en: "Data arrives hundreds of times per second and the UI redraws 2 to 8 times per second, with memoized rows and charts in react-native-svg.", pt: "Os dados chegam centenas de vezes por segundo e a interface se redesenha entre 2 e 8 vezes por segundo, com linhas memorizadas e gráficos em react-native-svg.", it: "I dati arrivano centinaia di volte al secondo e l'interfaccia si ridisegna tra 2 e 8 volte al secondo, con righe memorizzate e grafici in react-native-svg." } },
        { area: "backend", name: { es: "AWS serverless (en desarrollo)", en: "AWS serverless (in progress)", pt: "AWS serverless (em desenvolvimento)", it: "AWS serverless (in sviluppo)" }, role: { es: "Lambda, DynamoDB, EventBridge y CDK para las alertas con notificación push, la ingesta de metadatos y noticias, y la caché.", en: "Lambda, DynamoDB, EventBridge and CDK for push-notification alerts, metadata and news ingestion, and caching.", pt: "Lambda, DynamoDB, EventBridge e CDK para os alertas com notificação push, a ingestão de metadados e notícias, e o cache.", it: "Lambda, DynamoDB, EventBridge e CDK per gli avvisi con notifica push, l'acquisizione di metadati e notizie, e la cache." } },
        { area: "ia", name: { es: "Google Gemini (en desarrollo)", en: "Google Gemini (in progress)", pt: "Google Gemini (em desenvolvimento)", it: "Google Gemini (in sviluppo)" }, role: { es: "Resúmenes del mercado a partir de datos calculados, con cadena de modelos de respaldo y reglas que impiden recomendar operaciones.", en: "Market briefs built from computed data, with a chain of fallback models and rules that prevent recommending trades.", pt: "Resumos do mercado a partir de dados calculados, com cadeia de modelos de reserva e regras que impedem recomendar operações.", it: "Riassunti del mercato a partire da dati calcolati, con una catena di modelli di riserva e regole che impediscono di raccomandare operazioni." } },
        { area: "entrega", name: "Vitest", role: { es: "Tests del libro de órdenes, el checksum, la reconexión y los adaptadores, con un WebSocket simulado.", en: "Tests for the order book, checksum, reconnection and adapters, using a fake WebSocket.", pt: "Testes do livro de ofertas, do checksum, da reconexão e dos adaptadores, com um WebSocket simulado.", it: "Test del book degli ordini, del checksum, della riconnessione e degli adattatori, con un WebSocket simulato." } },
      ],
    },
    privacy: {
      updatedAt: "2026-11-02",
      // Sin cuenta y sin servidor propio por ahora: no se recolectan datos.
      collects: [],
      permissions: [],
      // Los datos de mercado vienen de los exchanges; nada tuyo sale del teléfono.
      processedOnDevice: true,
      processingNote: {
        es: "Cryptaura no tiene cuenta ni guarda datos tuyos: los pares favoritos y las preferencias quedan en el teléfono. Para mostrar el mercado, la app pide datos públicos directamente a Kraken, Coinbase y Binance; como cualquier conexión a internet, esos servicios ven la dirección IP desde la que se hace el pedido, pero no reciben ningún dato que te identifique. Ni {company} ni la app tienen servidores con información tuya.",
        en: "Cryptaura has no account and stores none of your data: favorite pairs and preferences stay on your phone. To show the market, the app requests public data directly from Kraken, Coinbase and Binance; like any internet connection, those services see the IP address the request comes from, but they receive no data that identifies you. Neither {company} nor the app has servers holding your information.",
        pt: "Cryptaura não tem conta nem guarda dados seus: os pares favoritos e as preferências ficam no telefone. Para mostrar o mercado, o app pede dados públicos diretamente à Kraken, à Coinbase e à Binance; como qualquer conexão à internet, esses serviços veem o endereço IP de onde vem o pedido, mas não recebem nenhum dado que identifique você. Nem {company} nem o app têm servidores com informações suas.",
        it: "Cryptaura non ha account e non conserva tuoi dati: le coppie preferite e le preferenze restano sul telefono. Per mostrare il mercato, l'app richiede dati pubblici direttamente a Kraken, Coinbase e Binance; come ogni connessione a internet, questi servizi vedono l'indirizzo IP da cui parte la richiesta, ma non ricevono alcun dato che ti identifichi. Né {company} né l'app hanno server con tue informazioni.",
      },
      thirdParties: [
        {
          name: "Kraken",
          purpose: {
            es: "Proveer los precios, el libro de órdenes, las operaciones y las velas en tiempo real. Solo se piden datos públicos de mercado.",
            en: "To provide real-time prices, order book, trades and candles. Only public market data is requested.",
            pt: "Fornecer os preços, o livro de ofertas, as operações e as velas em tempo real. Só são pedidos dados públicos de mercado.",
            it: "Fornire prezzi, book degli ordini, scambi e candele in tempo reale. Si richiedono solo dati pubblici di mercato.",
          },
          policyUrl: "https://www.kraken.com/legal/privacy",
        },
        {
          name: "Coinbase",
          purpose: {
            es: "Proveer precios públicos para comparar el mismo par entre exchanges.",
            en: "To provide public prices to compare the same pair across exchanges.",
            pt: "Fornecer preços públicos para comparar o mesmo par entre exchanges.",
            it: "Fornire prezzi pubblici per confrontare la stessa coppia tra exchange.",
          },
          policyUrl: "https://www.coinbase.com/legal/privacy",
        },
        {
          name: "Binance",
          purpose: {
            es: "Proveer precios públicos para comparar el mismo par entre exchanges.",
            en: "To provide public prices to compare the same pair across exchanges.",
            pt: "Fornecer preços públicos para comparar o mesmo par entre exchanges.",
            it: "Fornire prezzi pubblici per confrontare la stessa coppia tra exchange.",
          },
          policyUrl: "https://www.binance.com/en/privacy",
        },
      ],
      directedToChildren: false,
      showsAds: false,
      hasInAppPurchases: false,
      // Contenido sobre mercados cripto
      minAge: 18,
    },
  },
  {
    slug: "oraculos",
    // El italiano usa el nombre en ingles a proposito: la app no tiene ficha en
    // italiano, asi que quien la busque desde Italia va a encontrar la inglesa.
    // Inventarle un "Oracoli" seria un nombre que no existe en ningun lado.
    name: { es: "Oráculos", en: "Oracles", pt: "Oráculos", it: "Oracles" },
    tagline: {
      es: "Tarot, runas, ángeles y más. Pregunta, escucha la lectura y aprende a leer.",
      en: "Tarot, runes, angels and more. Ask, listen to the reading and learn to read.",
      pt: "Tarô, runas, anjos e mais. Pergunte, ouça a leitura e aprenda a ler.",
      it: "Tarocchi, rune, angeli e altro. Chiedi, ascolta la lettura e impara a leggere.",
    },
    description: {
      es: "Un solo lugar para consultar los oráculos más fascinantes de la historia: Tarot, Tarot Egipcio, Ángeles, Runas, I Ching y Buzios, con tiradas animadas y lecturas cuidadas.",
      // El I Ching solo se ofrece en español: su contenido todavia no esta
      // traducido, y la app no lo muestra en los otros idiomas. Por eso las
      // versiones en/pt de esta ficha no lo nombran ni cuentan seis oraculos.
      en: "A single place to consult the most fascinating oracles in history: Tarot, Egyptian Tarot, Angels, Runes and Buzios, with animated readings written with care.",
      pt: "Um só lugar para consultar os oráculos mais fascinantes da história: Tarô, Tarô Egípcio, Anjos, Runas e Buzios, com tiragens animadas e leituras caprichadas.",
      it: "Un solo posto per consultare gli oracoli più affascinanti della storia: Tarocchi, Tarocchi Egizi, Angeli, Rune e Buzios, con estrazioni animate e letture curate.",
    },
    body: {
      es: [
        "Un solo lugar para consultar los oráculos más fascinantes de la historia: Tarot, Tarot Egipcio, Ángeles, Runas, I Ching y Buzios. Haces tu pregunta, las cartas caen, las monedas giran, los caracoles se dispersan… y una lectura clara y cuidada te devuelve una mirada nueva sobre tu momento.",
        "Cada lectura se lee en pantalla y también se puede escuchar en voz alta. Y hay un consejo del día, gratis y sin gastar nada, para los días en que no hay una pregunta puntual pero igual dan ganas de mirar.",
        "Los mazos vienen con arte propio de gran calidad: cada carta, cada lámina y cada runa está ilustrada para esta app, y se pueden ampliar para verlas en detalle.",
        "No es adivinación de manual: es una experiencia visual, íntima y hermosa, pensada para acompañar la reflexión, el autoconocimiento y esos momentos en que uno necesita frenar y pensar. Es entretenimiento y aprendizaje: no adivina el futuro, no es magia y no responde sobre salud.",
      ],
      en: [
        "A single place to consult the most fascinating oracles in history: Tarot, Egyptian Tarot, Angels, Runes and Buzios. You ask your question, the cards fall, the shells scatter… and a clear, carefully written reading gives you a fresh look at your moment.",
        "Every reading is there on screen and can also be listened to out loud. And there is an advice of the day, free and costing nothing, for the days when there is no particular question but you still feel like looking.",
        "The decks come with original art of high quality: every card, every tablet and every rune is illustrated for this app, and you can zoom in to see them in detail.",
        "This isn't fortune-telling by the book: it's a visual, intimate and beautiful experience, made to support reflection, self-knowledge and those moments when you need to stop and think. It is entertainment and learning: it does not predict the future, it is not magic and it does not answer questions about health.",
      ],
      pt: [
        "Um só lugar para consultar os oráculos mais fascinantes da história: Tarô, Tarô Egípcio, Anjos, Runas e Buzios. Você faz a sua pergunta, as cartas caem, os buzios se espalham… e uma leitura clara e caprichada devolve um novo olhar sobre o seu momento.",
        "Cada leitura fica na tela e também pode ser ouvida em voz alta. E tem o conselho do dia, de graça e sem gastar nada, para os dias em que não há uma pergunta específica mas ainda assim dá vontade de olhar.",
        "Os baralhos vêm com arte própria de alta qualidade: cada carta, cada lâmina e cada runa é ilustrada para este app, e podem ser ampliadas para ver em detalhe.",
        "Não é adivinhação de manual: é uma experiência visual, íntima e bonita, pensada para acompanhar a reflexão, o autoconhecimento e aqueles momentos em que a gente precisa parar e pensar. É entretenimento e aprendizado: não adivinha o futuro, não é magia e não responde sobre saúde.",
      ],
      it: [
        "Un solo posto per consultare gli oracoli più affascinanti della storia: Tarocchi, Tarocchi Egizi, Angeli, Rune e Buzios. Fai la tua domanda, le carte cadono, le conchiglie si spargono… e una lettura chiara e curata ti restituisce uno sguardo nuovo sul tuo momento.",
        "Ogni lettura si legge sullo schermo e si può anche ascoltare ad alta voce. E c'è il consiglio del giorno, gratis e senza spendere nulla, per i giorni in cui non c'è una domanda precisa ma viene comunque voglia di guardare.",
        "I mazzi hanno un'arte propria di grande qualità: ogni carta, ogni lastra e ogni runa è illustrata per questa app, e si possono ingrandire per vederle nel dettaglio.",
        "Non è divinazione da manuale: è un'esperienza visiva, intima e bella, pensata per accompagnare la riflessione, la conoscenza di sé e quei momenti in cui si ha bisogno di fermarsi a pensare. È intrattenimento e apprendimento: non predice il futuro, non è magia e non risponde su questioni di salute.",
      ],
    },
    claim: {
      es: "Pregunta. Mira. Descubre.",
      en: "Ask. Watch. Discover.",
      pt: "Pergunte. Olhe. Descubra.",
      it: "Chiedi. Guarda. Scopri.",
    },
    category: {
      es: "Estilo de vida",
      en: "Lifestyle",
      pt: "Estilo de vida",
      it: "Stile di vita",
    },
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.imagostack.oraculos",
    icon: "/apps/oraculos/icon.png",
    feature: "/apps/oraculos/feature.png",
    // Cielo nocturno violáceo del icono
    accent: ["#1d1637", "#453169"],
    languages: {
      es: ["Español", "Inglés", "Portugués"],
      en: ["Spanish", "English", "Portuguese"],
      pt: ["Espanhol", "Inglês", "Português"],
      // Oraculos NO esta en italiano: la ficha se traduce porque el sitio ahora
      // tiene italiano, pero la lista de idiomas dice la verdad sobre la app.
      it: ["Spagnolo", "Inglese", "Portoghese"],
    },
    features: [
      {
        icon: "sparkles",
        title: {
          es: "Seis oráculos, una sola app",
          en: "Five oracles, one single app",
          pt: "Cinco oráculos, um só app",
          it: "Cinque oracoli, una sola app",
        },
        description: {
          es: "Tarot, Tarot Egipcio, Ángeles, Runas, I Ching y Buzios. Cada uno con su propia estética, su propia tirada y su propia voz.",
          en: "Tarot, Egyptian Tarot, Angels, Runes and Buzios. Each with its own look, its own spread and its own voice.",
          pt: "Tarô, Tarô Egípcio, Anjos, Runas e Buzios. Cada um com sua estética, sua tiragem e sua própria voz.",
          it: "Tarocchi, Tarocchi Egizi, Angeli, Rune e Buzios. Ognuno con la propria estetica, la propria estrazione e la propria voce.",
        },
      },
      {
        icon: "bolt",
        title: {
          es: "Tiradas vivas",
          en: "Readings that come alive",
          pt: "Tiragens vivas",
          it: "Estrazioni vive",
        },
        description: {
          es: "Animaciones cuidadas: monedas que giran, caracoles que caen, cartas que se revelan una a una.",
          en: "Carefully crafted animations: coins that spin, shells that fall, cards that reveal themselves one by one.",
          pt: "Animações caprichadas: moedas que giram, buzios que caem, cartas que se revelam uma a uma.",
          it: "Animazioni curate: monete che girano, conchiglie che cadono, carte che si rivelano una a una.",
        },
      },
      {
        icon: "palette",
        title: {
          es: "Lecturas con alma",
          en: "Readings with soul",
          pt: "Leituras com alma",
          it: "Letture con l'anima",
        },
        description: {
          es: "Interpretaciones hechas con dedicación, tratando cada símbolo con el respeto que merece.",
          en: "Interpretations made with dedication, treating every symbol with the respect it deserves.",
          pt: "Interpretações feitas com dedicação, tratando cada símbolo com o respeito que ele merece.",
          it: "Interpretazioni fatte con dedizione, trattando ogni simbolo con il rispetto che merita.",
        },
      },
      {
        icon: "device",
        title: {
          es: "Una biblioteca para aprender",
          en: "A library to learn from",
          pt: "Uma biblioteca para aprender",
          it: "Una biblioteca per imparare",
        },
        description: {
          es: "Qué significa cada carta, runa, hexagrama y odu, de dónde viene y cómo interpretarla. Y un juego corto para ver cuánto vas reconociendo.",
          en: "What every card, rune and odu means, where it comes from and how to read it. Plus a short game to see how much you are picking up.",
          pt: "O que cada carta, runa e odu significa, de onde vem e como interpretá-la. E um jogo curto para ver o quanto você vai reconhecendo.",
          it: "Che cosa significa ogni carta, runa e odu, da dove viene e come si interpreta. E un gioco breve per vedere quanto stai riconoscendo.",
        },
      },
      {
        icon: "chat",
        title: {
          es: "Leer, escuchar o compartir",
          en: "Read, listen or share",
          pt: "Ler, ouvir ou compartilhar",
          it: "Leggere, ascoltare o condividere",
        },
        description: {
          es: "Cada lectura está en pantalla y también se puede escuchar en voz alta, para cuando tienes las manos ocupadas o prefieres que te la cuenten. Y se comparte como imagen, para mandarla a quien quieras.",
          en: "Every reading is on screen and can also be listened to out loud, for when your hands are busy or you would rather be told. And it can be shared as an image, to send to whoever you like.",
          pt: "Cada leitura fica na tela e também pode ser ouvida em voz alta, para quando você está com as mãos ocupadas ou prefere que contem para você. E dá para compartilhar como imagem, para mandar a quem você quiser.",
          it: "Ogni lettura è sullo schermo e si può anche ascoltare ad alta voce, per quando hai le mani occupate o preferisci che te la raccontino. E si condivide come immagine, per mandarla a chi vuoi.",
        },
      },
      {
        icon: "shield",
        title: {
          es: "Sin suscripción y sin anuncios que interrumpan",
          en: "No subscription and no ads that interrupt",
          pt: "Sem assinatura e sem anúncios que interrompem",
          it: "Senza abbonamento e senza pubblicità che interrompe",
        },
        description: {
          es: "Tienes consultas gratis todos los días. Si se te acaban, sumas una mirando un video corto, y lo miras solo si quieres: no hay banners ni pantallas de publicidad en medio de una lectura.",
          en: "You get free readings every day. If you run out, you earn one more by watching a short video, and you only watch it if you want to: there are no banners and no ad screens in the middle of a reading.",
          pt: "Você tem consultas grátis todos os dias. Se acabarem, ganha mais uma assistindo a um vídeo curto, e assiste só se quiser: não há banners nem telas de publicidade no meio de uma leitura.",
          it: "Hai consultazioni gratuite ogni giorno. Se finiscono, ne guadagni una guardando un video breve, e lo guardi solo se vuoi: non ci sono banner né schermate pubblicitarie nel mezzo di una lettura.",
        },
      },
      {
        icon: "users",
        title: {
          es: "En tu idioma",
          en: "In your language",
          pt: "No seu idioma",
          it: "Nella tua lingua",
        },
        description: {
          // Antes prometia traducciones "no automaticas". Se cambio porque no
          // se puede sostener: el volumen de contenido obliga a traducir con
          // ayuda de maquina y la revision humana no llega a todos los idiomas.
          // Lo que si es cierto, y sigue siendo un diferencial, es que los
          // significados son de redaccion propia y no copiados de un manual.
          es: "Disponible en varios idiomas, con significados escritos por nosotros y no copiados de un manual.",
          en: "Available in several languages, with meanings written by us, not lifted from a manual.",
          pt: "Disponível em vários idiomas, com significados escritos por nós, não copiados de um manual.",
          it: "Disponibile in diverse lingue, con significati scritti da noi e non copiati da un manuale.",
        },
      },
      {
        icon: "lock",
        title: {
          es: "Diseño oscuro y elegante",
          en: "Dark, elegant design",
          pt: "Design escuro e elegante",
          it: "Design scuro ed elegante",
        },
        description: {
          es: "Hecho para disfrutarse de noche y sin cansar la vista, con tipografía y color pensados para leer tranquilo.",
          en: "Made to be enjoyed at night without tiring your eyes, with type and colour chosen for calm reading.",
          pt: "Feito para curtir à noite sem cansar a vista, com tipografia e cor pensadas para ler com calma.",
          it: "Fatto per essere goduto di notte senza stancare la vista, con caratteri e colori pensati per leggere con calma.",
        },
      },
    ],
    screenshots: [
      {
        src: "/apps/oraculos/01.jpg",
        alt: {
          es: "Selector de oráculos mostrando el Tarot, el espejo de los arcanos",
          en: "Oracle picker showing Tarot, the mirror of the arcana",
          pt: "Seletor de oráculos mostrando o Tarô, o espelho dos arcanos",
          it: "Selettore di oracoli che mostra i Tarocchi, lo specchio degli arcani",
        },
      },
      {
        src: "/apps/oraculos/02.jpg",
        alt: {
          es: "Selector de oráculos mostrando Ángeles, mensajes de lo alto",
          en: "Oracle picker showing Angels, messages from above",
          pt: "Seletor de oráculos mostrando Anjos, mensagens do alto",
          it: "Selettore di oracoli che mostra gli Angeli, messaggi dall'alto",
        },
      },
      {
        src: "/apps/oraculos/03.jpg",
        alt: {
          es: "Selector de oráculos mostrando el Egipcio, el oráculo del Nilo",
          en: "Oracle picker showing the Egyptian oracle, the oracle of the Nile",
          pt: "Seletor de oráculos mostrando o Egípcio, o oráculo do Nilo",
          it: "Selettore di oracoli che mostra l'Egizio, l'oracolo del Nilo",
        },
      },
      {
        src: "/apps/oraculos/04.jpg",
        alt: {
          es: "Selector de oráculos mostrando el I Ching, el libro de los cambios",
          en: "Oracle picker showing the I Ching, the book of changes",
          pt: "Seletor de oráculos mostrando o I Ching, o livro das mutações",
          it: "Selettore di oracoli che mostra l'I Ching, il libro dei mutamenti",
        },
      },
      {
        src: "/apps/oraculos/05.jpg",
        alt: {
          es: "Selector de oráculos mostrando las Runas, la voz del norte antiguo",
          en: "Oracle picker showing the Runes, the voice of the ancient north",
          pt: "Seletor de oráculos mostrando as Runas, a voz do norte antigo",
          it: "Selettore di oracoli che mostra le Rune, la voce dell'antico nord",
        },
      },
      {
        src: "/apps/oraculos/06.jpg",
        alt: {
          es: "Selector de oráculos mostrando Buzios, el oráculo de los cauríes",
          en: "Oracle picker showing Buzios, the oracle of the cowrie shells",
          pt: "Seletor de oráculos mostrando Buzios, o oráculo dos búzios",
          it: "Selettore di oracoli che mostra i Buzios, l'oracolo delle conchiglie cauri",
        },
      },
      {
        src: "/apps/oraculos/07.jpg",
        alt: {
          es: "Consulta a las Runas: se elige el tema —general, amor, trabajo o dinero— y se escribe la pregunta",
          en: "Consulting the Runes: pick a topic —general, love, work or money— and type your question",
          pt: "Consulta às Runas: escolha o tema —geral, amor, trabalho ou dinheiro— e escreva a pergunta",
          it: "Consultazione delle Rune: si scegle il tema —generale, amore, lavoro o denaro— e si scrive la domanda",
        },
      },
      {
        src: "/apps/oraculos/08.jpg",
        alt: {
          es: "Tirada en cruz del oráculo Egipcio, con cinco láminas de piedra y la lectura en audio",
          en: "Cross spread in the Egyptian oracle, with five stone tablets and the reading in audio",
          pt: "Tiragem em cruz do oráculo Egípcio, com cinco lâminas de pedra e a leitura em áudio",
          it: "Estrazione a croce dell'oracolo Egizio, con cinque lastre di pietra e la lettura in audio",
        },
      },
      {
        src: "/apps/oraculos/09.jpg",
        alt: {
          es: "Tirada de Buzios: los cauríes caídos en la bandeja de mimbre, con la respuesta Owani a favor",
          en: "Buzios throw: the cowrie shells fallen on the wicker tray, with the answer Owani in favour",
          pt: "Tiragem de Buzios: os búzios caídos na bandeja de vime, com a resposta Owani a favor",
          it: "Lancio dei Buzios: le conchiglie cadute sul vassoio di vimini, con la risposta Owani a favore",
        },
      },
      {
        src: "/apps/oraculos/10.jpg",
        alt: {
          es: "Biblioteca de arcanos mayores del Tarot, con El Loco, El Mago, La Sacerdotisa y el resto",
          en: "Library of Tarot major arcana, with The Fool, The Magician, The High Priestess and the rest",
          pt: "Biblioteca dos arcanos maiores do Tarô, com O Louco, O Mago, A Sacerdotisa e os demais",
          it: "Biblioteca degli arcani maggiori dei Tarocchi, con Il Matto, Il Mago, La Papessa e gli altri",
        },
      },
      {
        src: "/apps/oraculos/11.jpg",
        alt: {
          es: "Consejo del día de Ángeles: la carta del Querubín Karibu, ángel guardián",
          en: "Angels advice of the day: the card of Karibu the Cherub, guardian angel",
          pt: "Conselho do dia dos Anjos: a carta do Querubim Karibu, anjo da guarda",
          it: "Consiglio del giorno degli Angeli: la carta del Cherubino Karibu, angelo custode",
        },
      },
      {
        src: "/apps/oraculos/12.jpg",
        alt: {
          es: "Ficha de El Mago en el Tarot, con su número, las palabras clave al derecho e invertido y la lectura en voz alta",
          en: "The Magician sheet in the Tarot, with its number, upright and reversed keywords and the reading out loud",
          pt: "Ficha de O Mago no Tarô, com o seu número, as palavras-chave ao direito e invertido e a leitura em voz alta",
          it: "Scheda de Il Mago nei Tarocchi, con il suo numero, le parole chiave al diritto e al rovescio e la lettura ad alta voce",
        },
      },
      {
        src: "/apps/oraculos/13.jpg",
        alt: {
          es: "Consejo del día del Tarot: tres cartas boca abajo para elegir una",
          en: "Tarot advice of the day: three face-down cards to pick one from",
          pt: "Conselho do dia do Tarô: três cartas viradas para baixo para escolher uma",
          it: "Consiglio del giorno dei Tarocchi: tre carte coperte tra cui scegliere",
        },
      },
      {
        src: "/apps/oraculos/14.jpg",
        alt: {
          es: "Consejo del día de Ángeles: tres cartas boca abajo con el dorso de alas",
          en: "Angels advice of the day: three face-down cards with the winged back",
          pt: "Conselho do dia dos Anjos: três cartas viradas para baixo com o dorso de asas",
          it: "Consiglio del giorno degli Angeli: tre carte coperte con il dorso di ali",
        },
      },
      {
        src: "/apps/oraculos/15.jpg",
        alt: {
          es: "Biblioteca de hexagramas del I Ching, con Lo Creativo, Lo Receptivo, La Espera y el resto",
          en: "Library of I Ching hexagrams, with The Creative, The Receptive, Waiting and the rest",
          pt: "Biblioteca de hexagramas do I Ching, com O Criativo, O Receptivo, A Espera e os demais",
          it: "Biblioteca degli esagrammi dell'I Ching, con Il Creativo, Il Ricettivo, L'Attesa e gli altri",
        },
      },
      {
        src: "/apps/oraculos/16.jpg",
        alt: {
          es: "Biblioteca de runas talladas en piedra, con Fehu, Uruz, Thurisaz y el resto",
          en: "Library of runes carved in stone, with Fehu, Uruz, Thurisaz and the rest",
          pt: "Biblioteca de runas talhadas em pedra, com Fehu, Uruz, Thurisaz e as demais",
          it: "Biblioteca di rune incise nella pietra, con Fehu, Uruz, Thurisaz e le altre",
        },
      },
      {
        src: "/apps/oraculos/17.jpg",
        alt: {
          es: "La carta de El Mago ampliada: el mago con la vara en alto y los cuatro palos sobre la mesa",
          en: "The Magician card up close: the magician with his wand raised and the four suits on the table",
          pt: "A carta de O Mago ampliada: o mago com a varinha erguida e os quatro naipes sobre a mesa",
          it: "La carta de Il Mago ingrandita: il mago con la bacchetta alzata e i quattro semi sul tavolo",
        },
      },
      {
        src: "/apps/oraculos/18.jpg",
        alt: {
          es: "La carta del As de bastos ampliada: una mano sostiene una rama encendida sobre el valle",
          en: "The Ace of Wands card up close: a hand holding a burning branch above the valley",
          pt: "A carta do Ás de paus ampliada: uma mão segura um ramo em chamas sobre o vale",
          it: "La carta dell'Asso di bastoni ingrandita: una mano regge un ramo acceso sopra la valle",
        },
      },
      {
        src: "/apps/oraculos/19.jpg",
        alt: {
          es: "La carta del As de copas ampliada: una paloma sobre el cáliz del que brota el agua",
          en: "The Ace of Cups card up close: a dove above the chalice from which water pours",
          pt: "A carta do Ás de copas ampliada: uma pomba sobre o cálice de onde brota a água",
          it: "La carta dell'Asso di coppe ingrandita: una colomba sopra il calice da cui sgorga l'acqua",
        },
      },
      {
        src: "/apps/oraculos/20.jpg",
        alt: {
          es: "Carta de Ángeles ampliada: un ángel de seis alas entre nubes rosadas, con la luz en la mano",
          en: "Angels card up close: a six-winged angel among pink clouds, holding the light in his hand",
          pt: "Carta dos Anjos ampliada: um anjo de seis asas entre nuvens rosadas, com a luz na mão",
          it: "Carta degli Angeli ingrandita: un angelo dalle sei ali tra nuvole rosa, con la luce in mano",
        },
      },
      {
        src: "/apps/oraculos/21.jpg",
        alt: {
          es: "Carta de Ángeles ampliada: el arcángel Miguel con la lanza, de pie sobre el dragón",
          en: "Angels card up close: the archangel Michael with his spear, standing over the dragon",
          pt: "Carta dos Anjos ampliada: o arcanjo Miguel com a lança, de pé sobre o dragão",
          it: "Carta degli Angeli ingrandita: l'arcangelo Michele con la lancia, in piedi sul drago",
        },
      },
      {
        src: "/apps/oraculos/22.jpg",
        alt: {
          es: "Carta de Ángeles ampliada: un ángel caído con alas violetas y un tridente, entre nubes encendidas",
          en: "Angels card up close: a fallen angel with violet wings and a trident, among burning clouds",
          pt: "Carta dos Anjos ampliada: um anjo caído com asas violetas e um tridente, entre nuvens em brasa",
          it: "Carta degli Angeli ingrandita: un angelo caduto con ali viola e un tridente, tra nuvole infuocate",
        },
      },
      {
        src: "/apps/oraculos/23.jpg",
        alt: {
          es: "Lámina egipcia ampliada: Thot, con cabeza de ibis, sostiene el cayado ante una mesa de ofrendas",
          en: "Egyptian tablet up close: Thoth, ibis-headed, holding the crook before an offering table",
          pt: "Lâmina egípcia ampliada: Tot, com cabeça de íbis, segura o cajado diante de uma mesa de oferendas",
          it: "Lastra egizia ingrandita: Thot, con testa di ibis, regge il pastorale davanti a un tavolo di offerte",
        },
      },
      {
        src: "/apps/oraculos/24.jpg",
        alt: {
          es: "Lámina egipcia ampliada: una diosa sentada entre columnas de loto, leyendo con el anj en la mano",
          en: "Egyptian tablet up close: a goddess seated among lotus columns, reading with the ankh in her hand",
          pt: "Lâmina egípcia ampliada: uma deusa sentada entre colunas de lótus, lendo com o anh na mão",
          it: "Lastra egizia ingrandita: una dea seduta tra colonne di loto, che legge con l'ankh in mano",
        },
      },
      {
        src: "/apps/oraculos/25.jpg",
        alt: {
          es: "Lámina egipcia ampliada: una diosa de pie con el cetro de papiro y el anj",
          en: "Egyptian tablet up close: a standing goddess with the papyrus sceptre and the ankh",
          pt: "Lâmina egípcia ampliada: uma deusa de pé com o cetro de papiro e o anh",
          it: "Lastra egizia ingrandita: una dea in piedi con lo scettro di papiro e l'ankh",
        },
      },
      {
        src: "/apps/oraculos/26.jpg",
        alt: {
          es: "Pantalla de ayuda: los seis oráculos y qué se puede hacer en cada uno",
          en: "Help screen: the six oracles and what you can do in each of them",
          pt: "Tela de ajuda: os seis oráculos e o que se pode fazer em cada um",
          it: "Schermata di aiuto: i sei oracoli e cosa si può fare in ognuno",
        },
      },
    ],
    tech: {
      intro: { es: "Oráculos combina una app nativa con IA generativa en la nube y un plan B que corre en el teléfono. La lectura la redacta Gemini a través de un servidor propio; si no llega a tiempo, la arma un motor local, y la persona nunca ve un error.", en: "Oracles combines a native app with generative AI in the cloud and a plan B that runs on the phone. Gemini writes the reading through our own server; if it doesn't arrive in time, a local engine builds it, and the user never sees an error.", pt: "Oráculos combina um app nativo com IA generativa na nuvem e um plano B que roda no celular. O Gemini redige a leitura através de um servidor próprio; se ela não chega a tempo, um motor local a monta, e a pessoa nunca vê um erro.", it: "Oracles unisce un'app nativa con l'IA generativa nel cloud e un piano B che gira sul telefono. Gemini scrive la lettura attraverso un server proprio; se non arriva in tempo, la compone un motore locale, e l'utente non vede mai un errore." },
      items: [
        { area: "app", name: "React Native + Expo + TypeScript", role: { es: "App Android con React Navigation y estado global con Zustand.", en: "Android app with React Navigation and global state with Zustand.", pt: "App Android com React Navigation e estado global com Zustand.", it: "App Android con React Navigation e stato globale con Zustand." } },
        { area: "ia", name: "Google Gemini API", role: { es: "Redacta cada lectura a partir de la pregunta y de las piezas de la tirada. El prompt y la validación de la respuesta (formato completo, sin cortes) viven en el servidor.", en: "Writes each reading from the question and the pieces drawn. The prompt and the response validation (complete format, no truncation) live on the server.", pt: "Redige cada leitura a partir da pergunta e das peças da tiragem. O prompt e a validação da resposta (formato completo, sem cortes) ficam no servidor.", it: "Scrive ogni lettura a partire dalla domanda e dai pezzi estratti. Il prompt e la validazione della risposta (formato completo, senza tagli) vivono sul server." } },
        { area: "ia", name: { es: "Fallback local en el dispositivo", en: "On-device local fallback", pt: "Fallback local no dispositivo", it: "Fallback locale sul dispositivo" }, role: { es: "Si Gemini se queda sin cuota, no hay red o tarda más que la animación de la tirada, la lectura la arma un motor propio de la app, sin conexión y al instante. Un interruptor permite apagar la IA entera sin cambiar nada más.", en: "If Gemini runs out of quota, there's no network or it takes longer than the spread animation, the app's own engine builds the reading, offline and instantly. A switch can turn the whole AI off without changing anything else.", pt: "Se o Gemini fica sem cota, não há rede ou demora mais que a animação da tiragem, a leitura é montada por um motor próprio do app, sem conexão e na hora. Um interruptor permite desligar a IA inteira sem mudar mais nada.", it: "Se Gemini esaurisce la quota, non c'è rete o ci mette più dell'animazione dell'estrazione, la lettura la compone un motore proprio dell'app, offline e all'istante. Un interruttore permette di spegnere tutta l'IA senza cambiare nient'altro." } },
        { area: "backend", name: { es: "Next.js API Route en Vercel", en: "Next.js API Route on Vercel", pt: "Next.js API Route na Vercel", it: "Next.js API Route su Vercel" }, role: { es: "Endpoint serverless que guarda la clave de Gemini fuera del APK, con límites de uso por visitante, un techo diario global y un proyecto de Google Cloud con cuota propia.", en: "Serverless endpoint that keeps the Gemini key out of the APK, with per-visitor rate limits, a global daily cap and a Google Cloud project with its own quota.", pt: "Endpoint serverless que guarda a chave do Gemini fora do APK, com limites de uso por visitante, um teto diário global e um projeto do Google Cloud com cota própria.", it: "Endpoint serverless che tiene la chiave di Gemini fuori dall'APK, con limiti d'uso per visitatore, un tetto giornaliero globale e un progetto Google Cloud con quota propria." } },
        { area: "nativo", name: "expo-speech", role: { es: "Lectura en voz alta (text-to-speech) en el idioma de la app.", en: "Reading out loud (text-to-speech) in the app's language.", pt: "Leitura em voz alta (text-to-speech) no idioma do app.", it: "Lettura ad alta voce (text-to-speech) nella lingua dell'app." } },
        { area: "nativo", name: "react-native-view-shot + expo-sharing", role: { es: "La lectura se convierte en una imagen para compartir.", en: "The reading becomes an image to share.", pt: "A leitura vira uma imagem para compartilhar.", it: "La lettura diventa un'immagine da condividere." } },
        { area: "app", name: { es: "Animaciones y arte propio", en: "Animations and original art", pt: "Animações e arte própria", it: "Animazioni e grafica originale" }, role: { es: "Tiradas animadas con react-native-svg y máscaras, y mazos ilustrados para la app.", en: "Animated spreads with react-native-svg and masks, and decks illustrated for the app.", pt: "Tiragens animadas com react-native-svg e máscaras, e baralhos ilustrados para o app.", it: "Estrazioni animate con react-native-svg e maschere, e mazzi illustrati per l'app." } },
        { area: "app", name: "i18n", role: { es: "Español, inglés y portugués, con detección del idioma del teléfono (expo-localization).", en: "Spanish, English and Portuguese, detecting the phone's language (expo-localization).", pt: "Espanhol, inglês e português, com detecção do idioma do celular (expo-localization).", it: "Spagnolo, inglese e portoghese, con rilevamento della lingua del telefono (expo-localization)." } },
        { area: "monetizacion", name: "Google AdMob + UMP", role: { es: "Videos con recompensa y el mensaje de consentimiento de Google para la Unión Europea, el Reino Unido y Suiza.", en: "Rewarded videos and Google's consent message for the European Union, the United Kingdom and Switzerland.", pt: "Vídeos com recompensa e a mensagem de consentimento do Google para a União Europeia, o Reino Unido e a Suíça.", it: "Video con ricompensa e il messaggio di consenso di Google per l'Unione Europea, il Regno Unito e la Svizzera." } },
        { area: "entrega", name: "EAS Build", role: { es: "Builds de producción para Google Play, con variables por entorno.", en: "Production builds for Google Play, with per-environment variables.", pt: "Builds de produção para o Google Play, com variáveis por ambiente.", it: "Build di produzione per Google Play, con variabili per ambiente." } },
      ],
    },
    privacy: {
      updatedAt: "2026-08-17",
      collects: [
        {
          type: {
            // Es una sola sección: se llama Reto en español, Quiz en inglés y
            // Desafio en portugués, igual que dentro de la app.
            es: "El puntaje máximo obtenido en la sección Reto",
            en: "The best score achieved in the Quiz section",
            pt: "A pontuação máxima obtida na seção Desafio",
            it: "Il punteggio massimo ottenuto nella sezione Sfida",
          },
          purpose: {
            es: "Recordar tu mejor marca entre sesiones. Es el único dato que la app guarda: ni las preguntas que escribes ni las tiradas quedan almacenadas. La pregunta se envía a Google únicamente para redactar la lectura, como se explica en las secciones 3 y 5.",
            en: "To remember your best result between sessions. It is the only data the app stores: neither the questions you type nor the readings are kept. Your question is sent to Google solely to write the reading, as explained in sections 3 and 5.",
            pt: "Lembrar a sua melhor marca entre sessões. É o único dado que o app guarda: nem as perguntas que você escreve nem as tiragens ficam armazenadas. A pergunta é enviada ao Google apenas para redigir a leitura, como explicado nas seções 3 e 5.",
            it: "Ricordare il tuo miglior risultato tra una sessione e l'altra. È l'unico dato che l'app conserva: né le domande che scrivi né le estrazioni vengono memorizzate. La domanda viene inviata a Google soltanto per redigere la lettura, come spiegato nelle sezioni 3 e 5.",
          },
          storage: "dispositivo",
        },
      ],
      permissions: [],
      // La lectura la redacta un modelo de lenguaje en la nube, así que la
      // pregunta sale del dispositivo. No se guarda en ningún lado, pero la
      // app ya no puede afirmar que todo ocurre localmente.
      processedOnDevice: false,
      processingNote: {
        es: "Cuando haces una consulta, el texto de tu pregunta y las piezas que salieron en la tirada se envían a la API de Gemini, de Google, que redacta la lectura y la devuelve. Ese envío es puntual y ni {company} ni la app conservan una copia de tu pregunta ni de la lectura: no tenemos servidores con tus consultas. Si ese servicio no está disponible, la lectura la genera la propia app dentro de tu dispositivo, sin que nada salga de él.",
        en: "When you make a consultation, the text of your question and the pieces drawn in the spread are sent to Google's Gemini API, which writes the reading and returns it. That transmission is one-off, and neither {company} nor the app keeps a copy of your question or of the reading: we have no servers holding your consultations. If that service is unavailable, the reading is generated by the app itself on your device, with nothing leaving it.",
        pt: "Quando você faz uma consulta, o texto da sua pergunta e as peças sorteadas na tiragem são enviados à API Gemini, do Google, que redige a leitura e a devolve. Esse envio é pontual e nem a {company} nem o app guardam cópia da sua pergunta ou da leitura: não temos servidores com as suas consultas. Se esse serviço não estiver disponível, a leitura é gerada pelo próprio app dentro do seu dispositivo, sem que nada saia dele.",
        it: "Quando fai una consultazione, il testo della tua domanda e i pezzi usciti nell'estrazione vengono inviati all'API Gemini di Google, che redige la lettura e la restituisce. Quell'invio è puntuale e né {company} né l'app conservano una copia della tua domanda o della lettura: non abbiamo server con le tue consultazioni. Se quel servizio non è disponibile, la lettura viene generata dall'app stessa dentro il tuo dispositivo, senza che nulla ne esca.",
      },
      // Los videos con recompensa se sirven con AdMob, y la lectura la redacta
      // Gemini. Esto tiene que seguir coincidiendo con lo declarado en Data
      // safety de Google Play Console.
      thirdParties: [
        {
          name: "Google AdMob",
          purpose: {
            es: "Servir los videos con recompensa. Puede tratar el identificador de publicidad de tu dispositivo y datos técnicos de la sesión.",
            en: "To serve the rewarded videos. It may process your device's advertising identifier and technical session data.",
            pt: "Exibir os vídeos com recompensa. Pode tratar o identificador de publicidade do seu dispositivo e dados técnicos da sessão.",
            it: "Mostrare i video con premio. Può trattare l'identificatore pubblicitario del tuo dispositivo e dati tecnici della sessione.",
          },
          policyUrl: "https://policies.google.com/privacy",
        },
        {
          name: "Google Gemini (API)",
          purpose: {
            es: "Redactar la lectura a partir de tu pregunta y de las piezas que salieron. Google trata ese texto bajo las condiciones de su propio servicio y, en el plan gratuito que usamos hoy, puede emplear el contenido enviado y la respuesta generada para mejorar sus servicios, lo que incluye la revisión por parte de personas. Por eso te pedimos que no escribas datos que te identifiquen ni información sensible dentro de tu pregunta.",
            en: "To write the reading from your question and the pieces drawn. Google processes that text under its own service terms and, on the free plan we use today, may use the content sent and the generated response to improve its services, which includes review by people. For that reason we ask you not to type identifying details or sensitive information inside your question.",
            pt: "Redigir a leitura a partir da sua pergunta e das peças sorteadas. O Google trata esse texto sob as condições do próprio serviço e, no plano gratuito que usamos hoje, pode empregar o conteúdo enviado e a resposta gerada para melhorar seus serviços, o que inclui a revisão por pessoas. Por isso pedimos que você não escreva dados que o identifiquem nem informações sensíveis dentro da sua pergunta.",
            it: "Redigere la lettura a partire dalla tua domanda e dai pezzi usciti. Google tratta quel testo secondo le condizioni del proprio servizio e, nel piano gratuito che usiamo oggi, può impiegare il contenuto inviato e la risposta generata per migliorare i suoi servizi, cosa che include la revisione da parte di persone. Per questo ti chiediamo di non scrivere dati che ti identifichino né informazioni sensibili all'interno della tua domanda.",
          },
          policyUrl: "https://policies.google.com/privacy",
        },
      ],
      directedToChildren: false,
      // Videos con recompensa (rewarded) en algunas secciones
      showsAds: true,
      hasInAppPurchases: false,
      minAge: 18,
    },
  },
  {
    slug: "vigia",
    // "Vigia Padel", igual que en Play. En la tienda se llama asi en los cuatro
    // idiomas, y el sitio decia solo "Vigia": el titulo de la pagina no coincidia
    // con el de la ficha, y "vigia" a secas devuelve cualquier cosa. Quien la
    // busca escribe "vigia padel", y esa frase tiene que estar en el titulo.
    name: { es: "Vigia Padel", en: "Vigia Padel", pt: "Vigia Padel", it: "Vigia Padel" },
    tagline: {
      es: "Marcador de pádel y estadísticas por jugador. Sin conexión ni registro.",
      en: "Padel scoreboard and per-player stats. Works offline, no sign-up.",
      pt: "Placar de padel e estatísticas por jogador. Offline e sem cadastro.",
      it: "Segnapunti padel e statistiche per giocatore. Offline, senza account.",
    },
    description: {
      es: "Vigia convierte a cualquier persona al borde de la cancha en el estadístico de un partido de pádel profesional: tú marcas qué pasó en cada punto y la app hace el tanteo, los saques, los tie-breaks y las estadísticas de los cuatro jugadores.",
      en: "Vigia turns anyone standing by the court into the statistician of a professional padel match: you tag what happened on each point and the app handles the score, the serves, the tie-breaks and the stats for all four players.",
      pt: "Vigia transforma qualquer pessoa à beira da quadra no estatístico de uma partida de padel profissional: você marca o que aconteceu em cada ponto e o app cuida do placar, dos saques, dos tie-breaks e das estatísticas dos quatro jogadores.",
      it: "Vigia trasforma chiunque si trovi a bordo campo nello statistico di una partita di padel professionale: tu segni che cosa è successo in ogni punto e l'app si occupa del punteggio, dei servizi, dei tie-break e delle statistiche di tutti e quattro i giocatori.",
    },
    body: {
      es: [
        "Vigia convierte a cualquier persona al borde de la cancha —un entrenador, alguien del banco, un amigo— en el estadístico de un partido de pádel profesional. Tú solo marcas qué pasó en cada punto; la app hace el resto: el tanteo, quién saca, quién resta, los tie-breaks y las estadísticas de los cuatro jugadores.",
        "Al terminar, se genera una tarjeta lista para compartir por WhatsApp con el resultado y los números del partido. La misma clase de datos que ves en una transmisión profesional, ahora de tu partido del sábado.",
      ],
      en: [
        "Vigia turns anyone standing by the court —a coach, someone on the bench, a friend— into the statistician of a professional padel match. You just tag what happened on each point; the app does the rest: the score, who serves, who returns, the tie-breaks and the stats for all four players.",
        "When the match ends, it generates a card ready to share on WhatsApp with the result and the numbers. The same kind of data you see on a professional broadcast, now for your Saturday match.",
      ],
      pt: [
        "Vigia transforma qualquer pessoa à beira da quadra —um treinador, alguém do banco, um amigo— no estatístico de uma partida de padel profissional. Você só marca o que aconteceu em cada ponto; o app faz o resto: o placar, quem saca, quem devolve, os tie-breaks e as estatísticas dos quatro jogadores.",
        "No fim, é gerado um card pronto para compartilhar no WhatsApp com o resultado e os números da partida. O mesmo tipo de dado que você vê em uma transmissão profissional, agora do seu jogo de sábado.",
      ],
      it: [
        "Vigia trasforma chiunque si trovi a bordo campo —un allenatore, qualcuno in panchina, un amico— nello statistico di una partita di padel professionale. Tu segni soltanto che cosa è successo in ogni punto; l'app fa il resto: il punteggio, chi serve, chi risponde, i tie-break e le statistiche di tutti e quattro i giocatori.",
        "Alla fine viene generata una scheda pronta da condividere su WhatsApp con il risultato e i numeri della partita. Lo stesso tipo di dati che vedi in una trasmissione professionale, ora della tua partita del sabato.",
      ],
    },
    claim: {
      es: "Marca el punto. La app hace la estadística.",
      en: "Tag the point. The app does the stats.",
      pt: "Marque o ponto. O app faz a estatística.",
      it: "Segna il punto. L'app fa la statistica.",
    },
    category: { es: "Deportes", en: "Sports", pt: "Esportes", it: "Sport" },
    /**
     * La URL de la ficha en Google Play, o vacio si todavia no esta publicada.
     *
     * Con el campo vacio desaparece todo el llamado a descargar —los dos badges, la seccion
     * del final y el `installUrl` de los datos estructurados— y el chat pasa a decir que
     * todavia no esta publicada. Un boton "Descargar en Google Play" en un sitio publico que
     * da 404 es peor que no tener boton.
     *
     * El dia que Play apruebe una ficha, se pega aca su URL y vuelve solo: no hay nada mas
     * que tocar.
     */
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.imagostack.vigia",
    icon: "/apps/vigia/icon.png",
    feature: "/apps/vigia/feature.png",
    // Negro cancha + lima del logo
    accent: ["#0d1116", "#33451c"],
    languages: {
      es: ["Español", "Inglés", "Portugués", "Italiano"],
      en: ["Spanish", "English", "Portuguese", "Italian"],
      pt: ["Espanhol", "Inglês", "Português", "Italiano"],
      it: ["Spagnolo", "Inglese", "Portoghese", "Italiano"],
    },
    features: [
      {
        icon: "chart",
        title: {
          es: "Estadísticas de nivel transmisión",
          en: "Broadcast-level statistics",
          pt: "Estatísticas de nível transmissão",
          it: "Statistiche da telecronaca",
        },
        description: {
          es: "Winners, errores forzados y no forzados, aces, dobles faltas, break points y mucho más, jugador por jugador.",
          en: "Winners, forced and unforced errors, aces, double faults, break points and much more, player by player.",
          pt: "Winners, erros forçados e não forçados, aces, duplas faltas, break points e muito mais, jogador por jogador.",
          it: "Winner, errori forzati e non forzati, ace, doppi falli, break point e molto altro, giocatore per giocatore.",
        },
      },
      {
        icon: "users",
        title: {
          es: "Datos que se pueden jugar",
          en: "Stats you can actually play with",
          pt: "Dados que você leva para a quadra",
          it: "Dati che puoi portare in campo",
        },
        description: {
          es: "Con qué golpe ganas los puntos y con cuál los regalas. A cuál de los dos rivales le estás haciendo daño, y con qué. Cuántos puntos ganas sin tirar un winner, solo por hacer errar al otro.",
          en: "Which stroke wins you points and which one gives them away. Which of the two rivals you are hurting, and with what. How many points you win without hitting a winner, just by forcing the error.",
          pt: "Com qual golpe você ganha os pontos e com qual você os entrega. Em qual dos dois rivais você está fazendo estrago, e com o quê. Quantos pontos você ganha sem dar um winner, só forçando o erro do outro.",
          it: "Con quale colpo vinci i punti e con quale li regali. A quale dei due avversari stai facendo male, e con che colpo. Quanti punti vinci senza tirare un winner, solo forzando l'errore dell'altro.",
        },
      },
      {
        icon: "bolt",
        title: {
          es: "Tú solo tocas, ella deduce todo",
          en: "You just tap, it works out the rest",
          pt: "Você só toca, ele deduz tudo",
          it: "Tu tocchi soltanto, lei deduce tutto",
        },
        description: {
          es: "Marcador, saque, cambios de lado y tie-breaks se resuelven automáticamente mientras sigues el partido.",
          en: "Score, serve, side changes and tie-breaks resolve automatically while you follow the match.",
          pt: "Placar, saque, mudanças de lado e tie-breaks se resolvem automaticamente enquanto você acompanha a partida.",
          it: "Punteggio, servizio, cambi di campo e tie-break si risolvono automaticamente mentre segui la partita.",
        },
      },
      {
        icon: "sparkles",
        title: {
          es: "Se comparte y se luce",
          en: "Made to be shared",
          pt: "Feito para compartilhar",
          it: "Fatta per essere condivisa",
        },
        description: {
          es: "El resultado, los cuatro nombres, quién ganó y qué hizo cada uno con cada golpe, en una sola imagen. Se comparte en dos toques: al grupo de WhatsApp, a tus redes, a donde sea.",
          en: "The score, the four names, who won and what each player did with each stroke, in a single image. Two taps to share it: the WhatsApp group, your social feeds, wherever.",
          pt: "O placar, os quatro nomes, quem ganhou e o que cada um fez com cada golpe, em uma única imagem. Dois toques para compartilhar: no grupo do WhatsApp, nas suas redes, onde você quiser.",
          it: "Il punteggio, i quattro nomi, chi ha vinto e cosa ha fatto ognuno con ogni colpo, in una sola immagine. Due tocchi per condividerla: nel gruppo di WhatsApp, sui tuoi social, dove vuoi.",
        },
      },
      {
        icon: "device",
        title: {
          es: "Historial y evolución",
          en: "History and progress",
          pt: "Histórico e evolução",
          it: "Storico ed evoluzione",
        },
        description: {
          es: "Cada jugador acumula sus partidos y ve cómo progresa con el tiempo, métrica por métrica.",
          en: "Every player builds up their matches and sees how they progress over time, metric by metric.",
          pt: "Cada jogador acumula suas partidas e vê como evolui com o tempo, métrica por métrica.",
          it: "Ogni giocatore accumula le sue partite e vede come progredisce nel tempo, metrica per metrica.",
        },
      },
      {
        icon: "download",
        title: {
          es: "Exportar e importar",
          en: "Export and import",
          pt: "Exporta e importa",
          it: "Esportare e importare",
        },
        description: {
          es: "Tus partidos son tuyos: lleva el historial de un teléfono a otro cuando quieras.",
          en: "Your matches are yours: move your history from one phone to another whenever you want.",
          pt: "Suas partidas são suas: leve o histórico de um celular para outro quando quiser.",
          it: "Le tue partite sono tue: porta lo storico da un telefono all'altro quando vuoi.",
        },
      },
    ],
    screenshots: [
      {
        src: "/apps/vigia/01.jpeg",
        alt: {
          es: "Pantalla de inicio de Vigia con los accesos a partido nuevo, historial y jugadores",
          en: "Vigia home screen with shortcuts to new match, history and players",
          pt: "Tela inicial do Vigia com os atalhos para nova partida, histórico e jogadores",
          it: "Schermata iniziale di Vigia con gli accessi a nuova partita, storico e giocatori",
        },
      },
      {
        src: "/apps/vigia/02.jpeg",
        alt: {
          es: "Alta de un partido nuevo en Vigia: jugadores de drive y revés de cada equipo, sorteo de saque y formato de partido",
          en: "Setting up a new match in Vigia: forehand and backhand players for each team, serve draw and match format",
          pt: "Criação de uma nova partida no Vigia: jogadores de drive e esquerda de cada dupla, sorteio de saque e formato da partida",
          it: "Creazione di una nuova partita in Vigia: giocatori di diritto e di rovescio di ogni coppia, sorteggio del servizio e formato della partita",
        },
      },
      {
        src: "/apps/vigia/03.jpeg",
        alt: {
          es: "Marcado de puntos en vivo en Vigia, con winner, error forzado y no forzado para cada uno de los cuatro jugadores",
          en: "Live point tagging in Vigia, with winner, forced and unforced error for each of the four players",
          pt: "Marcação de pontos ao vivo no Vigia, com winner, erro forçado e não forçado para cada um dos quatro jogadores",
          it: "Segnalazione dei punti in diretta in Vigia, con winner, errore forzato e non forzato per ognuno dei quattro giocatori",
        },
      },
      {
        src: "/apps/vigia/04.jpeg",
        alt: {
          es: "Hoja de golpes de Vigia para anotar con qué golpe se cometió el error: remate, bandeja, víbora, volea, globo y el resto, separados por revés y derecha",
          en: "Vigia stroke sheet for recording which stroke the error was made with: smash, bandeja, víbora, volley, lob and the rest, split by backhand and forehand",
          pt: "Folha de golpes do Vigia para anotar com qual golpe o erro foi cometido: smash, bandeja, víbora, voleio, lob e os demais, separados por revés e direita",
          it: "Scheda dei colpi di Vigia per annotare con quale colpo è stato commesso l'errore: smash, bandeja, víbora, volée, pallonetto e gli altri, divisi tra rovescio e dritto",
        },
      },
      {
        src: "/apps/vigia/05.jpeg",
        alt: {
          es: "Estadísticas del partido en Vigia: errores no forzados, winners por error, break points y comparación jugador por jugador",
          en: "Match statistics in Vigia: unforced errors, winners per error, break points and a player-by-player comparison",
          pt: "Estatísticas da partida no Vigia: erros não forçados, winners por erro, break points e comparação jogador por jogador",
          it: "Statistiche della partita in Vigia: errori non forzati, winner per errore, break point e confronto giocatore per giocatore",
        },
      },
      {
        src: "/apps/vigia/06.jpeg",
        alt: {
          es: "Listado de jugadores registrados en Vigia con la cantidad de partidos de cada uno",
          en: "List of players registered in Vigia with how many matches each one has",
          pt: "Lista de jogadores cadastrados no Vigia com a quantidade de partidas de cada um",
          it: "Elenco dei giocatori registrati in Vigia con il numero di partite di ognuno",
        },
      },
      {
        src: "/apps/vigia/07.jpeg",
        alt: {
          es: "Perfil de un jugador en Vigia con su evolución en winners por error, primer saque y errores no forzados",
          en: "A player profile in Vigia showing their progress in winners per error, first serve and unforced errors",
          pt: "Perfil de um jogador no Vigia com sua evolução em winners por erro, primeiro saque e erros não forçados",
          it: "Profilo di un giocatore in Vigia con la sua evoluzione in winner per errore, primo servizio ed errori non forzati",
        },
      },
      {
        src: "/apps/vigia/08.jpeg",
        alt: {
          es: "Detalle de un error no forzado en Vigia: se elige el golpe con el que se erró —remate, bandeja, víbora, volea, globo, salida de pared— y si fue de derecha o de revés",
          en: "Unforced error detail in Vigia: pick the stroke that missed —smash, bandeja, víbora, volley, lob, wall exit— and whether it was forehand or backhand",
          pt: "Detalhe de um erro não forçado no Vigia: escolha a batida errada —smash, bandeja, víbora, voleio, lob, saída de parede— e se foi de direita ou de esquerda",
          it: "Dettaglio di un errore non forzato in Vigia: si sceglie il colpo sbagliato —smash, bandeja, víbora, volée, pallonetto, uscita dal muro— e se è stato di diritto o di rovescio",
        },
      },
      {
        src: "/apps/vigia/09.jpeg",
        alt: {
          es: "Detalle de un error forzado en Vigia: la app pregunta quién lo forzó, con qué golpe lo hizo y con qué golpe erró el rival",
          en: "Forced error detail in Vigia: the app asks who forced it, with which stroke, and which stroke the rival missed with",
          pt: "Detalhe de um erro forçado no Vigia: o app pergunta quem forçou, com qual batida e com qual batida o rival errou",
          it: "Dettaglio di un errore forzato in Vigia: l'app chiede chi lo ha forzato, con quale colpo e con quale colpo ha sbagliato l'avversario",
        },
      },
        ],
    tech: {
      intro: { es: "Vigia es una app offline-first con un motor de reglas desacoplado de la interfaz: todo el pádel —tanteo, saques, lados y tie-breaks— se deriva de un registro de eventos con funciones puras, cubiertas por tests.", en: "Vigia is an offline-first app with a rules engine decoupled from the UI: all of padel —score, serves, sides and tie-breaks— is derived from an event log with pure functions, covered by tests.", pt: "Vigia é um app offline-first com um motor de regras desacoplado da interface: todo o padel —placar, saques, lados e tie-breaks— é derivado de um registro de eventos com funções puras, cobertas por testes.", it: "Vigia è un'app offline-first con un motore di regole separato dall'interfaccia: tutto il padel —punteggio, servizi, lati e tie-break— deriva da un registro di eventi con funzioni pure, coperte da test." },
      items: [
        { area: "app", name: "React Native + Expo + TypeScript", role: { es: "App Android con un sistema de escala propio: ningún tamaño de la interfaz está escrito a mano.", en: "Android app with its own scaling system: no UI size is hard-coded.", pt: "App Android com um sistema de escala próprio: nenhum tamanho da interface é escrito à mão.", it: "App Android con un sistema di scala proprio: nessuna misura dell'interfaccia è scritta a mano." } },
        { area: "arquitectura", name: { es: "Motor de reglas con event sourcing", en: "Rules engine with event sourcing", pt: "Motor de regras com event sourcing", it: "Motore di regole con event sourcing" }, role: { es: "El partido es un log de eventos; marcador, saque, resto, cambios de lado y estadísticas por jugador salen de funciones puras que no conocen React. Deshacer un punto es quitar un evento.", en: "The match is an event log; score, server, receiver, side changes and per-player stats come from pure functions that know nothing about React. Undoing a point means removing an event.", pt: "A partida é um log de eventos; placar, saque, devolução, trocas de lado e estatísticas por jogador saem de funções puras que não conhecem o React. Desfazer um ponto é tirar um evento.", it: "La partita è un log di eventi; punteggio, servizio, risposta, cambi di lato e statistiche per giocatore escono da funzioni pure che non conoscono React. Annullare un punto significa togliere un evento." } },
        { area: "datos", name: { es: "Offline-first, sin servidor", en: "Offline-first, no server", pt: "Offline-first, sem servidor", it: "Offline-first, senza server" }, role: { es: "Partidos en archivos (expo-file-system) y plantel y preferencias en AsyncStorage. Sin cuenta ni conexión.", en: "Matches in files (expo-file-system), roster and preferences in AsyncStorage. No account or connection.", pt: "Partidas em arquivos (expo-file-system), elenco e preferências no AsyncStorage. Sem conta nem conexão.", it: "Partite in file (expo-file-system), rosa e preferenze in AsyncStorage. Senza account né connessione." } },
        { area: "datos", name: { es: "Backup e importación", en: "Backup and import", pt: "Backup e importação", it: "Backup e importazione" }, role: { es: "Exportar e importar el historial completo con expo-sharing y expo-document-picker, con validación del archivo.", en: "Export and import the full history with expo-sharing and expo-document-picker, with file validation.", pt: "Exportar e importar o histórico completo com expo-sharing e expo-document-picker, com validação do arquivo.", it: "Esportare e importare lo storico completo con expo-sharing ed expo-document-picker, con validazione del file." } },
        { area: "nativo", name: "react-native-view-shot", role: { es: "Tarjeta del partido como imagen, lista para mandar por WhatsApp.", en: "Match card as an image, ready to send on WhatsApp.", pt: "Cartão da partida como imagem, pronto para mandar pelo WhatsApp.", it: "Scheda della partita come immagine, pronta da mandare su WhatsApp." } },
        { area: "nativo", name: "expo-keep-awake + expo-haptics", role: { es: "La pantalla no se apaga durante el partido y cada toque responde con vibración.", en: "The screen stays on during the match and every tap gives haptic feedback.", pt: "A tela não apaga durante a partida e cada toque responde com vibração.", it: "Lo schermo resta acceso durante la partita e ogni tocco risponde con una vibrazione." } },
        { area: "app", name: "i18n", role: { es: "Español, inglés, portugués e italiano, con tests que verifican que los cuatro tengan las mismas claves.", en: "Spanish, English, Portuguese and Italian, with tests checking all four have the same keys.", pt: "Espanhol, inglês, português e italiano, com testes que verificam que os quatro tenham as mesmas chaves.", it: "Spagnolo, inglese, portoghese e italiano, con test che verificano che i quattro abbiano le stesse chiavi." } },
        { area: "entrega", name: "Vitest", role: { es: "Más de 170 tests sobre el motor, las estadísticas, el guardado y el backup, y un simulador que juega temporadas enteras para diseñar con datos reales.", en: "Over 170 tests on the engine, stats, storage and backup, plus a simulator that plays whole seasons to design against real data.", pt: "Mais de 170 testes sobre o motor, as estatísticas, o salvamento e o backup, e um simulador que joga temporadas inteiras para projetar com dados reais.", it: "Oltre 170 test sul motore, le statistiche, il salvataggio e il backup, e un simulatore che gioca stagioni intere per progettare con dati reali." } },
        { area: "entrega", name: "EAS Build", role: { es: "APK de prueba y .aab de producción para Google Play.", en: "Test APK and production .aab for Google Play.", pt: "APK de teste e .aab de produção para o Google Play.", it: "APK di prova e .aab di produzione per Google Play." } },
      ],
    },
    privacy: {
      updatedAt: "2026-08-17",
      collects: [
        {
          type: {
            es: "Nombres o apodos de los jugadores que cargas",
            en: "Names or nicknames of the players you add",
            pt: "Nomes ou apelidos dos jogadores que você cadastra",
            it: "Nomi o soprannomi dei giocatori che inserisci",
          },
          purpose: {
            es: "Identificar a cada jugador en el marcador, en las estadísticas y en el historial de partidos.",
            en: "To identify each player on the scoreboard, in the statistics and in the match history.",
            pt: "Identificar cada jogador no placar, nas estatísticas e no histórico de partidas.",
            it: "Identificare ogni giocatore nel punteggio, nelle statistiche e nello storico delle partite.",
          },
          storage: "dispositivo",
        },
        {
          type: {
            es: "Datos de los partidos (puntos, saques, resultados y métricas)",
            en: "Match data (points, serves, results and metrics)",
            pt: "Dados das partidas (pontos, saques, resultados e métricas)",
            it: "Dati delle partite (punti, servizi, risultati e metriche)",
          },
          purpose: {
            es: "Armar el tanteo en vivo, las estadísticas del partido y la evolución histórica de cada jugador.",
            en: "To build the live score, the match statistics and each player's progress over time.",
            pt: "Montar o placar ao vivo, as estatísticas da partida e a evolução histórica de cada jogador.",
            it: "Costruire il punteggio in diretta, le statistiche della partita e l'evoluzione storica di ogni giocatore.",
          },
          storage: "dispositivo",
        },
      ],
      permissions: [],
      processedOnDevice: true,
      // La exportacion del historial es lo unico que saca datos del sandbox de la app,
      // y lo hace la persona a mano. El texto generico de la seccion 3 no alcanza para
      // explicarlo: dice que todo vive en el dispositivo, pero no que hay una funcion
      // que produce un archivo con ese contenido y lo deja donde el usuario decida.
      processingNote: {
        es: "{app} incluye una función para exportar el historial. Al usarla, tus partidos se escriben en un archivo y tú eliges dónde guardarlo o a quién enviarlo: desde ese momento el archivo queda fuera del almacenamiento privado de la app y bajo tu control. {company} no lo recibe ni conserva una copia.",
        en: "{app} includes a feature to export your history. When you use it, your matches are written to a file and you choose where to save it or who to send it to: from that point on the file lives outside the app's private storage and under your control. {company} neither receives it nor keeps a copy.",
        pt: "O {app} inclui uma função para exportar o histórico. Ao usá-la, suas partidas são gravadas em um arquivo e você escolhe onde guardá-lo ou para quem enviá-lo: a partir desse momento o arquivo fica fora do armazenamento privado do app e sob seu controle. A {company} não o recebe nem guarda uma cópia.",
        it: "{app} include una funzione per esportare lo storico. Quando la usi, le tue partite vengono scritte in un file e sei tu a scegliere dove salvarlo o a chi inviarlo: da quel momento il file si trova fuori dall'archivio privato dell'app e sotto il tuo controllo. {company} non lo riceve né ne conserva una copia.",
      },
      thirdParties: [],
      directedToChildren: false,
      showsAds: false,
      hasInAppPurchases: false,
      minAge: null,
    },
  },
  {
    slug: "kaurix",
    name: { es: "Kaurix", en: "Kaurix", pt: "Kaurix", it: "Kaurix" },
    tagline: {
      es: "Encuentra criaturas con la cámara, cocina y hazlas crecer. Gana cartas y completa el álbum.",
      en: "Find creatures with your camera, cook, and make them grow. Earn cards and fill the album.",
      pt: "Encontre criaturas com a câmera, cozinhe e faça-as crescer. Ganhe cartas e complete o álbum.",
      it: "Trova creature con la fotocamera, cucina e falle crescere. Guadagna carte e completa l'album.",
    },
    description: {
      es: "Un juego de realidad aumentada: las criaturas aparecen sobre lo que ves con la cámara, en tu casa o donde estés. Junta ingredientes, cocina comidas y pociones, y con eso haces crecer a cada criatura desde el huevo hasta que se vuelve adulta.",
      en: "An augmented reality game: creatures appear over whatever you see through the camera, at home or wherever you are. Gather ingredients, cook meals and potions, and use them to grow each creature from the egg until it becomes an adult.",
      pt: "Um jogo de realidade aumentada: as criaturas aparecem sobre o que você vê pela câmera, em casa ou onde estiver. Junte ingredientes, cozinhe comidas e poções, e com isso faça cada criatura crescer desde o ovo até virar adulta.",
      it: "Un gioco di realtà aumentata: le creature compaiono su quello che vedi con la fotocamera, a casa o dovunque tu sia. Raccogli ingredienti, cucina cibi e pozioni, e con quelli fai crescere ogni creatura dall'uovo finché non diventa adulta.",
    },
    body: {
      es: [
        "Kaurix empieza con un huevo que no está en la pantalla: está en la habitación. El juego te avisa que hay una criatura esperando —te muestra su silueta, no dónde está— y a partir de ahí es cosa tuya: levantas el teléfono y giras despacio hasta que aparece, flotando sobre la mesa, la estantería o el patio.",
        "Encontrarlo no alcanza: hay que sostenerlo. Mientras lo mantengas en cuadro se va acercando, y si se te escapa del encuadre retrocede. Cuando lo tienes cerca, lo tocas. A veces el cascarón aguanta un par de toques antes de romperse.",
        "Lo que nace de ese huevo hay que alimentarlo, y para eso hacen falta ingredientes. Aparecen mientras miras alrededor —hay setenta y cuatro, de la fruta y la verdura a las piedras y las flores— y se juntan tocándolos.",
        "Con eso se cocina en el caldero: cincuenta y dos recetas repartidas en tres niveles. Cada una lleva exactamente tres cosas distintas, pero a partir del segundo nivel una de las tres es un plato que ya cocinaste, así que las comidas se combinan entre sí para dar otras mejores. No hay que adivinar nada: el bolso trae las recetas y dice de dónde sale cada ingrediente.",
        "Cada criatura que llega a adulta te da una carta ilustrada. El álbum tiene ocho hojas —una por criatura, con sus ocho acciones y su legendaria en el centro— y se van llenando las ocho a la vez, así que cada crecida puede destapar una página que no habías tocado. La legendaria no se sortea nunca: es lo que se gana al completar las ocho de su hoja, y completar las ocho hojas termina el juego.",
        "Funciona en cualquier Android con cámara. No usa realidad aumentada certificada a propósito: eso deja afuera a casi toda la gama media, y este juego tenía que andar en el teléfono que ya tienes. No pide cuenta y la partida vive en tu teléfono, no en un servidor.",
      ],
      en: [
        "Kaurix starts with an egg that isn't on the screen: it's in the room. The game tells you a creature is waiting — it shows you its silhouette, not where it is — and from there it's on you: you raise your phone and turn slowly until it appears, floating over the table, the shelf or the yard.",
        "Finding it isn't enough: you have to hold it. It comes closer while you keep it in frame, and backs away if it slips out. Once it's close, you tap it. Sometimes the shell takes a couple of taps before it breaks.",
        "Whatever hatches from that egg has to be fed, and that takes ingredients. They turn up while you look around — seventy-four of them, from fruit and vegetables to stones and flowers — and you gather them by tapping.",
        "Then you cook: fifty-two recipes across three levels. Each one takes exactly three different things, but from the second level on, one of the three is a dish you already cooked, so meals combine with each other into better ones. Nothing to guess: the bag holds the recipes and tells you where each ingredient comes from.",
        "Every creature that reaches adulthood gives you an illustrated card. The album has eight pages — one per creature, with its eight actions and its legendary in the middle — and all eight fill at once, so any growth can open a page you hadn't touched. The legendary is never drawn: it's what you earn by completing the eight on its page, and completing all eight pages finishes the game.",
        "It runs on any Android with a camera. It deliberately avoids certified augmented reality: that leaves out almost every mid-range phone, and this game had to work on the phone you already own. No account, no connection needed to play, and your game lives on your phone.",
      ],
      pt: [
        "Kaurix começa com um ovo que não está na tela: está no cômodo. O jogo avisa que há uma criatura esperando — mostra a silhueta dela, não onde está — e daí em diante é com você: levanta o telefone e gira devagar até que apareça, flutuando sobre a mesa, a estante ou o quintal.",
        "Encontrar não basta: é preciso sustentar. Enquanto você o mantiver no enquadramento ele se aproxima, e se escapar ele recua. Quando está perto, você toca. Às vezes a casca aguenta uns toques antes de quebrar.",
        "O que nasce desse ovo precisa ser alimentado, e para isso são necessários ingredientes. Eles surgem enquanto você olha ao redor — são setenta e quatro, da fruta e da verdura às pedras e às flores — e se juntam tocando neles.",
        "Com isso se cozinha no caldeirão: cinquenta e duas receitas em três níveis. Cada uma leva exatamente três coisas diferentes, mas a partir do segundo nível uma das três é um prato que você já cozinhou, então os pratos se combinam entre si para dar outros melhores. Não há o que adivinhar: a bolsa traz as receitas e diz de onde sai cada ingrediente.",
        "Cada criatura que chega à idade adulta lhe dá uma carta ilustrada. O álbum tem oito páginas — uma por criatura, com as suas oito ações e a lendária no centro — e as oito se enchem ao mesmo tempo, então cada crescimento pode abrir uma página que você não tinha tocado. A lendária nunca é sorteada: é o que se ganha ao completar as oito da sua página, e completar as oito páginas termina o jogo.",
        "Funciona em qualquer Android com câmera. Não usa realidade aumentada certificada de propósito: isso deixaria de fora quase toda a linha intermediária, e este jogo tinha que rodar no telefone que você já tem. Não pede conta, não precisa de conexão para jogar e o jogo fica no seu telefone.",
      ],
      it: [
        "Kaurix comincia con un uovo che non è sullo schermo: è nella stanza. Il gioco ti avvisa che c'è una creatura che aspetta — ti mostra la sua sagoma, non dove sta — e da lì in poi tocca a te: alzi il telefono e giri piano finché non compare, sospeso sopra il tavolo, la libreria o il cortile.",
        "Trovarlo non basta: bisogna tenerlo. Finché lo tieni nell'inquadratura si avvicina, e se ti sfugge indietreggia. Quando è vicino, lo tocchi. A volte il guscio regge un paio di tocchi prima di rompersi.",
        "Quello che nasce da quell'uovo va nutrito, e per farlo servono ingredienti. Compaiono mentre ti guardi intorno — sono settantaquattro, dalla frutta e la verdura alle pietre e ai fiori — e si raccolgono toccandoli.",
        "Poi si cucina nel calderone: cinquantadue ricette su tre livelli. Ognuna richiede esattamente tre cose diverse, ma dal secondo livello in poi una delle tre è un piatto che hai già cucinato, così i cibi si combinano tra loro per darne di migliori. Non c'è niente da indovinare: la borsa contiene le ricette e dice da dove viene ogni ingrediente.",
        "Ogni creatura che diventa adulta ti dà una carta illustrata. L'album ha otto pagine — una per creatura, con le sue otto azioni e la leggendaria al centro — e tutte e otto si riempiono insieme, quindi ogni crescita può aprire una pagina che non avevi toccato. La leggendaria non si sorteggia mai: è quello che si vince completando le otto della sua pagina, e completare tutte e otto le pagine finisce il gioco.",
        "Funziona su qualsiasi Android con fotocamera. Non usa la realtà aumentata certificata di proposito: taglierebbe fuori quasi tutta la fascia media, e questo gioco doveva girare sul telefono che hai già. Non chiede account, non serve connessione per giocare e la partita resta sul tuo telefono.",
      ],
    },
    claim: {
      es: "Mira alrededor. Algo se mueve.",
      en: "Look around. Something moves.",
      pt: "Olhe ao redor. Algo se move.",
      it: "Guardati intorno. Qualcosa si muove.",
    },
    category: { es: "Juegos", en: "Games", pt: "Jogos", it: "Giochi" },
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.imagostack.kaurix",
    icon: "/apps/kaurix/icon.png",
    feature: "/apps/kaurix/feature.png",
    // Verde musgo y turquesa, los dos del grafico de funciones
    accent: ["#1e3a2a", "#175a5e"],
    languages: {
      es: ["Español", "Inglés", "Portugués", "Italiano"],
      en: ["Spanish", "English", "Portuguese", "Italian"],
      pt: ["Espanhol", "Inglês", "Português", "Italiano"],
      it: ["Spagnolo", "Inglese", "Portoghese", "Italiano"],
    },
    features: [
      {
        icon: "search",
        title: {
          es: "Realidad aumentada donde estés",
          en: "Augmented reality wherever you are",
          pt: "Realidade aumentada onde você estiver",
          it: "Realtà aumentata dovunque tu sia",
        },
        description: {
          es: "Las criaturas y los ingredientes se ven sobre lo que enfoca la cámara. El juego te avisa que hay algo, pero no hacia dónde: giras hasta dar con ello, y se acerca mientras lo sostengas en cuadro.",
          en: "Creatures and ingredients appear over whatever the camera is pointing at. The game tells you something is there, but not which way: you turn until you find it, and it comes closer while you hold it in frame.",
          pt: "As criaturas e os ingredientes aparecem sobre o que a câmera enquadra. O jogo avisa que há algo, mas não para onde: você gira até dar com ele, e ele se aproxima enquanto você o mantiver no enquadramento.",
          it: "Le creature e gli ingredienti compaiono su ciò che inquadra la fotocamera. Il gioco ti avvisa che c'è qualcosa, ma non da che parte: giri finché non lo trovi, e si avvicina finché lo tieni nell'inquadratura.",
        },
      },
      {
        icon: "sparkles",
        title: {
          es: "Cocinar es medio juego",
          en: "Cooking is half the game",
          pt: "Cozinhar é metade do jogo",
          it: "Cucinare è metà del gioco",
        },
        description: {
          es: "Cada receta lleva tres cosas distintas, y desde el segundo nivel una es un plato que ya cocinaste. Cincuenta y dos entre comidas y pociones, todas consultables en el bolso.",
          en: "Every recipe takes three different things, and from the second level on, one is a dish you already cooked. Fifty-two between meals and potions, all of them listed in the bag.",
          pt: "Cada receita leva três coisas diferentes, e a partir do segundo nível uma é um prato que você já cozinhou. Cinquenta e duas entre comidas e poções, todas consultáveis na bolsa.",
          it: "Ogni ricetta richiede tre cose diverse, e dal secondo livello una è un piatto che hai già cucinato. Cinquantadue tra cibi e pozioni, tutte consultabili nella borsa.",
        },
      },
      {
        icon: "chart",
        title: {
          es: "De huevo a adulto",
          en: "From egg to adult",
          pt: "De ovo a adulto",
          it: "Da uovo ad adulto",
        },
        description: {
          es: "Cada criatura crece por tramos con lo que le das de comer. Llenar la barra no alcanza: el salto a la etapa siguiente lo abre una poción.",
          en: "Each creature grows in stages from what you feed it. Filling the bar isn't enough: a potion is what unlocks the jump to the next stage.",
          pt: "Cada criatura cresce por etapas com o que você dá de comer. Encher a barra não basta: o salto para a etapa seguinte é aberto por uma poção.",
          it: "Ogni creatura cresce a tappe con quello che le dai da mangiare. Riempire la barra non basta: il salto alla fase successiva lo apre una pozione.",
        },
      },
      {
        icon: "card",
        title: {
          es: "Un álbum que se llena",
          en: "An album that fills up",
          pt: "Um álbum que se enche",
          it: "Un album che si riempie",
        },
        description: {
          es: "Ocho hojas de nueve cartas que se llenan a la vez. Completar las ocho acciones de una hoja te da su legendaria; completar las ocho hojas termina el juego.",
          en: "Eight pages of nine cards that fill at the same time. Completing a page's eight actions earns you its legendary; completing all eight pages finishes the game.",
          pt: "Oito páginas de nove cartas que se enchem ao mesmo tempo. Completar as oito ações de uma página dá a lendária dela; completar as oito páginas termina o jogo.",
          it: "Otto pagine da nove carte che si riempiono insieme. Completare le otto azioni di una pagina dà la sua leggendaria; completare tutte e otto le pagine finisce il gioco.",
        },
      },
    ],
    screenshots: [
      {
        src: "/apps/kaurix/00.jpg",
        alt: {
          es: "Pantalla de bichos de Kaurix: las criaturas del ciclo, las encontradas a color y las que faltan en silueta",
          en: "Kaurix creatures screen: the cycle's creatures, the ones found in colour and the missing ones as silhouettes",
          pt: "Tela de bichos do Kaurix: as criaturas do ciclo, as encontradas coloridas e as que faltam em silhueta",
          it: "Schermata delle creature di Kaurix: quelle del ciclo, le trovate a colori e le mancanti in ombra",
        },
      },
      {
        src: "/apps/kaurix/01.jpg",
        alt: {
          es: "Un huevo con alas flotando sobre una biblioteca, visto a través de la cámara",
          en: "A winged egg floating above a bookshelf, seen through the camera",
          pt: "Um ovo com asas flutuando sobre uma estante de livros, visto pela câmera",
          it: "Un uovo con le ali sospeso sopra una libreria, visto attraverso la fotocamera",
        },
      },
      {
        src: "/apps/kaurix/02.jpg",
        alt: {
          es: "Un dragón bebé turquesa flotando en el pasillo de una casa, visto a través de la cámara",
          en: "A turquoise baby dragon floating in the hallway of a house, seen through the camera",
          pt: "Um dragão bebê turquesa flutuando no corredor de uma casa, visto pela câmera",
          it: "Un draghetto turchese sospeso nel corridoio di una casa, visto attraverso la fotocamera",
        },
      },
      {
        src: "/apps/kaurix/03.jpg",
        alt: {
          es: "Una cabeza de ajo, uno de los ingredientes, apareciendo en un estante de libros para recogerla",
          en: "A head of garlic, one of the ingredients, appearing on a bookshelf to be picked up",
          pt: "Uma cabeça de alho, um dos ingredientes, aparecendo em uma estante de livros para ser recolhida",
          it: "Una testa d'aglio, uno degli ingredienti, che compare su uno scaffale di libri per essere raccolta",
        },
      },
      {
        src: "/apps/kaurix/06.jpg",
        alt: {
          es: "Ficha del Dragón de musgo: la barra de crianza por tramos y la poción que falta para que crezca",
          en: "Moss Dragon sheet: the raising bar in stages and the potion still needed for it to grow",
          pt: "Ficha do Dragão de musgo: a barra de criação por etapas e a poção que falta para ele crescer",
          it: "Scheda del Drago di muschio: la barra di crescita a tappe e la pozione che manca per farlo crescere",
        },
      },
      {
        src: "/apps/kaurix/07.jpg",
        alt: {
          es: "El Gato de bruma ya adulto, con su evolución de huevo a bebé y a adulto",
          en: "The Mist Cat fully grown, with its evolution from egg to baby to adult",
          pt: "O Gato de bruma já adulto, com sua evolução de ovo a bebê e a adulto",
          it: "Il Gatto di bruma ormai adulto, con la sua evoluzione da uovo a cucciolo e ad adulto",
        },
      },
      {
        src: "/apps/kaurix/08.jpg",
        alt: {
          es: "La ruleta de premios, con criaturas e ingredientes en los gajos",
          en: "The prize wheel, with creatures and ingredients in its segments",
          pt: "A roleta de prêmios, com criaturas e ingredientes nas fatias",
          it: "La ruota dei premi, con creature e ingredienti negli spicchi",
        },
      },
      {
        src: "/apps/kaurix/09.jpg",
        alt: {
          es: "El bolso en la pestaña de comidas: platos ordenados por nivel y cuántos tienes de cada uno",
          en: "The bag on the meals tab: dishes sorted by level and how many of each you have",
          pt: "A bolsa na aba de comidas: pratos ordenados por nível e quantos você tem de cada um",
          it: "La borsa nella scheda dei cibi: piatti ordinati per livello e quanti ne hai di ciascuno",
        },
      },
      {
        src: "/apps/kaurix/10.jpg",
        alt: {
          es: "El bolso en la pestaña de pociones: frascos por nivel, apagados los que todavía no preparaste",
          en: "The bag on the potions tab: flasks by level, dimmed for the ones you haven't brewed yet",
          pt: "A bolsa na aba de poções: frascos por nível, apagados os que você ainda não preparou",
          it: "La borsa nella scheda delle pozioni: fiale per livello, spente quelle che non hai ancora preparato",
        },
      },
      {
        src: "/apps/kaurix/11.jpg",
        alt: {
          es: "La cocina: el caldero vacío y la despensa con los ingredientes que juntaste",
          en: "The kitchen: the empty cauldron and the pantry with the ingredients you gathered",
          pt: "A cozinha: o caldeirão vazio e a despensa com os ingredientes que você juntou",
          it: "La cucina: il calderone vuoto e la dispensa con gli ingredienti che hai raccolto",
        },
      },
      {
        src: "/apps/kaurix/12.jpg",
        alt: {
          es: "El álbum del Gato de bruma, con seis de sus nueve cartas conseguidas",
          en: "The Mist Cat album, with six of its nine cards collected",
          pt: "O álbum do Gato de bruma, com seis das suas nove cartas conquistadas",
          it: "L'album del Gatto di bruma, con sei delle sue nove carte ottenute",
        },
      },
      {
        src: "/apps/kaurix/13.jpg",
        alt: {
          es: "El álbum del Dragón de musgo, con seis de sus nueve cartas conseguidas",
          en: "The Moss Dragon album, with six of its nine cards collected",
          pt: "O álbum do Dragão de musgo, com seis das suas nove cartas conquistadas",
          it: "L'album del Drago di muschio, con sei delle sue nove carte ottenute",
        },
      },
      {
        src: "/apps/kaurix/14.jpg",
        alt: {
          es: "Una carta ampliada: un fénix bebé al pie de un árbol, con un castillo al fondo y el marco dorado del álbum",
          en: "A card up close: a baby phoenix at the foot of a tree, with a castle behind it and the album's golden frame",
          pt: "Uma carta ampliada: uma fênix bebê ao pé de uma árvore, com um castelo ao fundo e a moldura dourada do álbum",
          it: "Una carta ingrandita: una piccola fenice ai piedi di un albero, con un castello sullo sfondo e la cornice dorata dell'album",
        },
      },
      {
        src: "/apps/kaurix/15.jpg",
        alt: {
          es: "Una carta ampliada: un dragón bebé dormido en su nido, con el marco dorado del álbum",
          en: "A card up close: a baby dragon asleep in its nest, in the album's golden frame",
          pt: "Uma carta ampliada: um dragão bebê dormindo no ninho, com a moldura dourada do álbum",
          it: "Una carta ingrandita: un draghetto addormentato nel nido, con la cornice dorata dell'album",
        },
      },
    ],
    tech: {
      intro: { es: "Kaurix junta realidad aumentada y visión por computadora en el teléfono: un modelo de reconocimiento de imágenes entrenado para este juego, corriendo sin conexión, y una realidad aumentada pensada para funcionar en cualquier Android con cámara, no solo en la gama alta.", en: "Kaurix brings augmented reality and computer vision together on the phone: an image recognition model trained for this game, running offline, and augmented reality designed to work on any Android with a camera, not just high-end devices.", pt: "Kaurix junta realidade aumentada e visão computacional no celular: um modelo de reconhecimento de imagens treinado para este jogo, rodando sem conexão, e uma realidade aumentada pensada para funcionar em qualquer Android com câmera, não só nos topo de linha.", it: "Kaurix unisce realtà aumentata e visione artificiale sul telefono: un modello di riconoscimento di immagini addestrato per questo gioco, che gira offline, e una realtà aumentata pensata per funzionare su qualsiasi Android con fotocamera, non solo di fascia alta." },
      items: [
        { area: "app", name: "React Native + Expo + TypeScript", role: { es: "Juego Android con React Navigation y estado con Zustand.", en: "Android game with React Navigation and state with Zustand.", pt: "Jogo Android com React Navigation e estado com Zustand.", it: "Gioco Android con React Navigation e stato con Zustand." } },
        { area: "ia", name: { es: "Modelo propio de reconocimiento de imágenes", en: "Custom image recognition model", pt: "Modelo próprio de reconhecimento de imagens", it: "Modello proprio di riconoscimento delle immagini" }, role: { es: "Clasificador MobileNetV3 entrenado con TensorFlow/Keras por transfer learning y fine-tuning: 48 clases de ingredientes, exportado a TensorFlow Lite (3,3 MB) y ejecutado en el teléfono, sin enviar imágenes a ningún servidor.", en: "MobileNetV3 classifier trained with TensorFlow/Keras through transfer learning and fine-tuning: 48 ingredient classes, exported to TensorFlow Lite (3.3 MB) and run on the phone, with no images sent to any server.", pt: "Classificador MobileNetV3 treinado com TensorFlow/Keras por transfer learning e fine-tuning: 48 classes de ingredientes, exportado para TensorFlow Lite (3,3 MB) e executado no celular, sem enviar imagens a nenhum servidor.", it: "Classificatore MobileNetV3 addestrato con TensorFlow/Keras tramite transfer learning e fine-tuning: 48 classi di ingredienti, esportato in TensorFlow Lite (3,3 MB) ed eseguito sul telefono, senza inviare immagini a nessun server." } },
        { area: "ia", name: { es: "Dataset curado con CLIP", en: "Dataset curated with CLIP", pt: "Dataset curado com CLIP", it: "Dataset curato con CLIP" }, role: { es: "Pipeline propio en Python: fotos de Open Images v7 e iNaturalist (con licencia y autor registrados), filtradas con CLIP sobre PyTorch para quedarse solo con las que muestran la clase, y evaluación aparte con fotos reales tomadas con el teléfono.", en: "Own Python pipeline: photos from Open Images v7 and iNaturalist (with license and author recorded), filtered with CLIP on PyTorch to keep only those showing the class, and a separate evaluation with real photos taken with the phone.", pt: "Pipeline próprio em Python: fotos do Open Images v7 e do iNaturalist (com licença e autor registrados), filtradas com CLIP sobre PyTorch para ficar só com as que mostram a classe, e avaliação à parte com fotos reais tiradas com o celular.", it: "Pipeline proprio in Python: foto da Open Images v7 e iNaturalist (con licenza e autore registrati), filtrate con CLIP su PyTorch per tenere solo quelle che mostrano la classe, e una valutazione a parte con foto reali scattate con il telefono." } },
        { area: "nativo", name: { es: "Módulo nativo en Kotlin + ML Kit", en: "Native Kotlin module + ML Kit", pt: "Módulo nativo em Kotlin + ML Kit", it: "Modulo nativo in Kotlin + ML Kit" }, role: { es: "Módulo propio con la Expo Modules API que carga el modelo .tflite con ML Kit Image Labeling y, si falta, cae al modelo base de ML Kit. Se complementa con un análisis del color de la escena.", en: "Own module built with the Expo Modules API that loads the .tflite model with ML Kit Image Labeling and, if it's missing, falls back to ML Kit's base model. It's complemented by an analysis of the scene's color.", pt: "Módulo próprio com a Expo Modules API que carrega o modelo .tflite com o ML Kit Image Labeling e, se faltar, cai no modelo base do ML Kit. É complementado por uma análise da cor da cena.", it: "Modulo proprio con la Expo Modules API che carica il modello .tflite con ML Kit Image Labeling e, se manca, ripiega sul modello base di ML Kit. È completato da un'analisi del colore della scena." } },
        { area: "nativo", name: { es: "Realidad aumentada sin ARCore", en: "Augmented reality without ARCore", pt: "Realidade aumentada sem ARCore", it: "Realtà aumentata senza ARCore" }, role: { es: "Las criaturas se anclan a una dirección del mundo usando el giroscopio (expo-sensors) sobre la cámara en vivo (expo-camera). En equipos sin giroscopio la app elige sola otro motor. Se descartó ARCore a propósito porque deja afuera casi toda la gama media y baja.", en: "Creatures are anchored to a direction in the world using the gyroscope (expo-sensors) over the live camera (expo-camera). On devices without a gyroscope the app picks another engine by itself. ARCore was ruled out on purpose because it leaves out most mid- and low-end phones.", pt: "As criaturas se ancoram numa direção do mundo usando o giroscópio (expo-sensors) sobre a câmera ao vivo (expo-camera). Em aparelhos sem giroscópio o app escolhe sozinho outro motor. O ARCore foi descartado de propósito porque deixa de fora quase toda a linha média e básica.", it: "Le creature sono ancorate a una direzione del mondo usando il giroscopio (expo-sensors) sopra la fotocamera dal vivo (expo-camera). Sui dispositivi senza giroscopio l'app sceglie da sola un altro motore. ARCore è stato scartato di proposito perché esclude quasi tutta la fascia media e bassa." } },
        { area: "arquitectura", name: { es: "Arte 3D exportado a WebP animado", en: "3D art exported to animated WebP", pt: "Arte 3D exportada para WebP animado", it: "Grafica 3D esportata in WebP animato" }, role: { es: "El 3D se usa para producir el arte, no en tiempo de ejecución: herramientas propias en Node (ffmpeg, sharp) lo convierten en WebP animados y hojas de sprites, y un config plugin habilita el WebP animado en Android.", en: "3D is used to produce the art, not at runtime: own Node tools (ffmpeg, sharp) turn it into animated WebP and sprite sheets, and a config plugin enables animated WebP on Android.", pt: "O 3D é usado para produzir a arte, não em tempo de execução: ferramentas próprias em Node (ffmpeg, sharp) o convertem em WebP animados e folhas de sprites, e um config plugin habilita o WebP animado no Android.", it: "Il 3D serve a produrre la grafica, non in esecuzione: strumenti propri in Node (ffmpeg, sharp) lo convertono in WebP animati e fogli di sprite, e un config plugin abilita il WebP animato su Android." } },
        { area: "datos", name: { es: "Partida local", en: "Local save", pt: "Progresso local", it: "Salvataggio locale" }, role: { es: "Todo el progreso vive en el teléfono (AsyncStorage y expo-file-system), sin cuenta ni servidor.", en: "All progress lives on the phone (AsyncStorage and expo-file-system), with no account or server.", pt: "Todo o progresso fica no celular (AsyncStorage e expo-file-system), sem conta nem servidor.", it: "Tutti i progressi restano sul telefono (AsyncStorage ed expo-file-system), senza account né server." } },
        { area: "app", name: "i18n", role: { es: "Español, inglés, italiano y portugués.", en: "Spanish, English, Italian and Portuguese.", pt: "Espanhol, inglês, italiano e português.", it: "Spagnolo, inglese, italiano e portoghese." } },
        { area: "monetizacion", name: "Google AdMob + UMP", role: { es: "Videos con recompensa dentro del juego y consentimiento para la Unión Europea, el Reino Unido y Suiza.", en: "Rewarded videos inside the game and consent for the European Union, the United Kingdom and Switzerland.", pt: "Vídeos com recompensa dentro do jogo e consentimento para a União Europeia, o Reino Unido e a Suíça.", it: "Video con ricompensa nel gioco e consenso per l'Unione Europea, il Regno Unito e la Svizzera." } },
        { area: "entrega", name: "EAS Build", role: { es: "Builds de producción para Google Play, con variables por entorno.", en: "Production builds for Google Play, with per-environment variables.", pt: "Builds de produção para o Google Play, com variáveis por ambiente.", it: "Build di produzione per Google Play, con variabili per ambiente." } },
      ],
    },
    privacy: {
      updatedAt: "2026-09-03",
      collects: [],
      permissions: [
        {
          name: "Cámara (android.permission.CAMERA)",
          reason: {
            es: "Las criaturas y los ingredientes se ven sobre lo que enfoca la cámara, como si estuvieran en el lugar donde estás. La imagen se muestra en vivo y no se guarda ni se envía a ningún lado: la app no saca fotos ni las almacena.",
            en: "Creatures and ingredients appear over whatever the camera is pointing at, as if they were in the room with you. The image is shown live and never stored or sent anywhere: the app does not take or keep photos.",
            pt: "As criaturas e os ingredientes aparecem sobre o que a câmera está enquadrando, como se estivessem no lugar onde você está. A imagem é exibida ao vivo e não é guardada nem enviada a lugar nenhum: o app não tira nem armazena fotos.",
            it: "Le creature e gli ingredienti compaiono su ciò che inquadra la fotocamera, come se fossero nel posto in cui ti trovi. L'immagine viene mostrata dal vivo e non viene salvata né inviata da nessuna parte: l'app non scatta né conserva foto.",
          },
        },
      ],
      processedOnDevice: true,
      processingNote: {
        es: "La partida —las criaturas que criaste, los ingredientes que juntaste y las recetas que armaste— se guarda en el teléfono y no sale de ahí. No hay cuenta, no hay servidor y no hay copia en la nube: si desinstalas la app, esa partida se pierde. Lo único que sale del dispositivo son los pedidos de anuncios, que maneja Google.",
        en: "Your game —the creatures you raised, the ingredients you gathered and the recipes you made— is stored on your phone and never leaves it. There is no account, no server and no cloud backup: uninstalling the app loses that game. The only thing that leaves the device are ad requests, handled by Google.",
        pt: "O jogo —as criaturas que você criou, os ingredientes que juntou e as receitas que montou— fica guardado no telefone e não sai dali. Não há conta, nem servidor, nem cópia na nuvem: se você desinstalar o app, esse jogo se perde. A única coisa que sai do dispositivo são os pedidos de anúncios, que o Google administra.",
        it: "La partita —le creature che hai allevato, gli ingredienti raccolti e le ricette preparate— resta salvata sul telefono e non esce da lì. Non c'è account, né server, né copia nel cloud: disinstallando l'app quella partita si perde. L'unica cosa che esce dal dispositivo sono le richieste di annunci, gestite da Google.",
      },
      thirdParties: [
        {
          name: "Google AdMob",
          purpose: {
            es: "Mostrar los videos con los que se ganan recompensas dentro del juego. Google puede usar identificadores del dispositivo para elegir qué anuncio mostrar. En la Unión Europea, el Reino Unido y Suiza se pide tu consentimiento antes del primer anuncio.",
            en: "To show the videos that grant rewards inside the game. Google may use device identifiers to decide which ad to show. In the European Union, the United Kingdom and Switzerland your consent is requested before the first ad.",
            pt: "Exibir os vídeos com os quais se ganham recompensas dentro do jogo. O Google pode usar identificadores do dispositivo para escolher qual anúncio mostrar. Na União Europeia, no Reino Unido e na Suíça, o seu consentimento é solicitado antes do primeiro anúncio.",
            it: "Mostrare i video con cui si ottengono ricompense nel gioco. Google può usare identificatori del dispositivo per scegliere quale annuncio mostrare. Nell'Unione Europea, nel Regno Unito e in Svizzera il consenso viene richiesto prima del primo annuncio.",
          },
          policyUrl: "https://policies.google.com/privacy",
        },
      ],
      directedToChildren: false,
      showsAds: true,
      hasInAppPurchases: false,
      minAge: null,
    },
  },
  {
    slug: "bumko",
    name: { es: "Bumko", en: "Bumko", pt: "Bumko", it: "Bumko" },
    tagline: {
      es: "Stock y ventas para tu bar, pensado para la noche: un toque, una venta.",
      en: "Stock and sales for your bar, built for the night: one tap, one sale.",
      pt: "Estoque e vendas para o seu bar, pensado para a noite: um toque, uma venda.",
      it: "Magazzino e vendite per il tuo bar, pensato per la notte: un tocco, una vendita.",
    },
    description: {
      es: "Bumko lleva el stock y las ventas de un bar durante una fiesta. Cada producto es un botón grande: un toque registra la venta y descuenta el stock. Varias personas venden a la vez desde sus teléfonos, y al cerrar la noche la caja y los reportes ya están hechos.",
      en: "Bumko keeps track of a bar's stock and sales during a party. Every product is a big button: one tap records the sale and takes it off the stock. Several people sell at the same time from their phones, and when the night ends the till count and the reports are already done.",
      pt: "Bumko controla o estoque e as vendas de um bar durante uma festa. Cada produto é um botão grande: um toque registra a venda e desconta do estoque. Várias pessoas vendem ao mesmo tempo pelos seus telefones, e ao fechar a noite o caixa e os relatórios já estão prontos.",
      it: "Bumko tiene il conto del magazzino e delle vendite di un bar durante una festa. Ogni prodotto è un pulsante grande: un tocco registra la vendita e la scala dal magazzino. Più persone vendono insieme dai loro telefoni, e a fine serata la cassa e i report sono già pronti.",
    },
    body: {
      es: [
        "Bumko nació para un momento concreto: la barra de una fiesta, con poca luz, música alta y una fila que no para. Ahí no hay tiempo para menús ni confirmaciones, así que cada producto es un botón grande y de color. Un toque registra la venta al precio de lista y descuenta una unidad del stock. Nada más.",
        "Lo que no es una venta común también entra rápido. Manteniendo presionado un producto se elige otro precio o se registra un regalo, con su motivo y, si se quiere, a quién. Si el producto tiene un 2x1 cargado, aparece un botón aparte que descuenta dos unidades y cobra la promo. Y cada venta queda unos segundos a la vista para deshacerla si hubo un error.",
        "Cada noche es un evento: se abre con la caja inicial y, al cerrarlo, se cuenta la plata y Bumko muestra cuánto tendría que haber según lo registrado, cuánto sobró o cuánto faltó. Los reportes muestran lo vendido, el costo y el resultado por día, por mes o por evento, los productos más vendidos y quién registró cada venta.",
        "Está hecho para un equipo. Quien crea el bar queda como administrador y suma a su gente: el personal solo vende, y el administrador carga productos, maneja el stock, abre y cierra eventos y ve los reportes. Todos trabajan sobre los mismos datos al mismo tiempo, desde sus propios teléfonos.",
      ],
      en: [
        "Bumko was made for one specific moment: the bar at a party, with low light, loud music and a line that never stops. There's no time for menus or confirmations there, so every product is a big, colored button. One tap records the sale at list price and takes one unit off the stock. That's it.",
        "What isn't a regular sale is quick too. Pressing and holding a product lets you charge a different price or record a giveaway, with its reason and, if you want, who it went to. If the product has a 2-for-1 set, a separate button takes two units off and charges the deal. And every sale stays on screen for a few seconds so you can undo it if something went wrong.",
        "Every night is an event: it opens with the starting cash and, when you close it, you count the money and Bumko shows how much there should be according to what was recorded, and how much was over or short. The reports show sales, cost and result by day, month or event, the best-selling products and who recorded each sale.",
        "It's built for a team. Whoever creates the bar becomes its administrator and adds their people: staff can only sell, while the administrator loads products, manages stock, opens and closes events and sees the reports. Everyone works on the same data at the same time, from their own phones.",
      ],
      pt: [
        "Bumko nasceu para um momento concreto: o balcão de uma festa, com pouca luz, música alta e uma fila que não para. Ali não há tempo para menus nem confirmações, então cada produto é um botão grande e colorido. Um toque registra a venda pelo preço de tabela e desconta uma unidade do estoque. Nada mais.",
        "O que não é uma venda comum também entra rápido. Segurando um produto pressionado, você escolhe outro preço ou registra uma cortesia, com o motivo e, se quiser, para quem. Se o produto tem um 2x1 cadastrado, aparece um botão separado que desconta duas unidades e cobra a promoção. E cada venda fica alguns segundos à vista para desfazê-la se houve um erro.",
        "Cada noite é um evento: abre com o caixa inicial e, ao fechar, você conta o dinheiro e o Bumko mostra quanto deveria haver segundo o registrado, quanto sobrou ou quanto faltou. Os relatórios mostram o vendido, o custo e o resultado por dia, por mês ou por evento, os produtos mais vendidos e quem registrou cada venda.",
        "É feito para uma equipe. Quem cria o bar fica como administrador e adiciona a sua gente: a equipe só vende, e o administrador cadastra produtos, cuida do estoque, abre e fecha eventos e vê os relatórios. Todos trabalham sobre os mesmos dados ao mesmo tempo, cada um no seu telefone.",
      ],
      it: [
        "Bumko è nato per un momento preciso: il bancone di una festa, con poca luce, musica alta e una fila che non si ferma. Lì non c'è tempo per menu o conferme, quindi ogni prodotto è un pulsante grande e colorato. Un tocco registra la vendita al prezzo di listino e scala un'unità dal magazzino. Nient'altro.",
        "Anche quello che non è una vendita normale si registra in fretta. Tenendo premuto un prodotto si sceglie un altro prezzo o si registra un omaggio, con il motivo e, se si vuole, a chi. Se il prodotto ha un 2x1 impostato, compare un pulsante a parte che scala due unità e applica la promo. E ogni vendita resta visibile per qualche secondo per annullarla in caso di errore.",
        "Ogni serata è un evento: si apre con il fondo cassa e, alla chiusura, si contano i soldi e Bumko mostra quanto dovrebbe esserci secondo quanto registrato, quanto è avanzato o quanto manca. I report mostrano il venduto, il costo e il risultato per giorno, per mese o per evento, i prodotti più venduti e chi ha registrato ogni vendita.",
        "È pensato per una squadra. Chi crea il bar diventa amministratore e aggiunge la sua gente: lo staff può solo vendere, mentre l'amministratore carica i prodotti, gestisce il magazzino, apre e chiude gli eventi e vede i report. Tutti lavorano sugli stessi dati nello stesso momento, ognuno dal proprio telefono.",
      ],
    },
    claim: {
      es: "Un toque. Una venta.",
      en: "One tap. One sale.",
      pt: "Um toque. Uma venda.",
      it: "Un tocco. Una vendita.",
    },
    category: { es: "Empresa", en: "Business", pt: "Empresa", it: "Affari" },
    // Todavía no está publicada: el botón muestra "Muy pronto en Google Play".
    playStoreUrl: "",
    icon: "/apps/bumko/icon.png",
    feature: "/apps/bumko/feature.png",
    // El negro de la interfaz y el magenta de acento de la app
    accent: ["#16161f", "#a3154a"],
    languages: {
      es: ["Español", "Inglés", "Portugués"],
      en: ["Spanish", "English", "Portuguese"],
      pt: ["Espanhol", "Inglês", "Português"],
      it: ["Spagnolo", "Inglese", "Portoghese"],
    },
    features: [
      {
        icon: "bolt",
        title: {
          es: "Un toque, una venta",
          en: "One tap, one sale",
          pt: "Um toque, uma venda",
          it: "Un tocco, una vendita",
        },
        description: {
          es: "Botones grandes, mucho contraste y nada que confirmar: se usa de noche, apurado y con una mano. El stock baja solo con cada venta.",
          en: "Big buttons, high contrast and nothing to confirm: it's used at night, in a hurry and with one hand. Stock goes down by itself with every sale.",
          pt: "Botões grandes, muito contraste e nada para confirmar: é usado à noite, com pressa e com uma mão. O estoque baixa sozinho a cada venda.",
          it: "Pulsanti grandi, molto contrasto e niente da confermare: si usa di notte, di corsa e con una mano. Il magazzino scende da solo a ogni vendita.",
        },
      },
      {
        icon: "card",
        title: {
          es: "Otro precio, regalos y 2x1",
          en: "Other prices, giveaways and 2-for-1",
          pt: "Outro preço, cortesias e 2x1",
          it: "Altri prezzi, omaggi e 2x1",
        },
        description: {
          es: "Manteniendo presionado un producto se cobra otro precio o se registra un regalo con su motivo. El 2x1 tiene su propio botón y se cuenta aparte en los reportes.",
          en: "Press and hold a product to charge another price or record a giveaway with its reason. The 2-for-1 has its own button and is counted separately in the reports.",
          pt: "Segurando um produto pressionado, você cobra outro preço ou registra uma cortesia com o motivo. O 2x1 tem o seu próprio botão e é contado à parte nos relatórios.",
          it: "Tenendo premuto un prodotto si applica un altro prezzo o si registra un omaggio con il motivo. Il 2x1 ha il suo pulsante e nei report si conta a parte.",
        },
      },
      {
        icon: "chart",
        title: {
          es: "Eventos, caja y reportes",
          en: "Events, cash and reports",
          pt: "Eventos, caixa e relatórios",
          it: "Eventi, cassa e report",
        },
        description: {
          es: "Cada noche se abre con su caja inicial y se cierra con el arqueo. Los reportes muestran lo vendido, el costo y el resultado por día, mes o evento.",
          en: "Each night opens with its starting cash and closes with the till count. Reports show sales, cost and result by day, month or event.",
          pt: "Cada noite abre com o caixa inicial e fecha com a contagem. Os relatórios mostram o vendido, o custo e o resultado por dia, mês ou evento.",
          it: "Ogni serata si apre con il fondo cassa e si chiude con la conta. I report mostrano venduto, costo e risultato per giorno, mese o evento.",
        },
      },
      {
        icon: "users",
        title: {
          es: "Todo el equipo a la vez",
          en: "The whole team at once",
          pt: "A equipe toda ao mesmo tempo",
          it: "Tutta la squadra insieme",
        },
        description: {
          es: "Quien crea el bar es el administrador y suma a su gente. El personal solo vende; el administrador maneja el stock, los eventos y los reportes.",
          en: "Whoever creates the bar is its administrator and adds their people. Staff only sell; the administrator handles stock, events and reports.",
          pt: "Quem cria o bar é o administrador e adiciona a sua gente. A equipe só vende; o administrador cuida do estoque, dos eventos e dos relatórios.",
          it: "Chi crea il bar ne è l'amministratore e aggiunge la sua gente. Lo staff vende soltanto; l'amministratore gestisce magazzino, eventi e report.",
        },
      },
    ],
    // Capturas provisorias, con datos de ejemplo de un bar. Se reemplazan por
    // capturas reales del teléfono antes de publicar.
    screenshots: [
      {
        src: "/apps/bumko/01.jpg",
        alt: { es: "Pantalla de venta: cada producto es un botón grande con su precio y su stock", en: "Sell screen: every product is a big button with its price and stock", pt: "Tela de venda: cada produto é um botão grande com preço e estoque", it: "Schermata di vendita: ogni prodotto è un pulsante grande con prezzo e giacenza" },
      },
      {
        src: "/apps/bumko/02.jpg",
        alt: { es: "Opciones de un producto: precio de lista, otro precio o regalo", en: "Product options: list price, another price or giveaway", pt: "Opções de um produto: preço de tabela, outro preço ou cortesia", it: "Opzioni di un prodotto: prezzo di listino, altro prezzo o omaggio" },
      },
      {
        src: "/apps/bumko/03.jpg",
        alt: { es: "Stock: productos cargados con su stock, precio, costo y 2x1", en: "Stock: products with their stock, price, cost and 2-for-1", pt: "Estoque: produtos com estoque, preço, custo e 2x1", it: "Magazzino: prodotti con giacenza, prezzo, costo e 2x1" },
      },
      {
        src: "/apps/bumko/04.jpg",
        alt: { es: "Evento en curso con caja inicial, vendido y total, y eventos anteriores", en: "Live event with starting cash, sales and total, plus past events", pt: "Evento em andamento com caixa inicial, vendido e total, e eventos anteriores", it: "Evento in corso con fondo cassa, venduto e totale, ed eventi precedenti" },
      },
      {
        src: "/apps/bumko/05.jpg",
        alt: { es: "Reportes por día con lo vendido, el costo, el resultado y los productos más vendidos", en: "Daily reports with sales, cost, result and best-selling products", pt: "Relatórios por dia com o vendido, o custo, o resultado e os produtos mais vendidos", it: "Report giornalieri con venduto, costo, risultato e prodotti più venduti" },
      },
      {
        src: "/apps/bumko/06.jpg",
        alt: { es: "El QR del bar para sumar gente al equipo, para compartir por WhatsApp", en: "The bar's QR code to add people to the team, shared on WhatsApp", pt: "O QR do bar para adicionar pessoas à equipe, para compartilhar pelo WhatsApp", it: "Il QR del bar per aggiungere persone alla squadra, da condividere su WhatsApp" },
      },
      {
        src: "/apps/bumko/07.jpg",
        alt: { es: "Pedidos para entrar al equipo y los roles de cada persona", en: "Requests to join the team and each person's role", pt: "Pedidos para entrar na equipe e o papel de cada pessoa", it: "Richieste per entrare nella squadra e il ruolo di ogni persona" },
      },
      {
        src: "/apps/bumko/08.jpg",
        alt: { es: "Pantalla de venta en tema claro", en: "Sell screen in light theme", pt: "Tela de venda no tema claro", it: "Schermata di vendita in tema chiaro" },
      },
      {
        src: "/apps/bumko/09.jpg",
        alt: { es: "Eventos en tema claro", en: "Events in light theme", pt: "Eventos no tema claro", it: "Eventi in tema chiaro" },
      },
      {
        src: "/apps/bumko/10.jpg",
        alt: { es: "Ajustes: cuenta, bar, idioma y tema", en: "Settings: account, bar, language and theme", pt: "Ajustes: conta, bar, idioma e tema", it: "Impostazioni: account, bar, lingua e tema" },
      },
    ],
    tech: {
      intro: { es: "Bumko es una app colaborativa en tiempo real: varias personas venden a la vez sobre el mismo stock desde distintos teléfonos, con roles, seguridad del lado del servidor y una versión web que comparte la misma base.", en: "Bumko is a real-time collaborative app: several people sell at the same time from the same stock on different phones, with roles, server-side security and a web version sharing the same database.", pt: "Bumko é um app colaborativo em tempo real: várias pessoas vendem ao mesmo tempo sobre o mesmo estoque em celulares diferentes, com papéis, segurança no lado do servidor e uma versão web que compartilha a mesma base.", it: "Bumko è un'app collaborativa in tempo reale: più persone vendono allo stesso tempo sullo stesso magazzino da telefoni diversi, con ruoli, sicurezza lato server e una versione web che condivide lo stesso database." },
      items: [
        { area: "app", name: "React Native + Expo + Expo Router", role: { es: "App Android con navegación por archivos, estado con Zustand y animaciones con Reanimated.", en: "Android app with file-based routing, state with Zustand and animations with Reanimated.", pt: "App Android com navegação por arquivos, estado com Zustand e animações com Reanimated.", it: "App Android con navigazione basata su file, stato con Zustand e animazioni con Reanimated." } },
        { area: "app", name: { es: "Versión web (Vite + React)", en: "Web version (Vite + React)", pt: "Versão web (Vite + React)", it: "Versione web (Vite + React)" }, role: { es: "Desplegada en Vercel sobre el mismo proyecto de Firebase: se puede vender desde el teléfono mientras otra persona mira los reportes en la computadora.", en: "Deployed on Vercel on the same Firebase project: you can sell from the phone while someone else looks at the reports on a computer.", pt: "Publicada na Vercel sobre o mesmo projeto do Firebase: dá para vender pelo celular enquanto outra pessoa olha os relatórios no computador.", it: "Pubblicata su Vercel sullo stesso progetto Firebase: si può vendere dal telefono mentre un'altra persona guarda i report sul computer." } },
        { area: "datos", name: { es: "Cloud Firestore en tiempo real", en: "Real-time Cloud Firestore", pt: "Cloud Firestore em tempo real", it: "Cloud Firestore in tempo reale" }, role: { es: "Productos, ventas, noches con arqueo de caja y equipo por bar, sincronizados en vivo entre todos los dispositivos.", en: "Products, sales, nights with cash count and team per bar, synced live across every device.", pt: "Produtos, vendas, noites com fechamento de caixa e equipe por bar, sincronizados ao vivo entre todos os aparelhos.", it: "Prodotti, vendite, serate con chiusura di cassa e squadra per locale, sincronizzati dal vivo tra tutti i dispositivi." } },
        { area: "auth", name: "Firebase Authentication + Google Sign-In", role: { es: "Inicio de sesión nativo con la cuenta de Google.", en: "Native sign-in with a Google account.", pt: "Login nativo com a conta do Google.", it: "Accesso nativo con l'account Google." } },
        { area: "auth", name: "Firestore Security Rules", role: { es: "Cada bar es una cuenta cerrada: las reglas validan en el servidor quién es dueño y quién es personal, y nadie de otro bar puede leer ni escribir.", en: "Each bar is a closed account: the rules check on the server who is the owner and who is staff, and nobody from another bar can read or write.", pt: "Cada bar é uma conta fechada: as regras validam no servidor quem é dono e quem é equipe, e ninguém de outro bar pode ler nem escrever.", it: "Ogni locale è un account chiuso: le regole verificano sul server chi è il titolare e chi il personale, e nessuno di un altro locale può leggere o scrivere." } },
        { area: "auth", name: { es: "Eliminación de cuenta en la app", en: "In-app account deletion", pt: "Exclusão de conta no app", it: "Eliminazione dell'account nell'app" }, role: { es: "Borra la cuenta y sus datos desde la app, como pide Google Play: si es el dueño, borra el bar entero en lotes, con reautenticación cuando hace falta.", en: "Deletes the account and its data from the app, as Google Play requires: for the owner it deletes the whole bar in batches, re-authenticating when needed.", pt: "Apaga a conta e seus dados pelo app, como o Google Play exige: se for o dono, apaga o bar inteiro em lotes, com reautenticação quando precisa.", it: "Elimina l'account e i suoi dati dall'app, come richiede Google Play: per il titolare elimina l'intero locale a blocchi, con nuova autenticazione quando serve." } },
        { area: "nativo", name: "QR + deep links", role: { es: "El dueño comparte el QR del bar por WhatsApp como imagen (react-native-qrcode-svg, view-shot, expo-sharing); el personal lo escanea con expo-camera o lo abre como link para pedir entrar.", en: "The owner shares the bar's QR on WhatsApp as an image (react-native-qrcode-svg, view-shot, expo-sharing); staff scan it with expo-camera or open it as a link to ask to join.", pt: "O dono compartilha o QR do bar pelo WhatsApp como imagem (react-native-qrcode-svg, view-shot, expo-sharing); a equipe o escaneia com expo-camera ou abre como link para pedir para entrar.", it: "Il titolare condivide il QR del locale su WhatsApp come immagine (react-native-qrcode-svg, view-shot, expo-sharing); il personale lo scansiona con expo-camera o lo apre come link per chiedere di entrare." } },
        { area: "app", name: "i18n", role: { es: "Español, inglés y portugués.", en: "Spanish, English and Portuguese.", pt: "Espanhol, inglês e português.", it: "Spagnolo, inglese e portoghese." } },
      ],
    },
    privacy: {
      updatedAt: "2026-11-01",
      collects: [
        {
          type: {
            es: "Nombre, correo electrónico y foto de perfil",
            en: "Name, email address and profile photo",
            pt: "Nome, e-mail e foto de perfil",
            it: "Nome, indirizzo email e foto del profilo",
          },
          purpose: {
            es: "Los provee Google al iniciar sesión. Sirven para identificar a cada persona dentro del equipo de su bar y para registrar quién hizo cada venta.",
            en: "Provided by Google when you sign in. They identify each person within their bar's team and record who made each sale.",
            pt: "São fornecidos pelo Google ao fazer login. Servem para identificar cada pessoa dentro da equipe do seu bar e para registrar quem fez cada venda.",
            it: "Li fornisce Google all'accesso. Servono a identificare ogni persona all'interno della squadra del suo bar e a registrare chi ha fatto ogni vendita.",
          },
          storage: "servidor",
        },
        {
          type: {
            es: "Datos del negocio",
            en: "Business data",
            pt: "Dados do negócio",
            it: "Dati dell'attività",
          },
          purpose: {
            es: "Los productos con su costo, precio y stock; las ventas con su fecha, el precio cobrado y, en los regalos, el motivo y a quién (si se indica); y los eventos con su caja inicial y su arqueo. Los carga el equipo del bar para que la app funcione.",
            en: "Products with their cost, price and stock; sales with their date, the price charged and, for giveaways, the reason and who it went to (if given); and events with their starting cash and till count. The bar's team enters them so the app can work.",
            pt: "Os produtos com custo, preço e estoque; as vendas com data, preço cobrado e, nas cortesias, o motivo e para quem (se informado); e os eventos com o caixa inicial e a contagem. A equipe do bar os cadastra para que o app funcione.",
            it: "I prodotti con costo, prezzo e giacenza; le vendite con data, prezzo applicato e, per gli omaggi, il motivo e a chi (se indicato); e gli eventi con fondo cassa e conta. Li inserisce la squadra del bar perché l'app funzioni.",
          },
          storage: "servidor",
        },
        {
          type: {
            es: "Equipo y permisos",
            en: "Team and permissions",
            pt: "Equipe e permissões",
            it: "Squadra e permessi",
          },
          purpose: {
            es: "A qué bar pertenece cada persona, su rol (administrador o personal), si está habilitada y los pedidos para entrar a un bar.",
            en: "Which bar each person belongs to, their role (administrator or staff), whether they are enabled and the requests to join a bar.",
            pt: "A qual bar cada pessoa pertence, o seu papel (administrador ou equipe), se está habilitada e os pedidos para entrar em um bar.",
            it: "A quale bar appartiene ogni persona, il suo ruolo (amministratore o staff), se è abilitata e le richieste per entrare in un bar.",
          },
          storage: "servidor",
        },
      ],
      permissions: [
        {
          name: "Cámara (android.permission.CAMERA)",
          reason: {
            es: "Solo se usa para leer el código QR que muestra el administrador de un bar cuando quieres pedir entrar a su equipo. La imagen no se guarda ni se envía a ningún lado.",
            en: "It is only used to read the QR code a bar's administrator shows you when you want to ask to join their team. The image is never stored or sent anywhere.",
            pt: "É usada apenas para ler o código QR que o administrador de um bar mostra quando você quer pedir para entrar na equipe. A imagem não é guardada nem enviada a lugar nenhum.",
            it: "Si usa solo per leggere il codice QR che ti mostra l'amministratore di un bar quando vuoi chiedere di entrare nella sua squadra. L'immagine non viene salvata né inviata da nessuna parte.",
          },
        },
      ],
      processedOnDevice: false,
      processingNote: {
        es: "Bumko es una herramienta de trabajo en equipo: para que varias personas vendan a la vez sobre el mismo stock, los datos del bar se guardan en **Google Firebase** y no en el teléfono. Cada bar es una cuenta cerrada: sus datos los ven solo las personas de su equipo, según su rol —el personal registra ventas y el administrador ve todo, incluidos los reportes y quién registró cada venta—, y nadie de otro bar puede verlos.",
        en: "Bumko is a teamwork tool: so that several people can sell at the same time from the same stock, the bar's data is stored in **Google Firebase** rather than on the phone. Each bar is a closed account: only the people on its team can see its data, according to their role —staff record sales and the administrator sees everything, including the reports and who recorded each sale— and nobody from another bar can see it.",
        pt: "Bumko é uma ferramenta de trabalho em equipe: para que várias pessoas vendam ao mesmo tempo sobre o mesmo estoque, os dados do bar ficam guardados no **Google Firebase** e não no telefone. Cada bar é uma conta fechada: os seus dados só são vistos pelas pessoas da sua equipe, conforme o papel de cada uma —a equipe registra vendas e o administrador vê tudo, inclusive os relatórios e quem registrou cada venda—, e ninguém de outro bar pode vê-los.",
        it: "Bumko è uno strumento di lavoro di squadra: perché più persone possano vendere insieme sullo stesso magazzino, i dati del bar sono salvati su **Google Firebase** e non sul telefono. Ogni bar è un account chiuso: i suoi dati li vedono solo le persone della sua squadra, secondo il ruolo —lo staff registra le vendite e l'amministratore vede tutto, compresi i report e chi ha registrato ogni vendita— e nessuno di un altro bar può vederli.",
      },
      thirdParties: [
        {
          name: "Google Firebase (Authentication y Cloud Firestore)",
          purpose: {
            es: "Iniciar sesión y guardar los datos del bar para que el equipo los comparta en tiempo real.",
            en: "To sign in and store the bar's data so the team can share it in real time.",
            pt: "Fazer login e guardar os dados do bar para que a equipe os compartilhe em tempo real.",
            it: "Accedere e salvare i dati del bar perché la squadra li condivida in tempo reale.",
          },
          policyUrl: "https://firebase.google.com/support/privacy",
        },
        {
          name: "Google Sign-In",
          purpose: {
            es: "Iniciar sesión con tu cuenta de Google. Google nos comparte tu nombre, tu correo y tu foto de perfil, y nada más.",
            en: "To sign in with your Google account. Google shares your name, email and profile photo with us, and nothing else.",
            pt: "Fazer login com a sua conta do Google. O Google compartilha conosco o seu nome, o seu e-mail e a sua foto de perfil, e nada mais.",
            it: "Accedere con il tuo account Google. Google ci condivide il tuo nome, la tua email e la tua foto del profilo, e nient'altro.",
          },
          policyUrl: "https://policies.google.com/privacy",
        },
      ],
      directedToChildren: false,
      showsAds: false,
      hasInAppPurchases: false,
      // Herramienta de trabajo para bares
      minAge: 18,
    },
  },
];

export function getApp(slug: string): App | undefined {
  return apps.find((app) => app.slug === slug);
}

/**
 * Las apps que se muestran.
 *
 * Todo lo que arma un listado usa ESTA y no `apps`: la home, /apps, el pie, el
 * formulario de contacto, las "otras apps" de cada ficha y lo que sabe el chat.
 * `apps` queda para lo que tiene que alcanzar también a las ocultas, que hoy es
 * una sola cosa: su página de privacidad.
 */
export const appsVisibles: App[] = apps.filter((app) => !app.oculta);

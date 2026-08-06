import type { IconName } from "@/components/icons";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CATÁLOGO DE APPS
 * ─────────────────────────────────────────────────────────────────────────────
 * Única fuente de verdad de las apps. A partir de este array se generan solas:
 *
 *   • La grilla del home y de /apps
 *   • La ficha /apps/<slug> con su galería de capturas
 *   • La política de privacidad por app /apps/<slug>/privacidad
 *     (la URL que hay que pegar en la ficha de Google Play Console)
 *   • El sitemap.xml
 *
 * AGREGAR UNA APP: copiá un objeto, cambiá el `slug` y listo. No hay que tocar
 * ninguna otra parte del sitio.
 *
 * AGREGAR CAPTURAS: poné los archivos en public/apps/<slug>/ y listalos en
 * `screenshots`. Si el array queda vacío, la ficha muestra marcos de teléfono
 * como placeholder en lugar de imágenes rotas.
 *
 * La primera captura (`screenshots[0]`) es la que se usa en las tarjetas y en
 * el hero del home, así que conviene que sea la más representativa.
 */

export type Screenshot = {
  /** Ruta pública, ej: "/apps/vigia/01.jpeg" */
  src: string;
  /** Descripción de la pantalla (accesibilidad + SEO) */
  alt: string;
};

export type AppFeature = {
  icon: IconName;
  title: string;
  description: string;
};

/** Un tipo de dato que la app maneja, en los términos de Google Play. */
export type DataPoint = {
  /** Ej: "Nombres de los jugadores" */
  type: string;
  /** Para qué se usa */
  purpose: string;
  /** Dónde vive el dato */
  storage: "dispositivo" | "servidor";
};

export type AppPermission = {
  /** Ej: "Notificaciones (android.permission.POST_NOTIFICATIONS)" */
  name: string;
  /** Por qué la app lo necesita */
  reason: string;
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
  /** Servicios de terceros con los que se comparten datos. */
  thirdParties: { name: string; purpose: string; policyUrl: string }[];
  /** ¿Está dirigida a menores de 13 años? (Families Policy de Google Play) */
  directedToChildren: boolean;
  /** ¿Muestra publicidad? */
  showsAds: boolean;
  /** ¿Tiene compras dentro de la app? */
  hasInAppPurchases: boolean;
  /** Edad mínima recomendada. null = para todo público. */
  minAge: number | null;
};

export type App = {
  slug: string;
  name: string;
  /** Frase corta bajo el nombre */
  tagline: string;
  /** Un párrafo; se usa también como meta description de la ficha */
  description: string;
  /** Descripción larga: un string por párrafo */
  body: string[];
  /** Cierre corto, tipo claim. Vacío para omitirlo. */
  claim: string;
  /** Categoría de Google Play */
  category: string;
  /** URL de la ficha en Google Play. Vacío = todavía no publicada. */
  playStoreUrl: string;
  /** Icono cuadrado, ej "/apps/vigia/icon.png". Vacío = monograma con el degradado. */
  icon: string;
  /** Par de colores del degradado de la app (hex) */
  accent: [string, string];
  /** Idiomas disponibles */
  languages: string[];
  features: AppFeature[];
  screenshots: Screenshot[];
  privacy: AppPrivacy;
};

export const apps: App[] = [
  {
    slug: "vigia",
    name: "Vigía",
    tagline: "El que ve todo desde afuera de la cancha",
    description:
      "Vigía convierte a cualquier persona al borde de la cancha en el estadístico de un partido de pádel profesional: vos marcás qué pasó en cada punto y la app hace el tanteo, los saques, los tie-breaks y las estadísticas de los cuatro jugadores.",
    body: [
      "Vigía convierte a cualquier persona al borde de la cancha —un entrenador, alguien del banco, un amigo— en el estadístico de un partido de pádel profesional. Vos solo marcás qué pasó en cada punto; la app hace el resto: el tanteo, quién saca, quién resta, los tie-breaks y las estadísticas de los cuatro jugadores.",
      "Al terminar, se genera una tarjeta lista para compartir por WhatsApp con el resultado y los números del partido. La misma clase de datos que ves en una transmisión profesional, ahora de tu partido del sábado.",
    ],
    claim: "Marcá el punto. La app hace la estadística.",
    category: "Deportes",
    playStoreUrl: "",
    icon: "/apps/vigia/icon.png",
    // Negro cancha + lima del logo
    accent: ["#0d1116", "#33451c"],
    languages: ["Español", "Inglés", "Portugués", "Italiano"],
    features: [
      {
        icon: "chart",
        title: "Estadísticas de nivel transmisión",
        description:
          "Winners, errores forzados y no forzados, aces, dobles faltas, break points y mucho más, jugador por jugador.",
      },
      {
        icon: "users",
        title: "Lo que un sensor no puede hacer",
        description:
          "Un reloj o un sensor en la pala adivina tu golpe, pero no sabe si el error del rival fue forzado ni a quién atribuir el punto entre cuatro. Vigía sí: porque lo marca una persona que entiende el juego.",
      },
      {
        icon: "bolt",
        title: "Vos solo tocás; ella deduce todo",
        description:
          "Marcador, saque, cambios de lado y tie-breaks se resuelven automáticamente mientras seguís el partido.",
      },
      {
        icon: "sparkles",
        title: "Se comparte y se luce",
        description:
          "Una tarjeta prolija que cuenta el partido entero en una sola imagen, lista para el grupo de WhatsApp.",
      },
      {
        icon: "device",
        title: "Historial y evolución",
        description:
          "Cada jugador acumula sus partidos y ve cómo progresa con el tiempo, métrica por métrica.",
      },
      {
        icon: "download",
        title: "Exportás e importás",
        description:
          "Tus partidos son tuyos: llevá el historial de un teléfono a otro cuando quieras.",
      },
    ],
    screenshots: [
      {
        src: "/apps/vigia/01.jpeg",
        alt: "Pantalla de inicio de Vigía con los accesos a partido nuevo, historial y jugadores",
      },
      {
        src: "/apps/vigia/02.jpeg",
        alt: "Alta de un partido nuevo en Vigía: jugadores de drive y revés de cada equipo, sorteo de saque y formato de partido",
      },
      {
        src: "/apps/vigia/03.jpeg",
        alt: "Marcado de puntos en vivo en Vigía, con winner, error forzado y no forzado para cada uno de los cuatro jugadores",
      },
      {
        src: "/apps/vigia/08.jpeg",
        alt: "Detalle de un error no forzado en Vigía: se elige el golpe con el que se erró —remate, bandeja, víbora, volea, globo, salida de pared— y si fue de derecha o de revés",
      },
      {
        src: "/apps/vigia/09.jpeg",
        alt: "Detalle de un error forzado en Vigía: la app pregunta quién lo forzó, con qué golpe lo hizo y con qué golpe erró el rival",
      },
      {
        src: "/apps/vigia/05.jpeg",
        alt: "Estadísticas del partido en Vigía: errores no forzados, winners por error, break points y comparación jugador por jugador",
      },
      {
        src: "/apps/vigia/04.jpeg",
        alt: "Historial de partidos de Vigía con filtros por fecha y opciones de exportar e importar",
      },
      {
        src: "/apps/vigia/06.jpeg",
        alt: "Listado de jugadores registrados en Vigía con la cantidad de partidos de cada uno",
      },
      {
        src: "/apps/vigia/07.jpeg",
        alt: "Perfil de un jugador en Vigía con su evolución en winners por error, primer saque y errores no forzados",
      },
    ],
    privacy: {
      updatedAt: "2026-08-06",
      collects: [
        {
          type: "Nombres o apodos de los jugadores que cargás",
          purpose:
            "Identificar a cada jugador en el marcador, en las estadísticas y en el historial de partidos.",
          storage: "dispositivo",
        },
        {
          type: "Datos de los partidos (puntos, saques, resultados y métricas)",
          purpose:
            "Armar el tanteo en vivo, las estadísticas del partido y la evolución histórica de cada jugador.",
          storage: "dispositivo",
        },
      ],
      permissions: [],
      processedOnDevice: true,
      thirdParties: [],
      directedToChildren: false,
      showsAds: false,
      hasInAppPurchases: false,
      minAge: null,
    },
  },
  {
    slug: "oraculos",
    name: "Oráculos",
    tagline: "El quiosco de la sabiduría antigua, en tu bolsillo",
    description:
      "Un solo lugar para consultar los oráculos más fascinantes de la historia: Tarot, Tarot Egipcio, Ángeles, Runas, I Ching y Búzios, con tiradas animadas y lecturas cuidadas.",
    body: [
      "Un solo lugar para consultar los oráculos más fascinantes de la historia: Tarot, Tarot Egipcio, Ángeles, Runas, I Ching y Búzios. Hacés tu pregunta, las cartas caen, las monedas giran, los caracoles se dispersan… y una lectura clara y cuidada te devuelve una mirada nueva sobre tu momento.",
      "No es adivinación de manual: es una experiencia visual, íntima y hermosa, pensada para acompañar la reflexión, el autoconocimiento y esos momentos en que uno necesita frenar y pensar.",
    ],
    claim: "Preguntá. Mirá. Descubrí.",
    category: "Estilo de vida",
    playStoreUrl: "",
    icon: "/apps/oraculos/icon.png",
    // Cielo nocturno violáceo del icono
    accent: ["#1d1637", "#453169"],
    languages: ["Español", "Inglés", "Portugués"],
    features: [
      {
        icon: "sparkles",
        title: "Seis oráculos, una sola app",
        description:
          "Tarot, Tarot Egipcio, Ángeles, Runas, I Ching y Búzios. Cada uno con su propia estética, su propia tirada y su propia voz.",
      },
      {
        icon: "bolt",
        title: "Tiradas vivas",
        description:
          "Animaciones cuidadas: monedas que giran, caracoles que caen, cartas que se revelan una a una.",
      },
      {
        icon: "palette",
        title: "Lecturas con alma",
        description:
          "Interpretaciones escritas con dedicación, tratando cada símbolo con el respeto que merece.",
      },
      {
        icon: "device",
        title: "Una biblioteca para aprender",
        description:
          "Descubrí el significado de cada carta, runa, hexagrama y odu a tu ritmo, sin apuro.",
      },
      {
        icon: "users",
        title: "En tu idioma",
        description:
          "Disponible en varios idiomas, con lecturas traducidas y no automáticas.",
      },
      {
        icon: "lock",
        title: "Diseño oscuro y elegante",
        description:
          "Hecho para disfrutarse de noche y sin cansar la vista, con tipografía y color pensados para leer tranquilo.",
      },
    ],
    screenshots: [
      {
        src: "/apps/oraculos/01.jpeg",
        alt: "Selector de oráculos de la app Oráculos mostrando el Tarot, El espejo de los arcanos",
      },
      {
        src: "/apps/oraculos/05.jpeg",
        alt: "Biblioteca de arcanos mayores del Tarot en Oráculos, con El Loco, El Mago, La Sacerdotisa y más",
      },
      {
        src: "/apps/oraculos/09.jpeg",
        alt: "Tirada en cruz del Tarot Egipcio en Oráculos, con cartas ilustradas como relieves de piedra",
      },
      {
        src: "/apps/oraculos/07.jpeg",
        alt: "Pantalla de consulta de Runas en Oráculos: elegir tema general, amor, trabajo o dinero y escribir la pregunta",
      },
      {
        src: "/apps/oraculos/08.jpeg",
        alt: "Tirada de Búzios en Oráculos con los caracoles cauríes sobre una bandeja de mimbre y el resultado Owani a favor",
      },
      {
        src: "/apps/oraculos/03.jpeg",
        alt: "Consejo del día del oráculo de Ángeles en Oráculos, con la carta del Querubín Karibu",
      },
      {
        src: "/apps/oraculos/04.jpeg",
        alt: "Biblioteca de los 64 hexagramas del I Ching en Oráculos",
      },
      {
        src: "/apps/oraculos/06.jpeg",
        alt: "Ficha de la carta El Mago en Oráculos, con palabras clave al derecho y al invertido y lectura en audio",
      },
      {
        src: "/apps/oraculos/02.jpeg",
        alt: "Selector de oráculos de Oráculos mostrando Búzios, el oráculo de los cauríes",
      },
    ],
    privacy: {
      updatedAt: "2026-08-06",
      collects: [
        {
          type: "La pregunta que escribís antes de una tirada",
          purpose:
            "Encabezar la lectura y poder recuperarla después. Es opcional: podés consultar sin escribir nada.",
          storage: "dispositivo",
        },
        {
          type: "Historial de consultas y progreso en la app",
          purpose:
            "Mostrarte tus lecturas anteriores, el consejo del día y tu avance en la biblioteca.",
          storage: "dispositivo",
        },
      ],
      permissions: [],
      processedOnDevice: true,
      thirdParties: [],
      directedToChildren: false,
      // REVISAR con el equipo: la app usa un sistema de gemas para las consultas.
      // Si esas gemas se compran, poner hasInAppPurchases: true; si se obtienen
      // viendo anuncios, poner showsAds: true y sumar el SDK de anuncios a
      // `thirdParties`. Google Play exige que esto esté declarado.
      showsAds: false,
      hasInAppPurchases: false,
      minAge: 18,
    },
  },
];

export function getApp(slug: string): App | undefined {
  return apps.find((app) => app.slug === slug);
}

/** Capturas destacadas para el hero del home: la 01 de cada app. */
export const heroShots = apps
  .map((app) => ({ app, shot: app.screenshots[0] }))
  .filter((item) => Boolean(item.shot));

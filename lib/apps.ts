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

export type App = {
  slug: string;
  /** El nombre no se traduce */
  name: string;
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
    slug: "vigia",
    name: "Vigía",
    tagline: {
      es: "El que ve todo desde afuera de la cancha",
      en: "The one who sees everything from outside the court",
      pt: "Quem vê tudo de fora da quadra",
      it: "Chi vede tutto da fuori dal campo",
    },
    description: {
      es: "Vigía convierte a cualquier persona al borde de la cancha en el estadístico de un partido de pádel profesional: tú marcas qué pasó en cada punto y la app hace el tanteo, los saques, los tie-breaks y las estadísticas de los cuatro jugadores.",
      en: "Vigía turns anyone standing by the court into the statistician of a professional padel match: you tag what happened on each point and the app handles the score, the serves, the tie-breaks and the stats for all four players.",
      pt: "Vigía transforma qualquer pessoa à beira da quadra no estatístico de uma partida de padel profissional: você marca o que aconteceu em cada ponto e o app cuida do placar, dos saques, dos tie-breaks e das estatísticas dos quatro jogadores.",
      it: "Vigía trasforma chiunque si trovi a bordo campo nello statistico di una partita di padel professionale: tu segni che cosa è successo in ogni punto e l'app si occupa del punteggio, dei servizi, dei tie-break e delle statistiche di tutti e quattro i giocatori.",
    },
    body: {
      es: [
        "Vigía convierte a cualquier persona al borde de la cancha —un entrenador, alguien del banco, un amigo— en el estadístico de un partido de pádel profesional. Tú solo marcas qué pasó en cada punto; la app hace el resto: el tanteo, quién saca, quién resta, los tie-breaks y las estadísticas de los cuatro jugadores.",
        "Al terminar, se genera una tarjeta lista para compartir por WhatsApp con el resultado y los números del partido. La misma clase de datos que ves en una transmisión profesional, ahora de tu partido del sábado.",
      ],
      en: [
        "Vigía turns anyone standing by the court —a coach, someone on the bench, a friend— into the statistician of a professional padel match. You just tag what happened on each point; the app does the rest: the score, who serves, who returns, the tie-breaks and the stats for all four players.",
        "When the match ends, it generates a card ready to share on WhatsApp with the result and the numbers. The same kind of data you see on a professional broadcast, now for your Saturday match.",
      ],
      pt: [
        "Vigía transforma qualquer pessoa à beira da quadra —um treinador, alguém do banco, um amigo— no estatístico de uma partida de padel profissional. Você só marca o que aconteceu em cada ponto; o app faz o resto: o placar, quem saca, quem devolve, os tie-breaks e as estatísticas dos quatro jogadores.",
        "No fim, é gerado um card pronto para compartilhar no WhatsApp com o resultado e os números da partida. O mesmo tipo de dado que você vê em uma transmissão profissional, agora do seu jogo de sábado.",
      ],
      it: [
        "Vigía trasforma chiunque si trovi a bordo campo —un allenatore, qualcuno in panchina, un amico— nello statistico di una partita di padel professionale. Tu segni soltanto che cosa è successo in ogni punto; l'app fa il resto: il punteggio, chi serve, chi risponde, i tie-break e le statistiche di tutti e quattro i giocatori.",
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
     * Es la MISMA URL en testing cerrado que en producción: no hay una versión provisoria que
     * haya que reemplazar después. Mientras la app esté sólo en testing, la ficha abre para quien
     * esté en la lista de testers y devuelve 404 al resto; el día que Play apruebe producción
     * empieza a abrir para todos, sin tocar nada acá.
     */
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.imagostack.vigia",
    icon: "/apps/vigia/icon.png",
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
          es: "Lo que un sensor no puede hacer",
          en: "What a sensor simply can't do",
          pt: "O que um sensor não consegue fazer",
          it: "Quello che un sensore non può fare",
        },
        description: {
          es: "Un reloj o un sensor en la pala adivina tu golpe, pero no sabe si el error del rival fue forzado ni a quién atribuir el punto entre cuatro. Vigía sí: porque lo marca una persona que entiende el juego.",
          en: "A watch or a sensor on your racket guesses your stroke, but it can't tell whether your rival's error was forced, or which of the four players the point belongs to. Vigía can: because a person who understands the game is the one tagging it.",
          pt: "Um relógio ou um sensor na raquete adivinha a sua batida, mas não sabe se o erro do rival foi forçado nem a quem atribuir o ponto entre quatro. O Vigía sabe: porque quem marca é uma pessoa que entende do jogo.",
          it: "Un orologio o un sensore sulla racchetta indovina il tuo colpo, ma non sa se l'errore dell'avversario è stato forzato né a chi attribuire il punto tra quattro. Vigía sì: perché chi segna è una persona che capisce il gioco.",
        },
      },
      {
        icon: "bolt",
        title: {
          es: "Tú solo tocas; ella deduce todo",
          en: "You just tap; it works out the rest",
          pt: "Você só toca; ele deduz tudo",
          it: "Tu tocchi soltanto; lei deduce tutto",
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
          es: "Una tarjeta prolija que cuenta el partido entero en una sola imagen, lista para el grupo de WhatsApp.",
          en: "A neat card that tells the whole match in a single image, ready for the WhatsApp group.",
          pt: "Um card caprichado que conta a partida inteira em uma única imagem, pronto para o grupo do WhatsApp.",
          it: "Una scheda curata che racconta l'intera partita in una sola immagine, pronta per il gruppo di WhatsApp.",
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
          es: "Pantalla de inicio de Vigía con los accesos a partido nuevo, historial y jugadores",
          en: "Vigía home screen with shortcuts to new match, history and players",
          pt: "Tela inicial do Vigía com os atalhos para nova partida, histórico e jogadores",
          it: "Schermata iniziale di Vigía con gli accessi a nuova partita, storico e giocatori",
        },
      },
      {
        src: "/apps/vigia/02.jpeg",
        alt: {
          es: "Alta de un partido nuevo en Vigía: jugadores de drive y revés de cada equipo, sorteo de saque y formato de partido",
          en: "Setting up a new match in Vigía: forehand and backhand players for each team, serve draw and match format",
          pt: "Criação de uma nova partida no Vigía: jogadores de drive e esquerda de cada dupla, sorteio de saque e formato da partida",
          it: "Creazione di una nuova partita in Vigía: giocatori di diritto e di rovescio di ogni coppia, sorteggio del servizio e formato della partita",
        },
      },
      {
        src: "/apps/vigia/03.jpeg",
        alt: {
          es: "Marcado de puntos en vivo en Vigía, con winner, error forzado y no forzado para cada uno de los cuatro jugadores",
          en: "Live point tagging in Vigía, with winner, forced and unforced error for each of the four players",
          pt: "Marcação de pontos ao vivo no Vigía, com winner, erro forçado e não forçado para cada um dos quatro jogadores",
          it: "Segnalazione dei punti in diretta in Vigía, con winner, errore forzato e non forzato per ognuno dei quattro giocatori",
        },
      },
      {
        src: "/apps/vigia/08.jpeg",
        alt: {
          es: "Detalle de un error no forzado en Vigía: se elige el golpe con el que se erró —remate, bandeja, víbora, volea, globo, salida de pared— y si fue de derecha o de revés",
          en: "Unforced error detail in Vigía: pick the stroke that missed —smash, bandeja, víbora, volley, lob, wall exit— and whether it was forehand or backhand",
          pt: "Detalhe de um erro não forçado no Vigía: escolha a batida errada —smash, bandeja, víbora, voleio, lob, saída de parede— e se foi de direita ou de esquerda",
          it: "Dettaglio di un errore non forzato in Vigía: si sceglie il colpo sbagliato —smash, bandeja, víbora, volée, pallonetto, uscita dal muro— e se è stato di diritto o di rovescio",
        },
      },
      {
        src: "/apps/vigia/09.jpeg",
        alt: {
          es: "Detalle de un error forzado en Vigía: la app pregunta quién lo forzó, con qué golpe lo hizo y con qué golpe erró el rival",
          en: "Forced error detail in Vigía: the app asks who forced it, with which stroke, and which stroke the rival missed with",
          pt: "Detalhe de um erro forçado no Vigía: o app pergunta quem forçou, com qual batida e com qual batida o rival errou",
          it: "Dettaglio di un errore forzato in Vigía: l'app chiede chi lo ha forzato, con quale colpo e con quale colpo ha sbagliato l'avversario",
        },
      },
      {
        src: "/apps/vigia/05.jpeg",
        alt: {
          es: "Estadísticas del partido en Vigía: errores no forzados, winners por error, break points y comparación jugador por jugador",
          en: "Match statistics in Vigía: unforced errors, winners per error, break points and a player-by-player comparison",
          pt: "Estatísticas da partida no Vigía: erros não forçados, winners por erro, break points e comparação jogador por jogador",
          it: "Statistiche della partita in Vigía: errori non forzati, winner per errore, break point e confronto giocatore per giocatore",
        },
      },
      {
        src: "/apps/vigia/06.jpeg",
        alt: {
          es: "Listado de jugadores registrados en Vigía con la cantidad de partidos de cada uno",
          en: "List of players registered in Vigía with how many matches each one has",
          pt: "Lista de jogadores cadastrados no Vigía com a quantidade de partidas de cada um",
          it: "Elenco dei giocatori registrati in Vigía con il numero di partite di ognuno",
        },
      },
      {
        src: "/apps/vigia/07.jpeg",
        alt: {
          es: "Perfil de un jugador en Vigía con su evolución en winners por error, primer saque y errores no forzados",
          en: "A player profile in Vigía showing their progress in winners per error, first serve and unforced errors",
          pt: "Perfil de um jogador no Vigía com sua evolução em winners por erro, primeiro saque e erros não forçados",
          it: "Profilo di un giocatore in Vigía con la sua evoluzione in winner per errore, primo servizio ed errori non forzati",
        },
      },
    ],
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
    slug: "oraculos",
    name: "Oráculos",
    tagline: {
      es: "El quiosco de la sabiduría antigua, en tu bolsillo",
      en: "The newsstand of ancient wisdom, in your pocket",
      pt: "A banca da sabedoria antiga, no seu bolso",
      it: "L'edicola della sapienza antica, in tasca",
    },
    description: {
      es: "Un solo lugar para consultar los oráculos más fascinantes de la historia: Tarot, Tarot Egipcio, Ángeles, Runas, I Ching y Búzios, con tiradas animadas y lecturas cuidadas.",
      // El I Ching solo se ofrece en español: su contenido todavia no esta
      // traducido, y la app no lo muestra en los otros idiomas. Por eso las
      // versiones en/pt de esta ficha no lo nombran ni cuentan seis oraculos.
      en: "A single place to consult the most fascinating oracles in history: Tarot, Egyptian Tarot, Angels, Runes and Búzios, with animated readings written with care.",
      pt: "Um só lugar para consultar os oráculos mais fascinantes da história: Tarô, Tarô Egípcio, Anjos, Runas e Búzios, com tiragens animadas e leituras caprichadas.",
      it: "Un solo posto per consultare gli oracoli più affascinanti della storia: Tarocchi, Tarocchi Egizi, Angeli, Rune e Búzios, con estrazioni animate e letture curate.",
    },
    body: {
      es: [
        "Un solo lugar para consultar los oráculos más fascinantes de la historia: Tarot, Tarot Egipcio, Ángeles, Runas, I Ching y Búzios. Haces tu pregunta, las cartas caen, las monedas giran, los caracoles se dispersan… y una lectura clara y cuidada te devuelve una mirada nueva sobre tu momento.",
        "No es adivinación de manual: es una experiencia visual, íntima y hermosa, pensada para acompañar la reflexión, el autoconocimiento y esos momentos en que uno necesita frenar y pensar.",
      ],
      en: [
        "A single place to consult the most fascinating oracles in history: Tarot, Egyptian Tarot, Angels, Runes and Búzios. You ask your question, the cards fall, the shells scatter… and a clear, carefully written reading gives you a fresh look at your moment.",
        "This isn't fortune-telling by the book: it's a visual, intimate and beautiful experience, made to support reflection, self-knowledge and those moments when you need to stop and think.",
      ],
      pt: [
        "Um só lugar para consultar os oráculos mais fascinantes da história: Tarô, Tarô Egípcio, Anjos, Runas e Búzios. Você faz a sua pergunta, as cartas caem, os búzios se espalham… e uma leitura clara e caprichada devolve um novo olhar sobre o seu momento.",
        "Não é adivinhação de manual: é uma experiência visual, íntima e bonita, pensada para acompanhar a reflexão, o autoconhecimento e aqueles momentos em que a gente precisa parar e pensar.",
      ],
      it: [
        "Un solo posto per consultare gli oracoli più affascinanti della storia: Tarocchi, Tarocchi Egizi, Angeli, Rune e Búzios. Fai la tua domanda, le carte cadono, le conchiglie si spargono… e una lettura chiara e curata ti restituisce uno sguardo nuovo sul tuo momento.",
        "Non è divinazione da manuale: è un'esperienza visiva, intima e bella, pensata per accompagnare la riflessione, la conoscenza di sé e quei momenti in cui si ha bisogno di fermarsi a pensare.",
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
    playStoreUrl: "",
    icon: "/apps/oraculos/icon.png",
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
          es: "Tarot, Tarot Egipcio, Ángeles, Runas, I Ching y Búzios. Cada uno con su propia estética, su propia tirada y su propia voz.",
          en: "Tarot, Egyptian Tarot, Angels, Runes and Búzios. Each with its own look, its own spread and its own voice.",
          pt: "Tarô, Tarô Egípcio, Anjos, Runas e Búzios. Cada um com sua estética, sua tiragem e sua própria voz.",
          it: "Tarocchi, Tarocchi Egizi, Angeli, Rune e Búzios. Ognuno con la propria estetica, la propria estrazione e la propria voce.",
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
          pt: "Animações caprichadas: moedas que giram, búzios que caem, cartas que se revelam uma a uma.",
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
          es: "Interpretaciones escritas con dedicación, tratando cada símbolo con el respeto que merece.",
          en: "Interpretations written with dedication, treating every symbol with the respect it deserves.",
          pt: "Interpretações escritas com dedicação, tratando cada símbolo com o respeito que ele merece.",
          it: "Interpretazioni scritte con dedizione, trattando ogni simbolo con il rispetto che merita.",
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
          es: "Descubre el significado de cada carta, runa, hexagrama y odu a tu ritmo, sin apuro.",
          en: "Discover the meaning of every card, rune and odu at your own pace, with no rush.",
          pt: "Descubra o significado de cada carta, runa e odu no seu ritmo, sem pressa.",
          it: "Scopri il significato di ogni carta, runa e odu al tuo ritmo, senza fretta.",
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
        src: "/apps/oraculos/01.jpeg",
        alt: {
          es: "Selector de oráculos de la app Oráculos mostrando el Tarot, El espejo de los arcanos",
          en: "Oracle picker in the Oráculos app showing Tarot, the mirror of the arcana",
          pt: "Seletor de oráculos do app Oráculos mostrando o Tarô, o espelho dos arcanos",
          it: "Selettore di oracoli dell'app Oráculos che mostra i Tarocchi, lo specchio degli arcani",
        },
      },
      {
        src: "/apps/oraculos/05.jpeg",
        alt: {
          es: "Biblioteca de arcanos mayores del Tarot en Oráculos, con El Loco, El Mago, La Sacerdotisa y más",
          en: "Library of Tarot major arcana in Oráculos, with The Fool, The Magician, The High Priestess and more",
          pt: "Biblioteca de arcanos maiores do Tarô em Oráculos, com O Louco, O Mago, A Sacerdotisa e mais",
          it: "Biblioteca degli arcani maggiori dei Tarocchi in Oráculos, con Il Matto, Il Mago, La Papessa e altri",
        },
      },
      {
        src: "/apps/oraculos/09.jpeg",
        alt: {
          es: "Tirada en cruz del Tarot Egipcio en Oráculos, con cartas ilustradas como relieves de piedra",
          en: "Egyptian Tarot cross spread in Oráculos, with cards illustrated as stone reliefs",
          pt: "Tiragem em cruz do Tarô Egípcio em Oráculos, com cartas ilustradas como relevos de pedra",
          it: "Estrazione a croce dei Tarocchi Egizi in Oráculos, con carte illustrate come rilievi di pietra",
        },
      },
      {
        src: "/apps/oraculos/07.jpeg",
        alt: {
          es: "Pantalla de consulta de Runas en Oráculos: elegir tema general, amor, trabajo o dinero y escribir la pregunta",
          en: "Rune consultation screen in Oráculos: choose a general, love, work or money topic and write your question",
          pt: "Tela de consulta de Runas em Oráculos: escolher tema geral, amor, trabalho ou dinheiro e escrever a pergunta",
          it: "Schermata di consultazione delle Rune in Oráculos: scegliere il tema generale, amore, lavoro o denaro e scrivere la domanda",
        },
      },
      {
        src: "/apps/oraculos/08.jpeg",
        alt: {
          es: "Tirada de Búzios en Oráculos con los caracoles cauríes sobre una bandeja de mimbre y el resultado Owani a favor",
          en: "Búzios reading in Oráculos with the cowrie shells on a wicker tray and the result Owani in favour",
          pt: "Jogo de Búzios em Oráculos com os búzios sobre uma bandeja de palha e o resultado Owani a favor",
          it: "Lancio dei Búzios in Oráculos con le conchiglie cauri su un vassoio di vimini e il risultato Owani a favore",
        },
      },
      {
        src: "/apps/oraculos/03.jpeg",
        alt: {
          es: "Consejo del día del oráculo de Ángeles en Oráculos, con la carta del Querubín Karibu",
          en: "Angels oracle daily guidance in Oráculos, showing the Karibu Cherub card",
          pt: "Conselho do dia do oráculo dos Anjos em Oráculos, com a carta do Querubim Karibu",
          it: "Consiglio del giorno dell'oracolo degli Angeli in Oráculos, con la carta del Cherubino Karibu",
        },
      },
      {
        src: "/apps/oraculos/06.jpeg",
        alt: {
          es: "Ficha de la carta El Mago en Oráculos, con palabras clave al derecho y al invertido y lectura en audio",
          en: "The Magician card page in Oráculos, with upright and reversed keywords and an audio reading",
          pt: "Ficha da carta O Mago em Oráculos, com palavras-chave normal e invertida e leitura em áudio",
          it: "Scheda della carta Il Mago in Oráculos, con parole chiave al diritto e al rovescio e lettura in audio",
        },
      },
      {
        src: "/apps/oraculos/02.jpeg",
        alt: {
          es: "Selector de oráculos de Oráculos mostrando Búzios, el oráculo de los cauríes",
          en: "Oracle picker in Oráculos showing Búzios, the oracle of the cowrie shells",
          pt: "Seletor de oráculos de Oráculos mostrando Búzios, o oráculo dos búzios",
          it: "Selettore di oracoli di Oráculos che mostra i Búzios, l'oracolo delle conchiglie cauri",
        },
      },
    ],
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
];

export function getApp(slug: string): App | undefined {
  return apps.find((app) => app.slug === slug);
}

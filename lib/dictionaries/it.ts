import type { Block } from "@/components/rich-text";
import type { Dictionary } from "@/lib/dictionaries/es";

/**
 * Italiano. Existe porque Italia es el segundo mercado de padel del mundo y las
 * fichas de Play de Vigia estan traducidas a este idioma: sin esta version, el
 * enlace a la politica de privacidad desde la app caeria en otro idioma.
 *
 * Traduccion propia, sin revision de un hablante nativo — la misma deuda que
 * tiene hoy el portugues. Vale para marketing; en las paginas legales conviene
 * que alguien la lea antes del lanzamiento abierto.
 */
export const it: Dictionary = {
  nav: {
    apps: "App",
    about: "Chi siamo",
    support: "Assistenza",
    contact: "Contatti",
    home: "Home",
    openMenu: "Apri il menu",
    closeMenu: "Chiudi il menu",
    skipToContent: "Vai al contenuto",
    languageLabel: "Lingua",
    homeAria: "ImagoStack — home",
  },

  footer: {
    pitch:
      "App mobili che si sentono bene da usare. Progettiamo, sviluppiamo e manteniamo le nostre app per Android, dall'idea al Play Store.",
    apps: "App",
    allApps: "Vedi tutte",
    company: "Azienda",
    legal: "Note legali",
    privacy: "Privacy",
    terms: "Termini d'uso",
    deleteData: "Eliminare i miei dati",
    rights: "Tutti i diritti riservati.",
    trademark:
      "Google Play e il logo Google Play sono marchi registrati di Google LLC.",
  },

  home: {
    badge: "App per Android, nostre",
    intro:
      "Siamo ImagoStack: pensiamo, progettiamo, sviluppiamo, pubblichiamo e manteniamo le nostre applicazioni per Android. Tutto il ciclo, tutto lo stack — senza intermediari.",
    seeApps: "Vedi le nostre app",
    howWeWork: "Come lavoriamo",
    appsKicker: "Le nostre app",
    appsTitle: "Qualità professionale, senza eccezioni",
    appsLink: "Vedi il catalogo completo",
    ideaTitle: "Hai un'idea?",
    ideaText:
      "Se c'è un problema che ti piacerebbe risolvere con un'app, vogliamo sentirlo.",
    ideaLink: "Raccontaci la tua idea →",
    aboutKicker: "Chi siamo",
    aboutTitle: "Diamo forma alle idee",
    contactKicker: "Parliamone",
    contactTitle: "Hai un'idea, una domanda o hai trovato un errore?",
    contactText:
      "Scrivici e ti rispondiamo in meno di 48 ore lavorative. Se riguarda una delle nostre app, dicci il modello del tuo telefono e la versione di Android per poterti aiutare più in fretta.",
    supportCenter: "Centro assistenza",
    pillars: [
      {
        icon: "palette",
        title: "Prima il design",
        description:
          "Ogni schermata viene prototipata e testata prima di scrivere una riga di codice. Se una funzione non si capisce da sola, non è ancora pronta.",
      },
      {
        icon: "bolt",
        title: "Veloci per davvero",
        description:
          "App leggere, che partono all'istante e non si mangiano la batteria né i dati del telefono.",
      },
      {
        icon: "shield",
        title: "Privacy come impostazione predefinita",
        description:
          "Raccogliamo il minimo indispensabile, lo dichiariamo con chiarezza e non vendiamo mai le informazioni dei nostri utenti.",
      },
      {
        icon: "users",
        title: "Assistenza vera",
        description:
          "Dall'altra parte della mail ci sono persone. Rispondiamo a tutte le richieste in meno di 48 ore lavorative.",
      },
    ] as Dictionary["home"]["pillars"],
    steps: [
      {
        title: "Idea e validazione",
        description:
          "Definiamo il problema concreto che l'app risolve e scartiamo tutto ciò che non serve a quello.",
      },
      {
        title: "Design e prototipo",
        description:
          "Costruiamo l'intero flusso in prototipi navigabili per provarlo con utenti reali.",
      },
      {
        title: "Sviluppo",
        description:
          "Costruiamo con attenzione a prestazioni, accessibilità e compatibilità con il maggior numero di dispositivi.",
      },
      {
        title: "Pubblicazione e miglioramento",
        description:
          "Pubblichiamo su Google Play e continuiamo a iterare con le metriche e i riscontri della comunità.",
      },
    ],
  },

  services: {
    kicker: "Facciamo anche",
    title: "Sviluppo web dall'inizio alla fine",
    intro:
      "Lo stesso modo di lavorare che applichiamo alle nostre app lo mettiamo a disposizione di altri progetti: prodotti web completi, con backend, pannello, dati e livello di intelligenza.",
    cards: [
      {
        icon: "code",
        title: "Applicazioni web su misura",
        description:
          "Sito e backend in un unico progetto, con React e TypeScript. Veloci, accessibili e pronti a crescere dal primo giorno.",
      },
      {
        icon: "layout",
        title: "Pannello su misura",
        description:
          "Per gestire la tua attività senza dipendere da nessuno: caricare prodotti, prezzi, appuntamenti o contenuti, con permessi per utente.",
      },
      {
        icon: "database",
        title: "Dati, account e file",
        description:
          "Banche dati in tempo reale, registrazione e accesso, e archiviazione dei file nel cloud.",
      },
      {
        icon: "chat",
        title: "Chatbot con intelligenza artificiale",
        description:
          "Collegato alle informazioni reali della tua attività, non risposte generiche. Gestisce le richieste a qualsiasi ora e passa a una persona quando serve.",
        action: "chat",
      },
      {
        icon: "card",
        title: "Integrazione con Mercado Pago",
        description:
          "Incassa sul tuo sito con la piattaforma che i tuoi clienti già usano, con lo stato di ogni pagamento riportato nel tuo pannello.",
      },
      {
        icon: "message",
        title: "WhatsApp Business API",
        description:
          "Il canale dove i tuoi clienti già sono: avvisi, conferme e promemoria automatici dal tuo sistema.",
      },
      {
        icon: "chart",
        title: "Google Analytics e misurazione",
        description:
          "Sapere da dove arriva la gente, cosa guarda e cosa la fa comprare. Configurato dal primo giorno, non dopo.",
      },
      {
        icon: "link",
        title: "Integrazioni e automazioni",
        description:
          "Posta, calendari, API di terze parti e tutto quello che va collegato perché il prodotto funzioni da solo.",
      },
    ] as Dictionary["services"]["cards"],
    /** Enlace especial de la ficha del chatbot: abre el widget */
    chatCta: "Provalo qui",
    stackLabel: "Con cosa lavoriamo",
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
    cta: "Raccontaci il tuo progetto",
  },

  appsPage: {
    kicker: "Catalogo",
    title: "Le nostre app",
    subtitleMany:
      "{count} applicazioni per Android, in {categories} categorie. Si scaricano tutte da Google Play.",
    subtitleOne:
      "{count} applicazioni per Android di {category}. Si scaricano tutte da Google Play.",
  },

  appPage: {
    backToApps: "Tutte le app",
    screenshotsTitle: "Come si presenta",
    screenshotsHint:
      "Scegli una miniatura per scorrere le schermate, o tocca l'immagine grande per ingrandirla.",
    aboutTitle: "Su {app}",
    privacyLink: "Informativa sulla privacy",
    helpLink: "Ho bisogno di aiuto",
    downloadTitle: "Scarica {app}",
    downloadText: "Disponibile per Android su Google Play.",
    otherApps: "Altre app",
    availableIn: "Disponibile in",
  },

  gallery: {
    zoom: "Ingrandisci: {alt}",
    thumb: "Vedi la schermata {n} di {app}",
    previous: "Schermata precedente",
    next: "Schermata successiva",
    close: "Chiudi",
  },

  support: {
    kicker: "Assistenza",
    title: "Siamo dall'altra parte",
    intro:
      "Se qualcosa non funziona, se ti manca una funzione o se vuoi semplicemente raccontarci qualcosa, scrivici. Rispondiamo in meno di 48 ore lavorative.",
    writeUs: "Scrivici",
    formTitle: "Scrivici",
    formIntro:
      "Compila il modulo e ti rispondiamo in meno di 48 ore lavorative. Più contesto ci dai, più in fretta lo risolviamo.",
    formTips: [
      "Raccontaci cosa ti aspettavi che accadesse e cosa è accaduto invece.",
      "Aggiungi il modello del tuo telefono e la versione di Android.",
      "Se puoi, allega una schermata quando rispondi alla mail.",
    ],
    perAppTitle: "Aiuto per applicazione",
    perAppText:
      "Ogni app ha la sua scheda e la sua informativa sulla privacy. Se la tua domanda riguarda una in particolare, tocca il suo accesso e il modulo si apre già con quell'app selezionata.",
    seeApp: "Vedi l'app",
    privacy: "Privacy",
    writeAbout: "Scrivi su {app}",
    faqTitle: "Domande frequenti",
    faqFooter:
      "La tua domanda non c'era? [Scrivici](mailto:{email}) e la risolviamo. Puoi anche vedere come [eliminare i tuoi dati]({deleteDataUrl}).",
    faqs: [
      {
        question: "Quanto tempo ci vuole per una risposta?",
        answer:
          "Meno di 48 ore lavorative. Ti scrive una persona del team, non un bot né una risposta automatica.",
      },
      {
        question: "Ho trovato un errore, quali informazioni vi servono?",
        answer:
          "Il nome dell'app, il modello del tuo telefono, la versione di Android e, se puoi, una schermata e i passaggi per riprodurre il problema. Con questo di solito lo risolviamo alla prima risposta.",
      },
      {
        question: "Posso spostare i miei dati su un altro telefono?",
        answer:
          "Dipende dall'app: quelle che salvano uno storico includono funzioni di esportazione e importazione. Se non trovi l'opzione, scrivici e ti guidiamo.",
      },
      {
        question: "Come cancello tutte le mie informazioni?",
        answer:
          "Puoi farlo dall'app stessa o disinstallandola, dato che i dati vivono sul tuo dispositivo. La procedura completa è nella pagina di eliminazione dei dati.",
      },
      {
        question: "Ho un'idea per un'app, la leggete?",
        answer:
          "Sì, e con piacere. Diverse funzioni che oggi esistono sono nate da messaggi di utenti. Scrivici raccontando il problema che ti piacerebbe risolvere.",
      },
      {
        question:
          "Come segnalo un problema di fatturazione di Google Play?",
        answer:
          "Addebiti, rimborsi e abbonamenti sono gestiti da Google Play. Per quei casi conviene rivolgersi all'assistenza di Google, anche se scrivendoci ti aiutiamo a trovare la strada.",
      },
    ],
  },

  form: {
    name: "Il tuo nome",
    namePlaceholder: "Come ti chiami",
    email: "La tua mail",
    emailPlaceholder: "per poterti rispondere",
    about: "Di cosa ci scrivi?",
    general: "Domanda generale",
    idea: "Ho un'idea per un'app",
    message: "Il tuo messaggio",
    messagePlaceholder:
      "Se è un problema tecnico, dicci il modello del tuo telefono e la versione di Android.",
    submit: "Invia il messaggio",
    sending: "Invio…",
    sentTitle: "Messaggio inviato!",
    sentText:
      "L'abbiamo ricevuto e ti rispondiamo alla tua mail in meno di 48 ore lavorative.",
    sendAnother: "Invia un altro messaggio",
    privacyNote:
      "Usiamo il tuo nome e la tua mail soltanto per risponderti. Non li condividiamo con nessuno e non ti aggiungiamo a nessuna lista.",
    errorText:
      "Non è stato possibile inviare il messaggio. Potrebbe essere un problema momentaneo di connessione.",
    errorAction: "Scrivici per mail",
    /** Etiquetas del mensaje de respaldo, cuando falla el envío */
    bodyName: "Nome",
    bodyEmail: "Mail",
    bodyAbout: "Oggetto",
  },

  chat: {
    /** Etiqueta accesible del botón flotante */
    open: "Apri la chat",
    close: "Chiudi la chat",
    title: "Assistente di ImagoStack",
    subtitle: "Risponde subito",
    greeting:
      "Ciao! Posso raccontarti delle nostre app o dello sviluppo web che facciamo. Di cosa hai bisogno?",
    placeholder: "Scrivi la tua domanda…",
    send: "Invia",
    thinking: "Sta scrivendo…",
    /** Sugerencias iniciales, para que no arranque en blanco */
    suggestions: [
      "Che app avete?",
      "Fate siti su misura?",
      "Che tecnologie usate?",
    ],
    /** Cuando el bot no puede responder: no se explica el motivo real */
    handoff:
      "Non posso risponderti in questo momento. Lasciaci la tua domanda nel modulo e ti rispondiamo in meno di 48 ore lavorative.",
    handoffCta: "Vai al modulo",
    limited:
      "Troppe richieste di seguito. Aspetta un momento e riprova.",
    /** Una persona tomó la conversación */
    operator: "Da ora ti risponde una persona del team.",
    disclaimer: "Assistente automatico. Può sbagliare.",
    retry: "Riprova",
  },

  panel: {
    title: "Pannello",
    subtitle: "Conversazioni",
    signInTitle: "Entra nel pannello",
    signInText: "Accedi con un account autorizzato.",
    signInButton: "Entra con Google",
    signingIn: "Accesso…",
    signOut: "Esci",
    noAccessTitle: "Senza permessi",
    noAccessText:
      "Il tuo account non ha accesso al pannello. Se pensi che sia un errore, avvisa un amministratore.",
    loading: "Caricamento…",
    empty: "Non ci sono ancora conversazioni.",
    emptyHint: "Appariranno qui appena qualcuno scriverà in chat.",
    selectOne: "Scegli una conversazione dall'elenco.",
    /** Buscador de la lista */
    search: "Cerca nelle conversazioni…",
    noMatches: "Nessuna conversazione corrisponde alla ricerca.",
    /** Menú lateral en pantallas chicas */
    menu: "Sezioni",
    close: "Chiudi",
    /** Estados de cada conversación */
    modeBot: "Risponde il bot",
    modeMine: "La stai gestendo tu",
    modeOther: "La gestisce un'altra persona",
    take: "Prendi la conversazione",
    release: "Restituisci al bot",
    /** Cuando el visitante ya cerró el chat y no va a recibir la respuesta */
    inactive: "Inattiva",
    inactiveHint:
      "Il visitatore ha chiuso la chat: se rispondi ora non lo vedrà. Scrivigli per mail se ne ha lasciata una.",
    placeholder: "Scrivi la tua risposta…",
    send: "Invia",
    takeFirst: "Prendi la conversazione per poter rispondere.",
    visitor: "Visitatore",
    bot: "Bot",
    you: "Tu",
    /** Aviso cuando el turno del operador está por expirar */
    expiring: "Nessuna attività: torna al bot a breve.",
    backToList: "Torna",
    collapse: "Comprimi",
    expand: "Espandi",

    /** Nombres de las secciones del menú lateral */
    sections: {
      conversations: "Conversazioni",
      messages: "Messaggi",
      users: "Utenti",
    },

    /** Sección de usuarios */
    usersIntro: "Chi entra nel pannello e con quali permessi.",
    usersEmpty: "Non ci sono ancora utenti registrati.",
    roleVisitor: "Visitatore",
    roleOperator: "Operatore",
    roleAdmin: "Amministratore",
    roleLabel: "Ruolo",
    roleError: "Non è stato possibile cambiare il ruolo.",
    itsYou: "Sei tu",
    lastSeen: "Registrato",

    /** Sección de mensajes, todavía sin construir */
    messagesIntro: "Richieste ricevute dai moduli del sito.",
    messagesSoon:
      "Questa sezione non è ancora costruita: oggi i messaggi arrivano solo per mail.",
  },

  notFound: {
    code: "ERRORE 404",
    title: "Questa schermata non esiste",
    text: "La pagina che cercavi è stata spostata o non è mai stata qui. Prova dalla home o guarda il catalogo delle app.",
    home: "Vai alla home",
    apps: "Vedi le app",
  },

  legal: {
    kicker: "Note legali",
    updatedAt: "Ultimo aggiornamento:",
    back: "Torna",
    backToApp: "Torna a {app}",
    yourData: "I tuoi dati",
  },

  privacyPage: {
    title: "Informativa sulla privacy",
    intro:
      "Quali dati gestisce ImagoStack, per cosa li usa e che controllo hai su di essi.",
    highlight:
      "**In sintesi:** questo sito non usa cookie di tracciamento né sistemi di analisi. Le nostre app salvano le informazioni che inserisci sul tuo dispositivo. Non vendiamo dati e non condividiamo informazioni con terze parti per la pubblicità.",
    perAppIntro:
      "Questa informativa si applica al sito **{domain}** e, in linea generale, alle applicazioni pubblicate da {company}. Ogni app ha inoltre la propria informativa specifica, che è quella che prevale in caso di differenza:",
    perAppLink: "Informativa sulla privacy di {app}",
    blocks: [
      { h2: "1. Titolare del trattamento" },
      {
        p: "**{company}**, con sede nella {jurisdiction}, è titolare del trattamento dei dati descritti in questa informativa. Contatto: [{email}](mailto:{email}).",
      },
      { h2: "2. Dati che trattiamo su questo sito" },
      { h3: "Navigazione" },
      {
        p: "{domain} è un sito statico. Non usiamo cookie di tracciamento propri, né pixel pubblicitari, né strumenti di analisi che creino profili. Il nostro fornitore di hosting può registrare in automatico dati tecnici —indirizzo IP, tipo di browser, data e ora della richiesta— nei propri registri di server, con l'unica finalità di far funzionare il servizio e prevenire abusi.",
      },
      { h3: "Modulo di contatto" },
      {
        p: "Quando invii il modulo, il tuo nome, la tua mail e il tuo messaggio viaggiano verso il nostro server e vengono inoltrati alla nostra casella tramite **Resend**, il fornitore di invio mail che utilizziamo. **Non conserviamo quel contenuto in nessuna banca dati**: arriva alla nostra posta e lì viene trattato come qualsiasi altro messaggio. Lo usiamo soltanto per risponderti, e puoi consultare l'[informativa sulla privacy di Resend](https://resend.com/legal/privacy-policy).",
      },
      { h3: "Posta elettronica" },
      {
        p: "Se ci scrivi, trattiamo il tuo indirizzo di posta e il contenuto del messaggio con l'unico fine di risponderti. Conserviamo quella corrispondenza per il tempo necessario a dare seguito alla tua richiesta e poi la eliminiamo.",
      },
      { h2: "3. Dati che trattano le nostre applicazioni" },
      {
        p: "Le nostre app sono costruite per funzionare senza che noi abbiamo i tuoi dati: non richiedono la creazione di un account e le informazioni che inserisci vengono salvate nell'archivio privato del tuo dispositivo. Per il dettaglio di ciascuna, consulta la sua informativa specifica nell'elenco qui sopra.",
      },
      { h2: "4. Finalità e base giuridica" },
      {
        p: "Trattiamo dati unicamente per: (a) rispondere alle tue richieste, sulla base del tuo consenso; (b) mantenere il sito e le app operativi e sicuri, sulla base del nostro legittimo interesse; e (c) adempiere a obblighi di legge quando previsto.",
      },
      { h2: "5. Terze parti e trasferimenti" },
      {
        p: "Non vendiamo, non affittiamo e non cediamo dati personali. Utilizziamo fornitori di infrastruttura per ospitare questo sito, **Resend** per inoltrare i messaggi del modulo di contatto e un fornitore di posta per gestire le nostre caselle. Tutti agiscono come responsabili del trattamento e possono operare server fuori dalla {jurisdiction}. Le app sono distribuite tramite Google Play: il download, il pagamento (quando previsto) e le metriche aggregate dello store sono gestiti da Google LLC secondo la propria informativa sulla privacy.",
      },
      { h2: "6. Conservazione" },
      {
        p: "Conserviamo i dati solo per il tempo in cui esiste una finalità che lo giustifichi. I dati che vivono sul tuo dispositivo li controlli tu e vengono eliminati quando li cancelli dall'app o quando la disinstalli.",
      },
      { h2: "7. I tuoi diritti" },
      {
        p: "Puoi chiedere accesso, rettifica, aggiornamento, cancellazione, portabilità o limitazione del trattamento dei tuoi dati, e opporti ad esso, scrivendo a [{email}](mailto:{email}). Rispondiamo entro i termini di legge applicabili.",
      },
      {
        p: "Nella {jurisdiction}, l'Agenzia di Accesso all'Informazione Pubblica è l'organo di controllo della Legge 25.326 e ha il compito di ricevere le segnalazioni di inadempienza. Se ti trovi in Italia, l'autorità competente è il _Garante per la protezione dei dati personali_.",
      },
      { h2: "8. Minori" },
      {
        p: "Né questo sito né le nostre app sono rivolti a minori di 13 anni, e non raccogliamo consapevolmente i loro dati.",
      },
      { h2: "9. Sicurezza" },
      {
        p: "Il sito viene servito interamente su HTTPS. Applichiamo misure tecniche e organizzative ragionevoli per proteggere le informazioni, cominciando dalla più efficace: raccogliere il minimo indispensabile.",
      },
      { h2: "10. Modifiche" },
      {
        p: "Pubblichiamo qualsiasi aggiornamento a questo stesso indirizzo, con la sua data di validità nell'intestazione.",
      },
      { h2: "11. Contatti" },
      {
        p: "{company} — {jurisdiction}. Assistenza e privacy: [{email}](mailto:{email}). Richieste generali: [{generalEmail}](mailto:{generalEmail}).",
      },
    ] as Block[],
  },

  termsPage: {
    title: "Termini d'uso",
    intro:
      "Le condizioni alle quali mettiamo a disposizione il sito {domain} e le nostre applicazioni.",
    blocks: [
      { h2: "1. Accettazione" },
      {
        p: "Scaricando, installando o usando una qualsiasi delle applicazioni di **{company}**, oppure utilizzando questo sito, accetti questi termini. Se non sei d'accordo, non usare il servizio.",
      },
      { h2: "2. Licenza d'uso" },
      {
        p: "Ti concediamo una licenza personale, limitata, revocabile, non esclusiva e non trasferibile per installare e usare le nostre applicazioni su dispositivi che controlli, per fini personali e non commerciali. La licenza non comporta trasferimento di proprietà.",
      },
      { p: "Non è consentito:" },
      {
        ul: [
          "Copiare, modificare, tradurre o creare opere derivate dall'applicazione.",
          "Applicare ingegneria inversa, decompilare o disassemblare il software, salvo nella misura in cui la legge lo consenta espressamente.",
          "Ridistribuire, rivendere, concedere in sublicenza o pubblicare l'applicazione in altri store o repository.",
          "Rimuovere o alterare avvisi di paternità, marchi o note di proprietà intellettuale.",
          "Usare l'applicazione per attività illecite o che violino diritti di terzi.",
        ],
      },
      { h2: "3. Distribuzione tramite Google Play" },
      {
        p: "Le nostre applicazioni sono distribuite tramite Google Play. Il download, l'aggiornamento e —quando previsto— il pagamento sono regolati anche dai termini di Google. I rimborsi degli acquisti effettuati nello store sono gestiti secondo la politica di rimborso di Google Play.",
      },
      { h2: "4. Contenuti e responsabilità dell'utente" },
      {
        p: "Le informazioni che inserisci nelle nostre app sono tue e ne sei responsabile, backup compreso. Quando i dati sono archiviati soltanto sul tuo dispositivo, non abbiamo modo di recuperarli se li cancelli, se perdi il telefono o se disinstalli l'applicazione.",
      },
      { h2: "5. Contenuti di intrattenimento" },
      {
        p: "Alcune delle nostre applicazioni offrono contenuti di carattere simbolico, ricreativo o di intrattenimento —per esempio, letture di oracoli— e sono destinate alla riflessione e allo svago. Quel contenuto **non costituisce consulenza professionale di alcun tipo** (medica, psicologica, legale, finanziaria o di altra natura) e non deve essere usato come base per decisioni che richiedano il parere di un professionista abilitato. Le statistiche e le metriche generate dalle nostre app sportive dipendono dalle informazioni inserite da chi le usa e non pretendono di essere un registro ufficiale.",
      },
      { h2: "6. Disponibilità e modifiche" },
      {
        p: "Lavoriamo perché tutto funzioni, ma il servizio è offerto “così com'è”. Possiamo aggiornare, modificare, sospendere o interrompere funzionalità o applicazioni intere. Quando la modifica è rilevante, cercheremo di avvisare con un preavviso ragionevole.",
      },
      { h2: "7. Garanzie" },
      {
        p: "Nella massima misura consentita dalla legge, le applicazioni sono fornite senza garanzie di alcun tipo, esplicite o implicite, incluse quelle di commerciabilità, idoneità a uno scopo determinato o funzionamento ininterrotto e privo di errori. Nulla di quanto qui previsto limita i diritti che ti spettano come consumatore secondo la normativa applicabile, inclusa la Legge 24.240 di Difesa del Consumatore della {jurisdiction}.",
      },
      { h2: "8. Limitazione di responsabilità" },
      {
        p: "Nella massima misura consentita dalla legge, {company} non sarà responsabile per danni indiretti, incidentali, speciali o consequenziali, né per perdita di dati, di opportunità o di profitti, derivanti dall'uso o dall'impossibilità d'uso delle applicazioni.",
      },
      { h2: "9. Proprietà intellettuale" },
      {
        p: "Il software, i design, le illustrazioni, i testi, il marchio ImagoStack e i nomi delle nostre applicazioni sono di titolarità di {company} o dei suoi licenzianti, e sono protetti dalle leggi sulla proprietà intellettuale. Google Play e il logo Google Play sono marchi registrati di Google LLC.",
      },
      { h2: "10. Cessazione" },
      {
        p: "Puoi smettere di usare il servizio in qualsiasi momento disinstallando l'applicazione. Possiamo sospendere la licenza se non rispetti questi termini.",
      },
      { h2: "11. Legge applicabile e giurisdizione" },
      {
        p: "Questi termini sono regolati dalle leggi della {jurisdiction}. Qualsiasi controversia sarà sottoposta ai tribunali competenti di quella giurisdizione, fermo restando quanto previsto dalle norme di tutela del consumatore applicabili nel tuo luogo di residenza.",
      },
      { h2: "12. Contatti" },
      {
        p: "Per qualsiasi dubbio su questi termini: [{generalEmail}](mailto:{generalEmail}).",
      },
    ] as Block[],
  },

  deleteDataPage: {
    title: "Eliminare i miei dati",
    intro:
      "Questa pagina spiega come cancellare le informazioni associate alle nostre applicazioni, come richiesto dalla politica sui dati utente di Google Play.",
    highlight:
      "**La cosa più importante:** le nostre applicazioni non richiedono la creazione di un account e salvano le informazioni sul tuo dispositivo. Questo significa che **la cancellazione la controlli tu**: non esiste un account sui nostri server da chiudere.",
    blocks: [
      { h2: "Opzione 1 — Cancellare dall'applicazione" },
      {
        p: "È il modo più preciso, perché ti permette di eliminare solo ciò che vuoi eliminare:",
      },
      {
        ul: [
          "Apri l'app ed entra nell'elenco corrispondente (per esempio, lo storico o la lista dei registri).",
          "Usa l'icona di eliminazione di ogni elemento per cancellarlo singolarmente.",
          "Se vuoi ripartire da zero, cancella tutti gli elementi dell'elenco o usa l'opzione di ripristino, quando l'app la offre.",
        ],
      },
      { h2: "Opzione 2 — Cancellare i dati da Android" },
      {
        p: "Elimina in una sola volta tutto quello che l'applicazione ha salvato sul dispositivo, senza disinstallarla:",
      },
      {
        ol: [
          "Apri _Impostazioni_ sul tuo telefono.",
          "Entra in _App_ e scegli l'applicazione.",
          "Tocca _Spazio di archiviazione_.",
          "Tocca _Cancella dati_ (o _Cancella archiviazione_) e conferma.",
        ],
      },
      {
        p: "Il nome esatto di ogni opzione può variare in base al produttore e alla versione di Android.",
      },
      { h2: "Opzione 3 — Disinstallare l'applicazione" },
      {
        p: "Disinstallando, Android elimina l'archivio privato dell'app insieme ad essa. Tieni presente che **questa azione non si può annullare**: se vuoi conservare le tue informazioni, esportale prima dall'app.",
      },
      { h2: "Backup del sistema" },
      {
        p: "Se hai attivato il backup di Google, il sistema operativo potrebbe aver salvato i dati dell'app nel tuo account Google. Quel backup è amministrato da Google, non da {company}, e puoi gestirlo da _Impostazioni → Google → Backup_.",
      },
      { h2: "Richiedere l'eliminazione per iscritto" },
      {
        p: "Se preferisci comunque che gestiamo noi una richiesta di eliminazione, o se abbiamo scambiato mail e vuoi che cancelliamo quello scambio, scrivici a [{email}](mailto:{email}) dall'indirizzo coinvolto, indicando:",
      },
      {
        ul: ["Il nome dell'applicazione.", "Quali informazioni vuoi eliminare."],
      },
      {
        p: "Confermiamo la ricezione e risolviamo la richiesta entro un termine massimo di 30 giorni di calendario. Non chiediamo nulla per questa pratica.",
      },
      { h2: "Cosa conserviamo e per quanto tempo" },
      {
        p: "Non manteniamo banche dati degli utenti delle nostre applicazioni. Quando ci scrivi, conserviamo lo scambio di mail soltanto per il tempo utile a dare seguito alla tua richiesta, e poi lo eliminiamo. Se un obbligo di legge, contabile o di difesa dei diritti ci impone di conservare qualche dato, lo conserviamo unicamente per il termine che quell'obbligo impone.",
      },
      { h2: "Dettaglio per applicazione" },
      {
        p: "Ogni app descrive esattamente quali informazioni gestisce nella propria informativa:",
      },
    ] as Block[],
    appLink: "Informativa sulla privacy di {app}",
    seeAlso:
      "Vedi anche la nostra [informativa sulla privacy generale]({privacyUrl}).",
  },

  appPrivacy: {
    title: "Informativa sulla privacy di {app}",
    intro:
      "Questa informativa spiega quali dati gestisce {app}, per cosa li usa e che controllo hai su di essi.",
    summaryLead: "**In sintesi:**",
    summaryNoData: "{app} non raccoglie dati personali.",
    summaryOnDevice:
      "{app} salva le informazioni che inserisci soltanto sul tuo dispositivo. Non abbiamo server con i tuoi dati, non serve creare un account e non vendiamo né condividiamo informazioni con terze parti.",
    /** Variante cuando hay publicidad o algún servicio de terceros */
    summaryOnDeviceShared:
      "{app} salva sul tuo dispositivo soltanto quanto indicato più sotto, e non serve creare un account. Non abbiamo server con i tuoi dati né vendiamo informazioni. Per mostrare gli annunci, il fornitore pubblicitario può trattare identificatori del tuo dispositivo, come spiegato nella sezione 5.",
    summaryServer:
      "{app} gestisce i dati indicati più sotto, con l'unica finalità di far funzionare l'app.",
    adsYes: "L'app mostra pubblicità.",
    adsNo: "L'app non mostra pubblicità.",
    iapYes: "Include acquisti all'interno dell'applicazione.",
    iapNo: "Non include acquisti all'interno dell'applicazione.",

    s1: "1. Chi siamo",
    s1p: "{app} è un'applicazione sviluppata e pubblicata da **{company}** (“noi”), che opera dalla {jurisdiction}. Per qualsiasi domanda sulla privacy puoi scriverci a [{email}](mailto:{email}).",

    s2: "2. Quali dati gestisce l'applicazione",
    s2none:
      "{app} **non raccoglie nessun dato personale**. Non chiede registrazione, non accede ai tuoi contatti, alla tua posizione né ai tuoi file, e non genera identificatori per seguirti.",
    s2intro:
      "L'app gestisce soltanto le informazioni che inserisci tu perché funzioni. In dettaglio:",
    /**
     * La preposicion va DENTRO de `s2device` / `s2server`, no en la plantilla:
     * en italiano "su" + "il" se contrae en "sul", y una plantilla con la
     * preposicion suelta producia "su il tuo dispositivo".
     */
    s2item: "**{type}.** {purpose} Viene archiviato {storage}.",
    s2device: "sul tuo dispositivo",
    s2server: "sui nostri server",
    s2closing:
      "Non raccogliamo il tuo nome, la tua mail, la tua posizione, la tua rubrica né identificatori pubblicitari. Non creiamo profili utente e non facciamo tracciamento tra applicazioni.",
    /** Variante cuando la app muestra publicidad */
    s2closingAds:
      "Non raccogliamo il tuo nome, la tua mail, la tua posizione né la tua rubrica, e non creiamo profili utente con quei dati. Gli identificatori pubblicitari sono trattati dal fornitore di annunci, non da noi: il dettaglio è nella sezione 5.",

    s3: "3. Dove vengono salvati i tuoi dati",
    s3device:
      "Tutte le informazioni vengono elaborate e salvate **localmente sul tuo dispositivo**, dentro l'archivio privato dell'applicazione. Non vengono trasmesse ai nostri server perché, per il funzionamento di {app}, non abbiamo bisogno di averle.",
    s3server:
      "Parte delle informazioni viene elaborata su server propri o di fornitori di infrastruttura incaricati da {company}, con misure di sicurezza adeguate al tipo di dato.",
    s3backup:
      "Se fai un backup del telefono, il sistema operativo può includere i dati dell'app in quel backup. Quel backup è gestito da Google o dal produttore del tuo dispositivo secondo le loro politiche, non da {company}.",
    /**
     * Plazo de conservación. Es un dato que el RGPD exige informar de forma expresa
     * (art. 13.2.a) y que faltaba: la política decía dónde viven los datos y cómo
     * borrarlos, pero no por cuánto tiempo se guardan.
     */
    s3retentionDevice:
      "**Per quanto tempo.** Le informazioni vengono conservate finché non le cancelli tu. Non c'è un termine che le elimini automaticamente, e non esiste una copia in nostro possesso che sopravviva a quella cancellazione: quando le elimini dal dispositivo, smettono di esistere.",
    s3retentionServer:
      "**Per quanto tempo.** Conserviamo le informazioni per il tempo in cui sono necessarie a fornire il servizio. Quando non lo sono più, o se ci chiedi di eliminarle, le cancelliamo —salvo che un obbligo di legge ci imponga di conservare qualche dato per un termine determinato, e solo per quel termine.",

    s4: "4. Permessi che l'app richiede",
    s4none:
      "{app} non richiede permessi sensibili di Android: né fotocamera, né microfono, né posizione, né contatti, né archiviazione esterna.",
    s4intro:
      "Chiediamo solo i permessi strettamente necessari, e spieghiamo sempre a cosa servono:",
    s4item: "**{name}.** {reason}",

    s5: "5. Condivisione di informazioni con terze parti",
    s5none:
      "**Non condividiamo, non vendiamo, non affittiamo e non cediamo informazioni a terze parti.** {app} non integra SDK di pubblicità, di analisi né di social network.",
    s5intro:
      "Perché alcune funzioni possano esistere, l'app usa i seguenti servizi di terze parti, che possono trattare dati secondo le proprie politiche:",
    /** Se antepone a la lista cuando la app muestra publicidad */
    s5ads:
      "{app} si finanzia con **annunci video con premio**: sono opzionali e vengono mostrati solo se scegli di guardarli in cambio di un vantaggio dentro l'app. Non compaiono mai automaticamente e non interrompono una lettura. Per mostrarli usiamo il seguente fornitore, che può trattare l'identificatore pubblicitario del tuo dispositivo e dati tecnici della sessione secondo la propria politica:",
    s5item: "**{name}.** {purpose} [Vedi la sua informativa sulla privacy]({url}).",
    s5legal:
      "Possiamo divulgare informazioni unicamente se ce lo impone un'autorità competente tramite un ordine legale valido.",
    /**
     * Transferencias internacionales (RGPD art. 13.2.f). La afirmación depende de si
     * hay terceros: sin proveedores no hay nada que transferir y conviene decirlo;
     * con proveedores, negarlo seria falso, porque tratan datos fuera del pais.
     */
    s5noTransfers:
      "Dato che non condividiamo informazioni con nessuno, **non esistono trasferimenti internazionali dei tuoi dati**.",
    s5transfers:
      "I fornitori indicati possono trattare quelle informazioni su server situati fuori dal tuo paese, con le garanzie previste dalle loro politiche e dai quadri normativi che risultano loro applicabili.",
    /** Decisiones automatizadas y perfilado (RGPD art. 22). Vale para todas las apps. */
    s5noAutomated:
      "In nessun caso prendiamo decisioni automatizzate che ti riguardino né creiamo profili utente.",

    s6: "6. Contenuti che condividi tu",
    s6p: "Se usi una funzione dell'app per condividere contenuti (per esempio, inviare un'immagine o un riepilogo tramite messaggistica), quell'invio lo esegui tu con l'applicazione che scegli. {company} non interviene su quel contenuto né ne conserva una copia.",

    s7: "7. Minori",
    s7children:
      "{app} è progettata per il pubblico dei bambini e rispetta la _Families Policy_ di Google Play.",
    s7notChildren:
      "{app} **non è rivolta a minori di 13 anni** e non raccoglie consapevolmente dati di minori.",
    s7minAge:
      "Per il tipo di contenuto, ne raccomandiamo l'uso a partire dai {age} anni.",
    s7report:
      "Se pensi che un minore ci abbia fornito informazioni, scrivici a [{email}](mailto:{email}) e le eliminiamo.",

    s8: "8. Come cancellare i tuoi dati",
    s8device: [
      "Dall'app puoi cancellare singoli record o svuotare il tuo storico quando vuoi.",
      "Se disinstalli {app}, Android elimina i dati locali dell'applicazione insieme ad essa.",
      "Puoi farlo anche da _Impostazioni → App → {app} → Spazio di archiviazione → Cancella dati_.",
    ],
    s8server:
      "Puoi chiedere l'eliminazione dei tuoi dati scrivendoci a [{email}](mailto:{email}). Elaboriamo la richiesta entro 30 giorni.",
    s8more:
      "Maggiori dettagli nella pagina di [eliminazione dei dati]({deleteDataUrl}).",

    s9: "9. I tuoi diritti",
    /**
     * Los derechos salen de la ley del USUARIO, no de la nuestra: por eso la lista
     * arranca por el RGPD y la ley argentina aparece como una mas. Donde operamos
     * nosotros se declara en la seccion 1, que es el lugar que le corresponde.
     */
    s9p: "Secondo la normativa che ti risulta applicabile —il GDPR se ti trovi nell'Unione Europea, la LGPD in Brasile, la Legge 25.326 di Protezione dei Dati Personali in Argentina, o quella vigente nel tuo paese— hai diritto ad accedere ai tuoi dati, rettificarli, cancellarli, limitarli od opporti al loro trattamento.",
    s9device:
      "Dato che i dati di {app} vivono sul tuo dispositivo, quei diritti li eserciti direttamente dall'app; in ogni caso, siamo a disposizione per aiutarti.",
    s9server: "Scrivici per esercitarli.",
    /**
     * Base legal del tratamiento (RGPD art. 6). Cuando nada sale del dispositivo no hay
     * tratamiento por nuestra parte y decirlo es mas honesto que invocar una base que no
     * usamos; lo unico que si tratamos en ese caso es el correo, si la persona escribe.
     */
    s9basisDevice:
      "**Base giuridica.** Finché le informazioni non escono dal tuo dispositivo, {company} non svolge alcun trattamento su di esse: non c'è una base giuridica da invocare perché non c'è nulla che trattiamo. Se ci scrivi, quello scambio di mail viene trattato sulla base del tuo consenso e del nostro legittimo interesse a risponderti.",
    s9basisServer:
      "**Base giuridica.** Trattiamo le informazioni per poterti fornire il servizio che richiedi e, a seconda dei casi, sulla base del tuo consenso o del nostro legittimo interesse a mantenere l'applicazione in funzione e prevenire abusi.",
    /**
     * Derecho a reclamar ante la autoridad de control (RGPD art. 13.2.d). Se nombran las
     * autoridades de los mercados donde la ficha esta traducida, mas la de la jurisdiccion
     * propia, para que la persona sepa a donde ir sin tener que averiguarlo.
     */
    s9authority:
      "Se ritieni che non abbiamo gestito bene una richiesta, hai diritto a rivolgerti **all'autorità di controllo del tuo paese di residenza**: per esempio, il _Garante per la protezione dei dati personali_ in Italia, l'Agenzia Spagnola di Protezione dei Dati in Spagna, l'Autorità Nazionale di Protezione dei Dati in Brasile o l'Agenzia di Accesso all'Informazione Pubblica nella {jurisdiction}.",

    s10: "10. Sicurezza",
    s10p: "Applichiamo misure tecniche ragionevoli per proteggere le informazioni, incluso l'uso dell'archivio privato del sistema operativo. Nessun metodo è infallibile, ma riduciamo al minimo il rischio con la strategia più semplice: non accumulare dati di cui non abbiamo bisogno.",

    s11: "11. Modifiche a questa informativa",
    s11p: "Se aggiorniamo questa informativa, pubblichiamo la nuova versione a questo stesso indirizzo e cambiamo la data nell'intestazione. Se la modifica è significativa, lo segnaliamo dentro l'app.",

    s12: "12. Contatti",
    s12p: "{company} — {jurisdiction}. Assistenza e privacy: [{email}](mailto:{email}).",
  },

  meta: {
    homeTitle: "ImagoStack — App per Android | Full-cycle, full-stack",
    homeDescription:
      "ImagoStack progetta, sviluppa e pubblica applicazioni mobili per Android dall'inizio alla fine. Scopri le nostre app su Google Play.",
    ogHomeTitle: "ImagoStack — App per Android",
    appsTitle: "Le nostre app per Android",
    appsDescription:
      "Tutte le applicazioni di ImagoStack per Android: {list}.",
    appsOgTitle: "App di ImagoStack per Android",
    appTitle: "{app} — app di {category} per Android",
    supportTitle: "Assistenza e contatti",
    supportDescription:
      "Aiuto per le applicazioni di ImagoStack: scrivici dal modulo, guarda le domande frequenti e scopri i nostri tempi di risposta.",
    supportOgTitle: "Assistenza di ImagoStack",
    privacyTitle: "Informativa sulla privacy",
    privacyDescription:
      "Come ImagoStack tratta i dati personali sul suo sito web e nelle sue applicazioni.",
    termsTitle: "Termini d'uso",
    termsDescription:
      "Condizioni d'uso del sito e delle applicazioni di ImagoStack.",
    deleteDataTitle: "Eliminare i miei dati",
    deleteDataDescription:
      "Come cancellare le informazioni delle applicazioni di ImagoStack dal tuo dispositivo o richiedendone l'eliminazione.",
    appPrivacyTitle: "Informativa sulla privacy di {app}",
    appPrivacyDescription:
      "Come {app} tratta i tuoi dati: quali informazioni gestisce, dove vengono salvate e come puoi cancellarle.",
    keywords: [
      "ImagoStack",
      "app per Android",
      "sviluppo di applicazioni mobili",
      "Google Play",
      "studio di app",
      "Vigía padel",
      "statistiche di padel",
      "app di oracoli",
      "app tarocchi",
    ],
  },

  og: {
    kicker: "ImagoStack",
    description:
      "Progettiamo, sviluppiamo e pubblichiamo le nostre applicazioni per Android.",
  },
};

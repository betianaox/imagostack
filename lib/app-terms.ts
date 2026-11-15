import type { L10n } from "@/lib/i18n";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * TÉRMINOS DEL SERVICIO POR APP — CLÁUSULAS PROPIAS
 * ─────────────────────────────────────────────────────────────────────────────
 * Google Play pide que la URL de términos del servicio se aplique
 * específicamente a cada app. La página /apps/<slug>/terminos se arma con:
 *
 *   • Las secciones comunes (`appTerms` en los diccionarios), que se adaptan
 *     solas a lo declarado en `lib/apps.ts`: edad mínima, publicidad, compras,
 *     servicios de terceros y dónde viven los datos.
 *   • Las cláusulas propias de cada app, que viven acá: lo que solo aplica a
 *     esa app (entretenimiento en Oráculos, no asesoramiento financiero en
 *     Cryptaura, la tienda como vendedora en Mallnest, etc.).
 *
 * Los textos admiten las mismas variables que el resto de las páginas legales
 * ({app}, {company}, {email}...).
 *
 * AGREGAR UNA APP: sumá su slug con al menos una sección. Si una app no tiene
 * entrada, su página igual existe con las secciones comunes.
 */

export type AppTermsSection = {
  title: L10n<string>;
  items: L10n<string[]>;
};

export type AppTermsExtra = {
  /** Última actualización de los términos de la app (ISO: YYYY-MM-DD) */
  updatedAt: string;
  sections: AppTermsSection[];
};

/** Fecha de la primera versión de los términos por app. */
const FIRST_VERSION = "2026-11-15";

export const appTerms: Record<string, AppTermsExtra> = {
  oraculos: {
    updatedAt: FIRST_VERSION,
    sections: [
      {
        title: {
          es: "Lecturas, gemas e inteligencia artificial",
          en: "Readings, gems and artificial intelligence",
          pt: "Leituras, gemas e inteligência artificial",
          it: "Letture, gemme e intelligenza artificiale",
        },
        items: {
          es: [
            "Las lecturas de {app} son **solo entretenimiento** y una invitación a la reflexión. No predicen el futuro ni reemplazan el consejo de un profesional médico, psicológico, legal o financiero. No tomes decisiones importantes basándote en una lectura.",
            "Las interpretaciones se redactan con inteligencia artificial (Google Gemini) y pueden ser imprecisas, repetitivas o no ajustarse a tu situación.",
            "No escribas en tus preguntas datos sensibles, como información de salud, datos de otras personas o datos que te identifiquen.",
            "Las gemas son una moneda virtual de la app: recibes una cantidad gratis por día y puedes conseguir más viendo anuncios con recompensa. No se compran, no tienen valor en dinero, no se pueden transferir ni canjear, y podemos cambiar la cantidad diaria. Pueden perderse si desinstalas la app o borras sus datos.",
          ],
          en: [
            "{app} readings are **for entertainment only** and an invitation to reflect. They do not predict the future and do not replace the advice of a medical, psychological, legal or financial professional. Do not make important decisions based on a reading.",
            "Interpretations are written with artificial intelligence (Google Gemini) and may be inaccurate, repetitive or not fit your situation.",
            "Do not include sensitive data in your questions, such as health information, other people's data or data that identifies you.",
            "Gems are the app's virtual currency: you get a free amount every day and can earn more by watching rewarded ads. They cannot be bought, have no monetary value, cannot be transferred or exchanged, and we may change the daily amount. They may be lost if you uninstall the app or clear its data.",
          ],
          pt: [
            "As leituras do {app} são **apenas entretenimento** e um convite à reflexão. Não preveem o futuro nem substituem o conselho de um profissional médico, psicológico, jurídico ou financeiro. Não tome decisões importantes com base em uma leitura.",
            "As interpretações são redigidas com inteligência artificial (Google Gemini) e podem ser imprecisas, repetitivas ou não se ajustar à sua situação.",
            "Não escreva dados sensíveis nas suas perguntas, como informações de saúde, dados de outras pessoas ou dados que identifiquem você.",
            "As gemas são uma moeda virtual do app: você recebe uma quantidade grátis por dia e pode conseguir mais assistindo a anúncios premiados. Não podem ser compradas, não têm valor em dinheiro, não podem ser transferidas nem trocadas, e podemos mudar a quantidade diária. Podem ser perdidas se você desinstalar o app ou apagar os dados dele.",
          ],
          it: [
            "Le letture di {app} sono **solo intrattenimento** e un invito alla riflessione. Non predicono il futuro e non sostituiscono il consiglio di un professionista medico, psicologico, legale o finanziario. Non prendere decisioni importanti sulla base di una lettura.",
            "Le interpretazioni sono scritte con l'intelligenza artificiale (Google Gemini) e possono essere imprecise, ripetitive o non adatte alla tua situazione.",
            "Non scrivere nelle tue domande dati sensibili, come informazioni sulla salute, dati di altre persone o dati che ti identificano.",
            "Le gemme sono la moneta virtuale dell'app: ne ricevi una quantità gratuita ogni giorno e puoi ottenerne altre guardando annunci con premio. Non si acquistano, non hanno valore in denaro, non si possono trasferire né scambiare, e possiamo cambiare la quantità giornaliera. Possono andare perse se disinstalli l'app o ne cancelli i dati.",
          ],
        },
      },
    ],
  },

  kaurix: {
    updatedAt: FIRST_VERSION,
    sections: [
      {
        title: {
          es: "Realidad aumentada y objetos del juego",
          en: "Augmented reality and in-game items",
          pt: "Realidade aumentada e itens do jogo",
          it: "Realtà aumentata e oggetti di gioco",
        },
        items: {
          es: [
            "Juega en un lugar seguro. Mira a tu alrededor mientras usas la cámara, no juegues mientras manejas, cruzas la calle o en lugares donde distraerte sea peligroso, y no entres en propiedades ajenas ni en lugares donde no tengas permiso para estar.",
            "Las criaturas, ingredientes, comidas, pociones, cartas y demás objetos del juego son virtuales. Tienes una licencia para usarlos dentro de {app}, pero no son de tu propiedad, no tienen valor en dinero y no se pueden vender, transferir ni canjear.",
            "El progreso del juego se guarda en tu dispositivo. Si desinstalas la app o borras sus datos, se pierde y no podemos recuperarlo.",
            "Podemos ajustar el equilibrio del juego, como tiempos, recompensas o apariciones, para mejorarlo.",
          ],
          en: [
            "Play somewhere safe. Look around you while using the camera, do not play while driving, crossing the street or anywhere a distraction could be dangerous, and do not enter other people's property or places you are not allowed to be.",
            "Creatures, ingredients, meals, potions, cards and other in-game items are virtual. You have a licence to use them within {app}, but they are not your property, have no monetary value and cannot be sold, transferred or exchanged.",
            "Game progress is stored on your device. If you uninstall the app or clear its data, it is lost and we cannot recover it.",
            "We may adjust the game's balance, such as timings, rewards or spawns, to improve it.",
          ],
          pt: [
            "Jogue em um lugar seguro. Olhe ao seu redor enquanto usa a câmera, não jogue enquanto dirige, atravessa a rua ou em lugares onde se distrair seja perigoso, e não entre em propriedades alheias nem em lugares onde você não tenha permissão para estar.",
            "As criaturas, ingredientes, comidas, poções, cartas e demais itens do jogo são virtuais. Você tem uma licença para usá-los dentro do {app}, mas eles não são de sua propriedade, não têm valor em dinheiro e não podem ser vendidos, transferidos nem trocados.",
            "O progresso do jogo fica salvo no seu dispositivo. Se você desinstalar o app ou apagar os dados dele, o progresso se perde e não podemos recuperá-lo.",
            "Podemos ajustar o equilíbrio do jogo, como tempos, recompensas ou aparições, para melhorá-lo.",
          ],
          it: [
            "Gioca in un luogo sicuro. Guardati intorno mentre usi la fotocamera, non giocare mentre guidi, attraversi la strada o dove distrarti sarebbe pericoloso, e non entrare in proprietà altrui o in luoghi dove non hai il permesso di stare.",
            "Le creature, gli ingredienti, i piatti, le pozioni, le carte e gli altri oggetti di gioco sono virtuali. Hai una licenza per usarli dentro {app}, ma non sono di tua proprietà, non hanno valore in denaro e non si possono vendere, trasferire né scambiare.",
            "I progressi di gioco sono salvati sul tuo dispositivo. Se disinstalli l'app o ne cancelli i dati, vanno persi e non possiamo recuperarli.",
            "Possiamo regolare l'equilibrio del gioco, come tempi, ricompense o apparizioni, per migliorarlo.",
          ],
        },
      },
    ],
  },

  vigia: {
    updatedAt: FIRST_VERSION,
    sections: [
      {
        title: {
          es: "Estadísticas y marcas",
          en: "Statistics and trademarks",
          pt: "Estatísticas e marcas",
          it: "Statistiche e marchi",
        },
        items: {
          es: [
            "Las estadísticas de {app} se calculan con lo que marca quien usa la app: no son un registro oficial y pueden tener errores.",
            "{app} no está afiliada, patrocinada ni avalada por ningún circuito, torneo, federación, club o jugador. Los nombres de jugadores y torneos que cargues son responsabilidad tuya.",
            "Si compartes estadísticas o resúmenes de un partido, respeta los derechos y la imagen de las personas involucradas.",
          ],
          en: [
            "{app} statistics are calculated from what the person using the app records: they are not an official record and may contain errors.",
            "{app} is not affiliated with, sponsored or endorsed by any tour, tournament, federation, club or player. The player and tournament names you enter are your responsibility.",
            "If you share statistics or match summaries, respect the rights and image of the people involved.",
          ],
          pt: [
            "As estatísticas do {app} são calculadas com o que a pessoa que usa o app marca: não são um registro oficial e podem ter erros.",
            "O {app} não é afiliado, patrocinado nem endossado por nenhum circuito, torneio, federação, clube ou jogador. Os nomes de jogadores e torneios que você cadastrar são de sua responsabilidade.",
            "Se você compartilhar estatísticas ou resumos de uma partida, respeite os direitos e a imagem das pessoas envolvidas.",
          ],
          it: [
            "Le statistiche di {app} sono calcolate in base a ciò che registra chi usa l'app: non sono un registro ufficiale e possono contenere errori.",
            "{app} non è affiliata, sponsorizzata né approvata da alcun circuito, torneo, federazione, club o giocatore. I nomi di giocatori e tornei che inserisci sono sotto la tua responsabilità.",
            "Se condividi statistiche o riepiloghi di una partita, rispetta i diritti e l'immagine delle persone coinvolte.",
          ],
        },
      },
    ],
  },

  cryptaura: {
    updatedAt: FIRST_VERSION,
    sections: [
      {
        title: {
          es: "Solo información, no asesoramiento financiero",
          en: "Information only, not financial advice",
          pt: "Apenas informação, não aconselhamento financeiro",
          it: "Solo informazione, non consulenza finanziaria",
        },
        items: {
          es: [
            "{app} muestra datos de mercado con fines informativos. **No es asesoramiento financiero, de inversión ni impositivo** y no recomienda comprar ni vender ningún activo. Las criptomonedas son muy volátiles: cualquier decisión es tuya y bajo tu propio riesgo.",
            "{app} no compra, no vende, no custodia fondos ni se conecta a tus cuentas en ningún exchange.",
            "Los datos provienen de las APIs públicas de Kraken, Coinbase y Binance y pueden llegar con demoras, cortes o errores. Verifica siempre la información en la fuente antes de operar.",
            "{app} no está afiliada ni avalada por Kraken, Coinbase ni Binance. Sus nombres y marcas pertenecen a sus respectivos dueños.",
          ],
          en: [
            "{app} shows market data for information purposes. **It is not financial, investment or tax advice** and does not recommend buying or selling any asset. Cryptocurrencies are highly volatile: any decision is yours and at your own risk.",
            "{app} does not buy, sell or hold funds, and does not connect to your accounts on any exchange.",
            "Data comes from the public APIs of Kraken, Coinbase and Binance and may be delayed, interrupted or wrong. Always check the information at the source before trading.",
            "{app} is not affiliated with or endorsed by Kraken, Coinbase or Binance. Their names and trademarks belong to their respective owners.",
          ],
          pt: [
            "O {app} mostra dados de mercado para fins informativos. **Não é aconselhamento financeiro, de investimento nem tributário** e não recomenda comprar nem vender nenhum ativo. As criptomoedas são muito voláteis: qualquer decisão é sua e por sua conta e risco.",
            "O {app} não compra, não vende, não guarda fundos nem se conecta às suas contas em nenhuma exchange.",
            "Os dados vêm das APIs públicas da Kraken, Coinbase e Binance e podem chegar com atrasos, interrupções ou erros. Sempre verifique a informação na fonte antes de operar.",
            "O {app} não é afiliado nem endossado pela Kraken, Coinbase ou Binance. Os nomes e marcas pertencem aos seus respectivos donos.",
          ],
          it: [
            "{app} mostra dati di mercato a scopo informativo. **Non è consulenza finanziaria, d'investimento né fiscale** e non consiglia di comprare o vendere alcun asset. Le criptovalute sono molto volatili: ogni decisione è tua e a tuo rischio.",
            "{app} non compra, non vende, non custodisce fondi e non si collega ai tuoi account su nessun exchange.",
            "I dati provengono dalle API pubbliche di Kraken, Coinbase e Binance e possono arrivare in ritardo, con interruzioni o errori. Verifica sempre le informazioni alla fonte prima di operare.",
            "{app} non è affiliata né approvata da Kraken, Coinbase o Binance. I loro nomi e marchi appartengono ai rispettivi proprietari.",
          ],
        },
      },
    ],
  },

  mallnest: {
    updatedAt: FIRST_VERSION,
    sections: [
      {
        title: {
          es: "Compras en tiendas de terceros",
          en: "Purchases from third-party stores",
          pt: "Compras em lojas de terceiros",
          it: "Acquisti in negozi di terzi",
        },
        items: {
          es: [
            "{app} reúne tiendas independientes que venden con Shopify. **Cada tienda es la vendedora** de sus productos: precio, stock, descripción, envío, cambios, devoluciones y garantías son responsabilidad de esa tienda.",
            "El pago se hace en el checkout de Shopify de cada tienda y la compra queda entre tú y esa tienda. {company} no es parte de la venta y no recibe tu pago ni tus datos de pago.",
            "Si tienes un problema con un pedido, contacta primero a la tienda. Si una tienda incumple o publica algo indebido, avísanos a [{email}](mailto:{email}) y podemos quitarla de la app.",
            "Las sugerencias del personal shopper se generan con inteligencia artificial y pueden equivocarse: revisa el producto, el precio y las condiciones en la tienda antes de comprar.",
          ],
          en: [
            "{app} brings together independent stores that sell with Shopify. **Each store is the seller** of its products: price, stock, description, shipping, exchanges, returns and warranties are that store's responsibility.",
            "Payment is made in each store's Shopify checkout and the purchase is between you and that store. {company} is not a party to the sale and does not receive your payment or your payment details.",
            "If you have a problem with an order, contact the store first. If a store breaches its obligations or publishes something improper, let us know at [{email}](mailto:{email}) and we may remove it from the app.",
            "Personal shopper suggestions are generated with artificial intelligence and may be wrong: check the product, price and conditions in the store before buying.",
          ],
          pt: [
            "O {app} reúne lojas independentes que vendem com a Shopify. **Cada loja é a vendedora** dos seus produtos: preço, estoque, descrição, envio, trocas, devoluções e garantias são responsabilidade dessa loja.",
            "O pagamento é feito no checkout da Shopify de cada loja e a compra fica entre você e essa loja. A {company} não faz parte da venda e não recebe o seu pagamento nem os seus dados de pagamento.",
            "Se tiver um problema com um pedido, entre em contato primeiro com a loja. Se uma loja descumprir as suas obrigações ou publicar algo indevido, avise-nos em [{email}](mailto:{email}) e podemos removê-la do app.",
            "As sugestões do personal shopper são geradas com inteligência artificial e podem errar: confira o produto, o preço e as condições na loja antes de comprar.",
          ],
          it: [
            "{app} riunisce negozi indipendenti che vendono con Shopify. **Ogni negozio è il venditore** dei propri prodotti: prezzo, disponibilità, descrizione, spedizione, cambi, resi e garanzie sono responsabilità di quel negozio.",
            "Il pagamento avviene nel checkout Shopify di ogni negozio e l'acquisto resta tra te e quel negozio. {company} non è parte della vendita e non riceve il tuo pagamento né i tuoi dati di pagamento.",
            "Se hai un problema con un ordine, contatta prima il negozio. Se un negozio non rispetta i suoi obblighi o pubblica qualcosa di inappropriato, avvisaci a [{email}](mailto:{email}) e potremo rimuoverlo dall'app.",
            "I suggerimenti del personal shopper sono generati con l'intelligenza artificiale e possono sbagliare: controlla prodotto, prezzo e condizioni nel negozio prima di acquistare.",
          ],
        },
      },
    ],
  },

  "mallnest-business": {
    updatedAt: FIRST_VERSION,
    sections: [
      {
        title: {
          es: "Condiciones para comercios",
          en: "Terms for businesses",
          pt: "Condições para comércios",
          it: "Condizioni per i negozi",
        },
        items: {
          es: [
            "Para usar {app} necesitas una cuenta y una tienda Shopify propia o que estés autorizado a administrar. Eres responsable de mantener seguro el acceso a tu cuenta.",
            "Garantizas que tienes derecho a usar el logo, las imágenes, los textos y las marcas que cargas, y que la información de tu local es verdadera.",
            "Eres quien vende tus productos: precios, stock, envíos, cambios, devoluciones, garantías, facturación e impuestos son responsabilidad tuya, igual que cumplir las normas de defensa del consumidor y las demás que te apliquen.",
            "Cada local pasa por una revisión antes de publicarse. Podemos rechazarlo, pedir cambios o despublicarlo si incumple estos términos, ofrece productos ilegales o engañosos, o recibe reclamos fundados.",
            "Las sugerencias de textos hechas con inteligencia artificial son un punto de partida: revísalas antes de publicarlas, porque lo que se publica en tu local es responsabilidad tuya.",
            "Puedes desconectar tu tienda y pedir la baja de tu cuenta cuando quieras escribiéndonos a [{email}](mailto:{email}).",
          ],
          en: [
            "To use {app} you need an account and a Shopify store that you own or are authorised to manage. You are responsible for keeping access to your account secure.",
            "You confirm that you have the right to use the logo, images, texts and trademarks you upload, and that your shop's information is true.",
            "You are the seller of your products: prices, stock, shipping, exchanges, returns, warranties, invoicing and taxes are your responsibility, as is complying with consumer protection rules and any other rules that apply to you.",
            "Every shop is reviewed before it is published. We may reject it, ask for changes or unpublish it if it breaches these terms, offers illegal or misleading products, or receives well-founded complaints.",
            "AI-made text suggestions are a starting point: review them before publishing, because what is published in your shop is your responsibility.",
            "You can disconnect your store and ask us to close your account at any time by writing to [{email}](mailto:{email}).",
          ],
          pt: [
            "Para usar o {app} você precisa de uma conta e de uma loja Shopify própria ou que esteja autorizado a administrar. Você é responsável por manter seguro o acesso à sua conta.",
            "Você garante que tem direito a usar o logo, as imagens, os textos e as marcas que envia, e que as informações do seu espaço são verdadeiras.",
            "Você é quem vende os seus produtos: preços, estoque, envios, trocas, devoluções, garantias, faturamento e impostos são responsabilidade sua, assim como cumprir as normas de defesa do consumidor e as demais que se apliquem a você.",
            "Cada espaço passa por uma revisão antes de ser publicado. Podemos recusá-lo, pedir alterações ou despublicá-lo se descumprir estes termos, oferecer produtos ilegais ou enganosos, ou receber reclamações fundamentadas.",
            "As sugestões de textos feitas com inteligência artificial são um ponto de partida: revise-as antes de publicar, porque o que é publicado no seu espaço é responsabilidade sua.",
            "Você pode desconectar a sua loja e pedir o encerramento da sua conta quando quiser, escrevendo para [{email}](mailto:{email}).",
          ],
          it: [
            "Per usare {app} ti servono un account e un negozio Shopify tuo o che sei autorizzato a gestire. Sei responsabile di mantenere sicuro l'accesso al tuo account.",
            "Garantisci di avere il diritto di usare il logo, le immagini, i testi e i marchi che carichi, e che le informazioni del tuo spazio sono veritiere.",
            "Sei tu a vendere i tuoi prodotti: prezzi, disponibilità, spedizioni, cambi, resi, garanzie, fatturazione e imposte sono sotto la tua responsabilità, così come rispettare le norme a tutela dei consumatori e le altre che ti si applicano.",
            "Ogni spazio viene revisionato prima della pubblicazione. Possiamo rifiutarlo, chiedere modifiche o ritirarlo se viola questi termini, offre prodotti illegali o ingannevoli, o riceve reclami fondati.",
            "I suggerimenti di testo creati con l'intelligenza artificiale sono un punto di partenza: rivedili prima di pubblicarli, perché ciò che viene pubblicato nel tuo spazio è sotto la tua responsabilità.",
            "Puoi scollegare il tuo negozio e chiedere la chiusura del tuo account in qualsiasi momento scrivendoci a [{email}](mailto:{email}).",
          ],
        },
      },
    ],
  },

  floppy: {
    updatedAt: FIRST_VERSION,
    sections: [
      {
        title: {
          es: "Inteligencia artificial y contenido que guardas",
          en: "Artificial intelligence and the content you save",
          pt: "Inteligência artificial e o conteúdo que você salva",
          it: "Intelligenza artificiale e contenuti che salvi",
        },
        items: {
          es: [
            "{app} usa inteligencia artificial (Google Gemini) para convertir audios, fotos, textos y enlaces en tareas, gastos y guardados. Puede equivocarse con fechas, montos, categorías o resúmenes: revisa lo importante antes de confiar en ello.",
            "{app} es una herramienta de organización personal: no es un sistema contable, de facturación ni de asesoramiento financiero.",
            "Guarda solo contenido que tengas derecho a usar, y no cargues datos sensibles de otras personas sin su permiso.",
            "Algunas funciones están en desarrollo y pueden cambiar o no estar disponibles.",
          ],
          en: [
            "{app} uses artificial intelligence (Google Gemini) to turn audio, photos, text and links into tasks, expenses and saved items. It may get dates, amounts, categories or summaries wrong: check anything important before relying on it.",
            "{app} is a personal organisation tool: it is not an accounting, invoicing or financial advice system.",
            "Only save content you have the right to use, and do not upload other people's sensitive data without their permission.",
            "Some features are in development and may change or be unavailable.",
          ],
          pt: [
            "O {app} usa inteligência artificial (Google Gemini) para transformar áudios, fotos, textos e links em tarefas, gastos e itens salvos. Pode errar datas, valores, categorias ou resumos: confira o que for importante antes de confiar.",
            "O {app} é uma ferramenta de organização pessoal: não é um sistema contábil, de faturamento nem de aconselhamento financeiro.",
            "Salve apenas conteúdo que você tenha direito de usar, e não envie dados sensíveis de outras pessoas sem a permissão delas.",
            "Algumas funções estão em desenvolvimento e podem mudar ou não estar disponíveis.",
          ],
          it: [
            "{app} usa l'intelligenza artificiale (Google Gemini) per trasformare audio, foto, testi e link in attività, spese ed elementi salvati. Può sbagliare date, importi, categorie o riepiloghi: controlla ciò che è importante prima di fidarti.",
            "{app} è uno strumento di organizzazione personale: non è un sistema contabile, di fatturazione né di consulenza finanziaria.",
            "Salva solo contenuti che hai il diritto di usare e non caricare dati sensibili di altre persone senza il loro permesso.",
            "Alcune funzioni sono in sviluppo e possono cambiare o non essere disponibili.",
          ],
        },
      },
    ],
  },

  bumko: {
    updatedAt: FIRST_VERSION,
    sections: [
      {
        title: {
          es: "Ventas, stock y cuentas",
          en: "Sales, stock and accounts",
          pt: "Vendas, estoque e contas",
          it: "Vendite, magazzino e account",
        },
        items: {
          es: [
            "{app} es una herramienta para registrar ventas y controlar stock. **No es un sistema de facturación ni emite comprobantes fiscales**: las obligaciones de facturación, impuestos y habilitaciones de tu evento o comercio son responsabilidad tuya.",
            "Los totales y reportes se calculan con lo que se registra en la app. Controla la caja y el stock reales: no respondemos por diferencias debidas a errores de carga, ventas sin registrar o falta de conexión.",
            "Para usar {app} necesitas una cuenta. Quien administra el bar decide quién vende desde su teléfono y es responsable de lo que hacen las personas que suma.",
            "Mantén seguro el acceso a tu cuenta y avísanos a [{email}](mailto:{email}) si crees que alguien entró sin permiso.",
          ],
          en: [
            "{app} is a tool for recording sales and tracking stock. **It is not an invoicing system and does not issue tax receipts**: the invoicing, tax and licensing obligations of your event or business are your responsibility.",
            "Totals and reports are calculated from what is recorded in the app. Check the real cash and stock: we are not liable for differences caused by input errors, unrecorded sales or lack of connection.",
            "To use {app} you need an account. Whoever manages the bar decides who sells from their phone and is responsible for what the people they add do.",
            "Keep access to your account secure and let us know at [{email}](mailto:{email}) if you think someone got in without permission.",
          ],
          pt: [
            "O {app} é uma ferramenta para registrar vendas e controlar o estoque. **Não é um sistema de faturamento nem emite documentos fiscais**: as obrigações de faturamento, impostos e licenças do seu evento ou comércio são responsabilidade sua.",
            "Os totais e relatórios são calculados com o que é registrado no app. Confira o caixa e o estoque reais: não respondemos por diferenças causadas por erros de registro, vendas não registradas ou falta de conexão.",
            "Para usar o {app} você precisa de uma conta. Quem administra o bar decide quem vende pelo celular e é responsável pelo que fazem as pessoas que adiciona.",
            "Mantenha seguro o acesso à sua conta e avise-nos em [{email}](mailto:{email}) se achar que alguém entrou sem permissão.",
          ],
          it: [
            "{app} è uno strumento per registrare le vendite e controllare il magazzino. **Non è un sistema di fatturazione e non emette documenti fiscali**: gli obblighi di fatturazione, fiscali e autorizzativi del tuo evento o della tua attività sono sotto la tua responsabilità.",
            "Totali e report sono calcolati in base a ciò che viene registrato nell'app. Controlla la cassa e il magazzino reali: non rispondiamo di differenze dovute a errori di inserimento, vendite non registrate o mancanza di connessione.",
            "Per usare {app} ti serve un account. Chi gestisce il bar decide chi vende dal proprio telefono ed è responsabile di ciò che fanno le persone che aggiunge.",
            "Mantieni sicuro l'accesso al tuo account e avvisaci a [{email}](mailto:{email}) se pensi che qualcuno sia entrato senza permesso.",
          ],
        },
      },
    ],
  },
};

/** Cláusulas propias de una app, o null si no tiene. */
export function getAppTerms(slug: string): AppTermsExtra | null {
  return appTerms[slug] ?? null;
}

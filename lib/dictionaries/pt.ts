import type { Block } from "@/components/rich-text";
import type { Dictionary } from "@/lib/dictionaries/es";

export const pt: Dictionary = {
  nav: {
    apps: "Apps",
    about: "Sobre nós",
    support: "Suporte",
    contact: "Contato",
    home: "Início",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    skipToContent: "Ir para o conteúdo",
    languageLabel: "Idioma",
    homeAria: "ImagoStack — início",
  },

  footer: {
    pitch:
      "Apps que são bons de usar. Projetamos, desenvolvemos e mantemos nossos próprios apps para Android, da ideia até a Play Store.",
    apps: "Apps",
    allApps: "Ver todos",
    company: "Empresa",
    legal: "Jurídico",
    privacy: "Privacidade",
    terms: "Termos de uso",
    deleteData: "Excluir meus dados",
    rights: "Todos os direitos reservados.",
    trademark:
      "Google Play e o logo do Google Play são marcas registradas da Google LLC.",
  },

  home: {
    badge: "Apps próprios para Android",
    intro:
      "Somos a ImagoStack: pensamos, projetamos, desenvolvemos, publicamos e mantemos nossos próprios aplicativos para Android. Todo o ciclo, toda a pilha — sem intermediários.",
    seeApps: "Ver nossos apps",
    howWeWork: "Como trabalhamos",
    appsKicker: "Nossos apps",
    appsTitle: "Qualidade profissional, sem exceções",
    appsLink: "Ver o catálogo completo",
    ideaTitle: "Tem uma ideia?",
    ideaText:
      "Se existe um problema que você gostaria de resolver com um app, queremos ouvir.",
    ideaLink: "Contar uma ideia →",
    aboutKicker: "Sobre nós",
    aboutTitle: "Materializamos ideias",
    contactKicker: "Vamos conversar",
    contactTitle: "Tem uma ideia, dúvida ou encontrou um erro?",
    contactText:
      "Escreva para a gente e respondemos em menos de 48 horas úteis. Se for sobre algum dos nossos apps, conte o modelo do seu celular e a versão do Android para podermos ajudar mais rápido.",
    supportCenter: "Central de suporte",
    pillars: [
      {
        icon: "palette",
        title: "Design primeiro",
        description:
          "Cada tela é prototipada e testada antes de escrever uma linha de código. Se uma função não se explica sozinha, ainda não está pronta.",
      },
      {
        icon: "bolt",
        title: "Rápidos de verdade",
        description:
          "Apps leves, que abrem na hora e não consomem a bateria nem os dados do celular.",
      },
      {
        icon: "shield",
        title: "Privacidade por padrão",
        description:
          "Coletamos o mínimo indispensável, declaramos com clareza e nunca vendemos as informações dos nossos usuários.",
      },
      {
        icon: "users",
        title: "Suporte de verdade",
        description:
          "Do outro lado do e-mail tem gente. Respondemos todas as mensagens em menos de 48 horas úteis.",
      },
    ],
    steps: [
      {
        title: "Ideia e validação",
        description:
          "Definimos o problema concreto que o app resolve e descartamos tudo o que não contribui para isso.",
      },
      {
        title: "Design e protótipo",
        description:
          "Montamos o fluxo inteiro em protótipos navegáveis para testar com usuários reais.",
      },
      {
        title: "Desenvolvimento",
        description:
          "Construímos com foco em performance, acessibilidade e compatibilidade com o maior número de dispositivos.",
      },
      {
        title: "Publicação e melhoria",
        description:
          "Publicamos na Google Play e seguimos iterando com as métricas e o feedback da comunidade.",
      },
    ],
  },

  services: {
    kicker: "Também fazemos",
    title: "Desenvolvimento web de ponta a ponta",
    intro:
      "O mesmo jeito de trabalhar que aplicamos aos nossos apps fica à disposição de outros projetos: produtos web completos, com backend, painel admin, dados e camada de inteligência.",
    cards: [
      {
        icon: "code",
        title: "Aplicações web sob medida",
        description:
          "Site e backend em um só projeto, com React e TypeScript. Rápidos, acessíveis e prontos para escalar desde o primeiro dia.",
      },
      {
        icon: "layout",
        title: "Painel sob medida",
        description:
          "Para você administrar seu negócio sem depender de ninguém: produtos, preços, agendamentos ou conteúdo, com permissões por usuário.",
      },
      {
        icon: "database",
        title: "Dados, contas e arquivos",
        description:
          "Bancos de dados em tempo real, cadastro e login, e armazenamento de arquivos na nuvem.",
      },
      {
        icon: "chat",
        title: "Chatbot com inteligência artificial",
        description:
          "Conectado às informações reais do seu negócio, não respostas genéricas. Atende a qualquer hora e passa para uma pessoa quando precisa.",
        action: "chat",
      },
      {
        icon: "card",
        title: "Integração com Mercado Pago",
        description:
          "Receba pagamentos no seu site com a plataforma que seus clientes já usam, com o status de cada pagamento no seu painel.",
      },
      {
        icon: "message",
        title: "WhatsApp Business API",
        description:
          "O canal onde seus clientes já estão: avisos, confirmações e lembretes automáticos direto do seu sistema.",
      },
      {
        icon: "chart",
        title: "Google Analytics e medição",
        description:
          "Saber de onde vêm as pessoas, o que olham e o que faz elas comprarem. Configurado desde o primeiro dia, não depois.",
      },
      {
        icon: "link",
        title: "Integrações e automações",
        description:
          "E-mail, calendários, APIs de terceiros e tudo o que precisar ser conectado para o produto funcionar sozinho.",
      },
    ],
    chatCta: "Experimente aqui",
    stackLabel: "Com o que trabalhamos",
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
    cta: "Conte seu projeto",
  },

  appsPage: {
    kicker: "Catálogo",
    title: "Nossos apps",
    subtitleMany:
      "{count} aplicativos para Android, em {categories} categorias. Todos são baixados pela Google Play.",
    subtitleOne:
      "{count} aplicativos para Android de {category}. Todos são baixados pela Google Play.",
  },

  appPage: {
    backToApps: "Todos os apps",
    screenshotsTitle: "Como fica",
    screenshotsHint:
      "Escolha uma miniatura para percorrer as telas, ou toque na captura grande para ampliá-la.",
    aboutTitle: "Sobre o {app}",
    privacyLink: "Política de privacidade",
    helpLink: "Preciso de ajuda",
    downloadTitle: "Baixe o {app}",
    downloadText: "Disponível para Android na Google Play.",
    otherApps: "Outros apps",
    availableIn: "Disponível em",
  },

  gallery: {
    zoom: "Ampliar: {alt}",
    thumb: "Ver captura {n} de {app}",
    previous: "Captura anterior",
    next: "Próxima captura",
    close: "Fechar",
  },

  support: {
    kicker: "Suporte",
    title: "Estamos do outro lado",
    intro:
      "Se algo não funciona, se falta uma função ou se você só quer contar alguma coisa, escreva para a gente. Respondemos em menos de 48 horas úteis.",
    writeUs: "Fale com a gente",
    formTitle: "Fale com a gente",
    formIntro:
      "Preencha o formulário e respondemos em menos de 48 horas úteis. Quanto mais contexto você der, mais rápido resolvemos.",
    formTips: [
      "Conte o que você esperava que acontecesse e o que aconteceu no lugar.",
      "Inclua o modelo do seu celular e a versão do Android.",
      "Se puder, anexe uma captura de tela ao responder o e-mail.",
    ],
    perAppTitle: "Ajuda por aplicativo",
    perAppText:
      "Cada app tem sua página e sua própria política de privacidade. Se a sua dúvida é sobre um em particular, toque no atalho dele e o formulário já fica com esse app selecionado.",
    seeApp: "Ver o app",
    privacy: "Privacidade",
    writeAbout: "Escrever sobre {app}",
    faqTitle: "Perguntas frequentes",
    faqFooter:
      "Sua pergunta não estava aqui? [Escreva para a gente](mailto:{email}) e resolvemos. Você também pode ver como [excluir seus dados]({deleteDataUrl}).",
    faqs: [
      {
        question: "Quanto tempo demoram para responder?",
        answer:
          "Menos de 48 horas úteis. Quem responde é uma pessoa da equipe, não um bot nem uma resposta automática.",
      },
      {
        question: "Encontrei um erro, quais informações ajudam vocês?",
        answer:
          "O nome do app, o modelo do seu celular, a versão do Android e, se possível, uma captura de tela e os passos para reproduzir o problema. Com isso costumamos resolver já na primeira resposta.",
      },
      {
        question: "Posso passar meus dados para outro celular?",
        answer:
          "Depende do app: os que guardam histórico têm funções de exportar e importar. Se você não encontrar a opção, escreva para a gente que orientamos.",
      },
      {
        question: "Como apago todas as minhas informações?",
        answer:
          "Você pode fazer isso pelo próprio app ou desinstalando-o, já que os dados ficam no seu dispositivo. O procedimento completo está na página de exclusão de dados.",
      },
      {
        question: "Tenho uma ideia para um app, vocês leem?",
        answer:
          "Sim, e com prazer. Várias das funções que existem hoje saíram de mensagens de usuários. Escreva contando o problema que você gostaria de resolver.",
      },
      {
        question: "Como reporto um problema de cobrança da Google Play?",
        answer:
          "Cobranças, reembolsos e assinaturas são administrados pela Google Play. Nesses casos convém usar o suporte do Google, mas se você escrever para a gente ajudamos a encontrar o caminho.",
      },
    ],
  },

  form: {
    name: "Seu nome",
    namePlaceholder: "Como podemos te chamar",
    email: "Seu e-mail",
    emailPlaceholder: "para podermos responder",
    about: "Sobre o que você está escrevendo?",
    general: "Dúvida geral",
    idea: "Tenho uma ideia para um app",
    message: "Sua mensagem",
    messagePlaceholder:
      "Se for um problema técnico, conte o modelo do seu celular e a versão do Android.",
    submit: "Enviar mensagem",
    sending: "Enviando…",
    sentTitle: "Mensagem enviada!",
    sentText:
      "Recebemos e respondemos no seu e-mail em menos de 48 horas úteis.",
    sendAnother: "Enviar outra mensagem",
    privacyNote:
      "Usamos seu nome e seu e-mail apenas para responder. Não compartilhamos com ninguém nem incluímos você em nenhuma lista.",
    errorText:
      "Não conseguimos enviar a mensagem. Pode ser um problema momentâneo de conexão.",
    errorAction: "Escreva por e-mail",
    bodyName: "Nome",
    bodyEmail: "E-mail",
    bodyAbout: "Sobre",
  },

  chat: {
    open: "Abrir o chat",
    close: "Fechar o chat",
    title: "Assistente da ImagoStack",
    subtitle: "Responde na hora",
    greeting:
      "Olá! Posso falar sobre nossos apps ou sobre o desenvolvimento web que fazemos. Do que você precisa?",
    placeholder: "Escreva sua dúvida…",
    send: "Enviar",
    thinking: "Digitando…",
    suggestions: [
      "Quais apps vocês têm?",
      "Vocês fazem sites sob medida?",
      "Quais tecnologias vocês usam?",
    ],
    handoff:
      "Não consigo responder agora. Deixe sua dúvida no formulário e respondemos em menos de 48 horas úteis.",
    handoffCta: "Ir para o formulário",
    limited: "Muitas mensagens seguidas. Espere um instante e tente de novo.",
    operator: "A partir de agora você está sendo atendido por uma pessoa.",
    disclaimer: "Assistente automático. Pode errar.",
    retry: "Tentar de novo",
  },

  notFound: {
    code: "ERRO 404",
    title: "Esta tela não existe",
    text: "A página que você procurava mudou de lugar ou nunca esteve aqui. Tente pelo início ou veja o catálogo de apps.",
    home: "Ir para o início",
    apps: "Ver os apps",
  },

  legal: {
    kicker: "Jurídico",
    updatedAt: "Última atualização:",
    back: "Voltar",
    backToApp: "Voltar para {app}",
    yourData: "Seus dados",
  },

  privacyPage: {
    title: "Política de privacidade",
    intro:
      "Quais dados a ImagoStack trata, para que os usa e que controle você tem sobre eles.",
    highlight:
      "**Resumindo:** este site não usa cookies de rastreamento nem sistemas de analytics. Nossos apps guardam as informações que você insere no seu próprio dispositivo. Não vendemos dados e não compartilhamos informações com terceiros para publicidade.",
    perAppIntro:
      "Esta política se aplica ao site **{domain}** e, de forma geral, aos aplicativos publicados pela {company}. Cada app tem ainda a sua própria política específica, que prevalece em caso de divergência:",
    perAppLink: "Política de privacidade do {app}",
    blocks: [
      { h2: "1. Responsável pelo tratamento" },
      {
        p: "A **{company}**, com sede em {jurisdiction}, é responsável pelo tratamento dos dados descritos nesta política. Contato: [{email}](mailto:{email}).",
      },
      { h2: "2. Dados que tratamos neste site" },
      { h3: "Navegação" },
      {
        p: "{domain} é um site estático. Não usamos cookies próprios de rastreamento, nem pixels publicitários, nem ferramentas de analytics que montem perfis. Nosso provedor de hospedagem pode registrar automaticamente dados técnicos —endereço IP, tipo de navegador, data e hora da requisição— em seus registros de servidor, com a única finalidade de operar o serviço e prevenir abusos.",
      },
      { h3: "Formulário de contato" },
      {
        p: "Quando você envia o formulário, seu nome, seu e-mail e sua mensagem vão até o nosso servidor e são despachados para a nossa caixa através do **Resend**, o provedor de envio de e-mail que usamos. **Não guardamos esse conteúdo em nenhum banco de dados**: ele chega ao nosso e-mail e é tratado ali como qualquer outra mensagem. Usamos apenas para responder, e você pode ler a [política de privacidade do Resend](https://resend.com/legal/privacy-policy).",
      },
      { h3: "E-mail" },
      {
        p: "Se você nos escrever, tratamos o seu endereço de e-mail e o conteúdo da mensagem com a única finalidade de responder. Guardamos essa correspondência pelo tempo necessário para acompanhar a sua solicitação e depois a excluímos.",
      },
      { h2: "3. Dados tratados pelos nossos aplicativos" },
      {
        p: "Nossos apps são feitos para funcionar sem que precisemos dos seus dados: não exigem criar conta e as informações que você insere ficam no armazenamento privado do seu dispositivo. Para o detalhe de cada um, consulte a política específica na lista acima.",
      },
      { h2: "4. Finalidade e base legal" },
      {
        p: "Tratamos dados apenas para: (a) responder às suas solicitações, com base no seu consentimento; (b) manter o site e os apps operacionais e seguros, com base no nosso legítimo interesse; e (c) cumprir obrigações legais quando aplicável.",
      },
      { h2: "5. Terceiros e transferências" },
      {
        p: "Não vendemos, alugamos nem cedemos dados pessoais. Utilizamos provedores de infraestrutura para hospedar este site, o **Resend** para despachar as mensagens do formulário de contato e um provedor de e-mail para gerenciar nossas caixas. Todos atuam como operadores e podem manter servidores fora de {jurisdiction}. Os apps são distribuídos pela Google Play: o download, o pagamento (quando houver) e as métricas agregadas da loja são geridos pela Google LLC segundo a sua própria política de privacidade.",
      },
      { h2: "6. Retenção" },
      {
        p: "Guardamos os dados apenas enquanto existir uma finalidade que justifique. Os dados que ficam no seu dispositivo são controlados por você e desaparecem ao apagá-los pelo app ou ao desinstalá-lo.",
      },
      { h2: "7. Seus direitos" },
      {
        p: "Você pode solicitar acesso, retificação, atualização, exclusão, portabilidade ou limitação do tratamento dos seus dados, e se opor a ele, escrevendo para [{email}](mailto:{email}). Respondemos dentro dos prazos legais aplicáveis.",
      },
      {
        p: "Em {jurisdiction}, a Agência de Acesso à Informação Pública é o órgão de controle da Lei 25.326 e tem atribuição para receber denúncias de descumprimento.",
      },
      { h2: "8. Menores de idade" },
      {
        p: "Nem este site nem nossos apps são dirigidos a menores de 13 anos, e não coletamos seus dados de forma consciente.",
      },
      { h2: "9. Segurança" },
      {
        p: "O site é servido integralmente por HTTPS. Aplicamos medidas técnicas e organizacionais razoáveis para proteger as informações, começando pela mais eficaz: coletar o mínimo indispensável.",
      },
      { h2: "10. Alterações" },
      {
        p: "Publicamos qualquer atualização neste mesmo endereço, com a data de vigência no cabeçalho.",
      },
      { h2: "11. Contato" },
      {
        p: "{company} — {jurisdiction}. Suporte e privacidade: [{email}](mailto:{email}). Dúvidas gerais: [{generalEmail}](mailto:{generalEmail}).",
      },
    ] as Block[],
  },

  termsPage: {
    title: "Termos de uso",
    intro:
      "As condições sob as quais disponibilizamos o site {domain} e nossos aplicativos.",
    blocks: [
      { h2: "1. Aceitação" },
      {
        p: "Ao baixar, instalar ou usar qualquer um dos aplicativos da **{company}**, ou ao utilizar este site, você aceita estes termos. Se não concordar, não use o serviço.",
      },
      { h2: "2. Licença de uso" },
      {
        p: "Concedemos a você uma licença pessoal, limitada, revogável, não exclusiva e intransferível para instalar e usar nossos aplicativos em dispositivos que você controle, para fins pessoais e não comerciais. A licença não implica transferência de propriedade.",
      },
      { p: "Não é permitido:" },
      {
        ul: [
          "Copiar, modificar, traduzir ou criar obras derivadas do aplicativo.",
          "Aplicar engenharia reversa, descompilar ou desmontar o software, salvo na medida em que a lei permita expressamente.",
          "Redistribuir, revender, sublicenciar ou publicar o aplicativo em outras lojas ou repositórios.",
          "Remover ou alterar avisos de autoria, marcas ou notas de propriedade intelectual.",
          "Usar o aplicativo para atividades ilegais ou que violem direitos de terceiros.",
        ],
      },
      { h2: "3. Distribuição pela Google Play" },
      {
        p: "Nossos aplicativos são distribuídos pela Google Play. O download, a atualização e —quando houver— a cobrança também se regem pelos termos do Google. As devoluções de compras feitas na loja seguem a política de reembolsos da Google Play.",
      },
      { h2: "4. Conteúdo e responsabilidade do usuário" },
      {
        p: "As informações que você insere nos nossos apps são suas e você é responsável por elas, inclusive pelo backup. Quando os dados ficam apenas no seu dispositivo, não temos como recuperá-los se você os apagar, perder o celular ou desinstalar o aplicativo.",
      },
      { h2: "5. Conteúdo de entretenimento" },
      {
        p: "Alguns dos nossos aplicativos oferecem conteúdo de caráter simbólico, recreativo ou de entretenimento —por exemplo, leituras de oráculos— e destinam-se à reflexão e ao lazer. Esse conteúdo **não constitui aconselhamento profissional de nenhum tipo** (médico, psicológico, jurídico, financeiro ou outro) e não deve servir de base para decisões que exijam a opinião de um profissional habilitado. As estatísticas e métricas geradas pelos nossos apps esportivos dependem das informações inseridas por quem os usa e não pretendem ser um registro oficial.",
      },
      { h2: "6. Disponibilidade e alterações" },
      {
        p: "Trabalhamos para que tudo funcione, mas o serviço é oferecido “no estado em que se encontra”. Podemos atualizar, modificar, suspender ou descontinuar funcionalidades ou aplicativos inteiros. Quando a mudança for relevante, vamos tentar avisar com antecedência razoável.",
      },
      { h2: "7. Garantias" },
      {
        p: "Na máxima medida permitida pela lei, os aplicativos são fornecidos sem garantias de nenhum tipo, expressas ou implícitas, incluindo comerciabilidade, adequação a uma finalidade específica ou funcionamento ininterrupto e livre de erros. Nada aqui limita os direitos que você tenha como consumidor conforme a legislação aplicável, incluída a Lei 24.240 de Defesa do Consumidor de {jurisdiction}.",
      },
      { h2: "8. Limitação de responsabilidade" },
      {
        p: "Na máxima medida permitida pela lei, a {company} não será responsável por danos indiretos, incidentais, especiais ou consequentes, nem por perda de dados, de oportunidades ou de lucros, decorrentes do uso ou da impossibilidade de uso dos aplicativos.",
      },
      { h2: "9. Propriedade intelectual" },
      {
        p: "O software, os designs, as ilustrações, os textos, a marca ImagoStack e os nomes dos nossos aplicativos pertencem à {company} ou aos seus licenciantes, e estão protegidos pelas leis de propriedade intelectual. Google Play e o logo do Google Play são marcas registradas da Google LLC.",
      },
      { h2: "10. Rescisão" },
      {
        p: "Você pode deixar de usar o serviço a qualquer momento desinstalando o aplicativo. Podemos suspender a licença se você descumprir estes termos.",
      },
      { h2: "11. Lei aplicável e foro" },
      {
        p: "Estes termos se regem pelas leis de {jurisdiction}. Qualquer controvérsia será submetida aos tribunais competentes dessa jurisdição, sem prejuízo das normas de proteção ao consumidor aplicáveis no seu local de residência.",
      },
      { h2: "12. Contato" },
      {
        p: "Qualquer dúvida sobre estes termos: [{generalEmail}](mailto:{generalEmail}).",
      },
    ] as Block[],
  },

  deleteDataPage: {
    title: "Excluir meus dados",
    intro:
      "Esta página explica como apagar as informações associadas aos nossos aplicativos, conforme exige a política de dados do usuário da Google Play.",
    highlight:
      "**O mais importante:** nossos aplicativos não exigem criar conta e guardam as informações no seu próprio dispositivo. Isso significa que **você controla a exclusão**: não há uma conta nos nossos servidores para encerrar.",
    blocks: [
      { h2: "Opção 1 — Apagar pelo aplicativo" },
      {
        p: "É a forma mais precisa, porque permite excluir só o que você quer excluir:",
      },
      {
        ul: [
          "Abra o app e vá até a lista correspondente (por exemplo, o histórico ou a lista de registros).",
          "Use o ícone de excluir de cada item para apagá-lo individualmente.",
          "Se quiser começar do zero, apague todos os itens da lista ou use a opção de redefinir, quando o app oferecer.",
        ],
      },
      { h2: "Opção 2 — Limpar os dados pelo Android" },
      {
        p: "Remove de uma vez tudo o que o aplicativo tiver guardado no dispositivo, sem desinstalá-lo:",
      },
      {
        ol: [
          "Abra as _Configurações_ do seu celular.",
          "Entre em _Aplicativos_ e escolha o app.",
          "Toque em _Armazenamento_.",
          "Toque em _Limpar dados_ (ou _Limpar armazenamento_) e confirme.",
        ],
      },
      {
        p: "O nome exato de cada opção pode variar conforme o fabricante e a versão do Android.",
      },
      { h2: "Opção 3 — Desinstalar o aplicativo" },
      {
        p: "Ao desinstalar, o Android remove o armazenamento privado do app junto com ele. Lembre-se de que **esta ação não pode ser desfeita**: se quiser manter as suas informações, exporte-as antes pelo app.",
      },
      { h2: "Backups do sistema" },
      {
        p: "Se você tiver o backup do Google ativado, o sistema operacional pode ter salvo os dados do app na sua conta Google. Esse backup é administrado pelo Google, não pela {company}, e você pode gerenciá-lo em _Configurações → Google → Backup_.",
      },
      { h2: "Solicitar a exclusão por escrito" },
      {
        p: "Se ainda assim você preferir que nós cuidemos de um pedido de exclusão, ou se trocamos e-mails e você quer que apaguemos essa troca, escreva para [{email}](mailto:{email}) a partir do endereço envolvido, indicando:",
      },
      {
        ul: [
          "O nome do aplicativo.",
          "Quais informações você quer excluir.",
        ],
      },
      {
        p: "Confirmamos o recebimento e resolvemos o pedido em no máximo 30 dias corridos. Não cobramos por isso.",
      },
      { h2: "O que guardamos e por quanto tempo" },
      {
        p: "Não mantemos bancos de dados de usuários dos nossos aplicativos. Quando você nos escreve, guardamos a troca de e-mails só enquanto for útil para acompanhar a sua solicitação, e depois a excluímos. Se uma obrigação legal, contábil ou de defesa de direitos exigir que retenhamos algum dado, o guardamos apenas pelo prazo que essa obrigação impuser.",
      },
      { h2: "Detalhe por aplicativo" },
      {
        p: "Cada app descreve exatamente quais informações trata na sua própria política:",
      },
    ] as Block[],
    appLink: "Política de privacidade do {app}",
    seeAlso: "Veja também nossa [política de privacidade geral]({privacyUrl}).",
  },

  appPrivacy: {
    title: "Política de privacidade do {app}",
    intro:
      "Esta política explica quais dados o {app} trata, para que os usa e que controle você tem sobre eles.",
    summaryLead: "**Resumindo:**",
    summaryNoData: "O {app} não coleta dados pessoais.",
    summaryOnDevice:
      "O {app} guarda as informações que você insere apenas no seu dispositivo. Não temos servidores com os seus dados, não é preciso criar conta e não vendemos nem compartilhamos informações com terceiros.",
    summaryOnDeviceShared:
      "O {app} guarda no seu dispositivo apenas o que está detalhado abaixo, e não é preciso criar conta. Não temos servidores com os seus dados nem vendemos informações. Para exibir os anúncios, o provedor de publicidade pode tratar identificadores do seu dispositivo, como explicado na seção 5.",
    summaryServer:
      "O {app} trata os dados detalhados abaixo, com a única finalidade de fazer o app funcionar.",
    adsYes: "O app exibe publicidade.",
    adsNo: "O app não exibe publicidade.",
    iapYes: "Inclui compras dentro do aplicativo.",
    iapNo: "Não inclui compras dentro do aplicativo.",

    s1: "1. Quem somos",
    s1p: "O {app} é um aplicativo desenvolvido e publicado pela **{company}** (“nós”). Para qualquer dúvida sobre privacidade, escreva para [{email}](mailto:{email}).",

    s2: "2. Quais dados o aplicativo trata",
    s2none:
      "O {app} **não coleta nenhum dado pessoal**. Não pede cadastro, não acessa seus contatos, sua localização nem seus arquivos, e não gera identificadores para rastrear você.",
    s2intro:
      "O app trata apenas as informações que você insere para que ele funcione. Em detalhe:",
    s2item: "**{type}.** {purpose} É armazenado em {storage}.",
    s2device: "seu próprio dispositivo",
    s2server: "nossos servidores",
    s2closing:
      "Não coletamos seu nome, seu e-mail, sua localização, sua agenda de contatos nem identificadores publicitários. Também não criamos perfis de usuário nem fazemos rastreamento entre aplicativos.",
    s2closingAds:
      "Não coletamos seu nome, seu e-mail, sua localização nem sua agenda de contatos, e não criamos perfis de usuário com esses dados. Os identificadores publicitários são tratados pelo provedor de anúncios, não por nós: o detalhe está na seção 5.",

    s3: "3. Onde seus dados ficam guardados",
    s3device:
      "Toda a informação é processada e guardada **localmente no seu dispositivo**, dentro do armazenamento privado do aplicativo. Não é transmitida aos nossos servidores porque, para o funcionamento do {app}, não precisamos tê-la.",
    s3server:
      "Parte da informação é processada em servidores próprios ou de provedores de infraestrutura contratados pela {company}, com medidas de segurança compatíveis com o tipo de dado.",
    s3backup:
      "Se você fizer backup do celular, o sistema operacional pode incluir os dados do app nesse backup. Esse backup é gerenciado pelo Google ou pelo fabricante do seu dispositivo segundo as políticas deles, não pela {company}.",

    s4: "4. Permissões que o app solicita",
    s4none:
      "O {app} não solicita permissões sensíveis do Android: nem câmera, nem microfone, nem localização, nem contatos, nem armazenamento externo.",
    s4intro:
      "Só pedimos as permissões estritamente necessárias, e sempre explicando para quê:",
    s4item: "**{name}.** {reason}",

    s5: "5. Compartilhamento com terceiros",
    s5none:
      "**Não compartilhamos, vendemos, alugamos nem cedemos informações a terceiros.** O {app} não integra SDKs de publicidade, de analytics nem de redes sociais.",
    s5intro:
      "Para que algumas funções existam, o app usa os seguintes serviços de terceiros, que podem tratar dados segundo as suas próprias políticas:",
    s5ads:
      "O {app} é financiado com **anúncios em vídeo com recompensa**: são opcionais e aparecem só se você escolher assistir em troca de um benefício dentro do app. Nunca aparecem automaticamente nem interrompem uma leitura. Para exibi-los usamos o seguinte provedor, que pode tratar o identificador de publicidade do seu dispositivo e dados técnicos da sessão segundo a sua própria política:",
    s5item: "**{name}.** {purpose} [Ver a política de privacidade]({url}).",
    s5legal:
      "Podemos divulgar informações apenas se uma autoridade competente exigir por meio de ordem legal válida.",

    s6: "6. Conteúdo que você compartilha",
    s6p: "Se você usar uma função do app para compartilhar conteúdo (por exemplo, enviar uma imagem ou um resumo por mensagem), esse envio é feito por você pelo aplicativo que escolher. A {company} não participa desse conteúdo nem guarda cópia.",

    s7: "7. Menores de idade",
    s7children:
      "O {app} é feito para o público infantil e cumpre a _Families Policy_ da Google Play.",
    s7notChildren:
      "O {app} **não é dirigido a menores de 13 anos** e não coleta dados de menores de forma consciente.",
    s7minAge:
      "Pelo tipo de conteúdo, recomendamos o uso a partir dos {age} anos.",
    s7report:
      "Se você acredita que um menor nos entregou informações, escreva para [{email}](mailto:{email}) e nós as excluímos.",

    s8: "8. Como apagar seus dados",
    s8device: [
      "Pelo app você pode apagar registros individuais ou limpar o histórico quando quiser.",
      "Se você desinstalar o {app}, o Android remove os dados locais do aplicativo junto com ele.",
      "Você também pode fazer isso em _Configurações → Aplicativos → {app} → Armazenamento → Limpar dados_.",
    ],
    s8server:
      "Você pode solicitar a exclusão dos seus dados escrevendo para [{email}](mailto:{email}). Processamos o pedido em até 30 dias.",
    s8more: "Mais detalhes na página de [exclusão de dados]({deleteDataUrl}).",

    s9: "9. Seus direitos",
    s9p: "Conforme a legislação aplicável a você (entre outras, a Lei 25.326 de Proteção de Dados Pessoais de {jurisdiction}, a LGPD brasileira e o RGPD europeu), você tem direito a acessar seus dados, retificá-los, excluí-los, limitá-los ou se opor ao tratamento.",
    s9device:
      "Como os dados do {app} ficam no seu dispositivo, esses direitos você exerce diretamente pelo app; de todo modo, estamos à disposição para ajudar.",
    s9server: "Escreva para exercê-los.",

    s10: "10. Segurança",
    s10p: "Aplicamos medidas técnicas razoáveis para proteger as informações, incluindo o uso do armazenamento privado do sistema operacional. Nenhum método é infalível, mas minimizamos o risco com a estratégia mais simples: não acumular dados de que não precisamos.",

    s11: "11. Alterações nesta política",
    s11p: "Se atualizarmos esta política, publicamos a nova versão neste mesmo endereço e mudamos a data do cabeçalho. Se a mudança for significativa, avisamos dentro do app.",

    s12: "12. Contato",
    s12p: "{company} — {jurisdiction}. Suporte e privacidade: [{email}](mailto:{email}).",
  },

  meta: {
    homeTitle: "ImagoStack — Apps para Android | Full-cycle, full-stack",
    homeDescription:
      "A ImagoStack projeta, desenvolve e publica seus próprios aplicativos para Android de ponta a ponta. Conheça nossos apps na Google Play.",
    ogHomeTitle: "ImagoStack — Apps para Android",
    appsTitle: "Nossos apps para Android",
    appsDescription: "Todos os aplicativos da ImagoStack para Android: {list}.",
    appsOgTitle: "Apps da ImagoStack para Android",
    appTitle: "{app} — app de {category} para Android",
    supportTitle: "Suporte e contato",
    supportDescription:
      "Ajuda para os aplicativos da ImagoStack: fale com a gente pelo formulário, veja as perguntas frequentes e conheça nossos prazos de resposta.",
    supportOgTitle: "Suporte da ImagoStack",
    privacyTitle: "Política de privacidade",
    privacyDescription:
      "Como a ImagoStack trata os dados pessoais no seu site e nos seus aplicativos.",
    termsTitle: "Termos de uso",
    termsDescription:
      "Condições de uso do site e dos aplicativos da ImagoStack.",
    deleteDataTitle: "Excluir meus dados",
    deleteDataDescription:
      "Como apagar as informações dos aplicativos da ImagoStack pelo seu dispositivo ou solicitando a exclusão.",
    appPrivacyTitle: "Política de privacidade do {app}",
    appPrivacyDescription:
      "Como o {app} trata seus dados: quais informações mantém, onde ficam guardadas e como você pode apagá-las.",
    keywords: [
      "ImagoStack",
      "apps para Android",
      "desenvolvimento de aplicativos",
      "Google Play",
      "estúdio de apps",
      "Vigía padel",
      "estatísticas de padel",
      "app de oráculos",
      "app de tarô",
    ],
  },

  og: {
    kicker: "ImagoStack",
    description:
      "Projetamos, desenvolvemos e publicamos nossos próprios aplicativos para Android.",
  },
};

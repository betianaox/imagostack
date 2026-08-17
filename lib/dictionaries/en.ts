import type { Block } from "@/components/rich-text";
import type { Dictionary } from "@/lib/dictionaries/es";

export const en: Dictionary = {
  nav: {
    apps: "Apps",
    about: "About",
    support: "Support",
    contact: "Contact",
    home: "Home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to content",
    languageLabel: "Language",
    homeAria: "ImagoStack — home",
  },

  footer: {
    pitch:
      "Mobile apps that feel good to use. We design, build and maintain our own Android apps, from the idea to the Play Store.",
    apps: "Apps",
    allApps: "See all",
    company: "Company",
    legal: "Legal",
    privacy: "Privacy",
    terms: "Terms of use",
    deleteData: "Delete my data",
    rights: "All rights reserved.",
    trademark:
      "Google Play and the Google Play logo are trademarks of Google LLC.",
  },

  home: {
    badge: "Our own Android apps",
    intro:
      "We are ImagoStack: we think up, design, build, publish and maintain our own Android applications. The whole cycle, the whole stack — no middlemen.",
    seeApps: "See our apps",
    howWeWork: "How we work",
    appsKicker: "Our apps",
    appsTitle: "Professional quality, no exceptions",
    appsLink: "See the full catalogue",
    ideaTitle: "Got an idea?",
    ideaText:
      "If there's a problem you'd like to solve with an app, we want to hear about it.",
    ideaLink: "Tell us your idea →",
    aboutKicker: "About us",
    aboutTitle: "We make ideas real",
    contactKicker: "Let's talk",
    contactTitle: "Got an idea, a question or found a bug?",
    contactText:
      "Write to us and we'll reply within 48 business hours. If it's about one of our apps, tell us your phone model and Android version so we can help you faster.",
    supportCenter: "Support centre",
    pillars: [
      {
        icon: "palette",
        title: "Design first",
        description:
          "Every screen is prototyped and tested before a single line of code is written. If a feature can't explain itself, it isn't ready yet.",
      },
      {
        icon: "bolt",
        title: "Genuinely fast",
        description:
          "Lightweight apps that start instantly and don't eat your battery or your mobile data.",
      },
      {
        icon: "shield",
        title: "Privacy by default",
        description:
          "We collect the bare minimum, we declare it clearly, and we never sell our users' information.",
      },
      {
        icon: "users",
        title: "Real support",
        description:
          "There are people on the other side of the inbox. We answer every message within 48 business hours.",
      },
    ],
    steps: [
      {
        title: "Idea and validation",
        description:
          "We define the concrete problem the app solves and drop everything that doesn't serve it.",
      },
      {
        title: "Design and prototype",
        description:
          "We build the whole flow as clickable prototypes so we can test it with real users.",
      },
      {
        title: "Development",
        description:
          "We build with a focus on performance, accessibility and compatibility with as many devices as possible.",
      },
      {
        title: "Release and improve",
        description:
          "We publish on Google Play and keep iterating with metrics and feedback from the community.",
      },
    ],
  },

  services: {
    kicker: "We also build",
    title: "End-to-end web development",
    intro:
      "The same way of working we apply to our own apps is available for other projects: complete web products, with backend, admin panel, data and an intelligence layer.",
    cards: [
      {
        icon: "code",
        title: "Custom web applications",
        description:
          "Site and backend in a single project, with React and TypeScript. Fast, accessible and ready to scale from day one.",
      },
      {
        icon: "layout",
        title: "Custom admin panel",
        description:
          "So you run your business without depending on anyone: products, prices, bookings or content, with per-user permissions.",
      },
      {
        icon: "database",
        title: "Data, accounts and files",
        description:
          "Real-time databases, sign-up and sign-in, and cloud file storage.",
      },
      {
        icon: "chat",
        title: "AI-powered chatbot",
        description:
          "Connected to your real business information, not generic answers. It handles questions around the clock and hands over to a person when needed.",
        action: "chat",
      },
      {
        icon: "card",
        title: "Mercado Pago integration",
        description:
          "Take payments on your site with the platform your customers already use, with every payment status reflected in your panel.",
      },
      {
        icon: "message",
        title: "WhatsApp Business API",
        description:
          "The channel your customers already live in: notices, confirmations and automatic reminders straight from your system.",
      },
      {
        icon: "chart",
        title: "Google Analytics and measurement",
        description:
          "Knowing where people come from, what they look at and what makes them buy. Set up from day one, not afterwards.",
      },
      {
        icon: "link",
        title: "Integrations and automation",
        description:
          "Email, calendars, third-party APIs and everything else that needs wiring up so the product runs on its own.",
      },
    ],
    chatCta: "Try it here",
    stackLabel: "What we work with",
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
      "Generative AI",
    ],
    cta: "Tell us about your project",
  },

  appsPage: {
    kicker: "Catalogue",
    title: "Our apps",
    subtitleMany:
      "{count} Android applications across {categories} categories. All of them download from Google Play.",
    subtitleOne:
      "{count} Android applications in {category}. All of them download from Google Play.",
  },

  appPage: {
    backToApps: "All apps",
    screenshotsTitle: "How it looks",
    screenshotsHint:
      "Pick a thumbnail to move through the screens, or tap the large screenshot to enlarge it.",
    aboutTitle: "About {app}",
    privacyLink: "Privacy policy",
    helpLink: "I need help",
    downloadTitle: "Download {app}",
    downloadText: "Available for Android on Google Play.",
    otherApps: "Other apps",
    availableIn: "Available in",
  },

  gallery: {
    zoom: "Enlarge: {alt}",
    thumb: "View screenshot {n} of {app}",
    previous: "Previous screenshot",
    next: "Next screenshot",
    close: "Close",
  },

  support: {
    kicker: "Support",
    title: "We're on the other side",
    intro:
      "If something isn't working, if you're missing a feature, or if you just want to tell us something, write to us. We reply within 48 business hours.",
    writeUs: "Write to us",
    formTitle: "Write to us",
    formIntro:
      "Fill in the form and we'll reply within 48 business hours. The more context you give us, the faster we solve it.",
    formTips: [
      "Tell us what you expected to happen and what happened instead.",
      "Add your phone model and your Android version.",
      "If you can, attach a screenshot when you reply to the email.",
    ],
    perAppTitle: "Help by application",
    perAppText:
      "Each app has its own page and its own privacy policy. If your question is about one in particular, tap its shortcut and the form will be ready with that app selected.",
    seeApp: "See the app",
    privacy: "Privacy",
    writeAbout: "Write about {app}",
    faqTitle: "Frequently asked questions",
    faqFooter:
      "Wasn't your question here? [Write to us](mailto:{email}) and we'll sort it out. You can also check how to [delete your data]({deleteDataUrl}).",
    faqs: [
      {
        question: "How long do you take to reply?",
        answer:
          "Under 48 business hours. A person from the team writes back — not a bot, not an autoresponder.",
      },
      {
        question: "I found a bug, what information helps you?",
        answer:
          "The app name, your phone model, your Android version and, if you can, a screenshot and the steps to reproduce the problem. With that we usually solve it in the first reply.",
      },
      {
        question: "Can I move my data to another phone?",
        answer:
          "It depends on the app: the ones that keep a history include export and import features. If you can't find the option, write to us and we'll walk you through it.",
      },
      {
        question: "How do I delete all my information?",
        answer:
          "You can do it from the app itself or by uninstalling it, since the data lives on your device. The full procedure is on the data deletion page.",
      },
      {
        question: "I have an idea for an app, do you read those?",
        answer:
          "Yes, and gladly. Several features that exist today came out of user messages. Write to us describing the problem you'd like to solve.",
      },
      {
        question: "How do I report a Google Play billing problem?",
        answer:
          "Charges, refunds and subscriptions are managed by Google Play. For those cases it's best to use Google's support, although if you write to us we'll help you find the way.",
      },
    ],
  },

  form: {
    name: "Your name",
    namePlaceholder: "What we should call you",
    email: "Your email",
    emailPlaceholder: "so we can reply",
    about: "What are you writing about?",
    general: "General enquiry",
    idea: "I have an idea for an app",
    message: "Your message",
    messagePlaceholder:
      "If it's a technical problem, tell us your phone model and your Android version.",
    submit: "Send message",
    sending: "Sending…",
    sentTitle: "Message sent!",
    sentText:
      "We got it, and we'll reply to your email within 48 business hours.",
    sendAnother: "Send another message",
    privacyNote:
      "We use your name and email only to reply to you. We don't share them with anyone and we won't add you to any list.",
    errorText:
      "We couldn't send your message. It may be a temporary connection problem.",
    errorAction: "Write to us by email",
    bodyName: "Name",
    bodyEmail: "Email",
    bodyAbout: "About",
  },

  chat: {
    open: "Open chat",
    close: "Close chat",
    title: "ImagoStack assistant",
    subtitle: "Replies instantly",
    greeting:
      "Hi! I can tell you about our apps or about the web development we do. What do you need?",
    placeholder: "Type your question…",
    send: "Send",
    thinking: "Typing…",
    suggestions: [
      "What apps do you have?",
      "Do you build custom sites?",
      "What technologies do you use?",
    ],
    handoff:
      "I can't answer right now. Leave your question in the form and we'll reply within 48 business hours.",
    handoffCta: "Go to the form",
    limited: "Too many messages in a row. Wait a moment and try again.",
    operator: "From now on, someone from the team is looking after you.",
    disclaimer: "Automated assistant. It can be wrong.",
    retry: "Retry",
  },

  panel: {
    title: "Panel",
    subtitle: "Conversations",
    signInTitle: "Sign in to the panel",
    signInText: "Sign in with an authorised account.",
    signInButton: "Sign in with Google",
    signingIn: "Signing in…",
    signOut: "Sign out",
    noAccessTitle: "No permissions",
    noAccessText:
      "Your account doesn't have access to the panel. If you think this is a mistake, let an administrator know.",
    loading: "Loading…",
    empty: "No conversations yet.",
    emptyHint: "They'll show up here as soon as someone writes to the chat.",
    selectOne: "Pick a conversation from the list.",
    search: "Search the conversations…",
    noMatches: "No conversation matches the search.",
    menu: "Sections",
    close: "Close",
    modeBot: "The bot is answering",
    modeMine: "You're handling it",
    modeOther: "Someone else is handling it",
    take: "Take the conversation",
    release: "Hand back to the bot",
    inactive: "Inactive",
    inactiveHint:
      "The visitor closed the chat: replying now won't reach them. Write to them by email if they left one.",
    placeholder: "Type your reply…",
    send: "Send",
    takeFirst: "Take the conversation to be able to reply.",
    visitor: "Visitor",
    bot: "Bot",
    you: "You",
    expiring: "No activity: it returns to the bot shortly.",
    backToList: "Back",
    collapse: "Collapse",
    expand: "Expand",

    sections: {
      conversations: "Conversations",
      messages: "Messages",
      users: "Users",
    },

    usersIntro: "Who can access the panel, and with which permissions.",
    usersEmpty: "No registered users yet.",
    roleVisitor: "Visitor",
    roleOperator: "Operator",
    roleAdmin: "Administrator",
    roleLabel: "Role",
    roleError: "Couldn't change the role.",
    itsYou: "That's you",
    lastSeen: "Registered",

    messagesIntro: "Enquiries received through the site forms.",
    messagesSoon:
      "This section isn't built yet: for now messages only arrive by email.",
  },

  notFound: {
    code: "ERROR 404",
    title: "This screen doesn't exist",
    text: "The page you were looking for moved, or was never here. Try from the home page or take a look at the app catalogue.",
    home: "Go to home",
    apps: "See the apps",
  },

  legal: {
    kicker: "Legal",
    updatedAt: "Last updated:",
    back: "Back",
    backToApp: "Back to {app}",
    yourData: "Your data",
  },

  privacyPage: {
    title: "Privacy policy",
    intro:
      "What data ImagoStack handles, what it uses it for, and what control you have over it.",
    highlight:
      "**In short:** this site uses no tracking cookies and no analytics systems. Our apps store the information you enter on your own device. We don't sell data and we don't share information with third parties for advertising.",
    perAppIntro:
      "This policy applies to the **{domain}** website and, in general terms, to the applications published by {company}. Each app also has its own specific policy, which prevails in case of any difference:",
    perAppLink: "{app} privacy policy",
    blocks: [
      { h2: "1. Data controller" },
      {
        p: "**{company}**, established in {jurisdiction}, is the controller of the data described in this policy. Contact: [{email}](mailto:{email}).",
      },
      { h2: "2. Data we handle on this site" },
      { h3: "Browsing" },
      {
        p: "{domain} is a static site. We use no first-party tracking cookies, no advertising pixels and no analytics tools that build profiles. Our hosting provider may automatically record technical data —IP address, browser type, date and time of the request— in its server logs, for the sole purpose of operating the service and preventing abuse.",
      },
      { h3: "Contact form" },
      {
        p: "When you submit the form, your name, your email and your message travel to our server and are dispatched to our inbox through **Resend**, the email delivery provider we use. **We do not store that content in any database**: it arrives in our mailbox and is handled there like any other message. We use it solely to reply to you, and you can read [Resend's privacy policy](https://resend.com/legal/privacy-policy).",
      },
      { h3: "Email" },
      {
        p: "If you write to us, we process your email address and the content of the message for the sole purpose of replying to you. We keep that correspondence for as long as it is needed to follow up on your enquiry, and then we delete it.",
      },
      { h2: "3. Data handled by our applications" },
      {
        p: "Our apps are built to work without us needing your data: they require no account and the information you enter is stored in your device's private storage. For the details of each one, see its specific policy in the list above.",
      },
      { h2: "4. Purpose and legal basis" },
      {
        p: "We process data solely to: (a) answer your enquiries, on the basis of your consent; (b) keep the site and the apps operational and secure, on the basis of our legitimate interest; and (c) comply with legal obligations where applicable.",
      },
      { h2: "5. Third parties and transfers" },
      {
        p: "We do not sell, rent or transfer personal data. We use infrastructure providers to host this site, **Resend** to dispatch contact form messages, and an email provider to manage our mailboxes. They all act as processors and may operate servers outside {jurisdiction}. The apps are distributed through Google Play: downloads, payment (where applicable) and the store's aggregated metrics are handled by Google LLC under its own privacy policy.",
      },
      { h2: "6. Retention" },
      {
        p: "We keep data only for as long as there is a purpose that justifies it. The data that lives on your device is under your control and is removed when you delete it from the app or uninstall it.",
      },
      { h2: "7. Your rights" },
      {
        p: "You may request access, rectification, updating, erasure, portability or restriction of the processing of your data, and object to it, by writing to [{email}](mailto:{email}). We reply within the applicable legal deadlines.",
      },
      {
        p: "In {jurisdiction}, the Agency for Access to Public Information is the supervisory authority for Law 25.326 and is empowered to handle complaints about non-compliance.",
      },
      { h2: "8. Minors" },
      {
        p: "Neither this site nor our apps are directed at children under 13, and we do not knowingly collect their data.",
      },
      { h2: "9. Security" },
      {
        p: "The site is served entirely over HTTPS. We apply reasonable technical and organisational measures to protect information, starting with the most effective one: collecting the bare minimum.",
      },
      { h2: "10. Changes" },
      {
        p: "We publish any update at this same address, with its effective date in the header.",
      },
      { h2: "11. Contact" },
      {
        p: "{company} — {jurisdiction}. Support and privacy: [{email}](mailto:{email}). General enquiries: [{generalEmail}](mailto:{generalEmail}).",
      },
    ] as Block[],
  },

  termsPage: {
    title: "Terms of use",
    intro:
      "The conditions under which we make the {domain} website and our applications available.",
    blocks: [
      { h2: "1. Acceptance" },
      {
        p: "By downloading, installing or using any of **{company}**'s applications, or by using this site, you accept these terms. If you do not agree, do not use the service.",
      },
      { h2: "2. Licence of use" },
      {
        p: "We grant you a personal, limited, revocable, non-exclusive and non-transferable licence to install and use our applications on devices you control, for personal, non-commercial purposes. The licence does not transfer ownership.",
      },
      { p: "You may not:" },
      {
        ul: [
          "Copy, modify, translate or create derivative works from the application.",
          "Reverse engineer, decompile or disassemble the software, except to the extent expressly permitted by law.",
          "Redistribute, resell, sublicense or publish the application on other stores or repositories.",
          "Remove or alter authorship notices, trademarks or intellectual property notices.",
          "Use the application for illegal activities or activities that infringe third-party rights.",
        ],
      },
      { h2: "3. Distribution through Google Play" },
      {
        p: "Our applications are distributed via Google Play. Downloading, updating and —where applicable— payment are also governed by Google's terms. Refunds for purchases made in the store are handled under the Google Play refund policy.",
      },
      { h2: "4. Content and user responsibility" },
      {
        p: "The information you enter in our apps is yours and you are responsible for it, including backing it up. When data is stored only on your device, we have no way to recover it if you delete it, lose your phone or uninstall the application.",
      },
      { h2: "5. Entertainment content" },
      {
        p: "Some of our applications offer symbolic, recreational or entertainment content —for example, oracle readings— and are intended for reflection and enjoyment. That content **does not constitute professional advice of any kind** (medical, psychological, legal, financial or otherwise) and must not be used as a basis for decisions that require the opinion of a licensed professional. The statistics and metrics produced by our sports apps depend on the information entered by whoever uses them and are not intended to be an official record.",
      },
      { h2: "6. Availability and changes" },
      {
        p: "We work to keep everything running, but the service is provided “as is”. We may update, modify, suspend or discontinue features or entire applications. When a change is significant, we will try to give reasonable notice.",
      },
      { h2: "7. Warranties" },
      {
        p: "To the maximum extent permitted by law, the applications are provided without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, or uninterrupted and error-free operation. Nothing here limits the rights you may have as a consumer under applicable law, including Consumer Protection Law 24.240 of {jurisdiction}.",
      },
      { h2: "8. Limitation of liability" },
      {
        p: "To the maximum extent permitted by law, {company} shall not be liable for indirect, incidental, special or consequential damages, nor for loss of data, opportunities or profits, arising from the use or inability to use the applications.",
      },
      { h2: "9. Intellectual property" },
      {
        p: "The software, designs, illustrations, texts, the ImagoStack brand and the names of our applications belong to {company} or its licensors, and are protected by intellectual property law. Google Play and the Google Play logo are trademarks of Google LLC.",
      },
      { h2: "10. Termination" },
      {
        p: "You may stop using the service at any time by uninstalling the application. We may suspend the licence if you breach these terms.",
      },
      { h2: "11. Governing law and jurisdiction" },
      {
        p: "These terms are governed by the laws of {jurisdiction}. Any dispute shall be submitted to the competent courts of that jurisdiction, without prejudice to the consumer protection rules applicable in your place of residence.",
      },
      { h2: "12. Contact" },
      {
        p: "Any questions about these terms: [{generalEmail}](mailto:{generalEmail}).",
      },
    ] as Block[],
  },

  deleteDataPage: {
    title: "Delete my data",
    intro:
      "This page explains how to delete the information associated with our applications, as required by the Google Play user data policy.",
    highlight:
      "**The important part:** our applications require no account and store information on your own device. That means **you control the deletion**: there is no account on our servers to close.",
    blocks: [
      { h2: "Option 1 — Delete from within the app" },
      {
        p: "This is the most precise way, because it lets you remove only what you want to remove:",
      },
      {
        ul: [
          "Open the app and go to the relevant list (for example, the history or the list of records).",
          "Use the delete icon on each item to remove it individually.",
          "If you want to start over, delete every item in the list or use the reset option where the app offers one.",
        ],
      },
      { h2: "Option 2 — Clear the data from Android" },
      {
        p: "This removes everything the application has stored on the device in one go, without uninstalling it:",
      },
      {
        ol: [
          "Open _Settings_ on your phone.",
          "Go to _Apps_ and choose the app.",
          "Tap _Storage_.",
          "Tap _Clear data_ (or _Clear storage_) and confirm.",
        ],
      },
      {
        p: "The exact name of each option may vary depending on the manufacturer and the Android version.",
      },
      { h2: "Option 3 — Uninstall the application" },
      {
        p: "When you uninstall, Android removes the app's private storage along with it. Bear in mind that **this action cannot be undone**: if you want to keep your information, export it from the app first.",
      },
      { h2: "System backups" },
      {
        p: "If you have Google backup enabled, the operating system may have backed up the app's data to your Google account. That backup is managed by Google, not {company}, and you can manage it from _Settings → Google → Backup_.",
      },
      { h2: "Requesting deletion in writing" },
      {
        p: "If you would still rather we handle a deletion request, or if we have exchanged emails and you want us to delete that exchange, write to [{email}](mailto:{email}) from the address involved, stating:",
      },
      {
        ul: ["The name of the application.", "What information you want deleted."],
      },
      {
        p: "We confirm receipt and resolve the request within a maximum of 30 calendar days. There is no charge for this.",
      },
      { h2: "What we keep and for how long" },
      {
        p: "We keep no user databases for our applications. When you write to us, we keep the email exchange only for as long as it is useful to follow up on your enquiry, and then we delete it. If a legal, accounting or rights-defence obligation requires us to retain any data, we keep it only for the period that obligation imposes.",
      },
      { h2: "Details by application" },
      {
        p: "Each app describes exactly what information it handles in its own policy:",
      },
    ] as Block[],
    appLink: "{app} privacy policy",
    seeAlso: "See also our [general privacy policy]({privacyUrl}).",
  },

  appPrivacy: {
    title: "{app} privacy policy",
    intro:
      "This policy explains what data {app} handles, what it uses it for, and what control you have over it.",
    summaryLead: "**In short:**",
    summaryNoData: "{app} does not collect personal data.",
    summaryOnDevice:
      "{app} stores the information you enter only on your device. We have no servers holding your data, no account is required, and we neither sell nor share information with third parties.",
    summaryOnDeviceShared:
      "{app} stores on your device only what is detailed below, and no account is required. We have no servers holding your data and we do not sell information. To show the ads, the advertising provider may process identifiers from your device, as explained in section 5.",
    summaryServer:
      "{app} handles the data detailed below, for the sole purpose of making the app work.",
    adsYes: "The app shows advertising.",
    adsNo: "The app shows no advertising.",
    iapYes: "It includes in-app purchases.",
    iapNo: "It includes no in-app purchases.",

    s1: "1. Who we are",
    s1p: "{app} is an application developed and published by **{company}** (“we”), operating from {jurisdiction}. For any privacy enquiry you can write to us at [{email}](mailto:{email}).",

    s2: "2. What data the application handles",
    s2none:
      "{app} **collects no personal data at all**. It requires no sign-up, it does not access your contacts, your location or your files, and it generates no identifiers to track you.",
    s2intro:
      "The app handles only the information you enter so that it can work. In detail:",
    s2item: "**{type}.** {purpose} It is stored on {storage}.",
    s2device: "your own device",
    s2server: "our servers",
    s2closing:
      "We do not collect your name, your email, your location, your contact list or advertising identifiers. Nor do we build user profiles or track you across applications.",
    s2closingAds:
      "We do not collect your name, your email, your location or your contact list, and we do not build user profiles from that data. Advertising identifiers are processed by the ad provider, not by us: the details are in section 5.",

    s3: "3. Where your data is stored",
    s3device:
      "All information is processed and stored **locally on your device**, inside the application's private storage. It is not transmitted to our servers because, for {app} to work, we don't need to have it.",
    s3server:
      "Some information is processed on our own servers or on those of infrastructure providers contracted by {company}, with security measures appropriate to the type of data.",
    s3backup:
      "If you back up your phone, the operating system may include the app's data in that backup. That backup is managed by Google or by your device manufacturer under their own policies, not by {company}.",
    /**
     * Plazo de conservación. Es un dato que el RGPD exige informar de forma expresa
     * (art. 13.2.a) y que faltaba: la política decía dónde viven los datos y cómo
     * borrarlos, pero no por cuánto tiempo se guardan.
     */
    s3retentionDevice:
      "**For how long.** The information is kept until you delete it. There is no time limit that erases it automatically, and no copy in our hands that outlives that deletion: once you remove it from your device, it ceases to exist.",
    s3retentionServer:
      "**For how long.** We keep the information for as long as it is needed to provide the service. When it is no longer needed, or if you ask us to delete it, we erase it —unless a legal obligation requires us to retain some data for a set period, and only for that period.",

    s4: "4. Permissions the app requests",
    s4none:
      "{app} requests no sensitive Android permissions: no camera, no microphone, no location, no contacts and no external storage.",
    s4intro:
      "We only ask for strictly necessary permissions, and we always explain what for:",
    s4item: "**{name}.** {reason}",

    s5: "5. Sharing information with third parties",
    s5none:
      "**We do not share, sell, rent or transfer information to third parties.** {app} integrates no advertising, analytics or social network SDKs.",
    s5intro:
      "So that some features can exist, the app uses the following third-party services, which may process data under their own policies:",
    s5ads:
      "{app} is funded with **rewarded video ads**: they are optional and are shown only if you choose to watch one in exchange for a benefit inside the app. They never appear automatically and never interrupt a reading. To serve them we use the following provider, which may process your device's advertising identifier and technical session data under its own policy:",
    s5item: "**{name}.** {purpose} [See their privacy policy]({url}).",
    s5legal:
      "We may disclose information only where a competent authority requires it through a valid legal order.",
    /**
     * Transferencias internacionales (RGPD art. 13.2.f). La afirmación depende de si
     * hay terceros: sin proveedores no hay nada que transferir y conviene decirlo;
     * con proveedores, negarlo seria falso, porque tratan datos fuera del pais.
     */
    s5noTransfers:
      "Since we share information with no one, **there are no international transfers of your data**.",
    s5transfers:
      "The providers named above may process that information on servers located outside your country, under the safeguards set out in their own policies and in the legal frameworks that apply to them.",
    /** Decisiones automatizadas y perfilado (RGPD art. 22). Vale para todas las apps. */
    s5noAutomated:
      "Under no circumstances do we make automated decisions that affect you, nor do we build user profiles.",

    s6: "6. Content you share yourself",
    s6p: "If you use a feature of the app to share content (for example, sending an image or a summary by messaging), that sending is done by you through the application you choose. {company} does not take part in that content and keeps no copy of it.",

    s7: "7. Minors",
    s7children:
      "{app} is designed for a children's audience and complies with the Google Play _Families Policy_.",
    s7notChildren:
      "{app} **is not directed at children under 13** and does not knowingly collect data from minors.",
    s7minAge:
      "Because of the type of content, we recommend it for ages {age} and over.",
    s7report:
      "If you believe a minor has given us information, write to [{email}](mailto:{email}) and we will delete it.",

    s8: "8. How to delete your data",
    s8device: [
      "From within the app you can delete individual records or clear your history whenever you want.",
      "If you uninstall {app}, Android removes the application's local data along with it.",
      "You can also do it from _Settings → Apps → {app} → Storage → Clear data_.",
    ],
    s8server:
      "You can request the deletion of your data by writing to [{email}](mailto:{email}). We process the request within 30 days.",
    s8more: "More details on the [data deletion]({deleteDataUrl}) page.",

    s9: "9. Your rights",
    /**
     * Los derechos salen de la ley del USUARIO, no de la nuestra: por eso la lista
     * arranca por el RGPD y la ley argentina aparece como una mas. Donde operamos
     * nosotros se declara en la seccion 1, que es el lugar que le corresponde.
     */
    s9p: "Under the regulations that apply to you —the GDPR if you are in the European Union, the LGPD in Brazil, Personal Data Protection Law 25.326 in Argentina, or whichever governs in your country— you have the right to access your data, rectify it, erase it, restrict it or object to its processing.",
    s9device:
      "Since {app}'s data lives on your device, you exercise those rights directly from the app; even so, we're here to help.",
    s9server: "Write to us to exercise them.",
    /**
     * Base legal del tratamiento (RGPD art. 6). Cuando nada sale del dispositivo no hay
     * tratamiento por nuestra parte y decirlo es mas honesto que invocar una base que no
     * usamos; lo unico que si tratamos en ese caso es el correo, si la persona escribe.
     */
    s9basisDevice:
      "**Legal basis.** As long as the information does not leave your device, {company} carries out no processing on it: there is no legal basis to invoke because there is nothing we process. If you write to us, that email exchange is processed on the basis of your consent and of our legitimate interest in replying to you.",
    s9basisServer:
      "**Legal basis.** We process the information in order to provide the service you request and, depending on the case, on the basis of your consent or of our legitimate interest in keeping the application running and preventing abuse.",
    /**
     * Derecho a reclamar ante la autoridad de control (RGPD art. 13.2.d). Se nombran las
     * autoridades de los mercados donde la ficha esta traducida, mas la de la jurisdiccion
     * propia, para que la persona sepa a donde ir sin tener que averiguarlo.
     */
    s9authority:
      "If you believe we did not handle a request properly, you have the right to lodge a complaint with **the supervisory authority of your country of residence**: for example, the _Garante per la protezione dei dati personali_ in Italy, the Spanish Data Protection Agency in Spain, the National Data Protection Authority in Brazil, or the Agency for Access to Public Information in {jurisdiction}.",

    s10: "10. Security",
    s10p: "We apply reasonable technical measures to protect information, including the use of the operating system's private storage. No method is infallible, but we minimise the risk with the simplest strategy: not accumulating data we don't need.",

    s11: "11. Changes to this policy",
    s11p: "If we update this policy, we publish the new version at this same address and change the date in the header. If the change is significant, we announce it inside the app.",

    s12: "12. Contact",
    s12p: "{company} — {jurisdiction}. Support and privacy: [{email}](mailto:{email}).",
  },

  meta: {
    homeTitle: "ImagoStack — Android Apps | Full-cycle, full-stack",
    homeDescription:
      "ImagoStack designs, develops and publishes its own Android applications end to end. Discover our apps on Google Play.",
    ogHomeTitle: "ImagoStack — Android Apps",
    appsTitle: "Our Android apps",
    appsDescription: "All of ImagoStack's Android applications: {list}.",
    appsOgTitle: "ImagoStack apps for Android",
    appTitle: "{app} — {category} app for Android",
    supportTitle: "Support and contact",
    supportDescription:
      "Help for ImagoStack applications: write to us through the form, browse the frequently asked questions and see our response times.",
    supportOgTitle: "ImagoStack support",
    privacyTitle: "Privacy policy",
    privacyDescription:
      "How ImagoStack handles personal data on its website and in its applications.",
    termsTitle: "Terms of use",
    termsDescription:
      "Conditions of use of the ImagoStack website and applications.",
    deleteDataTitle: "Delete my data",
    deleteDataDescription:
      "How to delete the information held by ImagoStack applications from your device or by requesting its deletion.",
    appPrivacyTitle: "{app} privacy policy",
    appPrivacyDescription:
      "How {app} handles your data: what information it holds, where it is stored and how you can delete it.",
    keywords: [
      "ImagoStack",
      "Android apps",
      "mobile app development",
      "Google Play",
      "app studio",
      "Vigía padel",
      "padel statistics",
      "oracle app",
      "tarot app",
    ],
  },

  og: {
    kicker: "ImagoStack",
    description:
      "We design, develop and publish our own applications for Android.",
  },
};

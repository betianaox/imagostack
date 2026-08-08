import { apps } from "@/lib/apps";
import { getDictionary } from "@/lib/dictionaries";
import { path, t, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import type { KnowledgeChunk } from "@/lib/chat/types";

/**
 * Base de conocimiento del bot, generada desde el contenido real del sitio.
 *
 * No hay ningún texto duplicado acá: todo sale de `lib/apps.ts`, los
 * diccionarios y `lib/site.ts`. Cuando agregues una app o cambies un precio,
 * el bot se entera solo en el próximo build.
 *
 * Cada fragmento lleva su URL para que el bot pueda enlazar de verdad en vez
 * de describir dónde está la información.
 */
export function buildKnowledge(lang: Locale): KnowledgeChunk[] {
  const dict = getDictionary(lang);
  const chunks: KnowledgeChunk[] = [];

  // ── Quiénes somos ────────────────────────────────────────────────────────
  chunks.push({
    id: "empresa",
    title: `Qué es ${site.name}`,
    url: path("/", lang),
    tags: ["empresa", "quienes somos", "imagostack"],
    text: [
      `${site.name} — ${site.tagline}. ${dict.home.intro}`,
      `Correo general: ${site.email.general}. Soporte: ${site.email.support}.`,
      `Sitio: ${site.url}. Idiomas del sitio: español, inglés y portugués.`,
    ].join("\n"),
  });

  // ── Cómo trabajamos ──────────────────────────────────────────────────────
  chunks.push({
    id: "principios",
    title: dict.home.aboutTitle,
    url: `${path("/", lang)}#nosotros`,
    tags: ["principios", "proceso", "como trabajan"],
    text: [
      ...dict.home.pillars.map((p) => `${p.title}: ${p.description}`),
      "",
      "Proceso de trabajo:",
      ...dict.home.steps.map(
        (s, i) => `${i + 1}. ${s.title}: ${s.description}`,
      ),
    ].join("\n"),
  });

  // ── Servicios de desarrollo web ──────────────────────────────────────────
  chunks.push({
    id: "servicios",
    title: dict.services.title,
    url: `${path("/", lang)}#web`,
    tags: ["servicios", "desarrollo web", "presupuesto", "contratar"],
    text: [
      dict.services.intro,
      "",
      ...dict.services.cards.map((c) => `${c.title}: ${c.description}`),
      "",
      `${dict.services.stackLabel}: ${dict.services.stack.join(", ")}.`,
    ].join("\n"),
  });

  // ── Una entrada por app ──────────────────────────────────────────────────
  for (const app of apps) {
    chunks.push({
      id: `app-${app.slug}`,
      title: `${app.name} (${t(app.category, lang)})`,
      url: path(`/apps/${app.slug}`, lang),
      tags: [app.name, app.slug, t(app.category, lang), "app", "android"],
      text: [
        `${app.name} — ${t(app.tagline, lang)}`,
        `Categoría: ${t(app.category, lang)}. Plataforma: Android.`,
        `Idiomas de la app: ${t(app.languages, lang).join(", ")}.`,
        app.playStoreUrl
          ? `Disponible en Google Play: ${app.playStoreUrl}`
          : "Todavía no está publicada en Google Play.",
        "",
        ...t(app.body, lang),
        "",
        "Funciones:",
        ...app.features.map(
          (f) => `- ${t(f.title, lang)}: ${t(f.description, lang)}`,
        ),
      ].join("\n"),
    });

    // La privacidad va en su propio fragmento: es la consulta más delicada y
    // conviene que el bot enlace la política en vez de improvisar.
    const { privacy } = app;
    chunks.push({
      id: `privacidad-${app.slug}`,
      title: `Privacidad de ${app.name}`,
      url: path(`/apps/${app.slug}/privacidad`, lang),
      tags: ["privacidad", "datos", app.name, app.slug],
      text: [
        `Política de privacidad de ${app.name}.`,
        privacy.collects.length === 0
          ? "No recolecta ningún dato personal."
          : `Datos que maneja: ${privacy.collects
              .map((c) => `${t(c.type, lang)} (guardado en el ${c.storage})`)
              .join("; ")}.`,
        privacy.processedOnDevice
          ? "Todo se procesa y se guarda en el dispositivo del usuario."
          : "Parte de los datos se procesan en servidores.",
        privacy.permissions.length === 0
          ? "No solicita permisos sensibles de Android."
          : `Permisos: ${privacy.permissions.map((p) => p.name).join("; ")}.`,
        privacy.showsAds
          ? "Muestra publicidad (videos con recompensa, opcionales)."
          : "No muestra publicidad.",
        privacy.hasInAppPurchases
          ? "Tiene compras dentro de la aplicación."
          : "No tiene compras dentro de la aplicación.",
        privacy.thirdParties.length > 0
          ? `Servicios de terceros: ${privacy.thirdParties
              .map((p) => p.name)
              .join(", ")}.`
          : "No comparte datos con terceros.",
        "Para el detalle completo hay que remitir a la política enlazada.",
      ].join("\n"),
    });
  }

  // ── Preguntas frecuentes, una por fragmento ──────────────────────────────
  for (const [index, faq] of dict.support.faqs.entries()) {
    chunks.push({
      id: `faq-${index}`,
      title: faq.question,
      url: path("/soporte", lang),
      tags: ["soporte", "faq", "ayuda"],
      text: `Pregunta: ${faq.question}\nRespuesta: ${faq.answer}`,
    });
  }

  // ── Cómo contactar ───────────────────────────────────────────────────────
  chunks.push({
    id: "contacto",
    title: dict.support.formTitle,
    url: `${path("/", lang)}#contacto`,
    tags: ["contacto", "escribir", "formulario", "presupuesto", "cotizar"],
    text: [
      dict.home.contactText,
      `Hay un formulario de contacto en el inicio y en ${path("/soporte", lang)}.`,
      `También se puede escribir a ${site.email.general} (consultas generales) o ${site.email.support} (soporte y privacidad).`,
      "Tiempo de respuesta: menos de 48 horas hábiles.",
    ].join("\n"),
  });

  // ── Legales del sitio ────────────────────────────────────────────────────
  chunks.push({
    id: "legales",
    title: dict.legal.kicker,
    url: path("/privacidad", lang),
    tags: ["privacidad", "terminos", "legales", "eliminar datos"],
    text: [
      `Política de privacidad del sitio: ${path("/privacidad", lang)}`,
      `Términos de uso: ${path("/terminos", lang)}`,
      `Eliminación de datos: ${path("/eliminar-datos", lang)}`,
      "El sitio no usa cookies de seguimiento ni analítica.",
    ].join("\n"),
  });

  return chunks;
}

/** Tamaño aproximado en tokens, para saber si el contexto completo sigue siendo viable. */
export function estimateTokens(chunks: KnowledgeChunk[]): number {
  const chars = chunks.reduce(
    (total, chunk) => total + chunk.title.length + chunk.text.length,
    0,
  );
  // Aproximación habitual para español: ~4 caracteres por token
  return Math.round(chars / 4);
}

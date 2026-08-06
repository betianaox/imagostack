import { Resend } from "resend";
import { site } from "@/lib/site";

/**
 * Endpoint del formulario de contacto.
 *
 * Corre solo en el servidor: la API key de Resend nunca llega al navegador.
 * Requiere dos variables de entorno en Vercel (ver .env.example):
 *
 *   RESEND_API_KEY   — la clave de la cuenta de Resend
 *   CONTACT_FROM     — remitente verificado, ej "Imagostack <web@imagostack.com>"
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Límites para no aceptar cuerpos absurdos ni recortar mensajes legítimos. */
const LIMITS = { name: 120, email: 160, about: 80, message: 5000 } as const;

type Payload = {
  name: string;
  email: string;
  about: string;
  message: string;
  /** Campo trampa: los humanos no lo ven, los bots suelen completarlo */
  website: string;
};

export async function POST(request: Request) {
  let data: Partial<Payload>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = clean(data.name, LIMITS.name);
  const email = clean(data.email, LIMITS.email);
  const about = clean(data.about, LIMITS.about);
  const message = clean(data.message, LIMITS.message);

  // Honeypot: si viene completo es un bot. Respondemos 200 para no darle pistas.
  if (clean(data.website, 100)) {
    return Response.json({ ok: true });
  }

  if (!name || !email || !message) {
    return Response.json({ error: "missing_fields" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !from) {
    console.error("Falta RESEND_API_KEY o CONTACT_FROM en el entorno");
    return Response.json({ error: "not_configured" }, { status: 500 });
  }

  const subject = about
    ? `[${about}] Consulta de ${name}`
    : `Consulta de ${name}`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [site.email.support],
      // Responder al correo va directo a quien escribió
      replyTo: email,
      subject,
      text: [
        `Nombre: ${name}`,
        `Correo: ${email}`,
        about ? `Sobre: ${about}` : null,
        "",
        message,
      ]
        .filter((line) => line !== null)
        .join("\n"),
      html: buildHtml({ name, email, about, message }),
    });

    if (error) {
      console.error("Resend rechazó el envío:", error);
      return Response.json({ error: "send_failed" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Error inesperado enviando el contacto:", error);
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Escapa el contenido del usuario antes de meterlo en el HTML del correo. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml({
  name,
  email,
  about,
  message,
}: {
  name: string;
  email: string;
  about: string;
  message: string;
}): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 16px 4px 0;color:#5b6b7c;font-size:13px">${label}</td>
      <td style="padding:4px 0;color:#0b1622;font-size:14px">${escapeHtml(value)}</td></tr>`;

  // Documento completo con `meta charset`: sin esa declaración, varios clientes
  // de correo interpretan el cuerpo como Latin-1 y rompen los acentos y la ñ.
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Contacto desde ${site.domain}</title>
</head>
<body style="margin:0;padding:24px;background:#f6f8fa">
<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;padding:28px">
  <p style="margin:0 0 18px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#26689b">
    ${site.domain} &middot; formulario de contacto
  </p>
  <table style="border-collapse:collapse;margin-bottom:20px">
    ${row("Nombre", name)}
    ${row("Correo", email)}
    ${about ? row("Sobre", about) : ""}
  </table>
  <div style="border-left:3px solid #ea6852;padding-left:16px;color:#0b1622;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(
    message,
  )}</div>
</div>
</body>
</html>`;
}

import { getApp } from "./client";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * APP CHECK (navegador)
 * ─────────────────────────────────────────────────────────────────────────────
 * Prueba que el pedido a `/api/chat` viene de este sitio y no de un script.
 *
 * POR QUÉ ACÁ Y NO SOLO LÍMITES POR IP: el endpoint del chat recibe un mensaje
 * de texto libre que va directo al modelo. Quien encuentre la URL tiene algo
 * muy parecido a un modelo de lenguaje gratis facturado a nuestra cuenta, y una
 * IP se rota. App Check no lo hace imposible —en web se apoya en reCAPTCHA, que
 * un atacante decidido sortea— pero corta de raíz el abuso automatizado, que es
 * el realista.
 *
 * Se activa solo si hay clave configurada: sin ella el chat sigue funcionando
 * igual, sin token. Así el sitio nunca se rompe por una variable que falte.
 */

/** El token vive unas horas; el SDK lo renueva solo. */
let promesaAppCheck: Promise<unknown> | null = null;

function claveSitio(): string | undefined {
  return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
}

export function appCheckConfigurado(): boolean {
  return Boolean(claveSitio());
}

/**
 * Inicializa App Check una sola vez. Se importa de forma dinámica para no
 * sumarle peso a quien nunca abre el chat, igual que el resto del SDK.
 */
async function iniciar() {
  if (promesaAppCheck) return promesaAppCheck;

  promesaAppCheck = (async () => {
    const { initializeAppCheck, ReCaptchaEnterpriseProvider } = await import(
      "firebase/app-check"
    );
    return initializeAppCheck(getApp(), {
      provider: new ReCaptchaEnterpriseProvider(claveSitio()!),
      // Renueva el token antes de que venza, para que un chat largo no se
      // quede sin credencial a mitad de una conversación.
      isTokenAutoRefreshEnabled: true,
    });
  })();

  return promesaAppCheck;
}

/**
 * Token para mandar en la cabecera del pedido.
 *
 * Devuelve `null` si App Check no está configurado o si falla: el pedido sale
 * igual y el servidor decide qué hacer. Preferimos un chat que funcione sin
 * token a un chat que no funcione por un problema de attestación.
 */
export async function tokenAppCheck(): Promise<string | null> {
  if (!appCheckConfigurado()) return null;

  try {
    const instancia = await iniciar();
    const { getToken } = await import("firebase/app-check");
    // El tipo lo da el SDK; acá solo hace falta el string.
    const { token } = await getToken(instancia as never, false);
    return token;
  } catch (error) {
    console.warn("App Check: no se pudo obtener el token", error);
    return null;
  }
}

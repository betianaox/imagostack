/**
 * Límites de uso del endpoint de oráculos.
 *
 * Es una URL pública sin login, así que sin esto cualquiera con la dirección
 * puede gastar la cuota diaria en un rato. No pretende impedir el abuso —para
 * eso está Play Integrity / App Check, que es la vuelta siguiente— sino ACOTAR
 * EL DAÑO a un número que conocemos de antemano.
 *
 * Vive en memoria del proceso: alcanza para frenar una ráfaga y no agrega
 * infraestructura. La contra es que se reinicia cuando la instancia se
 * recicla; si algún día hace falta que sobreviva, esto va a Firestore sin
 * cambiar a quién lo llama.
 */

/** Por visitante, para frenar ráfagas. */
const POR_MINUTO = 6;

/** Por visitante y hora: una persona no hace 60 tiradas en una hora. */
const POR_HORA = 40;

/**
 * Techo global del día, la red de seguridad de verdad. El nivel gratuito de
 * Gemini ronda las 1000 peticiones diarias: se deja margen para el chat del
 * sitio, que comparte la cuenta.
 */
const POR_DIA_GLOBAL = 700;

type Ventana = { hasta: number; usos: number };

const porMinuto = new Map<string, Ventana>();
const porHora = new Map<string, Ventana>();
let global: Ventana = { hasta: 0, usos: 0 };

function pegar(mapa: Map<string, Ventana>, clave: string, max: number, ms: number): boolean {
  const ahora = Date.now();
  const actual = mapa.get(clave);

  if (!actual || actual.hasta <= ahora) {
    mapa.set(clave, { hasta: ahora + ms, usos: 1 });
    // Limpieza oportunista: sin esto el mapa crece para siempre con visitantes
    // que no vuelven. Se hace acá y no con un temporizador para no dejar un
    // intervalo corriendo en un entorno serverless.
    if (mapa.size > 5000) {
      for (const [k, v] of mapa) if (v.hasta <= ahora) mapa.delete(k);
    }
    return true;
  }

  if (actual.usos >= max) return false;
  actual.usos += 1;
  return true;
}

export type Veredicto = { ok: true } | { ok: false; motivo: "visitante" | "global" };

/** Cuenta un pedido. Si devuelve `ok: false`, no hay que llamar al modelo. */
export function permitir(clave: string): Veredicto {
  const ahora = Date.now();

  if (global.hasta <= ahora) global = { hasta: ahora + 86_400_000, usos: 0 };
  if (global.usos >= POR_DIA_GLOBAL) return { ok: false, motivo: "global" };

  if (!pegar(porMinuto, clave, POR_MINUTO, 60_000)) {
    return { ok: false, motivo: "visitante" };
  }
  if (!pegar(porHora, clave, POR_HORA, 3_600_000)) {
    return { ok: false, motivo: "visitante" };
  }

  global.usos += 1;
  return { ok: true };
}

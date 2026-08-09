/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CONTRATO DEL ENDPOINT DE ORÁCULOS
 * ─────────────────────────────────────────────────────────────────────────────
 * La app de Oráculos manda las piezas de una tirada ya resueltas y este
 * servidor devuelve la lectura redactada.
 *
 * REGLA DE SEGURIDAD DE LA QUE DEPENDE TODO LO DEMÁS: el endpoint NO acepta un
 * prompt. Solo acepta datos con esta forma, y el prompt lo arma el servidor
 * (`prompt.ts`). Si aceptara texto libre para el modelo, cualquiera que
 * encuentre la URL tendría un generador de texto gratis facturado a nuestra
 * cuenta, y ningún token lo evitaría: un pedido legítimo también podría
 * llevarlo.
 *
 * Por eso la validación de acá abajo es estricta y rechaza en vez de corregir.
 * Un atacante puede mandar basura dentro de estos campos, pero nunca
 * instrucciones al modelo.
 */

export const TEMAS = ["amor", "trabajo", "dinero", "general"] as const;
export const TONOS = ["preocupacion", "impulso", "neutro"] as const;
export const MODOS = ["cerrada", "abierta"] as const;
export const TIEMPOS = ["pasado", "presente", "futuro"] as const;
export const IDIOMAS = ["es", "en", "pt"] as const;

export type Tema = (typeof TEMAS)[number];
export type Tono = (typeof TONOS)[number];
export type Modo = (typeof MODOS)[number];
export type Tiempo = (typeof TIEMPOS)[number];
export type Idioma = (typeof IDIOMAS)[number];

/** Una pieza de la tirada, ya resuelta por el oráculo del lado de la app. */
export type Pieza = {
  nombre: string;
  /** Qué representa su posición: "el corazón de la tirada", "el paso siguiente". */
  rol: string;
  invertida: boolean;
  significado: string;
};

export type Consulta = {
  oraculoId: string;
  pregunta: string;
  tema: Tema;
  analisis: {
    modo: Modo;
    tono: Tono;
    tiempo: Tiempo;
    mencionaTercero: boolean;
  };
  piezas: Pieza[];
  idioma: Idioma;
};

/**
 * Topes de tamaño. No son estéticos: acotan cuánto puede costar un pedido.
 * Sin esto, alguien manda cien piezas con textos de diez mil caracteres y
 * paga la cuota el dueño de la clave.
 */
const LIMITES = {
  pregunta: 500,
  piezas: 8,
  nombre: 80,
  rol: 120,
  significado: 400,
  oraculoId: 30,
} as const;

const esTexto = (v: unknown, max: number): v is string =>
  typeof v === "string" && v.length > 0 && v.length <= max;

const esUnoDe = <T extends readonly string[]>(
  v: unknown,
  lista: T,
): v is T[number] => typeof v === "string" && (lista as readonly string[]).includes(v);

/**
 * Valida el cuerpo del pedido. Devuelve la consulta o el motivo del rechazo.
 *
 * Se devuelve el motivo para poder loguearlo, NO para mandárselo al cliente:
 * decirle a quien sondea el endpoint exactamente qué campo falló es ayudarlo a
 * armar el pedido válido.
 */
export function validar(cuerpo: unknown): { ok: true; consulta: Consulta } | { ok: false; motivo: string } {
  if (typeof cuerpo !== "object" || cuerpo === null) {
    return { ok: false, motivo: "el cuerpo no es un objeto" };
  }
  const c = cuerpo as Record<string, unknown>;

  if (!esTexto(c.oraculoId, LIMITES.oraculoId)) return { ok: false, motivo: "oraculoId" };
  if (!esTexto(c.pregunta, LIMITES.pregunta)) return { ok: false, motivo: "pregunta" };
  if (!esUnoDe(c.tema, TEMAS)) return { ok: false, motivo: "tema" };
  if (!esUnoDe(c.idioma, IDIOMAS)) return { ok: false, motivo: "idioma" };

  if (typeof c.analisis !== "object" || c.analisis === null) {
    return { ok: false, motivo: "analisis" };
  }
  const a = c.analisis as Record<string, unknown>;
  if (!esUnoDe(a.modo, MODOS)) return { ok: false, motivo: "analisis.modo" };
  if (!esUnoDe(a.tono, TONOS)) return { ok: false, motivo: "analisis.tono" };
  if (!esUnoDe(a.tiempo, TIEMPOS)) return { ok: false, motivo: "analisis.tiempo" };
  if (typeof a.mencionaTercero !== "boolean") {
    return { ok: false, motivo: "analisis.mencionaTercero" };
  }

  if (!Array.isArray(c.piezas) || c.piezas.length === 0) {
    return { ok: false, motivo: "piezas vacías" };
  }
  if (c.piezas.length > LIMITES.piezas) return { ok: false, motivo: "demasiadas piezas" };

  const piezas: Pieza[] = [];
  for (const cruda of c.piezas) {
    if (typeof cruda !== "object" || cruda === null) return { ok: false, motivo: "pieza" };
    const p = cruda as Record<string, unknown>;
    if (!esTexto(p.nombre, LIMITES.nombre)) return { ok: false, motivo: "pieza.nombre" };
    if (!esTexto(p.rol, LIMITES.rol)) return { ok: false, motivo: "pieza.rol" };
    if (!esTexto(p.significado, LIMITES.significado)) {
      return { ok: false, motivo: "pieza.significado" };
    }
    if (typeof p.invertida !== "boolean") return { ok: false, motivo: "pieza.invertida" };
    piezas.push({
      nombre: p.nombre,
      rol: p.rol,
      invertida: p.invertida,
      significado: p.significado,
    });
  }

  return {
    ok: true,
    consulta: {
      oraculoId: c.oraculoId,
      pregunta: c.pregunta,
      tema: c.tema,
      idioma: c.idioma,
      analisis: {
        modo: a.modo,
        tono: a.tono,
        tiempo: a.tiempo,
        mencionaTercero: a.mencionaTercero,
      },
      piezas,
    },
  };
}

import type { RateLimiter, RateLimitResult } from "@/lib/chat/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * LÍMITES DE USO
 * ─────────────────────────────────────────────────────────────────────────────
 * En el nivel gratuito de Gemini el abuso **no puede generar una factura**: la
 * cuota se agota y el bot deja de responder. Por eso estos límites no protegen
 * la plata, protegen la *disponibilidad* — que un solo visitante no consuma la
 * cuota diaria que comparten todos.
 *
 * La implementación en memoria es suficiente para ese objetivo en un sitio de
 * poco tráfico: en serverless cada instancia cuenta por su cuenta, así que el
 * límite real es más laxo que el configurado, pero corta el caso que importa
 * —alguien martillando el endpoint— porque esa ráfaga cae en la misma
 * instancia caliente.
 *
 * Cuando haya facturación habilitada (Anabella), esto se reemplaza por una
 * implementación con Redis compartido sin tocar el resto del motor.
 */

type Bucket = { count: number; resetAt: number };

export class MemoryRateLimiter implements RateLimiter {
  readonly name = "memory";

  private readonly buckets = new Map<string, Bucket>();
  private readonly windowMs: number;
  private readonly max: number;

  constructor(options: { max: number; windowSeconds: number }) {
    this.max = options.max;
    this.windowMs = options.windowSeconds * 1000;
  }

  async check(key: string): Promise<RateLimitResult> {
    const now = Date.now();
    this.sweep(now);

    const bucket = this.buckets.get(key);

    if (!bucket || bucket.resetAt <= now) {
      this.buckets.set(key, { count: 1, resetAt: now + this.windowMs });
      return { ok: true };
    }

    if (bucket.count >= this.max) {
      return {
        ok: false,
        reason: "rate",
        retryAfter: Math.ceil((bucket.resetAt - now) / 1000),
      };
    }

    bucket.count += 1;
    return { ok: true };
  }

  /** Evita que el Map crezca sin control en una instancia de larga vida. */
  private sweep(now: number) {
    if (this.buckets.size < 500) return;
    for (const [key, bucket] of this.buckets) {
      if (bucket.resetAt <= now) this.buckets.delete(key);
    }
  }
}

/**
 * Encadena varios límites: por minuto, por hora, por día. El primero que
 * rechaza corta. Permite expresar "10 por minuto pero 60 por día" sin
 * complicar cada implementación.
 */
export class CompositeRateLimiter implements RateLimiter {
  readonly name = "composite";

  constructor(private readonly limiters: RateLimiter[]) {}

  async check(key: string): Promise<RateLimitResult> {
    for (const limiter of this.limiters) {
      const result = await limiter.check(key);
      if (!result.ok) return result;
    }
    return { ok: true };
  }
}

/** Sin límite. Solo para desarrollo. */
export class NoopRateLimiter implements RateLimiter {
  readonly name = "noop";
  async check(): Promise<RateLimitResult> {
    return { ok: true };
  }
}

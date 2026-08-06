"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { apps } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionaries";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Formulario de contacto. Envía a `/api/contact`, que despacha el correo con
 * Resend desde el servidor (la API key nunca sale del backend).
 *
 * Si el envío falla, en vez de dejar al visitante sin salida se le ofrece el
 * mismo mensaje ya armado en un `mailto:`.
 */
export function ContactForm({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<Status>("idle");
  const [fallbackHref, setFallbackHref] = useState("");
  const form = dict.form;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const element = event.currentTarget;
    const data = new FormData(element);
    const payload = {
      name: String(data.get("nombre") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      about: String(data.get("app") ?? "").trim(),
      message: String(data.get("mensaje") ?? "").trim(),
      website: String(data.get("website") ?? ""),
    };

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      element.reset();
      setStatus("sent");
    } catch {
      setFallbackHref(buildMailto(payload, form));
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-brand-500/10 bg-white p-8 text-center shadow-[0_1px_2px_rgba(11,22,34,0.04),0_18px_50px_-30px_rgba(11,22,34,0.35)] md:p-10">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
          <Icon name="check" className="size-7" />
        </span>
        <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">
          {form.sentTitle}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/65">
          {form.sentText}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
        >
          {form.sendAnother}
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-brand-500/10 bg-white p-6 shadow-[0_1px_2px_rgba(11,22,34,0.04),0_18px_50px_-30px_rgba(11,22,34,0.35)] md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={form.name} htmlFor="nombre">
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            placeholder={form.namePlaceholder}
            className={inputClass}
          />
        </Field>

        <Field label={form.email} htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={160}
            autoComplete="email"
            placeholder={form.emailPlaceholder}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label={form.about} htmlFor="app">
          {/* Flecha propia: la nativa queda pegada al borde en varios navegadores */}
          <div className="relative">
            <select
              id="app"
              name="app"
              defaultValue=""
              className={`${inputClass} cursor-pointer appearance-none pr-12`}
            >
              <option value="">{form.general}</option>
              {apps.map((app) => (
                <option key={app.slug} value={app.name}>
                  {app.name}
                </option>
              ))}
              <option value={form.idea}>{form.idea}</option>
            </select>
            <Icon
              name="chevronDown"
              className="pointer-events-none absolute top-1/2 right-4 size-4.5 -translate-y-1/2 text-brand-500"
            />
          </div>
        </Field>
      </div>

      <div className="mt-5">
        <Field label={form.message} htmlFor="mensaje">
          <textarea
            id="mensaje"
            name="mensaje"
            required
            rows={5}
            maxLength={5000}
            placeholder={form.messagePlaceholder}
            className={`${inputClass} resize-y`}
          />
        </Field>
      </div>

      {/* Trampa para bots: invisible y fuera del orden de tabulación */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">No completar</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-7 flex flex-col gap-4">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm shadow-brand-900/20 transition hover:-translate-y-0.5 hover:bg-brand-700 disabled:pointer-events-none disabled:opacity-60"
        >
          {sending ? (
            <>
              <Spinner />
              {form.sending}
            </>
          ) : (
            <>
              <Icon name="mail" className="size-4.5" />
              {form.submit}
            </>
          )}
        </button>

        <p className="text-xs leading-relaxed text-ink/55">{form.privacyNote}</p>

        {status === "error" && (
          <div className="rounded-xl bg-coral-50 px-4 py-3 text-sm text-coral-800">
            <p>{form.errorText}</p>
            <a
              href={fallbackHref}
              className="mt-1.5 inline-block font-semibold text-coral-700 underline underline-offset-4 hover:text-coral-800"
            >
              {form.errorAction}
            </a>
          </div>
        )}
      </div>
    </form>
  );
}

/** Mismo mensaje, pero abierto en el cliente de correo. Solo si falla el envío. */
function buildMailto(
  payload: { name: string; email: string; about: string; message: string },
  form: Dictionary["form"],
): string {
  const subject = payload.about
    ? `[${payload.about}] ${payload.name}`
    : payload.name;

  const body = [
    `${form.bodyName}: ${payload.name}`,
    `${form.bodyEmail}: ${payload.email}`,
    payload.about ? `${form.bodyAbout}: ${payload.about}` : null,
    "",
    payload.message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return `mailto:${site.email.support}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
    />
  );
}

const inputClass =
  "w-full rounded-xl border border-brand-500/20 bg-white px-4 py-3 text-[15px] text-ink transition placeholder:text-ink/35 focus:border-brand-500 focus:outline-none";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-ink/75"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

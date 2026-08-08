"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon, type IconName } from "@/components/icons";
import { signInWithGoogle, signOut } from "@/lib/firebase/session";
import type { Dictionary } from "@/lib/dictionaries";
import { useSession, type SessionUser } from "@/lib/store/session";
import { site } from "@/lib/site";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CAPARAZÓN DEL PANEL
 * ─────────────────────────────────────────────────────────────────────────────
 * Login, control de acceso, identidad y navegación entre secciones.
 *
 * Está separado del contenido a propósito: hoy la única sección es
 * Conversaciones, pero el panel es el lugar donde van a vivir las herramientas
 * de administración de cualquier proyecto —turnos, productos, usuarios—. Sumar
 * una sección tiene que ser agregar una entrada, no rehacer la pantalla.
 */

export type PanelSection = {
  id: string;
  label: string;
  icon: IconName;
  content: React.ReactNode;
  /**
   * Hijos del menú. Conversaciones los usa para colgar su lista debajo del
   * grupo: se despliegan y se pliegan con él, así que cuando no hacen falta no
   * ocupan pantalla. Quién los dibuja es cada sección, no el caparazón.
   */
  nav?: React.ReactNode;
};

export function PanelShell({
  dict,
  sections,
}: {
  dict: Dictionary;
  sections: PanelSection[];
}) {
  const panel = dict.panel;
  const status = useSession((state) => state.status);
  const user = useSession((state) => state.user);
  const allowed = useSession((state) => state.canOperate);

  const [signingIn, setSigningIn] = useState(false);
  const [active, setActive] = useState(sections[0]?.id ?? "");

  /** Grupos plegados. Arrancan todos desplegados, como pediste. */
  const [folded, setFolded] = useState<string[]>([]);

  const signedIn = Boolean(user && !user.isAnonymous);

  if (status === "loading") {
    return <Centered>{panel.loading}</Centered>;
  }

  if (!signedIn) {
    return (
      <Centered>
        <Card icon="lock" tone="brand" title={panel.signInTitle}>
          <p className="mt-2 text-sm leading-relaxed text-ink/65">
            {panel.signInText}
          </p>
          <button
            type="button"
            disabled={signingIn}
            onClick={async () => {
              setSigningIn(true);
              try {
                await signInWithGoogle();
              } catch (error) {
                console.warn("Panel: no se pudo iniciar sesión", error);
              } finally {
                setSigningIn(false);
              }
            }}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
          >
            {signingIn ? panel.signingIn : panel.signInButton}
          </button>
        </Card>
      </Centered>
    );
  }

  if (!allowed) {
    return (
      <Centered>
        <Card icon="shield" tone="coral" title={panel.noAccessTitle}>
          <p className="mt-2 text-sm leading-relaxed text-ink/65">
            {panel.noAccessText}
          </p>
          <div className="mt-5 flex items-center justify-center gap-2.5">
            <Avatar user={user} />
            <span className="text-xs text-ink/55">{user?.email}</span>
          </div>
          <SignOutButton label={panel.signOut} className="mt-5" />
        </Card>
      </Centered>
    );
  }

  const current = sections.find((section) => section.id === active) ?? sections[0];

  /**
   * Un clic en la sección abierta la pliega; en cualquier otra, la abre. Así
   * el chevron no necesita ser un botón aparte y el bloque queda entero.
   */
  const onSelect = (id: string) => {
    if (id === current?.id) {
      setFolded((folded) =>
        folded.includes(id)
          ? folded.filter((item) => item !== id)
          : [...folded, id],
      );
      return;
    }
    setActive(id);
    setFolded((folded) => folded.filter((item) => item !== id));
  };

  return (
    <div className="shell py-8 md:py-10">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[13px] font-semibold tracking-[0.14em] text-coral-600 uppercase">
            {site.name}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            {panel.title}
          </h1>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-brand-500/10 bg-white py-1.5 pr-1.5 pl-2">
          <Avatar user={user} />
          <span className="hidden max-w-52 truncate text-sm text-ink/65 sm:inline">
            {user?.email}
          </span>
          <SignOutButton label={panel.signOut} compact />
        </div>
      </header>

      <div className="grid gap-5 md:grid-cols-[15rem_1fr]">
        {/* Navegación jerárquica */}
        <aside className="rounded-2xl border border-brand-500/10 bg-white p-2">
          <nav className="flex flex-col gap-0.5">
            {sections.map((section) => {
              const active = section.id === current?.id;
              const isFolded = folded.includes(section.id);
              const showsChildren = Boolean(section.nav) && active && !isFolded;

              return (
                <div key={section.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(section.id)}
                    aria-current={active}
                    aria-expanded={section.nav ? showsChildren : undefined}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                      active
                        ? "bg-brand-600 text-white shadow-sm shadow-brand-900/20"
                        : "text-ink/70 hover:bg-brand-50 hover:text-brand-700"
                    }`}
                  >
                    <Icon name={section.icon} className="size-4.5 shrink-0" />
                    <span className="flex-1 truncate">{section.label}</span>

                    {/* El chevron va dentro del bloque, no al lado */}
                    {section.nav && (
                      <Icon
                        name="chevronDown"
                        aria-hidden="true"
                        className={`size-4 shrink-0 transition-transform duration-200 ${
                          active ? "opacity-80" : "opacity-45"
                        } ${showsChildren ? "" : "-rotate-90"}`}
                      />
                    )}
                  </button>

                  {/* Los hijos se pliegan hacia arriba, contra su grupo */}
                  {showsChildren && (
                    <div className="mt-1 ml-4 border-l border-brand-500/15 pl-1.5">
                      {section.nav}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {current?.content}
      </div>
    </div>
  );
}

/** Avatar de Google, con las iniciales como respaldo. */
function Avatar({ user }: { user: SessionUser | null }) {
  if (user?.photoURL) {
    return (
      <Image
        src={user.photoURL}
        alt=""
        width={64}
        height={64}
        className="size-8 shrink-0 rounded-full object-cover ring-1 ring-black/5"
      />
    );
  }

  const initial = (user?.name ?? user?.email ?? "?").trim().charAt(0).toUpperCase();

  return (
    <span
      aria-hidden="true"
      className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-600 text-xs font-semibold text-white"
    >
      {initial}
    </span>
  );
}

function SignOutButton({
  label,
  compact = false,
  className = "",
}: {
  label: string;
  compact?: boolean;
  className?: string;
}) {
  if (compact) {
    return (
      <button
        type="button"
        onClick={() => signOut()}
        aria-label={label}
        title={label}
        className={`grid size-9 place-items-center rounded-xl text-ink/45 transition hover:bg-coral-50 hover:text-coral-600 ${className}`}
      >
        <Icon name="logout" className="size-4.5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => signOut()}
      className={`inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition hover:text-brand-800 ${className}`}
    >
      <Icon name="logout" className="size-4" />
      {label}
    </button>
  );
}

function Card({
  icon,
  tone,
  title,
  children,
}: {
  icon: IconName;
  tone: "brand" | "coral";
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-sm rounded-3xl border border-brand-500/10 bg-white p-8 text-center shadow-lg shadow-brand-950/5">
      <span
        className={`mx-auto grid size-14 place-items-center rounded-2xl text-white ${
          tone === "brand" ? "bg-brand-600" : "bg-coral-500"
        }`}
      >
        <Icon name={icon} className="size-6" />
      </span>
      <h1 className="mt-5 text-xl font-semibold tracking-tight text-ink">
        {title}
      </h1>
      {children}
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-[70vh] place-items-center px-5 py-16">
      {children}
    </div>
  );
}

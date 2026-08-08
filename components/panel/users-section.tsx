"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { COLLECTIONS, type Role } from "@/lib/firebase/collections";
import type { Dictionary } from "@/lib/dictionaries";
import { useSession } from "@/lib/store/session";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SECCIÓN: USUARIOS
 * ─────────────────────────────────────────────────────────────────────────────
 * Quién entra al panel y con qué permisos. Es la sección que hace que el resto
 * sea administrable sin tocar la consola de Firebase: promover a alguien a
 * operador se hace acá.
 *
 * Solo la ve un administrador —el panel decide eso al componer las secciones—,
 * pero eso es la cara visible: quien manda son las reglas de Firestore, que
 * rechazan el cambio de rol si quien escribe no es admin.
 */

type PanelUser = {
  uid: string;
  role: Role;
  email: string | null;
  name: string | null;
  photoURL: string | null;
  createdAt: number;
};

const ROLES: Role[] = ["visitor", "operator", "admin"];

export function UsersSection({ dict }: { dict: Dictionary }) {
  const panel = dict.panel;
  const user = useSession((state) => state.user);
  const isAdmin = useSession((state) => state.isAdmin);

  const [users, setUsers] = useState<PanelUser[] | null>(null);
  const [error, setError] = useState(false);
  /** uid cuyo rol se está guardando, para bloquear su select mientras tanto */
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) return;
    let stop: (() => void) | undefined;

    (async () => {
      const [{ getDb }, firestore] = await Promise.all([
        import("@/lib/firebase/client"),
        import("firebase/firestore"),
      ]);

      const ref = firestore.query(
        firestore.collection(getDb(), COLLECTIONS.users),
        firestore.orderBy("createdAt", "desc"),
        firestore.limit(100),
      );

      stop = firestore.onSnapshot(ref, (snapshot) => {
        setUsers(
          snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              uid: docSnap.id,
              role: normalizeRole(data.role),
              email: data.email ?? null,
              name: data.name ?? null,
              photoURL: data.photoURL ?? null,
              createdAt: Number(data.createdAt ?? 0),
            };
          }),
        );
      });
    })();

    return () => stop?.();
  }, [isAdmin]);

  const changeRole = async (target: PanelUser, role: Role) => {
    setSaving(target.uid);
    setError(false);

    try {
      const [{ getDb }, firestore] = await Promise.all([
        import("@/lib/firebase/client"),
        import("firebase/firestore"),
      ]);

      await firestore.updateDoc(
        firestore.doc(getDb(), COLLECTIONS.users, target.uid),
        { role, updatedAt: Date.now() },
      );
    } catch (cause) {
      console.warn("Panel: no se pudo cambiar el rol", cause);
      setError(true);
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="flex h-[calc(100dvh-13rem)] min-h-96 md:h-[calc(100vh-17rem)] flex-col overflow-hidden rounded-2xl border border-brand-500/10 bg-white">
      <div className="shrink-0 border-b border-brand-500/10 px-4 py-3">
        <p className="text-sm font-semibold text-ink">
          {panel.sections.users}
        </p>
        <p className="mt-0.5 text-xs text-ink/50">{panel.usersIntro}</p>
      </div>

      {error && (
        <p className="shrink-0 border-b border-coral-500/20 bg-coral-50 px-4 py-2.5 text-xs text-coral-700">
          {panel.roleError}
        </p>
      )}

      {users === null && <p className="p-4 text-sm text-ink/50">{panel.loading}</p>}

      {users?.length === 0 && (
        <p className="p-4 text-sm text-ink/65">{panel.usersEmpty}</p>
      )}

      <ul className="flex-1 overflow-y-auto">
        {users?.map((item) => {
          const isMe = item.uid === user?.uid;

          return (
            <li
              key={item.uid}
              className="flex flex-wrap items-center gap-3 border-b border-brand-500/5 px-4 py-3"
            >
              <UserAvatar user={item} />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">
                  {item.name ?? item.email ?? item.uid}
                  {isMe && (
                    <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700">
                      {panel.itsYou}
                    </span>
                  )}
                </p>
                <p className="truncate text-xs text-ink/50">
                  {item.email ?? item.uid}
                </p>
              </div>

              {/*
                Un admin puede degradarse a sí mismo y quedarse afuera del
                panel. El salvavidas del correo de bootstrap existe para eso,
                así que no hace falta bloquearlo acá: alcanza con que quede
                claro cuál es su propia fila.
              */}
              <label className="flex shrink-0 items-center gap-2">
                <span className="sr-only">{panel.roleLabel}</span>
                <select
                  value={item.role}
                  disabled={saving === item.uid}
                  onChange={(event) =>
                    void changeRole(item, event.target.value as Role)
                  }
                  /* 16px y 44px de alto: lo mínimo para tocar cómodo y para
                     que iOS no haga zoom al abrir el selector. */
                  className="min-h-11 rounded-xl border border-brand-500/20 bg-white px-3 py-2 text-base text-ink/80 transition focus:border-brand-500 focus:outline-none disabled:opacity-50 md:text-sm"
                >
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {roleLabel(role, panel)}
                    </option>
                  ))}
                </select>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function UserAvatar({ user }: { user: PanelUser }) {
  if (user.photoURL) {
    return (
      <Image
        src={user.photoURL}
        alt=""
        width={64}
        height={64}
        className="size-9 shrink-0 rounded-full object-cover ring-1 ring-black/5"
      />
    );
  }

  const initial = (user.name ?? user.email ?? "?").trim().charAt(0).toUpperCase();

  return (
    <span
      aria-hidden="true"
      className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-600 text-xs font-semibold text-white"
    >
      {initial}
    </span>
  );
}

function roleLabel(role: Role, panel: Dictionary["panel"]): string {
  if (role === "admin") return panel.roleAdmin;
  if (role === "operator") return panel.roleOperator;
  return panel.roleVisitor;
}

/** Un rol desconocido en los datos se trata como el más restrictivo. */
function normalizeRole(value: unknown): Role {
  return value === "admin" || value === "operator" ? value : "visitor";
}

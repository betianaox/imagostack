"use client";

import { create } from "zustand";
import { canOperate, type Role, type UserProfile } from "@/lib/firebase/collections";
import type { Locale } from "@/lib/i18n";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SESIÓN
 * ─────────────────────────────────────────────────────────────────────────────
 * Estado compartido de quién está usando el sitio. Un solo store para que haya
 * una sola suscripción a Firebase: si cada componente resolviera la sesión por
 * su cuenta, tendríamos varios listeners haciendo las mismas lecturas contra
 * la cuota.
 *
 * Vive a nivel de módulo, así que es client-only: no se lee durante el render
 * del servidor. Para estado de sesión eso es lo natural.
 *
 * El mismo store sirve en cualquier proyecto. Lo que cambia entre ImagoStack
 * —donde los visitantes entran anónimos— y un cliente con login propio es de
 * dónde sale el usuario, no qué se guarda de él.
 */

export type SessionStatus = "loading" | "anonymous" | "signed-in" | "error";

export type SessionUser = {
  uid: string;
  email: string | null;
  name: string | null;
  photoURL: string | null;
  /** Auth anónima: tiene uid pero no es una persona identificada */
  isAnonymous: boolean;
};

type SessionState = {
  status: SessionStatus;
  user: SessionUser | null;
  profile: UserProfile | null;
  /** Rol efectivo; null hasta que se conozca el perfil */
  role: Role | null;
  /** Atajo: si puede atender conversaciones desde el panel */
  canOperate: boolean;
  /** Solo un admin puede listar usuarios y cambiar roles */
  isAdmin: boolean;

  setStatus: (status: SessionStatus) => void;
  setUser: (user: SessionUser | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  /** Idioma preferido del perfil, con el del sitio como respaldo */
  preferredLang: (fallback: Locale) => Locale;
  reset: () => void;
};

const empty = {
  status: "loading" as SessionStatus,
  user: null,
  profile: null,
  role: null,
  canOperate: false,
  isAdmin: false,
};

/**
 * Salvavidas: este correo puede operar aunque su perfil diga otra cosa.
 *
 * Tiene que estar acá **y** en las reglas de Firestore. Si estuviera solo en
 * las reglas, un error asignando roles dejaría el panel inaccesible — y el
 * panel es justamente donde se arreglan los roles.
 */
function isBootstrapOperator(email: string | null | undefined): boolean {
  const bootstrap = process.env.NEXT_PUBLIC_OPERATOR_EMAIL;
  return Boolean(bootstrap && email && email === bootstrap);
}

function resolveIsAdmin(
  user: SessionUser | null,
  profile: UserProfile | null,
): boolean {
  return profile?.role === "admin" || isBootstrapOperator(user?.email);
}

function resolveCanOperate(
  user: SessionUser | null,
  profile: UserProfile | null,
): boolean {
  return canOperate(profile?.role ?? null) || isBootstrapOperator(user?.email);
}

export const useSession = create<SessionState>((set, get) => ({
  ...empty,

  setStatus: (status) => set({ status }),

  setUser: (user) =>
    set({
      user,
      status: user ? (user.isAnonymous ? "anonymous" : "signed-in") : "anonymous",
      canOperate: resolveCanOperate(user, get().profile),
      isAdmin: resolveIsAdmin(user, get().profile),
    }),

  setProfile: (profile) =>
    set({
      profile,
      role: profile?.role ?? null,
      canOperate: resolveCanOperate(get().user, profile),
      isAdmin: resolveIsAdmin(get().user, profile),
    }),

  preferredLang: (fallback) => get().profile?.lang ?? fallback,

  reset: () => set(empty),
}));

/** Selectores, para suscribirse solo a lo que cada componente necesita. */
export const selectCanOperate = (state: SessionState) => state.canOperate;
export const selectUser = (state: SessionState) => state.user;
export const selectStatus = (state: SessionState) => state.status;

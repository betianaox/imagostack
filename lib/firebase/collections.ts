import type { Locale } from "@/lib/i18n";

/**
 * Nombres de las colecciones, en un solo lugar.
 *
 * Renombrar una colección con datos adentro implica migrar, así que conviene
 * que el nombre viva acá y no repartido por el código. Van en inglés como el
 * resto de los identificadores: el sitio habla tres idiomas y el código, uno.
 */
export const COLLECTIONS = {
  users: "users",
  conversations: "conversations",
  messages: "messages",
} as const;

/**
 * Roles del sistema. El mismo juego sirve para cualquier proyecto: lo que
 * cambia entre ImagoStack y un cliente es quién tiene cada rol, no cuáles hay.
 *
 *   visitor   quien escribe al chat; en este sitio entra anónimo
 *   operator  puede atender conversaciones desde el panel
 *   admin     además administra usuarios y roles
 */
export type Role = "visitor" | "operator" | "admin";

/**
 * Perfil de usuario. Arranca mínimo a propósito: la colección está pensada
 * para crecer —datos del negocio, preferencias, lo que haga falta— sin tocar
 * nada de lo ya construido.
 */
export type UserProfile = {
  role: Role;
  /**
   * Idioma preferido. Se guarda para que el panel y las notificaciones hablen
   * en el idioma de cada uno, sin depender de qué navegador esté usando en
   * ese momento.
   */
  lang: Locale;
  email: string | null;
  name: string | null;
  photoURL: string | null;
  createdAt: number;
  updatedAt: number;
};

/** Roles que habilitan la consola de conversaciones. */
export const OPERATOR_ROLES: Role[] = ["operator", "admin"];

export function canOperate(role: Role | null): boolean {
  return role !== null && OPERATOR_ROLES.includes(role);
}

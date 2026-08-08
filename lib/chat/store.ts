import type {
  ChatMessage,
  Conversation,
  ConversationStore,
} from "@/lib/chat/types";

/**
 * Almacén sin persistencia: la conversación vive en el cliente y el servidor
 * no guarda nada.
 *
 * Es lo que corresponde para ImagoStack: no hay panel de operadora ni motivo
 * para conservar charlas de visitantes. El historial que necesita el modelo se
 * lo manda el propio widget en cada turno.
 *
 * En Anabella esta misma interfaz se implementa con Firestore, y ahí aparecen
 * el historial compartido, el panel y la toma manual — sin tocar el motor.
 */
export class EphemeralStore implements ConversationStore {
  readonly name = "ephemeral";
  readonly persists = false;

  async load(): Promise<Conversation | null> {
    // Sin persistencia no hay nada que cargar: el motor crea una conversación
    // nueva con el id que trae el cliente, que es lo que la mantiene estable.
    return null;
  }

  async create(conversation: Conversation): Promise<Conversation> {
    return conversation;
  }

  async append(): Promise<void> {
    // Nada que guardar. Es intencional, no un pendiente.
  }

  async history(): Promise<ChatMessage[]> {
    // Sin persistencia el historial lo aporta el cliente en cada turno, y el
    // motor lo toma de ahí porque `persists` es false.
    return [];
  }
}

import type { Metadata } from "next";
import { PanelView } from "@/views/panel";
import { getDictionary } from "@/lib/dictionaries";

/**
 * Panel de operación. Fuera del índice de Google: no es contenido público y
 * no tiene sentido que aparezca en resultados de búsqueda.
 */
export const metadata: Metadata = {
  title: getDictionary("es").panel.title,
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PanelView dict={getDictionary("es")} />;
}

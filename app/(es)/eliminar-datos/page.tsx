import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { DeleteDataView } from "@/views/legal";

export const metadata: Metadata = (() => {
  const dict = getDictionary("es");
  return pageMetadata({
    lang: "es",
    route: "/eliminar-datos",
    title: dict.meta.deleteDataTitle,
    description: dict.meta.deleteDataDescription,
  });
})();

export default function Page() {
  return <DeleteDataView lang="es" />;
}

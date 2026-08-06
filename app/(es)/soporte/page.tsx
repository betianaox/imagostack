import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { SupportView } from "@/views/support";

export const metadata: Metadata = (() => {
  const dict = getDictionary("es");
  return pageMetadata({
    lang: "es",
    route: "/soporte",
    title: dict.meta.supportTitle,
    description: dict.meta.supportDescription,
    ogTitle: dict.meta.supportOgTitle,
  });
})();

export default function Page() {
  return <SupportView lang="es" />;
}

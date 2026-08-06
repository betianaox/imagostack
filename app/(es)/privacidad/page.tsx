import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { PrivacyView } from "@/views/legal";

export const metadata: Metadata = (() => {
  const dict = getDictionary("es");
  return pageMetadata({
    lang: "es",
    route: "/privacidad",
    title: dict.meta.privacyTitle,
    description: dict.meta.privacyDescription,
  });
})();

export default function Page() {
  return <PrivacyView lang="es" />;
}

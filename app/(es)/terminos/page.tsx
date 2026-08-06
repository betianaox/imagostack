import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { TermsView } from "@/views/legal";

export const metadata: Metadata = (() => {
  const dict = getDictionary("es");
  return pageMetadata({
    lang: "es",
    route: "/terminos",
    title: dict.meta.termsTitle,
    description: dict.meta.termsDescription,
  });
})();

export default function Page() {
  return <TermsView lang="es" />;
}

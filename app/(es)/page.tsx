import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { HomeView } from "@/views/home";

export const metadata: Metadata = (() => {
  const dict = getDictionary("es");
  return pageMetadata({
    lang: "es",
    route: "/",
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    ogTitle: dict.meta.ogHomeTitle,
  });
})();

export default function Page() {
  return <HomeView lang="es" />;
}

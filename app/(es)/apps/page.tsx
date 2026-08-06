import type { Metadata } from "next";
import { apps } from "@/lib/apps";
import { fillText, getDictionary } from "@/lib/dictionaries";
import { t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { AppsListView } from "@/views/apps-list";

export const metadata: Metadata = (() => {
  const dict = getDictionary("es");
  const list = apps
    .map((app) => `${app.name} (${t(app.category, "es").toLowerCase()})`)
    .join(", ");

  return pageMetadata({
    lang: "es",
    route: "/apps",
    title: dict.meta.appsTitle,
    description: fillText(dict.meta.appsDescription, { list }),
    ogTitle: dict.meta.appsOgTitle,
  });
})();

export default function Page() {
  return <AppsListView lang="es" />;
}

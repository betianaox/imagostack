import { path, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

/**
 * Valores que se interpolan en los textos legales de los diccionarios.
 * Al centralizarlos acá, cambiar un correo o la razón social se refleja en las
 * páginas legales de los tres idiomas a la vez.
 */
export function legalValues(lang: Locale): Record<string, string> {
  return {
    company: site.legalName,
    domain: site.domain,
    jurisdiction: site.jurisdiction,
    email: site.email.support,
    generalEmail: site.email.general,
    privacyUrl: path("/privacidad", lang),
    deleteDataUrl: path("/eliminar-datos", lang),
  };
}

# imagostack.com

Sitio institucional de **Imagostack** — _Full-cycle, full-stack_ — y vidriera de
nuestras apps de Android en Google Play.

Next.js 16 (App Router) + Tailwind CSS v4, exportado como sitio estático
(`output: "export"`) y desplegado en el dominio `imagostack.com`.

## Comandos

```bash
npm run dev     # desarrollo en http://localhost:3000
npm run build   # build + exportación estática a ./out
npm run lint    # eslint
```

## Idiomas

El sitio está en **español, inglés y portugués**.

- El español vive en la raíz (`/apps`) y es la versión canónica.
- Los otros idiomas cuelgan de un prefijo: `/en/apps`, `/pt/apps`.
- Todas las páginas declaran `hreflang` de las tres versiones más `x-default`.

**Todo el texto sale de los diccionarios** de [`lib/dictionaries/`](lib/dictionaries):
`es.ts` define la forma y `en.ts` / `pt.ts` la cumplen. Si agregás una clave en
`es.ts`, TypeScript falla el build hasta que exista en los otros dos — es
imposible olvidarse de traducir algo. Los textos de las apps (tagline,
descripción, features, `alt` de las capturas) están en `lib/apps.ts`, con sus
tres variantes por campo.

**Detección automática:** como el sitio es estático no hay middleware que lea
`Accept-Language`, así que la detección la hace
[`components/locale-redirect.tsx`](components/locale-redirect.tsx) en el
cliente. Solo redirige si se cumplen las tres condiciones: el visitante está en
una URL sin prefijo, nunca eligió idioma a mano (nada en `localStorage`), y el
idioma de su navegador es inglés o portugués. Elegir un idioma en el selector
del header queda guardado y desactiva la redirección para siempre.

**Estructura de rutas:** hay dos *root layouts* mediante route groups —
`app/(es)/layout.tsx` y `app/(intl)/[lang]/layout.tsx`— para que cada idioma
declare su propio `<html lang>` ya en el HTML estático, en vez de corregirlo
desde el cliente. Los route groups no aparecen en la URL. Las páginas en sí
viven en [`views/`](views) y las rutas son archivos finos que solo arman los
metadatos y renderizan la vista con su idioma.

Las páginas legales se escriben como bloques de texto plano en los diccionarios
(`{ h2 }`, `{ p }`, `{ ul }`…) y las renderiza
[`components/rich-text.tsx`](components/rich-text.tsx), que soporta `**negrita**`,
`_cursiva_` y `[links](/ruta)`. Los datos que cambian —correos, razón social,
jurisdicción— se interpolan con `{claves}` desde `lib/legal.ts`.

Los slugs de las URLs se mantienen en español en todos los idiomas
(`/en/privacidad`, no `/en/privacy`) para no multiplicar el árbol de rutas.

## Cómo agregar una app nueva

Todo el catálogo sale de un solo archivo: [`lib/apps.ts`](lib/apps.ts). Agregar
una app son tres pasos:

1. **Assets.** Creá `public/apps/<slug>/` y poné ahí:
   - `icon.png` — el icono cuadrado de la app.
   - `01.jpeg`, `02.jpeg`, … — las capturas, en el orden que quieras mostrarlas.
     No hay límite de cantidad.
2. **Datos.** Copiá uno de los objetos del array `apps` en `lib/apps.ts`, cambiá
   el `slug` y completá el resto de los campos en los tres idiomas. Los tipos
   están documentados en el mismo archivo.
3. **Nada más.** Con eso se generan solas:
   - la tarjeta en el home y en `/apps`;
   - la ficha `/apps/<slug>` con galería y visor a pantalla completa;
   - la política de privacidad `/apps/<slug>/privacidad`;
   - las entradas del `sitemap.xml`.

`screenshots[0]` es la captura que se usa en las tarjetas y en el hero del home,
así que conviene que sea la más representativa. Si `screenshots` queda vacío, la
ficha muestra marcos de teléfono como placeholder en lugar de imágenes roas.

Cuando la app se publique en Google Play, pegá su URL en `playStoreUrl`: el botón
"Muy pronto en Google Play" pasa a ser un botón de descarga real.

## Lo que pide Google Play

| Requisito de Play Console | Dónde está |
| --- | --- |
| URL de política de privacidad (por app) | `https://imagostack.com/apps/<slug>/privacidad` |
| Política de privacidad del desarrollador | `https://imagostack.com/privacidad` |
| URL de eliminación de datos | `https://imagostack.com/eliminar-datos` |
| Correo y sitio de soporte | `https://imagostack.com/soporte` |
| Términos de uso | `https://imagostack.com/terminos` |

Todas esas páginas existen también en `/en/…` y `/pt/…` por si Play Console
pide una URL por idioma de la ficha.

Las declaraciones de la sección **Data safety** de Play Console tienen que
coincidir con lo que dice el bloque `privacy` de cada app en `lib/apps.ts`
(datos que recolecta, permisos, publicidad, compras integradas). Si cambia el
comportamiento de una app, hay que actualizar ambos lados y la fecha
`privacy.updatedAt`.

## SEO

- **Tarjetas sociales**: se generan como PNG reales en build desde
  [`lib/og-image.tsx`](lib/og-image.tsx) — `/og.png` para el sitio y
  `/apps/<slug>/og.png` para cada app, con sus propios colores. Se emiten como
  route handlers (`app/og.png/route.tsx`) y no como `opengraph-image.tsx` para
  que el archivo tenga extensión y el hosting lo sirva con `Content-Type: image/png`.
- **Datos estructurados** (JSON-LD): `Organization` + `WebSite` en el layout,
  `SoftwareApplication` + `BreadcrumbList` en cada app, `ItemList` en `/apps` y
  `FAQPage` en `/soporte`. Se pueden validar en
  [Rich Results Test](https://search.google.com/test/rich-results).
- **Sitemap y robots** se generan solos desde el catálogo de apps.
- Cada página define su `title`, `description` y `canonical`. El `alt` de cada
  captura es contenido indexable: conviene que describa la pantalla de verdad.

Tras el primer deploy, dar de alta el sitio en
[Google Search Console](https://search.google.com/search-console) y enviar
`https://imagostack.com/sitemap.xml`.

## Formulario de contacto

El formulario del home y de `/soporte`
([`components/contact-form.tsx`](components/contact-form.tsx)) hace POST a
[`app/api/contact/route.ts`](app/api/contact/route.ts), que despacha el correo
con **Resend** desde el servidor. La API key nunca llega al navegador.

### Variables de entorno

Copiá [`.env.example`](.env.example) a `.env.local` para desarrollo y cargá las
mismas dos variables en **Vercel → Settings → Environment Variables**:

| Variable | Qué es |
| --- | --- |
| `RESEND_API_KEY` | La clave de la cuenta, desde [resend.com/api-keys](https://resend.com/api-keys) |
| `CONTACT_FROM` | Remitente verificado, ej `Imagostack <web@imagostack.com>` |

El dominio del remitente tiene que estar **verificado en Resend** (registros SPF
y DKIM en el DNS). Para probar antes de verificarlo se puede usar
`onboarding@resend.dev`, que solo envía a la casilla dueña de la cuenta.

Los mensajes llegan a `site.email.support` con `replyTo` al correo de quien
escribió, así que responder desde el cliente de correo va directo a la persona.

### Detalles de implementación

- **No se guarda nada**: el endpoint no tiene base de datos, solo despacha.
- **Honeypot**: un campo `website` invisible; si viene completo se descarta el
  envío y se responde 200 para no darle información al bot.
- **Validación en el servidor**: campos requeridos, formato de correo y límites
  de longitud, sin confiar en la validación del navegador.
- **Respaldo**: si el POST falla, el formulario ofrece el mismo mensaje ya
  armado en un `mailto:` para que la persona no quede sin salida.
- Este endpoint es la única ruta dinámica del proyecto: por eso se quitó
  `output: "export"` de `next.config.ts`. Todas las páginas se siguen
  prerenderizando como HTML estático en el build.

## Datos globales del sitio

[`lib/site.ts`](lib/site.ts) concentra nombre, dominio, slogan, casillas de
correo y la fecha de vigencia de las páginas legales. Cambiar algo ahí se
propaga a metadatos, footer y textos legales.

## Estructura

```
app/
  page.tsx                        home
  apps/page.tsx                   catálogo
  apps/[slug]/page.tsx            ficha de app
  apps/[slug]/privacidad/page.tsx política por app
  privacidad, terminos,
  soporte, eliminar-datos         páginas del sitio
  sitemap.ts, robots.ts           SEO (force-static por la exportación)
components/                       header, footer, tarjetas, galería, iconos
lib/apps.ts                       catálogo de apps  ← lo que se edita seguido
lib/site.ts                       configuración global
content/                          fuentes de texto originales (no se publica)
public/apps/<slug>/               iconos y capturas
```

## Notas de mantenimiento

- Los iconos del sitio son SVG propios en `components/icons.tsx`: no hay
  dependencias de librerías de iconos.
- Las rutas de `public/` se escriben siempre en minúsculas: el hosting distingue
  mayúsculas de minúsculas aunque Windows no lo haga.
- El favicon es `public/favicon.png`, declarado en `app/layout.tsx`.

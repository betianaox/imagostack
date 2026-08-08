# imagostack.com

Sitio institucional de **ImagoStack** — _Full-cycle, full-stack_ — y vidriera de
nuestras apps de Android en Google Play.

Next.js 16 (App Router) + Tailwind CSS v4, desplegado en Vercel sobre el
dominio `imagostack.com`. Todas las páginas se prerenderizan como HTML estático
en el build; la única ruta que corre en el servidor es `/api/contact`.

## Comandos

```bash
npm run dev     # desarrollo en http://localhost:3000
npm run build   # build de producción
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

Para desarrollo, creá un `.env.local` en la raíz (está en `.gitignore`) con las
dos variables. Las mismas van en **Vercel → Settings → Environments →
Production**, ahí sin comillas: las comillas son sintaxis del archivo, no parte
del valor.

| Variable | Qué es |
| --- | --- |
| `RESEND_API_KEY` | La clave de la cuenta, desde [resend.com/api-keys](https://resend.com/api-keys) |
| `CONTACT_FROM` | Remitente verificado, ej `ImagoStack <web@imagostack.com>` |

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

## Chatbot

El motor vive en [`lib/chat/`](lib/chat) y **no sabe nada de ImagoStack**: está
escrito contra cuatro interfaces ([`types.ts`](lib/chat/types.ts)) que cada
sitio implementa a su manera. Mudarlo a otro proyecto es reescribir un solo
archivo de configuración.

| Pieza | Qué decide | Hoy en ImagoStack |
| --- | --- | --- |
| `LLMProvider` | De dónde salen las respuestas | Gemini por REST, sin SDK |
| `Retriever` | Qué contexto ve el modelo | Corpus completo |
| `RateLimiter` | Cuántas consultas se permiten | Memoria (minuto + hora) |
| `ConversationStore` | Dónde vive la conversación | En ningún lado |

Las cuatro se eligen en [`lib/chat/config.ts`](lib/chat/config.ts), junto con la
personalidad del bot. Ese archivo es el único con contenido específico del sitio.

### La base de conocimiento se genera sola

[`lib/chat/knowledge.ts`](lib/chat/knowledge.ts) arma el corpus desde
`lib/apps.ts`, los diccionarios y `lib/site.ts`. **No hay ni un texto duplicado**:
cuando agregás una app o cambiás una FAQ, el bot se entera en el próximo build.
Cada fragmento lleva su URL para que el bot enlace de verdad.

Son unos 2.500 tokens contra una ventana de 1M, así que se manda entero. Eso no
es solo más simple que una búsqueda vectorial: es **mejor**, porque una búsqueda
puede traer el fragmento equivocado y el contexto completo no puede fallar.

### Costo y límites

Con el nivel gratuito de Google AI Studio **y sin facturación habilitada**, el
abuso no puede generar una factura: la cuota se agota y el bot deja de
responder. Por eso los límites protegen la *disponibilidad* —que un visitante no
consuma la cuota diaria de todos—, no el dinero.

Cuando el proveedor devuelve 429, el motor emite un evento `handoff`: el widget
muestra un mensaje genérico y ofrece el formulario de contacto. **Al visitante no
se le explica que se agotó la cuota.**

### Variables de entorno

| Variable | Efecto |
| --- | --- |
| `GEMINI_API_KEY` | Sin ella, responde un proveedor simulado y el sitio sigue funcionando |
| `GEMINI_MODEL` | Opcional; por defecto `gemini-3.1-flash-lite` |
| `CHAT_SIMULATE_QUOTA=1` | Fuerza el modo respaldo, para probarlo sin agotar la cuota |

**Sobre el modelo:** la familia `gemini-2.5-*` devuelve 404 en proyectos nuevos
("no longer available to new users"). El sitio usa `gemini-3.1-flash-lite`, que
es estable —no preview— y sobra para un contexto de 2.000 tokens con respuestas
cortas. La alternativa `gemini-flash-lite-latest` sigue siempre la versión
vigente, a cambio de que pueda cambiar sin aviso.

Para ver qué modelos habilita un proyecto:

```bash
curl -s https://generativelanguage.googleapis.com/v1beta/models \
  -H "x-goog-api-key: $GEMINI_API_KEY"
```

### Preparado para la toma manual

La v1 ya nace con lo que hace falta para que una persona pueda responder en
lugar del bot, aunque todavía no exista el panel: identificador de conversación,
mensajes como datos con rol y marca de tiempo, campo `mode` y el timeout del
operador —que se resuelve al recibir un mensaje, sin procesos de fondo ni tareas
programadas.

El guardia que hace que el bot se calle cuando entra una persona es una sola
condición en [`engine.ts`](lib/chat/engine.ts). Sumar el panel es implementar
`ConversationStore` contra Firestore; el motor no se toca.

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

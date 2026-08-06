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

## Cómo agregar una app nueva

Todo el catálogo sale de un solo archivo: [`lib/apps.ts`](lib/apps.ts). Agregar
una app son tres pasos:

1. **Assets.** Creá `public/apps/<slug>/` y poné ahí:
   - `icon.png` — el icono cuadrado de la app.
   - `01.jpeg`, `02.jpeg`, … — las capturas, en el orden que quieras mostrarlas.
     No hay límite de cantidad.
2. **Datos.** Copiá uno de los objetos del array `apps` en `lib/apps.ts`, cambiá
   el `slug` y completá el resto de los campos. Los tipos están documentados en
   el mismo archivo.
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

Las declaraciones de la sección **Data safety** de Play Console tienen que
coincidir con lo que dice el bloque `privacy` de cada app en `lib/apps.ts`
(datos que recolecta, permisos, publicidad, compras integradas). Si cambia el
comportamiento de una app, hay que actualizar ambos lados y la fecha
`privacy.updatedAt`.

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

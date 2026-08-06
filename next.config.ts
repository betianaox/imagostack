import type { NextConfig } from "next";

/**
 * Ya no usamos `output: "export"`.
 *
 * El formulario de contacto necesita un endpoint donde ejecutar Resend con la
 * API key del lado del servidor, y una exportación estática no puede tener
 * route handlers dinámicos. Todas las páginas se siguen prerenderizando como
 * HTML estático en el build: lo único que corre en el servidor es
 * `app/api/contact`.
 */
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

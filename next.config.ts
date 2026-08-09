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
/**
 * Proyecto de Firebase, para el proxy del flujo de login por redirección.
 */
const firebaseProject = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

const nextConfig: NextConfig = {
  /**
   * El manejador de autenticación de Firebase, servido desde nuestro dominio.
   *
   * Entrar por redirección implica salir a Google y volver. Si el que recibe
   * la vuelta es `<proyecto>.firebaseapp.com`, para Safari y para el Chrome
   * nuevo eso es un tercero, y le bloquean el almacenamiento: la sesión se
   * pierde justo al volver y el login parece no hacer nada.
   *
   * Con este proxy el ida y vuelta ocurre dentro de imagostack.com y deja de
   * haber terceros. Queda inerte hasta que `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   * apunte al dominio propio en lugar de al de Firebase.
   */
  async rewrites() {
    if (!firebaseProject) return [];

    return [
      {
        source: "/__/auth/:path*",
        destination: `https://${firebaseProject}.firebaseapp.com/__/auth/:path*`,
      },
    ];
  },

  images: {
    unoptimized: true,
    // Avatares de las cuentas de Google que entran al panel
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;

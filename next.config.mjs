/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  images: {
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Evita que la página se cargue dentro de un iframe (clickjacking)
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Fuerza HTTPS durante 1 año
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          // Aislamiento de origen entre pestañas
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          // Evita que el navegador adivine el tipo de contenido
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Política de referrer
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Permisos de APIs del navegador
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // CSP: permite Google Analytics, fuentes y recursos propios
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://www.google-analytics.com",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com",
              "font-src 'self'",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;

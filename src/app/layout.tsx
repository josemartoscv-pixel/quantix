import type { Metadata } from "next";
import { Toaster } from "sonner";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "DineroyAhorro - Gestiona tus finanzas personales",
  description:
    "Controla tus ingresos, gastos, ahorros y deudas de forma sencilla y visual. Tu salud financiera en un solo lugar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-S7WKB67K2G" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-S7WKB67K2G');
        `}</Script>
      </head>
      <body className="antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: "inherit",
            },
          }}
        />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Toaster } from "sonner";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DineroyAhorro - Gestiona tus finanzas personales",
    template: "%s | DineroyAhorro",
  },
  description:
    "Controla tus ingresos, gastos, ahorros y deudas de forma sencilla y visual. Tu salud financiera en un solo lugar.",
  keywords: [
    "finanzas personales",
    "gestión de gastos",
    "ahorro",
    "presupuesto",
    "control de gastos",
    "inversión",
    "deudas",
    "calculadora financiera",
    "patrimonio neto",
  ],
  authors: [{ name: "DineroyAhorro" }],
  metadataBase: new URL("https://www.dineroyahorro.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://www.dineroyahorro.com",
    siteName: "DineroyAhorro",
    title: "DineroyAhorro - Gestiona tus finanzas personales",
    description:
      "Controla tus ingresos, gastos, ahorros y deudas de forma sencilla y visual. Tu salud financiera en un solo lugar.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "DineroyAhorro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DineroyAhorro - Gestiona tus finanzas personales",
    description:
      "Controla tus ingresos, gastos, ahorros y deudas de forma sencilla y visual.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
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

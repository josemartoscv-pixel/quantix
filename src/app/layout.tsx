import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { ConditionalAnalytics } from "@/components/analytics";
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
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DineroyAhorro - Gestiona tus finanzas personales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DineroyAhorro - Gestiona tus finanzas personales",
    description:
      "Controla tus ingresos, gastos, ahorros y deudas de forma sencilla y visual.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{ style: { fontFamily: "inherit" } }}
        />
        <ConditionalAnalytics />
        <Analytics />
      </body>
    </html>
  );
}

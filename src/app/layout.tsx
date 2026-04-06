import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quantix - Gestiona tus finanzas personales",
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

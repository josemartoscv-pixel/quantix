import Link from "next/link";
import {
  TrendingUp,
  PiggyBank,
  BarChart3,
  Shield,
} from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel - hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 to-teal-700 flex-col justify-between p-12">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="DineroyAhorro" className="h-8 w-auto brightness-0 invert" />
        </Link>

        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white leading-tight mb-4">
              Toma el control de tus finanzas personales
            </h2>
            <p className="text-emerald-100 text-lg leading-relaxed">
              Gestiona tus ingresos, gastos, ahorros y deudas en un solo lugar.
              Simple, visual y efectivo.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: BarChart3,
                text: "Dashboard con tu salud financiera en tiempo real",
              },
              {
                icon: PiggyBank,
                text: "Metas de ahorro con seguimiento visual",
              },
              {
                icon: TrendingUp,
                text: "Reportes y análisis de tus patrones de gasto",
              },
              {
                icon: Shield,
                text: "Tus datos seguros y completamente privados",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-emerald-50">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-emerald-200 text-sm">
          © {new Date().getFullYear()} DineroyAhorro. Todos los derechos reservados.
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <img src="/logo.svg" alt="DineroyAhorro" className="h-8 w-auto" />
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import {
  BarChart3,
  CreditCard,
  PiggyBank,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Wallet,
  Calculator,
} from "lucide-react";
import { LandingWidgets } from "@/components/landing/landing-widgets";
import { StepsDemo } from "@/components/landing/steps-demo";

export default async function LandingPage() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }

  const features = [
    {
      icon: BarChart3,
      title: "Dashboard",
      description: "Ve tu salud financiera de un vistazo: ingresos, gastos y ahorro en tiempo real.",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      icon: CreditCard,
      title: "Transacciones",
      description: "Registra y categoriza cada ingreso y gasto en segundos.",
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: Wallet,
      title: "Presupuesto",
      description: "Pon límites por categoría y sabe exactamente en qué gastas.",
      color: "bg-violet-100 text-violet-700",
    },
    {
      icon: PiggyBank,
      title: "Metas de ahorro",
      description: "Crea objetivos, haz seguimiento y celebra cada avance.",
      color: "bg-amber-100 text-amber-700",
    },
    {
      icon: TrendingUp,
      title: "Deudas",
      description: "Controla lo que debes y simula cómo liquidarlo antes.",
      color: "bg-red-100 text-red-700",
    },
    {
      icon: Calculator,
      title: "Calculadoras",
      description: "Interés compuesto, hipoteca, FIRE, inflación y más.",
      color: "bg-teal-100 text-teal-700",
    },
  ];


  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-center h-14">
            <img src="/logo.png" alt="DineroyAhorro" className="h-8 w-auto" />
            <div className="hidden sm:flex items-center gap-2 absolute right-0">
              <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-50 text-sm">
                Entrar
              </Link>
              <Link href="/register" className="bg-emerald-600 text-white font-medium px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                Empezar gratis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-10 sm:py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-100 rounded-full opacity-40 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-100 rounded-full opacity-40 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">

            {/* Badge */}
            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-5">
              Controla tu dinero<br />
              <span className="text-emerald-600">para un mayor ahorro.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-xl text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed">
              Registra tus gastos, crea presupuestos y alcanza tus metas de ahorro. Todo en un solo lugar.
            </p>

            {/* Trust bullets */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center mb-9 text-sm text-gray-500">
              <span className="flex items-center justify-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                Configúralo en 2 minutos
              </span>
              <span className="flex items-center justify-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                Tus datos, siempre seguros
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-emerald-700 active:scale-95 transition-all shadow-lg shadow-emerald-200 text-base"
              >
                Crear mi cuenta gratis
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold px-8 py-4 rounded-2xl border border-gray-200 hover:border-emerald-300 hover:text-emerald-700 active:scale-95 transition-all text-base"
              >
                Ya tengo cuenta
              </Link>
            </div>

          </div>
        </div>
      </section>

      <StepsDemo />

      <LandingWidgets />

      {/* Features */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3">
              Todo lo que necesitas para mejorar tu situación financiera
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 p-4 sm:p-6 rounded-2xl bg-gray-50 sm:bg-white sm:border sm:border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all sm:flex-col sm:items-start"
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${feature.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-emerald-200 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">DineroyAhorro</p>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 leading-tight">
            Haz más con lo que ya tienes.
          </h2>
          <p className="text-sm sm:text-lg text-emerald-100 mb-2">
            Deja de improvisar. Controla, planifica y toma decisiones con sentido.
          </p>
          <p className="text-xs sm:text-sm text-emerald-200 mb-7">
            Es gratis y solo tarda 2 minutos.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 font-bold px-8 py-3.5 rounded-xl hover:bg-emerald-50 transition-all text-base shadow-lg"
          >
            Crear cuenta gratis
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-14">
            <img src="/logo.png" alt="DineroyAhorro" className="h-8 w-auto" />
          </div>
        </div>
      </footer>
    </div>
  );
}

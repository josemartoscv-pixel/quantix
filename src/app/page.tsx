import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import {
  BarChart3,
  CreditCard,
  PiggyBank,
  BookOpen,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Wallet,
} from "lucide-react";
import { LandingWidgets } from "@/components/landing/landing-widgets";

export default async function LandingPage() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }

  const features = [
    {
      icon: BarChart3,
      title: "Dashboard inteligente",
      description:
        "Visualiza tu situación financiera de un vistazo con gráficos y métricas clave.",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      icon: CreditCard,
      title: "Transacciones",
      description:
        "Registra y categoriza tus ingresos y gastos de forma rápida y sencilla.",
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: Wallet,
      title: "Presupuesto",
      description:
        "Establece límites por categoría y controla en qué gastas cada euro.",
      color: "bg-violet-100 text-violet-700",
    },
    {
      icon: PiggyBank,
      title: "Metas de ahorro",
      description:
        "Crea objetivos de ahorro visuales y haz seguimiento de tu progreso.",
      color: "bg-amber-100 text-amber-700",
    },
    {
      icon: TrendingUp,
      title: "Gestión de deudas",
      description:
        "Controla tus deudas y simula estrategias para liquidarlas antes.",
      color: "bg-red-100 text-red-700",
    },
    {
      icon: BookOpen,
      title: "Educación financiera",
      description:
        "Aprende con artículos prácticos adaptados a tu nivel de conocimiento.",
      color: "bg-teal-100 text-teal-700",
    },
  ];


  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-100 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <img src="/logo.png" alt="DineroyAhorro" className="h-8 w-auto rounded-lg" />
            <div className="hidden sm:flex items-center gap-2">
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
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-10 sm:py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-100 rounded-full opacity-40 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-100 rounded-full opacity-40 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-3xl sm:text-4xl shadow-lg shadow-emerald-200">
                💰
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <CheckCircle className="w-3 h-3" />
              100% gratuito · Sin tarjeta
            </div>
            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-4">
              No es una app.<br />
              <span className="text-emerald-600">Es el sistema que te faltaba.</span>
            </h1>
            <p className="text-sm sm:text-lg text-gray-500 mb-2 max-w-lg mx-auto leading-relaxed">
              Deja de improvisar: controla, planifica y toma decisiones con sentido.
            </p>
            <p className="text-sm sm:text-base font-semibold text-emerald-700 mb-7">
              Haz más con lo que ya tienes.
            </p>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold px-6 py-3.5 rounded-2xl hover:bg-emerald-700 active:scale-95 transition-all shadow-lg shadow-emerald-200 text-sm sm:text-base"
              >
                Empezar gratis
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold px-6 py-3.5 rounded-2xl border border-gray-200 hover:border-emerald-300 hover:text-emerald-700 active:scale-95 transition-all text-sm sm:text-base"
              >
                Ya tengo cuenta
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LandingWidgets />

      {/* Features */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3">
              Todo lo que necesitas para gestionar tu dinero
            </h2>
            <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Una plataforma completa con todas las herramientas para mejorar tu situación financiera.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-4 sm:p-6 rounded-2xl bg-gray-50 sm:bg-white sm:border sm:border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mb-3 shadow-sm ${feature.color}`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-500 leading-relaxed hidden sm:block">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-emerald-200 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">Quantix</p>
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
      <footer className="bg-gray-900 text-gray-400 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <img src="/logo.png" alt="DineroyAhorro" className="h-7 w-auto rounded-md" />
            <p className="text-xs">
              © {new Date().getFullYear()} Quantix · Gestiona tus finanzas con inteligencia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

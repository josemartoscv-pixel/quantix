import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import {
  BarChart3,
  CreditCard,
  PiggyBank,
  BookOpen,
  TrendingUp,
  Shield,
  ArrowRight,
  CheckCircle,
  Wallet,
} from "lucide-react";

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

  const benefits = [
    {
      icon: Shield,
      title: "Seguro y privado",
      description:
        "Tus datos financieros son completamente privados y seguros. Nunca los compartimos con terceros.",
    },
    {
      icon: BarChart3,
      title: "Todo en un lugar",
      description:
        "Ingresos, gastos, ahorros, deudas y patrimonio en una sola aplicación intuitiva.",
    },
    {
      icon: TrendingUp,
      title: "Decisiones informadas",
      description:
        "Con reportes claros y calculadoras financieras, toma mejores decisiones sobre tu dinero.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <span className="font-bold text-xl text-gray-900">FinanzasApp</span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="bg-emerald-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Empezar gratis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20 sm:py-32">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-100 rounded-full opacity-30 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-100 rounded-full opacity-30 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <CheckCircle className="w-4 h-4" />
              Tu gestor de finanzas personales gratuito
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Toma el control de{" "}
              <span className="text-emerald-600">tus finanzas</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Registra tus ingresos y gastos, gestiona tu presupuesto, alcanza
              tus metas de ahorro y mejora tu salud financiera con FinanzasApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 text-lg"
              >
                Empezar gratis
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold px-8 py-4 rounded-xl border-2 border-gray-200 hover:border-emerald-300 hover:text-emerald-700 transition-all text-lg"
              >
                Iniciar sesión
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Sin tarjeta de crédito. Sin suscripción. 100% gratuito.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas para gestionar tu dinero
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Una plataforma completa con todas las herramientas para mejorar
              tu situación financiera.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué FinanzasApp?
            </h2>
            <p className="text-lg text-gray-600">
              Diseñada pensando en personas que quieren mejorar su vida
              financiera sin complicaciones.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-emerald-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Empieza a tomar el control hoy
          </h2>
          <p className="text-xl text-emerald-100 mb-10">
            Únete y transforma tu relación con el dinero. Es gratis y solo
            tarda 2 minutos.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 font-bold px-10 py-4 rounded-xl hover:bg-emerald-50 transition-all text-lg shadow-lg"
          >
            Crear cuenta gratis
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">💰</span>
              <span className="font-bold text-white">FinanzasApp</span>
            </div>
            <p className="text-sm">
              © {new Date().getFullYear()} FinanzasApp. Gestiona tus finanzas con inteligencia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

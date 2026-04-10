import type { Metadata } from "next";
import Link from "next/link";
import { Cookie, Info, Settings, BarChart2, Shield, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Cookies",
  robots: { index: false },
};

const cookieTypes = [
  {
    icon: Shield,
    color: "bg-emerald-50 text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
    type: "Necesarias",
    desc: "Imprescindibles para el funcionamiento de la aplicación. No pueden desactivarse.",
    cookies: [
      {
        name: "next-auth.session-token",
        purpose: "Mantener tu sesión iniciada de forma segura",
        duration: "30 días",
      },
    ],
  },
  {
    icon: BarChart2,
    color: "bg-blue-50 text-blue-600",
    badge: "bg-blue-100 text-blue-700",
    type: "Analíticas",
    desc: "Nos ayudan a entender cómo se usa la web. Solo se activan si aceptas las cookies.",
    cookies: [
      {
        name: "_ga, _ga_*",
        purpose: "Google Analytics — análisis de uso anónimo",
        duration: "2 años",
      },
    ],
  },
  {
    icon: Settings,
    color: "bg-amber-50 text-amber-600",
    badge: "bg-amber-100 text-amber-700",
    type: "Preferencias",
    desc: "Recuerdan tus decisiones para no volver a preguntarte lo mismo.",
    cookies: [
      {
        name: "dyahorro_cookie_consent",
        purpose: "Guardar tu decisión sobre el uso de cookies",
        duration: "1 año",
      },
    ],
  },
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
          <Link href="/" className="inline-flex items-center text-emerald-600 text-sm hover:underline mb-6 block">
            ← Volver al inicio
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
              <Cookie className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Política de Cookies</h1>
              <p className="text-gray-500 text-sm mt-1">Última actualización: abril de 2025 · Aplicable a dineroyahorro.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 space-y-4">

        {/* Qué son */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
              <Info className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">¿Qué son las cookies?</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo.
            Sirven para recordar tus preferencias, mantenerte conectado y analizar cómo se usa el servicio.
            En dineroyahorro.com usamos únicamente las cookies necesarias para funcionar y, si nos lo permites, cookies de analítica para mejorar la experiencia.
          </p>
        </div>

        {/* Tipos de cookies */}
        {cookieTypes.map((ct) => {
          const Icon = ct.icon;
          return (
            <div key={ct.type} className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-1">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${ct.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-gray-900">Cookies {ct.type}</h2>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ct.badge}`}>{ct.type}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4 ml-12">{ct.desc}</p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 rounded-xl">
                      <th className="text-left px-4 py-2.5 font-semibold text-gray-600 text-xs rounded-l-xl">Cookie</th>
                      <th className="text-left px-4 py-2.5 font-semibold text-gray-600 text-xs">Finalidad</th>
                      <th className="text-left px-4 py-2.5 font-semibold text-gray-600 text-xs rounded-r-xl">Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ct.cookies.map((c) => (
                      <tr key={c.name} className="border-t border-gray-50">
                        <td className="px-4 py-3 font-mono text-xs text-gray-700">{c.name}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{c.purpose}</td>
                        <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{c.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {/* Cómo desactivar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <Settings className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">Cómo gestionar las cookies</h2>
          </div>
          <div className="text-sm text-gray-600 leading-relaxed space-y-3">
            <p>
              Puedes <strong>aceptar o rechazar las cookies analíticas</strong> en el aviso que aparece al entrar en la web por primera vez.
            </p>
            <p>
              Si ya has tomado una decisión y quieres cambiarla, borra las cookies de tu navegador para que vuelva a aparecer el aviso.
            </p>
            <p>
              También puedes desactivar Google Analytics de forma permanente instalando el complemento oficial:{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline"
              >
                tools.google.com/dlpage/gaoptout
              </a>
              .
            </p>
            <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-amber-700 text-xs mt-2">
              ⚠️ Las cookies necesarias no pueden desactivarse ya que son imprescindibles para que la aplicación funcione correctamente.
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-emerald-600 rounded-2xl p-5 sm:p-6 text-white text-center">
          <Mail className="w-8 h-8 mx-auto mb-3 text-emerald-200" />
          <h3 className="font-bold text-lg mb-1">¿Tienes dudas sobre las cookies?</h3>
          <p className="text-emerald-100 text-sm mb-4">Escríbenos y te respondemos lo antes posible.</p>
          <a
            href="mailto:hola@dineroyahorro.com"
            className="inline-block bg-white text-emerald-700 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-emerald-50 transition-colors"
          >
            hola@dineroyahorro.com
          </a>
        </div>

        <div className="text-center text-sm text-gray-400 pb-4">
          <Link href="/privacidad" className="text-emerald-600 hover:underline">Política de Privacidad</Link>
          {" · "}
          <Link href="/" className="hover:underline">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}

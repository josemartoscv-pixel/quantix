import type { Metadata } from "next";
import Link from "next/link";
import { Cookie, Info, Settings, BarChart2, Shield, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Cookies",
  robots: { index: false },
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
          <Link href="/" className="text-emerald-600 text-sm hover:underline mb-6 block">
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

        {/* Necesarias */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-900">Cookies necesarias</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Siempre activas</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Son imprescindibles para que la aplicación funcione correctamente. Se encargan de mantener tu sesión activa cuando inicias sesión, de forma que no tengas que identificarte en cada página. Sin estas cookies, dineroyahorro.com no puede funcionar. No pueden desactivarse.
          </p>
        </div>

        {/* Analíticas */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <BarChart2 className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-900">Cookies analíticas</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Solo con tu permiso</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Utilizamos Google Analytics para entender cómo se navega por la web: qué páginas se visitan más, desde dónde llegan los usuarios y cómo interactúan con la aplicación. Esta información es completamente anónima y nos ayuda a mejorar la experiencia. Solo se activan si aceptas las cookies al entrar en la web.
          </p>
        </div>

        {/* Preferencias */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Settings className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-900">Cookies de preferencias</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Funcionales</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Estas cookies recuerdan las decisiones que has tomado en la web, como si has aceptado o rechazado las cookies analíticas. Gracias a ellas no tenemos que preguntarte lo mismo cada vez que visitas dineroyahorro.com.
          </p>
        </div>

        {/* Cómo gestionar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <Settings className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">Cómo gestionar las cookies</h2>
          </div>
          <div className="text-sm text-gray-600 leading-relaxed space-y-3">
            <p>
              Puedes <strong>aceptar o rechazar las cookies analíticas</strong> en el aviso que aparece al entrar en la web por primera vez. Si ya tomaste una decisión y quieres cambiarla, borra las cookies de tu navegador para que vuelva a aparecer el aviso.
            </p>
            <p>
              También puedes desactivar Google Analytics de forma permanente instalando el complemento oficial:{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
                tools.google.com/dlpage/gaoptout
              </a>.
            </p>
            <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-amber-700 text-xs">
              ⚠️ Las cookies necesarias no pueden desactivarse ya que son imprescindibles para el funcionamiento de la aplicación.
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-emerald-600 rounded-2xl p-5 sm:p-6 text-white text-center">
          <Mail className="w-8 h-8 mx-auto mb-3 text-emerald-200" />
          <h3 className="font-bold text-lg mb-1">¿Tienes dudas sobre las cookies?</h3>
          <p className="text-emerald-100 text-sm mb-4">Escríbenos y te respondemos lo antes posible.</p>
          <a href="mailto:hola@dineroyahorro.com" className="inline-block bg-white text-emerald-700 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-emerald-50 transition-colors">
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

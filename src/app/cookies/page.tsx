import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Cookies",
  robots: { index: false },
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6">
        <Link href="/" className="text-emerald-600 text-sm hover:underline mb-8 block">
          ← Volver al inicio
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Política de Cookies</h1>
        <p className="text-gray-500 text-sm mb-10">Última actualización: abril de 2025</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">¿Qué son las cookies?</h2>
            <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo para recordar preferencias y analizar el uso del servicio.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Cookies que utilizamos</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Nombre</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Tipo</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Finalidad</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Duración</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">next-auth.session-token</td>
                    <td className="px-4 py-3">Necesaria</td>
                    <td className="px-4 py-3">Mantener la sesión iniciada</td>
                    <td className="px-4 py-3">30 días</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-4 py-3 font-mono text-xs">_ga, _ga_*</td>
                    <td className="px-4 py-3">Analítica</td>
                    <td className="px-4 py-3">Google Analytics — análisis de uso anónimo</td>
                    <td className="px-4 py-3">2 años</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">dyahorro_cookie_consent</td>
                    <td className="px-4 py-3">Preferencia</td>
                    <td className="px-4 py-3">Recordar tu decisión sobre cookies</td>
                    <td className="px-4 py-3">1 año</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Cómo desactivar las cookies analíticas</h2>
            <p>Puedes rechazar las cookies analíticas en el aviso que aparece al entrar en la web. También puedes desactivar Google Analytics instalando el complemento oficial: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">tools.google.com/dlpage/gaoptout</a>.</p>
            <p className="mt-2">Las cookies necesarias no pueden desactivarse ya que son imprescindibles para el funcionamiento de la aplicación.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Más información</h2>
            <p>Para cualquier consulta sobre el uso de cookies escríbenos a <strong>hola@dineroyahorro.com</strong> o consulta nuestra <Link href="/privacidad" className="text-emerald-600 hover:underline">Política de Privacidad</Link>.</p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-500">
          <Link href="/privacidad" className="text-emerald-600 hover:underline">Política de Privacidad</Link>
          {" · "}
          <Link href="/" className="hover:underline">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}

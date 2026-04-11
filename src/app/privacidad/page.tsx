import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Database, Eye, Clock, FileText, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  alternates: { canonical: "https://www.dineroyahorro.com/privacidad" },
};

const sections = [
  {
    icon: FileText,
    color: "bg-blue-50 text-blue-600",
    title: "1. Responsable del tratamiento",
    content: (
      <p>
        El responsable del tratamiento de los datos personales recogidos a través de{" "}
        <strong>dineroyahorro.com</strong> es <strong>Jose Antonio Martos</strong>, con dirección de
        contacto en{" "}
        <a href="mailto:hola@dineroyahorro.com" className="text-emerald-600 hover:underline">
          hola@dineroyahorro.com
        </a>
        .
      </p>
    ),
  },
  {
    icon: Database,
    color: "bg-violet-50 text-violet-600",
    title: "2. Datos que recogemos",
    content: (
      <ul className="space-y-2">
        <li className="flex gap-2"><span className="text-emerald-500 mt-0.5 shrink-0">•</span><span><strong>Datos de registro:</strong> nombre, correo electrónico y contraseña (almacenada cifrada con bcrypt, nunca en texto plano).</span></li>
        <li className="flex gap-2"><span className="text-emerald-500 mt-0.5 shrink-0">•</span><span><strong>Datos financieros:</strong> transacciones, presupuestos, metas de ahorro, deudas y patrimonio que el usuario introduce voluntariamente.</span></li>
        <li className="flex gap-2"><span className="text-emerald-500 mt-0.5 shrink-0">•</span><span><strong>Datos de uso:</strong> páginas visitadas y acciones realizadas, recogidos de forma anónima a través de Google Analytics únicamente si aceptas las cookies analíticas.</span></li>
      </ul>
    ),
  },
  {
    icon: Eye,
    color: "bg-amber-50 text-amber-600",
    title: "3. Finalidad y base legal",
    content: (
      <ul className="space-y-2">
        <li className="flex gap-2"><span className="text-emerald-500 mt-0.5 shrink-0">•</span><span><strong>Prestación del servicio:</strong> gestionar tu cuenta y ofrecerte las funcionalidades de la aplicación. Base legal: ejecución de un contrato (Art. 6.1.b RGPD).</span></li>
        <li className="flex gap-2"><span className="text-emerald-500 mt-0.5 shrink-0">•</span><span><strong>Mejora del servicio:</strong> analizar el uso mediante Google Analytics. Base legal: consentimiento mediante aceptación de cookies (Art. 6.1.a RGPD).</span></li>
      </ul>
    ),
  },
  {
    icon: Clock,
    color: "bg-teal-50 text-teal-600",
    title: "4. Conservación de los datos",
    content: (
      <p>
        Los datos se conservan mientras la cuenta esté activa. Si eliminas tu cuenta,{" "}
        <strong>todos tus datos personales y financieros se borran de forma permanente</strong> en un
        plazo máximo de 30 días. No se realizan copias de seguridad de datos de usuario tras la
        eliminación.
      </p>
    ),
  },
  {
    icon: Shield,
    color: "bg-emerald-50 text-emerald-600",
    title: "5. Tus derechos",
    content: (
      <>
        <p className="mb-3">Tienes derecho a:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {["Acceso", "Rectificación", "Supresión", "Portabilidad", "Oposición", "Limitación"].map((r) => (
            <div key={r} className="bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700 font-medium text-center">
              {r}
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm">
          Para ejercerlos, escríbenos a{" "}
          <a href="mailto:hola@dineroyahorro.com" className="text-emerald-600 hover:underline">
            hola@dineroyahorro.com
          </a>
          . También puedes reclamar ante la{" "}
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
            Agencia Española de Protección de Datos
          </a>
          .
        </p>
      </>
    ),
  },
];

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
          <Link href="/" className="inline-flex items-center text-emerald-600 text-sm hover:underline mb-6 block">
            ← Volver al inicio
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Política de Privacidad</h1>
              <p className="text-gray-500 text-sm mt-1">Última actualización: abril de 2025 · Aplicable a dineroyahorro.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 space-y-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title} className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${section.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">{section.title}</h2>
              </div>
              <div className="text-sm text-gray-600 leading-relaxed">{section.content}</div>
            </div>
          );
        })}

        {/* Contact CTA */}
        <div className="bg-emerald-600 rounded-2xl p-5 sm:p-6 text-white text-center">
          <Mail className="w-8 h-8 mx-auto mb-3 text-emerald-200" />
          <h3 className="font-bold text-lg mb-1">¿Tienes alguna pregunta?</h3>
          <p className="text-emerald-100 text-sm mb-4">Estamos a tu disposición para cualquier consulta sobre privacidad.</p>
          <a
            href="mailto:hola@dineroyahorro.com"
            className="inline-block bg-white text-emerald-700 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-emerald-50 transition-colors"
          >
            hola@dineroyahorro.com
          </a>
        </div>

        <div className="text-center text-sm text-gray-400 pb-4">
          <Link href="/cookies" className="text-emerald-600 hover:underline">Política de Cookies</Link>
          {" · "}
          <Link href="/" className="hover:underline">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}

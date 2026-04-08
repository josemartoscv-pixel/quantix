import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  robots: { index: false },
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6">
        <Link href="/" className="text-emerald-600 text-sm hover:underline mb-8 block">
          ← Volver al inicio
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Política de Privacidad</h1>
        <p className="text-gray-500 text-sm mb-10">Última actualización: abril de 2025</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Responsable del tratamiento</h2>
            <p>El responsable del tratamiento de los datos personales recogidos a través de <strong>dineroyahorro.com</strong> es Jose Antonio Martos, con dirección de contacto en <strong>hola@dineroyahorro.com</strong>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Datos que recogemos</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Datos de registro:</strong> nombre, dirección de correo electrónico y contraseña (almacenada de forma cifrada).</li>
              <li><strong>Datos financieros:</strong> transacciones, presupuestos, metas de ahorro, deudas y patrimonio que el usuario introduce voluntariamente.</li>
              <li><strong>Datos de uso:</strong> páginas visitadas y acciones realizadas, recogidos de forma anónima a través de Google Analytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Finalidad y base legal</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Prestación del servicio:</strong> gestionar tu cuenta y ofrecerte las funcionalidades de la aplicación. Base legal: ejecución de un contrato (Art. 6.1.b RGPD).</li>
              <li><strong>Mejora del servicio:</strong> analizar el uso mediante Google Analytics. Base legal: interés legítimo y consentimiento mediante aceptación de cookies (Art. 6.1.a y 6.1.f RGPD).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Conservación de los datos</h2>
            <p>Los datos se conservan mientras la cuenta esté activa. Si eliminas tu cuenta, todos tus datos personales y financieros se borran de forma permanente en un plazo máximo de 30 días.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Destinatarios</h2>
            <p>Los datos no se ceden a terceros salvo obligación legal. Utilizamos los siguientes proveedores de servicios:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Neon</strong> (base de datos) — alojada en la UE.</li>
              <li><strong>Vercel</strong> (infraestructura) — sujeta a cláusulas estándar contractuales.</li>
              <li><strong>Google Analytics</strong> — para análisis de uso anónimo.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Tus derechos</h2>
            <p>Tienes derecho a acceder, rectificar, suprimir, portabilidad, oposición y limitación del tratamiento de tus datos. Para ejercerlos, escríbenos a <strong>hola@dineroyahorro.com</strong>. También puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Seguridad</h2>
            <p>Aplicamos medidas técnicas y organizativas para proteger tus datos: cifrado de contraseñas, conexiones HTTPS y acceso restringido a la base de datos.</p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-500">
          <Link href="/cookies" className="text-emerald-600 hover:underline">Política de Cookies</Link>
          {" · "}
          <Link href="/" className="hover:underline">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}

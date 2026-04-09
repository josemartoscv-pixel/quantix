import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      <Image src="/logo.png" alt="DineroyAhorro" width={386} height={54} className="h-8 w-auto mb-10 opacity-80" />

      <p className="text-8xl font-bold text-emerald-500 mb-2">404</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Página no encontrada</h1>
      <p className="text-gray-500 text-sm max-w-xs mb-8">
        La página que buscas no existe o ha sido movida. No te preocupes, tu dinero sigue en su sitio.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors text-sm"
        >
          <Home className="w-4 h-4" />
          Ir al dashboard
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm"
        >
          Volver al inicio
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

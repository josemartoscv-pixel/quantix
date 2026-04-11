import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, TrendingUp, Star, ExternalLink, Gift } from "lucide-react";
import { getBanks, type Bank } from "@/lib/data/banks";

export const metadata: Metadata = {
  title: "Mejores Cuentas Remuneradas en España",
  description:
    "Compara las mejores cuentas remuneradas en España. TAE actualizada, condiciones y bonos de bienvenida para que tu dinero trabaje por ti.",
  alternates: { canonical: "https://www.dineroyahorro.com/cuentas-remuneradas" },
  openGraph: {
    title: "Mejores Cuentas Remuneradas en España",
    description:
      "Compara las mejores cuentas remuneradas en España. TAE actualizada, condiciones y bonos de bienvenida.",
    url: "https://www.dineroyahorro.com/cuentas-remuneradas",
  },
};

const MONTH = new Date().toLocaleString("es-ES", { month: "long", year: "numeric" });

export default async function CuentasRemuneradasPage() {
  const banks = await getBanks();
  const featured = banks.filter((b) => b.featured);
  const rest = banks.filter((b) => !b.featured);

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 text-xs font-medium mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            Actualizado {MONTH}
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-3 leading-tight">
            Tu dinero está muriendo<br />
            <span className="text-emerald-400">en el banco.</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-xl">
            Mejores cuentas remuneradas ahora mismo en España. Compara TAE, condiciones y bonos de bienvenida.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            Mejores opciones ahora mismo
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {featured.map((bank) => (
              <BankCard key={bank.name} bank={bank} big />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Más opciones</p>
          <div className="space-y-3">
            {rest.map((bank) => (
              <BankCard key={bank.name} bank={bank} big={false} />
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-700 leading-relaxed">
          ⚠️ <strong>Aviso legal:</strong> Las TAE y promociones indicadas son orientativas y pueden cambiar sin previo aviso. Algunos enlaces pueden ser de referido. Siempre consulta las condiciones actualizadas en la web oficial de cada entidad. Este contenido no constituye asesoramiento financiero.
        </div>

        <div className="bg-emerald-600 rounded-3xl p-6 sm:p-8 text-white text-center">
          <p className="text-lg font-bold mb-1">¿Quieres llevar el control de todo tu dinero?</p>
          <p className="text-emerald-100 text-sm mb-5">Registra tus cuentas, gastos y ahorros en DineroyAhorro. Gratis.</p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors text-sm"
          >
            Empezar gratis <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function BankCard({ bank, big }: { bank: Bank; big: boolean }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col ${big ? "p-5" : "p-4"}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden p-1.5">
          <Image src={bank.logo} alt={bank.name} width={40} height={40} className="object-contain w-full h-full" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 text-sm leading-tight truncate">{bank.name}</p>
          <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-0.5 ${bank.badgeColor}`}>
            {bank.badge}
          </span>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xl font-bold text-emerald-600">{bank.tae}</p>
          <p className="text-[10px] text-gray-400">TAE</p>
        </div>
      </div>

      {bank.taeNote && (
        <p className="text-[10px] text-gray-400 mb-2 -mt-1">{bank.taeNote}</p>
      )}

      {big && (
        <p className="text-xs text-gray-500 mb-3 leading-relaxed flex-1">{bank.description}</p>
      )}

      {bank.promoText && (
        <div className="flex items-start gap-2 bg-emerald-50 rounded-xl px-3 py-2 mb-3">
          <Gift className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-emerald-700">{bank.promoText}</p>
            {bank.promoSub && <p className="text-[10px] text-emerald-500">{bank.promoSub}</p>}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-1">
        <p className="text-[10px] text-gray-400 leading-tight max-w-[55%]">{bank.conditions}</p>
        <a
          href={bank.referral}
          target="_blank"
          rel="noopener noreferrer sponsored"
          aria-label={`Abrir cuenta en ${bank.name}`}
          className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shrink-0"
        >
          Abrir cuenta <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

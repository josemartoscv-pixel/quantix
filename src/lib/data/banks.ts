export interface Bank {
  name: string;
  logo: string;
  tae: string;
  taeNote: string;
  badge: string;
  badgeColor: string;
  description: string;
  conditions: string;
  promoText: string;
  promoSub: string;
  referral: string;
  featured: boolean;
}

// Última actualización: Abril 2026
// Para actualizar: dile a Claude qué ha cambiado y lo modifica directamente

export async function getBanks(): Promise<Bank[]> {
  return getBankData();
}

function getBankData(): Bank[] {
  return [
    {
      name: "Raisin Cuenta Bienvenida",
      logo: "/banks/raisin.png",
      tae: "3,33%",
      taeNote: "Sin condiciones",
      badge: "⭐ Mejor rentabilidad",
      badgeColor: "bg-amber-100 text-amber-700",
      description: "Cuenta de bienvenida con la mayor rentabilidad del mercado sin comisiones ni condiciones.",
      conditions: "Sin comisiones · Disponibilidad inmediata · FGD europeo",
      promoText: "",
      promoSub: "",
      referral: "#",
      featured: true,
    },
    {
      name: "ING Naranja",
      logo: "/banks/ing.png",
      tae: "3%",
      taeNote: "3 meses nuevos clientes",
      badge: "🔥 Muy popular",
      badgeColor: "bg-orange-100 text-orange-700",
      description: "Cuenta de ahorro al 3% TAE los primeros 3 meses. Con nómina domiciliada tienen grandes bonificaciones.",
      conditions: "Nuevos clientes · 3 meses · Luego TAE estándar",
      promoText: "Hasta 150 € si domicilias la nómina",
      promoSub: "Más 0 € de comisiones para siempre",
      referral: "#",
      featured: true,
    },
    {
      name: "Trade Republic",
      logo: "/banks/trade-republic.png",
      tae: "2,02%",
      taeNote: "Sin condiciones",
      badge: "📈 Broker incluido",
      badgeColor: "bg-emerald-100 text-emerald-700",
      description: "Cuenta remunerada al 2,02% TAE + broker para comprar acciones y ETFs sin comisión.",
      conditions: "Sin comisiones · Acciones y ETFs · FGD alemán",
      promoText: "1 acción gratis al registrarte",
      promoSub: "Valor aleatorio hasta 200 €",
      referral: "#",
      featured: true,
    },
    {
      name: "Openbank Ahorro",
      logo: "/banks/openbank.png",
      tae: "2,02%",
      taeNote: "Sin condiciones",
      badge: "🏦 Grupo Santander",
      badgeColor: "bg-red-100 text-red-700",
      description: "Cuenta de ahorro digital al 2,02% TAE con la seguridad del Grupo Santander.",
      conditions: "Sin comisiones · Sin nómina · FGD español",
      promoText: "Hasta 300 € + 0,50% extra con nómina",
      promoSub: "Bono bienvenida para nuevos clientes",
      referral: "#",
      featured: false,
    },
    {
      name: "Revolut",
      logo: "/banks/revolut.png",
      tae: "hasta 2,27%",
      taeNote: "Según plan",
      badge: "✈️ Ideal para viajeros",
      badgeColor: "bg-blue-100 text-blue-700",
      description: "Hasta 2,27% TAE + tarjeta sin comisiones en el extranjero.",
      conditions: "Interés variable según plan · Sin comisiones cambio divisa",
      promoText: "3 meses de plan Premium gratis",
      promoSub: "Con el link de referido",
      referral: "#",
      featured: false,
    },
    {
      name: "Bankinter Digital",
      logo: "/banks/bankinter.png",
      tae: "2,00%",
      taeNote: "Sin condiciones",
      badge: "🇪🇸 Banco español",
      badgeColor: "bg-orange-100 text-orange-700",
      description: "Cuenta de ahorro digital al 2% TAE con la solidez de Bankinter, cotizado en bolsa.",
      conditions: "Sin comisiones · FGD español",
      promoText: "Hasta 300 € si domicilias la nómina",
      promoSub: "Cuenta nómina Bankinter con bonificación",
      referral: "#",
      featured: false,
    },
    {
      name: "bunq free",
      logo: "/banks/bunq.png",
      tae: "2,01%",
      taeNote: "Plan gratuito",
      badge: "🌱 Sostenible",
      badgeColor: "bg-green-100 text-green-700",
      description: "2,01% TAE en el plan gratuito del banco más sostenible de Europa.",
      conditions: "Plan gratuito · Sin comisiones · Banco holandés",
      promoText: "1 mes de bunq Premium gratis",
      promoSub: "Con link de referido",
      referral: "#",
      featured: false,
    },
    {
      name: "B100 Health",
      logo: "/banks/b100.png",
      tae: "hasta 3,20%",
      taeNote: "Con seguro salud",
      badge: "💊 Seguro incluido",
      badgeColor: "bg-purple-100 text-purple-700",
      description: "Hasta 3,20% TAE con seguro de salud incluido.",
      conditions: "Incluye seguro de salud · Condiciones según plan",
      promoText: "Seguro de salud incluido desde 0 €",
      promoSub: "Sin copagos en consultas médicas",
      referral: "#",
      featured: false,
    },
    {
      name: "N26",
      logo: "/banks/n26.png",
      tae: "1,30%",
      taeNote: "Sin condiciones",
      badge: "📱 100% móvil",
      badgeColor: "bg-gray-100 text-gray-700",
      description: "Banco alemán 100% digital con tarjeta Mastercard gratuita y 1,30% TAE.",
      conditions: "Sin comisiones · Mastercard gratuita · FGD alemán",
      promoText: "Cuenta gratuita sin comisiones",
      promoSub: "Retiros en cajeros sin coste",
      referral: "#",
      featured: false,
    },
    {
      name: "MyInvestor",
      logo: "/banks/myinvestor.png",
      tae: "0,75%",
      taeNote: "Sin condiciones",
      badge: "💼 Neobroker español",
      badgeColor: "bg-indigo-100 text-indigo-700",
      description: "Cuenta remunerada al 0,75% TAE del neobroker español líder en fondos indexados.",
      conditions: "Sin comisiones · Fondos indexados desde 1 €",
      promoText: "Fondos indexados desde 1 €",
      promoSub: "Sin comisión de custodia ni gestión",
      referral: "#",
      featured: false,
    },
  ];
}

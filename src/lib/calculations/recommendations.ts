import { formatCurrency } from "@/lib/utils/currency";

export interface Recommendation {
  id: string;
  type: "warning" | "info" | "tip" | "success";
  icon: string;
  title: string;
  description: string;
  href?: string;
}

export function generateRecommendations({
  monthlyIncome,
  monthlyExpenses,
  totalSavings,
  totalDebtPayments,
  budgetCount,
  topExpenseCategory,
  hasInvestments,
}: {
  monthlyIncome: number;
  monthlyExpenses: number;
  totalSavings: number;
  totalDebtPayments: number;
  budgetCount: number;
  topExpenseCategory?: { name: string; amount: number } | null;
  hasInvestments: boolean;
}): Recommendation[] {
  const recs: Recommendation[] = [];
  const savingsRate = monthlyIncome > 0 ? (monthlyIncome - monthlyExpenses) / monthlyIncome : 0;
  const debtRatio = monthlyIncome > 0 ? totalDebtPayments / monthlyIncome : 0;
  const emergencyMonths = monthlyExpenses > 0 ? totalSavings / monthlyExpenses : 0;

  if (emergencyMonths < 3 && monthlyExpenses > 0) {
    recs.push({
      id: "emergency-fund",
      type: "warning",
      icon: "🛡️",
      title: "Crea un fondo de emergencia",
      description: `Cubres ${emergencyMonths.toFixed(1)} meses de gastos. Lo ideal es tener entre 3 y 6 meses guardados.`,
      href: "/ahorros",
    });
  }

  if (debtRatio > 0.3 && monthlyIncome > 0) {
    recs.push({
      id: "debt-ratio",
      type: "warning",
      icon: "📉",
      title: "Tu ratio de deuda es alto",
      description: `Destinas el ${(debtRatio * 100).toFixed(0)}% de tus ingresos a pagar deudas. Objetivo: reducirlo al 30% o menos.`,
      href: "/deudas",
    });
  }

  if (monthlyIncome > 0 && savingsRate < 0.1 && savingsRate >= 0) {
    recs.push({
      id: "savings-rate",
      type: "warning",
      icon: "💰",
      title: "Tu tasa de ahorro es baja",
      description: `Solo ahorras el ${(savingsRate * 100).toFixed(0)}% de tus ingresos. Intenta llegar al menos al 10-20%.`,
      href: "/transacciones",
    });
  }

  if (topExpenseCategory && monthlyIncome > 0 && topExpenseCategory.amount > monthlyIncome * 0.3) {
    recs.push({
      id: "top-expense",
      type: "tip",
      icon: "📊",
      title: `Reduce gasto en ${topExpenseCategory.name}`,
      description: `Es tu mayor gasto mensual con ${formatCurrency(topExpenseCategory.amount)}. Reducirlo un 10% mejoraría notablemente tu salud financiera.`,
      href: "/transacciones",
    });
  }

  if (budgetCount === 0 && monthlyIncome > 0) {
    recs.push({
      id: "no-budget",
      type: "info",
      icon: "📋",
      title: "Configura un presupuesto",
      description: "Definir límites por categoría te ayuda a detectar dónde se escapa el dinero.",
      href: "/reportes",
    });
  }

  if (!hasInvestments && monthlyIncome > 0 && savingsRate > 0.1) {
    recs.push({
      id: "no-investments",
      type: "tip",
      icon: "📈",
      title: "Considera invertir",
      description: "Tu tasa de ahorro es buena. Invertir parte del dinero puede hacer crecer tu patrimonio a largo plazo.",
      href: "/patrimonio",
    });
  }

  if (savingsRate >= 0.2 && monthlyIncome > 0) {
    recs.push({
      id: "good-savings",
      type: "success",
      icon: "🎉",
      title: "¡Excelente tasa de ahorro!",
      description: `Estás ahorrando el ${(savingsRate * 100).toFixed(0)}% de tus ingresos. Estás por encima de la media. ¡Sigue así!`,
      href: "/reportes",
    });
  }

  if (emergencyMonths >= 6 && monthlyExpenses > 0) {
    recs.push({
      id: "emergency-ok",
      type: "success",
      icon: "✅",
      title: "Fondo de emergencia sólido",
      description: `Cubres ${emergencyMonths.toFixed(1)} meses de gastos. Tu seguridad financiera es excelente.`,
      href: "/ahorros",
    });
  }

  return recs.slice(0, 4);
}

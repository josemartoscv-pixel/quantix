export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export function computeAchievements({
  transactionCount,
  savingsRate,
  hasNoDebts,
  budgetCount,
  completedGoals,
  hasInvestments,
  monthsWithTransactions,
  netWorth,
}: {
  transactionCount: number;
  savingsRate: number;
  hasNoDebts: boolean;
  budgetCount: number;
  completedGoals: number;
  hasInvestments: boolean;
  monthsWithTransactions: number;
  netWorth: number;
}): Achievement[] {
  return [
    {
      id: "first-transaction",
      icon: "🚀",
      title: "Primer movimiento",
      description: "Registra tu primera transacción",
      unlocked: transactionCount >= 1,
    },
    {
      id: "saver",
      icon: "💎",
      title: "Gran ahorrador",
      description: "Tasa de ahorro superior al 20%",
      unlocked: savingsRate >= 0.2,
    },
    {
      id: "debt-free",
      icon: "🏆",
      title: "Libre de deudas",
      description: "Sin deudas activas",
      unlocked: hasNoDebts,
    },
    {
      id: "budgeter",
      icon: "📊",
      title: "Presupuestista",
      description: "3 o más categorías de presupuesto",
      unlocked: budgetCount >= 3,
    },
    {
      id: "goal-achieved",
      icon: "🎯",
      title: "Meta cumplida",
      description: "Completa una meta de ahorro",
      unlocked: completedGoals >= 1,
    },
    {
      id: "investor",
      icon: "📈",
      title: "Inversor",
      description: "Registra un activo de inversión",
      unlocked: hasInvestments,
    },
    {
      id: "consistent",
      icon: "🔥",
      title: "Constante",
      description: "Transacciones en 3+ meses",
      unlocked: monthsWithTransactions >= 3,
    },
    {
      id: "positive-net-worth",
      icon: "🌟",
      title: "Patrimonio positivo",
      description: "Patrimonio neto mayor que cero",
      unlocked: netWorth > 0,
    },
  ];
}

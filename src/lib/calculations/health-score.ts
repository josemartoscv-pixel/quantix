interface HealthScoreInput {
  monthlyIncome: number;
  monthlyExpenses: number;
  totalSavings: number;
  budgetCategories: number;
  categoriesOnBudget: number;
  totalDebtPayments: number;
  hasInvestments: boolean;
}

interface ScoreComponent {
  name: string;
  score: number;
  maxScore: number;
  description: string;
}

interface HealthScoreResult {
  total: number;
  components: ScoreComponent[];
  label: string;
  color: string;
}

export function calculateHealthScore(input: HealthScoreInput): HealthScoreResult {
  const {
    monthlyIncome,
    monthlyExpenses,
    totalSavings,
    budgetCategories,
    categoriesOnBudget,
    totalDebtPayments,
    hasInvestments,
  } = input;

  const components: ScoreComponent[] = [];

  // 1. Tasa de ahorro (25 pts)
  let savingsScore = 0;
  const savingsRate =
    monthlyIncome > 0 ? (monthlyIncome - monthlyExpenses) / monthlyIncome : 0;
  if (savingsRate >= 0.2) {
    savingsScore = 25;
  } else if (savingsRate > 0) {
    savingsScore = Math.round((savingsRate / 0.2) * 25);
  }
  components.push({
    name: "Tasa de ahorro",
    score: savingsScore,
    maxScore: 25,
    description: `Ahorras el ${Math.round(savingsRate * 100)}% de tus ingresos. Objetivo: ≥20%`,
  });

  // 2. Adherencia al presupuesto (20 pts)
  let budgetScore = 0;
  if (budgetCategories > 0) {
    const adherenceRate = categoriesOnBudget / budgetCategories;
    if (adherenceRate >= 0.9) {
      budgetScore = 20;
    } else {
      budgetScore = Math.round(adherenceRate * 20);
    }
  }
  components.push({
    name: "Adherencia al presupuesto",
    score: budgetScore,
    maxScore: 20,
    description:
      budgetCategories > 0
        ? `${categoriesOnBudget} de ${budgetCategories} categorías dentro del presupuesto`
        : "No tienes presupuestos configurados",
  });

  // 3. Fondo de emergencia (25 pts)
  let emergencyScore = 0;
  const emergencyMonths =
    monthlyExpenses > 0 ? totalSavings / monthlyExpenses : 0;
  if (emergencyMonths >= 6) {
    emergencyScore = 25;
  } else if (emergencyMonths >= 3) {
    emergencyScore = 15;
  } else if (emergencyMonths >= 1) {
    emergencyScore = 8;
  } else if (totalSavings > 0) {
    emergencyScore = 4;
  }
  components.push({
    name: "Fondo de emergencia",
    score: emergencyScore,
    maxScore: 25,
    description: `Tienes ${emergencyMonths.toFixed(1)} meses de gastos cubiertos. Objetivo: ≥6 meses`,
  });

  // 4. Ratio de deuda (20 pts)
  let debtScore = 0;
  const debtRatio = monthlyIncome > 0 ? totalDebtPayments / monthlyIncome : 1;
  if (debtRatio < 0.15) {
    debtScore = 20;
  } else if (debtRatio < 0.25) {
    debtScore = 15;
  } else if (debtRatio < 0.35) {
    debtScore = 10;
  } else if (debtRatio < 0.5) {
    debtScore = 5;
  } else {
    debtScore = 0;
  }
  components.push({
    name: "Ratio de deuda",
    score: debtScore,
    maxScore: 20,
    description: `Las deudas representan el ${Math.round(debtRatio * 100)}% de tus ingresos. Objetivo: <15%`,
  });

  // 5. Diversificación (10 pts)
  let diversificationScore = 0;
  if (hasInvestments) {
    diversificationScore = 10;
  } else if (totalSavings > 0) {
    diversificationScore = 5;
  }
  components.push({
    name: "Diversificación",
    score: diversificationScore,
    maxScore: 10,
    description: hasInvestments
      ? "Tienes inversiones activas"
      : totalSavings > 0
      ? "Tienes ahorros pero no inversiones"
      : "Sin ahorros ni inversiones",
  });

  const total = components.reduce((sum, c) => sum + c.score, 0);

  let label: string;
  let color: string;
  if (total >= 80) {
    label = "Excelente";
    color = "text-emerald-600";
  } else if (total >= 60) {
    label = "Bueno";
    color = "text-blue-600";
  } else if (total >= 40) {
    label = "Regular";
    color = "text-amber-600";
  } else {
    label = "Necesita mejora";
    color = "text-red-600";
  }

  return { total, components, label, color };
}

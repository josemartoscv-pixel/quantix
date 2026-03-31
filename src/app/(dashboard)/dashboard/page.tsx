import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { HealthScoreCard } from "@/components/dashboard/health-score-card";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { MonthlyBarChart } from "@/components/charts/monthly-bar-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateHealthScore } from "@/lib/calculations/health-score";
import { getMonthRange, getMonthName } from "@/lib/utils/dates";
import { formatCurrency } from "@/lib/utils/currency";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const { start: monthStart, end: monthEnd } = getMonthRange(currentMonth, currentYear);

  const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
  const { start: prevStart, end: prevEnd } = getMonthRange(prevMonth, prevYear);

  const [
    currentTransactions,
    prevTransactions,
    recentTransactions,
    savingsGoals,
    debts,
    assets,
  ] = await Promise.all([
    db.transaction.findMany({
      where: { userId, date: { gte: monthStart, lte: monthEnd } },
    }),
    db.transaction.findMany({
      where: { userId, date: { gte: prevStart, lte: prevEnd } },
    }),
    db.transaction.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: 5,
    }),
    db.savingsGoal.findMany({ where: { userId }, take: 3 }),
    db.debt.findMany({ where: { userId, isActive: true } }),
    db.asset.findMany({ where: { userId } }),
  ]);

  const totalIncome = currentTransactions
    .filter((t) => t.type === "INCOME")
    .reduce((s, t) => s + t.amount, 0);
  const totalExpenses = currentTransactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((s, t) => s + t.amount, 0);
  const prevIncome = prevTransactions
    .filter((t) => t.type === "INCOME")
    .reduce((s, t) => s + t.amount, 0);
  const prevExpenses = prevTransactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((s, t) => s + t.amount, 0);

  // Monthly chart data (last 6 months)
  const monthlyData = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(currentYear, currentMonth - 1 - i, 1);
    const m = d.getMonth() + 1;
    const y = d.getFullYear();
    const { start, end } = getMonthRange(m, y);
    const txs = await db.transaction.findMany({
      where: { userId, date: { gte: start, lte: end } },
    });
    monthlyData.push({
      month: getMonthName(m).slice(0, 3),
      ingresos: txs.filter((t) => t.type === "INCOME").reduce((s, t) => s + t.amount, 0),
      gastos: txs.filter((t) => t.type === "EXPENSE").reduce((s, t) => s + t.amount, 0),
    });
  }

  // Health score
  const budgets = await db.budget.findMany({
    where: { userId, month: currentMonth, year: currentYear },
  });
  const totalDebtPayments = debts.reduce((s, d) => s + (d.minimumPayment || 0), 0);
  const totalSavingsAmount = savingsGoals.reduce((s, g) => s + g.currentAmount, 0);
  const totalAssetsValue = assets.reduce((s, a) => s + a.value, 0);
  const hasInvestments = totalAssetsValue > 0;

  const expenseSums: Record<string, number> = {};
  for (const tx of currentTransactions.filter((t) => t.type === "EXPENSE")) {
    expenseSums[tx.categoryId] = (expenseSums[tx.categoryId] || 0) + tx.amount;
  }
  const categoriesOnBudget = budgets.filter(
    (b) => (expenseSums[b.categoryId] || 0) <= b.amount
  ).length;

  const healthScore = calculateHealthScore({
    monthlyIncome: totalIncome,
    monthlyExpenses: totalExpenses,
    totalSavings: totalSavingsAmount,
    budgetCategories: budgets.length,
    categoriesOnBudget,
    totalDebtPayments,
    hasInvestments,
  });

  const totalBalance = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      <HealthScoreCard
        total={healthScore.total}
        label={healthScore.label}
        color={healthScore.color}
        components={healthScore.components}
      />

      <SummaryCards
        data={{
          totalIncome,
          totalExpenses,
          savings: totalIncome - totalExpenses,
          balance: totalBalance,
          prevIncome,
          prevExpenses,
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle>Evolución mensual (últimos 6 meses)</CardTitle>
        </CardHeader>
        <CardContent>
          <MonthlyBarChart data={monthlyData} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions transactions={recentTransactions} />

        {/* Savings goals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Metas de ahorro</CardTitle>
            <Link
              href="/ahorros"
              className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              Ver todas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {savingsGoals.length === 0 ? (
              <div className="py-8 text-center text-gray-500 text-sm">
                No tienes metas de ahorro creadas
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {savingsGoals.map((goal) => {
                  const pct = Math.min(
                    (goal.currentAmount / goal.targetAmount) * 100,
                    100
                  );
                  return (
                    <li key={goal.id} className="px-6 py-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{goal.icon || "🎯"}</span>
                          <p className="text-sm font-medium text-gray-900">
                            {goal.name}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {pct.toFixed(0)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{formatCurrency(goal.currentAmount)}</span>
                        <span>{formatCurrency(goal.targetAmount)}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

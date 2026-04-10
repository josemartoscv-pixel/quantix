export const dynamic = "force-dynamic";

import { unstable_cache } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { HealthScoreCard } from "@/components/dashboard/health-score-card";
import { WelcomeHeader } from "@/components/dashboard/welcome-header";
import { TopExpensesCard } from "@/components/dashboard/top-expenses-card";
import { AchievementsCard } from "@/components/dashboard/achievements-card";
import { OnboardingModal } from "@/components/dashboard/onboarding-modal";
import { MonthlyBarChart } from "@/components/charts/monthly-bar-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateHealthScore } from "@/lib/calculations/health-score";
import { generateRecommendations } from "@/lib/calculations/recommendations";
import { computeAchievements } from "@/lib/calculations/achievements";
import { getCategoryById } from "@/lib/constants/categories";
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

  // Only fetch the 12-month window for the chart — avoids loading all transactions ever
  const twelveMonthsAgo = new Date(currentYear, currentMonth - 1 - 11, 1);

  const [
    currentTransactions,
    prevTransactions,
    savingsGoals,
    debts,
    assets,
    liabilities,
    recentTransactions,
    completedGoals,
    budgets,
    transactionCount,
    totalIncomeAgg,
    totalExpenseAgg,
  ] = await Promise.all([
    db.transaction.findMany({ where: { userId, date: { gte: monthStart, lte: monthEnd } } }),
    db.transaction.findMany({ where: { userId, date: { gte: prevStart, lte: prevEnd } } }),
    unstable_cache(() => db.savingsGoal.findMany({ where: { userId }, take: 3 }), ["goals", userId], { revalidate: 60 })(),
    unstable_cache(() => db.debt.findMany({ where: { userId, isActive: true } }), ["debts", userId], { revalidate: 60 })(),
    unstable_cache(() => db.asset.findMany({ where: { userId } }), ["assets", userId], { revalidate: 60 })(),
    unstable_cache(() => db.liability.findMany({ where: { userId } }), ["liabilities", userId], { revalidate: 60 })(),
    db.transaction.findMany({
      where: { userId, date: { gte: twelveMonthsAgo } },
      select: { amount: true, type: true, date: true },
    }),
    db.savingsGoal.count({ where: { userId, isCompleted: true } }),
    db.budget.findMany({ where: { userId, month: currentMonth, year: currentYear } }),
    db.transaction.count({ where: { userId } }),
    db.transaction.aggregate({ where: { userId, type: "INCOME" }, _sum: { amount: true } }),
    db.transaction.aggregate({ where: { userId, type: "EXPENSE" }, _sum: { amount: true } }),
  ]);

  const totalIncome = currentTransactions.filter((t) => t.type === "INCOME").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = currentTransactions.filter((t) => t.type === "EXPENSE").reduce((s, t) => s + t.amount, 0);
  const prevIncome = prevTransactions.filter((t) => t.type === "INCOME").reduce((s, t) => s + t.amount, 0);
  const prevExpenses = prevTransactions.filter((t) => t.type === "EXPENSE").reduce((s, t) => s + t.amount, 0);

  // Monthly chart data — only last 12 months (already bounded by the query)
  const monthlyData = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(currentYear, currentMonth - 1 - i, 1);
    const m = d.getMonth() + 1;
    const y = d.getFullYear();
    const txs = recentTransactions.filter((t) => {
      const td = new Date(t.date);
      return td.getFullYear() === y && td.getMonth() + 1 === m;
    });
    monthlyData.push({
      month: getMonthName(m).slice(0, 3),
      ingresos: txs.filter((t) => t.type === "INCOME").reduce((s, t) => s + t.amount, 0),
      gastos: txs.filter((t) => t.type === "EXPENSE").reduce((s, t) => s + t.amount, 0),
    });
  }
  const totalDebtPayments = debts.reduce((s, d) => s + (d.minimumPayment || 0), 0);
  const totalSavingsAmount = savingsGoals.reduce((s, g) => s + g.currentAmount, 0);
  const totalAssetsValue = assets.reduce((s, a) => s + a.value, 0);
  const totalLiabilitiesValue = liabilities.reduce((s, l) => s + l.value, 0);
  const hasInvestments = assets.some((a) => a.type === "investment" || a.type === "stocks" || a.type === "crypto");
  const netWorth = totalAssetsValue - totalLiabilitiesValue;

  const expenseSums: Record<string, number> = {};
  for (const tx of currentTransactions.filter((t) => t.type === "EXPENSE")) {
    expenseSums[tx.categoryId] = (expenseSums[tx.categoryId] || 0) + tx.amount;
  }
  const categoriesOnBudget = budgets.filter((b) => (expenseSums[b.categoryId] || 0) <= b.amount).length;

  const healthScore = calculateHealthScore({
    monthlyIncome: totalIncome,
    monthlyExpenses: totalExpenses,
    totalSavings: totalSavingsAmount,
    budgetCategories: budgets.length,
    categoriesOnBudget,
    totalDebtPayments,
    hasInvestments,
  });

  // Top 3 expense categories with trend vs previous month
  const prevExpenseSums: Record<string, number> = {};
  for (const tx of prevTransactions.filter((t) => t.type === "EXPENSE")) {
    prevExpenseSums[tx.categoryId] = (prevExpenseSums[tx.categoryId] || 0) + tx.amount;
  }

  const topExpenses = Object.entries(expenseSums)
    .map(([categoryId, amount]) => {
      const cat = getCategoryById(categoryId);
      const prev = prevExpenseSums[categoryId] || 0;
      const change = prev > 0 ? ((amount - prev) / prev) * 100 : null;
      return { categoryId, name: cat?.name || categoryId, emoji: cat?.emoji || "📦", amount, color: cat?.color || "#6b7280", change };
    })
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3)
    .map((e) => ({ ...e, percentage: totalExpenses > 0 ? (e.amount / totalExpenses) * 100 : 0 }));

  // Find biggest increase for alert message
  const biggestIncrease = topExpenses
    .filter((e) => e.change !== null && e.change > 10)
    .sort((a, b) => (b.change ?? 0) - (a.change ?? 0))[0] ?? null;

  // Recommendations
  const topExpenseCategory = topExpenses[0] ?? null;
  const recommendations = generateRecommendations({
    monthlyIncome: totalIncome,
    monthlyExpenses: totalExpenses,
    totalSavings: totalSavingsAmount,
    totalDebtPayments,
    budgetCount: budgets.length,
    topExpenseCategory,
    hasInvestments,
  });

  // Achievements — use count query and recent window for months
  const uniqueMonths = new Set(recentTransactions.map((t) => {
    const d = new Date(t.date);
    return `${d.getFullYear()}-${d.getMonth()}`;
  }));
  const savingsRate = totalIncome > 0 ? (totalIncome - totalExpenses) / totalIncome : 0;

  const achievements = computeAchievements({
    transactionCount,
    savingsRate,
    hasNoDebts: debts.length === 0,
    budgetCount: budgets.length,
    completedGoals,
    hasInvestments,
    monthsWithTransactions: uniqueMonths.size,
    netWorth,
  });

  // totalBalance computed via aggregates — no row fetching needed
  const totalBalance =
    (totalIncomeAgg._sum.amount ?? 0) - (totalExpenseAgg._sum.amount ?? 0);

  const hasData = transactionCount > 0;

  return (
    <div className="space-y-6">
      <OnboardingModal hasData={hasData} userName={session.user?.name || ""} />

      <WelcomeHeader
        name={session.user?.name || ""}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        monthlySavings={totalIncome - totalExpenses}
        totalBalance={totalBalance}
      />

      <HealthScoreCard
        total={healthScore.total}
        label={healthScore.label}
        color={healthScore.color}
        components={healthScore.components}
        topActions={healthScore.topActions}
        recommendations={recommendations}
      />


      <Card>
        <CardHeader>
          <CardTitle>Evolución mensual (últimos 12 meses)</CardTitle>
        </CardHeader>
        <CardContent>
          <MonthlyBarChart data={monthlyData} />
        </CardContent>
      </Card>

      <TopExpensesCard expenses={topExpenses} biggestIncrease={biggestIncrease} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Metas de ahorro</CardTitle>
            <Link href="/ahorros" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              Ver todas <ArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {savingsGoals.length === 0 ? (
              <div className="py-8 text-center text-gray-500 text-sm">No tienes metas de ahorro creadas</div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {savingsGoals.map((goal) => {
                  const pct = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
                  return (
                    <li key={goal.id} className="px-6 py-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{goal.icon || "🎯"}</span>
                          <p className="text-sm font-medium text-gray-900">{goal.name}</p>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{pct.toFixed(0)}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
                        <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
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
        <AchievementsCard achievements={achievements} />
      </div>
    </div>
  );
}

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { calculateHealthScore } from "@/lib/calculations/health-score";
import { getMonthRange } from "@/lib/utils/dates";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const { start, end } = getMonthRange(currentMonth, currentYear);

  const [transactions, budgets, savingsGoals, debts, assets] = await Promise.all([
    db.transaction.findMany({
      where: { userId: session.user.id, date: { gte: start, lte: end } },
    }),
    db.budget.findMany({
      where: { userId: session.user.id, month: currentMonth, year: currentYear },
    }),
    db.savingsGoal.findMany({ where: { userId: session.user.id } }),
    db.debt.findMany({ where: { userId: session.user.id, isActive: true } }),
    db.asset.findMany({ where: { userId: session.user.id } }),
  ]);

  const monthlyIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((s, t) => s + t.amount, 0);
  const monthlyExpenses = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((s, t) => s + t.amount, 0);

  const expenseSums: Record<string, number> = {};
  for (const tx of transactions.filter((t) => t.type === "EXPENSE")) {
    expenseSums[tx.categoryId] = (expenseSums[tx.categoryId] || 0) + tx.amount;
  }
  const categoriesOnBudget = budgets.filter(
    (b) => (expenseSums[b.categoryId] || 0) <= b.amount
  ).length;

  const totalSavings = savingsGoals.reduce((s, g) => s + g.currentAmount, 0);
  const totalDebtPayments = debts.reduce((s, d) => s + (d.minimumPayment || 0), 0);
  const hasInvestments = assets.length > 0;

  const result = calculateHealthScore({
    monthlyIncome,
    monthlyExpenses,
    totalSavings,
    budgetCategories: budgets.length,
    categoriesOnBudget,
    totalDebtPayments,
    hasInvestments,
  });

  return NextResponse.json(result);
}

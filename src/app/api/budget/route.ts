import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { budgetSchema } from "@/lib/validations/budget";
import { getMonthRange } from "@/lib/utils/dates";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const month = parseInt(searchParams.get("month") || "0");
  const year = parseInt(searchParams.get("year") || "0");

  if (!month || !year) {
    return NextResponse.json({ error: "Mes y año requeridos" }, { status: 400 });
  }

  const budgetEntries = await db.budget.findMany({
    where: { userId: session.user.id, month, year },
    orderBy: { categoryId: "asc" },
  });

  // Calculate actual spending per category for the month
  const { start, end } = getMonthRange(month, year);
  const transactions = await db.transaction.findMany({
    where: {
      userId: session.user.id,
      type: "EXPENSE",
      date: { gte: start, lte: end },
    },
  });

  const spentByCategory: Record<string, number> = {};
  for (const tx of transactions) {
    spentByCategory[tx.categoryId] = (spentByCategory[tx.categoryId] || 0) + tx.amount;
  }

  const budgets = budgetEntries.map((b) => ({
    ...b,
    spent: spentByCategory[b.categoryId] || 0,
  }));

  return NextResponse.json({ budgets });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = budgetSchema.parse(body);

    const budget = await db.budget.upsert({
      where: {
        userId_categoryId_month_year: {
          userId: session.user.id,
          categoryId: data.categoryId,
          month: data.month,
          year: data.year,
        },
      },
      create: {
        userId: session.user.id,
        categoryId: data.categoryId,
        amount: data.amount,
        month: data.month,
        year: data.year,
      },
      update: {
        amount: data.amount,
      },
    });

    return NextResponse.json({ budget }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos no válidos", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

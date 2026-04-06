import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const userId = session.user.id;

  // Only create demo data if user has no transactions
  const existing = await db.transaction.findFirst({ where: { userId } });
  if (existing) return NextResponse.json({ error: "Ya tienes datos" }, { status: 400 });

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const d = (daysAgo: number) => {
    const date = new Date(currentYear, currentMonth, now.getDate() - daysAgo);
    return date;
  };

  await db.transaction.createMany({
    data: [
      { userId, amount: 2200, type: "INCOME", categoryId: "salario", description: "Nómina enero", date: d(25), isRecurring: true },
      { userId, amount: 350, type: "EXPENSE", categoryId: "vivienda", description: "Alquiler piso", date: d(1), isRecurring: true },
      { userId, amount: 120, type: "EXPENSE", categoryId: "alimentacion", description: "Mercadona", date: d(3), isRecurring: false },
      { userId, amount: 85, type: "EXPENSE", categoryId: "alimentacion", description: "Lidl", date: d(10), isRecurring: false },
      { userId, amount: 60, type: "EXPENSE", categoryId: "transporte", description: "Gasolina", date: d(5), isRecurring: false },
      { userId, amount: 45, type: "EXPENSE", categoryId: "restaurantes", description: "Restaurante", date: d(7), isRecurring: false },
      { userId, amount: 30, type: "EXPENSE", categoryId: "entretenimiento", description: "Netflix + Spotify", date: d(2), isRecurring: true },
      { userId, amount: 15, type: "EXPENSE", categoryId: "transporte", description: "Metro", date: d(4), isRecurring: false },
      { userId, amount: 200, type: "EXPENSE", categoryId: "ropa", description: "Zara", date: d(12), isRecurring: false },
      { userId, amount: 500, type: "INCOME", categoryId: "freelance", description: "Proyecto web", date: d(15), isRecurring: false },
    ],
  });

  await db.savingsGoal.create({
    data: {
      userId,
      name: "Fondo de emergencia",
      targetAmount: 6000,
      currentAmount: 1200,
      icon: "🛡️",
      color: "#10b981",
    },
  });

  await db.savingsGoal.create({
    data: {
      userId,
      name: "Vacaciones verano",
      targetAmount: 1500,
      currentAmount: 300,
      icon: "✈️",
      color: "#3b82f6",
    },
  });

  return NextResponse.json({ ok: true });
}

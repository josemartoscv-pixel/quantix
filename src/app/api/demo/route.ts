import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST() {
  // Clean up demo users older than 24h
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
  await db.user.deleteMany({
    where: { email: { endsWith: "@demo.local" }, createdAt: { lt: cutoff } },
  });

  // Create demo user with random credentials
  const id = Math.random().toString(36).slice(2, 10);
  const email = `demo_${id}@demo.local`;
  const password = Math.random().toString(36).slice(2, 18);
  const hashed = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: { email, name: "Usuario Demo", password: hashed },
  });

  const now = new Date();
  const m = now.getMonth();
  const y = now.getFullYear();
  const d = (daysAgo: number) => new Date(y, m, now.getDate() - daysAgo);

  await db.transaction.createMany({
    data: [
      { userId: user.id, amount: 2200, type: "INCOME",   categoryId: "salario",         description: "Nómina",            date: d(25), isRecurring: true  },
      { userId: user.id, amount: 850,  type: "EXPENSE",  categoryId: "vivienda",         description: "Alquiler",          date: d(1),  isRecurring: true  },
      { userId: user.id, amount: 130,  type: "EXPENSE",  categoryId: "alimentacion",     description: "Mercadona",         date: d(3),  isRecurring: false },
      { userId: user.id, amount: 75,   type: "EXPENSE",  categoryId: "alimentacion",     description: "Lidl",              date: d(9),  isRecurring: false },
      { userId: user.id, amount: 65,   type: "EXPENSE",  categoryId: "transporte",       description: "Gasolina",          date: d(5),  isRecurring: false },
      { userId: user.id, amount: 48,   type: "EXPENSE",  categoryId: "restaurantes",     description: "Cena restaurante",  date: d(7),  isRecurring: false },
      { userId: user.id, amount: 32,   type: "EXPENSE",  categoryId: "entretenimiento",  description: "Netflix + Spotify", date: d(2),  isRecurring: true  },
      { userId: user.id, amount: 18,   type: "EXPENSE",  categoryId: "transporte",       description: "Metro mensual",     date: d(4),  isRecurring: true  },
      { userId: user.id, amount: 120,  type: "EXPENSE",  categoryId: "ropa",             description: "Zara",              date: d(12), isRecurring: false },
      { userId: user.id, amount: 45,   type: "EXPENSE",  categoryId: "salud",            description: "Farmacia",          date: d(6),  isRecurring: false },
      { userId: user.id, amount: 500,  type: "INCOME",   categoryId: "freelance",        description: "Proyecto web",      date: d(15), isRecurring: false },
      { userId: user.id, amount: 90,   type: "EXPENSE",  categoryId: "ocio",             description: "Concierto",         date: d(8),  isRecurring: false },
    ],
  });

  await db.savingsGoal.createMany({
    data: [
      { userId: user.id, name: "Fondo de emergencia", targetAmount: 6000, currentAmount: 1800, icon: "🛡️", color: "#10b981" },
      { userId: user.id, name: "Vacaciones de verano", targetAmount: 1500, currentAmount: 420, icon: "✈️", color: "#3b82f6" },
      { userId: user.id, name: "MacBook nuevo",        targetAmount: 2000, currentAmount: 650, icon: "💻", color: "#8b5cf6" },
    ],
  });

  await db.budget.createMany({
    data: [
      { userId: user.id, categoryId: "alimentacion",   amount: 250, month: now.getMonth() + 1, year: y },
      { userId: user.id, categoryId: "transporte",     amount: 100, month: now.getMonth() + 1, year: y },
      { userId: user.id, categoryId: "entretenimiento",amount: 60,  month: now.getMonth() + 1, year: y },
      { userId: user.id, categoryId: "restaurantes",   amount: 80,  month: now.getMonth() + 1, year: y },
      { userId: user.id, categoryId: "ropa",           amount: 80,  month: now.getMonth() + 1, year: y },
    ],
  });

  return NextResponse.json({ email, password });
}

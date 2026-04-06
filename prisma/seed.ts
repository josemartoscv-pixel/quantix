import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create demo user
  const hashedPassword = await bcrypt.hash("demo1234", 12);

  const user = await prisma.user.upsert({
    where: { email: "demo@finanzasapp.com" },
    update: {},
    create: {
      name: "Usuario Demo",
      email: "demo@finanzasapp.com",
      password: hashedPassword,
      currency: "EUR",
      monthlyIncome: 2500,
    },
  });

  console.log("User created:", user.email);

  // Create transactions for last 3 months
  const now = new Date();
  const transactions = [];

  for (let monthOffset = 2; monthOffset >= 0; monthOffset--) {
    const month = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1);

    // Income
    transactions.push({
      userId: user.id,
      amount: 2500,
      type: "INCOME",
      categoryId: "salario",
      description: "Nómina mensual",
      date: new Date(month.getFullYear(), month.getMonth(), 28),
    });
    transactions.push({
      userId: user.id,
      amount: 350,
      type: "INCOME",
      categoryId: "freelance",
      description: "Proyecto web freelance",
      date: new Date(month.getFullYear(), month.getMonth(), 15),
    });

    // Expenses
    transactions.push({
      userId: user.id,
      amount: 750,
      type: "EXPENSE",
      categoryId: "vivienda",
      description: "Alquiler piso",
      date: new Date(month.getFullYear(), month.getMonth(), 1),
    });
    transactions.push({
      userId: user.id,
      amount: 280,
      type: "EXPENSE",
      categoryId: "alimentacion",
      description: "Supermercado mensual",
      date: new Date(month.getFullYear(), month.getMonth(), 5),
    });
    transactions.push({
      userId: user.id,
      amount: 85,
      type: "EXPENSE",
      categoryId: "transporte",
      description: "Bono transporte público",
      date: new Date(month.getFullYear(), month.getMonth(), 3),
    });
    transactions.push({
      userId: user.id,
      amount: 120,
      type: "EXPENSE",
      categoryId: "restaurantes",
      description: "Comidas y cenas fuera",
      date: new Date(month.getFullYear(), month.getMonth(), 12),
    });
    transactions.push({
      userId: user.id,
      amount: 45,
      type: "EXPENSE",
      categoryId: "entretenimiento",
      description: "Suscripciones streaming",
      date: new Date(month.getFullYear(), month.getMonth(), 8),
    });
    transactions.push({
      userId: user.id,
      amount: 60,
      type: "EXPENSE",
      categoryId: "salud",
      description: "Farmacia y médico",
      date: new Date(month.getFullYear(), month.getMonth(), 18),
    });

    if (monthOffset === 0) {
      transactions.push({
        userId: user.id,
        amount: 150,
        type: "EXPENSE",
        categoryId: "ropa",
        description: "Ropa temporada",
        date: new Date(month.getFullYear(), month.getMonth(), 20),
      });
      transactions.push({
        userId: user.id,
        amount: 200,
        type: "EXPENSE",
        categoryId: "tecnologia",
        description: "Auriculares nuevos",
        date: new Date(month.getFullYear(), month.getMonth(), 14),
      });
    }
  }

  await prisma.transaction.createMany({ data: transactions });
  console.log(`${transactions.length} transactions created`);

  // Create budgets for current month
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const budgets = [
    { userId: user.id, categoryId: "vivienda", amount: 800, month: currentMonth, year: currentYear },
    { userId: user.id, categoryId: "alimentacion", amount: 350, month: currentMonth, year: currentYear },
    { userId: user.id, categoryId: "transporte", amount: 100, month: currentMonth, year: currentYear },
    { userId: user.id, categoryId: "restaurantes", amount: 150, month: currentMonth, year: currentYear },
    { userId: user.id, categoryId: "entretenimiento", amount: 80, month: currentMonth, year: currentYear },
    { userId: user.id, categoryId: "salud", amount: 100, month: currentMonth, year: currentYear },
  ];

  await prisma.budget.createMany({ data: budgets });
  console.log("Budgets created");

  // Savings goals
  const vacationsGoal = await prisma.savingsGoal.create({
    data: {
      userId: user.id,
      name: "Vacaciones en Japón",
      description: "Viaje de 2 semanas a Japón en verano",
      targetAmount: 3000,
      currentAmount: 1200,
      targetDate: new Date(now.getFullYear() + 1, 5, 1),
      icon: "✈️",
      color: "#3b82f6",
    },
  });

  await prisma.savingsDeposit.createMany({
    data: [
      { goalId: vacationsGoal.id, amount: 500, notes: "Primer depósito", date: new Date(now.getFullYear(), now.getMonth() - 2, 10) },
      { goalId: vacationsGoal.id, amount: 400, date: new Date(now.getFullYear(), now.getMonth() - 1, 10) },
      { goalId: vacationsGoal.id, amount: 300, date: new Date(now.getFullYear(), now.getMonth(), 10) },
    ],
  });

  const emergencyGoal = await prisma.savingsGoal.create({
    data: {
      userId: user.id,
      name: "Fondo de emergencia",
      description: "6 meses de gastos cubiertos",
      targetAmount: 9000,
      currentAmount: 3500,
      icon: "🛡️",
      color: "#10b981",
    },
  });

  await prisma.savingsDeposit.create({
    data: {
      goalId: emergencyGoal.id,
      amount: 3500,
      notes: "Acumulado hasta ahora",
      date: new Date(now.getFullYear(), now.getMonth() - 1, 1),
    },
  });

  console.log("Savings goals created");

  // Debt
  const debt = await prisma.debt.create({
    data: {
      userId: user.id,
      name: "Préstamo coche",
      type: "prestamo-coche",
      initialAmount: 8000,
      currentBalance: 5500,
      interestRate: 5.5,
      minimumPayment: 150,
      startDate: new Date(now.getFullYear() - 1, 3, 1),
      lender: "Banco Santander",
      notes: "Préstamo a 5 años para Volkswagen Golf",
    },
  });

  await prisma.debtPayment.createMany({
    data: [
      { debtId: debt.id, amount: 150, date: new Date(now.getFullYear(), now.getMonth() - 2, 5), notes: "Pago mensual" },
      { debtId: debt.id, amount: 150, date: new Date(now.getFullYear(), now.getMonth() - 1, 5), notes: "Pago mensual" },
      { debtId: debt.id, amount: 500, date: new Date(now.getFullYear(), now.getMonth(), 5), notes: "Pago extra" },
    ],
  });

  console.log("Debt created");

  // Assets & Liabilities
  await prisma.asset.createMany({
    data: [
      {
        userId: user.id,
        name: "Fondo indexado MSCI World",
        type: "inversiones",
        value: 8500,
        description: "Invertido en Indexa Capital",
      },
      {
        userId: user.id,
        name: "Cuenta de ahorro",
        type: "efectivo",
        value: 3500,
        description: "Fondo de emergencia",
      },
    ],
  });

  await prisma.liability.create({
    data: {
      userId: user.id,
      name: "Préstamo coche Santander",
      type: "prestamo-coche",
      value: 5500,
      description: "Saldo pendiente del préstamo",
    },
  });

  // Net worth snapshots
  const baseNetWorth = 8500 + 3500 - 5500;
  await prisma.netWorthSnapshot.createMany({
    data: [
      {
        userId: user.id,
        totalAssets: 11000,
        totalLiabilities: 6000,
        netWorth: 5000,
        date: new Date(now.getFullYear(), now.getMonth() - 2, 1),
      },
      {
        userId: user.id,
        totalAssets: 11500,
        totalLiabilities: 5800,
        netWorth: 5700,
        date: new Date(now.getFullYear(), now.getMonth() - 1, 1),
      },
      {
        userId: user.id,
        totalAssets: 12000,
        totalLiabilities: 5500,
        netWorth: baseNetWorth,
        date: now,
      },
    ],
  });

  console.log("Assets, liabilities, and snapshots created");
  console.log("\nSeed completed successfully!");
  console.log("Demo user: demo@finanzasapp.com / demo1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

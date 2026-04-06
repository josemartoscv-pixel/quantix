import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { debtSchema } from "@/lib/validations/debt";
import { z } from "zod";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const debts = await db.debt.findMany({
    where: { userId: session.user.id, isActive: true },
    orderBy: { interestRate: "desc" },
  });

  return NextResponse.json({ debts });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = debtSchema.parse(body);

    const debt = await db.debt.create({
      data: {
        userId: session.user.id,
        name: data.name,
        type: data.type,
        initialAmount: data.initialAmount,
        currentBalance: data.currentBalance,
        interestRate: data.interestRate,
        minimumPayment: data.minimumPayment,
        startDate: new Date(data.startDate),
        remainingYears: data.remainingYears,
        remainingMonths: data.remainingMonths,
        lender: data.lender,
        notes: data.notes,
      },
    });

    return NextResponse.json({ debt }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos no válidos", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

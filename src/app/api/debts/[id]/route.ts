import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { debtSchema } from "@/lib/validations/debt";
import { z } from "zod";

async function getDebtOrFail(id: string, userId: string) {
  const debt = await db.debt.findUnique({
    where: { id },
    include: { payments: { orderBy: { date: "desc" } } },
  });
  if (!debt || debt.userId !== userId) return null;
  return debt;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const debt = await getDebtOrFail(params.id, session.user.id);
  if (!debt) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  return NextResponse.json({ debt });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const existing = await db.debt.findUnique({ where: { id: params.id } });
  if (!existing || existing.userId !== session.user.id) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  try {
    const body = await req.json();
    const data = debtSchema.parse(body);

    const debt = await db.debt.update({
      where: { id: params.id },
      data: {
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

    return NextResponse.json({ debt });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos no válidos", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const existing = await db.debt.findUnique({ where: { id: params.id } });
  if (!existing || existing.userId !== session.user.id) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  await db.debt.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Eliminado" });
}

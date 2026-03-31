import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { paymentSchema } from "@/lib/validations/debt";
import { z } from "zod";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const debt = await db.debt.findUnique({ where: { id: params.id } });
  if (!debt || debt.userId !== session.user.id) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  try {
    const body = await req.json();
    const data = paymentSchema.parse(body);

    const payment = await db.debtPayment.create({
      data: {
        debtId: params.id,
        amount: data.amount,
        notes: data.notes,
        date: data.date ? new Date(data.date) : new Date(),
      },
    });

    const newBalance = Math.max(0, debt.currentBalance - data.amount);
    await db.debt.update({
      where: { id: params.id },
      data: {
        currentBalance: newBalance,
        isActive: newBalance > 0,
      },
    });

    return NextResponse.json({ payment }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos no válidos", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

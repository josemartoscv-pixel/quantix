import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { transactionSchema } from "@/lib/validations/transaction";
import { z } from "zod";

async function getTransactionOrFail(id: string, userId: string) {
  const transaction = await db.transaction.findUnique({ where: { id } });
  if (!transaction || transaction.userId !== userId) {
    return null;
  }
  return transaction;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const transaction = await getTransactionOrFail(params.id, session.user.id);
  if (!transaction) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  return NextResponse.json({ transaction });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const existing = await getTransactionOrFail(params.id, session.user.id);
  if (!existing) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  try {
    const body = await req.json();
    const data = transactionSchema.parse(body);

    const transaction = await db.transaction.update({
      where: { id: params.id },
      data: {
        amount: data.amount,
        type: data.type,
        categoryId: data.categoryId,
        description: data.description,
        date: new Date(data.date),
        notes: data.notes,
        isRecurring: data.isRecurring || false,
        recurrence: data.recurrence,
      },
    });

    return NextResponse.json({ transaction });
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

  const existing = await getTransactionOrFail(params.id, session.user.id);
  if (!existing) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  await db.transaction.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Eliminado correctamente" });
}

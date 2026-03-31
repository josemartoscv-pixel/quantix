import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { depositSchema } from "@/lib/validations/savings";
import { z } from "zod";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const goal = await db.savingsGoal.findUnique({ where: { id: params.id } });
  if (!goal || goal.userId !== session.user.id) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  const deposits = await db.savingsDeposit.findMany({
    where: { goalId: params.id },
    orderBy: { date: "desc" },
  });

  return NextResponse.json({ deposits });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const goal = await db.savingsGoal.findUnique({ where: { id: params.id } });
  if (!goal || goal.userId !== session.user.id) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  try {
    const body = await req.json();
    const data = depositSchema.parse(body);

    const deposit = await db.savingsDeposit.create({
      data: {
        goalId: params.id,
        amount: data.amount,
        notes: data.notes,
        date: data.date ? new Date(data.date) : new Date(),
      },
    });

    const newAmount = goal.currentAmount + data.amount;
    const isCompleted = newAmount >= goal.targetAmount;

    await db.savingsGoal.update({
      where: { id: params.id },
      data: {
        currentAmount: newAmount,
        isCompleted,
        completedAt: isCompleted && !goal.isCompleted ? new Date() : undefined,
      },
    });

    return NextResponse.json({ deposit }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos no válidos", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

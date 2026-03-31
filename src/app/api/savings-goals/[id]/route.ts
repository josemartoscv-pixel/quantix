import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { savingsGoalSchema } from "@/lib/validations/savings";
import { z } from "zod";

async function getGoalOrFail(id: string, userId: string) {
  const goal = await db.savingsGoal.findUnique({ where: { id } });
  if (!goal || goal.userId !== userId) return null;
  return goal;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const goal = await getGoalOrFail(params.id, session.user.id);
  if (!goal) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  return NextResponse.json({ goal });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const existing = await getGoalOrFail(params.id, session.user.id);
  if (!existing) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  try {
    const body = await req.json();
    const data = savingsGoalSchema.parse(body);

    const goal = await db.savingsGoal.update({
      where: { id: params.id },
      data: {
        name: data.name,
        targetAmount: data.targetAmount,
        description: data.description,
        targetDate: data.targetDate ? new Date(data.targetDate) : null,
        icon: data.icon,
        color: data.color,
      },
    });

    return NextResponse.json({ goal });
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

  const existing = await getGoalOrFail(params.id, session.user.id);
  if (!existing) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  await db.savingsGoal.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Eliminado" });
}

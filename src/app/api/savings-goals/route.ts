import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { savingsGoalSchema } from "@/lib/validations/savings";
import { z } from "zod";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const goals = await db.savingsGoal.findMany({
    where: { userId: session.user.id },
    orderBy: [{ isCompleted: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ goals });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = savingsGoalSchema.parse(body);

    const goal = await db.savingsGoal.create({
      data: {
        userId: session.user.id,
        name: data.name,
        targetAmount: data.targetAmount,
        description: data.description,
        targetDate: data.targetDate ? new Date(data.targetDate) : null,
        icon: data.icon,
        color: data.color,
      },
    });

    return NextResponse.json({ goal }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos no válidos", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

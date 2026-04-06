import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1).max(50),
  emoji: z.string().min(1).max(4).default("📦"),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/).default("#6b7280"),
  type: z.enum(["INCOME", "EXPENSE"]),
});

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const categories = await db.customCategory.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ categories });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const body = await req.json();
    const data = categorySchema.parse(body);
    const category = await db.customCategory.create({ data: { ...data, userId } });
    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Datos no válidos" }, { status: 400 });
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

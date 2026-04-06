import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const importRowSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(["INCOME", "EXPENSE"]),
  categoryId: z.string().min(1),
  description: z.string().min(1),
  date: z.string(),
  notes: z.string().optional(),
  isRecurring: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const rows = z.array(importRowSchema).parse(body.transactions);

    await db.transaction.createMany({
      data: rows.map((row) => ({
        userId,
        amount: row.amount,
        type: row.type,
        categoryId: row.categoryId,
        description: row.description,
        date: new Date(row.date),
        notes: row.notes || null,
        isRecurring: row.isRecurring || false,
      })),
    });

    return NextResponse.json({ imported: rows.length }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Formato no válido", details: error.issues }, { status: 400 });
    }
    console.error("Import error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

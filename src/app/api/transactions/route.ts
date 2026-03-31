import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { transactionSchema } from "@/lib/validations/transaction";
import { getMonthRange } from "@/lib/utils/dates";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const month = parseInt(searchParams.get("month") || "0");
  const year = parseInt(searchParams.get("year") || "0");
  const type = searchParams.get("type");
  const categoryId = searchParams.get("categoryId");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = { userId: session.user.id };

  if (month && year) {
    const { start, end } = getMonthRange(month, year);
    where.date = { gte: start, lte: end };
  }

  if (type && type !== "ALL") {
    where.type = type;
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (search) {
    where.description = { contains: search };
  }

  const transactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 200,
  });

  return NextResponse.json({ transactions });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = transactionSchema.parse(body);

    const transaction = await db.transaction.create({
      data: {
        userId: session.user.id,
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

    return NextResponse.json({ transaction }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos no válidos", details: error.issues }, { status: 400 });
    }
    console.error("Transaction POST error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getMonthRange } from "@/lib/utils/dates";

// GET: returns recurring transactions from last month not yet applied to current month
export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;

  const { start: prevStart, end: prevEnd } = getMonthRange(prevMonth, prevYear);
  const { start: currStart, end: currEnd } = getMonthRange(currentMonth, currentYear);

  const [recurringPrev, currentTxs] = await Promise.all([
    db.transaction.findMany({
      where: { userId, isRecurring: true, date: { gte: prevStart, lte: prevEnd } },
    }),
    db.transaction.findMany({
      where: { userId, date: { gte: currStart, lte: currEnd } },
      select: { description: true, categoryId: true, type: true },
    }),
  ]);

  // Find recurring from last month that don't have a matching transaction this month
  const currentSignatures = new Set(
    currentTxs.map((t) => `${t.description}|${t.categoryId}|${t.type}`)
  );

  const pending = recurringPrev.filter(
    (t) => !currentSignatures.has(`${t.description}|${t.categoryId}|${t.type}`)
  );

  return NextResponse.json({ pending });
}

// POST: apply all pending recurring transactions to current month
export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const ids: string[] = body.ids || [];

  if (ids.length === 0) {
    return NextResponse.json({ error: "No hay transacciones" }, { status: 400 });
  }

  const now = new Date();
  const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const originals = await db.transaction.findMany({
    where: { id: { in: ids }, userId, isRecurring: true },
  });

  await db.transaction.createMany({
    data: originals.map((t) => ({
      userId,
      amount: t.amount,
      type: t.type,
      categoryId: t.categoryId,
      description: t.description,
      date: todayDate,
      notes: t.notes,
      isRecurring: true,
      recurrence: t.recurrence,
    })),
  });

  return NextResponse.json({ applied: originals.length });
}

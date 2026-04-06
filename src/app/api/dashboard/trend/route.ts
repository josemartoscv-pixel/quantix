import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getMonthRange } from "@/lib/utils/dates";

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

  const { start: currStart, end: currEnd } = getMonthRange(currentMonth, currentYear);
  const { start: prevStart, end: prevEnd } = getMonthRange(prevMonth, prevYear);

  const [curr, prev] = await Promise.all([
    db.transaction.findMany({ where: { userId, date: { gte: currStart, lte: currEnd } }, select: { amount: true, type: true } }),
    db.transaction.findMany({ where: { userId, date: { gte: prevStart, lte: prevEnd } }, select: { amount: true, type: true } }),
  ]);

  const savings = (txs: { amount: number; type: string }[]) =>
    txs.filter((t) => t.type === "INCOME").reduce((s, t) => s + t.amount, 0) -
    txs.filter((t) => t.type === "EXPENSE").reduce((s, t) => s + t.amount, 0);

  const currSavings = savings(curr);
  const prevSavings = savings(prev);

  const trend =
    currSavings > prevSavings ? "better" : currSavings < prevSavings ? "worse" : "same";

  return NextResponse.json({ trend });
}

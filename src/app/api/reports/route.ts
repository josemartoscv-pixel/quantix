import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getMonthRange, getMonthName } from "@/lib/utils/dates";
import { getCategoryById } from "@/lib/constants/categories";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "monthly";
  const months = parseInt(searchParams.get("months") || "6");
  const month = parseInt(searchParams.get("month") || String(new Date().getMonth() + 1));
  const year = parseInt(searchParams.get("year") || String(new Date().getFullYear()));

  if (type === "expenses" || type === "income") {
    const { start, end } = getMonthRange(month, year);
    const txType = type === "expenses" ? "EXPENSE" : "INCOME";

    const transactions = await db.transaction.findMany({
      where: {
        userId: session.user.id,
        type: txType,
        date: { gte: start, lte: end },
      },
    });

    const grouped: Record<string, number> = {};
    for (const tx of transactions) {
      grouped[tx.categoryId] = (grouped[tx.categoryId] || 0) + tx.amount;
    }

    const data = Object.entries(grouped).map(([categoryId, value]) => {
      const cat = getCategoryById(categoryId);
      return {
        categoryId,
        name: cat?.name || categoryId,
        value,
        color: cat?.color || "#6b7280",
      };
    }).sort((a, b) => b.value - a.value);

    return NextResponse.json({ data });
  }

  if (type === "monthly") {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const monthly = [];
    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(currentYear, currentMonth - 1 - i, 1);
      const m = d.getMonth() + 1;
      const y = d.getFullYear();
      const { start, end } = getMonthRange(m, y);
      const txs = await db.transaction.findMany({
        where: { userId: session.user.id, date: { gte: start, lte: end } },
      });
      const ingresos = txs.filter((t) => t.type === "INCOME").reduce((s, t) => s + t.amount, 0);
      const gastos = txs.filter((t) => t.type === "EXPENSE").reduce((s, t) => s + t.amount, 0);
      monthly.push({
        month: getMonthName(m).slice(0, 3),
        ingresos,
        gastos,
        tasa: ingresos > 0 ? ((ingresos - gastos) / ingresos) * 100 : 0,
      });
    }

    return NextResponse.json({ data: monthly });
  }

  return NextResponse.json({ error: "Tipo no válido" }, { status: 400 });
}

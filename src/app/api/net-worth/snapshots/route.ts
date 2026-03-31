import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const snapshots = await db.netWorthSnapshot.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "asc" },
    take: 24,
  });

  return NextResponse.json({ snapshots });
}

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const [assets, liabilities] = await Promise.all([
    db.asset.findMany({ where: { userId: session.user.id } }),
    db.liability.findMany({ where: { userId: session.user.id } }),
  ]);

  const totalAssets = assets.reduce((s, a) => s + a.value, 0);
  const totalLiabilities = liabilities.reduce((s, l) => s + l.value, 0);

  const snapshot = await db.netWorthSnapshot.create({
    data: {
      userId: session.user.id,
      totalAssets,
      totalLiabilities,
      netWorth: totalAssets - totalLiabilities,
    },
  });

  return NextResponse.json({ snapshot }, { status: 201 });
}

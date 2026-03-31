import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const [assets, liabilities] = await Promise.all([
    db.asset.findMany({ where: { userId: session.user.id }, orderBy: { value: "desc" } }),
    db.liability.findMany({ where: { userId: session.user.id }, orderBy: { value: "desc" } }),
  ]);

  const totalAssets = assets.reduce((s, a) => s + a.value, 0);
  const totalLiabilities = liabilities.reduce((s, l) => s + l.value, 0);

  return NextResponse.json({
    assets,
    liabilities,
    totalAssets,
    totalLiabilities,
    netWorth: totalAssets - totalLiabilities,
  });
}

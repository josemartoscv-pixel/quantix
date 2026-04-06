import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const cat = await db.customCategory.findFirst({ where: { id: params.id, userId } });
  if (!cat) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  await db.customCategory.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}

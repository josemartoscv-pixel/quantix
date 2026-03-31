import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const bankAccountSchema = z.object({
  name: z.string().min(1).max(50),
  type: z.enum(["checking", "savings", "credit", "cash", "investment"]),
  color: z.string().optional(),
  icon: z.string().optional(),
  isDefault: z.boolean().optional(),
});

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const account = await db.bankAccount.findFirst({
    where: { id: params.id, userId: session.user.id },
  });
  if (!account) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  try {
    const body = await req.json();
    const data = bankAccountSchema.parse(body);

    if (data.isDefault) {
      await db.bankAccount.updateMany({
        where: { userId: session.user.id, id: { not: params.id } },
        data: { isDefault: false },
      });
    }

    const updated = await db.bankAccount.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json({ account: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos no válidos", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const account = await db.bankAccount.findFirst({
    where: { id: params.id, userId: session.user.id },
  });
  if (!account) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  await db.bankAccount.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}

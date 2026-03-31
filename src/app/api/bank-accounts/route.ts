import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const bankAccountSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio").max(50),
  type: z.enum(["checking", "savings", "credit", "cash", "investment"]),
  color: z.string().default("#10b981"),
  icon: z.string().optional(),
  isDefault: z.boolean().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const accounts = await db.bankAccount.findMany({
    where: { userId: session.user.id },
    orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }],
  });

  return NextResponse.json({ accounts });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const body = await req.json();
    const data = bankAccountSchema.parse(body);

    // If setting as default, unset others first
    if (data.isDefault) {
      await db.bankAccount.updateMany({
        where: { userId: session.user.id },
        data: { isDefault: false },
      });
    }

    const account = await db.bankAccount.create({
      data: { ...data, userId: session.user.id },
    });

    return NextResponse.json({ account }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos no válidos", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

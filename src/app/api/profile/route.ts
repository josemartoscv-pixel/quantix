import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      currency: true,
      monthlyIncome: true,
      createdAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  return NextResponse.json({ user });
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, email, currency, monthlyIncome } = body;

    if (email && email !== session.user.email) {
      const existing = await db.user.findUnique({ where: { email } });
      if (existing && existing.id !== session.user.id) {
        return NextResponse.json({ error: "Este email ya está en uso" }, { status: 409 });
      }
    }

    const user = await db.user.update({
      where: { id: session.user.id },
      data: {
        name: name || undefined,
        email: email || undefined,
        currency: currency || undefined,
        monthlyIncome: monthlyIncome ? parseFloat(monthlyIncome) : null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        currency: true,
        monthlyIncome: true,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

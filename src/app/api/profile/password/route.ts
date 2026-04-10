import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "La contraseña actual y la nueva son obligatorias" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "La nueva contraseña debe tener al menos 8 caracteres" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({ where: { id: session.user.id } });
    if (!user || !user.password) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "La contraseña actual no es correcta" },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await db.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Password change error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

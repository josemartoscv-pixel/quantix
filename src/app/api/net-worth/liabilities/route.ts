import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { liabilitySchema } from "@/lib/validations/net-worth";
import { z } from "zod";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = liabilitySchema.parse(body);

    const liability = await db.liability.create({
      data: {
        userId: session.user.id,
        name: data.name,
        type: data.type,
        value: data.value,
        description: data.description,
      },
    });

    return NextResponse.json({ liability }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos no válidos", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

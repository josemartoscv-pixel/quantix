import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ARTICLES } from "@/lib/constants/education-content";

export async function POST(
  req: NextRequest,
  { params }: { params: { articleId: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const article = ARTICLES.find((a) => a.id === params.articleId);
  if (!article) {
    return NextResponse.json({ error: "Artículo no encontrado" }, { status: 404 });
  }

  await db.userArticle.upsert({
    where: {
      userId_articleId: {
        userId: session.user.id,
        articleId: params.articleId,
      },
    },
    create: {
      userId: session.user.id,
      articleId: params.articleId,
    },
    update: {},
  });

  return NextResponse.json({ message: "Marcado como leído" }, { status: 201 });
}

export async function GET(
  req: NextRequest,
  { params }: { params: { articleId: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const record = await db.userArticle.findUnique({
    where: {
      userId_articleId: {
        userId: session.user.id,
        articleId: params.articleId,
      },
    },
  });

  return NextResponse.json({ isRead: !!record });
}

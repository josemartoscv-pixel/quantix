import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import { ARTICLES } from "@/lib/constants/education-content";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MarkArticleRead } from "@/components/education/mark-article-read";

interface Props {
  params: { slug: string };
}

export default async function ArticlePage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const read = await db.userArticle.findUnique({
    where: { userId_articleId: { userId, articleId: article.id } },
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back */}
      <Link href="/educacion" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Volver a Educación
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 space-y-3">
        <div className="flex gap-2 flex-wrap">
          <Badge variant={article.level === "principiante" ? "default" : "info"} className="text-xs">
            {article.level === "principiante" ? "Principiante" : "Intermedio"}
          </Badge>
          <Badge variant="outline" className="text-xs">{article.topic}</Badge>
        </div>
        <h1 className="text-xl font-bold text-gray-900 leading-snug">{article.title}</h1>
        <p className="text-sm text-gray-500">{article.description}</p>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.estimatedMinutes} min de lectura</span>
          </div>
          {read && (
            <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              Leído
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl p-6">
        <div className="prose prose-sm prose-gray max-w-none
          prose-headings:font-bold prose-headings:text-gray-900
          prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
          prose-p:text-gray-600 prose-p:leading-relaxed
          prose-li:text-gray-600
          prose-strong:text-gray-800
          prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
        ">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </div>

      {/* Mark as read */}
      {!read && (
        <MarkArticleRead articleId={article.id} userId={userId} />
      )}
    </div>
  );
}

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import { ARTICLES } from "@/lib/constants/education-content";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { MarkAsReadButton } from "./mark-as-read-button";

// Simple markdown-to-HTML converter
function parseMarkdown(content: string): string {
  return content
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-gray-900 mb-4 mt-8 first:mt-0">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold text-gray-900 mb-3 mt-6">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-gray-800 mb-2 mt-4">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-gray-700 mb-1">• $1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 text-gray-700 mb-1 list-decimal">$1</li>')
    .replace(/\n\n/g, '</p><p class="text-gray-700 leading-relaxed mb-4">')
    .replace(/^(?!<[h|l])(.+)$/gm, '<p class="text-gray-700 leading-relaxed mb-4">$1</p>')
    .replace(/<p class="[^"]*"><\/p>/g, '')
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      const isHeader = match.includes('---');
      if (isHeader) return '';
      const cellHtml = cells.map(c => `<td class="border border-gray-200 px-3 py-2 text-sm">${c.trim()}</td>`).join('');
      return `<tr>${cellHtml}</tr>`;
    });
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const userArticle = await db.userArticle.findUnique({
    where: { userId_articleId: { userId: session.user.id, articleId: article.id } },
  });

  const isRead = !!userArticle;

  const related = ARTICLES.filter(
    (a) => a.slug !== params.slug && (a.level === article.level || a.topic === article.topic)
  ).slice(0, 3);

  const htmlContent = parseMarkdown(article.content);

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Link
          href="/educacion"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a educación
        </Link>

        <div className="flex gap-2 mb-3 flex-wrap">
          <Badge variant={article.level === "principiante" ? "default" : "info"}>
            {article.level === "principiante" ? "Principiante" : "Intermedio"}
          </Badge>
          <Badge variant="outline">{article.topic}</Badge>
          {isRead && (
            <Badge className="bg-emerald-100 text-emerald-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Leído
            </Badge>
          )}
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">{article.title}</h1>
        <p className="text-gray-500 text-lg mb-4">{article.description}</p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            {article.estimatedMinutes} minutos de lectura
          </div>
          <MarkAsReadButton
            articleId={article.id}
            isRead={isRead}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Article content */}
        <div className="lg:col-span-2">
          <div
            className="prose max-w-none bg-white rounded-2xl border border-gray-200 p-8"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
          <div className="mt-6">
            <MarkAsReadButton articleId={article.id} isRead={isRead} />
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Artículos relacionados</h3>
            <div className="space-y-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/dashboard/educacion/${rel.slug}`}
                  className="block p-4 bg-white rounded-xl border border-gray-200 hover:border-emerald-200 hover:shadow-sm transition-all"
                >
                  <p className="text-sm font-medium text-gray-900 leading-snug mb-1">
                    {rel.title}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {rel.estimatedMinutes} min
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

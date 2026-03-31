import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ARTICLES } from "@/lib/constants/education-content";
import { TopicCard } from "@/components/education/topic-card";

export default async function EducacionPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const readArticles = await db.userArticle.findMany({
    where: { userId: session.user.id },
    select: { articleId: true },
  });

  const readIds = new Set(readArticles.map((a) => a.articleId));

  const principiante = ARTICLES.filter((a) => a.level === "principiante");
  const intermedio = ARTICLES.filter((a) => a.level === "intermedio");

  const principianteRead = principiante.filter((a) => readIds.has(a.id)).length;
  const intermedioRead = intermedio.filter((a) => readIds.has(a.id)).length;

  return (
    <div className="space-y-8">
      {/* Principiante */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Principiante</h2>
            <p className="text-sm text-gray-500">
              {principianteRead}/{principiante.length} artículos leídos
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${(principianteRead / principiante.length) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-500">
              {Math.round((principianteRead / principiante.length) * 100)}%
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {principiante.map((article) => (
            <TopicCard
              key={article.id}
              slug={article.slug}
              title={article.title}
              description={article.description}
              estimatedMinutes={article.estimatedMinutes}
              level={article.level}
              topic={article.topic}
              isRead={readIds.has(article.id)}
            />
          ))}
        </div>
      </section>

      {/* Intermedio */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Intermedio</h2>
            <p className="text-sm text-gray-500">
              {intermedioRead}/{intermedio.length} artículos leídos
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${(intermedioRead / intermedio.length) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-500">
              {Math.round((intermedioRead / intermedio.length) * 100)}%
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {intermedio.map((article) => (
            <TopicCard
              key={article.id}
              slug={article.slug}
              title={article.title}
              description={article.description}
              estimatedMinutes={article.estimatedMinutes}
              level={article.level}
              topic={article.topic}
              isRead={readIds.has(article.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

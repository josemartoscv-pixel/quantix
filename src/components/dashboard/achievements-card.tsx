import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Achievement } from "@/lib/calculations/achievements";

export function AchievementsCard({ achievements }: { achievements: Achievement[] }) {
  const unlocked = achievements.filter((a) => a.unlocked).length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span>🏅</span>
            Logros
          </CardTitle>
          <span className="text-sm text-gray-500 font-normal">
            {unlocked}/{achievements.length} desbloqueados
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={cn(
                "flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all",
                achievement.unlocked
                  ? "bg-amber-50 border-amber-200"
                  : "bg-gray-50 border-gray-100 opacity-40 grayscale"
              )}
              title={achievement.description}
            >
              <span className="text-2xl">{achievement.icon}</span>
              <p className="text-xs font-medium text-gray-700 leading-tight">{achievement.title}</p>
            </div>
          ))}
        </div>
        {unlocked === 0 && (
          <p className="text-center text-sm text-gray-400 mt-3">
            Añade transacciones para desbloquear tus primeros logros
          </p>
        )}
      </CardContent>
    </Card>
  );
}

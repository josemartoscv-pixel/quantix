import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/currency";
import { cn } from "@/lib/utils";

interface TopExpense {
  categoryId: string;
  name: string;
  emoji: string;
  amount: number;
  color: string;
  percentage: number;
  change: number | null;
}

interface TopExpensesCardProps {
  expenses: TopExpense[];
  biggestIncrease: TopExpense | null;
}

export function TopExpensesCard({ expenses, biggestIncrease }: TopExpensesCardProps) {
  if (expenses.length === 0) return null;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <span>💸</span>
          En qué se va el dinero
        </CardTitle>
        <p className="text-xs text-gray-400">Top categorías este mes</p>
      </CardHeader>
      <CardContent className="space-y-3">

        {/* Trend alert */}
        {biggestIncrease && (
          <div className="flex items-center gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-2.5">
            <span className="text-lg">🔥</span>
            <p className="text-sm font-semibold text-amber-800">
              {biggestIncrease.name} ha subido{" "}
              <span className="text-amber-600">+{Math.round(biggestIncrease.change!)}%</span>{" "}
              este mes
            </p>
          </div>
        )}

        {/* Category rows */}
        {expenses.map((exp, i) => (
          <div key={exp.categoryId} className="flex items-center gap-3">
            {/* Rank + emoji */}
            <div className="flex-shrink-0 flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-gray-300 w-3">{i + 1}</span>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm"
                style={{ backgroundColor: exp.color + "22", border: `1.5px solid ${exp.color}44` }}
              >
                {exp.emoji}
              </div>
            </div>

            {/* Bar + info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-gray-800 truncate">{exp.name}</span>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  {exp.change !== null && (
                    <span className={cn(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                      exp.change > 10
                        ? "bg-red-100 text-red-600"
                        : exp.change < -10
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-gray-100 text-gray-500"
                    )}>
                      {exp.change > 0 ? "+" : ""}{Math.round(exp.change)}%
                    </span>
                  )}
                  <span className="text-sm font-bold text-gray-900">{formatCurrency(exp.amount)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${exp.percentage}%`, backgroundColor: exp.color }}
                  />
                </div>
                <span className="text-[11px] font-bold text-gray-400 w-8 text-right">
                  {Math.round(exp.percentage)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

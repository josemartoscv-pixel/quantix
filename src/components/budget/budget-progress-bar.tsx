import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/currency";
import { AlertTriangle, AlertCircle } from "lucide-react";

interface BudgetProgressBarProps {
  categoryName: string;
  categoryColor: string;
  categoryEmoji?: string;
  spent: number;
  budgeted: number;
}

export function BudgetProgressBar({
  categoryName,
  categoryColor,
  categoryEmoji,
  spent,
  budgeted,
}: BudgetProgressBarProps) {
  const pct = budgeted > 0 ? Math.min((spent / budgeted) * 100, 100) : 0;
  const rawPct = budgeted > 0 ? (spent / budgeted) * 100 : 0;
  const isOver = spent > budgeted;
  const isWarning = !isOver && rawPct >= 80;

  const barColor =
    rawPct < 70
      ? "bg-emerald-500"
      : rawPct < 90
      ? "bg-amber-500"
      : "bg-red-500";

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-2">
          {categoryEmoji ? (
            <span className="text-base">{categoryEmoji}</span>
          ) : (
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: categoryColor }} />
          )}
          <span className="text-sm font-medium text-gray-800">{categoryName}</span>
          {isOver && (
            <span className="flex items-center gap-0.5 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">
              <AlertCircle className="w-2.5 h-2.5" /> EXCEDIDO
            </span>
          )}
          {isWarning && (
            <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">
              <AlertTriangle className="w-2.5 h-2.5" /> {rawPct.toFixed(0)}%
            </span>
          )}
        </div>
        <div className="text-right">
          <span className={cn("text-sm font-semibold", isOver ? "text-red-600" : "text-gray-700")}>
            {formatCurrency(spent)}
          </span>
          <span className="text-xs text-gray-400"> / {formatCurrency(budgeted)}</span>
        </div>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", barColor)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-400">{rawPct.toFixed(0)}% usado</span>
        {isOver ? (
          <span className="text-xs text-red-600 font-medium">
            +{formatCurrency(spent - budgeted)} excedido
          </span>
        ) : (
          <span className="text-xs text-emerald-600">
            {formatCurrency(budgeted - spent)} restante
          </span>
        )}
      </div>
    </div>
  );
}

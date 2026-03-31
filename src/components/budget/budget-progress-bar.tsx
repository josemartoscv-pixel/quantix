import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/currency";

interface BudgetProgressBarProps {
  categoryName: string;
  categoryColor: string;
  spent: number;
  budgeted: number;
}

export function BudgetProgressBar({
  categoryName,
  categoryColor,
  spent,
  budgeted,
}: BudgetProgressBarProps) {
  const pct = budgeted > 0 ? Math.min((spent / budgeted) * 100, 100) : 0;
  const isOver = spent > budgeted;

  const barColor =
    pct < 70
      ? "bg-emerald-500"
      : pct < 90
      ? "bg-amber-500"
      : "bg-red-500";

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: categoryColor }}
          />
          <span className="text-sm font-medium text-gray-800">{categoryName}</span>
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
        <span className="text-xs text-gray-400">{pct.toFixed(0)}% usado</span>
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

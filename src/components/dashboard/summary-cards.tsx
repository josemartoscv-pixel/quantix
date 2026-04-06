import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/currency";
import { cn } from "@/lib/utils";

interface SummaryData {
  totalIncome: number;
  totalExpenses: number;
  savings: number;
  balance: number;
  prevIncome: number;
  prevExpenses: number;
}

function PercentChange({ current, previous }: { current: number; previous: number }) {
  if (previous === 0) return null;
  const change = ((current - previous) / previous) * 100;
  const positive = change >= 0;
  return (
    <span className={cn("text-xs font-medium", positive ? "text-emerald-600" : "text-red-600")}>
      {positive ? "+" : ""}
      {change.toFixed(1)}% vs mes anterior
    </span>
  );
}

export function SummaryCards({ data }: { data: SummaryData }) {
  const cards = [
    {
      label: "Ingresos del mes",
      value: data.totalIncome,
      icon: TrendingUp,
      iconClass: "bg-emerald-100 text-emerald-600",
      prevValue: data.prevIncome,
      currentValue: data.totalIncome,
    },
    {
      label: "Gastos del mes",
      value: data.totalExpenses,
      icon: TrendingDown,
      iconClass: "bg-red-100 text-red-600",
      prevValue: data.prevExpenses,
      currentValue: data.totalExpenses,
    },
    {
      label: "Ahorro del mes",
      value: data.savings,
      icon: PiggyBank,
      iconClass: "bg-blue-100 text-blue-600",
      prevValue: null,
      currentValue: null,
    },
    {
      label: "Balance total",
      value: data.balance,
      icon: Wallet,
      iconClass: "bg-violet-100 text-violet-600",
      prevValue: null,
      currentValue: null,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isNegative = card.value < 0;
        return (
          <Card key={card.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", card.iconClass)}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 truncate">{card.label}</p>
                  <p className={cn("text-lg font-bold leading-tight", isNegative ? "text-red-600" : "text-gray-900")}>
                    {formatCurrency(card.value)}
                  </p>
                  {card.prevValue !== null && card.currentValue !== null && (
                    <PercentChange current={card.currentValue} previous={card.prevValue} />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

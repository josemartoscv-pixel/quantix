import { formatCurrency } from "@/lib/utils/currency";
import { cn } from "@/lib/utils";

interface WelcomeHeaderProps {
  name: string;
  totalIncome: number;
  totalExpenses: number;
  monthlySavings: number;
  totalBalance: number;
}

export function WelcomeHeader({ name, totalIncome, totalExpenses, monthlySavings, totalBalance }: WelcomeHeaderProps) {
  const firstName = name?.split(" ")[0] || "ahí";
  const savingsPositive = monthlySavings >= 0;

  return (
    <div className="bg-white rounded-2xl px-6 pt-8 pb-6 text-center space-y-1">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Balance acumulado</p>
      <p className={cn("text-5xl sm:text-6xl font-bold tracking-tight", totalBalance >= 0 ? "text-gray-900" : "text-red-500")}>
        {formatCurrency(totalBalance)}
      </p>
      <p className={cn("text-sm font-medium", savingsPositive ? "text-emerald-500" : "text-red-400")}>
        {savingsPositive ? "+" : ""}{formatCurrency(monthlySavings)} este mes
      </p>
      <p className="text-xs text-gray-400 pt-1">Hola, {firstName} 👋</p>

      {/* Mini stats row */}
      <div className="flex justify-center gap-8 pt-4 border-t border-gray-50 mt-4">
        <div className="text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-wide">Ingresos</p>
          <p className="text-base font-semibold text-emerald-600">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="w-px bg-gray-100" />
        <div className="text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-wide">Gastos</p>
          <p className="text-base font-semibold text-red-500">{formatCurrency(totalExpenses)}</p>
        </div>
      </div>
    </div>
  );
}

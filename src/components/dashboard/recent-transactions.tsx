import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/dates";
import { getCategoryById } from "@/lib/constants/categories";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface Transaction {
  id: string;
  amount: number;
  type: string;
  categoryId: string;
  description: string;
  date: Date | string;
}

export function RecentTransactions({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Últimas transacciones</CardTitle>
        <Link
          href="/transacciones"
          className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
        >
          Ver todas
          <ArrowRight className="w-4 h-4" />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {transactions.length === 0 ? (
          <div className="py-8 text-center text-gray-500 text-sm">
            No hay transacciones registradas
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {transactions.map((tx) => {
              const category = getCategoryById(tx.categoryId);
              const isIncome = tx.type === "INCOME";
              return (
                <li
                  key={tx.id}
                  className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                    style={{ backgroundColor: category?.color || "#6b7280" }}
                  >
                    {category?.name?.[0] || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {tx.description}
                    </p>
                    <p className="text-xs text-gray-400">
                      {category?.name} · {formatDate(tx.date)}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "text-sm font-semibold flex-shrink-0",
                      isIncome ? "text-emerald-600" : "text-red-600"
                    )}
                  >
                    {isIncome ? "+" : "-"}
                    {formatCurrency(tx.amount)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

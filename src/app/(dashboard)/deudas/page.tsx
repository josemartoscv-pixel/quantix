"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { TrendingDown } from "lucide-react";
import { DebtCard } from "@/components/debts/debt-card";
import { DebtForm } from "@/components/debts/debt-form";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/currency";

interface Debt {
  id: string;
  name: string;
  type: string;
  initialAmount: number;
  currentBalance: number;
  interestRate: number;
  minimumPayment?: number | null;
  lender?: string | null;
  notes?: string | null;
  startDate: string;
  isActive: boolean;
}

export default function DeudasPage() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDebts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/debts");
      const data = await res.json();
      setDebts(data.debts || []);
    } catch {
      toast.error("Error al cargar las deudas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDebts(); }, [fetchDebts]);

  const totalDebt = debts.reduce((s, d) => s + d.currentBalance, 0);
  const monthlyPayments = debts.reduce((s, d) => s + (d.minimumPayment || 0), 0);
  const avgInterest = debts.length > 0
    ? debts.reduce((s, d) => s + d.interestRate, 0) / debts.length
    : 0;

  // Sort by interest rate descending (avalanche method)
  const sortedDebts = [...debts].sort((a, b) => b.interestRate - a.interestRate);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500">Deuda total</p>
            <p className="text-xl font-bold text-red-600">{formatCurrency(totalDebt)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500">Pagos mensuales</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(monthlyPayments)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500">Interés medio</p>
            <p className="text-xl font-bold text-amber-600">{avgInterest.toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Header with button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Mis deudas</h2>
          <p className="text-sm text-gray-500">Ordenadas por mayor tasa de interés (método avalancha)</p>
        </div>
        <DebtForm onSuccess={fetchDebts} />
      </div>

      {/* Debts list */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-64 w-full" />)}
        </div>
      ) : sortedDebts.length === 0 ? (
        <EmptyState
          icon={TrendingDown}
          title="No tienes deudas registradas"
          description="Registra tus deudas para hacer un seguimiento y planificar su liquidación."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sortedDebts.map((debt) => (
            <DebtCard key={debt.id} debt={debt} onRefresh={fetchDebts} />
          ))}
        </div>
      )}
    </div>
  );
}

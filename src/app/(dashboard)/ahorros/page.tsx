"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { PiggyBank } from "lucide-react";
import { GoalCard } from "@/components/savings/goal-card";
import { GoalForm } from "@/components/savings/goal-form";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils/currency";
import { Card, CardContent } from "@/components/ui/card";

interface Goal {
  id: string;
  name: string;
  description?: string | null;
  targetAmount: number;
  currentAmount: number;
  targetDate?: string | null;
  icon?: string | null;
  color?: string | null;
  isCompleted: boolean;
}

export default function AhorrosPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGoals = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/savings-goals");
      const data = await res.json();
      setGoals(data.goals || []);
    } catch {
      toast.error("Error al cargar las metas de ahorro");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchGoals(); }, [fetchGoals]);

  const activeGoals = goals.filter((g) => !g.isCompleted);
  const completedGoals = goals.filter((g) => g.isCompleted);

  const totalTarget = activeGoals.reduce((s, g) => s + g.targetAmount, 0);
  const totalSaved = activeGoals.reduce((s, g) => s + g.currentAmount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Total ahorrado</p>
              <p className="text-xl font-bold text-emerald-600">{formatCurrency(totalSaved)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Objetivo total</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(totalTarget)}</p>
            </CardContent>
          </Card>
        </div>
        <GoalForm onSuccess={fetchGoals} />
      </div>

      {/* Active goals */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-56 w-full" />)}
        </div>
      ) : activeGoals.length === 0 ? (
        <EmptyState
          icon={PiggyBank}
          title="No tienes metas de ahorro"
          description="Crea tu primera meta de ahorro para empezar a ahorrar de forma organizada."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} onRefresh={fetchGoals} />
          ))}
        </div>
      )}

      {/* Completed goals */}
      {completedGoals.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Metas completadas 🎉</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} onRefresh={fetchGoals} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

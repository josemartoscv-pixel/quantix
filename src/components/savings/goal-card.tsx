"use client";

import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { differenceInDays } from "date-fns";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DepositForm } from "./deposit-form";
import { GoalForm } from "./goal-form";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { formatCurrency } from "@/lib/utils/currency";
import { cn } from "@/lib/utils";

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

interface GoalCardProps {
  goal: Goal;
  onRefresh: () => void;
}

export function GoalCard({ goal, onRefresh }: GoalCardProps) {
  const pct = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  const remaining = goal.targetAmount - goal.currentAmount;

  // Fire confetti only when goal transitions from active → completed
  const prevCompleted = useRef(goal.isCompleted);
  useEffect(() => {
    if (!prevCompleted.current && goal.isCompleted) {
      confetti({
        particleCount: 180,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#10b981", "#34d399", "#6ee7b7", "#fbbf24", "#f59e0b"],
      });
      // Second burst for extra effect
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
        });
      }, 300);
    }
    prevCompleted.current = goal.isCompleted;
  }, [goal.isCompleted]);

  let daysRemaining: number | null = null;
  if (goal.targetDate) {
    daysRemaining = differenceInDays(new Date(goal.targetDate), new Date());
  }

  const handleDelete = async () => {
    const res = await fetch(`/api/savings-goals/${goal.id}`, { method: "DELETE" });
    if (res.ok) onRefresh();
  };

  return (
    <Card className={cn(goal.isCompleted && "border-emerald-300 bg-emerald-50/30")}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{goal.icon || "🎯"}</span>
            <div>
              <h3 className="font-semibold text-gray-900">{goal.name}</h3>
              {goal.description && (
                <p className="text-xs text-gray-500 mt-0.5">{goal.description}</p>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            {goal.isCompleted && (
              <Badge variant="default" className="text-xs">Completada</Badge>
            )}
            <GoalForm
              initialData={goal}
              onSuccess={onRefresh}
              trigger={
                <Button variant="ghost" size="icon">
                  <Pencil className="w-4 h-4 text-gray-400" />
                </Button>
              }
            />
            <ConfirmDialog
              trigger={
                <Button variant="ghost" size="icon">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </Button>
              }
              title="Eliminar meta de ahorro"
              description="¿Estás seguro de que quieres eliminar esta meta? Se perderán todos los datos."
              onConfirm={handleDelete}
              confirmLabel="Eliminar"
            />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="font-medium text-gray-700">{formatCurrency(goal.currentAmount)}</span>
            <span className="text-gray-400">{formatCurrency(goal.targetAmount)}</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                goal.isCompleted ? "bg-emerald-500" : "bg-emerald-500"
              )}
              style={{
                width: `${pct}%`,
                backgroundColor: goal.color || "#10b981",
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">{pct.toFixed(0)}% completado</span>
            {!goal.isCompleted && (
              <span className="text-xs text-gray-500">
                Faltan {formatCurrency(remaining)}
              </span>
            )}
          </div>
        </div>

        {/* Days remaining */}
        {daysRemaining !== null && !goal.isCompleted && (
          <p className={cn(
            "text-xs font-medium mt-2",
            daysRemaining < 0 ? "text-red-600" : daysRemaining < 30 ? "text-amber-600" : "text-gray-500"
          )}>
            {daysRemaining < 0
              ? `Venció hace ${Math.abs(daysRemaining)} días`
              : `${daysRemaining} días restantes`}
          </p>
        )}

        {/* Deposit button */}
        {!goal.isCompleted && (
          <div className="mt-4">
            <DepositForm
              goalId={goal.id}
              onSuccess={onRefresh}
              trigger={
                <Button variant="outline" size="sm" className="w-full">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Agregar depósito
                </Button>
              }
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

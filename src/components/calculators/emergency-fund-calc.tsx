"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils/currency";
import { cn } from "@/lib/utils";

export function EmergencyFundCalc() {
  const [monthlyExpenses, setMonthlyExpenses] = useState("1500");
  const [targetMonths, setTargetMonths] = useState("6");
  const [monthlySavings, setMonthlySavings] = useState("200");
  const [currentSavings, setCurrentSavings] = useState("0");

  const expenses = parseFloat(monthlyExpenses) || 0;
  const months = parseInt(targetMonths) || 1;
  const savings = parseFloat(monthlySavings) || 0;
  const current = parseFloat(currentSavings) || 0;

  const targetAmount = expenses * months;
  const remaining = Math.max(0, targetAmount - current);
  const monthsToGoal = savings > 0 ? Math.ceil(remaining / savings) : Infinity;
  const yearsToGoal = Math.floor(monthsToGoal / 12);
  const extraMonths = monthsToGoal % 12;

  const coverageMonths = expenses > 0 ? current / expenses : 0;
  const coveragePct = (coverageMonths / months) * 100;

  const getStatusColor = () => {
    if (coverageMonths >= months) return "text-emerald-600";
    if (coverageMonths >= months * 0.5) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Gastos mensuales (€)</Label>
          <Input type="number" min="0" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Meses de cobertura deseados</Label>
          <Input type="number" min="1" max="24" value={targetMonths} onChange={(e) => setTargetMonths(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Ahorro actual (€)</Label>
          <Input type="number" min="0" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Ahorro mensual disponible (€)</Label>
          <Input type="number" min="0" value={monthlySavings} onChange={(e) => setMonthlySavings(e.target.value)} className="mt-1" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-600">Fondo objetivo</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(targetAmount)}</p>
              <p className="text-xs text-gray-400">{months} meses × {formatCurrency(expenses)}/mes</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Cobertura actual</p>
              <p className={cn("text-2xl font-bold", getStatusColor())}>
                {coverageMonths.toFixed(1)} meses
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                coveragePct >= 100 ? "bg-emerald-500" : coveragePct >= 50 ? "bg-amber-500" : "bg-red-500"
              )}
              style={{ width: `${Math.min(coveragePct, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatCurrency(current)} ahorrado</span>
            <span>{coveragePct.toFixed(0)}% del objetivo</span>
          </div>
        </div>

        {remaining > 0 && (
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-blue-700 mb-1">Tiempo para completar el fondo</p>
            <p className="text-2xl font-bold text-blue-900">
              {monthsToGoal === Infinity ? "—" : yearsToGoal > 0 ? `${yearsToGoal}a ${extraMonths}m` : `${monthsToGoal} meses`}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Faltan {formatCurrency(remaining)} para el objetivo
            </p>
          </div>
        )}

        {remaining <= 0 && (
          <div className="bg-emerald-50 rounded-xl p-4 text-center">
            <p className="text-2xl mb-2">🎉</p>
            <p className="font-semibold text-emerald-800">¡Tienes el fondo de emergencia completo!</p>
            <p className="text-sm text-emerald-600 mt-1">Tu dinero extra puede ir a inversiones o metas adicionales.</p>
          </div>
        )}
      </div>
    </div>
  );
}

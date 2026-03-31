"use client";

import { useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from "recharts";
const Tooltip = RechartsTooltip as any;
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils/currency";

export function SavingsGoalCalc() {
  const [goal, setGoal] = useState("10000");
  const [monthly, setMonthly] = useState("300");
  const [rate, setRate] = useState("3");

  const goalAmount = parseFloat(goal) || 0;
  const monthlyAmount = parseFloat(monthly) || 0;
  const monthlyRate = (parseFloat(rate) || 0) / 100 / 12;

  let months = 0;
  let balance = 0;
  const chartData = [];

  if (monthlyAmount > 0 && goalAmount > 0) {
    while (balance < goalAmount && months < 600) {
      balance = balance * (1 + monthlyRate) + monthlyAmount;
      months++;
      if (months % 12 === 0 || months === 1) {
        chartData.push({
          mes: months,
          ahorro: Math.round(balance * 100) / 100,
          meta: goalAmount,
        });
      }
    }
    if (balance < goalAmount) {
      chartData.push({ mes: months, ahorro: Math.round(balance * 100) / 100, meta: goalAmount });
    }
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Meta (€)</Label>
          <Input type="number" min="0" value={goal} onChange={(e) => setGoal(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Ahorro mensual (€)</Label>
          <Input type="number" min="0" value={monthly} onChange={(e) => setMonthly(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Tasa rendimiento (%)</Label>
          <Input type="number" min="0" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="mt-1" />
        </div>
      </div>

      {months > 0 && (
        <div className="bg-emerald-50 rounded-xl p-5 text-center">
          <p className="text-emerald-700 text-sm mb-1">Tiempo para alcanzar la meta</p>
          <p className="text-3xl font-bold text-emerald-900">
            {years > 0 ? `${years} año${years !== 1 ? "s" : ""} ` : ""}
            {remainingMonths > 0 ? `${remainingMonths} mes${remainingMonths !== 1 ? "es" : ""}` : ""}
          </p>
          <p className="text-sm text-emerald-700 mt-1">
            Total aportado: {formatCurrency(monthlyAmount * months)} | Con intereses: {formatCurrency(balance)}
          </p>
        </div>
      )}

      {chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="savingsGoalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#64748b" }} label={{ value: "Mes", position: "insideBottom", offset: -5, fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(v: number) => [formatCurrency(v)]} labelFormatter={(l: string) => `Mes ${l}`} />
            <ReferenceLine y={goalAmount} stroke="#10b981" strokeDasharray="4 4" label={{ value: "Meta", fontSize: 11, fill: "#10b981" }} />
            <Area type="monotone" dataKey="ahorro" name="Ahorro acumulado" stroke="#10b981" fill="url(#savingsGoalGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

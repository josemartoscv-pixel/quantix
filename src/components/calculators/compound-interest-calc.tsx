"use client";

import { useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from "recharts";
const Tooltip = RechartsTooltip as any;
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateCompoundInterest } from "@/lib/calculations/compound-interest";
import { formatCurrency } from "@/lib/utils/currency";

export function CompoundInterestCalc() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("20");
  const [monthly, setMonthly] = useState("200");

  const data = calculateCompoundInterest(
    parseFloat(principal) || 0,
    parseFloat(rate) || 0,
    Math.min(parseInt(years) || 1, 50),
    parseFloat(monthly) || 0
  );

  const final = data[data.length - 1];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Capital inicial (€)</Label>
          <Input type="number" min="0" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Tasa anual (%)</Label>
          <Input type="number" min="0" step="0.1" max="30" value={rate} onChange={(e) => setRate(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Años</Label>
          <Input type="number" min="1" max="50" value={years} onChange={(e) => setYears(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Aportación mensual (€)</Label>
          <Input type="number" min="0" value={monthly} onChange={(e) => setMonthly(e.target.value)} className="mt-1" />
        </div>
      </div>

      {final && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-emerald-50 rounded-xl p-4 text-center">
            <p className="text-xs text-emerald-700 mb-1">Balance final</p>
            <p className="text-xl font-bold text-emerald-900">{formatCurrency(final.balance)}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-xs text-blue-700 mb-1">Total aportado</p>
            <p className="text-xl font-bold text-blue-900">{formatCurrency(final.contributed)}</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 text-center">
            <p className="text-xs text-amber-700 mb-1">Intereses ganados</p>
            <p className="text-xl font-bold text-amber-900">{formatCurrency(final.interest)}</p>
          </div>
        </div>
      )}

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#64748b" }} label={{ value: "Año", position: "insideBottom", offset: -5, fontSize: 12 }} />
          <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
          <Tooltip
            formatter={(value: number, name: string) => [formatCurrency(value), name]}
            labelFormatter={(label: string) => `Año ${label}`}
          />
          <Legend />
          <Area type="monotone" dataKey="balance" name="Balance total" stroke="#10b981" fill="url(#balanceGrad)" strokeWidth={2} />
          <Area type="monotone" dataKey="contributed" name="Aportado" stroke="#3b82f6" fill="none" strokeWidth={1.5} strokeDasharray="4 4" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

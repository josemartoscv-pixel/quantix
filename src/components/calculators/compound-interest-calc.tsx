"use client";

import { useState, useMemo, useDeferredValue } from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from "recharts";
const Tooltip = RechartsTooltip as any;
import { calculateCompoundInterest } from "@/lib/calculations/compound-interest";
import { formatCurrency } from "@/lib/utils/currency";

interface SliderFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}

function SliderField({ label, value, min, max, step, display, onChange }: SliderFieldProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-baseline">
        <span className="text-xs font-medium text-gray-500">{label}</span>
        <span className="text-sm font-bold text-gray-900 tabular-nums">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-gray-200 accent-emerald-500"
      />
    </div>
  );
}

export function CompoundInterestCalc() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);
  const [monthly, setMonthly] = useState(200);

  const dPrincipal = useDeferredValue(principal);
  const dRate = useDeferredValue(rate);
  const dYears = useDeferredValue(years);
  const dMonthly = useDeferredValue(monthly);

  const data = useMemo(
    () => calculateCompoundInterest(dPrincipal, dRate, Math.min(dYears, 50), dMonthly),
    [dPrincipal, dRate, dYears, dMonthly]
  );
  const final = data[data.length - 1];

  return (
    <div className="space-y-4">
      {/* Sliders */}
      <div className="space-y-3 bg-gray-50 rounded-2xl p-4">
        <SliderField
          label="Capital inicial"
          value={principal}
          min={0} max={100000} step={500}
          display={formatCurrency(principal)}
          onChange={setPrincipal}
        />
        <SliderField
          label="Aportación mensual"
          value={monthly}
          min={0} max={2000} step={50}
          display={formatCurrency(monthly)}
          onChange={setMonthly}
        />
        <SliderField
          label="Rentabilidad anual"
          value={rate}
          min={0} max={20} step={0.5}
          display={`${rate}%`}
          onChange={setRate}
        />
        <SliderField
          label="Años"
          value={years}
          min={1} max={50} step={1}
          display={`${years} años`}
          onChange={setYears}
        />
      </div>

      {/* Results */}
      {final && (
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-emerald-50 rounded-2xl p-3 text-center">
            <p className="text-[10px] text-emerald-600 font-medium mb-0.5">Balance final</p>
            <p className="text-sm font-bold text-emerald-900 tabular-nums truncate">{formatCurrency(final.balance)}</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-3 text-center">
            <p className="text-[10px] text-blue-600 font-medium mb-0.5">Aportado</p>
            <p className="text-sm font-bold text-blue-900 tabular-nums truncate">{formatCurrency(final.contributed)}</p>
          </div>
          <div className="bg-amber-50 rounded-2xl p-3 text-center">
            <p className="text-[10px] text-amber-600 font-medium mb-0.5">Intereses</p>
            <p className="text-sm font-bold text-amber-900 tabular-nums truncate">{formatCurrency(final.interest)}</p>
          </div>
        </div>
      )}

      {/* Chart */}
      <ResponsiveContainer key={dYears} width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="interestGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="contributedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#94a3b8" }} />
          <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={36} />
          <Tooltip
            formatter={(value: number, name: string) => [formatCurrency(value), name]}
            labelFormatter={(label: string) => `Año ${label}`}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Area type="monotone" dataKey="contributed" name="Aportado" stackId="1" stroke="#3b82f6" fill="url(#contributedGrad)" strokeWidth={1.5} dot={false} />
          <Area type="monotone" dataKey="interest" name="Intereses" stackId="1" stroke="#f59e0b" fill="url(#interestGrad)" strokeWidth={1.5} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

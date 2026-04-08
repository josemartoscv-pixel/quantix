"use client";

import { useState, useMemo, useDeferredValue } from "react";
import { formatCurrency } from "@/lib/utils/currency";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from "recharts";
const Tooltip = RechartsTooltip as any;

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

export function InflationCalc() {
  const [amount, setAmount] = useState(10000);
  const [inflationRate, setInflationRate] = useState(3);
  const [years, setYears] = useState(20);

  const dAmount = useDeferredValue(amount);
  const dInflationRate = useDeferredValue(inflationRate);
  const dYears = useDeferredValue(years);

  const calc = useMemo(() => {
    const futureEquivalent = dAmount * Math.pow(1 + dInflationRate / 100, dYears);
    const purchasingPower = dAmount / Math.pow(1 + dInflationRate / 100, dYears);
    const loss = dAmount - purchasingPower;
    const lossPercent = (loss / dAmount) * 100;

    const chartData = [];
    for (let y = 0; y <= dYears; y++) {
      chartData.push({
        year: y,
        valor: Math.round(dAmount / Math.pow(1 + dInflationRate / 100, y)),
        nominal: dAmount,
      });
    }

    return { futureEquivalent, purchasingPower, loss, lossPercent, chartData };
  }, [dAmount, dInflationRate, dYears]);

  return (
    <div className="space-y-4">
      {/* Sliders */}
      <div className="space-y-3 bg-gray-50 rounded-2xl p-4">
        <SliderField
          label="Cantidad actual"
          value={amount}
          min={100} max={500000} step={100}
          display={formatCurrency(amount)}
          onChange={setAmount}
        />
        <SliderField
          label="Inflación anual estimada"
          value={inflationRate}
          min={0.5} max={15} step={0.5}
          display={`${inflationRate}%`}
          onChange={setInflationRate}
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
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-gray-50 rounded-2xl p-3 text-center">
          <p className="text-[10px] text-gray-500 font-medium mb-0.5">Hoy valen</p>
          <p className="text-sm font-bold text-gray-900">{formatCurrency(amount)}</p>
        </div>
        <div className="bg-amber-50 rounded-2xl p-3 text-center">
          <p className="text-[10px] text-amber-600 font-medium mb-0.5">En {years} años valen</p>
          <p className="text-sm font-bold text-amber-900">{formatCurrency(calc.purchasingPower)}</p>
        </div>
        <div className="bg-red-50 rounded-2xl p-3 text-center">
          <p className="text-[10px] text-red-500 font-medium mb-0.5">Pierdes poder</p>
          <p className="text-sm font-bold text-red-700">{calc.lossPercent.toFixed(1)}%</p>
        </div>
      </div>

      {/* What you need */}
      <div className="bg-emerald-50 rounded-2xl p-3 flex justify-between items-center">
        <p className="text-xs text-emerald-700">Para mantener el mismo poder adquisitivo necesitarás</p>
        <p className="text-sm font-bold text-emerald-900 ml-2 shrink-0">{formatCurrency(calc.futureEquivalent)}</p>
      </div>

      {/* Chart */}
      <ResponsiveContainer key={dYears} width="100%" height={260}>
        <AreaChart data={calc.chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="valorGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="nominalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#94a3b8" }} />
          <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={36} />
          <Tooltip
            formatter={(value: number, name: string) => [formatCurrency(value), name === "valor" ? "Poder adquisitivo real" : "Valor nominal"]}
            labelFormatter={(label: string) => `Año ${label}`}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Area type="monotone" dataKey="nominal" name="Valor nominal" stroke="#10b981" fill="url(#nominalGrad)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
          <Area type="monotone" dataKey="valor" name="Poder adquisitivo real" stroke="#f59e0b" fill="url(#valorGrad)" strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
      <p className="text-[10px] text-gray-400 text-center">
        La diferencia entre ambas líneas es lo que la inflación te roba cada año.
      </p>
    </div>
  );
}

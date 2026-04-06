"use client";

import { useState, useMemo } from "react";
import { formatCurrency } from "@/lib/utils/currency";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ReferenceLine, ResponsiveContainer } from "recharts";
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

export function FireCalc() {
  const [monthlyExpenses, setMonthlyExpenses] = useState(2000);
  const [currentSavings, setCurrentSavings] = useState(20000);
  const [monthlySavings, setMonthlySavings] = useState(500);
  const [returnRate, setReturnRate] = useState(7);
  const [withdrawalRate, setWithdrawalRate] = useState(4);

  const calc = useMemo(() => {
    const annualExpenses = monthlyExpenses * 12;
    const fireNumber = annualExpenses / (withdrawalRate / 100);
    const monthlyRate = returnRate / 100 / 12;

    // Simulate month by month until we hit FIRE number
    let balance = currentSavings;
    let months = 0;
    const MAX_MONTHS = 600; // 50 years cap

    while (balance < fireNumber && months < MAX_MONTHS) {
      balance = balance * (1 + monthlyRate) + monthlySavings;
      months++;
    }

    const years = months / 12;
    const reached = balance >= fireNumber;

    // Build chart data (yearly points)
    const chartData: { year: number; balance: number; target: number }[] = [];
    let b = currentSavings;
    const totalYears = Math.min(Math.ceil(years) + 5, 50);
    for (let y = 0; y <= totalYears; y++) {
      chartData.push({ year: y, balance: Math.round(b), target: Math.round(fireNumber) });
      for (let m = 0; m < 12; m++) {
        b = b * (1 + monthlyRate) + monthlySavings;
      }
    }

    // Monthly savings needed to reach FIRE in a given timeframe (30 years)
    const targetYears = 30;
    const n = targetYears * 12;
    let neededMonthly = 0;
    if (monthlyRate > 0) {
      const fv = fireNumber - currentSavings * Math.pow(1 + monthlyRate, n);
      neededMonthly = Math.max(0, (fv * monthlyRate) / (Math.pow(1 + monthlyRate, n) - 1));
    } else {
      neededMonthly = Math.max(0, (fireNumber - currentSavings) / n);
    }

    return { fireNumber, annualExpenses, years, reached, chartData, neededMonthly, months };
  }, [monthlyExpenses, currentSavings, monthlySavings, returnRate, withdrawalRate]);

  const yearsInt = Math.floor(calc.years);
  const monthsRem = Math.round((calc.years - yearsInt) * 12);

  return (
    <div className="space-y-4">
      {/* Sliders */}
      <div className="space-y-3 bg-gray-50 rounded-2xl p-4">
        <SliderField
          label="Gastos mensuales actuales"
          value={monthlyExpenses}
          min={500} max={10000} step={100}
          display={formatCurrency(monthlyExpenses)}
          onChange={setMonthlyExpenses}
        />
        <SliderField
          label="Ahorros / inversiones actuales"
          value={currentSavings}
          min={0} max={500000} step={1000}
          display={formatCurrency(currentSavings)}
          onChange={setCurrentSavings}
        />
        <SliderField
          label="Ahorro mensual"
          value={monthlySavings}
          min={0} max={5000} step={50}
          display={formatCurrency(monthlySavings)}
          onChange={setMonthlySavings}
        />
        <SliderField
          label="Rentabilidad anual esperada"
          value={returnRate}
          min={1} max={15} step={0.5}
          display={`${returnRate}%`}
          onChange={setReturnRate}
        />
        <SliderField
          label="Tasa de retirada anual (regla del 4%)"
          value={withdrawalRate}
          min={2} max={6} step={0.5}
          display={`${withdrawalRate}%`}
          onChange={setWithdrawalRate}
        />
      </div>

      {/* Key numbers */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-emerald-50 rounded-2xl p-3 text-center">
          <p className="text-[10px] text-emerald-600 font-medium mb-0.5">Número FIRE</p>
          <p className="text-sm font-bold text-emerald-900">{formatCurrency(calc.fireNumber)}</p>
          <p className="text-[10px] text-emerald-500 mt-0.5">{withdrawalRate}% de tasa de retirada</p>
        </div>
        <div className={`rounded-2xl p-3 text-center ${calc.reached ? "bg-blue-50" : "bg-amber-50"}`}>
          <p className={`text-[10px] font-medium mb-0.5 ${calc.reached ? "text-blue-600" : "text-amber-600"}`}>
            {calc.reached ? "Lo logras en" : "No lo alcanzas en 50 años"}
          </p>
          {calc.reached ? (
            <p className="text-sm font-bold text-blue-900">
              {yearsInt > 0 ? `${yearsInt} años` : ""}{monthsRem > 0 ? ` ${monthsRem} meses` : ""}
            </p>
          ) : (
            <p className="text-sm font-bold text-amber-900">Aumenta el ahorro</p>
          )}
        </div>
      </div>

      {/* Needed monthly savings hint */}
      <div className="bg-gray-50 rounded-2xl p-3 flex justify-between items-center">
        <p className="text-xs text-gray-500">Para lograrlo en 30 años necesitas ahorrar</p>
        <p className="text-sm font-bold text-gray-900">{formatCurrency(calc.neededMonthly)}/mes</p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={calc.chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#94a3b8" }} label={{ value: "Años", position: "insideBottomRight", offset: -5, fontSize: 10, fill: "#94a3b8" }} />
          <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={40} />
          <Tooltip
            formatter={(value: number, name: string) => [formatCurrency(value), name === "balance" ? "Patrimonio" : "Objetivo FIRE"]}
            labelFormatter={(label: string) => `Año ${label}`}
          />
          <ReferenceLine y={calc.fireNumber} stroke="#10b981" strokeDasharray="6 3" strokeWidth={1.5} />
          <Line type="monotone" dataKey="balance" name="balance" stroke="#3b82f6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="target" name="target" stroke="#10b981" strokeWidth={0} dot={false} legendType="none" />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-[10px] text-gray-400 text-center">
        La línea verde es tu número FIRE. La azul, cómo crece tu patrimonio. Basado en la regla del {withdrawalRate}%.
      </p>
    </div>
  );
}

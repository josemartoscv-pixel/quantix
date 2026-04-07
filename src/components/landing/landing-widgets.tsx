"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils/currency";
import { calculateCompoundInterest } from "@/lib/calculations/compound-interest";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function formatK(value: number) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M€`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}k€`;
  return `${value}€`;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-xs">
      <p className="font-bold text-gray-700 mb-1.5">Año {label}</p>
      <p className="text-blue-600 font-semibold">Aportado: {formatCurrency(payload[0]?.value ?? 0)}</p>
      <p className="text-emerald-600 font-semibold">Intereses: {formatCurrency(payload[1]?.value ?? 0)}</p>
      <p className="text-gray-900 font-bold mt-1 border-t border-gray-100 pt-1">
        Total: {formatCurrency((payload[0]?.value ?? 0) + (payload[1]?.value ?? 0))}
      </p>
    </div>
  );
};

export function LandingWidgets() {
  const [monthly, setMonthly] = useState(300);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(7);

  const raw = calculateCompoundInterest(0, rate, years, monthly);

  // Un punto por año
  const chartData = raw
    .filter((_, i) => i % 12 === 11 || i === raw.length - 1)
    .map((d, i) => ({
      year: i + 1,
      aportado: Math.round(d.contributed),
      intereses: Math.round(d.interest),
    }));

  const final = raw[raw.length - 1];

  return (
    <section className="py-5 sm:py-8 bg-[#f5f5f7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-5">
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1">
            Prueba las calculadoras ahora
          </h2>
          <p className="text-sm text-gray-500">Sin registrarte. Sin trucos.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 pt-5 pb-2">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Interés compuesto</p>
            <p className="text-xs text-gray-400">Mueve los sliders y ve cómo crece tu dinero</p>
          </div>

          {/* Result cards */}
          <div className="grid grid-cols-3 gap-2 px-6 pb-4">
            <div className="bg-emerald-50 rounded-2xl p-3 text-center">
              <p className="text-[10px] text-emerald-600 font-medium">Balance final</p>
              <p className="text-sm font-bold text-emerald-900 tabular-nums">{formatCurrency(final?.balance ?? 0)}</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-3 text-center">
              <p className="text-[10px] text-blue-600 font-medium">Aportado</p>
              <p className="text-sm font-bold text-blue-900 tabular-nums">{formatCurrency(final?.contributed ?? 0)}</p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-3 text-center">
              <p className="text-[10px] text-amber-600 font-medium">Intereses</p>
              <p className="text-sm font-bold text-amber-900 tabular-nums">{formatCurrency(final?.interest ?? 0)}</p>
            </div>
          </div>

          {/* Chart */}
          <div className="px-2 pb-2" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradAportado" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="gradIntereses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}a`}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={formatK}
                  width={40}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="aportado"
                  stackId="1"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#gradAportado)"
                  name="Aportado"
                />
                <Area
                  type="monotone"
                  dataKey="intereses"
                  stackId="1"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#gradIntereses)"
                  name="Intereses"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-5 pb-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-400 inline-block" />Aportado</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />Intereses ganados</span>
          </div>

          {/* Sliders */}
          <div className="px-6 pb-4 space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Ahorro mensual</span>
                <span className="font-bold text-gray-900">{formatCurrency(monthly)}</span>
              </div>
              <input type="range" min={20} max={2000} step={20} value={monthly}
                onChange={(e) => setMonthly(+e.target.value)}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-gray-200 accent-emerald-500" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Años</span>
                <span className="font-bold text-gray-900">{years} años</span>
              </div>
              <input type="range" min={1} max={40} step={1} value={years}
                onChange={(e) => setYears(+e.target.value)}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-gray-200 accent-emerald-500" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Rentabilidad anual</span>
                <span className="font-bold text-gray-900">{rate.toFixed(2)}%</span>
              </div>
              <input type="range" min={0.01} max={15} step={0.01} value={rate}
                onChange={(e) => setRate(+e.target.value)}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-gray-200 accent-emerald-500" />
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mx-6 mb-4 bg-amber-50 rounded-xl px-4 py-3 text-xs text-amber-700 leading-relaxed">
            💡 Destinar una parte de tu ahorro a invertir es clave para hacer crecer tu patrimonio a largo plazo. <span className="font-semibold">Las rentabilidades pasadas no garantizan rentabilidades futuras.</span>
          </div>

          {/* CTA */}
          <div className="px-6 pb-6">
            <Link
              href="/register"
              className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-2xl transition-colors text-sm"
            >
              Accede a todas las calculadoras
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/lib/utils/currency";

interface MonthlyData {
  month: string;
  ingresos: number;
  gastos: number;
}

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3">
        <p className="font-semibold text-gray-900 mb-2">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 text-sm">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-600">{entry.name}:</span>
            <span className="font-medium text-gray-900">{formatCurrency(entry.value)}</span>
          </div>
        ))}
        {payload.length === 2 && (
          <div className="mt-2 pt-2 border-t border-gray-100 flex items-center gap-2 text-sm">
            <span className="text-gray-500">Ahorro:</span>
            <span className={`font-bold ${payload[0].value - payload[1].value >= 0 ? "text-emerald-600" : "text-red-500"}`}>
              {formatCurrency(payload[0].value - payload[1].value)}
            </span>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export function MonthlyBarChart({ data }: { data: MonthlyData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
        <defs>
          <linearGradient id="gradIngresos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradGastos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f87171" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend formatter={(value) => <span style={{ fontSize: 12, color: "#64748b" }}>{value}</span>} />
        <Area
          type="monotone"
          dataKey="ingresos"
          name="Ingresos"
          stroke="#10b981"
          strokeWidth={2.5}
          fill="url(#gradIngresos)"
          dot={{ r: 3, fill: "#10b981", strokeWidth: 0 }}
          activeDot={{ r: 5, fill: "#10b981" }}
        />
        <Area
          type="monotone"
          dataKey="gastos"
          name="Gastos"
          stroke="#f87171"
          strokeWidth={2.5}
          fill="url(#gradGastos)"
          dot={{ r: 3, fill: "#f87171", strokeWidth: 0 }}
          activeDot={{ r: 5, fill: "#f87171" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { formatCurrency } from "@/lib/utils/currency";

interface ExpenseData {
  categoryId: string;
  name: string;
  value: number;
  color: string;
}

interface ExpensePieChartProps {
  data: ExpenseData[];
}

const CustomTooltip = ({ active, payload }: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: ExpenseData }>;
}) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3">
        <p className="font-semibold text-gray-900 mb-1">{item.name}</p>
        <p className="text-sm text-gray-600">{formatCurrency(item.value)}</p>
      </div>
    );
  }
  return null;
};

export function ExpensePieChart({ data }: ExpensePieChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        No hay datos para mostrar
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 min-h-64">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1 space-y-2">
        {data.map((item) => (
          <div key={item.categoryId} className="flex items-center justify-between py-1.5 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-gray-700">{item.name}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold text-gray-900">{formatCurrency(item.value)}</span>
              <span className="text-xs text-gray-400 ml-2">
                {total > 0 ? ((item.value / total) * 100).toFixed(0) : 0}%
              </span>
            </div>
          </div>
        ))}
        <div className="pt-2 flex justify-between font-semibold text-sm">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}

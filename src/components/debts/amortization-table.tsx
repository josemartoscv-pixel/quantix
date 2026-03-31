"use client";

import { useState } from "react";
import { generateAmortizationTable, calculateMonthlyPayment } from "@/lib/calculations/debt-payoff";
import { formatCurrency } from "@/lib/utils/currency";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AmortizationTableProps {
  balance: number;
  annualRate: number;
  minimumPayment?: number;
}

export function AmortizationTable({ balance, annualRate, minimumPayment }: AmortizationTableProps) {
  const [extraPayment, setExtraPayment] = useState(0);

  const basePayment = minimumPayment || calculateMonthlyPayment(balance, annualRate, 60);
  const totalMonthlyPayment = basePayment + extraPayment;

  const table = generateAmortizationTable(balance, annualRate, totalMonthlyPayment);
  const displayRows = table.slice(0, 24);
  const totalInterest = table.reduce((s, r) => s + r.interest, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div>
          <Label>Pago extra mensual (€)</Label>
          <Input
            type="number"
            min="0"
            step="10"
            value={extraPayment}
            onChange={(e) => setExtraPayment(parseFloat(e.target.value) || 0)}
            className="w-40 mt-1"
          />
        </div>
        <div className="text-sm text-gray-600">
          <p>Cuota total: <span className="font-semibold">{formatCurrency(totalMonthlyPayment)}</span></p>
          <p>Total intereses: <span className="font-semibold text-red-600">{formatCurrency(totalInterest)}</span></p>
          <p>Meses hasta liquidar: <span className="font-semibold">{table.length}</span></p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2 text-xs text-gray-500 uppercase">Mes</th>
              <th className="text-right px-4 py-2 text-xs text-gray-500 uppercase">Pago</th>
              <th className="text-right px-4 py-2 text-xs text-gray-500 uppercase">Principal</th>
              <th className="text-right px-4 py-2 text-xs text-gray-500 uppercase">Interés</th>
              <th className="text-right px-4 py-2 text-xs text-gray-500 uppercase">Saldo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {displayRows.map((row) => (
              <tr key={row.month} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">{row.month}</td>
                <td className="px-4 py-2 text-right text-gray-900">{formatCurrency(row.payment)}</td>
                <td className="px-4 py-2 text-right text-emerald-600">{formatCurrency(row.principal)}</td>
                <td className="px-4 py-2 text-right text-red-500">{formatCurrency(row.interest)}</td>
                <td className="px-4 py-2 text-right font-medium text-gray-900">{formatCurrency(row.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.length > 24 && (
        <p className="text-xs text-gray-400 text-center">
          Mostrando los primeros 24 meses de {table.length} totales
        </p>
      )}
    </div>
  );
}

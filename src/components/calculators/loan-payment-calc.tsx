"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateMonthlyPayment, generateAmortizationTable } from "@/lib/calculations/debt-payoff";
import { formatCurrency } from "@/lib/utils/currency";

export function LoanPaymentCalc() {
  const [amount, setAmount] = useState("15000");
  const [rate, setRate] = useState("6");
  const [months, setMonths] = useState("60");

  const principal = parseFloat(amount) || 0;
  const annualRate = parseFloat(rate) || 0;
  const term = parseInt(months) || 1;

  const monthlyPayment = principal > 0 ? calculateMonthlyPayment(principal, annualRate, term) : 0;
  const totalPaid = monthlyPayment * term;
  const totalInterest = totalPaid - principal;

  const table = principal > 0 ? generateAmortizationTable(principal, annualRate, monthlyPayment).slice(0, 12) : [];

  return (
    <div className="space-y-6 text-[14px]">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label className="text-[14px]">Importe del préstamo (€)</Label>
          <Input type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 text-[14px]" />
        </div>
        <div>
          <Label className="text-[14px]">Tasa anual (%)</Label>
          <Input type="number" min="0" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="mt-1 text-[14px]" />
        </div>
        <div>
          <Label className="text-[14px]">Plazo (meses)</Label>
          <Input type="number" min="1" max="360" value={months} onChange={(e) => setMonths(e.target.value)} className="mt-1 text-[14px]" />
        </div>
      </div>

      {monthlyPayment > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-emerald-50 rounded-xl p-4 text-center">
            <p className="text-[11px] text-emerald-700 mb-1">Cuota mensual</p>
            <p className="text-[13px] font-bold text-emerald-900">{formatCurrency(monthlyPayment)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-[11px] text-gray-600 mb-1">Total a pagar</p>
            <p className="text-[13px] font-bold text-gray-900">{formatCurrency(totalPaid)}</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 text-center">
            <p className="text-[11px] text-red-700 mb-1">Total intereses</p>
            <p className="text-[13px] font-bold text-red-900">{formatCurrency(totalInterest)}</p>
          </div>
        </div>
      )}

      {table.length > 0 && (
        <div>
          <p className="text-[14px] font-medium text-gray-700 mb-2">Primeras 12 cuotas</p>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-2 text-[11px] text-gray-500">Mes</th>
                  <th className="text-right px-4 py-2 text-[11px] text-gray-500">Cuota</th>
                  <th className="text-right px-4 py-2 text-[11px] text-gray-500">Principal</th>
                  <th className="text-right px-4 py-2 text-[11px] text-gray-500">Interés</th>
                  <th className="text-right px-4 py-2 text-[11px] text-gray-500">Saldo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {table.map((row) => (
                  <tr key={row.month} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{row.month}</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(row.payment)}</td>
                    <td className="px-4 py-2 text-right text-emerald-600">{formatCurrency(row.principal)}</td>
                    <td className="px-4 py-2 text-right text-red-500">{formatCurrency(row.interest)}</td>
                    <td className="px-4 py-2 text-right font-medium">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

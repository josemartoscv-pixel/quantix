"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils/currency";
import { calculateCompoundInterest } from "@/lib/calculations/compound-interest";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function CompoundWidget() {
  const [monthly, setMonthly] = useState(300);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(7);

  const data = calculateCompoundInterest(0, rate, years, monthly);
  const final = data[data.length - 1];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
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

      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Ahorro mensual</span>
            <span className="font-bold text-gray-900">{formatCurrency(monthly)}</span>
          </div>
          <input type="range" min={50} max={2000} step={50} value={monthly}
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
            <span className="font-bold text-gray-900">{rate}%</span>
          </div>
          <input type="range" min={1} max={15} step={0.5} value={rate}
            onChange={(e) => setRate(+e.target.value)}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-gray-200 accent-emerald-500" />
        </div>
      </div>
    </div>
  );
}

function FireWidget() {
  const [expenses, setExpenses] = useState(2000);
  const [savings, setSavings] = useState(500);
  const [current, setCurrent] = useState(10000);

  const fireNumber = expenses * 12 / 0.04;
  const monthlyRate = 0.07 / 12;
  let balance = current;
  let months = 0;
  while (balance < fireNumber && months < 600) {
    balance = balance * (1 + monthlyRate) + savings;
    months++;
  }
  const years = months / 12;
  const reached = balance >= fireNumber;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-emerald-50 rounded-2xl p-3 text-center">
          <p className="text-[10px] text-emerald-600 font-medium">Número FIRE</p>
          <p className="text-sm font-bold text-emerald-900 tabular-nums">{formatCurrency(fireNumber)}</p>
        </div>
        <div className={`rounded-2xl p-3 text-center ${reached ? "bg-blue-50" : "bg-amber-50"}`}>
          <p className={`text-[10px] font-medium ${reached ? "text-blue-600" : "text-amber-600"}`}>
            {reached ? "Lo logras en" : "Más de 50 años"}
          </p>
          <p className={`text-sm font-bold ${reached ? "text-blue-900" : "text-amber-900"}`}>
            {reached ? `${Math.round(years)} años` : "Aumenta el ahorro"}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Gastos mensuales</span>
            <span className="font-bold text-gray-900">{formatCurrency(expenses)}</span>
          </div>
          <input type="range" min={500} max={8000} step={100} value={expenses}
            onChange={(e) => setExpenses(+e.target.value)}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-gray-200 accent-emerald-500" />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Ahorro mensual</span>
            <span className="font-bold text-gray-900">{formatCurrency(savings)}</span>
          </div>
          <input type="range" min={0} max={5000} step={50} value={savings}
            onChange={(e) => setSavings(+e.target.value)}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-gray-200 accent-emerald-500" />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Ahorros actuales</span>
            <span className="font-bold text-gray-900">{formatCurrency(current)}</span>
          </div>
          <input type="range" min={0} max={200000} step={1000} value={current}
            onChange={(e) => setCurrent(+e.target.value)}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-gray-200 accent-emerald-500" />
        </div>
      </div>
    </div>
  );
}

export function LandingWidgets() {
  const [active, setActive] = useState<"interes" | "fire">("interes");

  return (
    <section className="py-8 sm:py-12 bg-[#f5f5f7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-5">
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1">
            Prueba las calculadoras ahora
          </h2>
          <p className="text-sm text-gray-500">Sin registrarte. Sin trucos.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActive("interes")}
              className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${active === "interes" ? "text-emerald-700 border-b-2 border-emerald-500" : "text-gray-400 hover:text-gray-700"}`}
            >
              Interés compuesto
            </button>
            <button
              onClick={() => setActive("fire")}
              className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${active === "fire" ? "text-emerald-700 border-b-2 border-emerald-500" : "text-gray-400 hover:text-gray-700"}`}
            >
              Independencia financiera
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {active === "interes" ? <CompoundWidget /> : <FireWidget />}
          </div>

          {/* CTA */}
          <div className="px-6 pb-6">
            <Link
              href="/register"
              className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-2xl transition-colors text-sm"
            >
              Accede a todas las calculadoras gratis
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

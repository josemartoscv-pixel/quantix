"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { BarChart2, Plus, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const chartData = [
  { mes: "Feb", gastos: 1340, ingresos: 2500 },
  { mes: "Mar", gastos: 1580, ingresos: 2850 },
  { mes: "Abr", gastos: 1120, ingresos: 2500 },
];

const transactions = [
  { icon: "🛒", label: "Supermercado", cat: "Alimentación", amount: -45, date: "Hoy" },
  { icon: "💼", label: "Nómina abril", cat: "Salario", amount: 2500, date: "28 abr" },
  { icon: "🚇", label: "Transporte", cat: "Transporte", amount: -85, date: "27 abr" },
  { icon: "☕", label: "Cafetería", cat: "Restaurantes", amount: -6.5, date: "26 abr" },
];

const steps = [
  { num: 1, label: "Añade un gasto" },
  { num: 2, label: "Ve tus transacciones" },
  { num: 3, label: "Mira la gráfica" },
];

function Step1() {
  const [amount, setAmount] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setAmount("");
    setDone(false);
    const t1 = setTimeout(() => setAmount("45"), 400);
    const t2 = setTimeout(() => setDone(true), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="space-y-3 px-1">
      <div className="flex gap-2 mb-2">
        <div className="flex-1 bg-red-100 text-red-700 text-xs font-bold py-2 rounded-xl text-center">Gasto</div>
        <div className="flex-1 bg-gray-100 text-gray-400 text-xs font-bold py-2 rounded-xl text-center">Ingreso</div>
      </div>
      <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
        <span className="text-xl">🛒</span>
        <div>
          <p className="text-xs text-gray-400">Categoría</p>
          <p className="text-sm font-semibold text-gray-800">Alimentación</p>
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl p-3">
        <p className="text-xs text-gray-400 mb-1">Descripción</p>
        <p className="text-sm font-semibold text-gray-800">Supermercado</p>
      </div>
      <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 mb-1">Cantidad</p>
          <p className={`text-2xl font-bold transition-all duration-500 ${amount ? "text-gray-900" : "text-gray-300"}`}>
            {amount ? `${amount}€` : "0€"}
          </p>
        </div>
        {amount && <span className="text-emerald-500 text-xs font-bold animate-pulse">✓ listo</span>}
      </div>
      <button className={`w-full py-3 rounded-2xl text-sm font-bold transition-all duration-500 flex items-center justify-center gap-2 ${done ? "bg-emerald-500 text-white scale-105" : "bg-emerald-100 text-emerald-400"}`}>
        <Plus className="w-4 h-4" />
        {done ? "¡Guardado!" : "Añadir gasto"}
      </button>
    </div>
  );
}

function Step2() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    setVisible(0);
    const timers = transactions.map((_, i) =>
      setTimeout(() => setVisible(i + 1), i * 350 + 200)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="space-y-2">
      {transactions.map((tx, i) => (
        <div
          key={i}
          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${i < visible ? "opacity-100 translate-y-0 bg-gray-50" : "opacity-0 translate-y-2"}`}
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          <span className="text-xl">{tx.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{tx.label}</p>
            <p className="text-xs text-gray-400">{tx.cat} · {tx.date}</p>
          </div>
          <div className="flex items-center gap-1">
            {tx.amount > 0
              ? <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
              : <ArrowDownLeft className="w-3.5 h-3.5 text-red-400" />}
            <span className={`text-sm font-bold tabular-nums ${tx.amount > 0 ? "text-emerald-600" : "text-red-500"}`}>
              {tx.amount > 0 ? "+" : ""}{tx.amount.toFixed(2).replace(".", ",")}€
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Step3() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-emerald-50 rounded-xl p-3 text-center">
          <p className="text-[10px] text-emerald-600 font-medium">Ingresos</p>
          <p className="text-base font-bold text-emerald-800">2.500€</p>
        </div>
        <div className="bg-red-50 rounded-xl p-3 text-center">
          <p className="text-[10px] text-red-500 font-medium">Gastos</p>
          <p className="text-base font-bold text-red-700">1.120€</p>
        </div>
      </div>
      <div style={{ height: 150 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={4} barCategoryGap="30%">
            <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #f3f4f6" }}
            />
            <Bar dataKey="ingresos" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="gastos" fill="#f87171" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-center text-emerald-600 font-semibold">
        Ahorro este mes: <span className="text-emerald-700 font-bold">1.380€</span>
      </p>
    </div>
  );
}

export function StepsDemo() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((p) => (p + 1) % 3);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1">
            Así de fácil es usarlo
          </h2>
          <p className="text-sm text-gray-400">En menos de un minuto tienes el control</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
          {/* Step selector */}
          <div className="flex sm:flex-col gap-3 w-full sm:w-48 shrink-0">
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-300 ${active === i ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100" : "bg-gray-50 text-gray-500 hover:bg-gray-100"}`}
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${active === i ? "bg-white text-emerald-600" : "bg-gray-200 text-gray-500"}`}>
                  {s.num}
                </span>
                <span className="text-xs font-semibold leading-tight">{s.label}</span>
              </button>
            ))}
          </div>

          {/* Phone mockup */}
          <div className="w-64 shrink-0">
            <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-200 overflow-hidden">
              {/* Phone header */}
              <div className="bg-emerald-600 px-4 py-3 flex items-center gap-2">
                <Image src="/logo.png" alt="DineroyAhorro" width={386} height={54} className="h-5 w-auto brightness-0 invert" />
              </div>
              {/* Phone content */}
              <div className="p-4 min-h-[280px]">
                {active === 0 && <Step1 />}
                {active === 1 && <Step2 />}
                {active === 2 && <Step3 />}
              </div>
              {/* Phone bottom nav */}
              <div className="border-t border-gray-100 px-4 py-2 flex justify-around">
                {["🏠", "💳", "🎯", "🔢"].map((icon, i) => (
                  <span key={i} className="text-base opacity-40">{icon}</span>
                ))}
              </div>
            </div>
            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-4">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${active === i ? "w-6 bg-emerald-500" : "w-1.5 bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

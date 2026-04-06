"use client";

import { useState, useMemo } from "react";
import { formatCurrency } from "@/lib/utils/currency";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

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

export function HouseCalc() {
  const [price, setPrice] = useState(250000);
  const [type, setType] = useState<"nueva" | "segunda">("segunda");
  const [savings, setSavings] = useState(60000);
  const [income, setIncome] = useState(2500);
  const [mortgageRate, setMortgageRate] = useState(3.5);
  const [mortgageYears, setMortgageYears] = useState(30);

  const calc = useMemo(() => {
    // Impuestos
    const taxRate = type === "nueva" ? 0.10 : 0.065;
    const taxLabel = type === "nueva" ? "IVA (10%)" : "ITP (6,5%)";
    const ajd = type === "nueva" ? price * 0.015 : 0; // AJD solo obra nueva
    const taxes = price * taxRate;

    // Gastos adicionales estimados
    const notary = price * 0.005; // ~0,5% notaría
    const registry = price * 0.003; // ~0,3% registro
    const appraisal = 500; // tasación fija estimada
    const gestor = 400; // gestoría fija estimada

    const totalExtras = taxes + ajd + notary + registry + appraisal + gestor;

    // Entrada mínima: 20% del precio
    const minDownPayment = price * 0.20;
    const totalNeeded = minDownPayment + totalExtras;

    // Hipoteca
    const loanAmount = price - minDownPayment;
    const monthlyRate = mortgageRate / 100 / 12;
    const n = mortgageYears * 12;
    const monthlyPayment =
      monthlyRate > 0
        ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, n)) /
          (Math.pow(1 + monthlyRate, n) - 1)
        : loanAmount / n;

    // Ratio cuota/ingresos (recomendado < 35%)
    const ratio = income > 0 ? (monthlyPayment / income) * 100 : 0;

    const canAfford = savings >= totalNeeded && ratio <= 35;
    const savingsOk = savings >= totalNeeded;
    const ratioOk = ratio <= 35;

    return {
      taxLabel,
      taxes,
      ajd,
      notary,
      registry,
      appraisal,
      gestor,
      totalExtras,
      minDownPayment,
      totalNeeded,
      loanAmount,
      monthlyPayment,
      ratio,
      canAfford,
      savingsOk,
      ratioOk,
      shortfall: Math.max(0, totalNeeded - savings),
    };
  }, [price, type, savings, income, mortgageRate, mortgageYears]);

  return (
    <div className="space-y-4">
      {/* Tipo de vivienda */}
      <div className="flex gap-2">
        <button
          onClick={() => setType("segunda")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            type === "segunda"
              ? "bg-emerald-500 text-white shadow-sm"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          Segunda mano
        </button>
        <button
          onClick={() => setType("nueva")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            type === "nueva"
              ? "bg-emerald-500 text-white shadow-sm"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          Obra nueva
        </button>
      </div>

      {/* Sliders */}
      <div className="space-y-3 bg-gray-50 rounded-2xl p-4">
        <SliderField
          label="Precio de la vivienda"
          value={price}
          min={50000} max={1000000} step={1000}
          display={formatCurrency(price)}
          onChange={setPrice}
        />
        <SliderField
          label="Ahorros disponibles"
          value={savings}
          min={0} max={500000} step={1000}
          display={formatCurrency(savings)}
          onChange={setSavings}
        />
        <SliderField
          label="Ingresos netos mensuales"
          value={income}
          min={500} max={10000} step={100}
          display={formatCurrency(income)}
          onChange={setIncome}
        />
        <SliderField
          label="Tipo de interés hipoteca"
          value={mortgageRate}
          min={0.5} max={8} step={0.01}
          display={`${mortgageRate.toFixed(2)}%`}
          onChange={setMortgageRate}
        />
        <SliderField
          label="Plazo hipoteca"
          value={mortgageYears}
          min={5} max={40} step={1}
          display={`${mortgageYears} años`}
          onChange={setMortgageYears}
        />
      </div>

      {/* Desglose de gastos */}
      <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Desglose de gastos</p>

        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Entrada mínima (20%)</span>
            <span className="font-semibold text-gray-900">{formatCurrency(calc.minDownPayment)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{calc.taxLabel}</span>
            <span className="font-semibold text-red-500">{formatCurrency(calc.taxes)}</span>
          </div>
          {calc.ajd > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">AJD (~1,5%)</span>
              <span className="font-semibold text-red-500">{formatCurrency(calc.ajd)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Notaría (~0,5%)</span>
            <span className="font-semibold text-gray-500">{formatCurrency(calc.notary)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Registro (~0,3%)</span>
            <span className="font-semibold text-gray-500">{formatCurrency(calc.registry)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tasación + Gestoría</span>
            <span className="font-semibold text-gray-500">{formatCurrency(calc.appraisal + calc.gestor)}</span>
          </div>
          <div className="h-px bg-gray-200 my-2" />
          <div className="flex justify-between text-sm font-bold">
            <span className="text-gray-900">Total necesario</span>
            <span className="text-gray-900">{formatCurrency(calc.totalNeeded)}</span>
          </div>
        </div>
      </div>

      {/* Hipoteca */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-blue-50 rounded-2xl p-3 text-center">
          <p className="text-[10px] text-blue-600 font-medium mb-0.5">Hipoteca necesaria</p>
          <p className="text-sm font-bold text-blue-900">{formatCurrency(calc.loanAmount)}</p>
        </div>
        <div className={`rounded-2xl p-3 text-center ${calc.ratioOk ? "bg-emerald-50" : "bg-red-50"}`}>
          <p className={`text-[10px] font-medium mb-0.5 ${calc.ratioOk ? "text-emerald-600" : "text-red-500"}`}>Cuota mensual</p>
          <p className={`text-sm font-bold ${calc.ratioOk ? "text-emerald-900" : "text-red-700"}`}>{formatCurrency(calc.monthlyPayment)}</p>
          <p className={`text-[10px] mt-0.5 ${calc.ratioOk ? "text-emerald-500" : "text-red-400"}`}>{calc.ratio.toFixed(1)}% de tus ingresos</p>
        </div>
      </div>

      {/* Resultado final */}
      <div className={`rounded-2xl p-4 ${calc.canAfford ? "bg-emerald-50" : "bg-red-50"}`}>
        <div className="flex items-start gap-3">
          {calc.canAfford ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          )}
          <div className="space-y-1">
            <p className={`text-sm font-bold ${calc.canAfford ? "text-emerald-800" : "text-red-800"}`}>
              {calc.canAfford ? "¡Estás en posición de comprar!" : "Todavía no es el momento"}
            </p>
            {!calc.savingsOk && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                Te faltan {formatCurrency(calc.shortfall)} de ahorros para cubrir entrada y gastos
              </p>
            )}
            {!calc.ratioOk && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                La cuota supera el 35% de tus ingresos (máximo recomendado)
              </p>
            )}
            {calc.canAfford && (
              <p className="text-xs text-emerald-600">
                Tienes suficientes ahorros y la cuota está dentro del límite recomendado.
              </p>
            )}
          </div>
        </div>
      </div>

      <p className="text-[10px] text-gray-400 text-center">
        Cálculo orientativo. Los impuestos pueden variar según la comunidad autónoma. Consulta siempre con un profesional.
      </p>
    </div>
  );
}

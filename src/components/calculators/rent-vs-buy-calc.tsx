"use client";

import { useState, useMemo, useDeferredValue } from "react";
import { formatCurrency } from "@/lib/utils/currency";
import { Home, TrendingUp } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ReferenceLine, ResponsiveContainer } from "recharts";
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
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-gray-200 accent-emerald-500"
      />
    </div>
  );
}

export function RentVsBuyCalc() {
  const [housePrice, setHousePrice] = useState(250000);
  const [monthlyRent, setMonthlyRent] = useState(900);
  const [mortgageRate, setMortgageRate] = useState(3.5);
  const [mortgageYears, setMortgageYears] = useState(30);
  const [appreciation, setAppreciation] = useState(3);
  const [rentIncrease, setRentIncrease] = useState(3);
  const [investReturn, setInvestReturn] = useState(7);
  const [years, setYears] = useState(20);

  const dHousePrice = useDeferredValue(housePrice);
  const dMonthlyRent = useDeferredValue(monthlyRent);
  const dMortgageRate = useDeferredValue(mortgageRate);
  const dMortgageYears = useDeferredValue(mortgageYears);
  const dAppreciation = useDeferredValue(appreciation);
  const dRentIncrease = useDeferredValue(rentIncrease);
  const dInvestReturn = useDeferredValue(investReturn);
  const dYears = useDeferredValue(years);

  const calc = useMemo(() => {
    // --- Compra ---
    const downPayment = dHousePrice * 0.20;
    const taxes = dHousePrice * 0.065; // ITP segunda mano
    const fees = dHousePrice * 0.018; // notaría + registro + gestoría
    const upfront = downPayment + taxes + fees;
    const loan = dHousePrice - downPayment;
    const mr = dMortgageRate / 100 / 12;
    const n = dMortgageYears * 12;
    const monthlyMortgage = mr > 0
      ? (loan * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1)
      : loan / n;
    const annualMaintenance = dHousePrice * 0.01; // 1% mantenimiento

    // --- Coste acumulado por año ---
    const chartData: { year: number; compra: number; alquiler: number }[] = [];
    let buyCumulative = upfront; // costes totales acumulados netos
    let rentCumulative = 0;
    let currentRent = dMonthlyRent;
    let propertyValue = dHousePrice;
    let remainingLoan = loan;
    let investedCapital = upfront; // capital invertido si alquilas

    let breakEvenYear: number | null = null;

    for (let y = 1; y <= dYears; y++) {
      // Compra: pago hipoteca + mantenimiento - revalorización
      const mortgageAnnual = monthlyMortgage * 12;
      propertyValue *= (1 + dAppreciation / 100);
      // Reducción del préstamo este año (simplificado)
      for (let m = 0; m < 12; m++) {
        const interest = remainingLoan * mr;
        const principal = monthlyMortgage - interest;
        remainingLoan = Math.max(0, remainingLoan - principal);
      }
      const equity = propertyValue - remainingLoan;
      buyCumulative += mortgageAnnual + annualMaintenance;
      const buyNetCost = buyCumulative - equity; // coste neto = pagado - patrimonio generado

      // Alquiler: pago alquiler + oportunidad de invertir el down payment
      rentCumulative += currentRent * 12;
      currentRent *= (1 + dRentIncrease / 100);
      investedCapital *= (1 + dInvestReturn / 100);
      const rentNetCost = rentCumulative - (investedCapital - upfront); // coste neto = alquiler - ganancia inversión

      chartData.push({
        year: y,
        compra: Math.round(buyNetCost),
        alquiler: Math.round(rentNetCost),
      });

      if (breakEvenYear === null && buyNetCost < rentNetCost) {
        breakEvenYear = y;
      }
    }

    const lastYear = chartData[chartData.length - 1];
    const buyWins = lastYear.compra < lastYear.alquiler;

    return {
      downPayment,
      taxes,
      fees,
      upfront,
      monthlyMortgage,
      chartData,
      breakEvenYear,
      buyWins,
      lastBuy: lastYear.compra,
      lastRent: lastYear.alquiler,
      diff: Math.abs(lastYear.compra - lastYear.alquiler),
    };
  }, [dHousePrice, dMonthlyRent, dMortgageRate, dMortgageYears, dAppreciation, dRentIncrease, dInvestReturn, dYears]);

  return (
    <div className="space-y-4">
      {/* Sliders — dos columnas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3 bg-gray-50 rounded-2xl p-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Vivienda</p>
          <SliderField label="Precio de compra" value={housePrice} min={50000} max={800000} step={5000} display={formatCurrency(housePrice)} onChange={setHousePrice} />
          <SliderField label="Alquiler mensual equivalente" value={monthlyRent} min={200} max={5000} step={50} display={formatCurrency(monthlyRent)} onChange={setMonthlyRent} />
          <SliderField label="Tipo hipoteca" value={mortgageRate} min={0.5} max={8} step={0.1} display={`${mortgageRate.toFixed(1)}%`} onChange={setMortgageRate} />
          <SliderField label="Plazo hipoteca" value={mortgageYears} min={5} max={40} step={1} display={`${mortgageYears} años`} onChange={setMortgageYears} />
        </div>
        <div className="space-y-3 bg-gray-50 rounded-2xl p-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Escenario</p>
          <SliderField label="Revalorización anual del piso" value={appreciation} min={0} max={8} step={0.5} display={`${appreciation}%`} onChange={setAppreciation} />
          <SliderField label="Subida anual del alquiler" value={rentIncrease} min={0} max={8} step={0.5} display={`${rentIncrease}%`} onChange={setRentIncrease} />
          <SliderField label="Rentabilidad si inviertes la entrada" value={investReturn} min={1} max={15} step={0.5} display={`${investReturn}%`} onChange={setInvestReturn} />
          <SliderField label="Años a comparar" value={years} min={5} max={40} step={1} display={`${years} años`} onChange={setYears} />
        </div>
      </div>

      {/* Costes iniciales */}
      <div className="bg-gray-50 rounded-2xl p-4 space-y-1.5">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Costes iniciales de compra</p>
        <div className="flex justify-between text-sm"><span className="text-gray-500">Entrada (20%)</span><span className="font-semibold">{formatCurrency(calc.downPayment)}</span></div>
        <div className="flex justify-between text-sm"><span className="text-gray-500">ITP + notaría + registro</span><span className="font-semibold text-red-500">{formatCurrency(calc.taxes + calc.fees)}</span></div>
        <div className="h-px bg-gray-200 my-1" />
        <div className="flex justify-between text-sm font-bold"><span>Total desembolso inicial</span><span>{formatCurrency(calc.upfront)}</span></div>
        <div className="flex justify-between text-sm"><span className="text-gray-500">Cuota hipoteca mensual</span><span className="font-semibold text-blue-600">{formatCurrency(calc.monthlyMortgage)}</span></div>
      </div>

      {/* Veredicto */}
      <div className={`rounded-2xl p-4 ${calc.buyWins ? "bg-emerald-50" : "bg-blue-50"}`}>
        <div className="flex items-center gap-3">
          {calc.buyWins
            ? <Home className="w-6 h-6 text-emerald-500 shrink-0" />
            : <TrendingUp className="w-6 h-6 text-blue-500 shrink-0" />
          }
          <div>
            <p className={`text-sm font-bold ${calc.buyWins ? "text-emerald-800" : "text-blue-800"}`}>
              {calc.buyWins ? "En este escenario, comprar es mejor" : "En este escenario, alquilar e invertir es mejor"}
            </p>
            <p className={`text-xs mt-0.5 ${calc.buyWins ? "text-emerald-600" : "text-blue-600"}`}>
              A {years} años, {calc.buyWins ? "comprar" : "alquilar"} te sale {formatCurrency(calc.diff)} más barato en coste neto
              {calc.breakEvenYear && calc.buyWins && ` · Punto de equilibrio: año ${calc.breakEvenYear}`}
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer key={dYears} width="100%" height={260}>
        <LineChart data={calc.chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#94a3b8" }} label={{ value: "Años", position: "insideBottomRight", offset: -5, fontSize: 10, fill: "#94a3b8" }} />
          <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={40} />
          <Tooltip formatter={(value: number, name: string) => [formatCurrency(value), name === "compra" ? "Coste neto compra" : "Coste neto alquiler"]} labelFormatter={(l: string) => `Año ${l}`} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {calc.breakEvenYear && <ReferenceLine x={calc.breakEvenYear} stroke="#10b981" strokeDasharray="4 4" label={{ value: "Equilibrio", fontSize: 10, fill: "#10b981" }} />}
          <Line type="monotone" dataKey="compra" name="Compra" stroke="#10b981" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="alquiler" name="Alquiler + inversión" stroke="#3b82f6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-[10px] text-gray-400 text-center">
        Coste neto = lo pagado total menos el patrimonio generado (equity de la vivienda o ganancias de inversión). Cálculo orientativo.
      </p>
    </div>
  );
}

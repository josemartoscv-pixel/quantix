"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils/currency";

export function BudgetRuleHelper() {
  const [income, setIncome] = useState("");
  const incomeNum = parseFloat(income) || 0;

  const needs = incomeNum * 0.5;
  const wants = incomeNum * 0.3;
  const savings = incomeNum * 0.2;

  const needsCategories = ["Vivienda", "Alimentación", "Transporte", "Salud", "Seguros"];
  const wantsCategories = ["Restaurantes", "Entretenimiento", "Ropa y calzado", "Tecnología", "Viajes"];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Calculator className="w-4 h-4 mr-2" />
          Regla 50/30/20
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Regla 50/30/20 para tu presupuesto</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div>
            <Label htmlFor="income-input">Ingreso mensual neto (€)</Label>
            <Input
              id="income-input"
              type="number"
              min="0"
              step="50"
              placeholder="Ej: 2000"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="mt-1"
            />
          </div>

          {incomeNum > 0 && (
            <div className="space-y-4">
              {/* Necesidades 50% */}
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold text-blue-900">50% — Necesidades</p>
                    <p className="text-xs text-blue-700">Gastos esenciales para vivir</p>
                  </div>
                  <p className="text-xl font-bold text-blue-900">{formatCurrency(needs)}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {needsCategories.map((cat) => (
                    <span key={cat} className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deseos 30% */}
              <div className="bg-violet-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold text-violet-900">30% — Deseos</p>
                    <p className="text-xs text-violet-700">Lo que mejora tu calidad de vida</p>
                  </div>
                  <p className="text-xl font-bold text-violet-900">{formatCurrency(wants)}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {wantsCategories.map((cat) => (
                    <span key={cat} className="text-xs bg-violet-100 text-violet-800 px-2 py-0.5 rounded-full">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ahorro 20% */}
              <div className="bg-emerald-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold text-emerald-900">20% — Ahorro e inversión</p>
                    <p className="text-xs text-emerald-700">Para tu futuro y metas</p>
                  </div>
                  <p className="text-xl font-bold text-emerald-900">{formatCurrency(savings)}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {["Fondo emergencia", "Inversiones", "Metas de ahorro"].map((cat) => (
                    <span key={cat} className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

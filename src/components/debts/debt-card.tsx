"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Pencil, Trash2, PlusCircle, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DebtForm } from "./debt-form";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { formatCurrency } from "@/lib/utils/currency";
import { paymentSchema, type PaymentFormData } from "@/lib/validations/debt";
import { cn } from "@/lib/utils";

const debtTypeLabels: Record<string, string> = {
  hipoteca: "Hipoteca",
  "prestamo-personal": "Préstamo personal",
  "prestamo-coche": "Préstamo coche",
  "tarjeta-credito": "Tarjeta crédito",
  "prestamo-estudios": "Préstamo estudios",
  "credito-consumo": "Crédito consumo",
  otro: "Otro",
};

interface Debt {
  id: string;
  name: string;
  type: string;
  initialAmount: number;
  currentBalance: number;
  interestRate: number;
  minimumPayment?: number | null;
  remainingYears?: number | null;
  remainingMonths?: number | null;
  lender?: string | null;
  notes?: string | null;
  startDate: string;
  isActive: boolean;
}

function PaymentDialog({ debtId, onSuccess }: { debtId: string; onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<PaymentFormData>({
      resolver: zodResolver(paymentSchema),
      defaultValues: { date: new Date().toISOString().split("T")[0] },
    });

  const onSubmit = async (data: PaymentFormData) => {
    try {
      const res = await fetch(`/api/debts/${debtId}/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success("Pago registrado correctamente");
      setOpen(false);
      reset();
      onSuccess();
    } catch {
      toast.error("Error al registrar el pago");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <PlusCircle className="w-4 h-4 mr-2" />
          Registrar pago
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Registrar pago</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Importe pagado (€)</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="0,00"
              {...register("amount", { valueAsNumber: true })}
            />
            {errors.amount && <p className="text-red-600 text-xs mt-1">{errors.amount.message}</p>}
          </div>
          <div>
            <Label>Fecha</Label>
            <Input type="date" {...register("date")} />
          </div>
          <div>
            <Label>Notas (opcional)</Label>
            <Input placeholder="..." {...register("notes")} />
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Registrar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface DebtCardProps {
  debt: Debt;
  onRefresh: () => void;
}

function AmortizationTable({ balance, interestRate, payment }: { balance: number; interestRate: number; payment: number }) {
  const rows = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const result = [];
    let remaining = balance;
    const maxMonths = 360;
    for (let i = 1; i <= maxMonths && remaining > 0.01; i++) {
      const interest = remaining * monthlyRate;
      const principal = Math.min(payment - interest, remaining);
      if (principal <= 0) break;
      remaining = remaining - principal;
      result.push({
        month: i,
        payment: Math.min(payment, interest + Math.max(principal, 0)),
        interest,
        principal: Math.max(principal, 0),
        balance: Math.max(remaining, 0),
      });
      if (result.length >= 60) { // show max 5 years
        break;
      }
    }
    return result;
  }, [balance, interestRate, payment]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left py-1.5 px-2 text-gray-400 font-semibold">Mes</th>
            <th className="text-right py-1.5 px-2 text-gray-400 font-semibold">Cuota</th>
            <th className="text-right py-1.5 px-2 text-red-400 font-semibold">Interés</th>
            <th className="text-right py-1.5 px-2 text-emerald-600 font-semibold">Capital</th>
            <th className="text-right py-1.5 px-2 text-gray-400 font-semibold">Pendiente</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.month} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <td className="py-1.5 px-2 text-gray-500">{row.month}</td>
              <td className="py-1.5 px-2 text-right text-gray-700 font-medium">{formatCurrency(row.payment)}</td>
              <td className="py-1.5 px-2 text-right text-red-500">{formatCurrency(row.interest)}</td>
              <td className="py-1.5 px-2 text-right text-emerald-600">{formatCurrency(row.principal)}</td>
              <td className="py-1.5 px-2 text-right text-gray-500">{formatCurrency(row.balance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length >= 60 && (
        <p className="text-[10px] text-gray-400 text-center py-2">Mostrando primeros 60 meses</p>
      )}
    </div>
  );
}

export function DebtCard({ debt, onRefresh }: DebtCardProps) {
  const [showAmortization, setShowAmortization] = useState(false);
  const paidOff = ((debt.initialAmount - debt.currentBalance) / debt.initialAmount) * 100;

  const handleDelete = async () => {
    const res = await fetch(`/api/debts/${debt.id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deuda eliminada");
      onRefresh();
    } else {
      toast.error("Error al eliminar");
    }
  };

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">{debt.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {debtTypeLabels[debt.type] || debt.type}
              </Badge>
              {debt.lender && (
                <span className="text-xs text-gray-400">{debt.lender}</span>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <DebtForm
              initialData={debt}
              onSuccess={onRefresh}
              trigger={
                <Button variant="ghost" size="icon">
                  <Pencil className="w-4 h-4 text-gray-400" />
                </Button>
              }
            />
            <ConfirmDialog
              trigger={
                <Button variant="ghost" size="icon">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </Button>
              }
              title="Eliminar deuda"
              description="¿Estás seguro de que quieres eliminar esta deuda?"
              onConfirm={handleDelete}
              confirmLabel="Eliminar"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Saldo pendiente</span>
            <span className="text-lg font-bold text-red-600">
              {formatCurrency(debt.currentBalance)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Tipo de interés</span>
            <span className="font-medium text-gray-700">{debt.interestRate}% anual</span>
          </div>

          {debt.minimumPayment && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Pago mínimo</span>
              <span className="font-medium text-gray-700">{formatCurrency(debt.minimumPayment)}/mes</span>
            </div>
          )}

          {debt.type === "hipoteca" && (debt.remainingYears != null || debt.remainingMonths != null) && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Plazo pendiente</span>
              <span className="font-medium text-gray-700">
                {[
                  debt.remainingYears ? `${debt.remainingYears} año${debt.remainingYears !== 1 ? "s" : ""}` : null,
                  debt.remainingMonths ? `${debt.remainingMonths} mes${debt.remainingMonths !== 1 ? "es" : ""}` : null,
                ].filter(Boolean).join(" y ")}
              </span>
            </div>
          )}

          {/* Progress */}
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Amortizado</span>
              <span>{paidOff.toFixed(0)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${paidOff}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatCurrency(debt.initialAmount - debt.currentBalance)} pagado</span>
              <span>Total: {formatCurrency(debt.initialAmount)}</span>
            </div>
          </div>

          <PaymentDialog debtId={debt.id} onSuccess={onRefresh} />

          {debt.minimumPayment && debt.interestRate > 0 && (
            <button
              onClick={() => setShowAmortization(!showAmortization)}
              className="w-full flex items-center justify-between text-xs text-gray-400 hover:text-gray-600 transition-colors py-1 mt-1"
            >
              <span className="font-semibold">Tabla de amortización</span>
              {showAmortization ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}

          {showAmortization && debt.minimumPayment && debt.interestRate > 0 && (
            <div className="border border-gray-100 rounded-xl overflow-hidden mt-1">
              <AmortizationTable
                balance={debt.currentBalance}
                interestRate={debt.interestRate}
                payment={debt.minimumPayment}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

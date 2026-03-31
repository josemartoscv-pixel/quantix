"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Pencil, Trash2, PlusCircle, Loader2 } from "lucide-react";
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

export function DebtCard({ debt, onRefresh }: DebtCardProps) {
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
        </div>
      </CardContent>
    </Card>
  );
}

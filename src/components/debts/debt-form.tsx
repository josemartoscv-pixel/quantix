"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debtSchema, type DebtFormData } from "@/lib/validations/debt";

const DEBT_TYPES = [
  { id: "hipoteca", name: "Hipoteca" },
  { id: "prestamo-personal", name: "Préstamo personal" },
  { id: "prestamo-coche", name: "Préstamo de coche" },
  { id: "tarjeta-credito", name: "Tarjeta de crédito" },
  { id: "prestamo-estudios", name: "Préstamo estudios" },
  { id: "credito-consumo", name: "Crédito al consumo" },
  { id: "otro", name: "Otro" },
];

interface DebtFormProps {
  onSuccess: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: Record<string, any> & { id?: string };
  trigger?: React.ReactNode;
}

export function DebtForm({ onSuccess, initialData, trigger }: DebtFormProps) {
  const [open, setOpen] = useState(false);
  const isEditing = !!initialData?.id;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } =
    useForm<DebtFormData>({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolver: zodResolver(debtSchema) as any,
      defaultValues: {
        name: initialData?.name || "",
        type: initialData?.type || "",
        initialAmount: initialData?.initialAmount,
        currentBalance: initialData?.currentBalance,
        interestRate: initialData?.interestRate,
        minimumPayment: initialData?.minimumPayment,
        startDate: initialData?.startDate || new Date().toISOString().split("T")[0],
        remainingYears: initialData?.remainingYears ?? undefined,
        remainingMonths: initialData?.remainingMonths ?? undefined,
        lender: initialData?.lender || "",
        notes: initialData?.notes || "",
      },
    });

  const onSubmit = async (data: DebtFormData) => {
    try {
      const url = isEditing ? `/api/debts/${initialData.id}` : "/api/debts";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success(isEditing ? "Deuda actualizada" : "Deuda registrada correctamente");
      setOpen(false);
      reset();
      onSuccess();
    } catch {
      toast.error("Error al guardar la deuda");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Añadir deuda
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar deuda" : "Registrar nueva deuda"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nombre</Label>
              <Input
                placeholder="Ej: Hipoteca piso"
                {...register("name")}
                className={errors.name ? "border-red-300" : ""}
              />
              {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Label>Tipo</Label>
              <Select
                value={watch("type")}
                onValueChange={(v) => setValue("type", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {DEBT_TYPES.map((t) => (
                    <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && <p className="text-red-600 text-xs mt-1">{errors.type.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Importe inicial (€)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0,00"
                {...register("initialAmount", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label>Saldo actual (€)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0,00"
                {...register("currentBalance", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Interés anual (%)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0,00"
                {...register("interestRate", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label>Pago mínimo (€/mes)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0,00"
                {...register("minimumPayment", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Fecha inicio</Label>
              <Input type="date" {...register("startDate")} />
            </div>
            <div>
              <Label>Prestamista</Label>
              <Input placeholder="Ej: BBVA" {...register("lender")} />
            </div>
          </div>

          {watch("type") === "hipoteca" && (
            <div>
              <Label className="mb-2 block">Plazo pendiente de la hipoteca</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500">Años restantes</Label>
                  <Input
                    type="number"
                    min="0"
                    max="50"
                    placeholder="Ej: 20"
                    {...register("remainingYears", { valueAsNumber: true })}
                    className="mt-1"
                  />
                  {errors.remainingYears && <p className="text-red-600 text-xs mt-1">{errors.remainingYears.message}</p>}
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Meses adicionales</Label>
                  <Input
                    type="number"
                    min="0"
                    max="11"
                    placeholder="Ej: 6"
                    {...register("remainingMonths", { valueAsNumber: true })}
                    className="mt-1"
                  />
                  {errors.remainingMonths && <p className="text-red-600 text-xs mt-1">{errors.remainingMonths.message}</p>}
                </div>
              </div>
            </div>
          )}

          <div>
            <Label>Notas (opcional)</Label>
            <Input placeholder="Notas adicionales..." {...register("notes")} />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Guardando...</> : isEditing ? "Actualizar" : "Registrar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

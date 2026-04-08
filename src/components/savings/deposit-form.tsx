"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
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
import { depositSchema, type DepositFormData } from "@/lib/validations/savings";

interface DepositFormProps {
  goalId: string;
  onSuccess: () => void;
  trigger?: React.ReactNode;
}

export function DepositForm({ goalId, onSuccess, trigger }: DepositFormProps) {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<DepositFormData>({
      resolver: zodResolver(depositSchema),
      defaultValues: {
        date: new Date().toISOString().split("T")[0],
        notes: "",
      },
    });

  const onSubmit = async (data: DepositFormData) => {
    try {
      const res = await fetch(`/api/savings-goals/${goalId}/deposits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success("Depósito añadido correctamente");
      setOpen(false);
      reset();
      onSuccess();
    } catch {
      toast.error("Error al añadir el depósito");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button size="sm">Añadir depósito</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Añadir depósito</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Importe (€)</Label>
            <Input
              type="text"
              inputMode="decimal"
              placeholder="0,00"
              {...register("amount", { setValueAs: (v: string) => parseFloat(String(v).replace(",", ".")) })}
              className={errors.amount ? "border-red-300" : ""}
            />
            {errors.amount && <p className="text-red-600 text-xs mt-1">{errors.amount.message}</p>}
          </div>
          <div>
            <Label>Fecha</Label>
            <Input type="date" {...register("date")} />
          </div>
          <div>
            <Label>Notas (opcional)</Label>
            <Input placeholder="Notas sobre este depósito..." {...register("notes")} />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Guardando...</> : "Añadir"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

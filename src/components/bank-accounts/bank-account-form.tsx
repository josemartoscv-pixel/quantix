"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ACCOUNT_TYPES = [
  { id: "checking", label: "Cuenta corriente" },
  { id: "savings", label: "Cuenta de ahorro" },
  { id: "credit", label: "Tarjeta de crédito" },
  { id: "cash", label: "Efectivo" },
  { id: "investment", label: "Inversión / Broker" },
];

const COLORS = [
  "#10b981", "#3b82f6", "#8b5cf6", "#f59e0b",
  "#ef4444", "#ec4899", "#06b6d4", "#84cc16",
];

const schema = z.object({
  name: z.string().min(1, "El nombre es obligatorio").max(50),
  type: z.enum(["checking", "savings", "credit", "cash", "investment"]),
  color: z.string(),
  isDefault: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

interface BankAccount {
  id: string;
  name: string;
  type: string;
  color: string;
  isDefault: boolean;
}

interface BankAccountFormProps {
  onSuccess: () => void;
  initialData?: BankAccount;
  trigger?: React.ReactNode;
}

export function BankAccountForm({ onSuccess, initialData, trigger }: BankAccountFormProps) {
  const [open, setOpen] = useState(false);
  const isEditing = !!initialData?.id;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
        name: initialData?.name ?? "",
        type: (initialData?.type as FormData["type"]) ?? "checking",
        color: initialData?.color ?? "#10b981",
        isDefault: initialData?.isDefault ?? false,
      },
    });

  const selectedColor = watch("color");

  const onSubmit = async (data: FormData) => {
    try {
      const url = isEditing ? `/api/bank-accounts/${initialData.id}` : "/api/bank-accounts";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success(isEditing ? "Cuenta actualizada" : "Cuenta creada");
      setOpen(false);
      reset();
      onSuccess();
    } catch {
      toast.error("Error al guardar la cuenta");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Nueva cuenta
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar cuenta" : "Nueva cuenta bancaria"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Nombre de la cuenta</Label>
            <Input placeholder="Ej: BBVA, Caja Rural, Efectivo..." {...register("name")} className="mt-1" />
            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label>Tipo</Label>
            <Select value={watch("type")} onValueChange={(v) => setValue("type", v as FormData["type"])}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                {ACCOUNT_TYPES.map((t) => (
                  <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Color identificativo</Label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setValue("color", color)}
                  className="w-8 h-8 rounded-full border-2 transition-all"
                  style={{
                    backgroundColor: color,
                    borderColor: selectedColor === color ? "#1f2937" : "transparent",
                    transform: selectedColor === color ? "scale(1.15)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isDefault"
              {...register("isDefault")}
              className="w-4 h-4 accent-emerald-600"
            />
            <Label htmlFor="isDefault" className="cursor-pointer">
              Marcar como cuenta principal
            </Label>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : isEditing ? "Guardar" : "Crear cuenta"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

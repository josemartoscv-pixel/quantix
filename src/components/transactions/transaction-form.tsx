"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { transactionSchema, type TransactionFormData } from "@/lib/validations/transaction";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/lib/constants/categories";
import { cn } from "@/lib/utils";

interface BankAccount {
  id: string;
  name: string;
  color: string;
  isDefault: boolean;
}

interface TransactionFormProps {
  onSuccess?: () => void;
  initialData?: Partial<TransactionFormData> & { id?: string; bankAccountId?: string | null };
  trigger?: React.ReactNode;
}

export function TransactionForm({ onSuccess, initialData, trigger }: TransactionFormProps) {
  const [open, setOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<"INCOME" | "EXPENSE">(
    (initialData?.type as "INCOME" | "EXPENSE") || "EXPENSE"
  );
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [selectedBankAccount, setSelectedBankAccount] = useState<string>(
    initialData?.bankAccountId ?? "none"
  );

  const isEditing = !!initialData?.id;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } =
    useForm<TransactionFormData>({
      resolver: zodResolver(transactionSchema),
      defaultValues: {
        type: initialData?.type || "EXPENSE",
        categoryId: initialData?.categoryId || "",
        description: initialData?.description || "",
        date: initialData?.date || new Date().toISOString().split("T")[0],
        notes: initialData?.notes || "",
        isRecurring: initialData?.isRecurring || false,
        amount: initialData?.amount || undefined,
      },
    });

  useEffect(() => {
    if (open) {
      fetch("/api/bank-accounts")
        .then((r) => r.json())
        .then((data) => {
          setBankAccounts(data.accounts ?? []);
          // Auto-select default account when creating new
          if (!isEditing && !initialData?.bankAccountId) {
            const def = (data.accounts ?? []).find((a: BankAccount) => a.isDefault);
            if (def) setSelectedBankAccount(def.id);
          }
        })
        .catch(() => {});
    }
  }, [open, isEditing, initialData?.bankAccountId]);

  const categories = transactionType === "INCOME" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleTypeChange = (type: "INCOME" | "EXPENSE") => {
    setTransactionType(type);
    setValue("type", type);
    setValue("categoryId", "");
  };

  const onSubmit = async (data: TransactionFormData) => {
    try {
      const url = isEditing ? `/api/transactions/${initialData.id}` : "/api/transactions";
      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          bankAccountId: selectedBankAccount === "none" ? null : selectedBankAccount,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success(isEditing ? "Transacción actualizada" : "Transacción creada");
      setOpen(false);
      reset();
      onSuccess?.();
    } catch {
      toast.error("Error al guardar la transacción");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {isEditing ? "Editar" : "Nueva transacción"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar transacción" : "Nueva transacción"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Type toggle */}
          <div>
            <Label>Tipo</Label>
            <div className="flex gap-2 mt-1">
              {(["EXPENSE", "INCOME"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleTypeChange(t)}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-sm font-medium transition-colors border",
                    transactionType === t
                      ? t === "EXPENSE"
                        ? "bg-red-500 text-white border-red-500"
                        : "bg-emerald-500 text-white border-emerald-500"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                  )}
                >
                  {t === "EXPENSE" ? "Gasto" : "Ingreso"}
                </button>
              ))}
            </div>
            <input type="hidden" {...register("type")} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Importe (€)</Label>
              <Input
                type="number" step="0.01" min="0" placeholder="0,00"
                {...register("amount", { valueAsNumber: true })}
                className={cn("mt-1", errors.amount && "border-red-300")}
              />
              {errors.amount && <p className="text-red-600 text-xs mt-1">{errors.amount.message}</p>}
            </div>
            <div>
              <Label>Fecha</Label>
              <Input
                type="date" {...register("date")}
                className={cn("mt-1", errors.date && "border-red-300")}
              />
              {errors.date && <p className="text-red-600 text-xs mt-1">{errors.date.message}</p>}
            </div>
          </div>

          {/* Bank account selector */}
          <div>
            <Label>Cuenta bancaria</Label>
            <Select value={selectedBankAccount} onValueChange={setSelectedBankAccount}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Sin cuenta asignada" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">
                  <span className="text-gray-400">Sin cuenta asignada</span>
                </SelectItem>
                {bankAccounts.map((acc) => (
                  <SelectItem key={acc.id} value={acc.id}>
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0"
                        style={{ backgroundColor: acc.color }}
                      />
                      {acc.name}
                      {acc.isDefault && <span className="text-xs text-gray-400">(principal)</span>}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {bankAccounts.length === 0 && (
              <p className="text-xs text-gray-400 mt-1">
                Configura tus cuentas en <a href="/perfil" className="underline">Perfil</a>
              </p>
            )}
          </div>

          <div>
            <Label>Categoría</Label>
            <Select value={watch("categoryId")} onValueChange={(v) => setValue("categoryId", v)}>
              <SelectTrigger className={cn("mt-1", errors.categoryId && "border-red-300")}>
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && <p className="text-red-600 text-xs mt-1">{errors.categoryId.message}</p>}
          </div>

          <div>
            <Label>Descripción</Label>
            <Input
              placeholder="Ej: Supermercado Mercadona"
              {...register("description")}
              className={cn("mt-1", errors.description && "border-red-300")}
            />
            {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <Label>Notas (opcional)</Label>
            <Input placeholder="Notas adicionales..." {...register("notes")} className="mt-1" />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Guardando...</> : isEditing ? "Actualizar" : "Guardar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

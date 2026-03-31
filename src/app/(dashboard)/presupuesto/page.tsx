"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BudgetProgressBar } from "@/components/budget/budget-progress-bar";
import { BudgetRuleHelper } from "@/components/budget/budget-rule-helper";
import { EmptyState } from "@/components/shared/empty-state";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { budgetSchema, type BudgetFormData } from "@/lib/validations/budget";
import { EXPENSE_CATEGORIES, getCategoryById } from "@/lib/constants/categories";
import { formatCurrency } from "@/lib/utils/currency";

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 3 }, (_, i) => currentYear - 1 + i);

interface Budget {
  id: string;
  categoryId: string;
  amount: number;
  spent: number;
  month: number;
  year: number;
}

function BudgetForm({
  onSuccess,
  month,
  year,
  initialData,
  trigger,
}: {
  onSuccess: () => void;
  month: number;
  year: number;
  initialData?: Budget;
  trigger?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const isEditing = !!initialData;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } =
    useForm<BudgetFormData>({
      resolver: zodResolver(budgetSchema),
      defaultValues: {
        categoryId: initialData?.categoryId || "",
        amount: initialData?.amount || undefined,
        month,
        year,
      },
    });

  const onSubmit = async (data: BudgetFormData) => {
    try {
      const url = isEditing ? `/api/budget/${initialData.id}` : "/api/budget";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success(isEditing ? "Presupuesto actualizado" : "Presupuesto creado");
      setOpen(false);
      reset();
      onSuccess();
    } catch {
      toast.error("Error al guardar el presupuesto");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Añadir categoría
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar presupuesto" : "Nuevo presupuesto"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Categoría</Label>
            <Select
              value={watch("categoryId")}
              onValueChange={(v) => setValue("categoryId", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                {EXPENSE_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && <p className="text-red-600 text-xs mt-1">{errors.categoryId.message}</p>}
          </div>
          <div>
            <Label htmlFor="budget-amount">Importe presupuestado (€)</Label>
            <Input
              id="budget-amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0,00"
              {...register("amount", { valueAsNumber: true })}
            />
            {errors.amount && <p className="text-red-600 text-xs mt-1">{errors.amount.message}</p>}
          </div>
          <input type="hidden" {...register("month", { valueAsNumber: true })} value={month} />
          <input type="hidden" {...register("year", { valueAsNumber: true })} value={year} />
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isEditing ? "Actualizar" : "Guardar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function PresupuestoPage() {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBudgets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/budget?month=${selectedMonth}&year=${selectedYear}`);
      const data = await res.json();
      setBudgets(data.budgets || []);
    } catch {
      toast.error("Error al cargar los presupuestos");
    } finally {
      setLoading(false);
    }
  }, [selectedMonth, selectedYear]);

  useEffect(() => { fetchBudgets(); }, [fetchBudgets]);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/budget/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Presupuesto eliminado");
      fetchBudgets();
    } else {
      toast.error("Error al eliminar");
    }
  };

  const totalBudgeted = budgets.reduce((s, b) => s + b.amount, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-2">
          <Select value={selectedMonth.toString()} onValueChange={(v) => setSelectedMonth(parseInt(v))}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((m, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(parseInt(v))}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <BudgetRuleHelper />
          <BudgetForm
            onSuccess={fetchBudgets}
            month={selectedMonth}
            year={selectedYear}
          />
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500">Total presupuestado</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(totalBudgeted)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500">Total gastado</p>
            <p className="text-xl font-bold text-red-600">{formatCurrency(totalSpent)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500">Restante</p>
            <p className={`text-xl font-bold ${totalBudgeted - totalSpent >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              {formatCurrency(totalBudgeted - totalSpent)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budgets grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 w-full" />)}
        </div>
      ) : budgets.length === 0 ? (
        <EmptyState
          icon={Plus}
          title="No hay presupuestos para este mes"
          description="Crea presupuestos por categoría para controlar tus gastos."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {budgets.map((budget) => {
            const category = getCategoryById(budget.categoryId);
            return (
              <Card key={budget.id} className="p-5">
                <div className="flex justify-end gap-1 mb-3">
                  <BudgetForm
                    initialData={budget}
                    onSuccess={fetchBudgets}
                    month={selectedMonth}
                    year={selectedYear}
                    trigger={
                      <Button variant="ghost" size="icon">
                        <Pencil className="w-4 h-4" />
                      </Button>
                    }
                  />
                  <ConfirmDialog
                    trigger={
                      <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    }
                    title="Eliminar presupuesto"
                    description="¿Eliminar este presupuesto?"
                    onConfirm={() => handleDelete(budget.id)}
                    confirmLabel="Eliminar"
                  />
                </div>
                <BudgetProgressBar
                  categoryName={category?.name || budget.categoryId}
                  categoryColor={category?.color || "#6b7280"}
                  spent={budget.spent}
                  budgeted={budget.amount}
                />
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

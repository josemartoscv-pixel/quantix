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
import { savingsGoalSchema, type SavingsGoalFormData } from "@/lib/validations/savings";

const EMOJI_OPTIONS = ["🎯", "🏠", "🚗", "✈️", "💍", "📱", "🎓", "🏖️", "💰", "🛒", "🎸", "⛵", "🏋️", "🐕", "🌱"];
const COLOR_OPTIONS = [
  "#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444",
  "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#6366f1",
];

interface GoalFormProps {
  onSuccess: () => void;
  initialData?: { id: string; name: string; targetAmount: number; description?: string | null; targetDate?: string | null; icon?: string | null; color?: string | null };
  trigger?: React.ReactNode;
}

export function GoalForm({ onSuccess, initialData, trigger }: GoalFormProps) {
  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(initialData?.icon || "🎯");
  const [selectedColor, setSelectedColor] = useState(initialData?.color || "#10b981");
  const isEditing = !!initialData?.id;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<SavingsGoalFormData>({
      resolver: zodResolver(savingsGoalSchema),
      defaultValues: {
        name: initialData?.name || "",
        targetAmount: initialData?.targetAmount,
        description: initialData?.description || "",
        targetDate: initialData?.targetDate ? initialData.targetDate.split("T")[0] : "",
        icon: initialData?.icon || "🎯",
        color: initialData?.color || "#10b981",
      },
    });

  const onSubmit = async (data: SavingsGoalFormData) => {
    try {
      const url = isEditing ? `/api/savings-goals/${initialData.id}` : "/api/savings-goals";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, icon: selectedIcon, color: selectedColor }),
      });
      if (!res.ok) throw new Error();
      toast.success(isEditing ? "Meta actualizada" : "Meta de ahorro creada");
      setOpen(false);
      reset();
      onSuccess();
    } catch {
      toast.error("Error al guardar la meta");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nueva meta
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar meta" : "Nueva meta de ahorro"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Nombre de la meta</Label>
            <Input
              placeholder="Ej: Vacaciones en Italia"
              {...register("name")}
              className={errors.name ? "border-red-300" : ""}
            />
            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Importe objetivo (€)</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                {...register("targetAmount", { valueAsNumber: true })}
              />
              {errors.targetAmount && <p className="text-red-600 text-xs mt-1">{errors.targetAmount.message}</p>}
            </div>
            <div>
              <Label>Fecha objetivo</Label>
              <Input type="date" {...register("targetDate")} />
            </div>
          </div>

          <div>
            <Label>Descripción (opcional)</Label>
            <Input placeholder="Descripción o notas..." {...register("description")} />
          </div>

          <div>
            <Label className="mb-2 block">Icono</Label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedIcon(emoji)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-colors ${
                    selectedIcon === emoji ? "bg-emerald-100 ring-2 ring-emerald-500" : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Color</Label>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full transition-transform ${
                    selectedColor === color ? "ring-2 ring-offset-2 ring-gray-400 scale-110" : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Guardando...</> : isEditing ? "Actualizar" : "Crear meta"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

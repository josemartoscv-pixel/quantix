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
import { assetSchema, type AssetFormData } from "@/lib/validations/net-worth";

const ASSET_TYPES = [
  { id: "inmueble", name: "Inmueble" },
  { id: "efectivo", name: "Efectivo / Ahorro" },
  { id: "inversiones", name: "Inversiones" },
  { id: "vehiculo", name: "Vehículo" },
  { id: "plan-pensiones", name: "Plan de pensiones" },
  { id: "negocio", name: "Negocio" },
  { id: "otros", name: "Otros" },
];

interface AssetFormProps {
  onSuccess: () => void;
  initialData?: Partial<Omit<AssetFormData, 'description'>> & { id?: string; description?: string | null };
  trigger?: React.ReactNode;
}

export function AssetForm({ onSuccess, initialData, trigger }: AssetFormProps) {
  const [open, setOpen] = useState(false);
  const isEditing = !!initialData?.id;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } =
    useForm<AssetFormData>({
      resolver: zodResolver(assetSchema),
      defaultValues: {
        name: initialData?.name || "",
        type: initialData?.type || "",
        value: initialData?.value,
        description: initialData?.description || "",
      },
    });

  const onSubmit = async (data: AssetFormData) => {
    try {
      const url = isEditing ? `/api/net-worth/assets/${initialData.id}` : "/api/net-worth/assets";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success(isEditing ? "Activo actualizado" : "Activo añadido");
      setOpen(false);
      reset();
      onSuccess();
    } catch {
      toast.error("Error al guardar el activo");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Añadir activo
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar activo" : "Añadir activo"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Nombre</Label>
            <Input placeholder="Ej: Piso en Madrid" {...register("name")} />
            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label>Tipo</Label>
            <Select value={watch("type")} onValueChange={(v) => setValue("type", v)}>
              <SelectTrigger><SelectValue placeholder="Tipo de activo" /></SelectTrigger>
              <SelectContent>
                {ASSET_TYPES.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.type && <p className="text-red-600 text-xs mt-1">{errors.type.message}</p>}
          </div>
          <div>
            <Label>Valor estimado (€)</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="0,00"
              {...register("value", { valueAsNumber: true })}
            />
            {errors.value && <p className="text-red-600 text-xs mt-1">{errors.value.message}</p>}
          </div>
          <div>
            <Label>Descripción (opcional)</Label>
            <Input placeholder="Notas adicionales..." {...register("description")} />
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : isEditing ? "Actualizar" : "Añadir"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

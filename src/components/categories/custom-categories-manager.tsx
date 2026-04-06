"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

interface CustomCategory {
  id: string;
  name: string;
  emoji: string;
  color: string;
  type: "INCOME" | "EXPENSE";
}

const PRESET_COLORS = [
  "#ef4444", "#f97316", "#f59e0b", "#10b981", "#06b6d4",
  "#3b82f6", "#8b5cf6", "#ec4899", "#64748b", "#9ca3af",
];

function NewCategoryDialog({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("📦");
  const [color, setColor] = useState("#6b7280");
  const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), emoji, color, type }),
      });
      if (!res.ok) throw new Error();
      toast.success("Categoría creada");
      setOpen(false);
      setName(""); setEmoji("📦"); setColor("#6b7280"); setType("EXPENSE");
      onSuccess();
    } catch {
      toast.error("Error al crear la categoría");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="w-4 h-4 mr-1.5" />Nueva categoría</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Nueva categoría personalizada</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Tipo</Label>
            <Select value={type} onValueChange={(v) => setType(v as "INCOME" | "EXPENSE")}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EXPENSE">Gasto</SelectItem>
                <SelectItem value="INCOME">Ingreso</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Nombre</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Mascotas" className="mt-1" maxLength={50} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Emoji</Label>
              <Input value={emoji} onChange={(e) => setEmoji(e.target.value)} placeholder="📦" className="mt-1 text-center text-xl" maxLength={4} />
            </div>
            <div>
              <Label>Color</Label>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-6 h-6 rounded-full transition-all ${color === c ? "ring-2 ring-offset-1 ring-gray-400 scale-110" : ""}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: color + "20" }}>
                {emoji}
              </div>
              <span className="text-sm font-medium text-gray-700">{name || "Vista previa"}</span>
            </div>
            <Button onClick={handleSave} disabled={saving || !name.trim()}>
              {saving ? "Guardando..." : "Crear"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function CustomCategoriesManager() {
  const [categories, setCategories] = useState<CustomCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch {
      toast.error("Error al cargar las categorías");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Categoría eliminada");
      fetchCategories();
    } else {
      toast.error("Error al eliminar");
    }
  };

  const expenses = categories.filter((c) => c.type === "EXPENSE");
  const income = categories.filter((c) => c.type === "INCOME");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Añade tus propias categorías para clasificar transacciones y presupuestos.</p>
        </div>
        <NewCategoryDialog onSuccess={fetchCategories} />
      </div>

      {loading ? (
        <p className="text-sm text-gray-400 text-center py-4">Cargando...</p>
      ) : categories.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
          <p className="text-2xl mb-2">🏷️</p>
          <p className="text-sm font-medium text-gray-600">Sin categorías personalizadas</p>
          <p className="text-xs text-gray-400 mt-1">Crea la primera con el botón de arriba</p>
        </div>
      ) : (
        <div className="space-y-4">
          {expenses.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Gastos</p>
              <div className="space-y-2">
                {expenses.map((cat) => (
                  <div key={cat.id} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ backgroundColor: cat.color + "25" }}>
                      {cat.emoji}
                    </div>
                    <span className="flex-1 text-sm font-medium text-gray-800">{cat.name}</span>
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                    <ConfirmDialog
                      trigger={<Button variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-600 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></Button>}
                      title="Eliminar categoría"
                      description="¿Eliminar esta categoría personalizada? Las transacciones existentes no se verán afectadas."
                      onConfirm={() => handleDelete(cat.id)}
                      confirmLabel="Eliminar"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {income.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Ingresos</p>
              <div className="space-y-2">
                {income.map((cat) => (
                  <div key={cat.id} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ backgroundColor: cat.color + "25" }}>
                      {cat.emoji}
                    </div>
                    <span className="flex-1 text-sm font-medium text-gray-800">{cat.name}</span>
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                    <ConfirmDialog
                      trigger={<Button variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-600 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></Button>}
                      title="Eliminar categoría"
                      description="¿Eliminar esta categoría personalizada? Las transacciones existentes no se verán afectadas."
                      onConfirm={() => handleDelete(cat.id)}
                      confirmLabel="Eliminar"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

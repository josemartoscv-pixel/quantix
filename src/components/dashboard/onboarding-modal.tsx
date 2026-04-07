"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function OnboardingModal({ hasData }: { hasData: boolean }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (hasData) return;
    const dismissed = localStorage.getItem("onboarding-dismissed");
    if (!dismissed) setOpen(true);
  }, [hasData]);

  const dismiss = () => {
    localStorage.setItem("onboarding-dismissed", "1");
    setOpen(false);
  };

  const loadDemo = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/demo-data", { method: "POST" });
      if (!res.ok) {
        const body = await res.json();
        toast.error(body.error || "Error al cargar los datos de ejemplo");
        return;
      }
      toast.success("¡Datos de ejemplo cargados!");
      localStorage.setItem("onboarding-dismissed", "1");
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("Error al cargar los datos de ejemplo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) dismiss(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">👋 Bienvenido a DineroyAhorro</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-600">
            Parece que es tu primera vez aquí. ¿Quieres cargar datos de ejemplo para explorar todas las funcionalidades?
          </p>
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm text-gray-600">
            <p className="flex items-center gap-2"><span>💰</span> Transacciones de ingresos y gastos</p>
            <p className="flex items-center gap-2"><span>🎯</span> Metas de ahorro</p>
            <p className="flex items-center gap-2"><span>📊</span> Datos para ver el dashboard completo</p>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={dismiss}>
              Empezar desde cero
            </Button>
            <Button className="flex-1" onClick={loadDemo} disabled={loading}>
              {loading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Cargando...</>
              ) : (
                "Cargar datos de ejemplo"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

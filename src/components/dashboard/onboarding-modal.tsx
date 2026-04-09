"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard, PiggyBank, BarChart3, ArrowRight, Sparkles } from "lucide-react";

const steps = [
  {
    icon: CreditCard,
    color: "bg-blue-100 text-blue-600",
    title: "Registra tus gastos e ingresos",
    description: "Añade cada transacción en segundos. Categorízala y lleva el control de en qué va tu dinero.",
    cta: "/transacciones",
    ctaLabel: "Ir a transacciones",
  },
  {
    icon: PiggyBank,
    color: "bg-amber-100 text-amber-600",
    title: "Crea tu primera meta de ahorro",
    description: "Define un objetivo, ponle fecha y haz seguimiento de tu progreso semana a semana.",
    cta: "/ahorros",
    ctaLabel: "Crear meta de ahorro",
  },
  {
    icon: BarChart3,
    color: "bg-emerald-100 text-emerald-600",
    title: "Mira tu dashboard",
    description: "Una vez tengas datos, el dashboard te muestra tu salud financiera de un vistazo.",
    cta: "/dashboard",
    ctaLabel: "Ver el dashboard",
  },
];

export function OnboardingModal({ hasData }: { hasData: boolean }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
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

  const goToStep = (href: string) => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      dismiss();
      router.push(href);
    }
  };

  const current = steps[step];
  const Icon = current.icon;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) dismiss(); }}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 px-6 pt-6 pb-8 text-white">
          <p className="text-emerald-200 text-xs font-semibold uppercase tracking-widest mb-1">Bienvenido</p>
          <h2 className="text-xl font-bold mb-0.5">¡Hola! Vamos a empezar 👋</h2>
          <p className="text-emerald-100 text-sm">3 pasos para controlar tus finanzas</p>

          {/* Progress dots */}
          <div className="flex gap-1.5 mt-4">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? "w-6 bg-white" : i < step ? "w-3 bg-white/60" : "w-3 bg-white/30"}`}
              />
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="px-6 py-5 space-y-4">
          <div className="flex items-start gap-4">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${current.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-0.5">Paso {step + 1} de {steps.length}</p>
              <h3 className="text-base font-bold text-gray-900 leading-tight">{current.title}</h3>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">{current.description}</p>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              className="flex-1 gap-2"
              onClick={() => goToStep(current.cta)}
            >
              {step < steps.length - 1 ? (
                <><ArrowRight className="w-4 h-4" />Siguiente</>
              ) : (
                <>{current.ctaLabel}<ArrowRight className="w-4 h-4" /></>
              )}
            </Button>
          </div>

          <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
            <button
              onClick={loadDemo}
              disabled={loading}
              className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              Cargar datos de ejemplo
            </button>
            <button onClick={dismiss} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Empezar desde cero
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

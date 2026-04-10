"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2, CreditCard, PiggyBank, Wallet, BarChart3, ArrowRight, Sparkles, CheckCircle2, Circle } from "lucide-react";

const STORAGE_KEY = "onboarding-v2";

const steps = [
  {
    id: "transaction",
    icon: CreditCard,
    emoji: "💳",
    color: "bg-blue-100 text-blue-600",
    colorDot: "bg-blue-500",
    title: "Añade tu primera transacción",
    description: "Registra un gasto o ingreso. Solo necesitas el importe, la categoría y la fecha.",
    cta: "/transacciones",
    ctaLabel: "Añadir transacción",
  },
  {
    id: "budget",
    icon: Wallet,
    emoji: "📊",
    color: "bg-violet-100 text-violet-600",
    colorDot: "bg-violet-500",
    title: "Crea un presupuesto",
    description: "Pon un límite mensual a cada categoría de gasto y sabe exactamente cuándo te estás pasando.",
    cta: "/presupuesto",
    ctaLabel: "Crear presupuesto",
  },
  {
    id: "goal",
    icon: PiggyBank,
    emoji: "🐷",
    color: "bg-amber-100 text-amber-600",
    colorDot: "bg-amber-500",
    title: "Define una meta de ahorro",
    description: "Un viaje, un fondo de emergencia, un coche. Ponle nombre, importe y fecha.",
    cta: "/ahorros",
    ctaLabel: "Crear meta",
  },
  {
    id: "dashboard",
    icon: BarChart3,
    emoji: "📈",
    color: "bg-emerald-100 text-emerald-600",
    colorDot: "bg-emerald-500",
    title: "Revisa tu salud financiera",
    description: "Con datos ya introducidos, el dashboard te muestra tu puntuación financiera, gastos y tendencias.",
    cta: "/dashboard",
    ctaLabel: "Ver dashboard",
  },
];

function getState(): { dismissed: boolean; completed: string[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { dismissed: false, completed: [] };
}

function saveState(state: { dismissed: boolean; completed: string[] }) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function OnboardingModal({ hasData, userName }: { hasData: boolean; userName?: string }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0); // -1 = welcome
  const [completed, setCompleted] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (hasData) return;
    const state = getState();
    if (!state.dismissed) {
      setCompleted(state.completed);
      setOpen(true);
    }
  }, [hasData]);

  const dismiss = () => {
    saveState({ dismissed: true, completed });
    setOpen(false);
  };

  const completeStep = (id: string) => {
    const next = [...new Set([...completed, id])];
    setCompleted(next);
    saveState({ dismissed: false, completed: next });
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
      dismiss();
      router.refresh();
    } catch {
      toast.error("Error al cargar los datos de ejemplo");
    } finally {
      setLoading(false);
    }
  };

  const goToStep = (stepIndex: number) => {
    const s = steps[stepIndex];
    completeStep(s.id);
    dismiss();
    router.push(s.cta);
  };

  const current = steps[step];
  const Icon = current?.icon;
  const allDone = steps.every(s => completed.includes(s.id));

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) dismiss(); }}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">

        {showWelcome ? (
          /* ── WELCOME SCREEN ── */
          <>
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 px-6 pt-8 pb-10 text-white text-center">
              <div className="text-4xl mb-3">👋</div>
              <h2 className="text-2xl font-bold mb-2">
                {userName ? `¡Hola, ${userName.split(" ")[0]}!` : "¡Bienvenido!"}
              </h2>
              <p className="text-emerald-100 text-sm leading-relaxed max-w-xs mx-auto">
                En 4 pasos tienes tu situación financiera bajo control. Tarda menos de 5 minutos.
              </p>
            </div>

            <div className="px-6 py-5 space-y-3">
              {/* Step preview */}
              <div className="space-y-2">
                {steps.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="text-base w-6 text-center">{s.emoji}</span>
                    <span>{s.title}</span>
                    {completed.includes(s.id) && <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto shrink-0" />}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowWelcome(false)}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors text-sm mt-2"
              >
                Empezar <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={loadDemo}
                  disabled={loading}
                  className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                >
                  {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  Ver datos de ejemplo
                </button>
                <button onClick={dismiss} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                  Saltar
                </button>
              </div>
            </div>
          </>
        ) : (
          /* ── STEP SCREEN ── */
          <>
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 px-6 pt-5 pb-7 text-white">
              <div className="flex items-center justify-between mb-4">
                <p className="text-emerald-200 text-xs font-semibold uppercase tracking-widest">
                  Paso {step + 1} de {steps.length}
                </p>
                <button onClick={() => setShowWelcome(true)} className="text-emerald-200 hover:text-white text-xs transition-colors">
                  Ver todos
                </button>
              </div>
              <div className="flex gap-1.5">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setStep(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? "w-6 bg-white" : completed.includes(steps[i].id) ? "w-3 bg-white/70" : "w-3 bg-white/30"}`}
                  />
                ))}
              </div>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-2xl`}>
                  {current.emoji}
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 leading-tight">{current.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{current.description}</p>
                </div>
              </div>

              <button
                onClick={() => goToStep(step)}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors text-sm"
              >
                {current.ctaLabel} <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between">
                {step < steps.length - 1 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Saltar este paso →
                  </button>
                ) : (
                  <span />
                )}
                <button onClick={dismiss} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                  Cerrar
                </button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

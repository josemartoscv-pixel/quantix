"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Zap, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

interface ScoreComponent {
  name: string;
  score: number;
  maxScore: number;
  description: string;
  action?: string;
}

interface HealthScoreCardProps {
  total: number;
  label: string;
  color: string;
  components: ScoreComponent[];
  topActions: { text: string; href: string }[];
  recommendations?: unknown[];
}

const LABEL_STYLES: Record<string, string> = {
  Excelente: "bg-emerald-100 text-emerald-700",
  Bueno: "bg-blue-100 text-blue-700",
  Regular: "bg-amber-100 text-amber-700",
  "Necesita mejora": "bg-red-100 text-red-700",
};

export function HealthScoreCard({ total, label, topActions }: HealthScoreCardProps) {
  const [open, setOpen] = useState(false);

  const radius = 54;
  const circumference = Math.PI * radius;
  const offset = circumference * (1 - total / 100);
  const scoreColor = total >= 80 ? "#10b981" : total >= 60 ? "#3b82f6" : total >= 40 ? "#f59e0b" : "#ef4444";

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">

        {/* Top: score + sube puntuación */}
        <div className="flex flex-col sm:flex-row">

          {/* Score arc */}
          <div className="flex flex-col items-center justify-center p-5 sm:w-48 bg-gray-50 border-b sm:border-b-0 sm:border-r border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 text-center">
              Índice de Control y Ahorro
            </p>
            <div className="relative w-28 h-14 mb-1.5">
              <svg viewBox="0 0 120 60" className="w-full h-full overflow-visible">
                <path d="M 6 60 A 54 54 0 0 1 114 60" fill="none" stroke="#e5e7eb" strokeWidth="10" strokeLinecap="round" />
                <path
                  d="M 6 60 A 54 54 0 0 1 114 60"
                  fill="none"
                  stroke={scoreColor}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${circumference}`}
                  strokeDashoffset={`${offset}`}
                  style={{ transition: "stroke-dashoffset 1s ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-end justify-center pb-0.5">
                <span className="text-3xl font-black text-gray-900">{total}</span>
              </div>
            </div>
            <span className={cn("text-[10px] font-bold px-2.5 py-0.5 rounded-full", LABEL_STYLES[label] || "bg-gray-100 text-gray-600")}>
              {label.toUpperCase()}
            </span>
            <p className="text-[10px] text-gray-400 mt-1">de 100 puntos</p>
          </div>

          {/* Sube tu puntuación */}
          <div className="flex-1 p-4 flex flex-col justify-center">
            {topActions.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-1 text-center py-2">
                <span className="text-2xl">🏆</span>
                <p className="font-semibold text-emerald-700 text-sm">¡Salud financiera excelente!</p>
                <p className="text-xs text-gray-400">Sigue así para mantener tu puntuación.</p>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setOpen(!open)}
                  className="w-full flex items-center justify-between gap-2 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 active:scale-95 transition-all rounded-xl px-4 py-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-3.5 h-3.5 text-white" />
                    </div>
                    <p className="text-sm font-bold text-emerald-800 text-left">
                      Sube tu puntuación{" "}
                      <span className="text-emerald-600">+{Math.min(topActions.length * 5, 15)} pts</span>
                    </p>
                  </div>
                  {open ? <ChevronUp className="w-4 h-4 text-emerald-500 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                </button>

                {open && (
                  <div className="space-y-2 mt-2">
                    {topActions.map((action, i) => (
                      <Link key={i} href={action.href} className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 active:scale-95 transition-all rounded-xl px-3 py-2.5">
                        <span className="text-emerald-500 font-bold text-sm mt-0.5 flex-shrink-0">→</span>
                        <p className="text-sm text-emerald-800 leading-snug">{action.text}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>


      </CardContent>
    </Card>
  );
}

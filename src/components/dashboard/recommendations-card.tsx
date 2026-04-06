"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Recommendation } from "@/lib/calculations/recommendations";

const TYPE_STYLES = {
  warning: "bg-amber-50 border-amber-200 hover:bg-amber-100",
  info: "bg-blue-50 border-blue-200 hover:bg-blue-100",
  tip: "bg-violet-50 border-violet-200 hover:bg-violet-100",
  success: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
};

const TYPE_TEXT = {
  warning: "text-amber-800",
  info: "text-blue-800",
  tip: "text-violet-800",
  success: "text-emerald-800",
};

const TYPE_DESC = {
  warning: "text-amber-700",
  info: "text-blue-700",
  tip: "text-violet-700",
  success: "text-emerald-700",
};

const TYPE_ARROW = {
  warning: "text-amber-500",
  info: "text-blue-500",
  tip: "text-violet-500",
  success: "text-emerald-500",
};

export function RecommendationsCard({ recommendations }: { recommendations: Recommendation[] }) {
  if (recommendations.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <span>💡</span>
          Recomendaciones personalizadas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {recommendations.map((rec) => {
            const inner = (
              <div className={cn("rounded-xl border p-4 transition-colors", TYPE_STYLES[rec.type], rec.href && "cursor-pointer")}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{rec.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={cn("font-semibold text-sm", TYPE_TEXT[rec.type])}>
                      {rec.title}
                    </p>
                    <p className={cn("text-xs mt-1 leading-relaxed", TYPE_DESC[rec.type])}>
                      {rec.description}
                    </p>
                  </div>
                  {rec.href && (
                    <ArrowRight className={cn("w-4 h-4 flex-shrink-0 mt-0.5", TYPE_ARROW[rec.type])} />
                  )}
                </div>
              </div>
            );

            return rec.href ? (
              <Link key={rec.id} href={rec.href}>{inner}</Link>
            ) : (
              <div key={rec.id}>{inner}</div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

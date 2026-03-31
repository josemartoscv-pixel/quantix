"use client";

import { useState } from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ScoreComponent {
  name: string;
  score: number;
  maxScore: number;
  description: string;
}

interface HealthScoreCardProps {
  total: number;
  label: string;
  color: string;
  components: ScoreComponent[];
}

export function HealthScoreCard({
  total,
  label,
  color,
  components,
}: HealthScoreCardProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const chartColor =
    total >= 80
      ? "#10b981"
      : total >= 60
      ? "#3b82f6"
      : total >= 40
      ? "#f59e0b"
      : "#ef4444";

  const data = [{ value: total, fill: chartColor }];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Puntuación de Salud Financiera</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Chart */}
          <div className="relative w-40 h-40 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="90%"
                startAngle={90}
                endAngle={-270}
                data={data}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  background={{ fill: "#f1f5f9" }}
                  dataKey="value"
                  cornerRadius={10}
                  angleAxisId={0}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">{total}</span>
              <span className={cn("text-sm font-semibold", color)}>{label}</span>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 w-full">
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium mb-3 flex items-center gap-1"
            >
              {showBreakdown ? "Ocultar" : "Ver"} desglose
            </button>

            {showBreakdown && (
              <div className="space-y-3">
                {components.map((comp) => {
                  const pct = (comp.score / comp.maxScore) * 100;
                  return (
                    <div key={comp.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 font-medium">{comp.name}</span>
                        <span className="text-gray-500">
                          {comp.score}/{comp.maxScore}
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: chartColor,
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{comp.description}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {!showBreakdown && (
              <div className="grid grid-cols-2 gap-3">
                {components.map((comp) => {
                  const pct = (comp.score / comp.maxScore) * 100;
                  return (
                    <div key={comp.name} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">{comp.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: chartColor,
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-gray-700">
                          {comp.score}/{comp.maxScore}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

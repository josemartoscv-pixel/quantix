"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpensePieChart } from "@/components/charts/expense-pie-chart";
import { IncomeVsExpenseChart } from "@/components/charts/income-vs-expense-chart";
import { SavingsRateChart } from "@/components/charts/savings-rate-chart";
import { Skeleton } from "@/components/ui/skeleton";

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 3 }, (_, i) => currentYear - i);

export default function ReportesPage() {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [expRes, incRes, monRes] = await Promise.all([
        fetch(`/api/reports?type=expenses&month=${selectedMonth}&year=${selectedYear}`),
        fetch(`/api/reports?type=income&month=${selectedMonth}&year=${selectedYear}`),
        fetch(`/api/reports?type=monthly&months=6`),
      ]);

      const [expJson, incJson, monJson] = await Promise.all([
        expRes.json(),
        incRes.json(),
        monRes.json(),
      ]);

      setExpenseData(expJson.data || []);
      setIncomeData(incJson.data || []);
      setMonthlyData(monJson.data || []);
    } catch {
      toast.error("Error al cargar los reportes");
    } finally {
      setLoading(false);
    }
  }, [selectedMonth, selectedYear]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <div className="space-y-6">
      {/* Date selector */}
      <div className="flex gap-3">
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

      <Tabs defaultValue="gastos">
        <TabsList>
          <TabsTrigger value="gastos">Gastos</TabsTrigger>
          <TabsTrigger value="ingresos">Ingresos</TabsTrigger>
          <TabsTrigger value="evolucion">Evolución</TabsTrigger>
          <TabsTrigger value="ahorro">Ahorro</TabsTrigger>
        </TabsList>

        <TabsContent value="gastos">
          <Card>
            <CardHeader>
              <CardTitle>Gastos por categoría</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-72 w-full" />
              ) : (
                <ExpensePieChart data={expenseData} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ingresos">
          <Card>
            <CardHeader>
              <CardTitle>Ingresos por categoría</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-72 w-full" />
              ) : (
                <ExpensePieChart data={incomeData} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evolucion">
          <Card>
            <CardHeader>
              <CardTitle>Ingresos vs Gastos (últimos 6 meses)</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-72 w-full" />
              ) : (
                <IncomeVsExpenseChart data={monthlyData} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ahorro">
          <Card>
            <CardHeader>
              <CardTitle>Tasa de ahorro mensual (%)</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-72 w-full" />
              ) : (
                <SavingsRateChart data={monthlyData} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

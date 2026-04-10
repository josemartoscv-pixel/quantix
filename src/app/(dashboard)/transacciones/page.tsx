"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Download, RefreshCw, X } from "lucide-react";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { TransactionFilters, type TransactionFilters as Filters } from "@/components/transactions/transaction-filters";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { ExpensePieChart } from "@/components/charts/expense-pie-chart";
import { IncomeVsExpenseChart } from "@/components/charts/income-vs-expense-chart";
import { SavingsRateChart } from "@/components/charts/savings-rate-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/dates";
import { getCategoryById, INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "@/lib/constants/categories";
import { cn } from "@/lib/utils";

const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 3 }, (_, i) => currentYear - i);

interface Transaction {
  id: string;
  amount: number;
  type: string;
  categoryId: string;
  description: string;
  date: string;
  notes?: string;
  isRecurring: boolean;
}

function buildChartData(transactions: Transaction[], type: "INCOME" | "EXPENSE") {
  const categories = type === "INCOME" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const sums: Record<string, number> = {};
  for (const tx of transactions.filter((t) => t.type === type)) {
    sums[tx.categoryId] = (sums[tx.categoryId] || 0) + tx.amount;
  }
  return Object.entries(sums)
    .map(([categoryId, value]) => {
      const cat = categories.find((c) => c.id === categoryId);
      return { categoryId, name: cat?.name || categoryId, value, color: cat?.color || "#6b7280" };
    })
    .sort((a, b) => b.value - a.value);
}

function groupByDate(transactions: Transaction[]) {
  const today = new Date(); today.setHours(0,0,0,0);
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
  const groups: { label: string; items: Transaction[] }[] = [];
  const map: Record<string, Transaction[]> = {};

  for (const tx of transactions) {
    const d = new Date(tx.date); d.setHours(0,0,0,0);
    let label: string;
    if (d.getTime() === today.getTime()) label = "Hoy";
    else if (d.getTime() === yesterday.getTime()) label = "Ayer";
    else label = d.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
    if (!map[label]) { map[label] = []; groups.push({ label, items: map[label] }); }
    map[label].push(tx);
  }
  return groups;
}

function SwipeableRow({
  editSlot,
  deleteSlot,
  children,
}: {
  editSlot: React.ReactNode;
  deleteSlot: React.ReactNode;
  children: React.ReactNode;
}) {
  const ACTION_W = 88;
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(true);
  const startX = useRef(0);
  const startOffset = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startOffset.current = offset;
    setAnimate(false);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientX - startX.current;
    setOffset(Math.max(-ACTION_W, Math.min(0, startOffset.current + delta)));
  };

  const onTouchEnd = () => {
    setAnimate(true);
    setOffset(offset < -ACTION_W / 2 ? -ACTION_W : 0);
  };

  const close = () => { setAnimate(true); setOffset(0); };

  return (
    <div className="relative overflow-hidden">
      {/* Swipe actions — mobile only */}
      <div className="absolute inset-y-0 right-0 flex w-[88px] md:hidden">
        <div className="flex-1 flex items-center justify-center bg-blue-500" onClick={close}>
          {editSlot}
        </div>
        <div className="flex-1 flex items-center justify-center bg-red-500" onClick={close}>
          {deleteSlot}
        </div>
      </div>
      <div
        style={{ transform: `translateX(${offset}px)`, transition: animate ? "transform 0.25s ease" : "none" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="relative z-10"
      >
        {children}
      </div>
    </div>
  );
}

function TransactionTable({
  transactions,
  loading,
  onDelete,
  onSuccess,
}: {
  transactions: Transaction[];
  loading: boolean;
  onDelete: (id: string) => void;
  onSuccess: () => void;
}) {
  if (loading) {
    return (
      <div className="p-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3.5 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    );
  }
  if (transactions.length === 0) {
    return <EmptyState icon={Plus} title="No hay transacciones" description="No se encontraron transacciones con los filtros seleccionados." />;
  }

  const groups = groupByDate(transactions);

  return (
    <div className="divide-y divide-gray-50">
      {groups.map(({ label, items }) => (
        <div key={label}>
          {/* Date header */}
          <div className="px-4 sm:px-6 py-2 bg-[#f5f5f7]">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
          </div>
          {/* Transactions */}
          {items.map((tx, idx) => {
            const cat = getCategoryById(tx.categoryId);
            const isIncome = tx.type === "INCOME";
            return (
              <SwipeableRow
                key={tx.id}
                editSlot={
                  <TransactionForm
                    initialData={{ id: tx.id, amount: tx.amount, type: tx.type as "INCOME" | "EXPENSE", categoryId: tx.categoryId, description: tx.description, date: tx.date.split("T")[0], notes: tx.notes }}
                    onSuccess={onSuccess}
                    trigger={<button className="text-white"><Pencil className="w-4 h-4" /></button>}
                  />
                }
                deleteSlot={
                  <ConfirmDialog
                    trigger={<button className="text-white"><Trash2 className="w-4 h-4" /></button>}
                    title="Eliminar transacción"
                    description="¿Estás seguro de que quieres eliminar esta transacción?"
                    onConfirm={() => onDelete(tx.id)}
                    confirmLabel="Eliminar"
                  />
                }
              >
                <div
                  className={cn("flex items-center gap-3 px-4 sm:px-6 py-3.5 hover:bg-gray-50 transition-colors group bg-white", idx < items.length - 1 && "border-b border-gray-50")}
                >
                  <div
                    className="w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center text-lg"
                    style={{ backgroundColor: (cat?.color || "#6b7280") + "18" }}
                  >
                    {cat?.emoji || "📦"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{tx.description}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{cat?.name || tx.categoryId}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <p className={cn("font-semibold text-sm tabular-nums", isIncome ? "text-emerald-600" : "text-gray-900")}>
                      {isIncome ? "+" : "−"}{formatCurrency(tx.amount)}
                    </p>
                    {/* Desktop hover actions */}
                    <div className="hidden md:flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1">
                      <TransactionForm
                        initialData={{ id: tx.id, amount: tx.amount, type: tx.type as "INCOME" | "EXPENSE", categoryId: tx.categoryId, description: tx.description, date: tx.date.split("T")[0], notes: tx.notes }}
                        onSuccess={onSuccess}
                        trigger={<Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="w-3 h-3" /></Button>}
                      />
                      <ConfirmDialog
                        trigger={<Button variant="ghost" size="icon" className="h-7 w-7 text-red-400"><Trash2 className="w-3 h-3" /></Button>}
                        title="Eliminar transacción"
                        description="¿Estás seguro de que quieres eliminar esta transacción?"
                        onConfirm={() => onDelete(tx.id)}
                        confirmLabel="Eliminar"
                      />
                    </div>
                  </div>
                </div>
              </SwipeableRow>
            );
          })}
        </div>
      ))}
    </div>
  );
}

interface RecurringTx {
  id: string;
  description: string;
  amount: number;
  type: string;
  categoryId: string;
}

export default function TransaccionesPage() {
  const now = new Date();
  const [filters, setFilters] = useState<Filters>({
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    type: "ALL",
    categoryId: "",
    search: "",
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingRecurring, setPendingRecurring] = useState<RecurringTx[]>([]);
  const [recurringDismissed, setRecurringDismissed] = useState(false);
  const [applyingRecurring, setApplyingRecurring] = useState(false);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        month: filters.month.toString(),
        year: filters.year.toString(),
      });
      if (filters.search) params.set("search", filters.search);

      const res = await fetch(`/api/transactions?${params}`);
      const data = await res.json();
      setTransactions(data.transactions || []);
    } catch {
      toast.error("Error al cargar las transacciones");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchTransactions(); }, [fetchTransactions]);

  // Load pending recurring transactions (only once, on mount)
  useEffect(() => {
    const isCurrentMonth =
      filters.month === now.getMonth() + 1 && filters.year === now.getFullYear();
    if (!isCurrentMonth) return;
    fetch("/api/transactions/recurring")
      .then((r) => r.json())
      .then((data) => setPendingRecurring(data.pending || []));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const applyRecurring = async () => {
    setApplyingRecurring(true);
    try {
      const res = await fetch("/api/transactions/recurring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: pendingRecurring.map((t) => t.id) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error();
      toast.success(`${data.applied} transacciones recurrentes aplicadas`);
      setPendingRecurring([]);
      fetchTransactions();
    } catch {
      toast.error("Error al aplicar las transacciones recurrentes");
    } finally {
      setApplyingRecurring(false);
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Transacción eliminada");
      fetchTransactions();
    } else {
      toast.error("Error al eliminar");
    }
  };

  const incomeTransactions = transactions.filter((t) => t.type === "INCOME");
  const expenseTransactions = transactions.filter((t) => t.type === "EXPENSE");

  const totalIncome = incomeTransactions.reduce((s, t) => s + t.amount, 0);
  const totalExpenses = expenseTransactions.reduce((s, t) => s + t.amount, 0);

  const incomeChartData = buildChartData(transactions, "INCOME");
  const expenseChartData = buildChartData(transactions, "EXPENSE");

  // Reportes state — only loads when tab is active
  const [reportMonth, setReportMonth] = useState(now.getMonth() + 1);
  const [reportYear, setReportYear] = useState(now.getFullYear());
  const [reportExpenseData, setReportExpenseData] = useState([]);
  const [reportIncomeData, setReportIncomeData] = useState([]);
  const [reportMonthlyData, setReportMonthlyData] = useState([]);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportLoaded, setReportLoaded] = useState(false);

  const fetchReportData = useCallback(async () => {
    setReportLoading(true);
    try {
      const [expRes, incRes, monRes] = await Promise.all([
        fetch(`/api/reports?type=expenses&month=${reportMonth}&year=${reportYear}`),
        fetch(`/api/reports?type=income&month=${reportMonth}&year=${reportYear}`),
        fetch(`/api/reports?type=monthly&months=6`),
      ]);
      const [expJson, incJson, monJson] = await Promise.all([expRes.json(), incRes.json(), monRes.json()]);
      setReportExpenseData(expJson.data || []);
      setReportIncomeData(incJson.data || []);
      setReportMonthlyData(monJson.data || []);
      setReportLoaded(true);
    } catch {
      toast.error("Error al cargar los reportes");
    } finally {
      setReportLoading(false);
    }
  }, [reportMonth, reportYear]);

  useEffect(() => {
    if (reportLoaded) fetchReportData();
  }, [reportMonth, reportYear]); // eslint-disable-line react-hooks/exhaustive-deps

  const downloadCSV = (data: Transaction[], filename: string) => {
    const header = "Fecha,Descripción,Categoría,Tipo,Importe,Notas";
    const rows = data.map((t) => {
      const cat = getCategoryById(t.categoryId);
      return [
        new Date(t.date).toLocaleDateString("es-ES"),
        `"${t.description}"`,
        cat?.name || t.categoryId,
        t.type === "INCOME" ? "Ingreso" : "Gasto",
        t.type === "INCOME" ? t.amount : -t.amount,
        `"${t.notes || ""}"`,
      ].join(",");
    });
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 pb-24 md:pb-4">
      {/* Recurring transactions banner */}
      {pendingRecurring.length > 0 && !recurringDismissed && (
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
          <RefreshCw className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-blue-800">
              {pendingRecurring.length} transacción{pendingRecurring.length !== 1 ? "es" : ""} recurrente{pendingRecurring.length !== 1 ? "s" : ""} pendiente{pendingRecurring.length !== 1 ? "s" : ""}
            </p>
            <p className="text-xs text-blue-600 mt-0.5">
              {pendingRecurring.map((t) => t.description).join(", ")}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={applyRecurring}
              disabled={applyingRecurring}
              className="text-xs font-semibold text-blue-700 bg-blue-100 hover:bg-blue-200 active:scale-95 transition-all px-3 py-1.5 rounded-lg"
            >
              {applyingRecurring ? "Aplicando..." : "Aplicar ahora"}
            </button>
            <button onClick={() => setRecurringDismissed(true)} className="text-blue-400 hover:text-blue-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4">
            <p className="text-[10px] sm:text-xs text-gray-500">Ingresos</p>
            <p className="text-sm sm:text-lg font-bold text-emerald-600 truncate">{formatCurrency(totalIncome)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <p className="text-[10px] sm:text-xs text-gray-500">Gastos</p>
            <p className="text-sm sm:text-lg font-bold text-red-600 truncate">{formatCurrency(totalExpenses)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <p className="text-[10px] sm:text-xs text-gray-500">Balance</p>
            <p className={cn("text-sm sm:text-lg font-bold truncate", totalIncome - totalExpenses >= 0 ? "text-gray-900" : "text-red-600")}>
              {formatCurrency(totalIncome - totalExpenses)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <TransactionFilters filters={{ ...filters, type: "ALL", categoryId: "" }} onChange={setFilters} hideTypeFilter />

      {/* Tabs */}
      <Tabs defaultValue="transacciones" onValueChange={(v) => { if (v === "reportes" && !reportLoaded) fetchReportData(); }}>
        <TabsList className="w-full">
          <TabsTrigger value="transacciones" className="flex-1 text-xs sm:text-sm">Transacciones</TabsTrigger>
          <TabsTrigger value="ingresos" className="flex-1 text-xs sm:text-sm">Ingresos</TabsTrigger>
          <TabsTrigger value="gastos" className="flex-1 text-xs sm:text-sm">Gastos</TabsTrigger>
          <TabsTrigger value="reportes" className="flex-1 text-xs sm:text-sm">Reportes</TabsTrigger>
        </TabsList>

        {/* Tab: Todas las transacciones */}
        <TabsContent value="transacciones">
          <Card>
            <CardContent className="p-0">
              <TransactionTable
                transactions={transactions}
                loading={loading}
                onDelete={handleDelete}
                onSuccess={fetchTransactions}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Ingresos */}
        <TabsContent value="ingresos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-emerald-600">Ingresos por categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpensePieChart data={incomeChartData} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              <TransactionTable
                transactions={incomeTransactions}
                loading={loading}
                onDelete={handleDelete}
                onSuccess={fetchTransactions}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Gastos */}
        <TabsContent value="gastos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Gastos por categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpensePieChart data={expenseChartData} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              <TransactionTable
                transactions={expenseTransactions}
                loading={loading}
                onDelete={handleDelete}
                onSuccess={fetchTransactions}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Reportes */}
        <TabsContent value="reportes" className="space-y-4">
          {/* Controls */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex gap-2">
              <Select value={reportMonth.toString()} onValueChange={(v) => setReportMonth(parseInt(v))}>
                <SelectTrigger className="flex-1 sm:w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((m, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={reportYear.toString()} onValueChange={(v) => setReportYear(parseInt(v))}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {YEARS.map((y) => (
                    <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadCSV(transactions, `transacciones-${MONTHS[filters.month - 1]}-${filters.year}.csv`)}
            >
              <Download className="w-4 h-4 mr-2" />
              Descargar CSV
            </Button>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Gastos por categoría</CardTitle></CardHeader>
              <CardContent>
                {reportLoading ? <Skeleton className="h-64 w-full" /> : <ExpensePieChart data={reportExpenseData} />}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Ingresos por categoría</CardTitle></CardHeader>
              <CardContent>
                {reportLoading ? <Skeleton className="h-64 w-full" /> : <ExpensePieChart data={reportIncomeData} />}
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Ingresos vs Gastos (últimos 6 meses)</CardTitle></CardHeader>
            <CardContent>
              {reportLoading ? <Skeleton className="h-72 w-full" /> : <IncomeVsExpenseChart data={reportMonthlyData} />}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Tasa de ahorro mensual</CardTitle></CardHeader>
            <CardContent>
              {reportLoading ? <Skeleton className="h-72 w-full" /> : <SavingsRateChart data={reportMonthlyData} />}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* FAB */}
      <div className="fixed bottom-20 md:bottom-6 right-6 z-30">
        <TransactionForm
          onSuccess={fetchTransactions}
          trigger={
            <button className="w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors">
              <Plus className="w-6 h-6" />
            </button>
          }
        />
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { TransactionFilters, type TransactionFilters as Filters } from "@/components/transactions/transaction-filters";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/dates";
import { getCategoryById } from "@/lib/constants/categories";
import { cn } from "@/lib/utils";

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

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        month: filters.month.toString(),
        year: filters.year.toString(),
      });
      if (filters.type !== "ALL") params.set("type", filters.type);
      if (filters.categoryId) params.set("categoryId", filters.categoryId);
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

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Transacción eliminada");
      fetchTransactions();
    } else {
      toast.error("Error al eliminar");
    }
  };

  const totalIncome = transactions.filter((t) => t.type === "INCOME").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === "EXPENSE").reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500">Ingresos</p>
            <p className="text-lg font-bold text-emerald-600">{formatCurrency(totalIncome)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500">Gastos</p>
            <p className="text-lg font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500">Balance</p>
            <p className={cn("text-lg font-bold", totalIncome - totalExpenses >= 0 ? "text-gray-900" : "text-red-600")}>
              {formatCurrency(totalIncome - totalExpenses)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <TransactionFilters filters={filters} onChange={setFilters} />

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : transactions.length === 0 ? (
            <EmptyState
              icon={Plus}
              title="No hay transacciones"
              description="No se encontraron transacciones con los filtros seleccionados."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider">
                    <th className="text-left px-6 py-3">Descripción</th>
                    <th className="text-left px-3 py-3">Categoría</th>
                    <th className="text-left px-3 py-3 hidden sm:table-cell">Fecha</th>
                    <th className="text-right px-3 py-3">Importe</th>
                    <th className="text-right px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {transactions.map((tx) => {
                    const cat = getCategoryById(tx.categoryId);
                    const isIncome = tx.type === "INCOME";
                    return (
                      <tr key={tx.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
                              style={{ backgroundColor: cat?.color || "#6b7280" }}
                            >
                              {cat?.name?.[0] || "?"}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{tx.description}</p>
                              {tx.notes && <p className="text-xs text-gray-400">{tx.notes}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-gray-500">{cat?.name || tx.categoryId}</td>
                        <td className="px-3 py-3 text-gray-500 hidden sm:table-cell">
                          {formatDate(tx.date)}
                        </td>
                        <td className={cn("px-3 py-3 text-right font-semibold", isIncome ? "text-emerald-600" : "text-red-600")}>
                          {isIncome ? "+" : "-"}
                          {formatCurrency(tx.amount)}
                        </td>
                        <td className="px-6 py-3">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <TransactionForm
                              initialData={{
                                id: tx.id,
                                amount: tx.amount,
                                type: tx.type as "INCOME" | "EXPENSE",
                                categoryId: tx.categoryId,
                                description: tx.description,
                                date: tx.date.split("T")[0],
                                notes: tx.notes,
                              }}
                              onSuccess={fetchTransactions}
                              trigger={
                                <Button variant="ghost" size="icon">
                                  <Pencil className="w-4 h-4" />
                                </Button>
                              }
                            />
                            <ConfirmDialog
                              trigger={
                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              }
                              title="Eliminar transacción"
                              description="¿Estás seguro de que quieres eliminar esta transacción? Esta acción no se puede deshacer."
                              onConfirm={() => handleDelete(tx.id)}
                              confirmLabel="Eliminar"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

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

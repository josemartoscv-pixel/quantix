"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/lib/constants/categories";
import { cn } from "@/lib/utils";

export interface TransactionFilters {
  month: number;
  year: number;
  type: "ALL" | "INCOME" | "EXPENSE";
  categoryId: string;
  search: string;
}

interface TransactionFiltersProps {
  filters: TransactionFilters;
  onChange: (filters: TransactionFilters) => void;
  hideTypeFilter?: boolean;
}

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

export function TransactionFilters({ filters, onChange, hideTypeFilter }: TransactionFiltersProps) {
  const allCategories = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

  return (
    <div className="flex flex-wrap gap-2">
      {/* Search */}
      <div className="relative flex-1 min-w-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Buscar..."
          className="pl-9"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
      </div>

      {/* Month + Year compact */}
      <div className="flex gap-1.5 flex-shrink-0">
        <Select
          value={filters.month.toString()}
          onValueChange={(v) => onChange({ ...filters, month: parseInt(v) })}
        >
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {months.map((name, i) => (
              <SelectItem key={i + 1} value={(i + 1).toString()}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.year.toString()}
          onValueChange={(v) => onChange({ ...filters, year: parseInt(v) })}
        >
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Type */}
      {!hideTypeFilter && <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
        {(["ALL", "INCOME", "EXPENSE"] as const).map((type) => {
          const labels = { ALL: "Todos", INCOME: "Ingresos", EXPENSE: "Gastos" };
          return (
            <button
              key={type}
              onClick={() => onChange({ ...filters, type })}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                filters.type === type
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {labels[type]}
            </button>
          );
        })}
      </div>}

      {/* Category */}
      <Select
        value={filters.categoryId || "all"}
        onValueChange={(v) => onChange({ ...filters, categoryId: v === "all" ? "" : v })}
      >
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las categorías</SelectItem>
          {allCategories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

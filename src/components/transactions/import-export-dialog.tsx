"use client";

import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { Download, Upload, FileText, AlertCircle, CheckCircle2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/lib/constants/categories";
import { formatCurrency } from "@/lib/utils/currency";
import { cn } from "@/lib/utils";

const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

interface ParsedRow {
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  categoryId: string;
  categoryName: string;
  date: string;
  notes: string;
  valid: boolean;
  error?: string;
}

function parseCSV(text: string): ParsedRow[] {
  const lines = text.trim().split("\n").filter(Boolean);
  if (lines.length < 2) return [];

  // Detect separator (comma or semicolon)
  const sep = lines[0].includes(";") ? ";" : ",";

  const splitLine = (line: string) => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (const ch of line) {
      if (ch === '"') { inQuotes = !inQuotes; continue; }
      if (ch === sep && !inQuotes) { result.push(current.trim()); current = ""; continue; }
      current += ch;
    }
    result.push(current.trim());
    return result;
  };

  const header = splitLine(lines[0]).map((h) => h.toLowerCase().replace(/[^a-záéíóúüñ]/gi, ""));

  // Map column names (Spanish or English)
  const colIndex = (names: string[]) => {
    for (const n of names) {
      const i = header.findIndex((h) => h.includes(n.toLowerCase()));
      if (i !== -1) return i;
    }
    return -1;
  };

  const dateCol = colIndex(["fecha", "date"]);
  const descCol = colIndex(["descripcion", "description", "concepto"]);
  const catCol = colIndex(["categoria", "category"]);
  const typeCol = colIndex(["tipo", "type"]);
  const amountCol = colIndex(["importe", "amount", "cantidad"]);
  const notesCol = colIndex(["notas", "notes"]);

  return lines.slice(1).map((line) => {
    const cols = splitLine(line);
    const get = (i: number) => (i >= 0 ? cols[i] || "" : "");

    const rawAmount = get(amountCol).replace(/[€$£\s]/g, "").replace(",", ".");
    const amount = Math.abs(parseFloat(rawAmount));
    const rawType = get(typeCol).toUpperCase();
    const type: "INCOME" | "EXPENSE" =
      rawType.includes("ING") || rawType === "INCOME" ? "INCOME" : "EXPENSE";

    const categoryName = get(catCol);
    const cat = ALL_CATEGORIES.find(
      (c) => c.name.toLowerCase() === categoryName.toLowerCase() || c.id === categoryName.toLowerCase()
    );
    const categoryId = cat?.id || (type === "INCOME" ? "otros-ingresos" : "otros-gastos");

    const rawDate = get(dateCol);
    let date = "";
    // Try DD/MM/YYYY or YYYY-MM-DD
    const dmyMatch = rawDate.match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})$/);
    const isoMatch = rawDate.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (dmyMatch) {
      date = `${dmyMatch[3]}-${dmyMatch[2].padStart(2, "0")}-${dmyMatch[1].padStart(2, "0")}`;
    } else if (isoMatch) {
      date = `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
    }

    const description = get(descCol) || "Sin descripción";
    const notes = get(notesCol);

    const valid = !isNaN(amount) && amount > 0 && !!date;
    const error = !valid
      ? !date ? "Fecha inválida" : "Importe inválido"
      : undefined;

    return { description, amount, type, categoryId, categoryName: cat?.name || categoryName, date, notes, valid, error };
  });
}

interface ImportExportDialogProps {
  transactions: { id: string; amount: number; type: string; categoryId: string; description: string; date: string; notes?: string; isRecurring: boolean }[];
  onImportSuccess: () => void;
}

export function ImportExportDialog({ transactions, onImportSuccess }: ImportExportDialogProps) {
  const [open, setOpen] = useState(false);
  const [parsedRows, setParsedRows] = useState<ParsedRow[]>([]);
  const [importing, setImporting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const exportCSV = (all = false) => {
    const data = all ? transactions : transactions;
    const sep = ";";
    const header = `Fecha${sep}Descripción${sep}Categoría${sep}Tipo${sep}Importe${sep}Notas`;
    const rows = data.map((t) => {
      const cat = ALL_CATEGORIES.find((c) => c.id === t.categoryId);
      return [
        new Date(t.date).toLocaleDateString("es-ES"),
        `"${t.description}"`,
        cat?.name || t.categoryId,
        t.type === "INCOME" ? "Ingreso" : "Gasto",
        t.type === "INCOME" ? t.amount.toFixed(2) : (-t.amount).toFixed(2),
        `"${t.notes || ""}"`,
      ].join(sep);
    });
    const csv = [header, ...rows].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }); // BOM for Excel
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transacciones_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isExcel = file.name.endsWith(".xlsx") || file.name.endsWith(".xls");

    if (isExcel) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = new Uint8Array(ev.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const csv = XLSX.utils.sheet_to_csv(sheet, { FS: ";" });
          const rows = parseCSV(csv);
          setParsedRows(rows);
        } catch {
          toast.error("Error al leer el archivo Excel");
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        const rows = parseCSV(text);
        setParsedRows(rows);
      };
      reader.readAsText(file, "UTF-8");
    }
    e.target.value = "";
  };

  const handleImport = async () => {
    const valid = parsedRows.filter((r) => r.valid);
    if (valid.length === 0) return;
    setImporting(true);
    try {
      const res = await fetch("/api/transactions/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactions: valid }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success(`${data.imported} transacciones importadas correctamente`);
      setParsedRows([]);
      setOpen(false);
      onImportSuccess();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al importar";
      toast.error(msg);
    } finally {
      setImporting(false);
    }
  };

  const validCount = parsedRows.filter((r) => r.valid).length;
  const errorCount = parsedRows.filter((r) => !r.valid).length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1.5">
          <Download className="w-3.5 h-3.5" />
          Importar / Exportar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Importar / Exportar transacciones</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="export" className="flex-1 flex flex-col min-h-0">
          <TabsList className="flex-shrink-0">
            <TabsTrigger value="export" className="flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" /> Exportar
            </TabsTrigger>
            <TabsTrigger value="import" className="flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5" /> Importar
            </TabsTrigger>
          </TabsList>

          {/* Export tab */}
          <TabsContent value="export" className="space-y-4 mt-4">
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <p className="text-sm font-medium text-gray-700">Formato CSV compatible con Excel</p>
              </div>
              <p className="text-xs text-gray-500">
                Columnas: Fecha, Descripción, Categoría, Tipo, Importe, Notas
              </p>
              <p className="text-xs text-gray-400">
                {transactions.length} transacciones disponibles para exportar
              </p>
            </div>
            <Button onClick={() => exportCSV()} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Descargar CSV ({transactions.length} transacciones)
            </Button>
          </TabsContent>

          {/* Import tab */}
          <TabsContent value="import" className="space-y-4 mt-4 flex-1 flex flex-col min-h-0">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-1.5 flex-shrink-0">
              <p className="text-sm font-semibold text-blue-800">Formato esperado (CSV o Excel):</p>
              <p className="text-xs text-blue-700 font-mono">Fecha | Descripción | Categoría | Tipo | Importe | Notas</p>
              <p className="text-xs text-blue-600">
                Tipo: "Ingreso" o "Gasto" • Fecha: DD/MM/YYYY • CSV: separador ; o ,
              </p>
            </div>

            <div
              className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-emerald-400 hover:bg-emerald-50/30 transition-colors cursor-pointer flex-shrink-0"
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600">Haz clic para seleccionar un archivo</p>
              <p className="text-xs text-gray-400 mt-1">CSV, XLS o XLSX</p>
              <input ref={fileRef} type="file" accept=".csv,.txt,.xlsx,.xls" className="hidden" onChange={handleFile} />
            </div>

            {parsedRows.length > 0 && (
              <div className="flex-1 flex flex-col min-h-0 space-y-3">
                <div className="flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-3">
                    {validCount > 0 && (
                      <span className="flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> {validCount} válidas
                      </span>
                    )}
                    {errorCount > 0 && (
                      <span className="flex items-center gap-1 text-xs font-medium text-red-700 bg-red-100 px-2 py-1 rounded-full">
                        <AlertCircle className="w-3 h-3" /> {errorCount} con error
                      </span>
                    )}
                  </div>
                  <button onClick={() => setParsedRows([])} className="text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto border border-gray-100 rounded-xl">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="text-left py-2 px-3 text-gray-400 font-semibold">Fecha</th>
                        <th className="text-left py-2 px-3 text-gray-400 font-semibold">Descripción</th>
                        <th className="text-left py-2 px-3 text-gray-400 font-semibold">Categoría</th>
                        <th className="text-right py-2 px-3 text-gray-400 font-semibold">Importe</th>
                        <th className="py-2 px-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {parsedRows.map((row, i) => (
                        <tr key={i} className={cn("border-b border-gray-50", !row.valid && "bg-red-50")}>
                          <td className="py-1.5 px-3 text-gray-500">{row.date || "—"}</td>
                          <td className="py-1.5 px-3 text-gray-700 max-w-[120px] truncate">{row.description}</td>
                          <td className="py-1.5 px-3 text-gray-500">{row.categoryName || row.categoryId}</td>
                          <td className={cn("py-1.5 px-3 text-right font-medium", row.type === "INCOME" ? "text-emerald-600" : "text-red-500")}>
                            {row.type === "INCOME" ? "+" : "-"}{formatCurrency(row.amount)}
                          </td>
                          <td className="py-1.5 px-3">
                            {row.valid
                              ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              : <span title={row.error}><AlertCircle className="w-3.5 h-3.5 text-red-400" /></span>
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Button
                  onClick={handleImport}
                  disabled={importing || validCount === 0}
                  className="w-full flex-shrink-0"
                >
                  {importing ? "Importando..." : `Importar ${validCount} transacciones`}
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

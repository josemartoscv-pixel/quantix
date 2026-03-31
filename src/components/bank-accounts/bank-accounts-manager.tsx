"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Pencil, Trash2, Star, CreditCard, Banknote, TrendingUp, PiggyBank, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { BankAccountForm } from "./bank-account-form";

interface BankAccount {
  id: string;
  name: string;
  type: string;
  color: string;
  isDefault: boolean;
  createdAt: string;
}

const TYPE_LABELS: Record<string, string> = {
  checking: "Cuenta corriente",
  savings: "Ahorro",
  credit: "Tarjeta crédito",
  cash: "Efectivo",
  investment: "Inversión",
};

const TYPE_ICONS: Record<string, React.ElementType> = {
  checking: CreditCard,
  savings: PiggyBank,
  credit: CreditCard,
  cash: Banknote,
  investment: TrendingUp,
};

export function BankAccountsManager() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bank-accounts");
      const data = await res.json();
      setAccounts(data.accounts ?? []);
    } catch {
      toast.error("Error al cargar las cuentas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAccounts(); }, [fetchAccounts]);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/bank-accounts/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Cuenta eliminada");
      fetchAccounts();
    } else {
      toast.error("Error al eliminar");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-600" />
            Cuentas bancarias
          </CardTitle>
          <CardDescription className="mt-1">
            Gestiona tus cuentas y asígnalas a cada transacción
          </CardDescription>
        </div>
        <BankAccountForm onSuccess={fetchAccounts} />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-14 rounded-lg" />)}
          </div>
        ) : accounts.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Wallet className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No tienes cuentas configuradas.</p>
            <p className="text-xs mt-1">Crea una cuenta para asignarla a tus movimientos.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {accounts.map((account) => {
              const Icon = TYPE_ICONS[account.type] ?? CreditCard;
              return (
                <li
                  key={account.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 group"
                >
                  {/* Color dot + icon */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: account.color + "22", color: account.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-gray-900 truncate">{account.name}</span>
                      {account.isDefault && (
                        <Badge variant="secondary" className="text-xs py-0 px-1.5 gap-0.5">
                          <Star className="w-2.5 h-2.5" />
                          Principal
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{TYPE_LABELS[account.type]}</span>
                  </div>

                  {/* Color indicator */}
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: account.color }}
                  />

                  {/* Actions */}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <BankAccountForm
                      onSuccess={fetchAccounts}
                      initialData={account}
                      trigger={
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Pencil className="w-3.5 h-3.5 text-gray-400" />
                        </Button>
                      }
                    />
                    <ConfirmDialog
                      trigger={
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Trash2 className="w-3.5 h-3.5 text-red-400" />
                        </Button>
                      }
                      title="Eliminar cuenta"
                      description="Las transacciones asociadas quedarán sin cuenta asignada. ¿Continuar?"
                      onConfirm={() => handleDelete(account.id)}
                      confirmLabel="Eliminar"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

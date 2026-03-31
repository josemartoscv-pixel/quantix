"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Pencil, Trash2, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AssetForm } from "@/components/net-worth/asset-form";
import { LiabilityForm } from "@/components/net-worth/liability-form";
import { NetWorthLineChart } from "@/components/charts/net-worth-line-chart";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils/currency";
import { cn } from "@/lib/utils";

interface Asset {
  id: string;
  name: string;
  type: string;
  value: number;
  description?: string | null;
}

interface Liability {
  id: string;
  name: string;
  type: string;
  value: number;
  description?: string | null;
}

interface Snapshot {
  id: string;
  date: string;
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
}

const assetTypeLabels: Record<string, string> = {
  inmueble: "Inmueble", efectivo: "Efectivo", inversiones: "Inversiones",
  vehiculo: "Vehículo", "plan-pensiones": "Plan pensiones", negocio: "Negocio", otros: "Otros",
};

export default function PatrimonioPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [liabilities, setLiabilities] = useState<Liability[]>([]);
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [nwRes, snapshotRes] = await Promise.all([
        fetch("/api/net-worth"),
        fetch("/api/net-worth/snapshots"),
      ]);
      const [nwData, snapshotData] = await Promise.all([nwRes.json(), snapshotRes.json()]);
      setAssets(nwData.assets || []);
      setLiabilities(nwData.liabilities || []);
      setSnapshots(snapshotData.snapshots || []);
    } catch {
      toast.error("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleDeleteAsset = async (id: string) => {
    const res = await fetch(`/api/net-worth/assets/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Activo eliminado"); fetchData(); }
  };

  const handleDeleteLiability = async (id: string) => {
    const res = await fetch(`/api/net-worth/liabilities/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Pasivo eliminado"); fetchData(); }
  };

  const handleSnapshot = async () => {
    const res = await fetch("/api/net-worth/snapshots", { method: "POST" });
    if (res.ok) { toast.success("Snapshot registrado"); fetchData(); }
    else toast.error("Error al registrar snapshot");
  };

  const totalAssets = assets.reduce((s, a) => s + a.value, 0);
  const totalLiabilities = liabilities.reduce((s, l) => s + l.value, 0);
  const netWorth = totalAssets - totalLiabilities;

  const lastSnapshot = snapshots[snapshots.length - 2];
  const netWorthChange = lastSnapshot ? netWorth - lastSnapshot.netWorth : 0;

  return (
    <div className="space-y-6">
      {/* Net worth hero */}
      <Card className="bg-gradient-to-br from-emerald-600 to-teal-700 border-0 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-emerald-200 text-sm mb-1">Patrimonio neto</p>
              <p className="text-4xl font-bold">{formatCurrency(netWorth)}</p>
              {netWorthChange !== 0 && (
                <p className={cn("text-sm mt-1", netWorthChange > 0 ? "text-emerald-200" : "text-red-200")}>
                  {netWorthChange > 0 ? "+" : ""}{formatCurrency(netWorthChange)} vs último snapshot
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between gap-8">
                <span className="text-emerald-200">Activos</span>
                <span className="font-semibold">{formatCurrency(totalAssets)}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-emerald-200">Pasivos</span>
                <span className="font-semibold">{formatCurrency(totalLiabilities)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={handleSnapshot}>
          <Camera className="w-4 h-4 mr-2" />
          Registrar snapshot
        </Button>
      </div>

      {/* History chart */}
      {snapshots.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Evolución del patrimonio</CardTitle>
          </CardHeader>
          <CardContent>
            <NetWorthLineChart snapshots={snapshots} />
          </CardContent>
        </Card>
      )}

      {/* Assets & Liabilities columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assets */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-emerald-700">Activos</CardTitle>
            <AssetForm onSuccess={fetchData} />
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-4 space-y-2">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-12" />)}</div>
            ) : assets.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-8">No hay activos registrados</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {assets.map((asset) => (
                  <li key={asset.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 group">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{asset.name}</p>
                      <Badge variant="secondary" className="text-xs mt-0.5">{assetTypeLabels[asset.type] || asset.type}</Badge>
                    </div>
                    <span className="text-emerald-600 font-semibold text-sm">{formatCurrency(asset.value)}</span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                      <AssetForm
                        initialData={asset}
                        onSuccess={fetchData}
                        trigger={<Button variant="ghost" size="icon"><Pencil className="w-4 h-4 text-gray-400" /></Button>}
                      />
                      <ConfirmDialog
                        trigger={<Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-red-400" /></Button>}
                        title="Eliminar activo"
                        description="¿Estás seguro?"
                        onConfirm={() => handleDeleteAsset(asset.id)}
                        confirmLabel="Eliminar"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {assets.length > 0 && (
              <div className="px-5 py-3 border-t border-gray-100 flex justify-between text-sm font-semibold">
                <span>Total activos</span>
                <span className="text-emerald-600">{formatCurrency(totalAssets)}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Liabilities */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-red-700">Pasivos</CardTitle>
            <LiabilityForm onSuccess={fetchData} />
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-4 space-y-2">{[...Array(2)].map((_, i) => <Skeleton key={i} className="h-12" />)}</div>
            ) : liabilities.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-8">No hay pasivos registrados</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {liabilities.map((liability) => (
                  <li key={liability.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 group">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{liability.name}</p>
                      <Badge variant="secondary" className="text-xs mt-0.5">{assetTypeLabels[liability.type] || liability.type}</Badge>
                    </div>
                    <span className="text-red-600 font-semibold text-sm">{formatCurrency(liability.value)}</span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                      <LiabilityForm
                        initialData={liability}
                        onSuccess={fetchData}
                        trigger={<Button variant="ghost" size="icon"><Pencil className="w-4 h-4 text-gray-400" /></Button>}
                      />
                      <ConfirmDialog
                        trigger={<Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-red-400" /></Button>}
                        title="Eliminar pasivo"
                        description="¿Estás seguro?"
                        onConfirm={() => handleDeleteLiability(liability.id)}
                        confirmLabel="Eliminar"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {liabilities.length > 0 && (
              <div className="px-5 py-3 border-t border-gray-100 flex justify-between text-sm font-semibold">
                <span>Total pasivos</span>
                <span className="text-red-600">{formatCurrency(totalLiabilities)}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

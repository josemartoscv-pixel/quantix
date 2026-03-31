"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, User, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BankAccountsManager } from "@/components/bank-accounts/bank-accounts-manager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const profileSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email no válido"),
  currency: z.string().min(1),
  monthlyIncome: z.number().min(0).optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "La contraseña actual es obligatoria"),
  newPassword: z.string().min(8, "La nueva contraseña debe tener al menos 8 caracteres"),
  confirmPassword: z.string().min(1, "Confirma la nueva contraseña"),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type ProfileData = z.infer<typeof profileSchema>;
type PasswordData = z.infer<typeof passwordSchema>;

const CURRENCIES = [
  { value: "EUR", label: "€ Euro" },
  { value: "USD", label: "$ Dólar estadounidense" },
  { value: "GBP", label: "£ Libra esterlina" },
  { value: "MXN", label: "$ Peso mexicano" },
  { value: "ARS", label: "$ Peso argentino" },
  { value: "COP", label: "$ Peso colombiano" },
  { value: "CLP", label: "$ Peso chileno" },
];

export default function PerfilPage() {
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [currency, setCurrency] = useState("EUR");

  const { register: regProfile, handleSubmit: handleProfile, setValue, formState: { errors: profileErrors, isSubmitting: submittingProfile } } =
    useForm<ProfileData>({
      resolver: zodResolver(profileSchema),
      defaultValues: { currency: "EUR", monthlyIncome: undefined },
    });

  const { register: regPassword, handleSubmit: handlePassword, reset: resetPassword, formState: { errors: passwordErrors, isSubmitting: submittingPassword } } =
    useForm<PasswordData>({ resolver: zodResolver(passwordSchema) });

  useEffect(() => {
    fetch("/api/profile").then((r) => r.json()).then((data) => {
      if (data.user) {
        setValue("name", data.user.name || "");
        setValue("email", data.user.email || "");
        setValue("currency", data.user.currency || "EUR");
        setValue("monthlyIncome", data.user.monthlyIncome || undefined);
        setCurrency(data.user.currency || "EUR");
      }
    });
  }, [setValue]);

  const onProfileSubmit = async (data: ProfileData) => {
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, currency }),
      });
      if (!res.ok) throw new Error();
      toast.success("Perfil actualizado correctamente");
    } catch {
      toast.error("Error al actualizar el perfil");
    }
  };

  const onPasswordSubmit = async (data: PasswordData) => {
    try {
      const res = await fetch("/api/profile/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: data.currentPassword, newPassword: data.newPassword }),
      });
      if (!res.ok) {
        const body = await res.json();
        toast.error(body.error || "Error al cambiar la contraseña");
        return;
      }
      toast.success("Contraseña actualizada correctamente");
      resetPassword();
    } catch {
      toast.error("Error al cambiar la contraseña");
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Profile */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-emerald-700" />
            </div>
            <CardTitle>Información de perfil</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfile(onProfileSubmit)} className="space-y-4">
            <div>
              <Label>Nombre completo</Label>
              <Input placeholder="Tu nombre" {...regProfile("name")} className="mt-1" />
              {profileErrors.name && <p className="text-red-600 text-xs mt-1">{profileErrors.name.message}</p>}
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="tu@email.com" {...regProfile("email")} className="mt-1" />
              {profileErrors.email && <p className="text-red-600 text-xs mt-1">{profileErrors.email.message}</p>}
            </div>
            <div>
              <Label>Moneda preferida</Label>
              <Select value={currency} onValueChange={(v) => { setCurrency(v); setValue("currency", v); }}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Ingreso mensual neto (€)</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="Ej: 2000"
                {...regProfile("monthlyIncome", { valueAsNumber: true })}
                className="mt-1"
              />
              <p className="text-xs text-gray-400 mt-1">Usado para calcular tu puntuación de salud financiera</p>
            </div>
            <Button type="submit" disabled={submittingProfile}>
              {submittingProfile ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Guardando...</> : "Guardar cambios"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Password */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Lock className="w-5 h-5 text-emerald-700" />
            </div>
            <CardTitle>Cambiar contraseña</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePassword(onPasswordSubmit)} className="space-y-4">
            <div>
              <Label>Contraseña actual</Label>
              <Input type="password" {...regPassword("currentPassword")} className="mt-1" />
              {passwordErrors.currentPassword && <p className="text-red-600 text-xs mt-1">{passwordErrors.currentPassword.message}</p>}
            </div>
            <div>
              <Label>Nueva contraseña</Label>
              <Input type="password" {...regPassword("newPassword")} className="mt-1" />
              {passwordErrors.newPassword && <p className="text-red-600 text-xs mt-1">{passwordErrors.newPassword.message}</p>}
            </div>
            <div>
              <Label>Confirmar nueva contraseña</Label>
              <Input type="password" {...regPassword("confirmPassword")} className="mt-1" />
              {passwordErrors.confirmPassword && <p className="text-red-600 text-xs mt-1">{passwordErrors.confirmPassword.message}</p>}
            </div>
            <Button type="submit" disabled={submittingPassword}>
              {submittingPassword ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Cambiando...</> : "Cambiar contraseña"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <BankAccountsManager />
    </div>
  );
}

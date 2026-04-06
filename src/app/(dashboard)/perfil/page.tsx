"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, User, Lock, Calculator, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompoundInterestCalc } from "@/components/calculators/compound-interest-calc";
import { CustomCategoriesManager } from "@/components/categories/custom-categories-manager";
import { LoanPaymentCalc } from "@/components/calculators/loan-payment-calc";
import { HouseCalc } from "@/components/calculators/house-calc";
import { FireCalc } from "@/components/calculators/fire-calc";
import { InflationCalc } from "@/components/calculators/inflation-calc";
import { RentVsBuyCalc } from "@/components/calculators/rent-vs-buy-calc";

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
    <Tabs defaultValue="perfil" className="space-y-4">
      <TabsList className="flex flex-wrap h-auto gap-1">
        <TabsTrigger value="perfil" className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5" /> Perfil
        </TabsTrigger>
        <TabsTrigger value="contrasena" className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5" /> Contraseña
        </TabsTrigger>
        <TabsTrigger value="categorias" className="flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5" /> Categorías
        </TabsTrigger>
        <TabsTrigger value="calculadoras" className="flex items-center gap-1.5">
          <Calculator className="w-3.5 h-3.5" /> Calculadoras
        </TabsTrigger>
      </TabsList>

      {/* Perfil tab */}
      <TabsContent value="perfil">
        <Card className="max-w-2xl">
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
      </TabsContent>

      {/* Contraseña tab */}
      <TabsContent value="contrasena">
        <Card className="max-w-2xl">
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
      </TabsContent>

      {/* Categorías tab */}
      <TabsContent value="categorias">
        <Card className="max-w-2xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Tag className="w-5 h-5 text-emerald-700" />
              </div>
              <CardTitle>Categorías personalizadas</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CustomCategoriesManager />
          </CardContent>
        </Card>
      </TabsContent>

      {/* Calculadoras tab */}
      <TabsContent value="calculadoras">
        <div className="space-y-4">
          <Tabs defaultValue="interes">
            <TabsList className="flex flex-wrap h-auto gap-1">
              <TabsTrigger value="interes">Interés compuesto</TabsTrigger>
              <TabsTrigger value="prestamo">Préstamo</TabsTrigger>
              <TabsTrigger value="vivienda">Comprar casa</TabsTrigger>
              <TabsTrigger value="alquiler">Alquiler vs Compra</TabsTrigger>
              <TabsTrigger value="fire">Independencia financiera</TabsTrigger>
              <TabsTrigger value="inflacion">Inflación</TabsTrigger>
            </TabsList>

            <TabsContent value="interes">
              <Card>
                <CardHeader>
                  <CardTitle>Calculadora de Interés Compuesto</CardTitle>
                  <CardDescription>
                    Descubre cómo crece tu dinero a lo largo del tiempo gracias al interés compuesto y las aportaciones regulares.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CompoundInterestCalc />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prestamo">
              <Card>
                <CardHeader>
                  <CardTitle>Calculadora de Préstamo</CardTitle>
                  <CardDescription>
                    Calcula la cuota mensual de un préstamo y visualiza la tabla de amortización completa.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LoanPaymentCalc />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vivienda">
              <Card>
                <CardHeader>
                  <CardTitle>¿Puedo comprarme una casa?</CardTitle>
                  <CardDescription>
                    Calcula cuánto necesitas ahorrar, los impuestos y gastos asociados, y si la hipoteca cabe en tu presupuesto.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <HouseCalc />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alquiler">
              <Card>
                <CardHeader>
                  <CardTitle>¿Alquiler o Compra?</CardTitle>
                  <CardDescription>
                    Compara el coste real de comprar vs alquilar e invertir la entrada.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RentVsBuyCalc />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fire">
              <Card>
                <CardHeader>
                  <CardTitle>Independencia Financiera (FIRE)</CardTitle>
                  <CardDescription>
                    Calcula cuánto necesitas ahorrar para vivir de tus inversiones y cuándo podrías dejar de trabajar.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FireCalc />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inflacion">
              <Card>
                <CardHeader>
                  <CardTitle>Calculadora de Inflación</CardTitle>
                  <CardDescription>
                    Descubre cuánto poder adquisitivo pierdes con el tiempo y cuánto necesitarás en el futuro para mantener tu nivel de vida.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InflationCalc />
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>
      </TabsContent>
    </Tabs>
  );
}

"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

const CalcSkeleton = () => (
  <div className="flex items-center justify-center py-16 text-gray-400">
    <Loader2 className="w-5 h-5 animate-spin mr-2" />
    <span className="text-sm">Cargando calculadora...</span>
  </div>
);

const CompoundInterestCalc = dynamic(() => import("@/components/calculators/compound-interest-calc").then(m => ({ default: m.CompoundInterestCalc })), { loading: CalcSkeleton });
const LoanPaymentCalc      = dynamic(() => import("@/components/calculators/loan-payment-calc").then(m => ({ default: m.LoanPaymentCalc })), { loading: CalcSkeleton });
const HouseCalc            = dynamic(() => import("@/components/calculators/house-calc").then(m => ({ default: m.HouseCalc })), { loading: CalcSkeleton });
const FireCalc             = dynamic(() => import("@/components/calculators/fire-calc").then(m => ({ default: m.FireCalc })), { loading: CalcSkeleton });
const InflationCalc        = dynamic(() => import("@/components/calculators/inflation-calc").then(m => ({ default: m.InflationCalc })), { loading: CalcSkeleton });
const RentVsBuyCalc        = dynamic(() => import("@/components/calculators/rent-vs-buy-calc").then(m => ({ default: m.RentVsBuyCalc })), { loading: CalcSkeleton });

export default function CalculadorasPage() {
  return (
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
              <CardDescription>Descubre cómo crece tu dinero a lo largo del tiempo gracias al interés compuesto y las aportaciones regulares.</CardDescription>
            </CardHeader>
            <CardContent><CompoundInterestCalc /></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prestamo">
          <Card>
            <CardHeader>
              <CardTitle>Calculadora de Préstamo</CardTitle>
              <CardDescription>Calcula la cuota mensual de un préstamo y visualiza la tabla de amortización completa.</CardDescription>
            </CardHeader>
            <CardContent><LoanPaymentCalc /></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vivienda">
          <Card>
            <CardHeader>
              <CardTitle>¿Puedo comprarme una casa?</CardTitle>
              <CardDescription>Calcula cuánto necesitas ahorrar, los impuestos y gastos asociados, y si la hipoteca cabe en tu presupuesto.</CardDescription>
            </CardHeader>
            <CardContent><HouseCalc /></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alquiler">
          <Card>
            <CardHeader>
              <CardTitle>¿Alquiler o Compra?</CardTitle>
              <CardDescription>Compara el coste real de comprar vs alquilar e invertir la entrada. Incluye hipoteca, impuestos, revalorización y coste de oportunidad.</CardDescription>
            </CardHeader>
            <CardContent><RentVsBuyCalc /></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fire">
          <Card>
            <CardHeader>
              <CardTitle>Independencia Financiera (FIRE)</CardTitle>
              <CardDescription>Calcula cuánto necesitas ahorrar para vivir de tus inversiones y cuándo podrías dejar de trabajar.</CardDescription>
            </CardHeader>
            <CardContent><FireCalc /></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inflacion">
          <Card>
            <CardHeader>
              <CardTitle>Calculadora de Inflación</CardTitle>
              <CardDescription>Descubre cuánto poder adquisitivo pierdes con el tiempo y cuánto necesitarás en el futuro para mantener tu nivel de vida.</CardDescription>
            </CardHeader>
            <CardContent><InflationCalc /></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

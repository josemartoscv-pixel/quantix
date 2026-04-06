"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompoundInterestCalc } from "@/components/calculators/compound-interest-calc";
import { LoanPaymentCalc } from "@/components/calculators/loan-payment-calc";
import { HouseCalc } from "@/components/calculators/house-calc";
import { FireCalc } from "@/components/calculators/fire-calc";
import { InflationCalc } from "@/components/calculators/inflation-calc";
import { RentVsBuyCalc } from "@/components/calculators/rent-vs-buy-calc";

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
                Compara el coste real de comprar vs alquilar e invertir la entrada. Incluye hipoteca, impuestos, revalorización y coste de oportunidad.
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
  );
}

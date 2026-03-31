"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompoundInterestCalc } from "@/components/calculators/compound-interest-calc";
import { LoanPaymentCalc } from "@/components/calculators/loan-payment-calc";
import { SavingsGoalCalc } from "@/components/calculators/savings-goal-calc";
import { EmergencyFundCalc } from "@/components/calculators/emergency-fund-calc";

export default function CalculadorasPage() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="interes">
        <TabsList className="flex flex-wrap h-auto gap-1">
          <TabsTrigger value="interes">Interés compuesto</TabsTrigger>
          <TabsTrigger value="prestamo">Préstamo</TabsTrigger>
          <TabsTrigger value="meta">Meta de ahorro</TabsTrigger>
          <TabsTrigger value="emergencia">Fondo emergencia</TabsTrigger>
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

        <TabsContent value="meta">
          <Card>
            <CardHeader>
              <CardTitle>Calculadora de Meta de Ahorro</CardTitle>
              <CardDescription>
                ¿Cuánto tiempo necesitas para alcanzar tu objetivo de ahorro? Descúbrelo aquí.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SavingsGoalCalc />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergencia">
          <Card>
            <CardHeader>
              <CardTitle>Calculadora de Fondo de Emergencia</CardTitle>
              <CardDescription>
                Calcula cuánto necesitas en tu fondo de emergencia y cuándo lo alcanzarás.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmergencyFundCalc />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

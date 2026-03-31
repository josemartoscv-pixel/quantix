import { z } from "zod";

export const debtSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(100, "El nombre no puede superar los 100 caracteres"),
  type: z.string().min(1, "Selecciona el tipo de deuda"),
  initialAmount: z
    .number({ error: "Introduce un importe válido" })
    .positive("El importe inicial debe ser mayor que 0"),
  currentBalance: z
    .number({ error: "Introduce un importe válido" })
    .min(0, "El saldo actual no puede ser negativo"),
  interestRate: z
    .number({ error: "Introduce una tasa válida" })
    .min(0, "La tasa de interés no puede ser negativa")
    .max(200, "La tasa de interés no es válida"),
  minimumPayment: z
    .number({ error: "Introduce un importe válido" })
    .min(0, "El pago mínimo no puede ser negativo")
    .optional(),
  startDate: z.string().min(1, "La fecha de inicio es obligatoria"),
  lender: z
    .string()
    .max(100, "El prestamista no puede superar los 100 caracteres")
    .optional(),
  notes: z
    .string()
    .max(500, "Las notas no pueden superar los 500 caracteres")
    .optional(),
});

export const paymentSchema = z.object({
  amount: z
    .number({ error: "Introduce un importe válido" })
    .positive("El importe debe ser mayor que 0"),
  notes: z
    .string()
    .max(300, "Las notas no pueden superar los 300 caracteres")
    .optional(),
  date: z.string().optional(),
});

export type DebtFormData = z.infer<typeof debtSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;

import { z } from "zod";

const optionalNumber = (min = 0) =>
  z.preprocess(
    (v) => (v === null || v === undefined || v === "" || (typeof v === "number" && isNaN(v)) ? undefined : Number(v)),
    z.number().min(min).optional()
  );

export const debtSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(100, "El nombre no puede superar los 100 caracteres"),
  type: z.string().min(1, "Selecciona el tipo de deuda"),
  initialAmount: z.preprocess(
    (v) => (v === null || v === undefined || v === "" ? undefined : Number(v)),
    z.number({ error: "Introduce un importe válido" }).positive("El importe inicial debe ser mayor que 0")
  ),
  currentBalance: z.preprocess(
    (v) => (v === null || v === undefined || v === "" ? undefined : Number(v)),
    z.number({ error: "Introduce un importe válido" }).min(0, "El saldo actual no puede ser negativo")
  ),
  interestRate: z.preprocess(
    (v) => (v === null || v === undefined || v === "" ? undefined : Number(v)),
    z.number({ error: "Introduce una tasa válida" }).min(0).max(200, "La tasa de interés no es válida")
  ),
  minimumPayment: optionalNumber(0),
  startDate: z.string().min(1, "La fecha de inicio es obligatoria"),
  remainingYears: z.preprocess(
    (v) => (v === null || v === undefined || v === "" || (typeof v === "number" && isNaN(v)) ? undefined : Number(v)),
    z.number().int().min(0).max(50).optional()
  ),
  remainingMonths: z.preprocess(
    (v) => (v === null || v === undefined || v === "" || (typeof v === "number" && isNaN(v)) ? undefined : Number(v)),
    z.number().int().min(0).max(11).optional()
  ),
  lender: z.string().max(100).optional(),
  notes: z.string().max(500).optional(),
});

export const paymentSchema = z.object({
  amount: z
    .number({ error: "Introduce un importe válido" })
    .positive("El importe debe ser mayor que 0"),
  notes: z.string().max(300).optional(),
  date: z.string().optional(),
});

// Tipo explícito para el formulario (z.preprocess produce 'unknown' en la inferencia)
export type DebtFormData = {
  name: string;
  type: string;
  initialAmount: number;
  currentBalance: number;
  interestRate: number;
  minimumPayment?: number;
  startDate: string;
  remainingYears?: number;
  remainingMonths?: number;
  lender?: string;
  notes?: string;
};

export type PaymentFormData = z.infer<typeof paymentSchema>;

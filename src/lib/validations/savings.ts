import { z } from "zod";

export const savingsGoalSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(100, "El nombre no puede superar los 100 caracteres"),
  targetAmount: z
    .number({ error: "Introduce un importe válido" })
    .positive("El importe objetivo debe ser mayor que 0"),
  description: z
    .string()
    .max(300, "La descripción no puede superar los 300 caracteres")
    .optional(),
  targetDate: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
});

export const depositSchema = z.object({
  amount: z
    .number({ error: "Introduce un importe válido" })
    .positive("El importe debe ser mayor que 0"),
  notes: z
    .string()
    .max(300, "Las notas no pueden superar los 300 caracteres")
    .optional(),
  date: z.string().optional(),
});

export type SavingsGoalFormData = z.infer<typeof savingsGoalSchema>;
export type DepositFormData = z.infer<typeof depositSchema>;

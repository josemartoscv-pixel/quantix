import { z } from "zod";

export const transactionSchema = z.object({
  amount: z
    .number({ error: "Introduce un importe válido" })
    .positive("El importe debe ser mayor que 0"),
  type: z.enum(["INCOME", "EXPENSE"], {
    error: "Selecciona el tipo de transacción",
  }),
  categoryId: z.string().min(1, "Selecciona una categoría"),
  description: z
    .string()
    .min(1, "La descripción es obligatoria")
    .max(200, "La descripción no puede superar los 200 caracteres"),
  date: z.string().min(1, "La fecha es obligatoria"),
  notes: z.string().max(500, "Las notas no pueden superar los 500 caracteres").optional(),
  isRecurring: z.boolean().optional(),
  recurrence: z.string().optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;

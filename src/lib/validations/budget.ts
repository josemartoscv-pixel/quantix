import { z } from "zod";

export const budgetSchema = z.object({
  categoryId: z.string().min(1, "Selecciona una categoría"),
  amount: z
    .number({ error: "Introduce un importe válido" })
    .positive("El importe debe ser mayor que 0"),
  month: z
    .number()
    .int()
    .min(1, "El mes debe ser entre 1 y 12")
    .max(12, "El mes debe ser entre 1 y 12"),
  year: z
    .number()
    .int()
    .min(2000, "Año no válido")
    .max(2100, "Año no válido"),
});

export type BudgetFormData = z.infer<typeof budgetSchema>;

import { z } from "zod";

export const assetSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(100, "El nombre no puede superar los 100 caracteres"),
  type: z.string().min(1, "Selecciona el tipo de activo"),
  value: z
    .number({ error: "Introduce un valor válido" })
    .positive("El valor debe ser mayor que 0"),
  description: z
    .string()
    .max(300, "La descripción no puede superar los 300 caracteres")
    .optional(),
});

export const liabilitySchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(100, "El nombre no puede superar los 100 caracteres"),
  type: z.string().min(1, "Selecciona el tipo de pasivo"),
  value: z
    .number({ error: "Introduce un valor válido" })
    .positive("El valor debe ser mayor que 0"),
  description: z
    .string()
    .max(300, "La descripción no puede superar los 300 caracteres")
    .optional(),
});

export type AssetFormData = z.infer<typeof assetSchema>;
export type LiabilityFormData = z.infer<typeof liabilitySchema>;

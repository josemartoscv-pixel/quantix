export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const EXPENSE_CATEGORIES: Category[] = [
  { id: "alimentacion", name: "Alimentación", icon: "ShoppingCart", color: "#f97316" },
  { id: "transporte", name: "Transporte", icon: "Car", color: "#3b82f6" },
  { id: "vivienda", name: "Vivienda", icon: "Home", color: "#8b5cf6" },
  { id: "salud", name: "Salud", icon: "Heart", color: "#ef4444" },
  { id: "educacion", name: "Educación", icon: "GraduationCap", color: "#06b6d4" },
  { id: "entretenimiento", name: "Entretenimiento", icon: "Tv", color: "#ec4899" },
  { id: "ropa", name: "Ropa y calzado", icon: "Shirt", color: "#a855f7" },
  { id: "tecnologia", name: "Tecnología", icon: "Laptop", color: "#6366f1" },
  { id: "restaurantes", name: "Restaurantes", icon: "UtensilsCrossed", color: "#f59e0b" },
  { id: "viajes", name: "Viajes", icon: "Plane", color: "#14b8a6" },
  { id: "seguros", name: "Seguros", icon: "Shield", color: "#64748b" },
  { id: "otros-gastos", name: "Otros gastos", icon: "MoreHorizontal", color: "#9ca3af" },
];

export const INCOME_CATEGORIES: Category[] = [
  { id: "salario", name: "Salario", icon: "Briefcase", color: "#10b981" },
  { id: "freelance", name: "Freelance", icon: "Code", color: "#059669" },
  { id: "inversiones", name: "Inversiones", icon: "TrendingUp", color: "#0d9488" },
  { id: "alquiler", name: "Alquiler", icon: "Building2", color: "#0891b2" },
  { id: "regalo", name: "Regalo", icon: "Gift", color: "#7c3aed" },
  { id: "otros-ingresos", name: "Otros ingresos", icon: "Plus", color: "#6b7280" },
];

export function getAllCategories(): Category[] {
  return [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];
}

export function getCategoryById(id: string): Category | undefined {
  return getAllCategories().find((cat) => cat.id === id);
}

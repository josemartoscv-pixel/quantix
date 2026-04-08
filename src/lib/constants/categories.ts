export interface Category {
  id: string;
  name: string;
  icon: string;
  emoji: string;
  color: string;
}

export const EXPENSE_CATEGORIES: Category[] = [
  { id: "alimentacion", name: "Alimentación", icon: "ShoppingCart", emoji: "🛒", color: "#f97316" },
  { id: "supermercado", name: "Supermercado", icon: "ShoppingBasket", emoji: "🛍️", color: "#84cc16" },
  { id: "transporte", name: "Transporte", icon: "Car", emoji: "🚗", color: "#3b82f6" },
  { id: "vivienda", name: "Vivienda", icon: "Home", emoji: "🏠", color: "#8b5cf6" },
  { id: "salud", name: "Salud", icon: "Heart", emoji: "❤️", color: "#ef4444" },
  { id: "educacion", name: "Educación", icon: "GraduationCap", emoji: "🎓", color: "#06b6d4" },
  { id: "entretenimiento", name: "Entretenimiento", icon: "Tv", emoji: "🎮", color: "#ec4899" },
  { id: "ropa", name: "Ropa y calzado", icon: "Shirt", emoji: "👕", color: "#a855f7" },
  { id: "tecnologia", name: "Tecnología", icon: "Laptop", emoji: "💻", color: "#6366f1" },
  { id: "restaurantes", name: "Restaurantes", icon: "UtensilsCrossed", emoji: "🍔", color: "#f59e0b" },
  { id: "viajes", name: "Viajes", icon: "Plane", emoji: "✈️", color: "#14b8a6" },
  { id: "seguros", name: "Seguros", icon: "Shield", emoji: "🛡️", color: "#64748b" },
  { id: "belleza", name: "Belleza", icon: "Sparkles", emoji: "💅", color: "#f472b6" },
  { id: "fiesta", name: "Fiesta", icon: "PartyPopper", emoji: "🎉", color: "#fb923c" },
  { id: "bizum", name: "Bizum", icon: "Smartphone", emoji: "📱", color: "#0ea5e9" },
  { id: "otros-gastos", name: "Otros gastos", icon: "MoreHorizontal", emoji: "📦", color: "#9ca3af" },
];

export const INCOME_CATEGORIES: Category[] = [
  { id: "salario", name: "Salario", icon: "Briefcase", emoji: "💼", color: "#10b981" },
  { id: "freelance", name: "Freelance", icon: "Code", emoji: "💻", color: "#059669" },
  { id: "inversiones", name: "Inversiones", icon: "TrendingUp", emoji: "📈", color: "#0d9488" },
  { id: "alquiler", name: "Alquiler", icon: "Building2", emoji: "🏢", color: "#0891b2" },
  { id: "regalo", name: "Regalo", icon: "Gift", emoji: "🎁", color: "#7c3aed" },
  { id: "otros-ingresos", name: "Otros ingresos", icon: "Plus", emoji: "💰", color: "#6b7280" },
];

export function getAllCategories(): Category[] {
  return [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];
}

export function getCategoryById(id: string): Category | undefined {
  return getAllCategories().find((cat) => cat.id === id);
}

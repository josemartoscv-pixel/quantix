import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/currency";

interface AmountDisplayProps {
  amount: number;
  type?: "income" | "expense" | "neutral";
  currency?: string;
  showSign?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function AmountDisplay({
  amount,
  type = "neutral",
  currency = "EUR",
  showSign = true,
  className,
  size = "md",
}: AmountDisplayProps) {
  const formatted = formatCurrency(Math.abs(amount), currency);

  const colorClass =
    type === "income"
      ? "text-emerald-600"
      : type === "expense"
      ? "text-red-600"
      : amount >= 0
      ? "text-emerald-600"
      : "text-red-600";

  const sizeClass =
    size === "sm"
      ? "text-sm"
      : size === "lg"
      ? "text-2xl font-bold"
      : "text-base font-medium";

  const sign =
    showSign
      ? type === "income"
        ? "+"
        : type === "expense"
        ? "-"
        : amount >= 0
        ? "+"
        : "-"
      : "";

  return (
    <span className={cn(colorClass, sizeClass, className)}>
      {sign}
      {formatted}
    </span>
  );
}

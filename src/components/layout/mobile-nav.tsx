"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  PiggyBank,
  Calculator,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Inicio" },
  { href: "/transacciones", icon: CreditCard, label: "Transacciones" },
  { href: "/ahorros", icon: PiggyBank, label: "Metas" },
  { href: "/calculadoras", icon: Calculator, label: "Calculadoras" },
  { href: "/educacion", icon: BookOpen, label: "Educación" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40 safe-area-pb shadow-[0_-1px_12px_rgba(0,0,0,0.06)]">
      <div className="flex px-2 py-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            tab.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-2 gap-1 transition-all active:scale-90 rounded-xl mx-0.5",
                isActive ? "" : "opacity-50 hover:opacity-80"
              )}
            >
              <div className={cn(
                "w-10 h-7 rounded-lg flex items-center justify-center transition-all",
                isActive ? "bg-emerald-500 shadow-sm" : ""
              )}>
                <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-gray-500")} />
              </div>
              <span className={cn("text-[10px] font-semibold truncate", isActive ? "text-emerald-600" : "text-gray-400")}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

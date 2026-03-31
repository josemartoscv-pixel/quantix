"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  Wallet,
  PiggyBank,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Inicio" },
  { href: "/transacciones", icon: CreditCard, label: "Transacciones" },
  { href: "/presupuesto", icon: Wallet, label: "Presupuesto" },
  { href: "/ahorros", icon: PiggyBank, label: "Ahorros" },
  { href: "/perfil", icon: User, label: "Perfil" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-pb">
      <div className="flex">
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
                "flex-1 flex flex-col items-center justify-center py-2 gap-1 text-xs font-medium transition-colors",
                isActive
                  ? "text-emerald-600"
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="truncate">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

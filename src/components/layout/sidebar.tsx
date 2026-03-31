"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  Wallet,
  PiggyBank,
  TrendingDown,
  BarChart3,
  Building2,
  Calculator,
  BookOpen,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Principal",
    items: [
      { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    ],
  },
  {
    label: "Gestión",
    items: [
      { href: "/transacciones", icon: CreditCard, label: "Transacciones" },
      { href: "/presupuesto", icon: Wallet, label: "Presupuesto" },
      { href: "/ahorros", icon: PiggyBank, label: "Ahorros" },
      { href: "/deudas", icon: TrendingDown, label: "Deudas" },
    ],
  },
  {
    label: "Análisis",
    items: [
      { href: "/reportes", icon: BarChart3, label: "Reportes" },
      { href: "/patrimonio", icon: Building2, label: "Patrimonio" },
    ],
  },
  {
    label: "Herramientas",
    items: [
      { href: "/calculadoras", icon: Calculator, label: "Calculadoras" },
      { href: "/educacion", icon: BookOpen, label: "Educación" },
    ],
  },
  {
    label: "Cuenta",
    items: [
      { href: "/perfil", icon: User, label: "Perfil" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 flex-col z-40">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
        <span className="text-2xl">💰</span>
        <span className="font-bold text-xl text-gray-900">FinanzasApp</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-6">
            <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        active
                          ? "bg-emerald-50 text-emerald-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-5 h-5 flex-shrink-0",
                          active ? "text-emerald-600" : "text-gray-400"
                        )}
                      />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

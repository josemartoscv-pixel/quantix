"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  Landmark,
  PiggyBank,
  Calculator,
  Building2,
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
      { href: "/cuentas", icon: Landmark, label: "Cuentas bancarias" },
      { href: "/ahorros", icon: PiggyBank, label: "Metas" },
    ],
  },
  {
    label: "Herramientas",
    items: [
      { href: "/calculadoras", icon: Calculator, label: "Calculadoras" },
    ],
  },
  {
    label: "Interno",
    items: [
      { href: "/oficina", icon: Building2, label: "La Oficina" },
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
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-60 bg-white border-r border-gray-100 flex-col z-40">
      {/* Logo */}
      <div className="flex items-center px-4 py-3 border-b border-gray-100">
        <Image src="/logo.png" alt="DineroyAhorro" width={386} height={54} className="h-7 w-auto" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="px-3 mb-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
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
                        "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 active:scale-95",
                        active
                          ? "bg-emerald-50 text-emerald-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <div className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all",
                        active
                          ? "bg-emerald-500 text-white shadow-sm"
                          : "bg-gray-100 text-gray-500"
                      )}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className={active ? "font-semibold" : ""}>{item.label}</span>
                      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />}
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

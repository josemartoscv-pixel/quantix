"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { LogOut, User, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/transacciones": "Transacciones",
  "/presupuesto": "Presupuesto",
  "/ahorros": "Metas",
  "/deudas": "Deudas",
  "/calculadoras": "Calculadoras",
  "/educacion": "Educación Financiera",
  "/perfil": "Mi Perfil",
};

interface TopbarProps {
  userName?: string | null;
  userEmail?: string | null;
}

const TREND_CONFIG = {
  better: { icon: "🔥", text: "Mejor que el mes pasado", classes: "bg-emerald-100 text-emerald-700" },
  worse:  { icon: "⚠️", text: "Más gastos que el mes pasado", classes: "bg-amber-100 text-amber-700" },
  same:   { icon: "➡️", text: "Similar al mes pasado", classes: "bg-gray-100 text-gray-600" },
};

export function Topbar({ userName, userEmail }: TopbarProps) {
  const pathname = usePathname();
  const [trend, setTrend] = useState<"better" | "worse" | "same" | null>(null);

  useEffect(() => {
    if (pathname === "/dashboard") {
      fetch("/api/dashboard/trend")
        .then((r) => r.json())
        .then((d) => setTrend(d.trend || null))
        .catch(() => {});
    } else {
      setTrend(null);
    }
  }, [pathname]);

  const title =
    Object.entries(pageTitles).find(([path]) => pathname === path)?.[1] ||
    Object.entries(pageTitles).find(([path]) =>
      pathname.startsWith(path + "/")
    )?.[1] ||
    "DineroyAhorro";

  const initials = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <header className="fixed top-0 left-0 right-0 md:left-60 h-14 bg-white/95 backdrop-blur-sm border-b border-gray-100/80 flex items-center justify-between px-4 sm:px-6 z-30">
      <div className="flex items-center gap-2.5">
        <h1 className="text-base font-bold text-gray-900 tracking-tight">{title}</h1>
        {trend && (() => {
          const cfg = TREND_CONFIG[trend];
          return (
            <span className={cn("hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full", cfg.classes)}>
              <span>{cfg.icon}</span>
              <span>{cfg.text}</span>
            </span>
          );
        })()}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-gray-100 rounded-xl px-2.5 py-1.5 transition-all active:scale-95">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="text-xs bg-gradient-to-br from-emerald-400 to-emerald-600 text-white font-bold">{initials}</AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-sm font-semibold text-gray-900 leading-none">
              {userName || "Usuario"}
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/perfil" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Perfil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

"use client";

import { usePathname } from "next/navigation";
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

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/transacciones": "Transacciones",
  "/presupuesto": "Presupuesto",
  "/ahorros": "Ahorros",
  "/deudas": "Deudas",
  "/reportes": "Reportes",
  "/patrimonio": "Patrimonio Neto",
  "/calculadoras": "Calculadoras",
  "/educacion": "Educación Financiera",
  "/perfil": "Mi Perfil",
};

interface TopbarProps {
  userName?: string | null;
  userEmail?: string | null;
}

export function Topbar({ userName, userEmail }: TopbarProps) {
  const pathname = usePathname();

  const title =
    Object.entries(pageTitles).find(([path]) => pathname === path)?.[1] ||
    Object.entries(pageTitles).find(([path]) =>
      pathname.startsWith(path + "/")
    )?.[1] ||
    "FinanzasApp";

  const initials = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <header className="fixed top-0 left-0 right-0 md:left-64 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 z-30">
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-sm font-medium text-gray-900 leading-none">
              {userName || "Usuario"}
            </span>
            <span className="text-xs text-gray-500 leading-none mt-0.5">
              {userEmail || ""}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
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

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-6xl font-bold text-gray-200">404</h1>
      <h2 className="text-xl font-semibold text-gray-800">Página no encontrada</h2>
      <p className="text-sm text-gray-500">La página que buscas no existe.</p>
      <Button asChild>
        <Link href="/dashboard">Ir al dashboard</Link>
      </Button>
    </div>
  );
}

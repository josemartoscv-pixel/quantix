"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-xl font-semibold text-gray-800">Algo ha salido mal</h2>
      <p className="text-sm text-gray-500">{error.message || "Error inesperado"}</p>
      <Button onClick={reset}>Intentar de nuevo</Button>
    </div>
  );
}

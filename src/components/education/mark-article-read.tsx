"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Props {
  articleId: string;
  userId: string;
}

export function MarkArticleRead({ articleId }: Props) {
  const [marked, setMarked] = useState(false);
  const [loading, setLoading] = useState(false);

  if (marked) {
    return (
      <div className="flex items-center justify-center gap-2 text-emerald-600 text-sm font-medium py-4">
        <CheckCircle className="w-5 h-5" />
        ¡Artículo marcado como leído!
      </div>
    );
  }

  const handleMark = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/education/${articleId}/read`, { method: "POST" });
      if (!res.ok) throw new Error();
      setMarked(true);
      toast.success("Artículo marcado como leído");
    } catch {
      toast.error("Error al marcar el artículo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center pb-4">
      <button
        onClick={handleMark}
        disabled={loading}
        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-2xl transition-all active:scale-95 disabled:opacity-60"
      >
        <CheckCircle className="w-4 h-4" />
        {loading ? "Guardando..." : "Marcar como leído"}
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MarkAsReadButtonProps {
  articleId: string;
  isRead: boolean;
}

export function MarkAsReadButton({ articleId, isRead: initialRead }: MarkAsReadButtonProps) {
  const [isRead, setIsRead] = useState(initialRead);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/education/${articleId}/read`, {
        method: "POST",
      });
      if (res.ok) {
        setIsRead(true);
        toast.success("¡Artículo marcado como leído!");
      }
    } catch {
      toast.error("Error al marcar el artículo");
    } finally {
      setLoading(false);
    }
  };

  if (isRead) {
    return (
      <div className="inline-flex items-center gap-2 text-emerald-600 text-sm font-medium">
        <CheckCircle className="w-5 h-5" />
        Artículo completado
      </div>
    );
  }

  return (
    <Button onClick={handleToggle} disabled={loading} size="sm">
      <Circle className="w-4 h-4 mr-2" />
      {loading ? "Guardando..." : "Marcar como leído"}
    </Button>
  );
}

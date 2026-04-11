"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Loader2, Play } from "lucide-react";

export function DemoButton() {
  const [loading, setLoading] = useState(false);

  const handleDemo = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/demo", { method: "POST" });
      if (!res.ok) throw new Error();
      const { email, password } = await res.json();
      await signIn("credentials", { email, password, callbackUrl: "/dashboard" });
    } catch {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDemo}
      disabled={loading}
      className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold px-8 py-4 rounded-2xl border border-gray-200 hover:border-emerald-300 hover:text-emerald-700 active:scale-95 transition-all text-base disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <><Loader2 className="w-4 h-4 animate-spin" />Cargando demo...</>
      ) : (
        <><Play className="w-4 h-4" />Ver demo sin registrarse</>
      )}
    </button>
  );
}

"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html>
      <body>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: "16px", fontFamily: "sans-serif" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Error crítico de la aplicación</h2>
          <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>{error.message || "Error inesperado"}</p>
          <button
            onClick={reset}
            style={{ padding: "8px 16px", background: "#10b981", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
          >
            Intentar de nuevo
          </button>
        </div>
      </body>
    </html>
  );
}

"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        background: "#059669",
        color: "white",
        padding: "12px 20px",
        borderRadius: 12,
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: "0 4px 20px rgba(5,150,105,0.4)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: 8,
        border: "none",
      }}
    >
      🖨️ Imprimir / Guardar PDF
    </button>
  );
}

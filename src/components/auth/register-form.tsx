"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, CheckCircle, XCircle } from "lucide-react";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import { cn } from "@/lib/utils";

function PasswordStrengthIndicator({ password }: { password: string }) {
  const checks = [
    { label: "Al menos 8 caracteres", valid: password.length >= 8 },
    { label: "Contiene mayúsculas", valid: /[A-Z]/.test(password) },
    { label: "Contiene números", valid: /[0-9]/.test(password) },
    { label: "Contiene símbolos", valid: /[^A-Za-z0-9]/.test(password) },
  ];

  const score = checks.filter((c) => c.valid).length;
  const strengthLabels = ["", "Débil", "Regular", "Buena", "Fuerte"];
  const strengthColors = [
    "",
    "bg-red-500",
    "bg-amber-500",
    "bg-blue-500",
    "bg-emerald-500",
  ];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i <= score ? strengthColors[score] : "bg-gray-200"
            )}
          />
        ))}
      </div>
      <p className="text-xs text-gray-500">
        Seguridad:{" "}
        <span
          className={cn(
            "font-medium",
            score <= 1
              ? "text-red-600"
              : score === 2
              ? "text-amber-600"
              : score === 3
              ? "text-blue-600"
              : "text-emerald-600"
          )}
        >
          {strengthLabels[score] || "Muy débil"}
        </span>
      </p>
      <div className="space-y-1">
        {checks.map((check) => (
          <div key={check.label} className="flex items-center gap-1.5">
            {check.valid ? (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            ) : (
              <XCircle className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
            )}
            <span
              className={cn(
                "text-xs",
                check.valid ? "text-gray-700" : "text-gray-400"
              )}
            >
              {check.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password", "");

  const onSubmit = async (data: RegisterFormData) => {
    setServerError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        setServerError(body.error || "Error al crear la cuenta");
        return;
      }

      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      router.push("/dashboard");
      router.refresh();
    } catch {
      setServerError("Ha ocurrido un error. Inténtalo de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {serverError}
        </div>
      )}

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Nombre completo
        </label>
        <input
          type="text"
          autoComplete="name"
          placeholder="María García"
          className={cn(
            "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors",
            errors.name ? "border-red-300 focus:ring-red-500" : "border-gray-300"
          )}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-600 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          autoComplete="email"
          placeholder="tu@email.com"
          className={cn(
            "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors",
            errors.email ? "border-red-300 focus:ring-red-500" : "border-gray-300"
          )}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            className={cn(
              "w-full px-4 py-3 pr-11 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors",
              errors.password ? "border-red-300 focus:ring-red-500" : "border-gray-300"
            )}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-600 text-sm">{errors.password.message}</p>
        )}
        <PasswordStrengthIndicator password={password} />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Confirmar contraseña
        </label>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            className={cn(
              "w-full px-4 py-3 pr-11 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors",
              errors.confirmPassword ? "border-red-300 focus:ring-red-500" : "border-gray-300"
            )}
            {...register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors mt-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Creando cuenta...
          </>
        ) : (
          "Crear cuenta gratis"
        )}
      </button>

      <p className="text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className="text-emerald-600 font-semibold hover:text-emerald-700"
        >
          Iniciar sesión
        </Link>
      </p>
    </form>
  );
}

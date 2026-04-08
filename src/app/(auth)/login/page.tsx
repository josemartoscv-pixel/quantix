import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>;
}) {
  const params = await searchParams;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido de nuevo</h1>
        <p className="text-gray-600">Inicia sesión para gestionar tus finanzas</p>
      </div>
      {params.registered && (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg text-sm">
          ✅ Cuenta creada correctamente. Inicia sesión para continuar.
        </div>
      )}
      <LoginForm />
    </div>
  );
}

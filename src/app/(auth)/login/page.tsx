import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido de nuevo</h1>
        <p className="text-gray-600">Inicia sesión para gestionar tus finanzas</p>
      </div>
      <LoginForm />
    </div>
  );
}

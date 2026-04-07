import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear tu cuenta</h1>
        <p className="text-gray-600">Empieza a gestionar tus finanzas hoy</p>
      </div>
      <RegisterForm />
    </div>
  );
}

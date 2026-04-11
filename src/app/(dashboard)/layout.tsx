import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const isDemo = session.user?.email?.endsWith("@demo.local") ?? false;

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {isDemo && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white text-center text-sm font-semibold py-2 px-4 flex items-center justify-center gap-3">
          <span>👋 Estás en modo demo — los datos no se guardan</span>
          <Link
            href="/register"
            className="inline-flex items-center gap-1 bg-white text-amber-700 font-bold px-3 py-0.5 rounded-lg text-xs hover:bg-amber-50 transition-colors"
          >
            Crear cuenta gratis <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}
      <Sidebar />
      <Topbar
        userName={session.user?.name}
        userEmail={session.user?.email}
      />
      <main className={`md:ml-60 pb-16 md:pb-0 min-h-screen ${isDemo ? "pt-22" : "pt-14"}`}>
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
      <MobileNav />
    </div>
  );
}

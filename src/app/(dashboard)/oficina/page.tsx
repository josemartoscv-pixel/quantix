import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "La Oficina",
};

export default async function OfficinaPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  return (
    <div className="-m-4 sm:-m-6 lg:-m-8 h-[calc(100vh-3.5rem)]">
      <iframe
        src="/pixel-agents/index.html"
        className="w-full h-full border-0"
        title="La Oficina — Pixel Agents"
      />
    </div>
  );
}

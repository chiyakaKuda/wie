import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-helpers";
import PortalSidebar from "@/components/portal/PortalSidebar";
import DashboardTopbar from "@/components/portal/DashboardTopbar";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/portal");
  }

  return (
    <div className="flex min-h-screen">
      <PortalSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopbar name={session.user.name ?? "Member"} />
        <main className="flex-1 bg-surface p-8">{children}</main>
      </div>
    </div>
  );
}

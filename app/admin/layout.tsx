import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth-helpers";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DashboardTopbar from "@/components/portal/DashboardTopbar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopbar name={user.name ?? "Admin"} />
        <main className="flex-1 bg-surface p-8">{children}</main>
      </div>
    </div>
  );
}

import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const dynamic = "force-dynamic";

export default async function AdminApplicationsPage() {
  await requireAdmin();

  const pending = await prisma.user.findMany({
    where: { role: "MEMBER", memberStatus: "PENDING" },
    orderBy: { joinedAt: "desc" },
  });

  return (
    <div className="max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold text-primary-dark">Pending Applications</h1>
        <p className="text-sm text-amber-600 font-medium">{pending.length} awaiting review</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Province</TableHead>
              <TableHead>Discipline</TableHead>
              <TableHead>Applied</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pending.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium text-primary-dark">{app.name}</TableCell>
                <TableCell className="text-sm text-text/70">{app.email}</TableCell>
                <TableCell className="text-sm text-text/70">{app.phone || "—"}</TableCell>
                <TableCell className="text-sm text-text/70">{app.province || "—"}</TableCell>
                <TableCell className="text-sm text-text/70">{app.discipline || "—"}</TableCell>
                <TableCell className="text-sm text-text/70">
                  {app.joinedAt.toLocaleDateString("en-GB", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {pending.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text/60">No pending applications — all caught up!</p>
        </div>
      )}
    </div>
  );
}

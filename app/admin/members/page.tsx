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
import StatusBadge from "@/components/StatusBadge";

export const dynamic = "force-dynamic";

export default async function AdminMembersPage() {
  await requireAdmin();

  const members = await prisma.user.findMany({
    where: { role: "MEMBER" },
    orderBy: { joinedAt: "desc" },
    take: 50,
  });

  return (
    <div className="max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold text-primary-dark">Members</h1>
        <p className="text-sm text-text/60">{members.length} total members</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Province</TableHead>
              <TableHead>Discipline</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium text-primary-dark">{member.name}</TableCell>
                <TableCell className="text-sm text-text/70">{member.email}</TableCell>
                <TableCell className="text-sm text-text/70">{member.province || "—"}</TableCell>
                <TableCell className="text-sm text-text/70">{member.discipline || "—"}</TableCell>
                <TableCell className="text-sm text-text/70">{member.membershipType || "—"}</TableCell>
                <TableCell>
                  <StatusBadge status={member.memberStatus} />
                </TableCell>
                <TableCell className="text-sm text-text/70">
                  {member.joinedAt.toLocaleDateString("en-GB", {
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

      {members.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text/60">No members yet.</p>
        </div>
      )}
    </div>
  );
}

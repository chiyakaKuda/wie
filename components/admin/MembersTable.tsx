"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Search, Users } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StatusBadge from "@/components/StatusBadge";
import AnimatedButton from "@/components/ui/AnimatedButton";
import EmptyState from "@/components/admin/EmptyState";
import type { MemberStatus } from "@/lib/generated/prisma/client";

export type MemberRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  province: string | null;
  discipline: string | null;
  employer: string | null;
  membershipType: string | null;
  memberStatus: MemberStatus;
  joinedAt: string;
};

const PAGE_SIZE = 10;

export default function MembersTable({ members }: { members: MemberRow[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [provinceFilter, setProvinceFilter] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const [viewing, setViewing] = useState<MemberRow | null>(null);
  const [actingId, setActingId] = useState<string | null>(null);

  const provinces = useMemo(
    () => Array.from(new Set(members.map((m) => m.province).filter(Boolean))) as string[],
    [members]
  );

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || m.memberStatus === statusFilter;
      const matchesProvince = provinceFilter === "ALL" || m.province === provinceFilter;
      return matchesSearch && matchesStatus && matchesProvince;
    });
  }, [members, search, statusFilter, provinceFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  async function updateStatus(id: string, memberStatus: MemberStatus) {
    setActingId(id);
    try {
      const res = await fetch(`/api/admin/members/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberStatus }),
      });
      if (!res.ok) throw new Error();
      toast.success(`Member ${memberStatus === "ACTIVE" ? "activated" : "suspended"}.`);
      router.refresh();
    } catch {
      toast.error("Could not update member status.");
    } finally {
      setActingId(null);
    }
  }

  if (members.length === 0) {
    return <EmptyState icon={Users} title="No members yet." />;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text/40" size={16} />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v ?? "ALL");
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="SUSPENDED">Suspended</SelectItem>
            <SelectItem value="EXPIRED">Expired</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={provinceFilter}
          onValueChange={(v) => {
            setProvinceFilter(v ?? "ALL");
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Province" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Provinces</SelectItem>
            {provinces.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Province</TableHead>
              <TableHead>Discipline</TableHead>
              <TableHead>Membership</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="font-medium">{m.name}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell>{m.province ?? "—"}</TableCell>
                <TableCell>{m.discipline ?? "—"}</TableCell>
                <TableCell>{m.membershipType ?? "—"}</TableCell>
                <TableCell>
                  <StatusBadge status={m.memberStatus} />
                </TableCell>
                <TableCell>
                  {new Date(m.joinedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {m.memberStatus === "PENDING" && (
                      <AnimatedButton
                        size="sm"
                        variant="ghost"
                        loading={actingId === m.id}
                        onClick={() => updateStatus(m.id, "ACTIVE")}
                      >
                        Activate
                      </AnimatedButton>
                    )}
                    {m.memberStatus === "ACTIVE" && (
                      <AnimatedButton
                        size="sm"
                        variant="ghost"
                        loading={actingId === m.id}
                        onClick={() => updateStatus(m.id, "SUSPENDED")}
                      >
                        Suspend
                      </AnimatedButton>
                    )}
                    <AnimatedButton size="sm" variant="secondary" onClick={() => setViewing(m)}>
                      View
                    </AnimatedButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-text/60 py-10">No members match your search.</p>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-text/60">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <AnimatedButton
              size="sm"
              variant="ghost"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </AnimatedButton>
            <AnimatedButton
              size="sm"
              variant="ghost"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </AnimatedButton>
          </div>
        </div>
      )}

      <Dialog open={!!viewing} onOpenChange={(open) => !open && setViewing(null)}>
        <DialogContent>
          {viewing && (
            <>
              <DialogHeader>
                <DialogTitle>{viewing.name}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3 text-sm">
                <p>
                  <span className="text-text/50">Email:</span> {viewing.email}
                </p>
                <p>
                  <span className="text-text/50">Phone:</span> {viewing.phone ?? "—"}
                </p>
                <p>
                  <span className="text-text/50">Province:</span> {viewing.province ?? "—"}
                </p>
                <p>
                  <span className="text-text/50">Discipline:</span> {viewing.discipline ?? "—"}
                </p>
                <p>
                  <span className="text-text/50">Employer:</span> {viewing.employer ?? "—"}
                </p>
                <p>
                  <span className="text-text/50">Membership Type:</span>{" "}
                  {viewing.membershipType ?? "—"}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-text/50">Status:</span>{" "}
                  <StatusBadge status={viewing.memberStatus} />
                </p>
                <p>
                  <span className="text-text/50">Joined:</span>{" "}
                  {new Date(viewing.joinedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

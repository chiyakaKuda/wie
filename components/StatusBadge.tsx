import { Badge } from "@/components/ui/badge";
import type { MemberStatus } from "@/lib/generated/prisma/client";

const STYLES: Record<MemberStatus, string> = {
  ACTIVE: "bg-accent text-accent-foreground",
  PENDING: "bg-amber-100 text-amber-800",
  SUSPENDED: "bg-red-100 text-red-700",
  EXPIRED: "bg-gray-200 text-gray-700",
};

export default function StatusBadge({ status }: { status: MemberStatus }) {
  return <Badge className={STYLES[status]}>{status}</Badge>;
}

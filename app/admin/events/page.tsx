import Link from "next/link";
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
import AnimatedButton from "@/components/ui/AnimatedButton";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  await requireAdmin();

  const events = await prisma.event.findMany({
    orderBy: { date: "asc" },
    include: {
      _count: { select: { rsvps: true } },
    },
  });

  return (
    <div className="max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold text-primary-dark">Events</h1>
        <AnimatedButton href="/admin/events/create">Create Event</AnimatedButton>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>RSVPs</TableHead>
              <TableHead>Published</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium text-primary-dark">{event.title}</TableCell>
                <TableCell className="text-sm text-text/70">
                  {event.date.toLocaleDateString("en-GB", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-sm text-text/70">{event.location}</TableCell>
                <TableCell className="text-sm text-text/70">{event.type}</TableCell>
                <TableCell className="text-sm text-text/70">{event.capacity || "—"}</TableCell>
                <TableCell className="text-sm text-text/70">{event._count.rsvps}</TableCell>
                <TableCell className="text-sm">
                  {event.isPublished ? (
                    <span className="text-accent font-medium">✓ Yes</span>
                  ) : (
                    <span className="text-text/40">Draft</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text/60">No events yet — create your first event →</p>
        </div>
      )}
    </div>
  );
}

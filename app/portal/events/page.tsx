import { requireUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import MyEventsTabs, { type MyEventRow } from "@/components/portal/MyEventsTabs";

export const dynamic = "force-dynamic";

export default async function PortalEventsPage() {
  const user = await requireUser();

  const rsvps = await prisma.eventRSVP.findMany({
    where: { userId: user.id },
    include: { event: true },
    orderBy: { event: { date: "desc" } },
  });

  const events: MyEventRow[] = rsvps.map((r) => ({
    rsvpId: r.id,
    eventId: r.eventId,
    status: r.status,
    title: r.event.title,
    date: r.event.date.toISOString(),
    location: r.event.location,
    isPast: r.event.isPast,
  }));

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-2xl font-bold text-primary-dark mb-8">My Events</h1>
      <MyEventsTabs events={events} />
    </div>
  );
}

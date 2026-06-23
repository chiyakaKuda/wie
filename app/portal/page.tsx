import Link from "next/link";
import { CalendarCheck, CalendarClock, Clock3 } from "lucide-react";
import { requireUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import StatusBadge from "@/components/StatusBadge";
import AnimatedButton from "@/components/ui/AnimatedButton";

export const dynamic = "force-dynamic";

export default async function PortalDashboard() {
  const user = await requireUser();

  const [rsvpCount, upcomingCount, fullUser] = await Promise.all([
    prisma.eventRSVP.count({ where: { userId: user.id, status: { not: "CANCELLED" } } }),
    prisma.eventRSVP.count({
      where: { userId: user.id, status: "CONFIRMED", event: { isPast: false } },
    }),
    prisma.user.findUnique({ where: { id: user.id } }),
  ]);

  const memberSince = fullUser?.joinedAt.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
  });

  return (
    <div className="max-w-5xl">
      <div className="flex items-center gap-3 mb-8">
        <h1 className="font-heading text-2xl font-bold text-primary-dark">Dashboard</h1>
        {fullUser && <StatusBadge status={fullUser.memberStatus} />}
      </div>

      <div className="grid sm:grid-cols-3 gap-5 mb-10">
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-l-primary">
          <CalendarCheck className="text-accent mb-2" size={22} />
          <p className="font-heading text-3xl font-bold text-primary-dark">{rsvpCount}</p>
          <p className="text-sm text-text/60 mt-1">Events RSVP&apos;d</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-l-primary">
          <CalendarClock className="text-accent mb-2" size={22} />
          <p className="font-heading text-3xl font-bold text-primary-dark">{upcomingCount}</p>
          <p className="text-sm text-text/60 mt-1">Upcoming Events</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-l-primary">
          <Clock3 className="text-accent mb-2" size={22} />
          <p className="font-heading text-3xl font-bold text-primary-dark">{memberSince}</p>
          <p className="text-sm text-text/60 mt-1">Member Since</p>
        </div>
      </div>

      <h2 className="font-heading text-lg font-semibold text-primary-dark mb-4">Quick Actions</h2>
      <div className="flex flex-wrap gap-4">
        <AnimatedButton href="/events">Browse Events</AnimatedButton>
        <AnimatedButton href="/portal/profile" variant="secondary">
          Update Profile
        </AnimatedButton>
        <AnimatedButton href="/portal/membership" variant="ghost">
          View Membership
        </AnimatedButton>
      </div>
    </div>
  );
}

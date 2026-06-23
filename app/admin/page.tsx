import { Users, Clock, Calendar, CheckCircle2 } from "lucide-react";
import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await requireAdmin();

  const [totalMembers, pendingApps, upcomingEvents, totalRsvps] = await Promise.all([
    prisma.user.count({ where: { role: "MEMBER" } }),
    prisma.user.count({ where: { memberStatus: "PENDING" } }),
    prisma.event.count({ where: { isPast: false } }),
    prisma.eventRSVP.count(),
  ]);

  const kpis = [
    {
      icon: Users,
      label: "Total Members",
      value: totalMembers,
      trend: "+3 this week",
      color: "text-accent",
    },
    {
      icon: Clock,
      label: "Pending Applications",
      value: pendingApps,
      trend: pendingApps > 0 ? "Needs review" : "All caught up",
      color: "text-amber-500",
    },
    {
      icon: Calendar,
      label: "Upcoming Events",
      value: upcomingEvents,
      trend: "This month",
      color: "text-blue-500",
    },
    {
      icon: CheckCircle2,
      label: "Total RSVPs",
      value: totalRsvps,
      trend: "All time",
      color: "text-green-500",
    },
  ];

  return (
    <div className="max-w-7xl">
      <h1 className="font-heading text-2xl font-bold text-primary-dark mb-8">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-l-primary">
            <div className={`${kpi.color} mb-2`}>
              <kpi.icon size={24} />
            </div>
            <p className="font-heading text-3xl font-bold text-primary-dark">{kpi.value}</p>
            <p className="text-sm text-text/60 mt-1">{kpi.label}</p>
            <p className="text-xs text-text/40 mt-2">{kpi.trend}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-xl p-8 shadow-sm">
        <h2 className="font-heading text-lg font-semibold text-primary-dark mb-4">Quick Stats</h2>
        <div className="grid sm:grid-cols-3 gap-8 text-center">
          <div>
            <p className="font-heading text-2xl font-bold text-primary">{totalMembers - pendingApps}</p>
            <p className="text-sm text-text/60">Active Members</p>
          </div>
          <div>
            <p className="font-heading text-2xl font-bold text-accent">{pendingApps}</p>
            <p className="text-sm text-text/60">Awaiting Activation</p>
          </div>
          <div>
            <p className="font-heading text-2xl font-bold text-blue-500">{upcomingEvents}</p>
            <p className="text-sm text-text/60">Upcoming Events</p>
          </div>
        </div>
      </div>
    </div>
  );
}

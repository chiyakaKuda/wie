import { NextResponse } from "next/server";
import { requireAdmin, authErrorResponse } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin();

    const [totalMembers, pendingApplications, upcomingEvents, totalRsvps] = await Promise.all([
      prisma.user.count({ where: { role: "MEMBER" } }),
      prisma.user.count({ where: { memberStatus: "PENDING" } }),
      prisma.event.count({ where: { isPast: false } }),
      prisma.eventRSVP.count({ where: { status: { not: "CANCELLED" } } }),
    ]);

    return NextResponse.json({ totalMembers, pendingApplications, upcomingEvents, totalRsvps });
  } catch (error) {
    return authErrorResponse(error);
  }
}

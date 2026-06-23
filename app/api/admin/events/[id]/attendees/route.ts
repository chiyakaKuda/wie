import { NextResponse } from "next/server";
import { requireAdmin, authErrorResponse } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();

    const { id } = await params;
    const rsvps = await prisma.eventRSVP.findMany({
      where: { eventId: id },
      include: { user: true },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(rsvps);
  } catch (error) {
    return authErrorResponse(error);
  }
}

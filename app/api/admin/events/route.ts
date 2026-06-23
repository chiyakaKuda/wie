import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, authErrorResponse } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin();

    const events = await prisma.event.findMany({
      orderBy: { date: "desc" },
      include: { _count: { select: { rsvps: { where: { status: { not: "CANCELLED" } } } } } },
    });

    return NextResponse.json(events);
  } catch (error) {
    return authErrorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const {
      title,
      description,
      date,
      endDate,
      location,
      province,
      type,
      capacity,
      imageUrl,
      isPublished,
    } = body;

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        endDate: endDate ? new Date(endDate) : null,
        location,
        province,
        type,
        capacity: capacity ? Number(capacity) : null,
        imageUrl: imageUrl || null,
        isPublished: Boolean(isPublished),
        isPast: new Date(date) < new Date(),
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    return authErrorResponse(error);
  }
}

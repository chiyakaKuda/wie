import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ rsvp: null });
  }

  const { id } = await params;
  const rsvp = await prisma.eventRSVP.findUnique({
    where: { userId_eventId: { userId: session.user.id, eventId: id } },
  });

  return NextResponse.json({ rsvp });
}

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }
  if (session.user.memberStatus !== "ACTIVE") {
    return NextResponse.json(
      { error: "Only active members can RSVP to events." },
      { status: 403 }
    );
  }

  const { id: eventId } = await params;
  const userId = session.user.id;

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { _count: { select: { rsvps: { where: { status: "CONFIRMED" } } } } },
  });
  if (!event) {
    return NextResponse.json({ error: "Event not found." }, { status: 404 });
  }

  const existing = await prisma.eventRSVP.findUnique({
    where: { userId_eventId: { userId, eventId } },
  });

  if (existing && existing.status !== "CANCELLED") {
    const updated = await prisma.eventRSVP.update({
      where: { id: existing.id },
      data: { status: "CANCELLED" },
    });
    return NextResponse.json({ rsvp: updated });
  }

  const isFull = event.capacity != null && event._count.rsvps >= event.capacity;
  const status = isFull ? "WAITLISTED" : "CONFIRMED";

  const rsvp = existing
    ? await prisma.eventRSVP.update({ where: { id: existing.id }, data: { status } })
    : await prisma.eventRSVP.create({ data: { userId, eventId, status } });

  return NextResponse.json({ rsvp });
}

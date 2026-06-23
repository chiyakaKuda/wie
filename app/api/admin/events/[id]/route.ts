import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, authErrorResponse } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();

    const { id } = await params;
    const body = await request.json();
    const data: Record<string, unknown> = {};

    for (const key of [
      "title",
      "description",
      "location",
      "province",
      "type",
      "imageUrl",
    ] as const) {
      if (body[key] !== undefined) data[key] = body[key];
    }
    if (body.date !== undefined) data.date = new Date(body.date);
    if (body.endDate !== undefined) data.endDate = body.endDate ? new Date(body.endDate) : null;
    if (body.capacity !== undefined) data.capacity = body.capacity ? Number(body.capacity) : null;
    if (body.isPublished !== undefined) data.isPublished = Boolean(body.isPublished);
    if (body.isPast !== undefined) data.isPast = Boolean(body.isPast);

    const event = await prisma.event.update({ where: { id }, data });
    return NextResponse.json(event);
  } catch (error) {
    return authErrorResponse(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();

    const { id } = await params;
    await prisma.eventRSVP.deleteMany({ where: { eventId: id } });
    await prisma.event.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return authErrorResponse(error);
  }
}

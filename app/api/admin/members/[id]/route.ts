import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, authErrorResponse } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();

    const { id } = await params;
    const { memberStatus } = await request.json();

    const member = await prisma.user.update({
      where: { id },
      data: { memberStatus },
    });

    return NextResponse.json(member);
  } catch (error) {
    return authErrorResponse(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();

    const { id } = await params;
    await prisma.eventRSVP.deleteMany({ where: { userId: id } });
    await prisma.user.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return authErrorResponse(error);
  }
}

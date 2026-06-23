import { NextResponse } from "next/server";
import { requireAdmin, authErrorResponse } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin();

    const members = await prisma.user.findMany({
      where: { role: "MEMBER" },
      orderBy: { joinedAt: "desc" },
    });

    return NextResponse.json(members);
  } catch (error) {
    return authErrorResponse(error);
  }
}

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { name, phone, province, discipline, employer, currentPassword, newPassword } = body;

  if (newPassword) {
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }
    const isValid = await bcrypt.compare(currentPassword ?? "", user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: session.user.id }, data: { password: hashed } });
    return NextResponse.json({ success: true });
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name, phone, province, discipline, employer },
  });

  return NextResponse.json({ success: true });
}

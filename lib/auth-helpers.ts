import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export function getSession() {
  return getServerSession(authOptions);
}

export async function requireUser() {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("UNAUTHENTICATED");
  }
  return session.user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }
  return user;
}

export function authErrorResponse(error: unknown) {
  if (error instanceof Error && error.message === "FORBIDDEN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
}

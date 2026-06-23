import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    fullName,
    email,
    phone,
    province,
    discipline,
    employer,
    membershipType,
    referral,
  } = body;

  if (
    !fullName ||
    !email ||
    !phone ||
    !province ||
    !discipline ||
    !employer ||
    !membershipType
  ) {
    return NextResponse.json(
      { success: false, error: "Missing required fields." },
      { status: 400 }
    );
  }

  await prisma.memberApplication.create({
    data: {
      fullName,
      email,
      phone,
      province,
      discipline,
      employer,
      membershipType,
      referral,
    },
  });

  return NextResponse.json({ success: true });
}

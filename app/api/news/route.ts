import { NextResponse } from "next/server";
import { getNewsArticles } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const articles = await getNewsArticles();
  return NextResponse.json(articles);
}

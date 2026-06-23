import { prisma } from "@/lib/prisma";

export async function getEvents() {
  return prisma.event.findMany({ orderBy: { date: "asc" } });
}

export async function getNewsArticles() {
  return prisma.newsArticle.findMany({ orderBy: { publishedAt: "desc" } });
}

export async function getNewsArticleBySlug(slug: string) {
  return prisma.newsArticle.findUnique({ where: { slug } });
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getNewsArticleBySlug } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const date = new Date(article.publishedAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article>
      <section className="bg-primary-dark">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <Badge className="bg-accent text-accent-foreground mb-4">{article.category}</Badge>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">
            {article.title}
          </h1>
          <p className="text-white/70 mt-4 text-sm">
            {article.author} · {date}
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <p className="text-text/90 leading-relaxed whitespace-pre-line">{article.content}</p>
          <Link
            href="/news"
            className="inline-block mt-10 text-sm font-accent uppercase tracking-wide text-primary hover:text-accent transition-colors"
          >
            ← Back to News
          </Link>
        </div>
      </section>
    </article>
  );
}

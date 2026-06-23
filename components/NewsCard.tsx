import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type NewsCardData = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: Date | string;
};

export default function NewsCard({ article }: { article: NewsCardData }) {
  const date = new Date(article.publishedAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="h-40 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
        <span className="font-heading text-white/40 text-4xl">WiEZ</span>
      </div>
      <CardContent>
        <Badge className="bg-accent text-accent-foreground mb-2">{article.category}</Badge>
        <h3 className="font-heading text-lg font-semibold text-primary-dark leading-snug">
          {article.title}
        </h3>
        <p className="text-sm text-text/70 mt-2 line-clamp-3">{article.excerpt}</p>
        <div className="flex items-center justify-between mt-4 text-xs text-text/60">
          <span>{article.author}</span>
          <span>{date}</span>
        </div>
        <Link
          href={`/news/${article.slug}`}
          className="inline-block mt-3 text-sm font-accent uppercase tracking-wide text-primary hover:text-accent transition-colors"
        >
          Read More →
        </Link>
      </CardContent>
    </Card>
  );
}

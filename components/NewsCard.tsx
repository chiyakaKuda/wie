import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedButton from "@/components/ui/AnimatedButton";

export type NewsCardData = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: Date | string;
};

const PHOTOS = [
  "/images/automation-expert-smart-industrial-factory.jpg",
  "/images/carpenter-cutting-mdf-board-inside-workshop.jpg",
  "/images/female-technician-supervising-automated-production-line.jpg",
  "/images/young-girl-form-construction-worker-with-hard-hat.jpg",
  "/images/expert-repairs-car-helped-by-lamp-light.jpg",
];

function photoForSlug(slug: string) {
  const hash = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return PHOTOS[hash % PHOTOS.length];
}

export default function NewsCard({ article }: { article: NewsCardData }) {
  const date = new Date(article.publishedAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-40">
        <Image
          src={photoForSlug(article.slug)}
          alt={article.title}
          fill
          className="object-cover"
        />
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
        <AnimatedButton href={`/news/${article.slug}`} variant="ghost" className="mt-3">
          Read More
        </AnimatedButton>
      </CardContent>
    </Card>
  );
}

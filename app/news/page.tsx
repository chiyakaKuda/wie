import SectionEyebrow from "@/components/SectionEyebrow";
import NewsCard from "@/components/NewsCard";
import { getNewsArticles } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const articles = await getNewsArticles();

  return (
    <>
      <section className="bg-primary-dark">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">
            News & Blog
          </h1>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto">
            Updates from our members, partners, and programs across Zimbabwe.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <SectionEyebrow>Latest</SectionEyebrow>
          <h2 className="font-heading text-3xl font-bold text-primary-dark mb-10">
            Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <NewsCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

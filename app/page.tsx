import Image from "next/image";
import { Users, GraduationCap, Wrench } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import Hero from "@/components/Hero";
import ProgramCard from "@/components/ProgramCard";
import EventCard from "@/components/EventCard";
import NewsCard from "@/components/NewsCard";
import TestimonialCard from "@/components/TestimonialCard";
import SponsorStrip from "@/components/SponsorStrip";
import SectionEyebrow from "@/components/SectionEyebrow";
import Slash from "@/components/Slash";
import { getEvents, getNewsArticles } from "@/lib/db";

export const dynamic = "force-dynamic";

const FEATURED_PROGRAMS = [
  {
    icon: Users,
    title: "Mentorship Program",
    description: "Pairing engineering students with experienced industry professionals across Zimbabwe.",
  },
  {
    icon: GraduationCap,
    title: "Scholarship Fund",
    description: "Supporting female engineering students with tuition and equipment grants.",
  },
  {
    icon: Wrench,
    title: "Workshops & Training",
    description: "Technical upskilling sessions led by senior engineers in every discipline.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "WiEZ paired me with a mentor who helped me navigate my first site role with confidence. I wouldn't be where I am without this network.",
    name: "Rumbidzai Chari",
    discipline: "Civil Engineer, Harare",
    photo: "/images/pensive-black-female-engineer-hardhat-standing-warehouse-talking-cellphone-shelves-with-goods-background-copy-space-labor-communication-concept.jpg",
  },
  {
    quote:
      "The Scholarship Fund covered my final year of study. Now I'm giving back by mentoring two students of my own.",
    name: "Nyasha Mutize",
    discipline: "Electrical Engineer, Bulawayo",
    photo: "/images/woman-wearing-special-industrial-protective-equipment.jpg",
  },
  {
    quote:
      "The Leadership Academy gave me the negotiation skills I needed to step into a project management role.",
    name: "Tariro Zinyemba",
    discipline: "Mining Engineer, Gweru",
    photo: "/images/african-woman-yellow-jacket-hard-cap.jpg",
  },
];

export default async function Home() {
  const [events, news] = await Promise.all([getEvents(), getNewsArticles()]);
  const upcomingEvents = events.filter((e) => !e.isPast).slice(0, 3);
  const latestNews = news.slice(0, 3);

  return (
    <>
      <Hero />

      {/* About snippet */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 md:h-[28rem] rounded-2xl overflow-hidden">
            <Image
              src="/images/portrait-professional-young-black-woman-civil-engineer-architecture-worker-wearing-hard-hat-safety-working-construction-site-warehouseusing-laptop-work.jpg"
              alt="A WiEZ member, a civil engineer, on site"
              fill
              className="object-cover object-top"
            />
            <div className="absolute -bottom-px -right-px bg-accent text-accent-foreground px-4 py-2 rounded-tl-2xl">
              <Slash className="text-2xl" />
            </div>
          </div>

          <div>
            <SectionEyebrow>Who We Are</SectionEyebrow>
            <h2 className="font-heading text-3xl font-bold text-primary-dark mb-4">
              Our Mission
            </h2>
            <p className="text-text/80">
              Women in Engineering Zimbabwe (WiEZ) connects, supports, and
              empowers women across every engineering discipline — from
              students at the University of Zimbabwe to senior leaders shaping
              national infrastructure. We build the networks, mentorship, and
              opportunities that help our members thrive in a demanding
              profession.
            </p>
            <div className="mt-8 border-l-4 border-primary pl-6">
              <p className="font-heading text-xl text-primary-dark italic">
                &ldquo;WiEZ gave me a community of engineers who understood
                exactly what I was navigating — and the confidence to lead.&rdquo;
              </p>
              <p className="mt-3 text-sm font-accent uppercase tracking-wide text-text/60">
                Chiedza Mhangami, Mechanical Engineer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <SectionEyebrow>What We Offer</SectionEyebrow>
          <h2 className="font-heading text-3xl font-bold text-primary-dark mb-10">
            Featured Programs
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURED_PROGRAMS.map((p) => (
              <ProgramCard key={p.title} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <SectionEyebrow>Get Involved</SectionEyebrow>
          <h2 className="font-heading text-3xl font-bold text-primary-dark mb-10">
            Upcoming Events
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="text-center mt-10">
            <AnimatedButton
              href="/events"
              className="bg-primary text-white hover:bg-primary-dark hover:text-white"
            >
              See All Events
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <SectionEyebrow>Member Voices</SectionEyebrow>
          <h2 className="font-heading text-3xl font-bold text-primary-dark mb-10">
            Testimonials
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <SectionEyebrow>Stay Informed</SectionEyebrow>
          <h2 className="font-heading text-3xl font-bold text-primary-dark mb-10">
            Latest News
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {latestNews.map((article) => (
              <NewsCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <SectionEyebrow>With Thanks To</SectionEyebrow>
          <h2 className="font-heading text-3xl font-bold text-primary-dark mb-10">
            Our Sponsors
          </h2>
          <SponsorStrip />
        </div>
      </section>
    </>
  );
}

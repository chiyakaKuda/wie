import Link from "next/link";
import Image from "next/image";
import { Users, GraduationCap, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsBar from "@/components/StatsBar";
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
  },
  {
    quote:
      "The Scholarship Fund covered my final year of study. Now I'm giving back by mentoring two students of my own.",
    name: "Nyasha Mutize",
    discipline: "Electrical Engineer, Bulawayo",
  },
  {
    quote:
      "The Leadership Academy gave me the negotiation skills I needed to step into a project management role.",
    name: "Tariro Zinyemba",
    discipline: "Mining Engineer, Gweru",
  },
];

export default async function Home() {
  const [events, news] = await Promise.all([getEvents(), getNewsArticles()]);
  const upcomingEvents = events.filter((e) => !e.isPast).slice(0, 3);
  const latestNews = news.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary-dark overflow-hidden">
        <Image
          src="/wie-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-primary-dark/55" />
        <div className="relative min-h-[calc(100vh-5rem)] flex flex-col">
        <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto">
            Engineering Zimbabwe&apos;s Future{" "}
            <span className="bg-accent text-accent-foreground px-2">/</span> One
            Woman at a Time
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mt-6">
            A professional network for women engineers across Zimbabwe — from
            students to industry leaders.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Button
              render={<Link href="/join" />}
              nativeButton={false}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Join the Network
            </Button>
            <Button
              render={<Link href="/programs" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary-dark"
            >
              Our Programs
            </Button>
          </div>
        </div>
        <StatsBar />
        </div>
      </section>

      {/* About snippet */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
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
          </div>
          <div className="border-l-4 border-primary pl-6">
            <Slash className="text-3xl" />
            <p className="font-heading text-xl text-primary-dark italic">
              &ldquo;WiEZ gave me a community of engineers who understood
              exactly what I was navigating — and the confidence to lead.&rdquo;
            </p>
            <p className="mt-3 text-sm font-accent uppercase tracking-wide text-text/60">
              Chiedza Mhangami, Mechanical Engineer
            </p>
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
            <Button
              render={<Link href="/events" />}
              nativeButton={false}
              className="bg-primary hover:bg-primary-dark text-white"
            >
              See All Events
            </Button>
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

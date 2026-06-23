import SectionEyebrow from "@/components/SectionEyebrow";
import EventsFilterTabs from "@/components/EventsFilterTabs";
import { getEvents } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <section className="bg-primary-dark">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">
            Events
          </h1>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto">
            Workshops, conferences, and networking across every province.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <SectionEyebrow>Calendar</SectionEyebrow>
          <h2 className="font-heading text-3xl font-bold text-primary-dark mb-10">
            Upcoming & Past Events
          </h2>
          <EventsFilterTabs events={events} />
        </div>
      </section>
    </>
  );
}

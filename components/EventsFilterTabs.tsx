"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCard, { type EventCardData } from "@/components/EventCard";

export default function EventsFilterTabs({ events }: { events: EventCardData[] }) {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  const filtered = events.filter((e) => {
    if (filter === "upcoming") return !e.isPast;
    if (filter === "past") return e.isPast;
    return true;
  });

  return (
    <div>
      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
        <TabsList className="mb-10">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-text/60 text-center py-12">No events found.</p>
      )}
    </div>
  );
}

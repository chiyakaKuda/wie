"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MapPin } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import AnimatedButton from "@/components/ui/AnimatedButton";

export type MyEventRow = {
  rsvpId: string;
  eventId: string;
  status: "CONFIRMED" | "CANCELLED" | "WAITLISTED";
  title: string;
  date: string;
  location: string;
  isPast: boolean;
};

const STATUS_STYLES: Record<MyEventRow["status"], string> = {
  CONFIRMED: "bg-accent text-accent-foreground",
  WAITLISTED: "bg-amber-100 text-amber-800",
  CANCELLED: "bg-gray-200 text-gray-700",
};

export default function MyEventsTabs({ events }: { events: MyEventRow[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  const filtered = events.filter((e) => (filter === "upcoming" ? !e.isPast : e.isPast));

  async function cancelRsvp(eventId: string) {
    setCancelingId(eventId);
    try {
      const res = await fetch(`/api/events/${eventId}/rsvp`, { method: "POST" });
      if (!res.ok) throw new Error();
      toast.success("RSVP cancelled.");
      router.refresh();
    } catch {
      toast.error("Could not cancel RSVP. Please try again.");
    } finally {
      setCancelingId(null);
    }
  }

  return (
    <div>
      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-4">
        {filtered.map((event) => (
          <div
            key={event.rsvpId}
            className="bg-white rounded-xl p-5 shadow-sm flex items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className={STATUS_STYLES[event.status]}>{event.status}</Badge>
              </div>
              <p className="font-heading text-lg font-semibold text-primary-dark">{event.title}</p>
              <p className="text-sm text-text/60 flex items-center gap-1 mt-1">
                <MapPin size={14} /> {event.location} ·{" "}
                {new Date(event.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            {!event.isPast && event.status !== "CANCELLED" && (
              <AnimatedButton
                variant="secondary"
                size="sm"
                loading={cancelingId === event.eventId}
                onClick={() => cancelRsvp(event.eventId)}
              >
                Cancel RSVP
              </AnimatedButton>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-text/60 text-center py-12">
            No {filter} events — <a href="/events" className="text-primary hover:text-accent">browse events →</a>
          </p>
        )}
      </div>
    </div>
  );
}

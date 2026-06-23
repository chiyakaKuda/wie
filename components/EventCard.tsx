import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RSVPButton from "@/components/RSVPButton";

export type EventCardData = {
  id: string;
  title: string;
  description: string;
  date: Date | string;
  location: string;
  type: string;
  isPast: boolean;
  capacity?: number | null;
  _count?: { rsvps: number };
};

export default function EventCard({ event }: { event: EventCardData }) {
  const date = new Date(event.date);
  const month = date.toLocaleDateString("en-GB", { month: "short" });
  const day = date.toLocaleDateString("en-GB", { day: "2-digit" });

  const confirmedCount = event._count?.rsvps ?? 0;
  const spotsLeft = event.capacity != null ? event.capacity - confirmedCount : null;
  const isFull = spotsLeft != null && spotsLeft <= 0;

  return (
    <Card className="overflow-hidden border-l-4 border-l-transparent hover:border-l-primary transition-colors shadow-sm hover:shadow-md">
      <CardContent className="flex gap-4">
        <div className="shrink-0 w-16 h-16 rounded-lg bg-accent text-accent-foreground flex flex-col items-center justify-center">
          <span className="font-accent text-xs uppercase tracking-wide">{month}</span>
          <span className="font-heading text-xl font-bold leading-none">{day}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Badge variant="secondary" className="text-primary-dark">
              {event.type}
            </Badge>
            {event.isPast && <Badge variant="outline">Past</Badge>}
            {!event.isPast && spotsLeft != null && (
              <Badge className={isFull ? "bg-red-100 text-red-700" : "bg-accent text-accent-foreground"}>
                {isFull ? "Full" : `${spotsLeft} spots left`}
              </Badge>
            )}
          </div>
          <h3 className="font-heading text-lg font-semibold text-primary-dark">
            {event.title}
          </h3>
          <p className="text-sm text-text/70 flex items-center gap-1 mt-1">
            <MapPin size={14} /> {event.location}
          </p>
          <p className="text-sm text-text/80 mt-2">{event.description}</p>
          {!event.isPast && <RSVPButton eventId={event.id} isFull={isFull} />}
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Check, ExternalLink } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";

type RSVPStatus = "CONFIRMED" | "CANCELLED" | "WAITLISTED" | null;

export default function RSVPButton({
  eventId,
  isFull,
}: {
  eventId: string;
  isFull: boolean;
}) {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [rsvpStatus, setRsvpStatus] = useState<RSVPStatus>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (sessionStatus !== "authenticated") {
      setChecking(false);
      return;
    }
    fetch(`/api/events/${eventId}/rsvp`)
      .then((res) => res.json())
      .then((data) => setRsvpStatus(data.rsvp?.status ?? null))
      .finally(() => setChecking(false));
  }, [eventId, sessionStatus]);

  async function toggleRsvp() {
    if (sessionStatus !== "authenticated") {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}/rsvp`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Could not RSVP. Please try again.");
        return;
      }
      const newStatus = data.rsvp?.status ?? null;
      setRsvpStatus(newStatus);
      if (newStatus === "CONFIRMED") toast.success("You're attending!");
      else if (newStatus === "WAITLISTED") toast.success("You've been added to the waitlist.");
      else toast.success("RSVP cancelled.");
    } catch {
      toast.error("Could not RSVP. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <AnimatedButton size="sm" disabled className="mt-4 opacity-50">
        RSVP
      </AnimatedButton>
    );
  }

  if (rsvpStatus === "CONFIRMED" || rsvpStatus === "WAITLISTED") {
    return (
      <div className="mt-4 flex items-center gap-3">
        <span className="inline-flex items-center gap-1 rounded-sm bg-accent px-4 py-2 text-[13px] font-semibold text-accent-foreground">
          <Check size={14} />
          {rsvpStatus === "CONFIRMED" ? "Attending" : "Waitlisted"}
        </span>
        <button
          onClick={toggleRsvp}
          disabled={loading}
          className="text-xs font-accent uppercase tracking-wide text-text/60 hover:text-destructive transition-colors disabled:opacity-50"
        >
          Cancel RSVP
        </button>
      </div>
    );
  }

  return (
    <AnimatedButton
      size="sm"
      icon={ExternalLink}
      loading={loading}
      onClick={toggleRsvp}
      className="mt-4 bg-primary text-white hover:bg-primary-dark hover:text-white"
    >
      {isFull ? "Join Waitlist" : "RSVP"}
    </AnimatedButton>
  );
}

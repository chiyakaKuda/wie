"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type GalleryItem = {
  caption: string;
  category: "Events" | "Programs" | "Community";
  color: "primary" | "accent" | "gray";
  tall?: boolean;
};

const ITEMS: GalleryItem[] = [
  { caption: "Annual Gala 2025 — Harare", category: "Events", color: "primary", tall: true },
  { caption: "Workshop at UZ Engineering Faculty", category: "Programs", color: "accent" },
  { caption: "Girls in Engineering Outreach — Masvingo", category: "Community", color: "gray" },
  { caption: "Leadership Academy Graduation — Bulawayo", category: "Programs", color: "primary" },
  { caption: "Mentorship Mixer — Harare", category: "Events", color: "accent", tall: true },
  { caption: "Site Visit — Gweru Mining Workshop", category: "Programs", color: "gray" },
  { caption: "Scholarship Award Ceremony", category: "Events", color: "primary" },
  { caption: "Career Fair — University of Zimbabwe", category: "Community", color: "accent" },
  { caption: "Renewable Energy Conference — Mutare", category: "Events", color: "gray", tall: true },
];

const COLOR_MAP: Record<GalleryItem["color"], string> = {
  primary: "bg-primary",
  accent: "bg-accent",
  gray: "bg-text/20",
};

export default function GalleryGrid() {
  const [filter, setFilter] = useState<"All" | GalleryItem["category"]>("All");

  const filtered = ITEMS.filter((i) => filter === "All" || i.category === filter);

  return (
    <div>
      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
        <TabsList className="mb-10">
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="Events">Events</TabsTrigger>
          <TabsTrigger value="Programs">Programs</TabsTrigger>
          <TabsTrigger value="Community">Community</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 [grid-auto-flow:dense]">
        {filtered.map((item, i) => (
          <div
            key={i}
            className={`${COLOR_MAP[item.color]} ${
              item.tall ? "row-span-2 min-h-[320px]" : "min-h-[160px]"
            } rounded-xl flex items-end p-4 text-white relative overflow-hidden`}
          >
            <p className="font-accent text-sm relative z-10 bg-black/30 rounded px-2 py-1">
              {item.caption}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

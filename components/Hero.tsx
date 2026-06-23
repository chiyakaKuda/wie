"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Users, LayoutGrid, MapPin, type LucideIcon } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { useCountUp } from "@/hooks/useCountUp";

const STATS: { icon: LucideIcon; value: number; suffix: string; label: string; duration: number }[] = [
  { icon: Users, value: 500, suffix: "+", label: "MEMBERS", duration: 1500 },
  { icon: LayoutGrid, value: 12, suffix: "", label: "PROGRAMS", duration: 1000 },
  { icon: MapPin, value: 8, suffix: "", label: "PROVINCES", duration: 800 },
];

function StatItem({
  stat,
  hasAnimated,
  index,
}: {
  stat: (typeof STATS)[number];
  hasAnimated: boolean;
  index: number;
}) {
  const count = useCountUp(stat.value, stat.duration, hasAnimated);
  const Icon = stat.icon;

  return (
    <div className="flex flex-col items-center text-center">
      <Icon
        className="text-accent mb-2 transition-all duration-500"
        size={18}
        style={{
          opacity: hasAnimated ? 1 : 0,
          transform: hasAnimated ? "scale(1)" : "scale(0.5)",
          transitionDelay: `${index * 150}ms`,
        }}
      />
      <p className="font-heading text-[36px] font-bold leading-none text-white">
        {count}
        <span
          className="text-accent transition-opacity duration-300"
          style={{ opacity: count === stat.value ? 1 : 0 }}
        >
          {stat.suffix}
        </span>
      </p>
      <p
        className="font-accent text-[10px] uppercase tracking-[0.2em] text-white/60 mt-2 transition-all duration-500"
        style={{
          opacity: hasAnimated ? 1 : 0,
          transform: hasAnimated ? "translateY(0)" : "translateY(8px)",
          transitionDelay: `${100 + index * 150}ms`,
        }}
      >
        {stat.label}
      </p>
    </div>
  );
}

export default function Hero() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section className="relative bg-primary-dark overflow-hidden">
      <Image src="/wie-bg.jpg" alt="" fill priority className="object-cover object-center" />
      <div className="absolute inset-0 bg-primary-dark/55" />
      <div className="relative min-h-[92vh] flex flex-col">
        <div className="flex-1" />
        <div className="max-w-7xl w-full mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
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
            <AnimatedButton href="/join" size="lg">
              Join the Network
            </AnimatedButton>
            <AnimatedButton
              href="/programs"
              variant="secondary"
              size="lg"
              className="border-white text-white"
            >
              Our Programs
            </AnimatedButton>
          </div>
        </div>
        <div className="flex-1" />

        <div
          ref={statsRef}
          className="absolute bottom-0 left-0 right-0 border-t border-white/15 bg-black/35 py-6 px-8 backdrop-blur-md"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-around">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                {i > 0 && <div className="h-9 w-px bg-white/20 mx-8 md:mx-12" />}
                <StatItem stat={stat} hasAnimated={hasAnimated} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

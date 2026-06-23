import type { LucideIcon } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";

export default function EmptyState({
  icon: Icon,
  title,
  href,
  ctaLabel,
}: {
  icon: LucideIcon;
  title: string;
  href?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="bg-white rounded-xl py-16 flex flex-col items-center justify-center text-center">
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
        <Icon size={26} />
      </div>
      <p className="text-text/60">{title}</p>
      {href && ctaLabel && (
        <AnimatedButton href={href} variant="ghost" className="mt-3">
          {ctaLabel}
        </AnimatedButton>
      )}
    </div>
  );
}

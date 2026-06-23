import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type ProgramCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  eligibility?: string;
  href?: string;
  ctaLabel?: string;
};

export default function ProgramCard({
  icon: Icon,
  title,
  description,
  eligibility,
  href = "/programs",
  ctaLabel = "Learn More",
}: ProgramCardProps) {
  return (
    <Card className="border-l-4 border-l-transparent hover:border-l-primary transition-colors shadow-sm hover:shadow-md">
      <CardHeader>
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
          <Icon size={22} />
        </div>
        <h3 className="font-heading text-xl font-semibold text-primary-dark">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-text/80 text-sm">{description}</p>
        {eligibility && (
          <p className="text-xs text-text/60 mt-3">
            <span className="font-accent uppercase tracking-wide">Eligibility:</span>{" "}
            {eligibility}
          </p>
        )}
        <Link
          href={href}
          className="inline-block mt-4 text-sm font-accent uppercase tracking-wide text-primary hover:text-accent transition-colors"
        >
          {ctaLabel} →
        </Link>
      </CardContent>
    </Card>
  );
}

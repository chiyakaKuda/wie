import { Quote } from "lucide-react";

type TestimonialCardProps = {
  quote: string;
  name: string;
  discipline: string;
};

export default function TestimonialCard({ quote, name, discipline }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-l-accent">
      <Quote className="text-accent mb-3" size={24} />
      <p className="text-text/80 text-sm italic">&ldquo;{quote}&rdquo;</p>
      <p className="font-heading text-primary-dark font-semibold mt-4">{name}</p>
      <p className="font-accent text-xs uppercase tracking-wide text-text/60">{discipline}</p>
    </div>
  );
}

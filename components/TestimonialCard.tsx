import Image from "next/image";
import { Quote } from "lucide-react";

type TestimonialCardProps = {
  quote: string;
  name: string;
  discipline: string;
  photo: string;
};

export default function TestimonialCard({ quote, name, discipline, photo }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-l-accent">
      <Quote className="text-accent mb-3" size={24} />
      <p className="text-text/80 text-sm italic">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-3 mt-5">
        <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0">
          <Image src={photo} alt={name} fill className="object-cover" />
        </div>
        <div>
          <p className="font-heading text-primary-dark font-semibold">{name}</p>
          <p className="font-accent text-xs uppercase tracking-wide text-text/60">{discipline}</p>
        </div>
      </div>
    </div>
  );
}

import Slash from "@/components/Slash";

export default function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-accent uppercase tracking-widest text-sm text-primary flex items-center gap-1 mb-3">
      <Slash />
      {children}
    </p>
  );
}

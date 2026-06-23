const SPONSORS = [
  "Platinum Sponsor",
  "Gold Sponsor",
  "Gold Sponsor",
  "Silver Sponsor",
  "Silver Sponsor",
  "Community Partner",
];

export default function SponsorStrip() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {SPONSORS.map((label, i) => (
        <div
          key={i}
          className="w-44 h-20 rounded-lg border border-border bg-white flex items-center justify-center text-center text-xs font-accent uppercase tracking-wide text-text/50"
        >
          {label}
        </div>
      ))}
    </div>
  );
}

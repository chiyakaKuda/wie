const STATS = [
  { value: "500+", label: "Members" },
  { value: "12", label: "Programs" },
  { value: "8", label: "Provinces" },
];

export default function StatsBar() {
  return (
    <div className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-3 text-center divide-x divide-white/20">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p className="font-heading text-3xl md:text-4xl font-bold">{stat.value}</p>
            <p className="font-accent text-xs md:text-sm uppercase tracking-widest text-white/80 mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

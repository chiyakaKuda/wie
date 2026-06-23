export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="h-8 w-40 bg-surface rounded mb-10 animate-pulse" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-72 bg-surface rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}

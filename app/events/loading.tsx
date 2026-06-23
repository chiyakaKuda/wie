export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="h-8 w-40 bg-surface rounded mb-10 animate-pulse" />
      <div className="grid md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 bg-surface rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}

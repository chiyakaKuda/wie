export default function Slash({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`font-heading text-accent inline-block ${className}`}
    >
      /
    </span>
  );
}

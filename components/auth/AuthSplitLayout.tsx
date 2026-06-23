import Link from "next/link";
import Slash from "@/components/Slash";

export default function AuthSplitLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-primary-dark px-12 py-12 text-white">
        <Link href="/" className="flex flex-col leading-tight border-l-4 border-accent pl-3">
          <span className="font-heading text-[28px] font-bold text-white">WiEZ</span>
          <span className="font-accent text-[9px] uppercase tracking-[0.2em] text-white/60">
            Women in Engineering Zimbabwe
          </span>
        </Link>

        <div>
          <Slash className="text-4xl" />
          <h1 className="font-heading text-3xl font-bold leading-tight mt-2 max-w-sm">
            Engineering Zimbabwe&apos;s Future, One Woman at a Time
          </h1>
          <p className="text-white/70 mt-4 max-w-sm">
            A professional network for women engineers across Zimbabwe — from
            students to industry leaders.
          </p>
        </div>

        <p className="font-accent text-xs text-white/50">wiez.org.zw</p>
      </div>

      <div className="flex items-center justify-center px-6 py-16 bg-white">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="flex flex-col leading-tight border-l-4 border-accent pl-3">
              <span className="font-heading text-[28px] font-bold text-primary">WiEZ</span>
            </Link>
          </div>
          <h2 className="font-heading text-2xl font-bold text-primary-dark">{title}</h2>
          <p className="text-text/70 text-sm mt-2 mb-8">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}

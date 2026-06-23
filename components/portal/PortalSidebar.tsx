"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, UserCircle, CreditCard } from "lucide-react";
import Slash from "@/components/Slash";

const LINKS = [
  { href: "/portal", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/events", label: "My Events", icon: CalendarDays },
  { href: "/portal/profile", label: "My Profile", icon: UserCircle },
  { href: "/portal/membership", label: "Membership", icon: CreditCard },
];

export default function PortalSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-primary-dark text-white min-h-screen flex flex-col">
      <div className="px-6 py-6 border-b border-white/10">
        <Link href="/" className="flex flex-col leading-tight border-l-4 border-accent pl-3">
          <span className="font-heading text-2xl font-bold text-white">WiEZ</span>
          <span className="font-accent text-[9px] uppercase tracking-[0.2em] text-white/60">
            Member Portal
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-sm font-accent text-sm transition-colors ${
                active
                  ? "bg-white/10 text-accent"
                  : "text-white/80 hover:bg-white/5 hover:text-white"
              }`}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-white/10">
        <p className="font-accent text-[9px] text-white/40 flex items-center gap-1">
          <Slash className="text-[10px]" /> wiez.org.zw
        </p>
      </div>
    </aside>
  );
}

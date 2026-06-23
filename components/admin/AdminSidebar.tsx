"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileText,
  Settings,
  type LucideIcon,
} from "lucide-react";
import Slash from "@/components/Slash";

type NavSection = {
  label: string;
  items: { href: string; label: string; icon: LucideIcon }[];
};

const NAV_SECTIONS: NavSection[] = [
  {
    label: "OVERVIEW",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "MEMBERS",
    items: [
      { href: "/admin/members", label: "All Members", icon: Users },
      { href: "/admin/members/applications", label: "Applications", icon: FileText },
    ],
  },
  {
    label: "EVENTS",
    items: [
      { href: "/admin/events", label: "All Events", icon: CalendarDays },
      { href: "/admin/events/create", label: "Create Event", icon: CalendarDays },
    ],
  },
  {
    label: "SETTINGS",
    items: [{ href: "/admin/settings", label: "Admin Settings", icon: Settings }],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-primary-dark text-white min-h-screen flex flex-col">
      <div className="px-6 py-6 border-b border-white/10">
        <Link href="/" className="flex flex-col leading-tight border-l-4 border-accent pl-3">
          <span className="font-heading text-2xl font-bold text-white">WiEZ</span>
          <span className="font-accent text-[9px] uppercase tracking-[0.2em] text-white/60">
            Admin Panel
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <p className="font-accent text-xs uppercase tracking-wider text-white/40 px-3 mb-2">
              {section.label}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-sm font-accent text-sm transition-colors ${
                      active
                        ? "bg-white/10 text-accent"
                        : "text-white/80 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-white/10">
        <p className="font-accent text-[9px] text-white/40 flex items-center gap-1">
          <Slash className="text-[10px]" /> wiez.org.zw
        </p>
      </div>
    </aside>
  );
}

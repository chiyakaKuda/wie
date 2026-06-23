"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function DashboardTopbar({ name }: { name: string }) {
  return (
    <header className="h-16 shrink-0 bg-white border-b border-border flex items-center justify-between px-8">
      <p className="font-heading text-lg text-primary-dark">
        Welcome, <span className="font-semibold">{name}</span>
      </p>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex items-center gap-2 text-sm font-accent uppercase tracking-wide text-text/70 hover:text-primary transition-colors"
      >
        <LogOut size={16} />
        Logout
      </button>
    </header>
  );
}

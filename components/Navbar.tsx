"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "News" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full h-20 bg-white shadow-md">
      <nav className="h-full max-w-7xl mx-auto flex items-center justify-between px-6">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-heading text-2xl font-bold text-primary">WiEZ</span>
          <span className="font-accent text-[10px] uppercase tracking-widest text-text/70">
            Women in Engineering Zimbabwe
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-accent text-sm uppercase tracking-wide text-text hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button
            render={<Link href="/join" />}
            nativeButton={false}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Join Us
          </Button>
        </div>

        <button
          className="lg:hidden text-text"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-white border-t border-border px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-accent text-sm uppercase tracking-wide text-text hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Button
            render={<Link href="/join" onClick={() => setOpen(false)} />}
            nativeButton={false}
            className="bg-accent text-accent-foreground hover:bg-accent/90 w-full"
          >
            Join Us
          </Button>
        </div>
      )}
    </header>
  );
}

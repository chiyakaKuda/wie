"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedButton from "@/components/ui/AnimatedButton";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "News" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/contact", label: "Contact" },
];

function useScrollPosition() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled;
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative font-accent text-[13px] font-medium uppercase tracking-[0.08em] text-[#333] hover:text-primary transition-colors"
    >
      {children}
      <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-10 w-10">
      <span
        className="absolute left-1/2 top-1/2 h-[2px] w-6 -translate-x-1/2 bg-primary transition-all duration-300"
        style={{
          transform: open
            ? "translate(-50%, -50%) rotate(45deg)"
            : "translate(-50%, -50%) translateY(-7px)",
        }}
      />
      <span
        className="absolute left-1/2 top-1/2 h-[2px] w-6 -translate-x-1/2 -translate-y-1/2 bg-primary transition-opacity duration-200"
        style={{ opacity: open ? 0 : 1 }}
      />
      <span
        className="absolute left-1/2 top-1/2 h-[2px] w-6 -translate-x-1/2 bg-primary transition-all duration-300"
        style={{
          transform: open
            ? "translate(-50%, -50%) rotate(-45deg)"
            : "translate(-50%, -50%) translateY(7px)",
        }}
      />
    </span>
  );
}

function MobileNavLink({
  href,
  children,
  delay,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  delay: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -40, opacity: 0 }}
      transition={{ duration: 0.3, delay }}
      className="border-b border-white/20"
    >
      <Link
        href={href}
        onClick={onClick}
        className="group flex items-center py-4 font-heading text-[32px] font-bold text-white transition-colors hover:text-accent"
      >
        <span className="mr-1 font-accent text-2xl text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          /
        </span>
        {children}
      </Link>
    </motion.div>
  );
}

export default function Navbar() {
  const scrolled = useScrollPosition();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full h-20 bg-white border-t-[3px] border-t-primary transition-shadow ${
        scrolled ? "shadow-md" : "border-b border-gray-100"
      }`}
    >
      <nav className="h-full max-w-7xl mx-auto flex items-center justify-between px-6">
        <Link
          href="/"
          className="flex flex-col leading-tight border-l-4 border-accent pl-3 transition-opacity duration-200 hover:opacity-80"
        >
          <span className="font-heading text-[28px] font-bold text-primary">WiEZ</span>
          <span className="font-accent text-[9px] uppercase tracking-[0.2em] text-[#999]">
            Women in Engineering Zimbabwe
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
          <AnimatedButton href="/join">Join Us</AnimatedButton>
        </div>

        <button
          className="lg:hidden z-[60]"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <HamburgerIcon open={open} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-50 flex flex-col bg-primary-dark px-6 pb-8"
          >
            <div className="flex h-20 items-center">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex flex-col leading-tight border-l-4 border-accent pl-3"
              >
                <span className="font-heading text-[28px] font-bold text-white">WiEZ</span>
                <span className="font-accent text-[9px] uppercase tracking-[0.2em] text-white/60">
                  Women in Engineering Zimbabwe
                </span>
              </Link>
            </div>

            <nav className="flex-1 flex flex-col overflow-y-auto">
              {NAV_LINKS.map((link, i) => (
                <MobileNavLink
                  key={link.href}
                  href={link.href}
                  delay={0.05 * (i + 1)}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </MobileNavLink>
              ))}
            </nav>

            <div>
              <AnimatedButton
                href="/join"
                onClick={() => setOpen(false)}
                size="lg"
                className="w-full"
              >
                Join Us
              </AnimatedButton>
              <p className="mt-4 text-center font-accent text-[9px] text-white/50">wiez.org.zw</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

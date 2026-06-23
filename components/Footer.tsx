import Link from "next/link";
import { FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from "@/components/SocialIcons";
import Slash from "@/components/Slash";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "News" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/join", label: "Join Us" },
  { href: "/contact", label: "Contact" },
];

const SOCIALS = [
  { href: "https://facebook.com", icon: FacebookIcon, label: "Facebook" },
  { href: "https://twitter.com", icon: TwitterIcon, label: "Twitter" },
  { href: "https://linkedin.com", icon: LinkedinIcon, label: "LinkedIn" },
  { href: "https://instagram.com", icon: InstagramIcon, label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <p className="font-heading text-2xl font-bold">
            WiEZ <Slash className="text-accent" />
          </p>
          <p className="font-accent text-xs uppercase tracking-widest text-white/70 mt-1">
            Women in Engineering Zimbabwe
          </p>
          <p className="text-sm text-white/70 mt-4 max-w-xs">
            Engineering Zimbabwe&apos;s future, one woman at a time.
          </p>
        </div>

        <div>
          <p className="font-accent uppercase tracking-widest text-sm text-accent mb-4">
            Navigate
          </p>
          <ul className="space-y-2 text-sm text-white/80">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-accent transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-accent uppercase tracking-widest text-sm text-accent mb-4">
            Contact
          </p>
          <ul className="space-y-2 text-sm text-white/80">
            <li>14 Selous Avenue, Harare, Zimbabwe</li>
            <li>info@wiez.org.zw</li>
            <li>+263 242 700 123</li>
          </ul>
        </div>

        <div>
          <p className="font-accent uppercase tracking-widest text-sm text-accent mb-4">
            Follow Us
          </p>
          <div className="flex gap-3">
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © 2026 Women in Engineering Zimbabwe. All rights reserved.
      </div>
    </footer>
  );
}

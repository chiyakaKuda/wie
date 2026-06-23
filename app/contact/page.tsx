import { MapPin, Mail, Phone } from "lucide-react";
import SectionEyebrow from "@/components/SectionEyebrow";
import ContactForm from "@/components/ContactForm";
import { FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from "@/components/SocialIcons";

const SOCIALS = [
  { href: "https://facebook.com", icon: FacebookIcon, label: "Facebook" },
  { href: "https://twitter.com", icon: TwitterIcon, label: "Twitter" },
  { href: "https://linkedin.com", icon: LinkedinIcon, label: "LinkedIn" },
  { href: "https://instagram.com", icon: InstagramIcon, label: "Instagram" },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-primary-dark">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">
            Contact Us
          </h1>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto">
            Questions about membership, sponsorship, or our programs? We&apos;d
            love to hear from you.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
          <div>
            <SectionEyebrow>Get In Touch</SectionEyebrow>
            <h2 className="font-heading text-3xl font-bold text-primary-dark mb-8">
              Send Us a Message
            </h2>
            <ContactForm />
          </div>

          <div>
            <div className="bg-surface rounded-xl p-8 space-y-5">
              <div className="flex gap-3">
                <MapPin className="text-primary shrink-0" size={20} />
                <p className="text-text/80">14 Selous Avenue, Harare, Zimbabwe</p>
              </div>
              <div className="flex gap-3">
                <Mail className="text-primary shrink-0" size={20} />
                <p className="text-text/80">info@wiez.org.zw</p>
              </div>
              <div className="flex gap-3">
                <Phone className="text-primary shrink-0" size={20} />
                <p className="text-text/80">+263 242 700 123</p>
              </div>
              <div className="flex gap-3 pt-2">
                {SOCIALS.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 h-64 rounded-xl bg-text/10 flex items-center justify-center text-text/50 text-sm">
              Map placeholder — 14 Selous Avenue, Harare
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionEyebrow from "@/components/SectionEyebrow";
import SponsorStrip from "@/components/SponsorStrip";

const TIERS = [
  {
    name: "Platinum",
    color: "bg-primary-dark",
    benefits: [
      "Logo on homepage hero and all event materials",
      "Speaking slot at Annual Gala",
      "Booth at every regional event",
      "Dedicated mentorship cohort sponsorship",
      "Year-round social media recognition",
    ],
  },
  {
    name: "Gold",
    color: "bg-primary",
    benefits: [
      "Logo on sponsors page and event banners",
      "Booth at Annual Gala",
      "Recognition in quarterly newsletter",
      "Two complimentary Gala tickets",
    ],
  },
  {
    name: "Silver",
    color: "bg-accent text-accent-foreground",
    benefits: [
      "Logo on sponsors page",
      "Recognition at one regional event",
      "One complimentary Gala ticket",
    ],
  },
  {
    name: "Community",
    color: "bg-surface text-primary-dark border border-border",
    benefits: [
      "Name listed on sponsors page",
      "Social media thank-you post",
    ],
  },
];

export default function SponsorsPage() {
  return (
    <>
      <section className="bg-primary-dark">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">
            Sponsors
          </h1>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto">
            Partner with WiEZ to invest in the next generation of Zimbabwean
            engineers.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <SectionEyebrow>Sponsorship Tiers</SectionEyebrow>
          <h2 className="font-heading text-3xl font-bold text-primary-dark mb-10">
            Become a Sponsor
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIERS.map((tier) => (
              <div key={tier.name} className="rounded-xl overflow-hidden shadow-sm border border-border">
                <div className={`${tier.color} px-5 py-4`}>
                  <p className="font-heading text-xl font-bold">{tier.name}</p>
                </div>
                <ul className="p-5 space-y-3 bg-white">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-text/80">
                      <Check size={16} className="text-accent shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <SectionEyebrow>With Thanks To</SectionEyebrow>
          <h2 className="font-heading text-3xl font-bold text-primary-dark mb-10">
            Our Current Sponsors
          </h2>
          <SponsorStrip />
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="font-heading text-2xl font-bold text-primary-dark mb-4">
            Ready to Partner With Us?
          </h2>
          <p className="text-text/80 mb-8">
            Reach out and our partnerships team will help you find the right
            tier for your organisation.
          </p>
          <Button
            render={<Link href="/contact" />}
            nativeButton={false}
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Become a Sponsor
          </Button>
        </div>
      </section>
    </>
  );
}

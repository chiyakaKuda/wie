import { Check } from "lucide-react";
import SectionEyebrow from "@/components/SectionEyebrow";
import JoinForm from "@/components/JoinForm";

const TIERS = [
  {
    name: "Student",
    usd: "$5 / year",
    zwl: "Contact us for current rates",
    benefits: ["Mentorship matching", "Discounted workshop fees", "Newsletter & community access"],
  },
  {
    name: "Associate",
    usd: "$15 / year",
    zwl: "Contact us for current rates",
    benefits: ["All Student benefits", "Eligible for Scholarship Fund mentoring", "Voting rights at AGM"],
  },
  {
    name: "Full Member",
    usd: "$30 / year",
    zwl: "Contact us for current rates",
    benefits: ["All Associate benefits", "Leadership Academy eligibility", "Research Grant eligibility", "Priority event registration"],
  },
  {
    name: "Corporate",
    usd: "$500 / year",
    zwl: "Contact us for current rates",
    benefits: ["Listing as Community Partner", "Access to mentee pipeline", "Branding at regional events", "Bulk staff memberships"],
  },
];

export default function JoinPage() {
  return (
    <>
      <section className="bg-primary-dark">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">
            Join Us
          </h1>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto">
            Become part of a network of women engineers building Zimbabwe&apos;s
            future.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <SectionEyebrow>Membership</SectionEyebrow>
          <h2 className="font-heading text-3xl font-bold text-primary-dark mb-10">
            Choose Your Membership
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIERS.map((tier) => (
              <div key={tier.name} className="rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="bg-primary text-white px-5 py-5">
                  <p className="font-heading text-xl font-bold">{tier.name}</p>
                  <p className="font-accent text-lg mt-1">{tier.usd}</p>
                  <p className="text-xs text-white/70 mt-1">ZWL: {tier.zwl}</p>
                </div>
                <ul className="p-5 space-y-3">
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
        <div className="max-w-3xl mx-auto px-6 py-20">
          <SectionEyebrow>Application</SectionEyebrow>
          <h2 className="font-heading text-3xl font-bold text-primary-dark mb-10">
            Membership Application
          </h2>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <JoinForm />
          </div>
        </div>
      </section>
    </>
  );
}

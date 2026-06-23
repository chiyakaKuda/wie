import { Users, GraduationCap, Wrench, Trophy, Megaphone, FlaskConical } from "lucide-react";
import ProgramCard from "@/components/ProgramCard";
import SectionEyebrow from "@/components/SectionEyebrow";

const PROGRAMS = [
  {
    icon: Users,
    title: "Mentorship Program",
    description: "Pairing engineering students with industry professionals for one-on-one career guidance.",
    eligibility: "Open to students and Associate Members.",
  },
  {
    icon: GraduationCap,
    title: "Scholarship Fund",
    description: "Tuition and equipment grants supporting female engineering students nationwide.",
    eligibility: "Undergraduate women enrolled in an accredited engineering program.",
  },
  {
    icon: Wrench,
    title: "Workshops & Training",
    description: "Hands-on technical upskilling sessions across all engineering disciplines.",
    eligibility: "Open to all WiEZ members.",
  },
  {
    icon: Trophy,
    title: "Leadership Academy",
    description: "A six-month program building technical leadership and negotiation skills for mid-career engineers.",
    eligibility: "5+ years of professional engineering experience.",
  },
  {
    icon: Megaphone,
    title: "Community Outreach",
    description: "Inspiring girls in secondary schools across Zimbabwe to consider engineering careers.",
    eligibility: "Volunteer-led; open to all members.",
  },
  {
    icon: FlaskConical,
    title: "Research Grants",
    description: "Funding for women-led engineering research with real-world infrastructure impact.",
    eligibility: "Full Members with an approved research proposal.",
  },
];

export default function ProgramsPage() {
  return (
    <>
      <section className="bg-primary-dark">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">
            Our Programs
          </h1>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto">
            Six pathways to grow, lead, and give back across every stage of an
            engineering career.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <SectionEyebrow>Programs</SectionEyebrow>
          <h2 className="font-heading text-3xl font-bold text-primary-dark mb-10">
            Find Your Path
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((p) => (
              <ProgramCard key={p.title} {...p} href="/join" ctaLabel="Apply / Learn More" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

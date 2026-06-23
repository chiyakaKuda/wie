import SectionEyebrow from "@/components/SectionEyebrow";
import Slash from "@/components/Slash";
import { Separator } from "@/components/ui/separator";

const TIMELINE = [
  {
    year: "2015",
    text: "Founded at the University of Zimbabwe by a small group of final-year engineering students seeking community and mentorship.",
  },
  {
    year: "2018",
    text: "Launched the Scholarship Fund, awarding its first grants to undergraduate women in civil and electrical engineering.",
  },
  {
    year: "2020",
    text: "Expanded to Bulawayo and Mutare, establishing regional chapters and the first Workshops & Training series.",
  },
  {
    year: "2023",
    text: "Introduced the Leadership Academy for mid-career engineers and surpassed 300 active members.",
  },
  {
    year: "2026",
    text: "Now over 500 members strong across eight provinces, with active research grants and corporate partnerships nationwide.",
  },
];

const LEADERSHIP = [
  { name: "Patience Madziva", title: "President", initials: "PM", bio: "Civil engineer with 18 years in infrastructure consulting across Harare and Bulawayo." },
  { name: "Rutendo Chikafu", title: "Vice President", initials: "RC", bio: "Electrical engineer leading WiEZ's Leadership Academy and corporate partnerships." },
  { name: "Tendai Moyo", title: "Treasurer", initials: "TM", bio: "Mining engineer overseeing the Scholarship Fund and financial governance." },
  { name: "Farai Gumbo", title: "Programs Director", initials: "FG", bio: "Mechanical engineer coordinating mentorship, workshops, and outreach programs." },
];

const VALUES = [
  { title: "Excellence", text: "We hold ourselves to the highest technical and professional standards." },
  { title: "Sisterhood", text: "We build lasting bonds between women engineers across generations and disciplines." },
  { title: "Access", text: "We remove barriers to engineering education and career advancement for women." },
  { title: "Impact", text: "We measure our success by the infrastructure and communities we help build." },
];

const PARTNERS = [
  "IEEE Women in Engineering",
  "Zimbabwe Institution of Engineers",
  "Engineering Council of Zimbabwe",
  "University of Zimbabwe Faculty of Engineering",
  "National University of Science and Technology",
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-primary-dark">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">
            About WiEZ
          </h1>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto">
            A professional home for women engineers across Zimbabwe.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
          <div>
            <SectionEyebrow>Mission</SectionEyebrow>
            <p className="text-text/80">
              To connect, support, and empower women engineers across Zimbabwe
              through mentorship, education, and advocacy — building a more
              inclusive engineering profession.
            </p>
          </div>
          <div>
            <SectionEyebrow>Vision</SectionEyebrow>
            <p className="text-text/80">
              A Zimbabwe where women lead engineering innovation in every
              province, sector, and discipline, with equal representation at
              every level of the profession.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <SectionEyebrow>Our Journey</SectionEyebrow>
          <h2 className="font-heading text-3xl font-bold text-primary-dark mb-10">
            History
          </h2>
          <div className="space-y-8 border-l-2 border-primary/20 pl-8">
            {TIMELINE.map((item) => (
              <div key={item.year} className="relative">
                <span className="absolute -left-[42px] top-0 w-5 h-5 rounded-full bg-accent" />
                <p className="font-heading text-xl font-bold text-primary">{item.year}</p>
                <p className="text-text/80 mt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <SectionEyebrow>Leadership</SectionEyebrow>
          <h2 className="font-heading text-3xl font-bold text-primary-dark mb-10">
            Our Team
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {LEADERSHIP.map((person) => (
              <div key={person.name} className="text-center">
                <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center font-heading text-2xl font-bold mx-auto">
                  {person.initials}
                </div>
                <p className="font-heading text-lg font-semibold text-primary-dark mt-4">
                  {person.name}
                </p>
                <p className="font-accent text-xs uppercase tracking-wide text-accent">
                  {person.title}
                </p>
                <p className="text-sm text-text/70 mt-2">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <SectionEyebrow>What Drives Us</SectionEyebrow>
          <h2 className="font-heading text-3xl font-bold text-primary-dark mb-10">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="flex gap-3">
                <Slash className="text-2xl shrink-0" />
                <div>
                  <p className="font-heading text-lg font-semibold text-primary-dark">{v.title}</p>
                  <p className="text-sm text-text/70">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <SectionEyebrow>Affiliations</SectionEyebrow>
          <h2 className="font-heading text-3xl font-bold text-primary-dark mb-8">
            Partners & Affiliations
          </h2>
          <Separator className="mb-8" />
          <ul className="grid sm:grid-cols-2 gap-3 text-text/80">
            {PARTNERS.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <Slash />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

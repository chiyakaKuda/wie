import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.event.deleteMany();
  await prisma.newsArticle.deleteMany();

  await prisma.event.createMany({
    data: [
      {
        title: "WiEZ Annual Gala 2026",
        description:
          "An evening celebrating the achievements of women engineers across Zimbabwe, with awards for Engineer of the Year and Rising Star.",
        date: new Date("2026-08-15T18:00:00Z"),
        location: "Harare",
        type: "Networking",
        isPast: false,
      },
      {
        title: "Structural Engineering Workshop",
        description:
          "A hands-on technical workshop on modern structural design software, hosted with the Civil Engineering faculty at NUST.",
        date: new Date("2026-07-22T09:00:00Z"),
        location: "Bulawayo",
        type: "Workshop",
        isPast: false,
      },
      {
        title: "Women in Renewable Energy Conference",
        description:
          "Regional conference bringing together engineers, policymakers, and energy companies to discuss Zimbabwe's renewable energy future.",
        date: new Date("2026-09-10T08:30:00Z"),
        location: "Mutare",
        type: "Conference",
        isPast: false,
      },
      {
        title: "Mentorship Matching Mixer",
        description:
          "Speed-mentoring session pairing final-year engineering students with industry mentors from across Mashonaland.",
        date: new Date("2026-03-05T17:00:00Z"),
        location: "Harare",
        type: "Networking",
        isPast: true,
      },
      {
        title: "Girls in Engineering Seminar",
        description:
          "Outreach seminar inspiring secondary school girls in Masvingo Province to pursue engineering careers.",
        date: new Date("2026-02-14T10:00:00Z"),
        location: "Masvingo",
        type: "Seminar",
        isPast: true,
      },
      {
        title: "Mining Engineering Site Tour & Workshop",
        description:
          "A technical site visit and safety workshop for members working in the mining sector, hosted in the Midlands.",
        date: new Date("2026-01-28T09:00:00Z"),
        location: "Gweru",
        type: "Workshop",
        isPast: true,
      },
    ],
  });

  await prisma.newsArticle.createMany({
    data: [
      {
        title: "WiEZ Partners with ZINARA to Mentor Female Road Engineers",
        slug: "wiez-partners-zinara-mentor-female-road-engineers",
        excerpt:
          "A new partnership with the Zimbabwe National Road Administration will place 20 female civil engineers into a year-long mentorship pipeline.",
        content:
          "Women in Engineering Zimbabwe has signed a memorandum of understanding with the Zimbabwe National Road Administration (ZINARA) to mentor twenty female civil engineers over the next year. The program pairs participants with senior road engineers across Harare, Bulawayo, and Mutare, focusing on pavement design, project supervision, and contract management. WiEZ President noted that the partnership reflects a broader push to close the gender gap in infrastructure leadership roles across Zimbabwe.",
        category: "Partnerships",
        author: "WiEZ Communications",
        publishedAt: new Date("2026-05-12T08:00:00Z"),
      },
      {
        title: "Scholarship Fund Awards Ten New Grants for 2026",
        slug: "scholarship-fund-awards-ten-new-grants-2026",
        excerpt:
          "The WiEZ Scholarship Fund has awarded ten new grants to undergraduate engineering students across six provinces.",
        content:
          "The WiEZ Scholarship Fund Committee announced ten new grant recipients for the 2026 academic year, drawn from applicants studying at the University of Zimbabwe, NUST, HIT, and Chinhoyi University of Technology. Recipients span civil, electrical, mining, and chemical engineering disciplines. Each grant covers tuition and a stipend for textbooks and equipment, funded through corporate sponsorships and member contributions.",
        category: "Scholarships",
        author: "Tendai Moyo",
        publishedAt: new Date("2026-04-03T08:00:00Z"),
      },
      {
        title: "Leadership Academy Graduates First Cohort in Bulawayo",
        slug: "leadership-academy-graduates-first-cohort-bulawayo",
        excerpt:
          "Fifteen mid-career engineers completed the inaugural WiEZ Leadership Academy, a six-month program on technical leadership and negotiation.",
        content:
          "The first cohort of the WiEZ Leadership Academy graduated in Bulawayo this month, marking the completion of a six-month curriculum covering technical leadership, negotiation, and project governance. Graduates included engineers from the mining, manufacturing, and utilities sectors. WiEZ plans to expand the Academy to Harare and Mutare in the coming year.",
        category: "Programs",
        author: "Rutendo Chikafu",
        publishedAt: new Date("2026-03-20T08:00:00Z"),
      },
      {
        title: "Research Grant Funds Study on Solar Mini-Grids in Manicaland",
        slug: "research-grant-solar-mini-grids-manicaland",
        excerpt:
          "A WiEZ-funded research project will study the feasibility of solar mini-grids for rural communities in Manicaland Province.",
        content:
          "Dr. Chiedza Ndlovu, an electrical engineer based in Mutare, has received a WiEZ Research Grant to study the feasibility of solar mini-grid deployment for rural communities in Manicaland Province. The eighteen-month study will assess technical and financial models for community-owned renewable energy infrastructure, with findings to be shared with the Rural Electrification Agency.",
        category: "Research",
        author: "WiEZ Communications",
        publishedAt: new Date("2026-02-18T08:00:00Z"),
      },
      {
        title: "WiEZ Hosts Career Fair for Engineering Graduates in Harare",
        slug: "wiez-career-fair-engineering-graduates-harare",
        excerpt:
          "Over 300 graduating engineering students attended the WiEZ Career Fair, connecting with employers from across Zimbabwe's industrial sector.",
        content:
          "More than 300 graduating engineering students attended the annual WiEZ Career Fair at the University of Zimbabwe, connecting with employers spanning construction, mining, telecommunications, and manufacturing. The fair included on-the-spot interviews, CV clinics, and a panel discussion on navigating the first five years of an engineering career.",
        category: "Events",
        author: "Farai Gumbo",
        publishedAt: new Date("2026-01-15T08:00:00Z"),
      },
    ],
  });

  console.log("Seed data created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

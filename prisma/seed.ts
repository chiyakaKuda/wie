import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

const PASSWORD_HASH = async (pw: string) => await bcrypt.hash(pw, 10);

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.eventRSVP.deleteMany();
  await prisma.event.deleteMany();
  await prisma.newsArticle.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminPassword = await PASSWORD_HASH("Admin@WiEZ2025");
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@wiez.org.zw",
      password: adminPassword,
      role: "ADMIN",
      memberStatus: "ACTIVE",
    },
  });
  console.log("✓ Admin user created");

  // Create active members
  const memberPassword = await PASSWORD_HASH("Member@WiEZ2025");
  const member1 = await prisma.user.create({
    data: {
      name: "Rumbidzai Chari",
      email: "rumbidzai@example.com",
      password: memberPassword,
      phone: "+263 77 123 4567",
      province: "Harare",
      discipline: "Civil Engineering",
      membershipType: "Full Member",
      role: "MEMBER",
      memberStatus: "ACTIVE",
    },
  });

  const member2 = await prisma.user.create({
    data: {
      name: "Nyasha Mutize",
      email: "nyasha@example.com",
      password: memberPassword,
      phone: "+263 78 234 5678",
      province: "Bulawayo",
      discipline: "Electrical Engineering",
      membershipType: "Full Member",
      role: "MEMBER",
      memberStatus: "ACTIVE",
    },
  });

  const member3 = await prisma.user.create({
    data: {
      name: "Tariro Zinyemba",
      email: "tariro@example.com",
      password: memberPassword,
      phone: "+263 77 345 6789",
      province: "Gweru",
      discipline: "Mining Engineering",
      membershipType: "Associate",
      role: "MEMBER",
      memberStatus: "ACTIVE",
    },
  });
  console.log("✓ Active members created");

  // Create pending applications
  const pendingPassword = await PASSWORD_HASH("Pending@WiEZ2025");
  const pending1 = await prisma.user.create({
    data: {
      name: "Chiedza Mhangami",
      email: "chiedza@example.com",
      password: pendingPassword,
      phone: "+263 77 456 7890",
      province: "Harare",
      discipline: "Mechanical Engineering",
      membershipType: "Student",
      role: "MEMBER",
      memberStatus: "PENDING",
    },
  });

  const pending2 = await prisma.user.create({
    data: {
      name: "Thandeka Mhlongo",
      email: "thandeka@example.com",
      password: pendingPassword,
      phone: "+263 78 567 8901",
      province: "Manicaland",
      discipline: "Software Engineering",
      membershipType: "Associate",
      role: "MEMBER",
      memberStatus: "PENDING",
    },
  });
  console.log("✓ Pending applications created");

  // Create events
  const now = new Date();
  const upcoming1 = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const upcoming2 = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
  const past1 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const event1 = await prisma.event.create({
    data: {
      title: "Women in Engineering Workshop",
      description: "A workshop for all levels of female engineers to network and learn.",
      date: upcoming1,
      location: "Harare Innovation Hub",
      province: "Harare",
      type: "Workshop",
      capacity: 50,
      isPublished: true,
      isPast: false,
    },
  });

  const event2 = await prisma.event.create({
    data: {
      title: "Annual Gala Dinner",
      description: "Celebrating women in engineering across Zimbabwe.",
      date: upcoming2,
      location: "Sheraton Harare",
      province: "Harare",
      type: "Conference",
      capacity: 200,
      isPublished: true,
      isPast: false,
    },
  });

  const event3 = await prisma.event.create({
    data: {
      title: "Leadership Training",
      description: "Training for aspiring female engineering leaders.",
      date: past1,
      location: "Zoom",
      province: "Harare",
      type: "Workshop",
      isPublished: true,
      isPast: true,
    },
  });
  console.log("✓ Events created");

  // Create RSVPs
  await prisma.eventRSVP.create({
    data: { userId: member1.id, eventId: event1.id, status: "CONFIRMED" },
  });
  await prisma.eventRSVP.create({
    data: { userId: member2.id, eventId: event2.id, status: "CONFIRMED" },
  });
  await prisma.eventRSVP.create({
    data: { userId: member3.id, eventId: event1.id, status: "CONFIRMED" },
  });
  await prisma.eventRSVP.create({
    data: { userId: member1.id, eventId: event3.id, status: "CONFIRMED" },
  });
  console.log("✓ RSVPs created");

  // Create news articles
  await prisma.newsArticle.create({
    data: {
      title: "Breaking the Glass Ceiling: Women Engineers Lead",
      slug: "women-engineers-lead",
      excerpt: "Discover how WiEZ members are shaping Zimbabwe's engineering future.",
      content: "Full article content here...",
      category: "Success Stories",
      author: "Admin",
      publishedAt: new Date(),
    },
  });

  await prisma.newsArticle.create({
    data: {
      title: "Scholarship Fund Expands to 50 Recipients",
      slug: "scholarship-fund-expands",
      excerpt: "WiEZ announces record scholarship distribution for 2025.",
      content: "Full article content here...",
      category: "Announcements",
      author: "Admin",
      publishedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    },
  });
  console.log("✓ News articles created");

  console.log("\n✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

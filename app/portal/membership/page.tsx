import { Check } from "lucide-react";
import { requireUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import StatusBadge from "@/components/StatusBadge";
import AnimatedButton from "@/components/ui/AnimatedButton";

const BENEFITS: Record<string, string[]> = {
  Student: ["Mentorship matching", "Discounted workshop fees", "Newsletter & community access"],
  Associate: [
    "All Student benefits",
    "Eligible for Scholarship Fund mentoring",
    "Voting rights at AGM",
  ],
  "Full Member": [
    "All Associate benefits",
    "Leadership Academy eligibility",
    "Research Grant eligibility",
    "Priority event registration",
  ],
  Corporate: [
    "Listing as Community Partner",
    "Access to mentee pipeline",
    "Branding at regional events",
    "Bulk staff memberships",
  ],
};

export const dynamic = "force-dynamic";

export default async function PortalMembershipPage() {
  const user = await requireUser();
  const fullUser = await prisma.user.findUnique({ where: { id: user.id } });

  const membershipType = fullUser?.membershipType ?? "Student";
  const benefits = BENEFITS[membershipType] ?? BENEFITS.Student;

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-bold text-primary-dark mb-8">Membership</h1>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-accent text-xs uppercase tracking-wide text-text/60">Current Plan</p>
            <p className="font-heading text-2xl font-bold text-primary-dark mt-1">
              {membershipType}
            </p>
          </div>
          {fullUser && <StatusBadge status={fullUser.memberStatus} />}
        </div>

        <p className="text-sm text-text/60 mt-4">
          Member since{" "}
          {fullUser?.joinedAt.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>

        <h3 className="font-heading text-lg font-semibold text-primary-dark mt-6 mb-3">
          Your Benefits
        </h3>
        <ul className="space-y-2">
          {benefits.map((b) => (
            <li key={b} className="flex gap-2 text-sm text-text/80">
              <Check size={16} className="text-accent shrink-0 mt-0.5" />
              {b}
            </li>
          ))}
        </ul>

        <AnimatedButton href="/contact" variant="secondary" className="mt-6">
          Contact Admin to Upgrade
        </AnimatedButton>
      </div>
    </div>
  );
}

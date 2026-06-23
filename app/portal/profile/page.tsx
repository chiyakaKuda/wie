import { requireUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { ProfileForm, PasswordForm } from "@/components/portal/ProfileForm";

export const dynamic = "force-dynamic";

export default async function PortalProfilePage() {
  const user = await requireUser();
  const fullUser = await prisma.user.findUnique({ where: { id: user.id } });

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-bold text-primary-dark mb-8">My Profile</h1>
      <div className="grid gap-6">
        <ProfileForm
          initial={{
            name: fullUser?.name ?? "",
            phone: fullUser?.phone ?? "",
            province: fullUser?.province ?? "",
            discipline: fullUser?.discipline ?? "",
            employer: fullUser?.employer ?? "",
          }}
        />
        <PasswordForm />
      </div>
    </div>
  );
}

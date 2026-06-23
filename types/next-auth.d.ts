import type { DefaultSession } from "next-auth";
import type { MemberStatus, Role } from "@/lib/generated/prisma/client";

declare module "next-auth" {
  interface User {
    id: string;
    role: Role;
    memberStatus: MemberStatus;
  }

  interface Session {
    user: {
      id: string;
      role: Role;
      memberStatus: MemberStatus;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    memberStatus: MemberStatus;
  }
}

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AnimatedButton from "@/components/ui/AnimatedButton";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/portal";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setError(false);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError(true);
      setTimeout(() => setError(false), 500);
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className={`grid gap-5 ${error ? "animate-shake" : ""}`}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
      </div>

      {error && (
        <p className="text-sm text-destructive">Invalid email or password. Please try again.</p>
      )}

      <AnimatedButton
        type="button"
        onClick={handleSubmit}
        loading={loading}
        icon={LogIn}
        className="w-full"
      >
        Sign In
      </AnimatedButton>

      <p className="text-center text-sm text-text/70">
        Not a member yet?{" "}
        <Link href="/join" className="text-primary hover:text-accent font-medium">
          Apply for membership →
        </Link>
      </p>
    </div>
  );
}

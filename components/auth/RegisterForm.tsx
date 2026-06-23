"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnimatedButton from "@/components/ui/AnimatedButton";

const PROVINCES = [
  "Harare",
  "Bulawayo",
  "Manicaland",
  "Mashonaland Central",
  "Mashonaland East",
  "Mashonaland West",
  "Masvingo",
  "Matabeleland North",
  "Matabeleland South",
  "Midlands",
];

const MEMBERSHIP_TYPES = ["Student", "Associate", "Full Member", "Corporate"];

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  province: "",
  discipline: "",
  membershipType: "",
};

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit() {
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      toast.success("Application submitted!", {
        description: "You'll be activated by an admin.",
      });
      router.push("/login");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={(e) => update("confirmPassword", e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
      </div>

      <div className="grid gap-2">
        <Label>Province</Label>
        <Select value={form.province} onValueChange={(v) => update("province", v ?? "")}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select province" />
          </SelectTrigger>
          <SelectContent>
            {PROVINCES.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="discipline">Engineering Discipline</Label>
        <Input
          id="discipline"
          placeholder="e.g. Civil, Electrical, Mining"
          value={form.discipline}
          onChange={(e) => update("discipline", e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label>Membership Type</Label>
        <Select value={form.membershipType} onValueChange={(v) => update("membershipType", v ?? "")}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select membership type" />
          </SelectTrigger>
          <SelectContent>
            {MEMBERSHIP_TYPES.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <AnimatedButton
        type="button"
        onClick={handleSubmit}
        loading={loading}
        icon={UserPlus}
        className="w-full mt-2"
      >
        Create Account
      </AnimatedButton>
    </div>
  );
}

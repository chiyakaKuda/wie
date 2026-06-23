"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";
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

export type ProfileData = {
  name: string;
  phone: string;
  province: string;
  discipline: string;
  employer: string;
};

export function ProfileForm({ initial }: { initial: ProfileData }) {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);

  function update<K extends keyof ProfileData>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSave() {
    setLoading(true);
    try {
      const res = await fetch("/api/portal/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success("Profile updated.");
    } catch {
      toast.error("Could not update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
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
          <Label htmlFor="discipline">Discipline</Label>
          <Input
            id="discipline"
            value={form.discipline}
            onChange={(e) => update("discipline", e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="employer">Current Employer / Institution</Label>
        <Input
          id="employer"
          value={form.employer}
          onChange={(e) => update("employer", e.target.value)}
        />
      </div>
      <AnimatedButton
        type="button"
        onClick={handleSave}
        loading={loading}
        icon={Save}
        className="justify-self-start"
      >
        Save Changes
      </AnimatedButton>
    </div>
  );
}

export function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/portal/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not update password.");
        return;
      }
      toast.success("Password updated.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Could not update password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm grid gap-4">
      <h3 className="font-heading text-lg font-semibold text-primary-dark">Change Password</h3>
      <div className="grid gap-2">
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input
          id="currentPassword"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
          <Input
            id="confirmNewPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <AnimatedButton
        type="button"
        variant="secondary"
        onClick={handleSave}
        loading={loading}
        className="justify-self-start"
      >
        Update Password
      </AnimatedButton>
    </div>
  );
}

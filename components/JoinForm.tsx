"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  fullName: "",
  email: "",
  phone: "",
  province: "",
  discipline: "",
  employer: "",
  membershipType: "",
  referral: "",
};

export default function JoinForm() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit() {
    setStatus("submitting");
    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm(INITIAL_STATE);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-surface rounded-xl p-8 text-center">
        <p className="font-heading text-xl font-semibold text-primary-dark">
          Application Received
        </p>
        <p className="text-text/70 mt-2">
          Thank you for applying to WiEZ. Our membership team will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
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
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
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
          <Label htmlFor="employer">Current Employer / Institution</Label>
          <Input id="employer" value={form.employer} onChange={(e) => update("employer", e.target.value)} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
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
        <div className="grid gap-2">
          <Label htmlFor="referral">How did you hear about us?</Label>
          <Input id="referral" value={form.referral} onChange={(e) => update("referral", e.target.value)} />
        </div>
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">
          Something went wrong submitting your application. Please try again.
        </p>
      )}

      <Button
        onClick={handleSubmit}
        disabled={status === "submitting"}
        size="lg"
        className="bg-primary hover:bg-primary-dark text-white w-full sm:w-auto justify-self-start"
      >
        {status === "submitting" ? "Submitting..." : "Submit Application"}
      </Button>
    </div>
  );
}

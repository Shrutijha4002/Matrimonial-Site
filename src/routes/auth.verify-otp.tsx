import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AuthShell } from "./auth.sign-in";

export const Route = createFileRoute("/auth/verify-otp")({
  head: () => ({ meta: [{ title: "Verify OTP — Sangam Matrimony" }] }),
  component: VerifyOtp,
});

function VerifyOtp() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const set = (i: number, v: string) => {
    const cleaned = v.replace(/\D/g, "").slice(0, 1);
    const next = [...digits];
    next[i] = cleaned;
    setDigits(next);
    if (cleaned && i < 5) refs.current[i + 1]?.focus();
  };

  const onKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (digits.join("").length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }
    toast.success("Verified!", { description: "Welcome to Sangam. Let's complete your profile." });
    navigate({ to: "/dashboard" });
  };

  return (
    <AuthShell
      title="Verify your number"
      subtitle="We sent a 6-digit code to your registered email."
      cta={{ label: "Didn't get it?", text: "Resend code", to: "/auth/verify-otp" }}
    >
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex items-center gap-2 rounded-xl bg-primary-soft/40 p-3 text-xs text-foreground">
          <ShieldCheck className="h-4 w-4 shrink-0 text-primary" /> A 6-digit code was sent to your email.
        </div>
        <div className="flex justify-between gap-2">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              value={d}
              onChange={(e) => set(i, e.target.value)}
              onKeyDown={(e) => onKey(i, e)}
              inputMode="numeric"
              maxLength={1}
              className="h-14 w-12 rounded-xl border border-border bg-card text-center font-display text-2xl font-bold focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          ))}
        </div>
        <Button type="submit" className="h-11 w-full bg-gradient-primary text-base shadow-glow hover:opacity-95">
          Verify & continue
        </Button>
      </form>
    </AuthShell>
  );
}

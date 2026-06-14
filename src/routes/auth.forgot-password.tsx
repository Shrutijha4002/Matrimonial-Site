import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AuthShell } from "./auth.sign-in";

export const Route = createFileRoute("/auth/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot Password — Sangam Matrimony" }] }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const navigate = useNavigate();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Reset link sent", { description: "Check your email for a 6-digit code." });
    navigate({ to: "/auth/verify-otp" });
  };
  return (
    <AuthShell
      title="Forgot password?"
      subtitle="Enter your email and we'll send a verification code to reset it."
      cta={{ label: "Remembered it?", text: "Back to sign in", to: "/auth/sign-in" }}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Registered email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="email" type="email" required placeholder="you@example.com" className="pl-9 h-11" />
          </div>
        </div>
        <Button type="submit" className="h-11 w-full bg-gradient-primary text-base shadow-glow hover:opacity-95">
          Send reset code
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Need help? <Link to="/help" className="font-semibold text-primary hover:underline">Visit Help Center</Link>
        </p>
      </form>
    </AuthShell>
  );
}

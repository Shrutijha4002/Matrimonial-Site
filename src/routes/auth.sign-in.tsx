import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Heart, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/auth/sign-in")({
  head: () => ({ meta: [{ title: "Sign in — Sangam Matrimony" }] }),
  component: SignIn,
});

function SignIn() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register } = useStore();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ok = login(email, password);
    if (ok) {
      toast.success("Welcome back!");
      navigate({ to: "/dashboard" });
    } else {
      register({ email, password, name: email.split("@")[0], gender: "female", profileFor: "self", phone: "" });
      toast.success("Account created!", { description: "You're now signed in." });
      navigate({ to: "/dashboard" });
    }
  };

  return <AuthShell title="Welcome back" subtitle="Sign in to continue your journey." cta={{ label: "New here?", text: "Create account", to: "/auth/register" }}>
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" className="pl-9 h-11" />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="password" type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" className="pl-9 pr-10 h-11" />
          <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs">
        <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Remember me</label>
        <Link to="/auth/forgot-password" className="font-semibold text-primary hover:underline">Forgot password?</Link>
      </div>
      <Button type="submit" className="h-11 w-full bg-gradient-primary text-base shadow-glow hover:opacity-95">Sign in</Button>
    </form>
  </AuthShell>;
}

export function AuthShell({
  title, subtitle, children, cta,
}: {
  title: string; subtitle: string; children: React.ReactNode;
  cta: { label: string; text: string; to: "/auth/sign-in" | "/auth/register" | "/auth/forgot-password" | "/auth/verify-otp" };
}) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-gradient-primary lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 backdrop-blur">
              <Heart className="h-5 w-5 fill-current" />
            </span>
            <span className="font-display text-2xl font-bold">Sangam.</span>
          </Link>
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight">Find someone who feels like home.</h2>
            <p className="mt-3 text-base opacity-90">Join 2 million+ singles building meaningful, lifelong partnerships.</p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[["12K+","Marriages"],["98%","Match score"],["2M+","Verified"]].map(([n,l]) => (
                <div key={l} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="font-display text-2xl font-bold">{n}</p>
                  <p className="text-xs opacity-90">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs opacity-75">© {new Date().getFullYear()} Sangam Matrimony</p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-background px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 lg:hidden">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
              <Heart className="h-4 w-4 fill-current" />
            </span>
            <span className="font-display text-xl font-bold">Sangam.</span>
          </Link>
          <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {cta.label}{" "}
            <Link to={cta.to} className="font-semibold text-primary hover:underline">{cta.text}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

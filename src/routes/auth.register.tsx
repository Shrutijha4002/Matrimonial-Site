import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Mail, Lock, User, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { AuthShell } from "./auth.sign-in";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/auth/register")({
  head: () => ({ meta: [{ title: "Create Account — Sangam Matrimony" }] }),
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const { register } = useStore();
  const [profileFor, setProfileFor] = useState("self");
  const [gender, setGender] = useState("female");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    register({ email, password, name, gender: gender as "male" | "female", profileFor: profileFor as "self" | "son" | "daughter" | "sibling", phone });
    toast.success("Account created!", { description: "Welcome to Sangam!" });
    navigate({ to: "/dashboard" });
  };

  return (
    <AuthShell
      title="Create your free account"
      subtitle="Takes under 3 minutes. No credit card required."
      cta={{ label: "Already a member?", text: "Sign in", to: "/auth/sign-in" }}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Profile for</Label>
            <Select value={profileFor} onValueChange={setProfileFor}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="self">Myself</SelectItem>
                <SelectItem value="son">Son</SelectItem>
                <SelectItem value="daughter">Daughter</SelectItem>
                <SelectItem value="sibling">Sibling</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Gender</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="name">Full name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="name" value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. Aanya Sharma" className="pl-9 h-11" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" className="pl-9 h-11" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required placeholder="9876543210" className="pl-9 h-11" />
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="At least 6 characters" className="pl-9 h-11" />
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          By continuing you agree to our <a href="#" className="text-primary hover:underline">Terms</a> &{" "}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
        </p>

        <Button type="submit" className="h-11 w-full bg-gradient-primary text-base shadow-glow hover:opacity-95">
          Create Free Account
        </Button>
      </form>
    </AuthShell>
  );
}

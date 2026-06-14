import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { type FormEvent } from "react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Sangam Matrimony" },
      { name: "description", content: "Talk to the Sangam team — we'd love to hear from you." },
    ],
  }),
  component: Contact,
});

const channels = [
  { icon: Mail, label: "Email", value: "hello@sangam.example", note: "We reply within 24 hours" },
  { icon: Phone, label: "Phone", value: "+91 22 4555 1200", note: "Mon–Sat, 10am–7pm IST" },
  { icon: MapPin, label: "Office", value: "Bandra West, Mumbai 400050", note: "Visits by appointment" },
  { icon: Clock, label: "Support", value: "24×7 in-app chat", note: "Priority for Premium members" },
];

function Contact() {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Message sent", { description: "Our team will reach out within 24 hours." });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <SiteLayout>
      <PageHeader eyebrow="We're listening" title="Contact us" description="Questions, feedback, or media enquiries — drop us a note and we'll get back fast." />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
        <div className="grid gap-4 self-start">
          {channels.map((c) => (
            <div key={c.label} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</p>
                <p className="mt-0.5 font-display text-lg font-bold">{c.value}</p>
                <p className="text-xs text-muted-foreground">{c.note}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <h2 className="font-display text-2xl font-bold">Send us a message</h2>
          <p className="text-sm text-muted-foreground">We typically respond within 24 hours on business days.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" required placeholder="Aanya Sharma" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required placeholder="you@example.com" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" required placeholder="How can we help?" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" required rows={5} placeholder="Tell us a little about what you need…" />
            </div>
          </div>
          <Button type="submit" className="mt-6 h-11 w-full bg-gradient-primary text-base shadow-glow hover:opacity-95">
            <Send className="mr-2 h-4 w-4" /> Send message
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            By contacting us you agree to our Privacy Policy and Terms.
          </p>
        </form>
      </section>
    </SiteLayout>
  );
}

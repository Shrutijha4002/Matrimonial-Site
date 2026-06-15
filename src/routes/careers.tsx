import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, Heart, Lightbulb, ShieldCheck, Users, ArrowRight } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Sangam Matrimony" },
      { name: "description", content: "Join the Sangam team and help build the future of meaningful matchmaking." },
    ],
  }),
  component: Careers,
});

const roles = [
  {
    title: "Full Stack Engineer",
    dept: "Engineering",
    location: "Mumbai / Remote",
    type: "Full-time",
  },
  {
    title: "Product Designer",
    dept: "Design",
    location: "Mumbai",
    type: "Full-time",
  },
  {
    title: "Community Manager",
    dept: "Marketing",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Data Scientist",
    dept: "Engineering",
    location: "Mumbai / Remote",
    type: "Full-time",
  },
];

const values = [
  { icon: Heart, title: "Empathy First", desc: "Every decision starts with understanding our members." },
  { icon: ShieldCheck, title: "Trust by Design", desc: "We build privacy and safety into everything we do." },
  { icon: Lightbulb, title: "Continuous Innovation", desc: "We challenge conventions to create better matches." },
  { icon: Users, title: "Inclusive Culture", desc: "Diverse perspectives make our product stronger." },
];

function Careers() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Join Us" title="Careers at Sangam" description="Help us reshape matrimony for a billion people." />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary"><v.icon className="h-5 w-5" /></span>
              <p className="mt-4 font-display font-bold">{v.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold">Open positions</h2>
        <p className="mt-1 text-sm text-muted-foreground">Join a team of 50+ across Mumbai and remote.</p>
        <div className="mt-8 space-y-3">
          {roles.map((r) => (
            <article key={r.title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display text-lg font-bold">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.dept} • {r.location} • {r.type}</p>
              </div>
              <Button className="bg-gradient-primary shadow-glow"><ArrowRight className="mr-1.5 h-4 w-4" /> Apply</Button>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

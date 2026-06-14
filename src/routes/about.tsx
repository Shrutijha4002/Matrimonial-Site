import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShieldCheck, Users, Sparkles, Award } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import team from "@/assets/about-team.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Sangam Matrimony" },
      { name: "description", content: "Sangam is a modern matrimonial platform built on trust, privacy, and meaningful connections." },
    ],
  }),
  component: About,
});

const values = [
  { icon: ShieldCheck, title: "Trust first", body: "Every profile is manually reviewed. Verified members get a visible badge." },
  { icon: Heart, title: "Human matchmaking", body: "Smart algorithms paired with real matchmakers for premium members." },
  { icon: Users, title: "Inclusive communities", body: "Designed for every faith, culture and language across South Asia and the diaspora." },
  { icon: Sparkles, title: "Modern by design", body: "A clean, joyful experience that respects your time and your privacy." },
];

const milestones = [
  { y: "2019", t: "Sangam founded in Mumbai with a team of 4." },
  { y: "2021", t: "Crossed 500,000 verified profiles. Launched mobile apps." },
  { y: "2023", t: "Hit 10,000 successful marriages. Expanded to 40+ cities." },
  { y: "2026", t: "Today: 2M+ singles, 12K+ marriages and growing." },
];

function About() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Our story" title="Built for meaningful matches" description="A modern matrimonial platform crafted by people who believe finding a life partner should feel safe, dignified and delightful." />

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="font-display text-3xl font-bold">Why we exist</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Most matrimonial sites still feel like cluttered databases. We started Sangam because finding your life partner deserves an experience that is warm, modern and genuinely human — without compromising on the values and traditions families hold dear.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Today, Sangam helps over 2 million singles across India and the diaspora discover compatible partners through verified profiles, smart matchmaking and a beautifully simple product.
          </p>
          <div className="mt-6 flex gap-3">
            <Button asChild className="bg-gradient-primary shadow-glow"><Link to="/auth/register">Join Sangam</Link></Button>
            <Button asChild variant="outline"><Link to="/contact">Get in touch</Link></Button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-warm opacity-40 blur-2xl" />
          <img src={team} alt="Sangam team" width={1280} height={768} loading="lazy" className="aspect-[5/3] w-full rounded-3xl object-cover shadow-elegant" />
        </div>
      </section>

      <section className="bg-muted/40 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold">Our values</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <v.icon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-display text-lg font-bold">{v.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Award className="h-6 w-6 text-primary" />
          <h2 className="font-display text-3xl font-bold">Milestones</h2>
        </div>
        <ol className="mt-8 space-y-6 border-l-2 border-primary/30 pl-6">
          {milestones.map((m) => (
            <li key={m.y} className="relative">
              <span className="absolute -left-[31px] grid h-5 w-5 place-items-center rounded-full bg-gradient-primary text-[10px] font-bold text-primary-foreground shadow-glow">•</span>
              <p className="font-display text-xl font-bold">{m.y}</p>
              <p className="text-muted-foreground">{m.t}</p>
            </li>
          ))}
        </ol>
      </section>
    </SiteLayout>
  );
}

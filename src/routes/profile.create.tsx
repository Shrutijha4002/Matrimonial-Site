import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, UserPlus, Sparkles } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/profile/create")({
  head: () => ({ meta: [{ title: "Create Profile — Sangam Matrimony" }] }),
  component: CreateProfile,
});

const steps = [
  { n: "01", title: "Account setup", desc: "Sign up with email or phone. Verify in seconds.", icon: UserPlus },
  { n: "02", title: "Personal details", desc: "Add your name, photos, birth details and family.", icon: Heart },
  { n: "03", title: "Partner preferences", desc: "Tell us what matters in a life partner.", icon: Sparkles },
];

function CreateProfile() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Get Started" title="Create your matrimonial profile" description="A 3-minute setup gets you to verified, premium-quality matches." />
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-3xl border border-border bg-card p-6 shadow-soft">
              <span className="font-display text-5xl font-bold text-primary/15">{s.n}</span>
              <span className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                <s.icon className="h-5 w-5" />
              </span>
              <p className="mt-2 font-display text-xl font-bold">{s.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl bg-gradient-primary p-10 text-center text-primary-foreground shadow-elegant">
          <h2 className="font-display text-3xl font-bold">Ready to begin?</h2>
          <p className="mx-auto mt-2 max-w-xl opacity-90">Join 2M+ verified singles. It's free to create your profile and start exploring matches.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Link to="/auth/register">
                Create my profile <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
              <Link to="/auth/sign-in">I already have an account</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

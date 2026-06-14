import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Crown, Sparkles, Star } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Membership Plans — Sangam Matrimony" },
      { name: "description", content: "Choose a plan and unlock unlimited messaging, contact access, and priority matchmaking." },
    ],
  }),
  component: MembershipPage,
});

const plans = [
  {
    name: "Free",
    price: "₹0",
    sub: "Forever",
    desc: "Get started with the basics.",
    features: ["Create profile", "Browse 50 profiles / day", "Receive interests", "Basic filters"],
    cta: "Get Started",
    highlight: false,
    icon: Sparkles,
  },
  {
    name: "Premium",
    price: "₹2,499",
    sub: "for 3 months",
    desc: "Most popular for serious seekers.",
    features: [
      "Unlimited profile views",
      "Send unlimited messages",
      "View contact details",
      "Advanced filters",
      "Priority listing",
      "Verified badge",
    ],
    cta: "Choose Premium",
    highlight: true,
    icon: Crown,
  },
  {
    name: "Elite",
    price: "₹5,999",
    sub: "for 6 months",
    desc: "Personalised matchmaking concierge.",
    features: [
      "Everything in Premium",
      "Dedicated matchmaker",
      "Hand-picked daily matches",
      "Profile spotlight",
      "Background verification",
      "Priority support 24/7",
    ],
    cta: "Go Elite",
    highlight: false,
    icon: Star,
  },
];

function MembershipPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Membership"
        title="Plans crafted for every journey"
        description="Transparent pricing. No hidden fees. Upgrade or cancel anytime."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-3xl border bg-card p-8 shadow-soft transition hover:shadow-elegant ${
                p.highlight ? "border-primary shadow-elegant ring-1 ring-primary/30" : "border-border"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-glow">
                  Most Popular
                </span>
              )}
              <div className="flex items-center gap-3">
                <span className={`grid h-11 w-11 place-items-center rounded-xl ${p.highlight ? "bg-gradient-primary text-primary-foreground" : "bg-primary-soft text-primary"}`}>
                  <p.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-xl font-bold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="font-display text-4xl font-bold tracking-tight">{p.price}</p>
                <p className="text-xs text-muted-foreground">{p.sub}</p>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                size="lg"
                className={`mt-8 ${p.highlight ? "bg-gradient-primary shadow-glow hover:opacity-95" : ""}`}
                variant={p.highlight ? "default" : "outline"}
              >
                <Link to="/auth/register">{p.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
          <p className="font-display text-xl font-bold">100% Secure Payments • Encrypted Profiles • Cancel Anytime</p>
          <p className="mt-2 text-sm text-muted-foreground">Have questions? <Link to="/help" className="font-semibold text-primary hover:underline">Visit our Help Center →</Link></p>
        </div>
      </section>
    </SiteLayout>
  );
}

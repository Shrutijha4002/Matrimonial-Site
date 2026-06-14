import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LifeBuoy, MessageSquare, Search, ShieldCheck } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help Center — Sangam Matrimony" },
      { name: "description", content: "Find answers to frequently asked questions about Sangam Matrimony." },
    ],
  }),
  component: HelpPage,
});

const faqs = [
  { q: "How do I create a profile?", a: "Click Register Free, fill in your basic details, upload a photo, and verify your phone & email. It takes under 3 minutes." },
  { q: "Are profiles verified?", a: "Every profile goes through phone verification. Premium members get ID-verified badges using government documents." },
  { q: "How does matchmaking work?", a: "We use your preferences plus an intelligent compatibility model that considers values, lifestyle, and goals — not just demographics." },
  { q: "Can I hide my profile?", a: "Yes. From your privacy settings you can hide your profile, photos, or contact details at any time." },
  { q: "How do I upgrade to Premium?", a: "Visit the Membership page, choose a plan and pay securely. Your benefits activate instantly." },
  { q: "What is your refund policy?", a: "We offer a 7-day money-back guarantee on all paid plans, no questions asked." },
];

const topics = [
  { icon: ShieldCheck, title: "Safety & Privacy", desc: "Protecting your identity and data." },
  { icon: MessageSquare, title: "Messaging", desc: "Chat, interests, and contact access." },
  { icon: LifeBuoy, title: "Account & Billing", desc: "Plans, payments, and renewals." },
];

function HelpPage() {
  const [q, setQ] = useState("");
  const filtered = faqs.filter((f) => f.q.toLowerCase().includes(q.toLowerCase()));

  return (
    <SiteLayout>
      <PageHeader eyebrow="Help Center" title="How can we help you?" description="Search our help center or browse the most common questions." />

      <section className="mx-auto max-w-4xl px-4 -mt-8 sm:px-6 lg:px-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles, e.g. 'verify profile'"
            className="h-14 rounded-2xl border-border bg-card pl-12 text-base shadow-elegant"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {topics.map((t) => (
            <div key={t.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-elegant">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                <t.icon className="h-5 w-5" />
              </span>
              <p className="mt-4 font-display text-lg font-bold">{t.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <h2 className="font-display text-2xl font-bold">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="mt-4">
              {filtered.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {filtered.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">No results. Try a different query.</p>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl bg-gradient-primary p-6 text-primary-foreground shadow-elegant">
              <p className="font-display text-lg font-bold">Still need help?</p>
              <p className="mt-1 text-sm opacity-90">Our support team replies within a few hours.</p>
              <Button asChild className="mt-4 w-full bg-white text-primary hover:bg-white/90">
                <Link to="/help">Contact Support</Link>
              </Button>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <p className="font-display text-base font-bold">Safety tips</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>• Never share financial info.</li>
                <li>• Meet in public, daylight spaces.</li>
                <li>• Report suspicious profiles.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Bell, Eye, Lock, AlertTriangle, UserX } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Safety Tips — Sangam Matrimony" },
      { name: "description", content: "Stay safe while finding your life partner on Sangam Matrimony." },
    ],
  }),
  component: Safety,
});

const tips = [
  { icon: ShieldCheck, title: "Keep personal info private", body: "Don't share your financial details, home address, or office address until you trust the person. Use Sangam's built-in chat to communicate." },
  { icon: Bell, title: "Meet in public places", body: "Always choose a busy public space for your first few meetings. Inform a family member or friend about your plans." },
  { icon: Eye, title: "Trust your instincts", body: "If something feels off, it probably is. You can block or report any profile at any time." },
  { icon: Lock, title: "Never send money", body: "Ignore requests for money, gift cards, or emergency funds. Report such profiles to us immediately." },
  { icon: AlertTriangle, title: "Watch for red flags", body: "Quick declarations of love, requests to move off the platform, inconsistent stories, or pressure to share intimate photos." },
  { icon: UserX, title: "Verify before you trust", body: "Look for verified badges. Premium members have ID-verified profiles. You can also request a video call before meeting." },
];

function Safety() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Safety" title="Safety Tips" description="Your safety is our top priority. Follow these guidelines for a secure matchmaking experience." />
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {tips.map((t) => (
            <div key={t.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <t.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{t.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Heart, MessageCircle, Eye, Star, ShieldCheck, BellOff } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Sangam Matrimony" }] }),
  component: Notifications,
});

type N = { id: number; type: "interest" | "view" | "message" | "shortlist" | "system"; title: string; body: string; when: string; unread?: boolean };

const items: N[] = [
  { id: 1, type: "interest", title: "Rohan Mehta sent you an interest", body: "View their profile and respond.", when: "2 min ago", unread: true },
  { id: 2, type: "message", title: "Aanya Sharma replied", body: "“Hi! Thanks for the kind words…”", when: "12 min ago", unread: true },
  { id: 3, type: "shortlist", title: "Ishita Kapoor shortlisted you", body: "You appear in her favourites.", when: "1 hr ago", unread: true },
  { id: 4, type: "view", title: "Your profile got 18 new views today", body: "Mostly from Mumbai and Pune.", when: "3 hrs ago" },
  { id: 5, type: "system", title: "Profile verified successfully", body: "Your ID has been verified. The badge is now live.", when: "Yesterday" },
  { id: 6, type: "interest", title: "Priya Iyer accepted your interest", body: "Start a conversation now.", when: "Yesterday" },
];

const iconMap = {
  interest: Heart,
  message: MessageCircle,
  view: Eye,
  shortlist: Star,
  system: ShieldCheck,
};

function Notifications() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Updates" title="Notifications" description="All your matchmaking activity in one place." />
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{items.filter((i) => i.unread).length} unread</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Mark all read</Button>
            <Button variant="ghost" size="sm"><BellOff className="mr-1.5 h-4 w-4" /> Pause</Button>
          </div>
        </div>
        <ul className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          {items.map((n) => {
            const Icon = iconMap[n.type];
            return (
              <li key={n.id} className={`flex items-start gap-4 border-b border-border p-4 last:border-b-0 ${n.unread ? "bg-primary-soft/20" : ""}`}>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold">{n.title}</p>
                    {n.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{n.body}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{n.when}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </SiteLayout>
  );
}

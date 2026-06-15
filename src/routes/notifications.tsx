import { createFileRoute } from "@tanstack/react-router";
import { Heart, MessageCircle, Eye, Star, ShieldCheck, BellOff } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Sangam Matrimony" }] }),
  component: Notifications,
});

const iconMap: Record<string, typeof Heart> = {
  interest: Heart,
  message: MessageCircle,
  view: Eye,
  shortlist: Star,
  system: ShieldCheck,
};

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return `${Math.floor(hrs / 24)} days ago`;
}

function Notifications() {
  const { state: { notifications }, markAllRead } = useStore();

  return (
    <SiteLayout>
      <PageHeader eyebrow="Updates" title="Notifications" description="All your matchmaking activity in one place." />
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{notifications.filter((i) => i.unread).length} unread</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={markAllRead}>Mark all read</Button>
            <Button variant="ghost" size="sm"><BellOff className="mr-1.5 h-4 w-4" /> Pause</Button>
          </div>
        </div>
        <ul className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          {notifications.length === 0 ? (
            <li className="p-12 text-center text-sm text-muted-foreground">No notifications yet.</li>
          ) : notifications.map((n) => {
            const Icon = iconMap[n.type] ?? ShieldCheck;
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
                  <p className="mt-1 text-xs text-muted-foreground">{timeAgo(n.timestamp)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </SiteLayout>
  );
}

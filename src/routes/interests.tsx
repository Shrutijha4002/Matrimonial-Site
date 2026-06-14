import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X, Heart, Send } from "lucide-react";
import { useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profiles } from "@/lib/profiles";
import { toast } from "sonner";

export const Route = createFileRoute("/interests")({
  head: () => ({ meta: [{ title: "Interests — Sangam Matrimony" }] }),
  component: Interests,
});

type Status = "pending" | "accepted" | "declined";
type Row = { id: string; status: Status; when: string };

function Interests() {
  const [received, setReceived] = useState<Row[]>(
    profiles.slice(0, 5).map((p, i) => ({ id: p.id, status: i === 1 ? "accepted" : "pending", when: ["2 min ago", "1 hr ago", "Yesterday", "2 days ago", "Last week"][i] }))
  );
  const sent: Row[] = profiles.slice(5, 10).map((p, i) => ({
    id: p.id, status: (["pending", "accepted", "pending", "declined", "accepted"] as Status[])[i], when: ["Today", "Yesterday", "2 days ago", "3 days ago", "Last week"][i],
  }));

  const respond = (id: string, status: Status) => {
    setReceived((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    toast.success(status === "accepted" ? "Interest accepted" : "Interest declined");
  };

  return (
    <SiteLayout>
      <PageHeader eyebrow="Connections" title="Interests" description="Manage interests sent to and received from members." />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Tabs defaultValue="received">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="received">Received ({received.length})</TabsTrigger>
            <TabsTrigger value="sent">Sent ({sent.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="received" className="mt-6 space-y-3">
            {received.map((r) => {
              const p = profiles.find((x) => x.id === r.id)!;
              return (
                <article key={r.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-20 w-20 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-display text-lg font-bold">{p.name}, {p.age}</p>
                      <StatusBadge status={r.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">{p.profession} • {p.city}</p>
                    <p className="text-xs text-muted-foreground">Sent {r.when}</p>
                  </div>
                  {r.status === "pending" ? (
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-gradient-primary shadow-glow" onClick={() => respond(r.id, "accepted")}>
                        <Check className="mr-1.5 h-4 w-4" /> Accept
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => respond(r.id, "declined")}>
                        <X className="mr-1.5 h-4 w-4" /> Decline
                      </Button>
                    </div>
                  ) : (
                    <Button asChild size="sm" variant="outline">
                      <Link to="/profile/$id" params={{ id: r.id }}>View profile</Link>
                    </Button>
                  )}
                </article>
              );
            })}
          </TabsContent>

          <TabsContent value="sent" className="mt-6 space-y-3">
            {sent.map((r) => {
              const p = profiles.find((x) => x.id === r.id)!;
              return (
                <article key={r.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-20 w-20 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-display text-lg font-bold">{p.name}, {p.age}</p>
                      <StatusBadge status={r.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">{p.profession} • {p.city}</p>
                    <p className="text-xs text-muted-foreground">Sent {r.when}</p>
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/profile/$id" params={{ id: r.id }}>View profile</Link>
                  </Button>
                </article>
              );
            })}
          </TabsContent>
        </Tabs>

        <div className="mt-10 flex items-center justify-between rounded-2xl bg-gradient-warm/40 p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
              <Heart className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-lg font-bold">Send more interests</p>
              <p className="text-sm text-muted-foreground">The more you engage, the better matches we find.</p>
            </div>
          </div>
          <Button asChild className="bg-gradient-primary shadow-glow">
            <Link to="/browse"><Send className="mr-1.5 h-4 w-4" /> Discover matches</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const cls =
    status === "accepted"
      ? "bg-primary-soft text-primary"
      : status === "declined"
      ? "bg-muted text-muted-foreground"
      : "bg-amber-100 text-amber-700";
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${cls}`}>{status}</span>;
}

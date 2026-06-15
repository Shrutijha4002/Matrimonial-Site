import { createFileRoute, Link } from "@tanstack/react-router";
import { Newspaper, ExternalLink, Calendar, ArrowRight } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press — Sangam Matrimony" },
      { name: "description", content: "Press kit, media coverage, and brand resources for Sangam Matrimony." },
    ],
  }),
  component: Press,
});

const articles = [
  { date: "12 May 2026", outlet: "TechCrunch", title: "Sangam Raises $12M to Modernise Matrimony in India", url: "#" },
  { date: "28 Apr 2026", outlet: "YourStory", title: "How Sangam Is Using AI to Find Compatible Life Partners", url: "#" },
  { date: "10 Mar 2026", outlet: "Economic Times", title: "Matrimony Startups See Surge in Tier-2 City Users", url: "#" },
  { date: "5 Feb 2026", outlet: "Inc42", title: "Sangam Crosses 1 Million Verified Profiles", url: "#" },
];

const kit = [
  { label: "Brand Guidelines", desc: "Logos, colours, typography and usage rules." },
  { label: "Product Screenshots", desc: "High-resolution images of the Sangam platform." },
  { label: "Team Photos", desc: "Leadership headshots and office imagery." },
  { label: "Media Kit ZIP", desc: "One-click download of all press assets." },
];

function Press() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Media" title="Press & News" description="Latest coverage and resources for journalists." />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold">Latest coverage</h2>
        <div className="mt-6 space-y-3">
          {articles.map((a) => (
            <article key={a.title} className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="mt-1 hidden text-xs font-semibold text-muted-foreground sm:block"><Calendar className="mr-1 inline h-3 w-3" />{a.date}</span>
                <div>
                  <p className="text-xs font-semibold text-primary">{a.outlet}</p>
                  <p className="font-display font-bold">{a.title}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild><a href={a.url} target="_blank" rel="noopener"><ExternalLink className="mr-1.5 h-3 w-3" /> Read</a></Button>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold">Press kit</h2>
        <p className="mt-1 text-sm text-muted-foreground">Resources for journalists and content creators.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {kit.map((k) => (
            <div key={k.label} className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div>
                <p className="font-display font-bold">{k.label}</p>
                <p className="text-sm text-muted-foreground">{k.desc}</p>
              </div>
              <Button variant="ghost" size="icon" asChild><a href="#"><ArrowRight className="h-4 w-4" /></a></Button>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

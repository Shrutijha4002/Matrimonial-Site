import { createFileRoute, Link } from "@tanstack/react-router";
import { Quote, Heart } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";

export const Route = createFileRoute("/success-stories")({
  head: () => ({
    meta: [
      { title: "Success Stories — Sangam Matrimony" },
      { name: "description", content: "Real love stories of couples who found their forever on Sangam." },
    ],
  }),
  component: StoriesPage,
});

const stories = [
  {
    img: story1,
    couple: "Aisha & Rohan",
    location: "Mumbai, India",
    quote:
      "We matched on a quiet Tuesday morning, and by the next spring we were planning our wedding. Sangam made the search feel intentional and safe.",
    married: "Married June 2024",
  },
  {
    img: story2,
    couple: "Meera & Arjun",
    location: "Bengaluru, India",
    quote:
      "What I loved was the verified profiles and thoughtful matchmaking. Arjun's profile felt like a story I wanted to read more of.",
    married: "Married November 2023",
  },
  {
    img: story3,
    couple: "Priya & Karan",
    location: "Delhi, India",
    quote:
      "Six months from match to marriage. Our families met over chai and now we are building a beautiful home together.",
    married: "Married March 2024",
  },
];

const stats = [
  { n: "12,500+", l: "Successful marriages" },
  { n: "98%", l: "Match satisfaction" },
  { n: "2M+", l: "Verified profiles" },
  { n: "40+", l: "Cities covered" },
];

function StoriesPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Real Stories"
        title="Love stories that began here"
        description="Thousands of couples have found their forever on Sangam. Here are a few of our favourites."
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
              <p className="font-display text-3xl font-bold text-gradient-primary">{s.n}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-12 px-4 pb-16 sm:px-6 lg:px-8">
        {stories.map((s, i) => (
          <article
            key={s.couple}
            className={`grid items-center gap-8 lg:grid-cols-2 ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}
          >
            <div className="relative">
              <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-warm opacity-30 blur-2xl" />
              <img src={s.img} alt={s.couple} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-elegant" />
            </div>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <Quote className="h-8 w-8 text-primary" />
              <p className="mt-3 text-lg leading-relaxed text-foreground">"{s.quote}"</p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="font-display text-xl font-bold">{s.couple}</p>
                <p className="text-sm text-muted-foreground">{s.location} • {s.married}</p>
              </div>
            </div>
          </article>
        ))}

        <div className="rounded-3xl bg-gradient-primary p-10 text-center text-primary-foreground shadow-elegant">
          <Heart className="mx-auto h-10 w-10 fill-current" />
          <h2 className="mt-3 font-display text-3xl font-bold">Your story could be next.</h2>
          <p className="mt-2 opacity-90">Join 2M+ singles seeking meaningful, lifelong partnerships.</p>
          <Button asChild size="lg" variant="secondary" className="mt-6 bg-white text-primary hover:bg-white/90">
            <Link to="/auth/register">Start free today</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}

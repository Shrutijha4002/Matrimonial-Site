import { ArrowUpRight } from "lucide-react";

const communities = [
  { name: "Hindu", count: "850K+", hue: "from-primary to-accent" },
  { name: "Muslim", count: "420K+", hue: "from-secondary to-primary" },
  { name: "Christian", count: "210K+", hue: "from-accent to-secondary" },
  { name: "Sikh", count: "180K+", hue: "from-primary to-secondary" },
  { name: "Jain", count: "95K+", hue: "from-secondary to-accent" },
  { name: "Buddhist", count: "60K+", hue: "from-accent to-primary" },
  { name: "Parsi", count: "12K+", hue: "from-primary to-accent" },
  { name: "Inter-faith", count: "75K+", hue: "from-secondary to-primary" },
];

export function Communities() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Communities</p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Browse by community.</h2>
        </div>
        <a href="/" className="hidden text-sm font-medium text-primary hover:underline sm:inline-flex">
          View all communities →
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {communities.map((c) => (
          <a
            key={c.name}
            href="/"
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-elegant"
          >
            <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${c.hue} opacity-20 blur-2xl transition group-hover:opacity-40`} />
            <ArrowUpRight className="mb-8 h-5 w-5 text-muted-foreground transition group-hover:text-primary" />
            <p className="font-display text-xl font-bold">{c.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{c.count} profiles</p>
          </a>
        ))}
      </div>
    </section>
  );
}

import { Star } from "lucide-react";

const reviews = [
  { name: "Sneha R.", role: "Bangalore", rating: 5, text: "The cleanest matrimonial site I've used. Profiles felt real and the chat was respectful." },
  { name: "Arjun M.", role: "Pune", rating: 5, text: "I love the privacy controls. I could share photos only with people I trusted." },
  { name: "Fatima K.", role: "Hyderabad", rating: 5, text: "Found my partner in two months. The recommendations were spot on." },
  { name: "Vikram S.", role: "Delhi", rating: 5, text: "Premium membership was worth every rupee. Verified badges build real trust." },
];

export function Testimonials() {
  return (
    <section className="bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Loved by members</p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">What our community says.</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-foreground">
                "{r.text}"
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 border-t border-border pt-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary font-display text-sm font-bold text-primary-foreground">
                  {r.name[0]}
                </span>
                <div>
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

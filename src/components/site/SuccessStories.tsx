import { Quote } from "lucide-react";
import s1 from "@/assets/story-1.jpg";
import s2 from "@/assets/story-2.jpg";
import s3 from "@/assets/story-3.jpg";

const stories = [
  { img: s1, names: "Aarav & Priya", quote: "We matched in a week — engaged in three months. The verified profiles made it feel safe.", city: "Mumbai" },
  { img: s2, names: "Rohan & Meera", quote: "The intelligent matchmaking actually understood what we wanted. Forever grateful.", city: "Bangalore" },
  { img: s3, names: "Karan & Anika", quote: "Beautiful interface, real people, real connections. Highly recommend.", city: "Delhi" },
];

const stats = [
  { value: "2M+", label: "Verified profiles" },
  { value: "150K+", label: "Success stories" },
  { value: "98%", label: "Satisfaction" },
  { value: "30+", label: "Cities" },
];

export function SuccessStories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 max-w-2xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Real Stories</p>
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Couples who found each other here.
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {stories.map((s) => (
          <article
            key={s.names}
            className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={s.img}
                alt={s.names}
                width={800}
                height={600}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
                <p className="font-display text-xl font-bold">{s.names}</p>
                <p className="text-sm opacity-90">{s.city}</p>
              </div>
            </div>
            <div className="p-6">
              <Quote className="mb-3 h-6 w-6 text-primary/40" />
              <p className="text-sm leading-relaxed text-muted-foreground">{s.quote}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-2 gap-6 rounded-3xl border border-border bg-gradient-primary p-8 text-primary-foreground sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-3xl font-bold sm:text-4xl">{s.value}</p>
            <p className="mt-1 text-xs opacity-90 sm:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

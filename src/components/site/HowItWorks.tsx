import { UserPlus, IdCard, Sparkles, MessageCircleHeart } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Register", desc: "Create your free account in under a minute." },
  { icon: IdCard, title: "Create Profile", desc: "Add photos, family & preferences. Get verified." },
  { icon: Sparkles, title: "Find Matches", desc: "Our matchmaking surfaces compatible profiles daily." },
  { icon: MessageCircleHeart, title: "Connect & Chat", desc: "Express interest, chat privately, take it forward." },
];

export function HowItWorks() {
  return (
    <section className="bg-primary-soft/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">How it works</p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Four steps to your forever.</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:shadow-elegant"
            >
              <span className="absolute right-5 top-5 font-display text-5xl font-bold text-primary/10">
                0{i + 1}
              </span>
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-1.5 font-display text-lg font-bold">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

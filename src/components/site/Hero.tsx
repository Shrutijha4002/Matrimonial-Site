import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Sparkles, Heart } from "lucide-react";
import heroImage from "@/assets/hero-couple.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-soft backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Trusted by 2M+ verified profiles
          </div>

          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Where{" "}
            <span className="text-gradient-primary">meaningful matches</span>{" "}
            begin their forever.
          </h1>

          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            A premium matrimonial experience designed for the modern seeker —
            verified profiles, intelligent matchmaking, and private conversations
            that lead to lifelong companionship.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 bg-gradient-primary px-6 text-base shadow-glow hover:opacity-95">
              <Link to="/auth/register">
                Register Free
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
              <Link to="/browse">
                <Heart className="mr-1 h-4 w-4" />
                Search Your Match
              </Link>
            </Button>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-secondary" />
              ID-verified profiles
            </div>
            <div className="flex items-center gap-2">
              <span className="flex -space-x-2">
                <span className="h-6 w-6 rounded-full bg-primary/80 ring-2 ring-background" />
                <span className="h-6 w-6 rounded-full bg-secondary/80 ring-2 ring-background" />
                <span className="h-6 w-6 rounded-full bg-accent ring-2 ring-background" />
              </span>
              50,000+ matches this month
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-warm opacity-30 blur-2xl" />
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
            <img
              src={heroImage}
              alt="Happy couple celebrating their match"
              width={1280}
              height={1280}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-border bg-card/95 p-4 shadow-elegant backdrop-blur sm:block">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <Heart className="h-5 w-5 fill-current" />
              </div>
              <div>
                <p className="font-display text-lg font-bold leading-none">98%</p>
                <p className="text-xs text-muted-foreground">Match satisfaction</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-2 top-6 hidden rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-elegant backdrop-blur sm:block">
            <p className="text-xs text-muted-foreground">New today</p>
            <p className="font-display text-lg font-bold">+1,284 profiles</p>
          </div>
        </div>
      </div>
    </section>
  );
}

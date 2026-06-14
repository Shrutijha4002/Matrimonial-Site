import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

export function CallToAction() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-primary p-10 text-primary-foreground shadow-elegant sm:p-16">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-secondary/40 blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <Heart className="mb-4 h-8 w-8 fill-current opacity-90" />
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              Your story is one profile away.
            </h2>
            <p className="mt-3 max-w-xl text-base opacity-90">
              Join thousands of verified members finding meaningful connections every day. It's free to start.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild size="lg" variant="secondary" className="h-12 px-6 bg-background text-foreground hover:bg-background/90">
              <Link to="/auth/register">
                Create free profile
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/membership">View membership</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

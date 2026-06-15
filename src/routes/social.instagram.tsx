import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/social/instagram")({
  head: () => ({ meta: [{ title: "Instagram — Sangam Matrimony" }] }),
  component: () => <SocialPage icon={Instagram} name="Instagram" handle="@sangam_matrimony" />,
});

function SocialPage({ icon: Icon, name, handle }: { icon: typeof Instagram; name: string; handle: string }) {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Social" title={name} description={`Follow us on ${name} for matchmaking tips, success stories, and community updates.`} />
      <section className="mx-auto max-w-2xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
            <Icon className="h-7 w-7" />
          </span>
          <p className="mt-4 font-display text-2xl font-bold">{name}</p>
          <p className="text-muted-foreground">{handle}</p>
          <p className="mx-auto mt-4 max-w-sm text-sm text-muted-foreground">
            Stay connected with the Sangam community. We share daily relationship advice, member success stories, and platform updates.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button className="bg-gradient-primary shadow-glow" asChild><a href="#" target="_blank" rel="noopener">Follow on {name}</a></Button>
            <Button variant="outline" asChild><Link to="/browse">Browse profiles</Link></Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Heart, MessageCircle, Trash2 } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { ProfileImage } from "@/components/site/ProfileImage";
import { profiles } from "@/lib/profiles";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/shortlist")({
  head: () => ({ meta: [{ title: "Shortlist — Sangam Matrimony" }] }),
  component: Shortlist,
});

function Shortlist() {
  const { state: { shortlistedIds }, toggleShortlist, sendInterest } = useStore();
  const shortlisted = profiles.filter(p => shortlistedIds.includes(p.id));

  const handleSendInterest = (profileId: string) => {
    sendInterest(profileId);
    toast.success("Interest sent!");
  };

  return (
    <SiteLayout>
      <PageHeader eyebrow="Your favourites" title="Shortlisted profiles" description="Profiles you've saved. Only you can see this list." />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {shortlisted.length === 0 ? (
          <div className="grid place-items-center rounded-3xl border border-dashed border-border bg-card p-16 text-center">
            <Star className="h-10 w-10 text-muted-foreground" />
            <p className="mt-4 font-display text-xl font-bold">No shortlists yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Tap the heart on any profile to save it here.</p>
            <Button asChild className="mt-6 bg-gradient-primary shadow-glow"><Link to="/browse">Browse profiles</Link></Button>
          </div>
        ) : (
          <div className="space-y-4">
            {shortlisted.map((p) => (
              <article key={p.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center">
                <ProfileImage src={p.image} name={p.name} className="h-28 w-full rounded-xl object-cover sm:h-24 sm:w-24" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-bold">{p.name}, {p.age}</h3>
                    {p.verified && <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-semibold text-primary">Verified</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{p.profession} • {p.city}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{p.height} • {p.religion} • {p.community} • {p.education}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleSendInterest(p.id)}><Heart className="mr-1.5 h-4 w-4" /> Send interest</Button>
                  <Button size="sm" variant="outline" asChild><Link to={`/chat?userId=${p.id}`}><MessageCircle className="mr-1.5 h-4 w-4" /> Message</Link></Button>
                  <Button asChild size="sm" className="bg-gradient-primary"><Link to="/profile/$id" params={{ id: p.id }}>View profile</Link></Button>
                  <Button size="sm" variant="ghost" onClick={() => { toggleShortlist(p.id); toast.success("Removed from shortlist"); }}><Trash2 className="h-4 w-4 text-muted-foreground" /></Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}

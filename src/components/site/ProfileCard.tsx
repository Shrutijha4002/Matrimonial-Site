import { Link } from "@tanstack/react-router";
import { BadgeCheck, Briefcase, Crown, GraduationCap, Heart, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileImage } from "@/components/site/ProfileImage";
import type { Profile } from "@/lib/profiles";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export function ProfileCard({ p }: { p: Profile }) {
  const { toggleShortlist, isShortlisted, sendInterest } = useStore();
  const shortlisted = isShortlisted(p.id);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-elegant">
      <div className="relative aspect-[4/5] overflow-hidden">
        <ProfileImage
          src={p.image}
          name={p.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          {p.premium && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground shadow-soft">
              <Crown className="h-3 w-3" /> Premium
            </span>
          )}
          {p.verified && (
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-card/95 px-2 py-1 text-[10px] font-semibold text-secondary shadow-soft backdrop-blur">
              <BadgeCheck className="h-3 w-3" /> Verified
            </span>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 text-white">
          <p className="font-display text-lg font-bold leading-tight">
            {p.name}, {p.age}
          </p>
          <p className="text-xs opacity-90">{p.id} • {p.height}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" /> {p.city}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <GraduationCap className="h-3.5 w-3.5 text-primary" /> {p.education}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Briefcase className="h-3.5 w-3.5 text-primary" /> {p.profession}
        </div>

        <div className="mt-3 flex gap-2">
          <Button asChild size="sm" className="flex-1 bg-gradient-primary hover:opacity-95">
            <Link to="/profile/$id" params={{ id: p.id }}>View Profile</Link>
          </Button>
          <Button size="sm" onClick={() => { toggleShortlist(p.id); toast.success(shortlisted ? "Removed" : "Shortlisted!"); }} variant={shortlisted ? "default" : "outline"} aria-label="Shortlist">
            <Heart className={`h-4 w-4 ${shortlisted ? "fill-current" : ""}`} />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1" asChild>
            <Link to={`/chat?userId=${p.id}`}><MessageCircle className="mr-1 h-3.5 w-3.5" /> Message</Link>
          </Button>
          <Button size="sm" variant="ghost" className="flex-1 text-xs text-muted-foreground" onClick={() => { sendInterest(p.id); toast.success("Interest sent!"); }}>
            Send interest
          </Button>
        </div>
      </div>
    </article>
  );
}

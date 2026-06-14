import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BadgeCheck, Briefcase, ChevronLeft, Crown, GraduationCap, Heart, Languages, MapPin, MessageCircle, Phone, Ruler, Share2, Wallet } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProfileCard } from "@/components/site/ProfileCard";
import { Button } from "@/components/ui/button";
import { getProfile, profiles } from "@/lib/profiles";

export const Route = createFileRoute("/profile/$id")({
  loader: ({ params }) => {
    const profile = getProfile(params.id);
    if (!profile) throw notFound();
    return { profile };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.profile.name ?? "Profile"} — Sangam Matrimony` },
      { name: "description", content: loaderData?.profile.about ?? "Profile" },
    ],
  }),
  component: ProfilePage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Profile not found</h1>
        <Button asChild className="mt-6"><Link to="/browse">Back to Browse</Link></Button>
      </div>
    </SiteLayout>
  ),
});

function ProfilePage() {
  const { profile: p } = Route.useLoaderData();
  const similar = profiles.filter((x) => x.id !== p.id).slice(0, 3);

  const facts = [
    { icon: Ruler, label: "Height", value: p.height },
    { icon: MapPin, label: "City", value: p.city },
    { icon: GraduationCap, label: "Education", value: p.education },
    { icon: Briefcase, label: "Profession", value: p.profession },
    { icon: Wallet, label: "Income", value: p.income },
    { icon: Languages, label: "Mother tongue", value: p.community },
  ];

  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link to="/browse" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" /> Back to Browse
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
          <div>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
              <img src={p.image} alt={p.name} className="aspect-[4/5] w-full object-cover" />
              <div className="absolute left-3 top-3 flex flex-col gap-2">
                {p.premium && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold uppercase text-accent-foreground">
                    <Crown className="h-3 w-3" /> Premium
                  </span>
                )}
                {p.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-card/95 px-2.5 py-1 text-[11px] font-semibold text-secondary backdrop-blur">
                    <BadgeCheck className="h-3 w-3" /> ID Verified
                  </span>
                )}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <Button className="bg-gradient-primary hover:opacity-95"><Heart className="mr-1 h-4 w-4" /> Shortlist</Button>
              <Button variant="outline"><MessageCircle className="mr-1 h-4 w-4" /> Chat</Button>
              <Button variant="outline"><Share2 className="mr-1 h-4 w-4" /> Share</Button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Profile {p.id}</p>
              <h1 className="mt-1 font-display text-4xl font-bold tracking-tight">
                {p.name}, <span className="text-muted-foreground">{p.age}</span>
              </h1>
              <p className="mt-2 text-muted-foreground">{p.religion} • {p.community} • {p.city}</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-lg font-bold">About</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.about}</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-lg font-bold">Basic details</h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                {facts.map((f) => (
                  <div key={f.label} className="flex items-start gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary">
                      <f.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <dt className="text-xs text-muted-foreground">{f.label}</dt>
                      <dd className="text-sm font-semibold">{f.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl bg-gradient-primary p-6 text-primary-foreground shadow-elegant">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6" />
                  <div>
                    <p className="font-display text-lg font-bold">Contact details locked</p>
                    <p className="text-sm opacity-90">Upgrade to Premium to view phone & message {p.name.split(" ")[0]}.</p>
                  </div>
                </div>
                <Button asChild variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  <Link to="/membership">Upgrade now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold">Similar profiles</h2>
            <Button variant="ghost" asChild><Link to="/browse">View all</Link></Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((s) => <ProfileCard key={s.id} p={s} />)}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

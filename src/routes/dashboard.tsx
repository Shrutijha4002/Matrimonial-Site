import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Eye, MessageSquare, Star, TrendingUp, CheckCircle2, Sparkles, Bell, UserCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ProfileImage } from "@/components/site/ProfileImage";
import { profiles } from "@/lib/profiles";
import { useStore } from "@/lib/store";
import banner from "@/assets/dashboard-banner.jpg";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Sangam Matrimony" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { state: { user, interests, myProfile, conversations, shortlistedIds } } = useStore();
  const receivedInterests = interests.filter(i => i.toUserId === user?.id);
  const sentInterests = interests.filter(i => i.fromUserId === user?.id);
  const msgCount = Object.values(conversations).flat().length;
  const matches = profiles.slice(0, 6);

  const stats = [
    { label: "Profile views", value: "1,284", icon: Eye, trend: "+18%" },
    { label: "Interests received", value: String(receivedInterests.length), icon: Heart, trend: `+${receivedInterests.filter(i => i.status === "pending").length} new` },
    { label: "Messages", value: String(msgCount), icon: MessageSquare, trend: "0 unread" },
    { label: "Shortlisted", value: String(shortlistedIds.length), icon: Star, trend: "" },
  ];

  const completionItems = [
    { label: "Basic details", done: !!(myProfile?.name) },
    { label: "Photos uploaded", done: (myProfile?.photos?.length ?? 0) > 0 },
    { label: "Family information", done: !!(myProfile?.familyFatherOcc) },
    { label: "Partner preferences", done: !!(myProfile?.partnerReligion) },
    { label: "Horoscope details", done: !!(myProfile?.horoscopeDob) },
    { label: "ID verification", done: !!(myProfile?.idVerified) },
  ];

  const percent = Math.round((completionItems.filter((c) => c.done).length / completionItems.length) * 100);

  const activity = [
    ...receivedInterests.slice(0, 3).map(i => {
      const p = profiles.find(x => x.id === i.fromUserId);
      return { who: p?.name ?? "Someone", action: i.status === "pending" ? "sent you an interest" : `${i.status} your interest`, when: new Date(i.createdAt).toLocaleDateString(), type: "interest" as const };
    }),
    ...sentInterests.slice(0, 2).map(i => {
      const p = profiles.find(x => x.id === i.toUserId);
      return { who: p?.name ?? "Someone", action: i.status === "accepted" ? "accepted your interest" : `you sent interest to`, when: new Date(i.createdAt).toLocaleDateString(), type: "interest" as const };
    }),
  ];
  if (activity.length === 0) {
    activity.push({ who: "Welcome!", action: "start browsing profiles", when: "now", type: "system" as const });
  }

  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border">
        <img src={banner} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Welcome back</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">Hello, {user?.name?.split(" ")[0] ?? "there"} 👋</h1>
          <p className="mt-3 max-w-xl text-base text-muted-foreground">
            You have 3 new matches and 5 unread interests today. Let's make today count.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="bg-gradient-primary shadow-glow hover:opacity-95">
              <Link to="/browse">Discover matches</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/profile/edit">Complete profile</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft/60 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  <TrendingUp className="h-3 w-3" /> {s.trend}
                </span>
              </div>
              <p className="mt-4 font-display text-3xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-lg font-bold">Profile completion</p>
              <p className="text-xs text-muted-foreground">A complete profile gets 5x more matches.</p>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex items-end justify-between">
              <p className="font-display text-3xl font-bold text-gradient-primary">{percent}%</p>
              <p className="text-xs text-muted-foreground">{completionItems.filter(c => c.done).length} of {completionItems.length}</p>
            </div>
            <Progress value={percent} className="mt-2" />
          </div>
          <ul className="mt-5 space-y-2.5 text-sm">
            {completionItems.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <CheckCircle2 className={`h-4 w-4 ${c.done ? "text-primary" : "text-muted-foreground/40"}`} />
                <span className={c.done ? "" : "text-muted-foreground"}>{c.label}</span>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-6 w-full" variant="outline">
            <Link to="/profile/edit">Finish setup</Link>
          </Button>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <Bell className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg font-bold">Recent activity</p>
                <p className="text-xs text-muted-foreground">Latest interactions on your profile.</p>
              </div>
            </div>
            <Link to="/notifications" className="text-xs font-semibold text-primary hover:underline">View all</Link>
          </div>
          <ul className="mt-5 divide-y divide-border">
            {activity.map((a, i) => (
              <li key={i} className="flex items-center justify-between gap-3 py-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary">
                    <UserCircle2 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm"><span className="font-semibold">{a.who}</span> <span className="text-muted-foreground">{a.action}</span></p>
                    <p className="text-xs text-muted-foreground">{a.when}</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">View</Button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold">Match recommendations</h2>
            <p className="text-sm text-muted-foreground">Curated for you based on your preferences.</p>
          </div>
          <Link to="/browse" className="text-sm font-semibold text-primary hover:underline">See all →</Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {matches.map((p) => (
            <Link
              key={p.id}
              to="/profile/$id"
              params={{ id: p.id }}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <ProfileImage src={p.image} name={p.name} className="h-full w-full object-cover transition group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                  {85 + (p.age % 12)}% match
                </span>
              </div>
              <div className="p-4">
                <p className="font-display text-lg font-bold">{p.name}, {p.age}</p>
                <p className="text-xs text-muted-foreground">{p.profession} • {p.city}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

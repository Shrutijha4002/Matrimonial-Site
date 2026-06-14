import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { ProfileCard } from "@/components/site/ProfileCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { profiles } from "@/lib/profiles";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { title: "Browse Profiles — Sangam Matrimony" },
      { name: "description", content: "Browse thousands of verified matrimonial profiles by religion, community, city and profession." },
    ],
  }),
  component: BrowsePage,
});

const ANY = "any";

function BrowsePage() {
  const [q, setQ] = useState("");
  const [religion, setReligion] = useState(ANY);
  const [city, setCity] = useState(ANY);
  const [age, setAge] = useState<number[]>([22, 35]);

  const religions = useMemo(() => Array.from(new Set(profiles.map(p => p.religion))), []);
  const cities = useMemo(() => Array.from(new Set(profiles.map(p => p.city))), []);

  const filtered = profiles.filter((p) => {
    if (q && !`${p.name} ${p.profession} ${p.city}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (religion !== ANY && p.religion !== religion) return false;
    if (city !== ANY && p.city !== city) return false;
    if (p.age < age[0] || p.age > age[1]) return false;
    return true;
  });

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Discover"
        title="Browse verified matches"
        description="Filter by community, location, age, and profession to find a partner that fits your story."
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Filters */}
          <aside className="space-y-6 rounded-2xl border border-border bg-card p-5 shadow-soft lg:sticky lg:top-20 lg:self-start">
            <div className="flex items-center gap-2 font-display text-base font-bold">
              <SlidersHorizontal className="h-4 w-4 text-primary" /> Filters
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Search</label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Name, city, profession"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Religion</label>
              <Select value={religion} onValueChange={setReligion}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY}>Any</SelectItem>
                  {religions.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">City</label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY}>Any</SelectItem>
                  {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-muted-foreground">Age</label>
                <span className="text-xs font-semibold text-foreground">{age[0]} – {age[1]} yrs</span>
              </div>
              <Slider value={age} min={21} max={45} step={1} onValueChange={setAge} />
            </div>

            <Button variant="outline" className="w-full" onClick={() => { setQ(""); setReligion(ANY); setCity(ANY); setAge([22,35]); }}>
              Reset filters
            </Button>
          </aside>

          {/* Results */}
          <div>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filtered.length}</span> matches found
              </p>
              <Button variant="ghost" size="sm" className="gap-2">
                <Filter className="h-4 w-4" /> Sort: Relevance
              </Button>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
                <p className="font-display text-lg font-semibold">No matches yet</p>
                <p className="mt-1 text-sm text-muted-foreground">Try widening your filters.</p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => <ProfileCard key={p.id} p={p} />)}
              </div>
            )}

            <div className="mt-10 rounded-2xl bg-gradient-primary p-6 text-primary-foreground shadow-elegant sm:p-8">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="font-display text-xl font-bold">Unlock Premium matches</p>
                  <p className="text-sm opacity-90">Get unlimited messaging, contact details, and priority listing.</p>
                </div>
                <Button asChild variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  <Link to="/membership">View Plans</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

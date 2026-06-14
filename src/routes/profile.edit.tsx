import { createFileRoute } from "@tanstack/react-router";
import { Camera, Upload, X, User, Users, Heart, Briefcase, Sparkles, Check } from "lucide-react";
import { useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/profile/edit")({
  head: () => ({ meta: [{ title: "Edit Profile — Sangam Matrimony" }] }),
  component: EditProfile,
});

const steps = [
  { key: "basic", label: "Basic", icon: User },
  { key: "family", label: "Family", icon: Users },
  { key: "career", label: "Career", icon: Briefcase },
  { key: "photos", label: "Photos", icon: Camera },
  { key: "preferences", label: "Preferences", icon: Heart },
];

function EditProfile() {
  const [active, setActive] = useState("basic");
  const [photos, setPhotos] = useState<string[]>([
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
  ]);

  const removePhoto = (i: number) => setPhotos(photos.filter((_, idx) => idx !== i));
  const addPhoto = () => {
    const pool = [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    ];
    setPhotos([...photos, pool[photos.length % pool.length]]);
  };

  return (
    <SiteLayout>
      <PageHeader eyebrow="Profile" title="Edit your profile" description="Keep your information fresh — accurate profiles attract better matches." />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-2xl border border-border bg-card p-4 shadow-soft lg:sticky lg:top-20 lg:h-fit">
            <p className="px-2 pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sections</p>
            <ul className="space-y-1">
              {steps.map((s) => (
                <li key={s.key}>
                  <button
                    onClick={() => setActive(s.key)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      active === s.key
                        ? "bg-gradient-primary text-primary-foreground shadow-glow"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <s.icon className="h-4 w-4" /> {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            {active === "basic" && <BasicForm />}
            {active === "family" && <FamilyForm />}
            {active === "career" && <CareerForm />}
            {active === "photos" && (
              <PhotosForm photos={photos} onRemove={removePhoto} onAdd={addPhoto} />
            )}
            {active === "preferences" && <PreferencesForm />}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
              <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" /> Changes auto-save as you go.
              </p>
              <Button className="bg-gradient-primary shadow-glow hover:opacity-95" onClick={() => toast.success("Profile saved!")}>
                <Check className="mr-2 h-4 w-4" /> Save changes
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function BasicForm() {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold">Basic details</h2>
      <p className="text-sm text-muted-foreground">Tell us about yourself.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Full name"><Input defaultValue="Aanya Sharma" /></Field>
        <Field label="Date of birth"><Input type="date" defaultValue="1998-04-12" /></Field>
        <Field label="Gender">
          <Select defaultValue="female"><SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="female">Female</SelectItem><SelectItem value="male">Male</SelectItem></SelectContent>
          </Select>
        </Field>
        <Field label="Height"><Input defaultValue="5'5&quot;" /></Field>
        <Field label="Marital status">
          <Select defaultValue="never">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="never">Never married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="City"><Input defaultValue="Mumbai" /></Field>
        <Field label="Religion"><Input defaultValue="Hindu" /></Field>
        <Field label="Mother tongue"><Input defaultValue="Hindi" /></Field>
      </div>
      <div className="mt-4">
        <Field label="About you">
          <Textarea rows={4} defaultValue="Warm, family-oriented, and passionate about life. Loves travel, books, and meaningful conversations over coffee." />
        </Field>
      </div>
    </div>
  );
}

function FamilyForm() {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold">Family details</h2>
      <p className="text-sm text-muted-foreground">Help others understand your family background.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Father's occupation"><Input defaultValue="Business" /></Field>
        <Field label="Mother's occupation"><Input defaultValue="Homemaker" /></Field>
        <Field label="Brothers"><Input type="number" defaultValue={1} /></Field>
        <Field label="Sisters"><Input type="number" defaultValue={0} /></Field>
        <Field label="Family type">
          <Select defaultValue="nuclear"><SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="nuclear">Nuclear</SelectItem><SelectItem value="joint">Joint</SelectItem></SelectContent>
          </Select>
        </Field>
        <Field label="Family values">
          <Select defaultValue="moderate"><SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="traditional">Traditional</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="liberal">Liberal</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
    </div>
  );
}

function CareerForm() {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold">Education & career</h2>
      <p className="text-sm text-muted-foreground">Your professional journey.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Highest qualification"><Input defaultValue="MBA" /></Field>
        <Field label="Field of study"><Input defaultValue="Marketing" /></Field>
        <Field label="Profession"><Input defaultValue="Marketing Lead" /></Field>
        <Field label="Company"><Input defaultValue="Acme Pvt. Ltd." /></Field>
        <Field label="Annual income"><Input defaultValue="18 LPA" /></Field>
        <Field label="Work location"><Input defaultValue="Mumbai" /></Field>
      </div>
    </div>
  );
}

function PhotosForm({ photos, onRemove, onAdd }: { photos: string[]; onRemove: (i: number) => void; onAdd: () => void }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold">Photos</h2>
      <p className="text-sm text-muted-foreground">Upload up to 8 clear, well-lit photos. The first photo will be your primary.</p>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {photos.map((p, i) => (
          <div key={i} className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted">
            <img src={p} alt="" className="h-full w-full object-cover" />
            {i === 0 && (
              <span className="absolute left-2 top-2 rounded-full bg-gradient-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                Primary
              </span>
            )}
            <button
              onClick={() => onRemove(i)}
              className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
              aria-label="Remove"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        {photos.length < 8 && (
          <button
            onClick={onAdd}
            className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/40 text-muted-foreground transition hover:border-primary hover:bg-primary-soft/40 hover:text-primary"
          >
            <Upload className="h-6 w-6" />
            <span className="text-xs font-semibold">Add photo</span>
          </button>
        )}
      </div>
    </div>
  );
}

function PreferencesForm() {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold">Partner preferences</h2>
      <p className="text-sm text-muted-foreground">What you're looking for in a life partner.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Age range"><Input defaultValue="26 – 32" /></Field>
        <Field label="Height range"><Input defaultValue="5'8&quot; – 6'1&quot;" /></Field>
        <Field label="Religion"><Input defaultValue="Hindu" /></Field>
        <Field label="Community"><Input defaultValue="Any" /></Field>
        <Field label="Preferred location"><Input defaultValue="Mumbai, Pune" /></Field>
        <Field label="Education"><Input defaultValue="Bachelors or higher" /></Field>
        <Field label="Profession"><Input defaultValue="Any" /></Field>
        <Field label="Annual income"><Input defaultValue="15 LPA+" /></Field>
      </div>
      <div className="mt-4">
        <Field label="A note about my ideal partner">
          <Textarea rows={4} defaultValue="Kind, ambitious, family-oriented, and someone who values honest conversations." />
        </Field>
      </div>
    </div>
  );
}

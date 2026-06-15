import { createFileRoute } from "@tanstack/react-router";
import { Camera, Upload, X, User, Users, Heart, Briefcase, Sparkles, Check, Star, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useStore } from "@/lib/store";

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
  { key: "horoscope", label: "Horoscope", icon: Star },
  { key: "verification", label: "Verification", icon: ShieldCheck },
];

const pool = [
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
];

function EditProfile() {
  const { state: { myProfile, user }, updateProfile } = useStore();
  const [active, setActive] = useState("basic");

  const [name, setName] = useState(myProfile?.name ?? user?.name ?? "");
  const [age, setAge] = useState(String(myProfile?.age ?? 28));
  const [gender, setGender] = useState(myProfile?.gender ?? "female");
  const [height, setHeight] = useState(myProfile?.height ?? "5'5\"");
  const [maritalStatus, setMaritalStatus] = useState(myProfile?.maritalStatus ?? "never");
  const [city, setCity] = useState(myProfile?.city ?? "");
  const [religion, setReligion] = useState(myProfile?.religion ?? "");
  const [community, setCommunity] = useState(myProfile?.community ?? "");
  const [motherTongue, setMotherTongue] = useState(myProfile?.motherTongue ?? "");
  const [education, setEducation] = useState(myProfile?.education ?? "");
  const [employedIn, setEmployedIn] = useState(myProfile?.employedIn ?? "");
  const [profession, setProfession] = useState(myProfile?.profession ?? "");
  const [income, setIncome] = useState(myProfile?.income ?? "");
  const [about, setAbout] = useState(myProfile?.about ?? "");

  const [familyFatherOcc, setFamilyFatherOcc] = useState(myProfile?.familyFatherOcc ?? "");
  const [familyMotherOcc, setFamilyMotherOcc] = useState(myProfile?.familyMotherOcc ?? "");
  const [familyBrothers, setFamilyBrothers] = useState(String(myProfile?.familyBrothers ?? 0));
  const [familySisters, setFamilySisters] = useState(String(myProfile?.familySisters ?? 0));
  const [familyType, setFamilyType] = useState(myProfile?.familyType ?? "nuclear");
  const [familyValues, setFamilyValues] = useState(myProfile?.familyValues ?? "moderate");

  const [partnerAge, setPartnerAge] = useState(myProfile?.partnerAge ?? "26 – 32");
  const [partnerHeight, setPartnerHeight] = useState(myProfile?.partnerHeight ?? "5'8\" – 6'1\"");
  const [partnerReligion, setPartnerReligion] = useState(myProfile?.partnerReligion ?? "");
  const [partnerCommunity, setPartnerCommunity] = useState(myProfile?.partnerCommunity ?? "");
  const [partnerLocation, setPartnerLocation] = useState(myProfile?.partnerLocation ?? "");
  const [partnerEducation, setPartnerEducation] = useState(myProfile?.partnerEducation ?? "");
  const [partnerProfession, setPartnerProfession] = useState(myProfile?.partnerProfession ?? "");
  const [partnerIncome, setPartnerIncome] = useState(myProfile?.partnerIncome ?? "");
  const [partnerNote, setPartnerNote] = useState(myProfile?.partnerNote ?? "");

  const [photos, setPhotos] = useState<string[]>(myProfile?.photos ?? []);
  const [horoscopeDob, setHoroscopeDob] = useState(myProfile?.horoscopeDob ?? "");
  const [horoscopeTime, setHoroscopeTime] = useState(myProfile?.horoscopeTime ?? "");
  const [horoscopePlace, setHoroscopePlace] = useState(myProfile?.horoscopePlace ?? "");
  const [horoscopeManglik, setHoroscopeManglik] = useState(myProfile?.horoscopeManglik ?? "");
  const [horoscopeNakshatra, setHoroscopeNakshatra] = useState(myProfile?.horoscopeNakshatra ?? "");
  const [horoscopeRashi, setHoroscopeRashi] = useState(myProfile?.horoscopeRashi ?? "");
  const [horoscopeGotra, setHoroscopeGotra] = useState(myProfile?.horoscopeGotra ?? "");
  const [idVerified, setIdVerified] = useState(myProfile?.idVerified ?? false);

  useEffect(() => {
    if (myProfile) {
      setName(myProfile.name); setAge(String(myProfile.age)); setGender(myProfile.gender);
      setHeight(myProfile.height); setMaritalStatus(myProfile.maritalStatus);
      setCity(myProfile.city); setReligion(myProfile.religion); setCommunity(myProfile.community);
      setMotherTongue(myProfile.motherTongue);
      setEducation(myProfile.education); setEmployedIn(myProfile.employedIn);
      setProfession(myProfile.profession); setIncome(myProfile.income); setAbout(myProfile.about);
      setFamilyFatherOcc(myProfile.familyFatherOcc); setFamilyMotherOcc(myProfile.familyMotherOcc);
      setFamilyBrothers(String(myProfile.familyBrothers)); setFamilySisters(String(myProfile.familySisters));
      setFamilyType(myProfile.familyType); setFamilyValues(myProfile.familyValues);
      setPartnerAge(myProfile.partnerAge); setPartnerHeight(myProfile.partnerHeight);
      setPartnerReligion(myProfile.partnerReligion); setPartnerCommunity(myProfile.partnerCommunity);
      setPartnerLocation(myProfile.partnerLocation); setPartnerEducation(myProfile.partnerEducation);
      setPartnerProfession(myProfile.partnerProfession); setPartnerIncome(myProfile.partnerIncome);
      setPartnerNote(myProfile.partnerNote);
      setPhotos(myProfile.photos);
      setHoroscopeDob(myProfile.horoscopeDob);
      setHoroscopeTime(myProfile.horoscopeTime);
      setHoroscopePlace(myProfile.horoscopePlace);
      setHoroscopeManglik(myProfile.horoscopeManglik);
      setHoroscopeNakshatra(myProfile.horoscopeNakshatra);
      setHoroscopeRashi(myProfile.horoscopeRashi);
      setHoroscopeGotra(myProfile.horoscopeGotra);
      setIdVerified(myProfile.idVerified);
    }
  }, [myProfile]);

  const removePhoto = (i: number) => setPhotos(photos.filter((_, idx) => idx !== i));
  const addPhoto = () => setPhotos([...photos, pool[photos.length % pool.length]]);

  const handleSave = () => {
    updateProfile({
      name, age: parseInt(age) || 28, gender, height, maritalStatus,
      city, religion, community, motherTongue,
      education, employedIn, profession, income, about,
      familyFatherOcc, familyMotherOcc,
      familyBrothers: parseInt(familyBrothers) || 0, familySisters: parseInt(familySisters) || 0,
      familyType, familyValues,
      partnerAge, partnerHeight, partnerReligion, partnerCommunity,
      partnerLocation, partnerEducation, partnerProfession, partnerIncome, partnerNote,
      photos,
      horoscopeDob, horoscopeTime, horoscopePlace, horoscopeManglik,
      horoscopeNakshatra, horoscopeRashi, horoscopeGotra,
      idVerified,
    });
    toast.success("Profile saved!");
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
            {active === "basic" && (
              <BasicForm
                name={name} setName={setName}
                age={age} setAge={setAge}
                gender={gender} setGender={setGender}
                height={height} setHeight={setHeight}
                maritalStatus={maritalStatus} setMaritalStatus={setMaritalStatus}
                city={city} setCity={setCity}
                religion={religion} setReligion={setReligion}
                community={community} setCommunity={setCommunity}
                motherTongue={motherTongue} setMotherTongue={setMotherTongue}
                about={about} setAbout={setAbout}
              />
            )}
            {active === "family" && (
              <FamilyForm
                familyFatherOcc={familyFatherOcc} setFamilyFatherOcc={setFamilyFatherOcc}
                familyMotherOcc={familyMotherOcc} setFamilyMotherOcc={setFamilyMotherOcc}
                familyBrothers={familyBrothers} setFamilyBrothers={setFamilyBrothers}
                familySisters={familySisters} setFamilySisters={setFamilySisters}
                familyType={familyType} setFamilyType={setFamilyType}
                familyValues={familyValues} setFamilyValues={setFamilyValues}
              />
            )}
            {active === "career" && (
              <CareerForm
                education={education} setEducation={setEducation}
                employedIn={employedIn} setEmployedIn={setEmployedIn}
                profession={profession} setProfession={setProfession}
                income={income} setIncome={setIncome}
              />
            )}
            {active === "photos" && (
              <PhotosForm photos={photos} onRemove={removePhoto} onAdd={addPhoto} />
            )}
            {active === "preferences" && (
              <PreferencesForm
                partnerAge={partnerAge} setPartnerAge={setPartnerAge}
                partnerHeight={partnerHeight} setPartnerHeight={setPartnerHeight}
                partnerReligion={partnerReligion} setPartnerReligion={setPartnerReligion}
                partnerCommunity={partnerCommunity} setPartnerCommunity={setPartnerCommunity}
                partnerLocation={partnerLocation} setPartnerLocation={setPartnerLocation}
                partnerEducation={partnerEducation} setPartnerEducation={setPartnerEducation}
                partnerProfession={partnerProfession} setPartnerProfession={setPartnerProfession}
                partnerIncome={partnerIncome} setPartnerIncome={setPartnerIncome}
                partnerNote={partnerNote} setPartnerNote={setPartnerNote}
              />
            )}
            {active === "horoscope" && (
              <HoroscopeForm
                horoscopeDob={horoscopeDob} setHoroscopeDob={setHoroscopeDob}
                horoscopeTime={horoscopeTime} setHoroscopeTime={setHoroscopeTime}
                horoscopePlace={horoscopePlace} setHoroscopePlace={setHoroscopePlace}
                horoscopeManglik={horoscopeManglik} setHoroscopeManglik={setHoroscopeManglik}
                horoscopeNakshatra={horoscopeNakshatra} setHoroscopeNakshatra={setHoroscopeNakshatra}
                horoscopeRashi={horoscopeRashi} setHoroscopeRashi={setHoroscopeRashi}
                horoscopeGotra={horoscopeGotra} setHoroscopeGotra={setHoroscopeGotra}
              />
            )}
            {active === "verification" && (
              <VerificationForm idVerified={idVerified} setIdVerified={setIdVerified} />
            )}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
              <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" /> Changes auto-save as you go.
              </p>
              <Button className="bg-gradient-primary shadow-glow hover:opacity-95" onClick={handleSave}>
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

function BasicForm({ name, setName, age, setAge, gender, setGender, height, setHeight, maritalStatus, setMaritalStatus, city, setCity, religion, setReligion, community, setCommunity, motherTongue, setMotherTongue, about, setAbout }: any) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold">Basic details</h2>
      <p className="text-sm text-muted-foreground">Tell us about yourself.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Full name"><Input value={name} onChange={e => setName(e.target.value)} /></Field>
        <Field label="Age"><Input type="number" value={age} onChange={e => setAge(e.target.value)} /></Field>
        <Field label="Gender">
          <Select value={gender} onValueChange={setGender}><SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="female">Female</SelectItem><SelectItem value="male">Male</SelectItem></SelectContent>
          </Select>
        </Field>
        <Field label="Height"><Input value={height} onChange={e => setHeight(e.target.value)} /></Field>
        <Field label="Marital status">
          <Select value={maritalStatus} onValueChange={setMaritalStatus}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="never">Never married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="City"><Input value={city} onChange={e => setCity(e.target.value)} /></Field>
        <Field label="Religion"><Input value={religion} onChange={e => setReligion(e.target.value)} /></Field>
        <Field label="Community"><Input value={community} onChange={e => setCommunity(e.target.value)} /></Field>
        <Field label="Mother tongue"><Input value={motherTongue} onChange={e => setMotherTongue(e.target.value)} /></Field>
      </div>
      <div className="mt-4">
        <Field label="About you">
          <Textarea rows={4} value={about} onChange={e => setAbout(e.target.value)} />
        </Field>
      </div>
    </div>
  );
}

function FamilyForm({ familyFatherOcc, setFamilyFatherOcc, familyMotherOcc, setFamilyMotherOcc, familyBrothers, setFamilyBrothers, familySisters, setFamilySisters, familyType, setFamilyType, familyValues, setFamilyValues }: any) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold">Family details</h2>
      <p className="text-sm text-muted-foreground">Help others understand your family background.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Father's occupation"><Input value={familyFatherOcc} onChange={e => setFamilyFatherOcc(e.target.value)} /></Field>
        <Field label="Mother's occupation"><Input value={familyMotherOcc} onChange={e => setFamilyMotherOcc(e.target.value)} /></Field>
        <Field label="Brothers"><Input type="number" value={familyBrothers} onChange={e => setFamilyBrothers(e.target.value)} /></Field>
        <Field label="Sisters"><Input type="number" value={familySisters} onChange={e => setFamilySisters(e.target.value)} /></Field>
        <Field label="Family type">
          <Select value={familyType} onValueChange={setFamilyType}><SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="nuclear">Nuclear</SelectItem><SelectItem value="joint">Joint</SelectItem></SelectContent>
          </Select>
        </Field>
        <Field label="Family values">
          <Select value={familyValues} onValueChange={setFamilyValues}><SelectTrigger><SelectValue /></SelectTrigger>
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

function CareerForm({ education, setEducation, employedIn, setEmployedIn, profession, setProfession, income, setIncome }: any) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold">Education & career</h2>
      <p className="text-sm text-muted-foreground">Your professional journey.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Highest qualification"><Input value={education} onChange={e => setEducation(e.target.value)} /></Field>
        <Field label="Employed in">
          <Select value={employedIn || "none"} onValueChange={v => setEmployedIn(v === "none" ? "" : v)}>
            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Select</SelectItem>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="government">Government</SelectItem>
              <SelectItem value="self">Self-employed</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="not working">Not working</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Profession"><Input value={profession} onChange={e => setProfession(e.target.value)} /></Field>
        <Field label="Annual income"><Input value={income} onChange={e => setIncome(e.target.value)} /></Field>
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

function PreferencesForm({ partnerAge, setPartnerAge, partnerHeight, setPartnerHeight, partnerReligion, setPartnerReligion, partnerCommunity, setPartnerCommunity, partnerLocation, setPartnerLocation, partnerEducation, setPartnerEducation, partnerProfession, setPartnerProfession, partnerIncome, setPartnerIncome, partnerNote, setPartnerNote }: any) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold">Partner preferences</h2>
      <p className="text-sm text-muted-foreground">What you're looking for in a life partner.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Age range"><Input value={partnerAge} onChange={e => setPartnerAge(e.target.value)} /></Field>
        <Field label="Height range"><Input value={partnerHeight} onChange={e => setPartnerHeight(e.target.value)} /></Field>
        <Field label="Religion"><Input value={partnerReligion} onChange={e => setPartnerReligion(e.target.value)} /></Field>
        <Field label="Community"><Input value={partnerCommunity} onChange={e => setPartnerCommunity(e.target.value)} /></Field>
        <Field label="Preferred location"><Input value={partnerLocation} onChange={e => setPartnerLocation(e.target.value)} /></Field>
        <Field label="Education"><Input value={partnerEducation} onChange={e => setPartnerEducation(e.target.value)} /></Field>
        <Field label="Profession"><Input value={partnerProfession} onChange={e => setPartnerProfession(e.target.value)} /></Field>
        <Field label="Annual income"><Input value={partnerIncome} onChange={e => setPartnerIncome(e.target.value)} /></Field>
      </div>
      <div className="mt-4">
        <Field label="A note about my ideal partner">
          <Textarea rows={4} value={partnerNote} onChange={e => setPartnerNote(e.target.value)} />
        </Field>
      </div>
    </div>
  );
}

function HoroscopeForm({ horoscopeDob, setHoroscopeDob, horoscopeTime, setHoroscopeTime, horoscopePlace, setHoroscopePlace, horoscopeManglik, setHoroscopeManglik, horoscopeNakshatra, setHoroscopeNakshatra, horoscopeRashi, setHoroscopeRashi, horoscopeGotra, setHoroscopeGotra }: any) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold">Horoscope details</h2>
      <p className="text-sm text-muted-foreground">Astrological information valued by many families.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Date of birth"><Input type="date" value={horoscopeDob} onChange={e => setHoroscopeDob(e.target.value)} /></Field>
        <Field label="Time of birth"><Input type="time" value={horoscopeTime} onChange={e => setHoroscopeTime(e.target.value)} /></Field>
        <Field label="Place of birth"><Input value={horoscopePlace} onChange={e => setHoroscopePlace(e.target.value)} placeholder="City, State" /></Field>
        <Field label="Manglik / Dosha">
          <Select value={horoscopeManglik || "none"} onValueChange={v => setHoroscopeManglik(v === "none" ? "" : v)}>
            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Not specified</SelectItem>
              <SelectItem value="yes">Manglik</SelectItem>
              <SelectItem value="no">Non-Manglik</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Nakshatra (Birth star)"><Input value={horoscopeNakshatra} onChange={e => setHoroscopeNakshatra(e.target.value)} placeholder="e.g. Ashwini" /></Field>
        <Field label="Rashi (Zodiac)"><Input value={horoscopeRashi} onChange={e => setHoroscopeRashi(e.target.value)} placeholder="e.g. Mesha" /></Field>
        <Field label="Gotra"><Input value={horoscopeGotra} onChange={e => setHoroscopeGotra(e.target.value)} placeholder="e.g. Kashyapa" /></Field>
      </div>
    </div>
  );
}

function VerificationForm({ idVerified, setIdVerified }: { idVerified: boolean; setIdVerified: (v: boolean) => void }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold">ID verification</h2>
      <p className="text-sm text-muted-foreground">Verify your identity to build trust with potential matches.</p>
      <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-6">
        <div className="flex items-start gap-4">
          <ShieldCheck className="mt-0.5 h-6 w-6 text-primary" />
          <div>
            <p className="font-display font-bold">Government ID verification</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Upload a government-issued ID (Aadhaar, PAN, Voter ID, or Passport) to get verified.
              Your document is encrypted and never shared with other members.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Button
                variant={idVerified ? "default" : "outline"}
                className={idVerified ? "bg-gradient-primary shadow-glow" : ""}
                onClick={() => setIdVerified(!idVerified)}
              >
                {idVerified ? <><Check className="mr-1.5 h-4 w-4" /> Verified</> : "Mark as verified"}
              </Button>
              {idVerified && (
                <Button variant="ghost" size="sm" onClick={() => setIdVerified(false)}>Remove</Button>
              )}
            </div>
            {idVerified && (
              <p className="mt-3 text-xs text-emerald-600 font-medium flex items-center gap-1">
                <Check className="h-3.5 w-3.5" /> Your ID has been marked as verified.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

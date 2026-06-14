import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fields = [
  { label: "I'm looking for", options: ["Bride", "Groom"] },
  { label: "Age", options: ["18-24", "25-29", "30-34", "35-40", "40+"] },
  { label: "Religion", options: ["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist", "Other"] },
  { label: "Community", options: ["Any", "Brahmin", "Patel", "Sunni", "Catholic", "Khatri"] },
  { label: "Location", options: ["Anywhere", "Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad"] },
];

export function SearchPartner() {
  return (
    <section className="mx-auto -mt-10 max-w-6xl px-4 sm:px-6 lg:-mt-16 lg:px-8">
      <div className="rounded-3xl border border-border bg-card p-5 shadow-elegant sm:p-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold sm:text-2xl">Find your partner</h2>
            <p className="text-sm text-muted-foreground">Refine by what matters to you.</p>
          </div>
          <span className="hidden rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary sm:inline">
            Quick search
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {fields.map((f) => (
            <div key={f.label} className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-muted-foreground">{f.label}</Label>
              <Select>
                <SelectTrigger className="h-11 bg-background">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {f.options.map((o) => (
                    <SelectItem key={o} value={o}>{o}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-end">
          <Button asChild size="lg" className="h-12 w-full bg-gradient-primary px-8 shadow-glow sm:w-auto">
            <Link to="/browse">
              <Search className="mr-2 h-4 w-4" />
              Search matches
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

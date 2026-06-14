import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Cookie } from "lucide-react";

export const Route = createFileRoute("/legal/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Sangam Matrimony" },
      { name: "description", content: "How and why Sangam Matrimony uses cookies and similar technologies." },
    ],
  }),
  component: CookiesPage,
});

const rows = [
  { type: "Essential", purpose: "Login session, security, fraud prevention", duration: "Session" },
  { type: "Preferences", purpose: "Remember language, theme, and search filters", duration: "1 year" },
  { type: "Analytics", purpose: "Understand which pages help members find matches", duration: "13 months" },
  { type: "Marketing", purpose: "Show relevant Sangam ads on other platforms", duration: "6 months" },
];

function CookiesPage() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Legal" title="Cookie Policy" description="Last updated: June 1, 2026" />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
        <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <Cookie className="h-6 w-6 shrink-0 text-primary" />
          <p className="text-sm text-foreground">
            Cookies are small text files stored on your device. We use them to keep you signed in, remember your preferences and improve matchmaking.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold">Categories we use</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <table className="w-full text-left text-sm">
              <thead className="bg-primary-soft/40">
                <tr>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Purpose</th>
                  <th className="px-4 py-3 font-semibold">Duration</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.type} className="border-t border-border">
                    <td className="px-4 py-3 font-medium">{r.type}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.purpose}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <article className="space-y-6">
          <div>
            <h2 className="font-display text-xl font-bold">Managing cookies</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              You can accept or decline non-essential cookies via the banner shown on your first visit. You can change your choice anytime from Settings → Privacy → Cookie Preferences. Most browsers also let you block or delete cookies directly.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold">Third-party cookies</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              We work with trusted partners — Google Analytics, Razorpay, Meta — who may set their own cookies subject to their respective privacy policies.
            </p>
          </div>
        </article>
      </section>
    </SiteLayout>
  );
}

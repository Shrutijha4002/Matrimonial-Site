import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert, Mail, Phone, AlertTriangle, CheckCircle2 } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/report-abuse")({
  head: () => ({
    meta: [
      { title: "Report Abuse — Sangam Matrimony" },
      { name: "description", content: "Report suspicious or abusive behaviour on Sangam Matrimony." },
    ],
  }),
  component: ReportAbuse,
});

const channels = [
  { icon: Mail, title: "Email us", body: "abuse@sangam.example", action: "Send email" },
  { icon: Phone, title: "Call us", body: "+91 1800 123 4567", action: "Call now" },
  { icon: AlertTriangle, title: "Emergency", body: "If you are in immediate danger, please contact local law enforcement.", action: "Dial 100" },
];

function ReportAbuse() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Safety" title="Report Abuse" description="Help us keep Sangam safe. Report any suspicious or harmful behaviour." />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-start gap-4 rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950">
          <ShieldAlert className="h-6 w-6 shrink-0 text-red-600 dark:text-red-400" />
          <div>
            <h2 className="font-display text-lg font-bold text-red-800 dark:text-red-300">Your report is confidential</h2>
            <p className="mt-1 text-sm text-red-700 dark:text-red-400">We take every report seriously. All information you provide is kept strictly confidential and reviewed by our trust & safety team within 24 hours.</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {channels.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary-soft text-primary">
                <c.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
              <Button variant="outline" className="mt-4 w-full">{c.action}</Button>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h3 className="font-display font-bold">What happens after you report?</h3>
              <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>1. Our team reviews the report within 24 hours.</li>
                <li>2. We investigate the reported profile and activity.</li>
                <li>3. If a violation is confirmed, we take appropriate action (warning, suspension, or permanent ban).</li>
                <li>4. You will receive an email confirmation once the review is complete.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

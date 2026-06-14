import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/legal/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Sangam Matrimony" },
      { name: "description", content: "How Sangam Matrimony collects, uses, and protects your personal information." },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide directly: name, date of birth, contact details, photographs, religion, community, education, profession, family details and partner preferences. We also collect device, browser and usage data to improve the service.",
  },
  {
    title: "2. How We Use Your Information",
    body: "Your information powers profile matching, communication between members, fraud prevention, customer support, payments, and personalised recommendations. Sensitive details such as contact information are only shared with members you accept interest from.",
  },
  {
    title: "3. Profile Visibility & Privacy Controls",
    body: "You control who sees your photos, contact details and horoscope. You can blur photos, hide your profile, block specific members and delete your account at any time from Settings → Privacy.",
  },
  {
    title: "4. Data Sharing",
    body: "We never sell your personal data. We share limited data with trusted processors (payment gateways, SMS/email providers, cloud hosting) bound by strict confidentiality agreements, and with law-enforcement only when legally required.",
  },
  {
    title: "5. Data Security",
    body: "All data is encrypted in transit (TLS 1.3) and at rest. Profiles undergo manual moderation. Suspicious accounts are auto-flagged by our trust & safety systems.",
  },
  {
    title: "6. Your Rights",
    body: "You may access, correct, export or delete your personal information at any time. To exercise these rights write to privacy@sangam.example and we will respond within 30 days.",
  },
  {
    title: "7. Children",
    body: "Sangam is intended for users aged 18 and above (21+ for grooms in jurisdictions where applicable). We do not knowingly collect data from minors.",
  },
  {
    title: "8. Updates to this Policy",
    body: "We may update this policy from time to time. Material changes will be notified via email and an in-app banner at least 7 days before they take effect.",
  },
];

function PrivacyPage() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Legal" title="Privacy Policy" description="Last updated: June 1, 2026" />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-start gap-4 rounded-2xl border border-border bg-primary-soft/40 p-6">
          <ShieldCheck className="h-6 w-6 shrink-0 text-primary" />
          <p className="text-sm text-foreground">
            Your trust is everything. We treat your personal data with the same care we expect for our own families.
          </p>
        </div>
        <div className="space-y-8">
          {sections.map((s) => (
            <article key={s.title}>
              <h2 className="font-display text-xl font-bold">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

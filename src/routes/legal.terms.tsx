import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/legal/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Sangam Matrimony" },
      { name: "description", content: "The terms that govern your use of Sangam Matrimony." },
    ],
  }),
  component: TermsPage,
});

const sections = [
  { title: "1. Eligibility", body: "You must be of legal marriageable age in your jurisdiction (18+ for brides, 21+ for grooms in India) and legally free to marry. By registering you confirm all information you provide is accurate and truthful." },
  { title: "2. Account & Profile", body: "You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. One person — one profile. Duplicate or fake profiles will be removed without notice." },
  { title: "3. Acceptable Use", body: "You will not harass, threaten, impersonate, solicit money, share obscene content, or use the platform for any commercial purpose. Violations result in immediate suspension and may be reported to law-enforcement." },
  { title: "4. Photographs & Content", body: "You retain ownership of content you upload. You grant Sangam a worldwide, royalty-free licence to display it for the purpose of operating the matchmaking service. Watermarked or copyrighted images of others are prohibited." },
  { title: "5. Payments & Subscriptions", body: "Paid plans auto-renew unless cancelled at least 24 hours before the renewal date. All fees are in INR and inclusive of applicable taxes." },
  { title: "6. Disclaimers", body: "Sangam is a platform that helps members connect; we do not arrange marriages, perform background checks beyond stated verifications, or guarantee outcomes. Members are responsible for their own due diligence." },
  { title: "7. Limitation of Liability", body: "To the maximum extent permitted by law, Sangam's aggregate liability is limited to the fees paid by you in the 3 months preceding the claim." },
  { title: "8. Governing Law", body: "These terms are governed by the laws of India. Courts in Mumbai shall have exclusive jurisdiction over any dispute." },
];

function TermsPage() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" description="Last updated: June 1, 2026" />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <FileText className="h-6 w-6 shrink-0 text-primary" />
          <p className="text-sm text-foreground">
            Please read these terms carefully. By creating an account you agree to be bound by them.
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

import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { RefreshCcw, CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/legal/refund")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Sangam Matrimony" },
      { name: "description", content: "Our transparent refund and cancellation policy for premium memberships." },
    ],
  }),
  component: RefundPage,
});

function RefundPage() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Legal" title="Refund & Cancellation Policy" description="Fair, transparent and human." />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
        <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <RefreshCcw className="h-6 w-6 shrink-0 text-primary" />
          <p className="text-sm text-foreground">
            We want you to feel confident about your purchase. If something is wrong, we will make it right.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            <h2 className="mt-3 font-display text-lg font-bold">Eligible for refund</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Refund requested within 7 days of purchase</li>
              <li>• You have not contacted more than 3 members</li>
              <li>• Duplicate or accidental payment</li>
              <li>• Service unavailable due to a verified issue on our side</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <XCircle className="h-6 w-6 text-destructive" />
            <h2 className="mt-3 font-display text-lg font-bold">Not eligible</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Plan used for more than 7 days</li>
              <li>• Account suspended for policy violation</li>
              <li>• Contact details of 3+ members already accessed</li>
              <li>• Promotional or discounted lifetime plans</li>
            </ul>
          </div>
        </div>

        <article className="space-y-6">
          <div>
            <h2 className="font-display text-xl font-bold">How to request a refund</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Email <a className="font-semibold text-primary hover:underline" href="mailto:refunds@sangam.example">refunds@sangam.example</a> from your registered email with the order ID and a short reason. Our team responds within 2 business days and refunds approved requests within 7–10 business days to the original payment method.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold">Cancellation</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              You can cancel auto-renewal anytime from Settings → Subscription. Cancellation stops future charges but does not automatically refund the current period.
            </p>
          </div>
          <p className="rounded-xl bg-primary-soft/40 p-4 text-sm">
            Still have questions? Visit our <Link to="/help" className="font-semibold text-primary hover:underline">Help Center →</Link>
          </p>
        </article>
      </section>
    </SiteLayout>
  );
}

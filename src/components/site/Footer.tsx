import { Link } from "@tanstack/react-router";
import { Heart, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

type FooterLink = { label: string; to?: "/browse" | "/success-stories" | "/membership" | "/help" | "/auth/sign-in" | "/auth/register" | "/legal/privacy" | "/legal/terms" | "/legal/refund" | "/legal/cookies" | "/about" | "/contact" | "/dashboard" | "/shortlist" | "/interests" | "/chat" | "/notifications" | "/profile/create" };

const cols: { title: string; links: FooterLink[] }[] = [
  { title: "Company", links: [{ label: "About Us", to: "/about" }, { label: "Careers" }, { label: "Press" }, { label: "Contact", to: "/contact" }] },
  { title: "Browse", links: [{ label: "All Profiles", to: "/browse" }, { label: "Success Stories", to: "/success-stories" }, { label: "Shortlist", to: "/shortlist" }, { label: "Interests", to: "/interests" }] },
  { title: "Account", links: [{ label: "Dashboard", to: "/dashboard" }, { label: "Messages", to: "/chat" }, { label: "Notifications", to: "/notifications" }, { label: "Membership", to: "/membership" }] },
  { title: "Legal", links: [{ label: "Privacy Policy", to: "/legal/privacy" }, { label: "Terms & Conditions", to: "/legal/terms" }, { label: "Refund Policy", to: "/legal/refund" }, { label: "Cookies", to: "/legal/cookies" }] },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                <Heart className="h-4 w-4 fill-current" />
              </span>
              <span className="font-display text-xl font-bold">
                Sangam<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A modern matrimonial platform built on trust, privacy, and meaningful connections.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <p className="mb-4 font-display text-sm font-bold">{c.title}</p>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.to ? (
                      <Link to={l.to} className="text-sm text-muted-foreground transition hover:text-foreground">{l.label}</Link>
                    ) : (
                      <a href="#" className="text-sm text-muted-foreground transition hover:text-foreground">{l.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Sangam Matrimony. All rights reserved.</p>
          <p>Crafted with <Heart className="inline h-3 w-3 fill-primary text-primary" /> for meaningful matches.</p>
        </div>
      </div>
    </footer>
  );
}

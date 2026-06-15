import { Link } from "@tanstack/react-router";
import { Heart, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const socials = [
  { icon: Instagram, href: "/social/instagram", label: "Instagram" },
  { icon: Facebook, href: "/social/facebook", label: "Facebook" },
  { icon: Twitter, href: "/social/twitter", label: "Twitter" },
  { icon: Youtube, href: "/social/youtube", label: "Youtube" },
] as const;

const cols = [
  { title: "Company", links: [{ label: "About Us", to: "/about" }, { label: "Careers", to: "/careers" }, { label: "Press", to: "/press" }, { label: "Contact", to: "/contact" }] as const },
  { title: "Support", links: [{ label: "Help Center", to: "/help" }, { label: "Contact Us", to: "/contact" }, { label: "Safety Tips", to: "/safety" }, { label: "Report Abuse", to: "/report-abuse" }] as const },
  { title: "Browse", links: [{ label: "All Profiles", to: "/browse" }, { label: "Success Stories", to: "/success-stories" }, { label: "Shortlist", to: "/shortlist" }, { label: "Interests", to: "/interests" }] as const },
  { title: "Account", links: [{ label: "Dashboard", to: "/dashboard" }, { label: "Messages", to: "/chat" }, { label: "Notifications", to: "/notifications" }, { label: "Membership", to: "/membership" }] as const },
  { title: "Legal", links: [{ label: "Privacy Policy", to: "/legal/privacy" }, { label: "Terms & Conditions", to: "/legal/terms" }, { label: "Refund Policy", to: "/legal/refund" }, { label: "Cookies", to: "/legal/cookies" }] as const },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
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
              {socials.map((s) => (
                <Link
                  key={s.label}
                  to={s.href as any}
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary"
                >
                  <s.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <p className="mb-4 font-display text-sm font-bold">{c.title}</p>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-muted-foreground transition hover:text-foreground">{l.label}</Link>
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

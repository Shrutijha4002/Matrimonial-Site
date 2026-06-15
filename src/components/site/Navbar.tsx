import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, X, LogOut, Bell, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";

const links = [
  { label: "Browse", to: "/browse" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Success Stories", to: "/success-stories" },
  { label: "Membership", to: "/membership" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

const authedLinks = [
  { label: "Browse", to: "/browse" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Messages", to: "/chat" },
  { label: "Membership", to: "/membership" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { state: { user }, logout, unreadCount } = useStore();
  const navigate = useNavigate();
  const navLinks = user ? authedLinks : links;

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
            <Heart className="h-4 w-4 fill-current" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            Sangam<span className="text-primary">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <>
              <Link to="/notifications" className="relative mr-1 text-muted-foreground hover:text-foreground">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">{unreadCount}</span>}
              </Link>
              <Link to="/profile/edit" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                <User className="h-4 w-4" /> {user.name.split(" ")[0]}
              </Link>
              <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Sign out">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth/sign-in">Sign in</Link>
              </Button>
              <Button size="sm" className="bg-gradient-primary shadow-glow hover:opacity-95" asChild>
                <Link to="/auth/register">Register Free</Link>
              </Button>
            </>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((s) => !s)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/notifications" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Notifications{unreadCount > 0 ? ` (${unreadCount})` : ""}</Link>
                <Link to="/profile/edit" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Edit profile</Link>
                <Button variant="outline" className="mt-2" onClick={() => { setOpen(false); handleLogout(); }}>Sign out</Button>
              </>
            ) : (
              <div className="mt-2 flex gap-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/auth/sign-in" onClick={() => setOpen(false)}>Sign in</Link>
                </Button>
                <Button className="flex-1 bg-gradient-primary" asChild>
                  <Link to="/auth/register" onClick={() => setOpen(false)}>Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { supabase, supabaseConfigured } from "@/lib/supabase";

const nav = [
  { to: "/ai-tools", label: "AI Tools" },
  { to: "/products", label: "Products" },
  { to: "/resources", label: "Resources" },
  { to: "/pricing", label: "Pricing" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      if (!isHome) {
        setScrolled(window.scrollY > 8);
        return;
      }
      const hero = document.querySelector(".webrya-hero");
      if (!hero) {
        setScrolled(window.scrollY > 40);
        return;
      }
      setScrolled(hero.getBoundingClientRect().bottom <= 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  useEffect(() => {
    if (!supabaseConfigured) return;
    let mounted = true;
    void supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) setSignedIn(!!session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(!!session);
    });
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const heroTone = isHome && !scrolled;
  const accountTo = signedIn ? "/portal" : "/login";
  const accountLabel = signedIn ? "Workspace" : "Log in";
  const ctaTo = signedIn ? "/portal" : "/ai-tools";
  const ctaLabel = signedIn ? "Open workspace" : "Get Started";

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        heroTone
          ? "border-b border-white/10 bg-black/20 backdrop-blur-[6px]"
          : "border-b border-border bg-background/95 shadow-sm backdrop-blur-xl",
          : "border-b border-border bg-background/95 shadow-sm backdrop-blur-xl",
      ].join(" ")}
    >
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
        <Logo tone={heroTone ? "hero" : "default"} />

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={[
                "text-sm transition-colors",
                heroTone
                  ? "text-white/75 hover:text-white"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className={
              heroTone
                ? "text-white hover:bg-white/10 hover:text-white"
                : "text-foreground hover:bg-secondary"
            }
          >
            <Link to={accountTo}>{accountLabel}</Link>
          </Button>

          <Button asChild size="sm">
            <Link to={ctaTo}>{ctaLabel}</Link>
          </Button>
        </div>

        <button
          className={[
            "grid size-11 place-items-center rounded-md border lg:hidden",
            heroTone ? "border-white/25 text-white" : "border-border text-foreground",
          ].join(" ")}
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-sm text-foreground"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-4 flex gap-2 pb-2">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link to={accountTo} onClick={() => setOpen(false)}>
                  {accountLabel}
                </Link>
              </Button>
              <Button asChild size="sm" className="flex-1">
                <Link to={ctaTo} onClick={() => setOpen(false)}>
                  {ctaLabel}
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

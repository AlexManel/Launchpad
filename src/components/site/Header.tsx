import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

const nav = [
  { to: "/ai-tools", label: "AI Tools" },
  { to: "/products", label: "Products" },
  { to: "/resources", label: "Resources" },
  { to: "/pricing", label: "Pricing" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  // White logo/nav only on the dark homepage hero (before scroll)
  const lightOnDark = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        
                lightOnDark
          ? "border-b border-white/10 bg-black/25 backdrop-blur-sm"
          : "border-b border-border bg-background/95 shadow-sm backdrop-blur-xl",
      ].join(" ")}
    >
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
        <Logo tone={lightOnDark ? "hero" : "default"} />

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={[
                "text-sm transition-colors",
                lightOnDark
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
              lightOnDark
                ? "text-white hover:bg-white/10 hover:text-white"
                : "text-foreground hover:bg-secondary"
            }
          >
            <Link to="/login">Log in</Link>
          </Button>

          <Button
            asChild
            size="sm"
            className="bg-teal-700 text-white hover:bg-teal-600"
          >
            <Link to="/ai-tools">Get Started</Link>
          </Button>
        </div>

        <button
          className={[
            "grid size-9 place-items-center rounded-md border lg:hidden",
            lightOnDark
              ? "border-white/25 text-white"
              : "border-border text-foreground",
          ].join(" ")}
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
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
                <Link to="/login" onClick={() => setOpen(false)}>
                  Log in
                </Link>
              </Button>

              <Button asChild size="sm" className="flex-1">
                <Link to="/ai-tools" onClick={() => setOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
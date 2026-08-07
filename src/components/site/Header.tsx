import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

const nav = [
  { to: "/", label: "Home" },
  { to: "/ai-tools", label: "AI Tools" },
  { to: "/products", label: "Digital Products" },
  { to: "/portal", label: "Host Portal" },
  { to: "/pricing", label: "Pricing" },
  { to: "/resources", label: "Resources" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground data-[status=active]:font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/ai-tools">Start Free</Link>
          </Button>
        </div>

        <button
          className="grid size-9 place-items-center rounded-md border border-border lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex gap-2 pb-3">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link to="/login" onClick={() => setOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button asChild size="sm" className="flex-1">
                <Link to="/ai-tools" onClick={() => setOpen(false)}>
                  Start Free
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

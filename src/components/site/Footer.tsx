import { Link } from "@tanstack/react-router";

import { Logo } from "./Logo";

const columns = [
  {
    title: "Product",
    links: [
      { to: "/ai-tools", label: "AI Tools" },
      { to: "/products", label: "Digital Products" },
      { to: "/portal", label: "Host Portal" },
      { to: "/pricing", label: "Packages" },
    ],
  },
  {
    title: "Learn",
    links: [
      { to: "/resources", label: "Resources" },
      { to: "/resources", label: "Hosting guides" },
      { to: "/resources", label: "Review management" },
    ],
  },
  {
    title: "Account",
    links: [
      { to: "/login", label: "Login" },
      { to: "/ai-tools", label: "Start free" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Everything you need to run your short-term rental smarter. Built for Airbnb hosts,
            co-hosts and property managers.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="eyebrow">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l, i) => (
                <li key={`${l.to}-${i}`}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="hairline">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Webrya. All rights reserved.</p>
          <p>webrya.com · Not affiliated with Airbnb, Inc.</p>
        </div>
      </div>
    </footer>
  );
}

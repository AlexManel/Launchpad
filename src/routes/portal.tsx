import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Sparkles,
  Package,
  Home,
  BookOpen,
  User,
  ArrowUpRight,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/Logo";
import { tools, products, resources } from "@/data/webrya";
import { getSession, signOut } from "@/lib/mock-auth";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Webrya Workspace — Webrya" },
      {
        name: "description",
        content:
          "A preview of the Webrya Workspace: your AI tools, purchased digital products, properties and resources in one place.",
      },
      { property: "og:title", content: "Webrya Workspace — Webrya" },
      {
        property: "og:description",
        content: "One workspace for your short-term rental tools, products and properties.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portal,
});

const sections = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "tools", label: "AI Tools", icon: Sparkles },
  { id: "products", label: "My Products", icon: Package },
  { id: "properties", label: "My Properties", icon: Home },
  { id: "resources", label: "Resources", icon: BookOpen },
  { id: "account", label: "Account", icon: User },
] as const;

type SectionId = (typeof sections)[number]["id"];

const owned = ["aircover-suite", "review-protection-suite", "guest-communication-suite"];

const properties = [
  { name: "Casa Oliva", location: "Athens · Koukaki", status: "Live", nights: 21 },
  { name: "The Terrace Loft", location: "Lisbon · Alfama", status: "Live", nights: 17 },
];

const activity = [
  { text: "Review response generated for Casa Oliva", when: "2 hours ago" },
  { text: "Guest reply sent — early check-in request", when: "Yesterday" },
  { text: "AIRCover Suite downloaded", when: "3 days ago" },
  { text: "Listing optimized — The Terrace Loft", when: "Last week" },
];

function Portal() {
  const [section, setSection] = useState<SectionId>("overview");
  const [name, setName] = useState("Host");

  useEffect(() => {
    const s = getSession();
    if (s?.name) setName(s.name);
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground sm:inline">
              Webrya Workspace
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/">Back to site</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              onClick={() => signOut()}
            >
              <Link to="/login">
                <LogOut className="size-4" /> Sign out
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[220px_1fr] lg:px-8">
        <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={
                "flex shrink-0 items-center gap-2.5 rounded-md px-3 py-2.5 text-sm transition-colors " +
                (section === s.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground")
              }
            >
              <s.icon className="size-4" />
              {s.label}
            </button>
          ))}
        </nav>

        <main>
          {section === "overview" && <Overview name={name} onNavigate={setSection} />}
          {section === "tools" && <ToolsPanel />}
          {section === "products" && <ProductsPanel />}
          {section === "properties" && <PropertiesPanel />}
          {section === "resources" && <ResourcesPanel />}
          {section === "account" && <AccountPanel name={name} />}
        </main>
      </div>
    </div>
  );
}

function PanelTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl">{title}</h1>
      {sub && <p className="mt-2 text-sm text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Overview({ name, onNavigate }: { name: string; onNavigate: (s: SectionId) => void }) {
  const stats = [
    { label: "AI Tools", value: "5", note: "available", to: "tools" as SectionId },
    { label: "Digital Products", value: "3", note: "owned", to: "products" as SectionId },
    { label: "Properties", value: "2", note: "connected", to: "properties" as SectionId },
  ];

  return (
    <>
      <PanelTitle title="Welcome back." sub={`Signed in as ${name}. Here's where things stand.`} />

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <button
            key={s.label}
            onClick={() => onNavigate(s.to)}
            className="rounded-xl border border-border bg-card p-6 text-left transition-shadow hover:shadow-[var(--shadow-card)]"
          >
            <p className="eyebrow">{s.label}</p>
            <p className="mt-3 font-display text-4xl">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-xl border border-border bg-card p-7">
          <p className="eyebrow">Quick actions</p>
          <div className="mt-5 grid gap-3">
            {[
              { label: "Generate Review Response", slug: "review-response-generator" },
              { label: "Reply to Guest", slug: "guest-reply-generator" },
              { label: "Optimize Listing", slug: "listing-optimizer" },
            ].map((a) => (
              <Link
                key={a.slug}
                to="/ai-tools/$slug"
                params={{ slug: a.slug }}
                className="flex items-center justify-between rounded-lg border border-border px-4 py-3.5 text-sm transition-colors hover:bg-secondary"
              >
                {a.label}
                <ArrowUpRight className="size-4 text-accent" />
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-7">
          <p className="eyebrow">Recent activity</p>
          <ul className="mt-5 space-y-4">
            {activity.map((a) => (
              <li key={a.text} className="text-sm">
                <p>{a.text}</p>
                <p className="mt-1 text-xs text-muted-foreground">{a.when}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function ToolsPanel() {
  return (
    <>
      <PanelTitle title="AI Tools" sub="All five tools are available on your account." />
      <div className="grid gap-4 sm:grid-cols-2">
        {tools.map((t) => (
          <Link
            key={t.slug}
            to="/ai-tools/$slug"
            params={{ slug: t.slug }}
            className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-card)]"
          >
            <h2 className="text-lg">{t.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.short}</p>
            <span className="mt-4 inline-block text-sm font-medium text-accent">Open tool</span>
          </Link>
        ))}
      </div>
    </>
  );
}

function ProductsPanel() {
  return (
    <>
      <PanelTitle title="My Products" sub="Downloads and updates for everything you own." />
      <div className="grid gap-4 sm:grid-cols-2">
        {products.map((p) => {
          const isOwned = owned.includes(p.slug);
          return (
            <div key={p.slug} className="flex flex-col rounded-xl border border-border bg-card p-6">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg">{p.name}</h2>
                <span
                  className={
                    "shrink-0 rounded-full px-2.5 py-0.5 text-xs " +
                    (isOwned
                      ? "bg-secondary text-secondary-foreground"
                      : "border border-border text-muted-foreground")
                  }
                >
                  {isOwned ? "Owned" : p.priceLabel}
                </span>
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.format}
              </p>
              <Button asChild variant={isOwned ? "outline" : "default"} className="mt-5 w-full">
                <Link to="/products/$slug" params={{ slug: p.slug }}>
                  {isOwned ? "Download files" : "Get access"}
                </Link>
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
}

function PropertiesPanel() {
  return (
    <>
      <PanelTitle title="My Properties" sub="Listings connected to your Webrya account." />
      <div className="grid gap-4 sm:grid-cols-2">
        {properties.map((p) => (
          <div key={p.name} className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg">{p.name}</h2>
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
                {p.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{p.location}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="eyebrow">Nights booked</dt>
                <dd className="mt-1 font-display text-2xl">{p.nights}</dd>
              </div>
              <div>
                <dt className="eyebrow">Guidebook</dt>
                <dd className="mt-1 font-display text-2xl">Live</dd>
              </div>
            </dl>
          </div>
        ))}
        <div className="grid place-items-center rounded-xl border border-dashed border-border p-6 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Add another property</p>
            <Button variant="ghost" className="mt-2" disabled>
              Coming soon
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function ResourcesPanel() {
  return (
    <>
      <PanelTitle title="Resources" sub="Guides and playbooks saved to your account." />
      <div className="grid gap-4 sm:grid-cols-2">
        {resources.slice(0, 6).map((r) => (
          <div key={r.slug} className="rounded-xl border border-border bg-card p-6">
            <p className="eyebrow">{r.category}</p>
            <h2 className="mt-3 text-base leading-snug">{r.title}</h2>
            <p className="mt-2 text-xs text-muted-foreground">{r.readTime} read</p>
          </div>
        ))}
      </div>
      <Button asChild variant="outline" className="mt-6">
        <Link to="/resources">Browse all resources</Link>
      </Button>
    </>
  );
}

function AccountPanel({ name }: { name: string }) {
  return (
    <>
      <PanelTitle title="Account" sub="Your Webrya profile and plan." />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="eyebrow">Profile</p>
          <p className="mt-3 text-lg">{name}</p>
          <p className="text-sm text-muted-foreground">Host · joined this year</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="eyebrow">Current package</p>
          <p className="mt-3 text-lg">Free tools</p>
          <p className="text-sm text-muted-foreground">Upgrade to a one-time Webrya package.</p>
          <Button asChild className="mt-4">
            <Link to="/pricing">View packages</Link>
          </Button>
        </div>
      </div>
    </>
  );
}

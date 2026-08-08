import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Package, LayoutDashboard, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";
import { tools, products } from "@/data/webrya";
import heroImage from "@/assets/hero-interior.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Webrya — Run your short-term rental smarter" },
      {
        name: "description",
        content:
          "AI-powered tools, ready-made resources and professional digital solutions built for short-term rental hosts and property managers.",
      },
      { property: "og:title", content: "Webrya — Run your short-term rental smarter" },
      {
        property: "og:description",
        content:
          "AI tools, digital products, the Webrya Workspace and professional solutions for hosts and property managers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),

  component: Home,
});

const pillars = [
  {
    icon: Sparkles,
    title: "Free AI Tools",
    body: "Try Webrya for free — practical AI tools for everyday hosting tasks.",
    to: "/ai-tools" as const,
    cta: "Explore AI Tools",
  },
  {
    icon: Package,
    title: "Digital Products",
    body: "Buy ready-made hosting systems. Pay once. Own it.",
    to: "/products" as const,
    cta: "View Products",
  },
  {
    icon: LayoutDashboard,
    title: "Webrya Workspace",
    body: "Keep your tools, purchases and saved work together in one place.",
    to: "/portal" as const,
    cta: "See the Workspace",
  },
  {
    icon: Check,
    title: "Professional Solutions",
    body: "Get a complete Webrya setup for your property or business.",
    to: "/pricing" as const,
    cta: "View solutions",
  },
];


function Home() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:py-24">
          <div>
            <p className="eyebrow">For Airbnb hosts &amp; short-term rental professionals</p>
            <h1 className="mt-5 text-[2.6rem] leading-[1.04] sm:text-6xl">
              Run your short-term rental smarter.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              AI-powered tools, ready-made resources and digital solutions built for Airbnb hosts
              and short-term rental professionals.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/ai-tools">
                  Explore AI Tools <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/products">View Products</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
              {["5 free AI tools", "One-time purchases", "No subscription"].map((t) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <Check className="size-4 text-accent" /> {t}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              width={1408}
              height={1056}
              alt="Sunlit short-term rental living room styled for guests"
              className="aspect-4/3 w-full rounded-xl object-cover shadow-[var(--shadow-lift)]"
            />
            <div className="absolute -bottom-6 -left-4 hidden w-60 rounded-lg border border-border bg-card p-4 shadow-[var(--shadow-card)] sm:block">
              <p className="eyebrow">Review response</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                “Thank you for taking the time to share this — I'm glad the space worked well…”
              </p>
              <p className="mt-3 text-xs text-accent">Generated in 4 seconds</p>
            </div>
          </div>
        </div>
      </section>

      <Section className="py-16 lg:py-24">
        <p className="eyebrow">The Webrya ecosystem</p>
        <h2 className="mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
          Three products that work as one system.
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pillars.map((p) => (
            <Link
              key={p.title}
              to={p.to}
              className="group flex flex-col rounded-xl border border-border bg-card p-7 transition-shadow hover:shadow-[var(--shadow-lift)]"
            >
              <span className="grid size-10 place-items-center rounded-md bg-secondary text-secondary-foreground">
                <p.icon className="size-5" />
              </span>
              <h3 className="mt-6 text-xl">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                {p.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="pb-16 lg:pb-24">
        <div className="rounded-2xl border border-border bg-surface p-8 lg:p-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Free AI tools</p>
              <h2 className="mt-3 text-3xl sm:text-4xl">Start with the tools you'll use today.</h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/ai-tools">All tools</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.slice(0, 3).map((t) => (
              <Link
                key={t.slug}
                to="/ai-tools/$slug"
                params={{ slug: t.slug }}
                className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-card)]"
              >
                <h3 className="text-lg">{t.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.short}</p>
                <span className="mt-4 inline-block text-sm font-medium text-accent">Try free</span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pb-16 lg:pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Digital products · one-time purchase</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Systems you can put to work tonight.</h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/products">Browse all products</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className={
                "flex flex-col rounded-xl border p-6 transition-shadow hover:shadow-[var(--shadow-lift)] " +
                (p.featured
                  ? "border-transparent bg-ink text-ink-foreground"
                  : "border-border bg-card")
              }
            >
              {p.featured && <p className="eyebrow text-accent">Best value</p>}
              <h3 className="mt-1 text-lg">{p.name}</h3>
              <p
                className={
                  "mt-2 flex-1 text-sm leading-relaxed " +
                  (p.featured ? "opacity-80" : "text-muted-foreground")
                }
              >
                {p.tagline}
              </p>
              <p className="mt-5 text-base font-medium">{p.priceLabel}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="pb-24">
        <div className="grid items-center gap-10 rounded-2xl border border-border bg-card p-8 lg:grid-cols-2 lg:p-12">
          <div>
            <p className="eyebrow">Webrya packages</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Need the whole thing built for you?
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">
              One-time professional setups for hosts, co-hosts and property managers — a landing
              page, branding, AI tools and your own host dashboard, delivered as a finished
              solution. No monthly subscription.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/pricing">View packages</Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link to="/portal">Preview the Host Portal</Link>
              </Button>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
            {[
              ["Starter", "$99"],
              ["Professional", "$299"],
              ["Business", "from $699"],
              ["Everything", "one-time"],
            ].map(([k, v]) => (
              <div key={k} className="bg-card p-6">
                <dt className="eyebrow">{k}</dt>
                <dd className="mt-2 font-display text-2xl">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
    </>
  );
}

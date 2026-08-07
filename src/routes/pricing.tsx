import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { PageHeader, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { packages } from "@/data/webrya";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Webrya Packages — One-time Solutions for Hosts" },
      {
        name: "description",
        content:
          "Professional one-time Webrya packages for Airbnb hosts, co-hosts and property managers. Starter $99, Professional $299, Business from $699.",
      },
      { property: "og:title", content: "Webrya Packages — One-time Solutions for Hosts" },
      {
        property: "og:description",
        content: "One-time professional setups. No monthly subscription.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pricing,
});

const faqs = [
  {
    q: "Is this a monthly subscription?",
    a: "No. Webrya packages are one-time professional solutions. You pay once for the setup and keep what's built.",
  },
  {
    q: "What's the difference between a package and a digital product?",
    a: "Digital products are downloadable systems you use yourself. Packages are done-for-you setups — your landing page, branding, tools and dashboard configured by Webrya.",
  },
  {
    q: "Can I start free?",
    a: "Yes. The AI tools are free and always will be. Most hosts start there and upgrade when they need more.",
  },
  {
    q: "Do you work with property managers?",
    a: "Yes — the Business package covers multiple properties, multiple users and white-label options.",
  },
];

function Pricing() {
  return (
    <>
      <PageHeader
        eyebrow="Webrya Packages"
        title="Professional solutions, paid once."
        intro="Webrya isn't sold as a monthly seat. Choose the level of solution your hosting business needs and it's built for you."
      />

      <Section className="py-14 lg:py-20">
        <div className="grid items-start gap-5 lg:grid-cols-3">
          {packages.map((p) => (
            <div
              key={p.slug}
              className={
                "flex flex-col rounded-xl p-8 " +
                (p.recommended
                  ? "bg-ink text-ink-foreground shadow-[var(--shadow-lift)] lg:-mt-4 lg:pb-12"
                  : "border border-border bg-card")
              }
            >
              {p.recommended && <p className="eyebrow text-accent">Recommended</p>}
              <h2 className="mt-1 text-2xl">{p.name}</h2>
              <p
                className={
                  "mt-2 text-sm leading-relaxed " +
                  (p.recommended ? "opacity-80" : "text-muted-foreground")
                }
              >
                {p.audience}
              </p>
              <p className="mt-7 font-display text-4xl">{p.price}</p>
              <p className={"mt-1 text-xs " + (p.recommended ? "opacity-70" : "text-muted-foreground")}>
                {p.note}
              </p>
              <ul className="mt-7 flex-1 space-y-3">
                {p.includes.map((i) => (
                  <li key={i} className="flex gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    {i}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                variant={p.recommended ? "secondary" : "outline"}
                className="mt-8 w-full"
              >
                <Link to="/login">Get started</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-xl border border-border bg-surface p-8 lg:p-12">
          <h2 className="text-2xl">Questions hosts ask first</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="text-base font-medium">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

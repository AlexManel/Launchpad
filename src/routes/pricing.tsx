import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { PageHeader, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { packages } from "@/data/webrya";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Webrya Solutions — One-time Setups for Hosts" },
      {
        name: "description",
        content:
          "One-time professional Webrya solutions for short-term rental hosts and property managers. Host Starter $99, Host Pro $299, Business from $699.",
      },
      { property: "og:title", content: "Webrya Solutions — One-time Setups for Hosts" },
      {
        property: "og:description",
        content: "One-time professional Webrya solutions. No mandatory subscription.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pricing,
});

const faqs = [
  {
    q: "Is Webrya a subscription?",
    a: "No. Webrya's core products and professional solutions are designed as one-time purchases. There is no mandatory monthly subscription.",
  },
  {
    q: "Is Webrya just ChatGPT for Airbnb?",
    a: "No. Webrya combines specialized hosting workflows, structured prompts, ready-made systems and practical tools designed around real short-term rental tasks.",
  },
  {
    q: "Do I need an account to use the AI tools?",
    a: "You can try your first generation without creating an account. A free Webrya account lets you save your work and access your Workspace.",
  },
  {
    q: "What happens after I buy a digital product?",
    a: "Your purchase is connected to your Webrya account and becomes available inside your Webrya Workspace.",
  },
  {
    q: "What's the difference between a solution and a digital product?",
    a: "Digital products are ready-made systems you use yourself. Professional solutions are complete setups — your branded property page, guidebook, AI toolkit and Workspace, configured by Webrya.",
  },
  {
    q: "Do you work with property managers?",
    a: "Yes — Webrya Business covers multiple properties, multiple users and white-label options.",
  },
];

function Pricing() {
  return (
    <>
      <PageHeader
        eyebrow="Professional Webrya Solutions"
        title="Professional solutions, paid once."
        intro="Webrya isn't sold as a monthly seat. Choose the level of solution your hosting business needs and it's set up for you as a one-time professional Webrya solution."
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

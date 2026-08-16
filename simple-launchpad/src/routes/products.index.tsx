import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";

import { PageHeader, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { products } from "@/data/webrya";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Digital Products for Airbnb Hosts — Webrya" },
      {
        name: "description",
        content:
          "One-time digital products for short-term rental hosts: AirCover Suite, Review Protection Suite, Guest Communication Suite and the Ultimate Host Bundle. Pay once. Own it.",
      },
      { property: "og:title", content: "Digital Products for Airbnb Hosts — Webrya" },
      {
        property: "og:description",
        content: "Templates, checklists and AI prompt systems. Pay once. Own it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  const standard = products.filter((p) => !p.featured);
  const bundle = products.find((p) => p.featured)!;

  return (
    <>
      <PageHeader
        eyebrow="Digital Products · Pay once. Own it."
        title="Ready-to-use systems for hosts who want it handled."
        intro="Every product is a one-time purchase with lifetime access. No mandatory subscription, no seats, no renewal emails."
      />

      <Section className="py-14 lg:py-20">
        <div className="grid gap-5 lg:grid-cols-3">
          {standard.map((p) => (
            <div key={p.slug} className="flex flex-col rounded-xl border border-border bg-card p-7">
              <h2 className="text-xl">{p.name}</h2>
              <p className="mt-2 text-sm text-accent">{p.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <ul className="mt-6 space-y-2.5">
                {p.includes.map((i) => (
                  <li key={i} className="flex gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    {i}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-7">
                <p className="font-display text-3xl">{p.priceLabel}</p>
                <p className="mt-1 text-xs text-muted-foreground">Pay once. Own it.</p>
                <Button asChild className="mt-4 w-full">
                  <Link to="/products/$slug" params={{ slug: p.slug }}>
                    Get Access
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl bg-ink text-ink-foreground">
          <div className="grid gap-10 p-9 lg:grid-cols-[1.2fr_1fr] lg:p-12">
            <div>
              <p className="eyebrow text-accent">Best value · complete library</p>
              <h2 className="mt-4 text-4xl leading-tight">{bundle.name}</h2>
              <p className="mt-4 max-w-xl leading-relaxed opacity-80">{bundle.description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <span className="font-display text-4xl">{bundle.priceLabel}</span>
                <span className="text-sm opacity-70">
                  <s>$117 separately</s> · save $18 · lifetime updates
                </span>
              </div>
              <Button asChild size="lg" variant="secondary" className="mt-7">
                <Link to="/products/$slug" params={{ slug: bundle.slug }}>
                  Get Access <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <ul className="grid content-start gap-3 rounded-xl bg-ink-foreground/5 p-7">
              {bundle.includes.map((i) => (
                <li key={i} className="flex gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}

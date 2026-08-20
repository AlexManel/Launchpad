import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Download, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";
import { products } from "@/data/webrya";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { name: product.name, tagline: product.tagline };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found — Webrya" }, { name: "robots", content: "noindex" }],
      };
    }
    return {
      meta: [
        { title: `${loaderData.name} — Webrya Digital Products` },
        { name: "description", content: loaderData.tagline },
        { property: "og:title", content: `${loaderData.name} — Webrya` },
        { property: "og:description", content: loaderData.tagline },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = products.find((p) => p.slug === slug)!;
  const [checkout, setCheckout] = useState(false);

  return (
    <>
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> All digital products
          </Link>
          <p className="eyebrow mt-6">One-time purchase</p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </div>
      </div>

      <Section className="py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-2xl">What's included</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {product.includes.map((i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-lg border border-border bg-card px-4 py-3.5 text-sm"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  {i}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl">How hosts use it</h2>
            <ol className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">1. Download instantly.</span> Files
                arrive in your Webrya Workspace the moment checkout completes.
              </li>
              <li>
                <span className="font-medium text-foreground">2. Adapt once.</span> Swap in your
                property name, tone and policies — everything is fully editable.
              </li>
              <li>
                <span className="font-medium text-foreground">3. Reuse forever.</span> Keep it as
                your standard operating material across every listing you run.
              </li>
            </ol>
          </div>

          <aside className="h-fit rounded-xl border border-border bg-card p-7 lg:sticky lg:top-24">
            <p className="font-display text-4xl">{product.priceLabel}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              One-time payment · lifetime access
            </p>
            <p className="mt-5 text-sm text-muted-foreground">{product.format}</p>

            {checkout ? (
              <div className="mt-6 rounded-lg border border-dashed border-border bg-surface p-5 text-sm">
                <p className="font-medium">Coming soon</p>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  One-time checkout is not connected yet. While we finish payments, use the free
                  AI tools and Webrya Workspace — products will unlock here after purchase.
                </p>
                <Button asChild variant="outline" className="mt-4 w-full">
                  <Link to="/portal">Preview in Webrya Workspace</Link>
                </Button>
              </div>
            ) : (
              <Button
                size="lg"
                className="mt-6 w-full"
                onClick={() => {
                  setCheckout(true);
                  toast.message("Payments are not connected yet — early access coming soon.");
                }}
              >
                Get Access
              </Button>
            )}

            <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex gap-2.5">
                <Download className="mt-0.5 size-4 shrink-0" /> Instant delivery
              </li>
              <li className="flex gap-2.5">
                <ShieldCheck className="mt-0.5 size-4 shrink-0" /> Free updates included
              </li>
            </ul>
          </aside>
        </div>
      </Section>
    </>
  );
}

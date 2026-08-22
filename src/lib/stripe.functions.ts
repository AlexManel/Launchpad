import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { products } from "@/data/webrya";

const PRICE_ENV: Record<string, string> = {
  "aircover-suite": "STRIPE_PRICE_AIRCOVER",
  "review-protection-suite": "STRIPE_PRICE_REVIEW",
  "guest-communication-suite": "STRIPE_PRICE_GUEST",
  "ultimate-host-bundle": "STRIPE_PRICE_BUNDLE",
};

export const getPaymentsStatus = createServerFn({ method: "POST" }).handler(async () => {
  const secret = process.env.STRIPE_SECRET_KEY?.trim();
  return { enabled: Boolean(secret) };
});

export const createCheckoutSession = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z.object({ slug: z.string(), accessToken: z.string().optional() }).parse(input),
  )
  .handler(async ({ data }) => {
    const secret = process.env.STRIPE_SECRET_KEY?.trim();
    if (!secret) {
      throw new Error("Stripe is not connected yet.");
    }

    const product = products.find((p) => p.slug === data.slug);
    if (!product) throw new Error("Unknown product.");

    const priceId = process.env[PRICE_ENV[data.slug] ?? ""]?.trim();
    const origin = process.env.WEBRYA_URL?.replace(/\/$/, "") || "https://webrya.com";

    const body = new URLSearchParams();
    body.set("mode", "payment");
    body.set("success_url", `${origin}/portal?purchase=success&product=${product.slug}`);
    body.set("cancel_url", `${origin}/products/${product.slug}`);
    body.set("allow_promotion_codes", "true");
    body.set("client_reference_id", product.slug);
    if (data.accessToken) {
      // Store so a later webhook can attach the purchase to the user
      body.set("metadata[product_slug]", product.slug);
    }

    if (priceId) {
      body.set("line_items[0][price]", priceId);
      body.set("line_items[0][quantity]", "1");
    } else {
      body.set("line_items[0][quantity]", "1");
      body.set("line_items[0][price_data][currency]", "usd");
      body.set("line_items[0][price_data][unit_amount]", String(product.price * 100));
      body.set("line_items[0][price_data][product_data][name]", product.name);
      body.set(
        "line_items[0][price_data][product_data][description]",
        product.tagline,
      );
    }

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const json = (await res.json()) as { id?: string; url?: string; error?: { message?: string } };
    if (!res.ok || !json.url) {
      throw new Error(json.error?.message || "Could not start checkout.");
    }
    return { url: json.url };
  });

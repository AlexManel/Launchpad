import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { products } from "@/data/webrya";

const PRICE_ENV: Record<string, string> = {
  "aircover-suite": "STRIPE_PRICE_AIRCOVER",
  "review-protection-suite": "STRIPE_PRICE_REVIEW",
  "guest-communication-suite": "STRIPE_PRICE_GUEST",
  "ultimate-host-bundle": "STRIPE_PRICE_BUNDLE",
};

function supabaseRest() {
  const url = (
    process.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
    ""
  ).replace(/\/$/, "");
  const anon =
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
    "";
  return { url, anon };
}

async function alreadyOwns(opts: {
  url: string;
  anon: string;
  accessToken: string;
  userId: string;
  slug: string;
}) {
  const res = await fetch(
    `${opts.url}/rest/v1/purchases?user_id=eq.${opts.userId}&product_slug=eq.${opts.slug}&status=eq.paid&select=id`,
    {
      headers: {
        Authorization: `Bearer ${opts.accessToken}`,
        apikey: opts.anon,
      },
    },
  );
  if (!res.ok) return false;
  const rows = (await res.json()) as { id: string }[];
  return Array.isArray(rows) && rows.length > 0;
}

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

    if (data.accessToken) {
      const { resolveAuthedUser } = await import("@/lib/ai/quota.server");
      const user = await resolveAuthedUser(data.accessToken);
      const { url, anon } = supabaseRest();
      if (user && url && anon) {
        const owned = await alreadyOwns({
          url,
          anon,
          accessToken: data.accessToken,
          userId: user.id,
          slug: product.slug,
        });
        if (owned) {
          throw new Error("You already own this product. Open Workspace to download it.");
        }
      }
    }

    const priceId = process.env[PRICE_ENV[data.slug] ?? ""]?.trim();
    const origin = process.env.WEBRYA_URL?.replace(/\/$/, "") || "https://webrya.com";

    const body = new URLSearchParams();
    body.set("mode", "payment");
    body.set(
      "success_url",
      `${origin}/portal?purchase=success&session_id={CHECKOUT_SESSION_ID}`,
    );
    body.set("cancel_url", `${origin}/products/${product.slug}`);
    body.set("allow_promotion_codes", "true");
    body.set("client_reference_id", product.slug);
    body.set("metadata[product_slug]", product.slug);

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

export const fulfillPurchase = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z.object({ sessionId: z.string().min(1), accessToken: z.string().min(1) }).parse(input),
  )
  .handler(async ({ data }) => {
    const secret = process.env.STRIPE_SECRET_KEY?.trim();
    if (!secret) throw new Error("Stripe is not connected yet.");

    const sessionRes = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(data.sessionId)}`,
      { headers: { Authorization: `Bearer ${secret}` } },
    );
    const session = (await sessionRes.json()) as {
      id?: string;
      payment_status?: string;
      amount_total?: number;
      currency?: string;
      client_reference_id?: string;
      metadata?: { product_slug?: string };
      error?: { message?: string };
    };
    if (!sessionRes.ok) {
      throw new Error(session.error?.message || "Could not verify payment.");
    }
    if (session.payment_status !== "paid") {
      throw new Error("Payment is not complete yet.");
    }

    const slug = session.metadata?.product_slug || session.client_reference_id;
    if (!slug) throw new Error("Missing product on this payment.");

    const { resolveAuthedUser } = await import("@/lib/ai/quota.server");
    const user = await resolveAuthedUser(data.accessToken);
    if (!user) throw new Error("Sign in to unlock this purchase in your Workspace.");

    const { url, anon } = supabaseRest();
    if (!url || !anon) throw new Error("Database is not connected.");

    const owned = await alreadyOwns({
      url,
      anon,
      accessToken: data.accessToken,
      userId: user.id,
      slug,
    });
    if (owned) {
      return { slug, unlocked: true, alreadyOwned: true };
    }

    const insert = await fetch(`${url}/rest/v1/purchases?on_conflict=user_id,product_slug`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
        apikey: anon,
        "Content-Type": "application/json",
        Prefer: "return=representation,resolution=merge-duplicates",
      },
      body: JSON.stringify({
        user_id: user.id,
        product_slug: slug,
        stripe_session_id: session.id,
        amount_cents: session.amount_total ?? null,
        currency: session.currency ?? "usd",
        status: "paid",
      }),
    });

    if (!insert.ok) {
      const errText = await insert.text();
      const stillOwned = await alreadyOwns({
        url,
        anon,
        accessToken: data.accessToken,
        userId: user.id,
        slug,
      });
      if (stillOwned || errText.toLowerCase().includes("duplicate") || insert.status === 409) {
        return { slug, unlocked: true, alreadyOwned: true };
      }
      throw new Error("Payment succeeded, but unlocking the product failed. Contact support.");
    }

    return { slug, unlocked: true };
  });

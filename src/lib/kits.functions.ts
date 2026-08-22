import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getProductKit } from "@/data/kits";
import { resolveAuthedUser } from "@/lib/ai/quota.server";

function supabaseEnv() {
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

export const downloadProductKit = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z.object({ slug: z.string(), accessToken: z.string().min(1) }).parse(input),
  )
  .handler(async ({ data }) => {
    const kit = getProductKit(data.slug);
    if (!kit) throw new Error("Unknown product.");

    const user = await resolveAuthedUser(data.accessToken);
    if (!user) throw new Error("Sign in to download.");

    const { url, anon } = supabaseEnv();
    if (!url || !anon) throw new Error("Database is not connected.");

    const res = await fetch(
      `${url}/rest/v1/purchases?user_id=eq.${user.id}&status=eq.paid&select=product_slug`,
      {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
          apikey: anon,
        },
      },
    );
    if (!res.ok) throw new Error("Could not verify purchase.");
    const rows = (await res.json()) as { product_slug: string }[];
    const owned = new Set(rows.map((r) => r.product_slug));
    const allowed =
      owned.has(data.slug) ||
      (owned.has("ultimate-host-bundle") && data.slug !== "ultimate-host-bundle");
    if (!allowed) {
      throw new Error("This product is not unlocked on your account.");
    }

    return kit;
  });

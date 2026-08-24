import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const submitContact = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        name: z.string().trim().min(2).max(120),
        email: z.string().trim().email().max(160),
        company: z.string().trim().max(160).optional().or(z.literal("")),
        topic: z.string().trim().max(80).optional().or(z.literal("")),
        message: z.string().trim().min(10).max(4000),
        locale: z.string().trim().max(8).optional(),
        website: z.string().max(80).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    if (data.website) return { ok: true };

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
    if (!url || !anon) throw new Error("Contact form is not connected yet.");

    const res = await fetch(`${url}/rest/v1/contact_messages`, {
      method: "POST",
      headers: {
        apikey: anon,
        Authorization: `Bearer ${anon}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        company: data.company || null,
        topic: data.topic || null,
        message: data.message,
        locale: data.locale || null,
      }),
    });

    if (!res.ok) {
      throw new Error("Could not send the message. Try again in a moment.");
    }
    return { ok: true };
  });

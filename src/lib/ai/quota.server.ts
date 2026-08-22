const COOKIE = "webrya_ai_uses";
export const FREE_AI_LIMIT = 3;
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

async function serverApi() {
  return import("@tanstack/react-start/server");
}

function parseCount(raw: string | undefined): number {
  const n = Number.parseInt(raw ?? "0", 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function readNamedCookie(header: string, name: string): string | undefined {
  const parts = header.split(/;\s*/);
  for (const part of parts) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() === name) return decodeURIComponent(part.slice(eq + 1));
  }
  return undefined;
}

export async function getAnonymousUses(): Promise<number> {
  try {
    const api = await serverApi();
    const header =
      (typeof api.getRequestHeader === "function"
        ? api.getRequestHeader("cookie")
        : api.getWebRequest?.().headers.get("cookie")) ?? "";
    return parseCount(readNamedCookie(String(header), COOKIE));
  } catch {
    return 0;
  }
}

export async function setAnonymousUses(count: number): Promise<void> {
  const value = String(Math.max(0, count));
  const cookie = `${COOKIE}=${value}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; SameSite=Lax; Secure`;
  try {
    const api = await serverApi();
    if (typeof api.setCookie === "function") {
      api.setCookie(COOKIE, value, {
        path: "/",
        maxAge: MAX_AGE,
        httpOnly: true,
        sameSite: "lax",
        secure: true,
      });
      return;
    }
    if (typeof api.setResponseHeader === "function") {
      api.setResponseHeader("Set-Cookie", cookie);
    }
  } catch {
    /* ignore */
  }
}

export async function resolveAuthedUser(accessToken?: string) {
  const token = accessToken?.trim();
  if (!token) return null;
  const url = (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "").replace(/\/$/, "");
  const anon = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";
  if (!url || !anon) return null;
  try {
    const res = await fetch(`${url}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: anon,
      },
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { id?: string };
    return body.id ? { id: body.id } : null;
  } catch {
    return null;
  }
}

export async function assertFreeQuota(accessToken?: string) {
  const user = await resolveAuthedUser(accessToken);
  if (user) {
    return { unlimited: true as const, remaining: null, userId: user.id };
  }
  const used = await getAnonymousUses();
  if (used >= FREE_AI_LIMIT) {
    throw new Error(
      `Free limit reached (${FREE_AI_LIMIT} previews). Sign in to keep using Webrya AI tools.`,
    );
  }
  return { unlimited: false as const, remaining: FREE_AI_LIMIT - used, userId: null };
}

export async function consumeAnonymousUse() {
  const used = await getAnonymousUses();
  const next = used + 1;
  await setAnonymousUses(next);
  return { remaining: Math.max(0, FREE_AI_LIMIT - next) };
}

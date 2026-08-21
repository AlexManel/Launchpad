/**
 * Fetch public listing page text for Listing Optimizer.
 * Best-effort only — many sites block bots; then the host should paste text.
 */

const MAX_CHARS = 12000;
const TIMEOUT_MS = 12000;

function isHttpUrl(value: string): boolean {
  try {
    const u = new URL(value.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export async function resolveListingInput(input: string): Promise<{
  text: string;
  fromUrl: boolean;
  sourceUrl?: string;
  warning?: string;
}> {
  const trimmed = input.trim();

  if (!isHttpUrl(trimmed)) {
    return { text: trimmed, fromUrl: false };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(trimmed, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; WebryaBot/1.0; +https://webrya.com)",
        Accept: "text/html,application/xhtml+xml",
      },
    });

    if (!res.ok) {
      return {
        text: trimmed,
        fromUrl: true,
        sourceUrl: trimmed,
        warning: `Could not load the link (HTTP ${res.status}). Paste the listing title and description as text instead.`,
      };
    }

    const html = await res.text();
    let text = stripHtml(html);

    if (text.length < 80) {
      return {
        text: trimmed,
        fromUrl: true,
        sourceUrl: trimmed,
        warning:
          "The page returned almost no readable text (often blocked). Paste the listing text manually.",
      };
    }

    if (text.length > MAX_CHARS) {
      text = text.slice(0, MAX_CHARS) + "…";
    }

    return {
      text: `Source URL: ${trimmed}\n\nExtracted listing page text:\n${text}`,
      fromUrl: true,
      sourceUrl: trimmed,
    };
  } catch {
    return {
      text: trimmed,
      fromUrl: true,
      sourceUrl: trimmed,
      warning:
        "Could not open this link (blocked, timeout, or private page). Paste the listing title and description as text.",
    };
  } finally {
    clearTimeout(timer);
  }
}

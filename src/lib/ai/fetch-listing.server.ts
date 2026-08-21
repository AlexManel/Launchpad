/**
 * Fetch public listing page text for Listing Optimizer.
 * Best-effort — Booking/Airbnb often block full HTML; meta/JSON-LD still help.
 */

const MAX_CHARS = 14000;
const TIMEOUT_MS = 15000;

function isHttpUrl(value: string): boolean {
  try {
    const u = new URL(value.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function metaContent(html: string, key: string): string {
  const patterns = [
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']+)["']`,
      "i"
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${key}["']`,
      "i"
    ),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) return decodeEntities(m[1]);
  }
  return "";
}

function extractJsonLd(html: string): string {
  const blocks: string[] = [];
  const re =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const raw = m[1]?.trim();
    if (raw && raw.length > 20) blocks.push(raw.slice(0, 8000));
  }
  return blocks.join("\n\n");
}

function stripHtml(html: string): string {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  );
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
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9,el;q=0.8",
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
    const title = metaContent(html, "og:title") || metaContent(html, "twitter:title");
    const description =
      metaContent(html, "og:description") ||
      metaContent(html, "description") ||
      metaContent(html, "twitter:description");
    const jsonLd = extractJsonLd(html);
    const body = stripHtml(html);

    const parts: string[] = [`Source URL: ${trimmed}`];
    if (title) parts.push(`Page title: ${title}`);
    if (description) parts.push(`Page description: ${description}`);
    if (jsonLd) parts.push(`Structured data (JSON-LD):\n${jsonLd}`);
    if (body.length >= 80) {
      parts.push(
        `Extracted listing page text:\n${body.slice(0, MAX_CHARS)}${
          body.length > MAX_CHARS ? "…" : ""
        }`
      );
    }

    const combined = parts.join("\n\n");
    const useful =
      (title ? title.length : 0) +
      (description ? description.length : 0) +
      (jsonLd ? Math.min(jsonLd.length, 500) : 0) +
      (body.length >= 80 ? body.length : 0);

    if (useful < 60) {
      return {
        text: trimmed,
        fromUrl: true,
        sourceUrl: trimmed,
        warning:
          "This site blocked readable listing content (common on Booking/Airbnb). Paste the title and full description as text for accurate optimization.",
      };
    }

    return {
      text: combined,
      fromUrl: true,
      sourceUrl: trimmed,
      warning:
        body.length < 80
          ? "Full page body was limited; used title/description/structured data from the link. For best results, also paste the full listing text."
          : undefined,
    };
  } catch {
    return {
      text: trimmed,
      fromUrl: true,
      sourceUrl: trimmed,
      warning:
        "Could not open this link (blocked, timeout, or private). Paste the listing title and description as text.",
    };
  } finally {
    clearTimeout(timer);
  }
}
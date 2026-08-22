import * as aircover from "./aircover-suite";
import * as guest from "./guest-communication-suite";
import * as review from "./review-protection-suite";

export type ProductKit = { filename: string; markdown: string };

const kits: Record<string, ProductKit> = {
  "aircover-suite": aircover,
  "review-protection-suite": review,
  "guest-communication-suite": guest,
};

export function getProductKit(slug: string): ProductKit | null {
  if (slug === "ultimate-host-bundle") {
    return {
      filename: "Webrya-Ultimate-Host-Bundle.md",
      markdown: [aircover, review, guest]
        .map((k) => k.markdown)
        .join("\n\n---\n\n"),
    };
  }
  return kits[slug] ?? null;
}

export const kitSlugs = Object.keys(kits);

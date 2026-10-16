import {
  filename as aircoverFilename,
  markdown as aircoverMarkdown,
} from "./aircover-suite";
import {
  filename as guestFilename,
  markdown as guestMarkdown,
} from "./guest-communication-suite";
import {
  filename as reviewFilename,
  markdown as reviewMarkdown,
} from "./review-protection-suite";

export type ProductKit = { filename: string; markdown: string };

const aircover: ProductKit = { filename: aircoverFilename, markdown: aircoverMarkdown };
const guest: ProductKit = { filename: guestFilename, markdown: guestMarkdown };
const review: ProductKit = { filename: reviewFilename, markdown: reviewMarkdown };

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

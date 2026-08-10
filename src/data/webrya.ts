export type Tool = {
  slug: string;
  name: string;
  short: string;
  description: string;
  icon: "star" | "message" | "sparkles" | "scroll" | "key";
  inputLabel: string;
  placeholder: string;
  secondaryLabel?: string;
  secondaryPlaceholder?: string;
};

export const tools: Tool[] = [
  {
    slug: "review-response-generator",
    name: "Review Response Generator",
    short: "Generate professional responses to Airbnb guest reviews.",
    description:
      "Paste any guest review and get a calm, professional public response that protects your listing's reputation and reads like a real host wrote it.",
    icon: "star",
    inputLabel: "Paste the guest review",
    placeholder: "The apartment was lovely but check-in was confusing and the wifi dropped twice…",
    secondaryLabel: "Guest name (optional)",
    secondaryPlaceholder: "Marta",

  },
  {
    slug: "guest-reply-generator",
    name: "Guest Reply Generator",
    short: "Create fast, professional replies to guest questions and requests.",
    description:
      "Turn a guest message into a warm, clear reply in seconds — early check-in, late checkout, extra guests, refunds and everything in between.",
    icon: "message",
    inputLabel: "Paste the guest message",
    placeholder: "Hi! Would it be possible to check in around 11am instead of 3pm?",
    secondaryLabel: "Your answer / policy",
    secondaryPlaceholder: "Early check-in possible from 1pm for €25",
    sample: (input, extra) =>
      `Hi there, thanks so much for reaching out ahead of your stay.\n\n${extra ? `${extra}. ` : ""}I'll do my best to accommodate you — the cleaning team finishes in the early afternoon, so I can confirm the earliest possible arrival the day before your trip. If it works out, I'll send the door code straight to this chat.\n\nIn the meantime, you're welcome to drop your luggage in the building's entrance storage.\n\nLooking forward to hosting you.`,
  },
  {
    slug: "listing-optimizer",
    name: "Airbnb Listing Optimizer",
    short: "Improve listing titles and descriptions.",
    description:
      "Rewrite your title and description so they lead with what guests actually search for, without sounding like a generic ad.",
    icon: "sparkles",
    inputLabel: "Current listing title & description",
    placeholder: "Nice apartment in the city center, 2 bedrooms, near everything…",
    secondaryLabel: "Location & standout feature",
    secondaryPlaceholder: "Lisbon, Alfama — rooftop terrace with river view",
    sample: (input, extra) =>
      `SUGGESTED TITLE\nSunlit 2-Bed with Rooftop Terrace · 6 min to Old Town\n\nOPENING LINE\nA quiet, light-filled apartment${extra ? ` in ${extra.split("—")[0]!.trim()}` : ""} — designed for travellers who want to be central without losing a good night's sleep.\n\nDESCRIPTION\nTwo proper bedrooms with blackout curtains, a full kitchen, fast 300 Mbps wifi and a dedicated desk. The private terrace catches afternoon sun and is set up for slow dinners.\n\nWHY GUESTS BOOK IT\n· Self check-in, 24/7\n· Walkable to transport, cafés and the historic centre\n· Workspace that actually works\n\nSEARCH KEYWORDS TO KEEP\nfamily friendly · self check-in · workspace · terrace · central`,
  },
  {
    slug: "house-rules-generator",
    name: "House Rules Generator",
    short: "Generate professional house rules for a property.",
    description:
      "Clear, firm and friendly rules that reduce damage disputes without scaring guests away at the booking stage.",
    icon: "scroll",
    inputLabel: "Property type & key constraints",
    placeholder: "2-bed apartment, residential building, no parties, no pets, quiet hours after 22:00",
  },
  {
    slug: "welcome-message-generator",
    name: "Welcome Message Generator",
    short: "Create personalized guest welcome messages.",
    description:
      "A first message that sets the tone, delivers the practical details and quietly earns you a five-star communication rating.",
    icon: "key",
    inputLabel: "Property name & location",
    placeholder: "Casa Oliva, Athens — Koukaki",
    secondaryLabel: "Guest name (optional)",
    secondaryPlaceholder: "James",
    sample: (input, extra) =>
      `Hi${extra ? ` ${extra}` : ""}, welcome — we're really glad you're staying with us.\n\n${input || "The apartment"} is ready for you. You'll find the full arrival details, door code and wifi password in the guidebook link below, plus a short list of the places we actually go to ourselves: the bakery on the corner, the wine bar two streets down and the quietest rooftop nearby.\n\nIf anything at all comes up during your stay, message here — we usually reply within minutes.\n\nHave a wonderful trip.`,
  },
];

export type Product = {
  slug: string;
  name: string;
  price: number;
  priceLabel: string;
  tagline: string;
  description: string;
  includes: string[];
  featured?: boolean;
  format: string;
};

export const products: Product[] = [
  {
    slug: "aircover-suite",
    name: "AirCover Suite",
    price: 39,
    priceLabel: "$39 one-time",

    tagline: "Prepare and win damage claims.",
    description:
      "A collection of templates, checklists and AI prompts designed to help hosts prepare and organize Airbnb damage claims — documented properly, submitted on time, argued clearly.",
    includes: [
      "Damage claim templates",
      "Photo evidence checklist",
      "Claim prompts",
      "Appeal templates",
    ],
    format: "12 templates · 3 checklists · 18 AI prompts",
  },
  {
    slug: "review-protection-suite",
    name: "Review Protection Suite",
    price: 39,
    priceLabel: "$39 one-time",
    tagline: "Defend your rating, respond with authority.",
    description:
      "Everything needed to handle an unfair review calmly: analyse what actually happened, respond publicly without escalating, and escalate to Airbnb when the review breaks policy.",
    includes: [
      "Bad review analyzer",
      "Review response templates",
      "Appeal templates",
      "AI prompts",
    ],
    format: "1 analyzer framework · 20 response templates · 14 AI prompts",
  },
  {
    slug: "guest-communication-suite",
    name: "Guest Communication Suite",
    price: 39,
    priceLabel: "$39 one-time",
    tagline: "Every message you'll ever need to send.",
    description:
      "A complete message library covering the whole guest lifecycle, from the booking confirmation to the awkward conversations most hosts improvise badly.",
    includes: [
      "Guest message templates",
      "Complaint responses",
      "Cancellation responses",
      "Check-in / check-out messages",
      "Emergency communication templates",
    ],
    format: "60+ messages · 5 categories · editable in any tool",
  },
  {
    slug: "ultimate-host-bundle",
    name: "Ultimate Host Bundle",
    price: 99,
    priceLabel: "$99 one-time",
    tagline: "$117 separately · $99 bundle · save $18.",
    description:
      "Every major Webrya digital product together, plus the bundle-only operations material. Pay once. Own it.",
    includes: [
      "AirCover Suite",
      "Review Protection Suite",
      "Guest Communication Suite",
      "Listing optimization workbook",
      "Turnover & cleaning SOPs",
      "Lifetime updates",
    ],
    featured: true,
    format: "Everything above · lifetime access · free future additions",
  },

];

export type Pkg = {
  slug: string;
  name: string;
  price: string;
  note: string;
  audience: string;
  includes: string[];
  cta: string;
  badge?: string;
  recommended?: boolean;
};

export const packages: Pkg[] = [
  {
    slug: "host-starter",
    name: "Webrya Host Starter",
    price: "$99",
    note: "One-time setup",
    audience: "Launch your digital hosting hub.",
    includes: [
      "Branded property landing page",
      "Digital guidebook",
      "3 Webrya AI tools",
      "Ready-to-use host resources",
      "Webrya setup",
    ],
    cta: "Get Started",
  },
  {
    slug: "host-pro",
    name: "Webrya Host Pro",
    price: "$299",
    note: "One-time setup",
    audience: "Turn your property into a professional digital experience.",
    includes: [
      "Premium custom website",
      "Custom branding & copy",
      "Full Webrya AI toolkit",
      "Digital guidebook",
      "Webrya Workspace setup",
      "Property-specific resources",
      "Priority setup",
    ],
    cta: "Choose Host Pro",
    badge: "Most Popular",
    recommended: true,
  },
  {
    slug: "business",
    name: "Webrya Business",
    price: "Starting at $699",
    note: "One-time professional setup",
    audience: "Build a digital system for your property operation.",
    includes: [
      "Multiple properties",
      "Multiple users",
      "Centralized Webrya Workspace",
      "Custom branding",
      "White-label options",
      "Advanced configuration",
      "Priority support",
    ],
    cta: "Talk to Webrya",
  },
];


export type Resource = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
};

export const resourceCategories = [
  "Airbnb hosting guides",
  "AI for Airbnb hosts",
  "Guest communication",
  "Review management",
  "Property management",
];

export const resources: Resource[] = [
  {
    slug: "airbnb-hosting-checklist",
    title: "The complete Airbnb hosting setup checklist",
    category: "Airbnb hosting guides",
    excerpt:
      "From listing photography to your first turnover: the operational checklist experienced hosts run before going live.",
    readTime: "11 min",
  },
  {
    slug: "pricing-strategy-basics",
    title: "Pricing your short-term rental without a race to the bottom",
    category: "Airbnb hosting guides",
    excerpt:
      "Why discounting is the slowest way to fill a calendar, and what to adjust first when occupancy dips.",
    readTime: "8 min",
  },
  {
    slug: "ai-prompts-for-hosts",
    title: "12 AI prompts every Airbnb host should have saved",
    category: "AI for Airbnb hosts",
    excerpt:
      "Copy-ready prompts for reviews, guest messages, listing copy and claim documentation.",
    readTime: "7 min",
  },
  {
    slug: "automate-guest-messaging",
    title: "How to automate guest messaging without sounding automated",
    category: "AI for Airbnb hosts",
    excerpt:
      "The three message points worth automating, and the two you should always write yourself.",
    readTime: "9 min",
  },
  {
    slug: "handling-difficult-guests",
    title: "Handling difficult guests: scripts that de-escalate",
    category: "Guest communication",
    excerpt:
      "What to say when a guest complains at midnight, demands a refund, or brings extra people.",
    readTime: "10 min",
  },
  {
    slug: "check-in-experience",
    title: "Designing a check-in experience guests mention in reviews",
    category: "Guest communication",
    excerpt: "Small details that consistently turn a four-star arrival into a five-star one.",
    readTime: "6 min",
  },
  {
    slug: "removing-unfair-reviews",
    title: "When Airbnb will actually remove a review",
    category: "Review management",
    excerpt:
      "The policy grounds that work, the evidence required, and how to write the appeal.",
    readTime: "12 min",
  },
  {
    slug: "responding-to-bad-reviews",
    title: "How to respond publicly to a bad review",
    category: "Review management",
    excerpt: "A four-part structure that reassures future guests instead of arguing with past ones.",
    readTime: "7 min",
  },
  {
    slug: "scaling-to-five-properties",
    title: "Scaling from one property to five without losing quality",
    category: "Property management",
    excerpt: "The systems, SOPs and handovers that keep standards steady as the portfolio grows.",
    readTime: "13 min",
  },
  {
    slug: "cohost-agreements",
    title: "Co-host agreements: what to put in writing",
    category: "Property management",
    excerpt: "Fee structures, responsibilities and exit terms, explained with real examples.",
    readTime: "9 min",
  },
];

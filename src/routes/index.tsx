import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Check,
  FileText,
  LayoutDashboard,
  Mail,
  MessageCircle,
  Package,
  Sparkles,
  Workflow,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";
import { HeroMedia } from "@/components/site/HeroMedia";
import { tools, products } from "@/data/webrya";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Webrya — Run your properties smarter" },
      {
        name: "description",
        content:
          "AI toolkit for Airbnb hosts: guest replies, review responses with host notes, and listing optimization. Not a PMS.",
      },
      { property: "og:title", content: "Webrya — Run your properties smarter" },
      {
        property: "og:description",
        content:
          "AI toolkit for Airbnb hosts: messages, reviews and listing optimization. Not a PMS.",
      },
      { property: "og:url", content: "https://webrya.com/" },
      { property: "og:image", content: "https://webrya.com/villa.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://webrya.com/" }],
  }),
  component: Home,
});

const terraceImage = "/terrace.jpg";
const workspaceImage = "/desk.jpg";
const villaImage = "/villa.jpg";
const bedroomImage = "/bedroom.jpg";
const kitchenImage = "/kitchen.jpg";
const welcomeImage = "/welcome.jpg";

const productImages: Record<string, string> = {
  "aircover-suite": welcomeImage,
  "review-protection-suite": workspaceImage,
  "guest-communication-suite": bedroomImage,
  "ultimate-host-bundle": villaImage,
};

const toolIcons = [MessageCircle, MessageCircle, BarChart3, FileText, Mail];

const toolDescriptions = [
  "Turn difficult guest reviews into calm, professional responses.",
  "Create fast, professional replies to guest questions and requests.",
  "Improve listing titles and descriptions that convert.",
  "Clear, fair house rules guests actually read.",
  "Warm, professional welcome messages in seconds.",
];

function Home() {
  const { t } = useI18n();
  const mosaic = [
    { src: villaImage, alt: "Mediterranean villa at golden hour", label: t("home.mosaic1") },
    { src: bedroomImage, alt: "Linen bedroom in a short-term rental", label: t("home.mosaic2") },
    { src: kitchenImage, alt: "Sunlit rental kitchen and dining space", label: t("home.mosaic3") },
    { src: terraceImage, alt: "Terrace breakfast overlooking olive trees", label: t("home.mosaic4") },
  ];
  const pillars = [
    {
      icon: Sparkles,
      title: t("home.pillarTools"),
      body: t("home.pillarToolsBody"),
      to: "/ai-tools" as const,
      cta: t("home.pillarToolsCta"),
    },
    {
      icon: Package,
      title: t("home.pillarProducts"),
      body: t("home.pillarProductsBody"),
      to: "/products" as const,
      cta: t("home.pillarProductsCta"),
    },
    {
      icon: LayoutDashboard,
      title: t("home.pillarWs"),
      body: t("home.pillarWsBody"),
      to: "/portal" as const,
      cta: t("home.pillarWsCta"),
    },
    {
      icon: Check,
      title: t("home.pillarSol"),
      body: t("home.pillarSolBody"),
      to: "/pricing" as const,
      cta: t("home.pillarSolCta"),
    },
  ];
  return (
    <>
      <section className="webrya-hero relative flex min-h-[88vh] items-end overflow-hidden">
        <HeroMedia />

        <div className="absolute inset-0 z-10 bg-black/60" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/50 to-black/40" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/75 via-black/35 to-black/20" />

        <div className="relative z-20 mx-auto w-full max-w-[1240px] px-5 pb-20 pt-32 lg:px-8 lg:pb-28">
          <div className="max-w-4xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("hero.eyebrow")}
            </p>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-white sm:text-6xl lg:text-[5.5rem]">
              {t("hero.title1")} <span className="text-teal-200">{t("hero.title2")}</span>
              <br />
              {t("hero.title3")}
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
              {t("hero.sub")}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link to="/ai-tools">
                  {t("hero.ctaTools")}
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/35 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
              >
                <Link to="/resources">{t("hero.ctaResources")}</Link>
              </Button>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <Check className="size-4 text-teal-300" />
                {t("hero.chip1")}
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="size-4 text-teal-300" />
                {t("hero.chip2")}
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="size-4 text-teal-300" />
                {t("hero.chip3")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <Section className="py-16 lg:py-24">
        <p className="eyebrow">{t("home.ecoEyebrow")}</p>
        <h2 className="mt-4 max-w-3xl text-3xl leading-tight sm:text-4xl">
          {t("home.ecoTitle")}
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <Link
              key={pillar.title}
              to={pillar.to}
              className="group flex flex-col rounded-xl border border-border bg-card p-7 transition-shadow hover:shadow-[var(--shadow-lift)]"
            >
              <span className="grid size-10 place-items-center rounded-md bg-secondary text-secondary-foreground">
                <pillar.icon className="size-5" />
              </span>
              <h3 className="mt-6 text-xl">{pillar.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {pillar.body}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                {pillar.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <section className="px-5 pb-4 lg:px-8">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {mosaic.map((shot) => (
            <figure
              key={shot.src}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[4/3]"
            >
              <img
                src={shot.src}
                alt={shot.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-12 text-sm text-white">
                {shot.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Section className="py-20 lg:py-28">
        <p className="eyebrow">{t("ops.eyebrow")}</p>
        <div className="mt-4 grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="max-w-3xl text-3xl tracking-tight sm:text-4xl lg:text-5xl">
              {t("ops.title")}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              {t("ops.body")}
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              <li className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {t("ops.b1")}
              </li>
              <li className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {t("ops.b2")}
              </li>
              <li className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {t("ops.b3")}
              </li>
            </ul>
            <Button asChild className="mt-8" size="lg">
              <Link to="/portal">
                {t("ops.cta")}
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Stay Board
            </p>
            <div className="mt-5 space-y-3 text-sm">
              <div className="rounded-lg border border-border bg-surface px-4 py-3">
                <p className="text-xs text-muted-foreground">{t("stays.arriving")}</p>
                <p className="mt-1 font-medium">Maria · Ελληνικά</p>
              </div>
              <div className="rounded-lg border border-border bg-surface px-4 py-3">
                <p className="text-xs text-muted-foreground">{t("stays.inHouse")}</p>
                <p className="mt-1 font-medium">Jonas · Deutsch</p>
              </div>
              <div className="rounded-lg border border-border bg-surface px-4 py-3">
                <p className="text-xs text-muted-foreground">{t("stays.departing")}</p>
                <p className="mt-1 font-medium">Elena · Русский</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="py-20 lg:py-28">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-3xl">
            <p className="eyebrow">{t("home.toolsEyebrow")}</p>
            <h2 className="mt-4 text-3xl tracking-tight sm:text-4xl lg:text-5xl">
              {t("home.toolsTitle")}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              {t("home.toolsBody")}
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img src={welcomeImage} alt="Guest keys and welcome still life" className="aspect-[4/3] h-full w-full object-cover" />
          </div>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {tools.slice(0, 5).map((tool, index) => {
            const Icon = toolIcons[index] ?? Sparkles;
            return (
              <Link
                key={tool.slug}
                to="/ai-tools/$slug"
                params={{ slug: tool.slug }}
                className="webrya-tool-card group flex min-h-[285px] flex-col rounded-xl border border-border bg-card p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">AI TOOL</span>
                  <Icon className="size-[18px] text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <h3 className="mt-8 text-lg font-semibold tracking-tight">{tool.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{toolDescriptions[index] ?? tool.short}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {t("home.tryIt")}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </Section>
    </>
  );
}

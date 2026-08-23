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
import { tools, products } from "@/data/webrya";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Webrya — Run your properties smarter" },
      {
        name: "description",
        content:
          "AI-powered tools, operational resources and practical systems built for Airbnb hosts, co-hosts and property managers.",
      },
      { property: "og:title", content: "Webrya — Run your properties smarter" },
      {
        property: "og:description",
        content:
          "AI-powered tools, operational resources and practical systems built for Airbnb hosts, co-hosts and property managers.",
      },
      { property: "og:url", content: "https://webrya.com/" },
      { property: "og:image", content: "https://webrya.com/villa.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://webrya.com/" }],
  }),
  component: Home,
});

const heroImage = "/hero-interior.jpg";
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
        <video
          className="webrya-hero-video absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={heroImage}
          aria-hidden="true"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 z-10 bg-black/50" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/45 to-black/35" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/30 to-black/15" />

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

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/60">
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
            <img
              src={welcomeImage}
              alt="Guest keys and welcome still life"
              className="aspect-[4/3] h-full w-full object-cover"
            />
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
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    AI TOOL
                  </span>
                  <Icon className="size-[18px] text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <h3 className="mt-8 text-lg font-semibold tracking-tight">{tool.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                  {toolDescriptions[index] ?? tool.short}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {t("home.tryIt")}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      <section className="bg-surface">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={kitchenImage}
              alt="Sunlit kitchen of a short-term rental"
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">{t("home.moreEyebrow")}</p>
            <h2 className="mt-4 max-w-xl text-3xl tracking-tight sm:text-4xl lg:text-5xl">
              {t("home.moreTitle")}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
              {t("home.moreBody")}
            </p>
            <div className="mt-9 space-y-5">
              {[
                {
                  icon: Sparkles,
                  title: t("home.wf1"),
                  text: t("home.wf1b"),
                },
                {
                  icon: Workflow,
                  title: t("home.wf2"),
                  text: t("home.wf2b"),
                },
                {
                  icon: BarChart3,
                  title: t("home.wf3"),
                  text: t("home.wf3b"),
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="mt-1 grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-card">
                    <item.icon className="size-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section className="py-20 lg:py-28">
        <div className="text-center">
          <p className="eyebrow">WEBRYA WORKSPACE</p>
          <h2 className="mt-4 text-3xl tracking-tight sm:text-4xl lg:text-5xl">
            Your operations, with less friction.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            Bring guest communication, tasks and operational activity into one calmer workspace.
          </p>
        </div>

        <div className="webrya-dashboard mt-14 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex min-h-[500px]">
            <aside className="hidden w-52 shrink-0 border-r border-border bg-surface p-5 md:block">
              <div className="mb-8 text-sm font-semibold">Webrya</div>
              <div className="space-y-1 text-sm">
                {["Overview", "Messages", "Tasks", "Properties", "Resources"].map((item, index) => (
                  <div
                    key={item}
                    className={`rounded-md px-3 py-2 ${
                      index === 1 ? "bg-card font-medium shadow-sm" : "text-muted-foreground"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </aside>
            <div className="flex-1 p-5 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Messages
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold">Guest communication</h3>
                </div>
                <div className="hidden rounded-md border border-border px-3 py-2 text-xs text-muted-foreground sm:block">
                  Today · 12 messages
                </div>
              </div>
              <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
                <div className="space-y-3">
                  {[
                    ["Maria · Apartment 12", "Can we check in earlier?", "2m"],
                    ["James · Sea View", "Everything looks great!", "18m"],
                    ["Sofia · Loft 4", "Where can I park?", "41m"],
                  ].map(([name, message, time], index) => (
                    <div
                      key={name}
                      className={`rounded-xl border p-4 ${
                        index === 0 ? "border-primary/30 bg-primary/[0.03]" : "border-border"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{name}</span>
                        <span className="text-xs text-muted-foreground">{time}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-primary/20 bg-primary/[0.035] p-5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                      AI suggestion
                    </span>
                  </div>
                  <h4 className="mt-4 font-semibold">Suggested response</h4>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    “Hi Maria! We’ll do our best to accommodate an earlier check-in. I’ll confirm
                    availability shortly and let you know.”
                  </p>
                  <Button asChild className="mt-5">
                    <Link to="/portal">
                      Open Workspace
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="py-20 lg:py-28">
        <div>
          <p className="eyebrow">RESOURCES</p>
          <h2 className="mt-4 text-3xl tracking-tight sm:text-4xl lg:text-5xl">
            How experienced hosts actually operate.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            Practical guides, playbooks and frameworks for running better short-term rental
            operations.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
          <Link to="/resources" className="group relative min-h-[400px] overflow-hidden rounded-2xl">
            <img
              src={workspaceImage}
              alt="Modern hosting workspace"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7 text-white lg:p-9">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/65">
                HOSTING OPERATIONS
              </p>
              <h3 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
                How to automate guest messaging without losing the human touch
              </h3>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm">
                8 min read
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
          <div className="grid gap-5">
            {[
              {
                title: "Reducing late-night guest messages",
                category: "GUEST COMMUNICATION",
                time: "6 min read",
                image: bedroomImage,
              },
              {
                title: "Creating a seamless co-host handover",
                category: "OPERATIONS",
                time: "5 min read",
                image: villaImage,
              },
            ].map((article) => (
              <Link
                key={article.title}
                to="/resources"
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-[var(--shadow-lift)]"
              >
                <img
                  src={article.image}
                  alt=""
                  className="aspect-[16/8] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="flex flex-col justify-between p-6">
                  <div>
                    <p className="eyebrow">{article.category}</p>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight">{article.title}</h3>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    {article.time}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pb-16 lg:pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">DIGITAL PRODUCTS · PAY ONCE. OWN IT.</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Systems you can put to work tonight.</h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/products">Browse all products</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.slug}
              to="/products/$slug"
              params={{ slug: product.slug }}
              className={
                "group flex flex-col overflow-hidden rounded-xl border transition-shadow hover:shadow-[var(--shadow-lift)] " +
                (product.featured
                  ? "border-transparent bg-ink text-ink-foreground"
                  : "border-border bg-card")
              }
            >
              <img
                src={productImages[product.slug] ?? villaImage}
                alt=""
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="flex flex-1 flex-col p-6">
              {product.featured && <p className="eyebrow text-accent">Best value</p>}
              <h3 className="mt-1 text-lg">{product.name}</h3>
              <p
                className={
                  "mt-2 flex-1 text-sm leading-relaxed " +
                  (product.featured ? "opacity-80" : "text-muted-foreground")
                }
              >
                {product.tagline}
              </p>
              <p className="mt-5 text-base font-medium">{product.priceLabel}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="pb-24">
        <div className="grid items-center gap-10 rounded-2xl border border-border bg-card p-8 lg:grid-cols-2 lg:p-12">
          <div>
            <p className="eyebrow">PROFESSIONAL WEBRYA SOLUTIONS</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Need the whole thing set up for you?</h2>
            <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">
              One-time professional Webrya solutions for hosts, co-hosts and property managers —
              a branded property page, digital guidebook, AI toolkit and your Webrya Workspace,
              delivered as a finished setup. No mandatory subscription.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/pricing">View solutions</Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link to="/portal">Preview the Webrya Workspace</Link>
              </Button>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
            {[
              ["Host Starter", "$99"],
              ["Host Pro", "$299"],
              ["Business", "from $699"],
              ["Every solution", "one-time"],
            ].map(([label, value]) => (
              <div key={label} className="bg-card p-6">
                <dt className="eyebrow">{label}</dt>
                <dd className="mt-2 font-display text-2xl">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <section className="px-5 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-[1240px] overflow-hidden rounded-2xl bg-ink px-7 py-14 text-ink-foreground sm:px-10 lg:px-14 lg:py-16">
          <div className="flex flex-col items-start justify-between gap-9 lg:flex-row lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                WEBRYA
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready to operate like a pro?
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-ink-foreground/65 sm:text-base">
                Work smarter across guest communication, property operations and the everyday
                tasks that keep your rentals running.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/ai-tools">
                  Explore AI Tools
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-transparent text-ink-foreground hover:bg-white/10 hover:text-ink-foreground"
              >
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

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
import heroImage from "@/assets/hero-interior.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Webrya — Run your properties smarter",
      },
      {
        name: "description",
        content:
          "AI-powered tools, operational resources and practical systems built for Airbnb hosts, co-hosts and property managers.",
      },
      {
        property: "og:title",
        content: "Webrya — Run your properties smarter",
      },
      {
        property: "og:description",
        content:
          "AI-powered tools, digital products and practical systems built for modern short-term rental professionals.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),

  component: Home,
});

const toolIcons = [
  MessageCircle,
  MessageCircle,
  BarChart3,
  FileText,
  Mail,
];

const toolDescriptions = [
  "Turn difficult guest reviews into calm, professional responses.",
  "Create fast, professional replies to guest questions and requests.",
  "Improve listing titles and descriptions that convert.",
  "Clear, fair house rules guests actually read.",
  "Warm, professional welcome messages in seconds.",
];

const pillars = [
  {
    icon: Sparkles,
    title: "Free AI Tools",
    body: "Try Webrya for free — practical AI tools for everyday hosting tasks.",
    to: "/ai-tools" as const,
    cta: "Explore AI Tools",
  },
  {
    icon: Package,
    title: "Digital Products",
    body: "Buy ready-made hosting systems. Pay once. Own it.",
    to: "/products" as const,
    cta: "View Products",
  },
  {
    icon: LayoutDashboard,
    title: "Webrya Workspace",
    body: "Keep your tools, purchases and saved work together in one place.",
    to: "/portal" as const,
    cta: "See the Workspace",
  },
  {
    icon: Check,
    title: "Professional Solutions",
    body: "Get a complete Webrya setup for your property or business.",
    to: "/pricing" as const,
    cta: "View Solutions",
  },
];

function Home () {
  return (
    <>
            {/* CINEMATIC HERO */}
      <section className="webrya-hero relative flex min-h-[88vh] items-end overflow-hidden bg-neutral-900">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-cover"
          aria-hidden="true"
        />

        <div className="absolute inset-0 z-10 bg-black/50" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />

        <div className="relative z-20 mx-auto w-full max-w-[1240px] px-5 pb-20 pt-32 lg:px-8 lg:pb-28">
          <div className="max-w-4xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 drop-shadow-sm">
              Smart operations for modern hosts
            </p>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-white drop-shadow-md sm:text-6xl lg:text-[5.5rem]">
              Run your properties{" "}
              <span className="text-teal-300">smarter.</span>
              <br />
              Not harder.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-white/90 drop-shadow-sm sm:text-lg">
              AI-powered tools, operational resources and practical systems
              built for Airbnb hosts, co-hosts and property managers.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-lg bg-teal-700 px-5 text-sm font-medium text-white shadow-lg shadow-black/20 hover:bg-teal-600"
              >
                <Link to="/ai-tools">
                  Explore AI Tools
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 rounded-lg border-white/40 bg-white/10 px-5 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
              >
                <Link to="/resources">Explore Resources</Link>
              </Button>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/85">
              <span className="inline-flex items-center gap-2">
                <Check className="size-4 text-teal-300" />
                Free AI tools
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="size-4 text-teal-300" />
                Practical systems
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="size-4 text-teal-300" />
                Built for hosts
              </span>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* WEBRYA ECOSYSTEM */}
      <Section className="py-16 lg:py-24">
        <p className="eyebrow">THE WEBRYA ECOSYSTEM</p>
        <h2 className="mt-4 max-w-3xl text-3xl leading-tight sm:text-4xl">
          One connected system: start free, own what you buy, grow into a full
          setup.
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

      {/* AI TOOLS */}
      <Section className="py-20 lg:py-28">
        <div className="max-w-3xl">
          <p className="eyebrow">AI TOOLS</p>
          <h2 className="mt-4 text-3xl tracking-tight sm:text-4xl lg:text-5xl">
            Start with the tools you’ll use today.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            Practical AI tools designed around the everyday work of hosting.
            Less repetitive writing. Less time spent on routine tasks.
          </p>
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
                <h3 className="mt-8 text-lg font-semibold tracking-tight">
                  {tool.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                  {toolDescriptions[index] ?? tool.short}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Try it
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* PROPERTY → PLATFORM */}
      <section className="bg-[#f2f1ed]">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={heroImage}
              alt="Modern short-term rental interior"
              className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
          <div>
            <p className="eyebrow">FROM PROPERTY TO PLATFORM</p>
            <h2 className="mt-4 max-w-xl text-3xl tracking-tight sm:text-4xl lg:text-5xl">
              More than AI tools.
              <br />
              Everything you need to operate better.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
              Webrya connects the small operational tasks that consume your
              time with the systems that help your property run smoothly.
            </p>
            <div className="mt-9 space-y-5">
              {[
                {
                  icon: Sparkles,
                  title: "AI-powered workflows",
                  text: "Handle everyday guest communication and content faster.",
                },
                {
                  icon: Workflow,
                  title: "Operational resources",
                  text: "Practical guides, frameworks and systems for better hosting.",
                },
                {
                  icon: BarChart3,
                  title: "Property management systems",
                  text: "Build a more organized operation as your portfolio grows.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="mt-1 grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-white">
                    <item.icon className="size-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WEBRYA WORKSPACE */}
      <Section className="py-20 lg:py-28">
        <div className="text-center">
          <p className="eyebrow">WEBRYA WORKSPACE</p>
          <h2 className="mt-4 text-3xl tracking-tight sm:text-4xl lg:text-5xl">
            Your operations, with less friction.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            Bring guest communication, tasks and operational activity into one
            calmer workspace.
          </p>
        </div>
        <div className="webrya-dashboard mt-14 overflow-hidden rounded-2xl border border-border bg-white">
          <div className="flex min-h-[500px]">
            <aside className="hidden w-52 shrink-0 border-r border-border bg-[#fafaf8] p-5 md:block">
              <div className="mb-8 text-sm font-semibold">Webrya</div>
              <div className="space-y-1 text-sm">
                {["Overview", "Messages", "Tasks", "Properties", "Resources"].map(
                  (item, index) => (
                    <div
                      key={item}
                      className={`rounded-md px-3 py-2 ${
                        index === 1
                          ? "bg-white font-medium shadow-sm"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            </aside>
            <div className="flex-1 p-5 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Messages
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold">
                    Guest communication
                  </h3>
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
                        index === 0
                          ? "border-primary/30 bg-primary/[0.03]"
                          : "border-border"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{name}</span>
                        <span className="text-xs text-muted-foreground">
                          {time}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {message}
                      </p>
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
                    “Hi Maria! We’ll do our best to accommodate an earlier
                    check-in. I’ll confirm the availability shortly and let you
                    know.”
                  </p>
                  <button
                    type="button"
                    className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                  >
                    Apply suggestion
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* RESOURCES */}
      <Section className="py-20 lg:py-28">
        <div>
          <p className="eyebrow">RESOURCES</p>
          <h2 className="mt-4 text-3xl tracking-tight sm:text-4xl lg:text-5xl">
            How experienced hosts actually operate.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            Practical guides, playbooks and frameworks for running better
            short-term rental operations.
          </p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
          <Link
            to="/resources"
            className="group relative min-h-[400px] overflow-hidden rounded-2xl"
          >
            <img
              src={heroImage}
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
              },
              {
                title: "Creating a seamless co-host handover",
                category: "OPERATIONS",
                time: "5 min read",
              },
            ].map((article) => (
              <Link
                key={article.title}
                to="/resources"
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
              >
                <div>
                  <p className="eyebrow">{article.category}</p>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">
                    {article.title}
                  </h3>
                </div>
                <span className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  {article.time}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* DIGITAL PRODUCTS */}
      <Section className="pb-16 lg:pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">DIGITAL PRODUCTS · PAY ONCE. OWN IT.</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Systems you can put to work tonight.
            </h2>
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
                "flex flex-col rounded-xl border p-6 transition-shadow hover:shadow-[var(--shadow-lift)] " +
                (product.featured
                  ? "border-transparent bg-ink text-ink-foreground"
                  : "border-border bg-card")
              }
            >
              {product.featured && (
                <p className="eyebrow text-accent">Best value</p>
              )}
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
            </Link>
          ))}
        </div>
      </Section>

      {/* PROFESSIONAL SOLUTIONS */}
      <Section className="pb-24">
        <div className="grid items-center gap-10 rounded-2xl border border-border bg-card p-8 lg:grid-cols-2 lg:p-12">
          <div>
            <p className="eyebrow">PROFESSIONAL WEBRYA SOLUTIONS</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Need the whole thing set up for you?
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">
              One-time professional Webrya solutions for hosts, co-hosts and
              property managers — a branded property page, digital guidebook, AI
              toolkit and your Webrya Workspace, delivered as a finished setup.
              No mandatory subscription.
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

      {/* FINAL CTA */}
      <section className="px-5 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-[1240px] overflow-hidden rounded-2xl bg-[#172b2a] px-7 py-14 text-white sm:px-10 lg:px-14 lg:py-16">
          <div className="flex flex-col items-start justify-between gap-9 lg:flex-row lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">
                WEBRYA
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready to operate like a pro?
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/65 sm:text-base">
                Work smarter across guest communication, property operations and
                the everyday tasks that keep your rentals running.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-teal-600 text-white hover:bg-teal-500"
              >
                <Link to="/ai-tools">
                  Explore AI Tools
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
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
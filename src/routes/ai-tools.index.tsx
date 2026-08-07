import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, MessageSquare, Sparkles, ScrollText, KeyRound, ArrowRight } from "lucide-react";

import { PageHeader, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { tools } from "@/data/webrya";

export const Route = createFileRoute("/ai-tools/")({
  head: () => ({
    meta: [
      { title: "Free AI Tools for Airbnb Hosts — Webrya" },
      {
        name: "description",
        content:
          "Free AI tools for Airbnb hosts: review responses, guest replies, listing optimization, house rules and welcome messages.",
      },
      { property: "og:title", content: "Free AI Tools for Airbnb Hosts — Webrya" },
      {
        property: "og:description",
        content: "Practical AI tools for everyday short-term rental hosting tasks. Free to try.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ToolsIndex,
});

export const icons = {
  star: Star,
  message: MessageSquare,
  sparkles: Sparkles,
  scroll: ScrollText,
  key: KeyRound,
};

function ToolsIndex() {
  return (
    <>
      <PageHeader
        eyebrow="AI Tools"
        title="Practical AI for everyday hosting work."
        intro="Five free tools built around the tasks hosts actually repeat every week. No credit card, no setup — open a tool and use it."
      />

      <Section className="py-14 lg:py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => {
            const Icon = icons[t.icon];
            return (
              <div
                key={t.slug}
                className="flex flex-col rounded-xl border border-border bg-card p-7 transition-shadow hover:shadow-[var(--shadow-card)]"
              >
                <span className="grid size-10 place-items-center rounded-md bg-secondary text-secondary-foreground">
                  <Icon className="size-5" />
                </span>
                <h2 className="mt-6 text-xl">{t.name}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {t.short}
                </p>
                <Button asChild variant="outline" className="mt-6 w-full">
                  <Link to="/ai-tools/$slug" params={{ slug: t.slug }}>
                    Try Free <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            );
          })}

          <div className="flex flex-col justify-center rounded-xl border border-dashed border-border bg-surface p-7">
            <h2 className="text-xl">More tools coming</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Pricing assistant, cleaning schedule builder and damage claim writer are in
              development for the Host Portal.
            </p>
            <Button asChild variant="ghost" className="mt-6 justify-start px-0">
              <Link to="/portal">See the Host Portal</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

import { useState } from "react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";

import { PageHeader, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { resources, resourceCategories } from "@/data/webrya";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Airbnb Hosting Resources & Guides — Webrya" },
      {
        name: "description",
        content:
          "Guides on Airbnb hosting, AI for hosts, guest communication, review management and property management — written for short-term rental professionals.",
      },
      {
        property: "og:title",
        content: "Airbnb Hosting Resources & Guides — Webrya",
      },
      {
        property: "og:description",
        content:
          "Practical guides for Airbnb hosts, co-hosts and property managers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Resources,
});

function Resources() {
  const { t } = useI18n();
  const [active, setActive] = useState("All");

  const categories = ["All", ...resourceCategories];

  const list =
    active === "All"
      ? resources
      : resources.filter((resource) => resource.category === active);

  const [featured, ...rest] = list;

  return (
    <>
      <PageHeader
        eyebrow={t("page.resources.eyebrow")}
        title={t("page.resources.title")}
        intro={t("page.resources.intro")}
      />

      <Section className="py-14 lg:py-20">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={
                "rounded-full border px-4 py-1.5 text-sm transition-colors " +
                (active === category
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground")
              }
            >
              {category === "All" ? t("page.resources.all") : category}
            </button>
          ))}
        </div>

        {featured && (
          <Link
            to="/resources/$slug"
            params={{ slug: featured.slug }}
            className="group mt-10 block rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-[var(--shadow-card)] lg:p-10"
          >
            <p className="eyebrow">{featured.category}</p>

            <h2 className="mt-4 max-w-3xl text-3xl leading-tight group-hover:underline">
              {featured.title}
            </h2>

            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              {featured.excerpt}
            </p>

            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
              Read guide · {featured.readTime}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((resource) => (
              <Link
                key={resource.slug}
                to="/resources/$slug"
                params={{ slug: resource.slug }}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-card)]"
              >
                <p className="eyebrow">{resource.category}</p>

                <h3 className="mt-3 text-lg leading-snug group-hover:underline">
                  {resource.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {resource.excerpt}
                </p>

                <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{resource.readTime} read</span>

                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-xl bg-surface p-8">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="size-5 text-accent" />

              <h2 className="text-2xl">
                Get the tools behind the guides.
              </h2>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              Free AI tools for hosts — nothing to install.
            </p>
          </div>

          <Button asChild size="lg">
            <Link to="/ai-tools">
              Explore AI Tools
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
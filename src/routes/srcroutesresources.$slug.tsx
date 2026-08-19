import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";
import { resources } from "@/data/webrya";
import { resourceArticles } from "@/data/resource-content";

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => {
    const resource = resources.find((item) => item.slug === params.slug);
    const article = resourceArticles[params.slug];

    if (!resource || !article) {
      throw notFound();
    }

    return {
      resource,
      article,
    };
  },

  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Resource not found — Webrya" },
          { name: "robots", content: "noindex" },
        ],
      };
    }

    const { resource } = loaderData;

    return {
      meta: [
        {
          title: `${resource.title} — Webrya`,
        },
        {
          name: "description",
          content: resource.excerpt,
        },
        {
          property: "og:title",
          content: `${resource.title} — Webrya`,
        },
        {
          property: "og:description",
          content: resource.excerpt,
        },
        {
          property: "og:type",
          content: "article",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
      ],
    };
  },

  component: ResourceArticlePage,
});

function ResourceArticlePage() {
  const { resource, article } = Route.useLoaderData();

  const relatedResources = article.relatedSlugs
    .map((slug) => resources.find((item) => item.slug === slug))
    .filter(Boolean);

  return (
    <>
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-10 lg:px-8 lg:py-14">
          <Link
            to="/resources"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            All resources
          </Link>

          <div className="mt-8">
            <p className="eyebrow">{resource.category}</p>

            <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">
              {resource.title}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {resource.excerpt}
            </p>

            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" />
                {resource.readTime} read
              </span>

              <span>Webrya Editorial</span>
            </div>
          </div>
        </div>
      </div>

      <Section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <article className="prose prose-neutral max-w-none dark:prose-invert">
            {article.introduction.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-8 text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}

            {article.sections.map((section) => (
              <section key={section.heading} className="mt-12">
                <h2 className="text-2xl leading-tight">
                  {section.heading}
                </h2>

                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 text-base leading-8 text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="mt-5 space-y-3">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="pl-1 text-base leading-7 text-muted-foreground"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                {section.steps && (
                  <ol className="mt-5 space-y-5">
                    {section.steps.map((step, index) => (
                      <li
                        key={step.title}
                        className="rounded-xl border border-border bg-card p-5"
                      >
                        <h3 className="font-medium">
                          {index + 1}. {step.title}
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          {step.text}
                        </p>
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            ))}

            {article.tool && (
              <div className="not-prose mt-12 rounded-2xl border border-border bg-surface p-7">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary p-2 text-primary-foreground">
                    <Sparkles className="size-5" />
                  </div>

                  <div>
                    <p className="eyebrow">Webrya tool</p>

                    <h2 className="mt-2 text-xl">
                      {article.tool.title}
                    </h2>

                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {article.tool.description}
                    </p>

                    <Button asChild className="mt-5">
                      <Link
                        to="/ai-tools/$slug"
                        params={{ slug: article.tool.slug }}
                      >
                        {article.tool.cta}
                        <ArrowRight className="ml-2 size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </article>

          {relatedResources.length > 0 && (
            <div className="mt-16 border-t border-border pt-10">
              <p className="eyebrow">Keep reading</p>

              <h2 className="mt-3 text-2xl">
                More resources for hosts
              </h2>

              <div className="mt-6 grid gap-4">
                {relatedResources.map((related) => (
                  <Link
                    key={related!.slug}
                    to="/resources/$slug"
                    params={{ slug: related!.slug }}
                    className="group rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-[var(--shadow-card)]"
                  >
                    <p className="text-xs text-muted-foreground">
                      {related!.category} · {related!.readTime} read
                    </p>

                    <div className="mt-2 flex items-center justify-between gap-4">
                      <h3 className="font-medium group-hover:underline">
                        {related!.title}
                      </h3>

                      <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12">
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent"
            >
              <ArrowLeft className="size-4" />
              Back to all resources
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
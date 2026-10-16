import { useEffect } from "react";
import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { PageHeader, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { packages } from "@/data/webrya";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Webrya — Websites, tools and setups" },
      {
        name: "description",
        content:
          "Websites, AI tools and one-time setups. Built once. You own the work.",
      },
      { property: "og:title", content: "Webrya — Websites, tools and setups" },
      {
        property: "og:description",
        content: "One-time professional Webrya solutions. No mandatory subscription.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pricing,
});

function tr(t: (k: string) => string, key: string, fallback: string) {
  const v = t(key);
  return v === key ? fallback : v;
}

function Pricing() {
  const { t } = useI18n();
  const hash = useRouterState({ select: (s) => s.location.hash });

  useEffect(() => {
    const id = (hash || window.location.hash).replace("#", "");
    if (id !== "websites") return;
    const align = () => {
      const el = document.getElementById("websites");
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
    };
    align();
    const frame = window.requestAnimationFrame(align);
    const timer = window.setTimeout(align, 120);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [hash]);
  return (
    <>
      <PageHeader
        eyebrow={t("page.pricing.eyebrow")}
        title={t("page.pricing.title")}
        intro={t("page.pricing.intro")}
      />

      <Section className="py-14 lg:py-20">
        <div className="grid items-start gap-5 lg:grid-cols-3">
          {packages.map((p) => (
            <div
              key={p.slug}
              className={
                "flex flex-col rounded-xl p-8 " +
                (p.recommended
                  ? "bg-ink text-ink-foreground shadow-[var(--shadow-lift)] lg:-mt-4 lg:pb-12"
                  : "border border-border bg-card")
              }
            >
              {p.badge && (
                <p className="eyebrow text-accent">
                  {tr(t, `pkg.${p.slug}.badge`, p.badge)}
                </p>
              )}
              <h2 className="mt-1 text-2xl">{tr(t, `pkg.${p.slug}.name`, p.name)}</h2>
              <p
                className={
                  "mt-2 text-sm leading-relaxed " +
                  (p.recommended ? "opacity-80" : "text-muted-foreground")
                }
              >
                {tr(t, `pkg.${p.slug}.audience`, p.audience)}
              </p>
              <p className="mt-7 font-display text-4xl">
                {tr(t, `pkg.${p.slug}.price`, p.price)}
              </p>
              <p className={"mt-1 text-xs " + (p.recommended ? "opacity-70" : "text-muted-foreground")}>
                {tr(t, `pkg.${p.slug}.note`, p.note)}
              </p>
              <ul className="mt-7 flex-1 space-y-3">
                {p.includes.map((i, idx) => (
                  <li key={i} className="flex gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    {tr(t, `pkg.${p.slug}.i${idx}`, i)}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                variant={p.recommended ? "secondary" : "outline"}
                className="mt-8 w-full"
              >
                <Link to={p.slug === "host-pro" ? "/ai-tools" : "/contact"}>{tr(t, `pkg.${p.slug}.cta`, p.cta)}</Link>
              </Button>
            </div>
          ))}
        </div>

        <div id="websites" className="mt-20 scroll-mt-28">
          <p className="eyebrow">{t("pricing.web.eyebrow")}</p>
          <h2 className="mt-3 text-3xl tracking-tight">{t("pricing.web.title")}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t("pricing.web.intro")}</p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="flex flex-col rounded-lg border border-border bg-card p-8">
              <h3 className="text-2xl">{t("pricing.web.property.t")}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("pricing.web.property.b")}</p>
              <p className="mt-8 font-display text-2xl tracking-tight">{t("pricing.web.price")}</p>
              <Button asChild size="lg" variant="outline" className="mt-8 w-full">
                <Link to="/contact">{t("pricing.web.cta")}</Link>
              </Button>
            </div>

            <div className="flex flex-col rounded-lg border border-border bg-card p-8">
              <h3 className="text-2xl">{t("pricing.web.business.t")}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("pricing.web.business.b")}</p>
              <p className="mt-8 font-display text-2xl tracking-tight">{t("pricing.web.price")}</p>
              <Button asChild size="lg" variant="outline" className="mt-8 w-full">
                <Link to="/contact">{t("pricing.web.cta")}</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-xl border border-border bg-surface p-8 lg:p-12">
          <h2 className="text-2xl">{tr(t, "pricing.faqTitle", "Questions hosts ask first")}</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <div key={n}>
                <h3 className="text-base font-medium">{t(`pricing.faq${n}q`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`pricing.faq${n}a`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

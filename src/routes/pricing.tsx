import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { PageHeader, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { packages } from "@/data/webrya";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Webrya Solutions — One-time Setups for Hosts" },
      {
        name: "description",
        content:
          "One-time professional Webrya solutions for short-term rental hosts and property managers. Host Starter $99, Host Pro $299, Business from $699. Custom websites available upon request.",
      },
      { property: "og:title", content: "Webrya Solutions — One-time Setups for Hosts" },
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
              <h2 className="mt-1 text-2xl">{p.name}</h2>
              <p
                className={
                  "mt-2 text-sm leading-relaxed " +
                  (p.recommended ? "opacity-80" : "text-muted-foreground")
                }
              >
                {tr(t, `pkg.${p.slug}.audience`, p.audience)}
              </p>
              <p className="mt-7 font-display text-4xl">
                {p.slug === "business" ? tr(t, "pkg.business.price", p.price) : p.price}
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
                <Link to="/login">{tr(t, `pkg.${p.slug}.cta`, p.cta)}</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Websites section */}
        <div className="mt-20">
          <p className="eyebrow">Websites</p>
          <h2 className="mt-3 text-3xl tracking-tight">Επαγγελματικές ιστοσελίδες</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Ιστοσελίδες για properties και επιχειρήσεις. One-time setup. Δικές σου. Χωρίς συνδρομή.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="flex flex-col rounded-xl border border-border bg-card p-8">
              <h3 className="text-2xl">Property Website</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Ιστοσελίδα για ένα ακίνητο: gallery, περιγραφή, φόρμα επικοινωνίας, link για direct booking.
              </p>
              <p className="mt-6 font-display text-3xl">Τιμή με συνεννόηση</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                <li className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-accent" />Custom design</li>
                <li className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-accent" />Mobile responsive</li>
                <li className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-accent" />SEO basics</li>
                <li className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-accent" />Φόρμα επικοινωνίας</li>
              </ul>
              <Button asChild size="lg" variant="outline" className="mt-8 w-full">
                <Link to="/contact">Ζήτησε προσφορά</Link>
              </Button>
            </div>

            <div className="flex flex-col rounded-xl border border-border bg-card p-8">
              <h3 className="text-2xl">Business Website</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Για property managers ή τοπικές επιχειρήσεις (υπηρεσίες, έργα, επικοινωνία).
              </p>
              <p className="mt-6 font-display text-3xl">Τιμή με συνεννόηση</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                <li className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-accent" />Custom design & structure</li>
                <li className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-accent" />Pages για υπηρεσίες / έργα</li>
                <li className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-accent" />Contact & lead forms</li>
                <li className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-accent" />SEO basics</li>
              </ul>
              <Button asChild size="lg" variant="outline" className="mt-8 w-full">
                <Link to="/contact">Ζήτησε προσφορά</Link>
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

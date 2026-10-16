import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";

const jobs = ["websites", "prep", "photos", "listing", "checkin", "apps"] as const;

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Webrya — A price for each job" },
      {
        name: "description",
        content:
          "A starting price for a website, property setup, photos, a listing, digital check-in, or a small app. One property. Paid once.",
      },
      { property: "og:title", content: "Webrya — A price for each job" },
      {
        property: "og:description",
        content: "No packages. One price for each job, for one property.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pricing,
});

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
        <div className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((id) => (
            <article
              key={id}
              id={id}
              className="flex scroll-mt-28 flex-col rounded-2xl border border-white/10 bg-[#100a28] p-6"
            >
              <h2 className="text-xl tracking-tight">{t(`offer.${id === "websites" ? "web" : id}.t`)}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{t(`price.${id}.b`)}</p>
              <p className="mt-8 font-display text-3xl tracking-tight">{t(`price.${id}`)}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t("price.note")}</p>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-muted-foreground">
                <li>{t(`price.${id}.i0`)}</li>
                <li>{t(`price.${id}.i1`)}</li>
                <li>{t(`price.${id}.i2`)}</li>
              </ul>
              <Button asChild size="lg" variant="outline" className="mt-8 w-full">
                <Link to="/contact">{t("offer.cta")}</Link>
              </Button>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm leading-6 text-muted-foreground">{t("price.scope")}</p>

        <div className="mt-16 rounded-xl border border-white/10 bg-[#100a28] p-8 lg:p-12">
          <h2 className="text-2xl">{t("pricing.faqTitle")}</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <div key={n}>
                <h3 className="text-base font-medium">{t(`pricing.faq${n}q`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`pricing.faq${n}a`)}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

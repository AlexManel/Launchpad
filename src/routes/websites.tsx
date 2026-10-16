import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";

const kinds = ["landing", "site", "booking", "eshop"] as const;

export const Route = createFileRoute("/websites")({
  head: () => ({
    meta: [
      { title: "Webrya — Websites" },
      {
        name: "description",
        content:
          "Landing pages, websites, booking engines and e-shops. A different price for each.",
      },
    ],
  }),
  component: WebsitesPage,
});

function WebsitesPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHeader eyebrow={t("web.eyebrow")} title={t("web.title")} intro={t("web.intro")} />
      <Section className="py-14 lg:py-20">
        <div className="grid items-stretch gap-4 md:grid-cols-2">
          {kinds.map((id) => (
            <article
              key={id}
              id={id}
              className="flex scroll-mt-28 flex-col rounded-2xl border border-white/10 bg-[#100a28] p-6"
            >
              <h2 className="text-2xl tracking-tight">{t(`web.${id}.t`)}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{t(`web.${id}.b`)}</p>
              <p className="mt-8 font-display text-3xl tracking-tight">{t(`web.${id}.price`)}</p>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-muted-foreground">
                <li>{t(`web.${id}.i0`)}</li>
                <li>{t(`web.${id}.i1`)}</li>
                <li>{t(`web.${id}.i2`)}</li>
              </ul>
              <Button asChild size="lg" variant="outline" className="mt-8 w-full">
                <Link to="/contact">{t("offer.cta")}</Link>
              </Button>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-6 text-muted-foreground">{t("web.scope")}</p>
      </Section>
    </>
  );
}

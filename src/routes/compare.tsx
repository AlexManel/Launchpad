import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Minus, ArrowRight } from "lucide-react";

import { PageHeader, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Webrya vs HostBuddy, Listrino, StellarReply — AI tools for Airbnb hosts" },
      {
        name: "description",
        content:
          "Webrya is an AI toolkit for Airbnb hosts, not a PMS. Compare guest messages, review responses and listing optimization against HostBuddy, Listrino, StellarReply, HostFlow and Rezi.",
      },
      {
        property: "og:title",
        content: "Webrya vs HostBuddy, Listrino, StellarReply",
      },
      {
        property: "og:description",
        content:
          "Messages, reviews and listing optimization in one workspace. Not Guesty. Not Hostaway.",
      },
      { property: "og:url", content: "https://webrya.com/compare" },
    ],
    links: [{ rel: "canonical", href: "https://webrya.com/compare" }],
  }),
  component: ComparePage,
});

function tr(t: (k: string) => string, key: string, fallback: string) {
  const v = t(key);
  return v === key ? fallback : v;
}

const rows = [
  { key: "messages", webrya: true, hostbuddy: true, listrino: false, stellar: false, hostflow: true, rezi: true },
  { key: "reviews", webrya: true, hostbuddy: false, listrino: true, stellar: true, hostflow: false, rezi: false },
  { key: "listing", webrya: true, hostbuddy: false, listrino: true, stellar: true, hostflow: false, rezi: false },
  { key: "hostNotes", webrya: true, hostbuddy: false, listrino: false, stellar: false, hostflow: false, rezi: false },
  { key: "rooms", webrya: true, hostbuddy: false, listrino: false, stellar: false, hostflow: false, rezi: false },
  { key: "pms", webrya: false, hostbuddy: false, listrino: false, stellar: false, hostflow: false, rezi: false },
];

function Cell({ ok, invert }: { ok: boolean; invert?: boolean }) {
  const good = invert ? !ok : ok;
  if (good) return <Check className="mx-auto size-4 text-primary" aria-label="yes" />;
  return <Minus className="mx-auto size-4 text-muted-foreground/50" aria-label="no" />;
}

function ComparePage() {
  const { t } = useI18n();
  return (
    <>
      <PageHeader
        eyebrow={tr(t, "compare.eyebrow", "Compare")}
        title={tr(t, "compare.title", "AI toolkit for hosts. Not a PMS.")}
        intro={tr(
          t,
          "compare.intro",
          "Webrya covers guest messages, review responses and listing optimization in one workspace. HostBuddy is messaging. Listrino and StellarReply are reviews and listings. Webrya is the three together — without replacing Airbnb or a channel manager.",
        )}
      />
      <Section className="py-10 lg:py-16">
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-surface text-left">
              <tr>
                <th className="px-4 py-3 font-medium">{tr(t, "compare.colJob", "Job")}</th>
                <th className="px-4 py-3 text-center font-semibold text-primary">Webrya</th>
                <th className="px-4 py-3 text-center font-medium">HostBuddy</th>
                <th className="px-4 py-3 text-center font-medium">Listrino</th>
                <th className="px-4 py-3 text-center font-medium">StellarReply</th>
                <th className="px-4 py-3 text-center font-medium">HostFlow</th>
                <th className="px-4 py-3 text-center font-medium">Rezi</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className="border-t border-border">
                  <td className="px-4 py-3">{tr(t, `compare.row.${row.key}`, row.key)}</td>
                  <td className="bg-primary/[0.04] px-4 py-3 text-center">
                    <Cell ok={row.webrya} invert={row.key === "pms"} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Cell ok={row.hostbuddy} invert={row.key === "pms"} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Cell ok={row.listrino} invert={row.key === "pms"} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Cell ok={row.stellar} invert={row.key === "pms"} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Cell ok={row.hostflow} invert={row.key === "pms"} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Cell ok={row.rezi} invert={row.key === "pms"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">{tr(t, "compare.note", "Comparison reflects public product focus as of 2026. Not affiliated with the tools listed.")}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/ai-tools">
              {tr(t, "compare.ctaTools", "Try the AI tools")}
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/contact">{tr(t, "compare.ctaContact", "Talk to Webrya")}</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";

import { ContactForm } from "@/components/site/ContactForm";
import { PageHeader, Section } from "@/components/site/Section";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Webrya" },
      {
        name: "description",
        content: "Talk to Webrya about a website, co-hosting, or a landing page.",
      },
    ],
  }),
  component: ContactPage,
});

function tr(t: (k: string) => string, key: string, fallback: string) {
  const value = t(key);
  return value === key ? fallback : value;
}

function ContactPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHeader
        eyebrow={tr(t, "contact.eyebrow", "Contact")}
        title={tr(t, "contact.title", "Talk to Webrya")}
        intro={tr(t, "contact.intro", "A website, co-hosting, or a landing page. Say what you need.")}
      />
      <Section className="py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ContactForm />
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-surface p-6">
              <p className="eyebrow">{tr(t, "contact.direct", "Direct")}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                {tr(t, "contact.directBody", "Email or a call is fine. Say what you want built.")}
              </p>
              <a className="mt-4 block text-sm font-medium text-foreground" href="mailto:info@webrya.com">
                info@webrya.com
              </a>
              <a className="mt-2 block text-sm font-medium text-foreground" href="tel:+306946949933">
                +30 694 694 9933
              </a>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6">
              <p className="eyebrow">{tr(t, "contact.how", "How we work")}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {tr(t, "contact.howBody", "We look at the job and send a clear offer. No subscription.")}
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

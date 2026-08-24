import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

import { PageHeader, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContact } from "@/lib/contact.functions";
import { useI18n } from "@/i18n/I18nProvider";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Webrya" },
      {
        name: "description",
        content: "Talk to Webrya about beta access, property management trials and host tools.",
      },
    ],
  }),
  component: ContactPage,
});

function tr(t: (k: string) => string, key: string, fallback: string) {
  const v = t(key);
  return v === key ? fallback : v;
}

function ContactPage() {
  const { t, locale } = useI18n();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSending(true);
    try {
      await submitContact({
        data: {
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          company: String(fd.get("company") || ""),
          topic: String(fd.get("topic") || ""),
          message: String(fd.get("message") || ""),
          locale,
          website: String(fd.get("website") || ""),
        },
      });
      setSent(true);
      form.reset();
      toast.success(tr(t, "contact.success", "Message sent. We will get back to you."));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : tr(t, "contact.error", "Could not send."));
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow={tr(t, "contact.eyebrow", "Contact")}
        title={tr(t, "contact.title", "Talk to Webrya")}
        intro={tr(
          t,
          "contact.intro",
          "Beta access, property-manager trials and questions about the workspace. We read every message.",
        )}
      />
      <Section className="py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={(e) => void onSubmit(e)} className="space-y-4 rounded-xl border border-border bg-card p-6 lg:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                {tr(t, "contact.name", "Name")}
                <Input name="name" required className="mt-1.5" autoComplete="name" />
              </label>
              <label className="block text-sm">
                {tr(t, "contact.email", "Email")}
                <Input name="email" type="email" required className="mt-1.5" autoComplete="email" />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                {tr(t, "contact.company", "Company (optional)")}
                <Input name="company" className="mt-1.5" autoComplete="organization" />
              </label>
              <label className="block text-sm">
                {tr(t, "contact.topic", "Topic")}
                <select
                  name="topic"
                  className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
                  defaultValue="beta"
                >
                  <option value="beta">{tr(t, "contact.topic.beta", "Beta trial")}</option>
                  <option value="pm">{tr(t, "contact.topic.pm", "Property management company")}</option>
                  <option value="host">{tr(t, "contact.topic.host", "Host / co-host")}</option>
                  <option value="other">{tr(t, "contact.topic.other", "Other")}</option>
                </select>
              </label>
            </div>
            <label className="block text-sm">
              {tr(t, "contact.message", "Message")}
              <Textarea name="message" required minLength={10} rows={7} className="mt-1.5 min-h-36" />
            </label>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <Button type="submit" size="lg" disabled={sending}>
              {sending ? <Loader2 className="size-4 animate-spin" /> : null}
              {sending
                ? tr(t, "contact.sending", "Sending…")
                : tr(t, "contact.send", "Send message")}
            </Button>
            {sent ? (
              <p className="text-sm text-muted-foreground">
                {tr(t, "contact.success", "Message sent. We will get back to you.")}
              </p>
            ) : null}
          </form>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-surface p-6">
              <p className="eyebrow">{tr(t, "contact.direct", "Direct")}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                {tr(
                  t,
                  "contact.directBody",
                  "Prefer email or a call? Mention whether you manage one listing or a portfolio.",
                )}
              </p>
              <a className="mt-4 block text-sm font-medium text-foreground" href="mailto:info@webrya.com">
                info@webrya.com
              </a>
              <a className="mt-2 block text-sm font-medium text-foreground" href="tel:+306946949933">
                +30 694 694 9933
              </a>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6">
              <p className="eyebrow">{tr(t, "contact.beta", "Beta")}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {tr(
                  t,
                  "contact.betaBody",
                  "Checkout is in Stripe test mode. You can create an account and try the tools without a real charge.",
                )}
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

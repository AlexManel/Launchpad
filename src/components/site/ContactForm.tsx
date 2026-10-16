import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/i18n/I18nProvider";
import { toast } from "sonner";

function tr(t: (k: string) => string, key: string, fallback: string) {
  const value = t(key);
  return value === key ? fallback : value;
}

export function ContactForm() {
  const { t, locale } = useI18n();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSending(true);
    try {
      const { submitContact } = await import("@/lib/contact.functions");
      await submitContact({
        data: {
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          company: String(data.get("company") || ""),
          topic: String(data.get("topic") || ""),
          message: String(data.get("message") || ""),
          locale,
          website: String(data.get("website") || ""),
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
    <form onSubmit={(event) => void onSubmit(event)} className="space-y-4 rounded-xl border border-border bg-card p-6 lg:p-8">
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
            required
            defaultValue="website"
            className="mt-1.5 h-10 w-full rounded-md border border-input bg-[#100a28] px-3 text-sm text-[#f4f6ff] [color-scheme:dark]"
          >
            <option value="website">{tr(t, "contact.topic.website", "A website")}</option>
            <option value="prep">{tr(t, "contact.topic.prep", "Property setup")}</option>
            <option value="photos">{tr(t, "contact.topic.photos", "Photography")}</option>
            <option value="listing">{tr(t, "contact.topic.listing", "A listing")}</option>
            <option value="checkin">{tr(t, "contact.topic.checkin", "Digital check-in")}</option>
            <option value="apps">{tr(t, "contact.topic.apps", "An app or automation")}</option>
            <option value="other">{tr(t, "contact.topic.other", "Something else")}</option>
          </select>
        </label>
      </div>
      <label className="block text-sm">
        {tr(t, "contact.message", "Message")}
        <Textarea name="message" required minLength={10} rows={6} className="mt-1.5 min-h-36" />
      </label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <Button type="submit" size="lg" disabled={sending}>
        {sending ? <Loader2 className="size-4 animate-spin" /> : null}
        {sending ? tr(t, "contact.sending", "Sending…") : tr(t, "contact.send", "Send message")}
      </Button>
      {sent ? (
        <p className="text-sm text-muted-foreground">
          {tr(t, "contact.success", "Message sent. We will get back to you.")}
        </p>
      ) : null}
    </form>
  );
}

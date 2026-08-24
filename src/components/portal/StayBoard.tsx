import { useEffect, useMemo, useRef, useState } from "react";
import { Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { PanelTitle, Field } from "@/components/portal/fields";
import { inputClass, textareaClass } from "@/lib/portal/form-utils";
import { supabase } from "@/lib/supabase";
import { generateToolOutput } from "@/lib/ai-tools.functions";
import type { Property, Stay } from "@/lib/portal/types";
import { LOCALES, LOCALE_LABELS, useI18n } from "@/i18n/I18nProvider";
import { LOCALE_OUTPUT, type Locale } from "@/i18n/locales";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function bucket(stay: Stay) {
  const t = todayISO();
  if (stay.status === "cancelled" || stay.status === "checked_out") return "upcoming";
  if (stay.check_in === t) return "arriving";
  if (stay.check_out === t) return "departing";
  if (stay.check_in <= t && stay.check_out >= t) return "inHouse";
  return "upcoming";
}

export function StayBoard({ properties }: { properties: Property[] }) {
  const { t } = useI18n();
  const [stays, setStays] = useState<Stay[]>([]);
  const [loading, setLoading] = useState(true);
  const [guest, setGuest] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [lang, setLang] = useState<Locale>("en");
  const [checkIn, setCheckIn] = useState(todayISO());
  const [checkOut, setCheckOut] = useState(todayISO());
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState("");
  const [drafting, setDrafting] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const draftRef = useRef<HTMLDivElement>(null);

  const load = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("stays")
      .select("*")
      .eq("user_id", user.id)
      .neq("status", "cancelled")
      .order("check_in", { ascending: true });
    if (error) toast.error(error.message);
    else setStays((data as Stay[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const grouped = useMemo(() => {
    const g = { arriving: [] as Stay[], inHouse: [] as Stay[], departing: [] as Stay[], upcoming: [] as Stay[] };
    for (const s of stays) g[bucket(s)].push(s);
    return g;
  }, [stays]);

  const addStay = async () => {
    if (!guest.trim()) {
      toast.error("Add a guest name.");
      return;
    }
    setSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { error } = await supabase.from("stays").insert({
        user_id: user.id,
        property_id: propertyId || null,
        guest_name: guest.trim(),
        guest_language: lang,
        check_in: checkIn,
        check_out: checkOut,
        notes: notes.trim() || null,
        status: "upcoming",
      });
      if (error) throw error;
      setGuest("");
      setNotes("");
      toast.success("Stay added.");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save stay.");
    } finally {
      setSaving(false);
    }
  };

  const removeStay = async (id: string) => {
    const { error } = await supabase.from("stays").delete().eq("id", id);
    if (error) toast.error(error.message);
    else setStays((prev) => prev.filter((s) => s.id !== id));
  };

  const draftMessage = async (stay: Stay, kind: "welcome" | "checkin" | "review") => {
    setDrafting(`${stay.id}-${kind}`);
    setDraft("");
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const property = properties.find((p) => p.id === stay.property_id);
      const langName = LOCALE_OUTPUT[(stay.guest_language as Locale) || "en"] || stay.guest_language;
      const input =
        kind === "welcome"
          ? `Write a warm welcome message for guest ${stay.guest_name} staying ${stay.check_in} to ${stay.check_out}${property ? ` at ${property.name}` : ""}.`
          : kind === "checkin"
            ? `Write self check-in instructions for guest ${stay.guest_name}${property ? ` at ${property.name}` : ""}. Check-in ${stay.check_in}. Include only details we know.`
            : `No public review text was pasted. Guest ${stay.guest_name} stayed ${stay.check_in} to ${stay.check_out}${property ? ` at ${property.name}` : ""}. Write a HOST FILE note the host can keep, and a short PUBLIC REPLY only if a review-style thanks is still appropriate.`;
      const extra = [
        stay.notes ? `Host notes / omitted facts: ${stay.notes}` : "Host notes: not provided",
        property?.check_in_instructions ? `Check-in: ${property.check_in_instructions}` : "",
        property?.wifi_network ? `Wi-Fi: ${property.wifi_network}` : "",
        property?.parking_instructions ? `Parking: ${property.parking_instructions}` : "",
        property?.smoking ? `Smoking policy: ${property.smoking}` : "",
      ]
        .filter(Boolean)
        .join("\n");
      const res = await generateToolOutput({
        data: {
          tool:
            kind === "welcome"
              ? "welcome-message-generator"
              : kind === "checkin"
                ? "guest-reply-generator"
                : "review-response-generator",
          input,
          extra: extra || undefined,
          outputLanguage: stay.guest_language,
          accessToken: session?.access_token,
        },
      });
      setDraft(`— ${stay.guest_name} · ${langName} —\n\n${res.text}`);
      requestAnimationFrame(() => {
        draftRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not draft.");
    } finally {
      setDrafting(null);
    }
  };

  const renderGroup = (key: keyof typeof grouped, label: string) =>
    grouped[key].length === 0 ? null : (
      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        <ul className="mt-3 space-y-3">
          {grouped[key].map((stay) => {
            const property = properties.find((p) => p.id === stay.property_id);
            return (
              <li
                key={stay.id}
                className="rounded-xl border border-border bg-card p-4 sm:flex sm:items-start sm:justify-between sm:gap-4"
              >
                <div>
                  <p className="font-medium">{stay.guest_name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {property?.name ?? t("stays.noneProperty")} · {stay.check_in} → {stay.check_out} ·{" "}
                    {LOCALE_LABELS[(stay.guest_language as Locale) || "en"] ?? stay.guest_language}
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 sm:mt-0 sm:justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!!drafting}
                    onClick={() => void draftMessage(stay, "welcome")}
                  >
                    {drafting === `${stay.id}-welcome` && <Loader2 className="size-3 animate-spin" />}
                    {t("stays.draftWelcome")}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!!drafting}
                    onClick={() => void draftMessage(stay, "checkin")}
                  >
                    {drafting === `${stay.id}-checkin` && <Loader2 className="size-3 animate-spin" />}
                    {t("stays.draftCheckin")}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!!drafting}
                    onClick={() => void draftMessage(stay, "review")}
                  >
                    {drafting === `${stay.id}-review` && <Loader2 className="size-3 animate-spin" />}
                    {t("stays.draftReview")}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => void removeStay(stay.id)}>
                    {t("stays.delete")}
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );

  return (
    <div>
      <PanelTitle title={t("stays.title")} sub={t("stays.sub")} />

      <div className="mt-6 grid gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label={t("stays.guest")}>
          <input className={inputClass} value={guest} onChange={(e) => setGuest(e.target.value)} />
        </Field>
        <Field label={t("stays.property")}>
          <select className={inputClass} value={propertyId} onChange={(e) => setPropertyId(e.target.value)}>
            <option value="">{t("stays.noneProperty")}</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("stays.language")}>
          <select className={inputClass} value={lang} onChange={(e) => setLang(e.target.value as Locale)}>
            {LOCALES.map((code) => (
              <option key={code} value={code}>
                {LOCALE_LABELS[code]}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("stays.checkIn")}>
          <input type="date" className={inputClass} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        </Field>
        <Field label={t("stays.checkOut")}>
          <input type="date" className={inputClass} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        </Field>
        <Field label={t("stays.notes")}>
          <textarea className={textareaClass} rows={1} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </Field>
        <div className="sm:col-span-2 lg:col-span-3">
          <Button onClick={() => void addStay()} disabled={saving}>
            {saving && <Loader2 className="size-4 animate-spin" />}
            {t("stays.add")}
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-muted-foreground">…</p>
      ) : stays.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-border p-8 text-sm text-muted-foreground">
          {t("stays.empty")}
        </p>
      ) : (
        <>
          {renderGroup("arriving", t("stays.arriving"))}
          {renderGroup("inHouse", t("stays.inHouse"))}
          {renderGroup("departing", t("stays.departing"))}
          {renderGroup("upcoming", t("stays.upcoming"))}
        </>
      )}

      {draft && (
        <div
          ref={draftRef}
          className="mt-8 overflow-visible rounded-xl border border-border bg-surface p-5"
        >
          <div className="mb-3 flex items-center justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                void navigator.clipboard.writeText(draft);
                setCopied(true);
                toast.success(t("stays.copied"));
                setTimeout(() => setCopied(false), 1500);
              }}
            >
              <Copy className="size-3.5" />
              {copied ? t("stays.copied") : t("stays.copy")}
            </Button>
          </div>
          <pre className="max-h-none whitespace-pre-wrap break-words text-sm leading-relaxed">
            {draft}
          </pre>
        </div>
      )}
    </div>
  );
}

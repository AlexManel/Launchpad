import { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AMENITY_KEYS,
  AMENITY_LABELS,
  PROPERTY_TYPES,
  PropertySchema,
  blankPropertyDraft,
  type PropertyDraft,
  type PropertyType,
} from "@/lib/property/types";

const DraftSchema = PropertySchema.omit({ id: true, createdAt: true, updatedAt: true });

type Errors = Partial<Record<string, string>>;

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <p className="eyebrow">{title}</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  full,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string | undefined;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={"space-y-2 " + (full ? "sm:col-span-2" : "")}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

const TRI = ["unspecified", "yes", "no"] as const;
const TRI_LABEL: Record<(typeof TRI)[number], string> = {
  unspecified: "Not specified",
  yes: "Allowed",
  no: "Not allowed",
};

export function PropertyForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial?: PropertyDraft;
  submitLabel: string;
  onSubmit: (draft: PropertyDraft) => Promise<void> | void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState<PropertyDraft>(initial ?? blankPropertyDraft());
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof PropertyDraft>(key: K, value: PropertyDraft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const text = (key: keyof PropertyDraft) => String(draft[key] ?? "");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = DraftSchema.safeParse(draft);
    if (!result.success) {
      const next: Errors = {};
      for (const issue of (result.error as z.ZodError).issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSaving(true);
    try {
      await onSubmit(result.data as PropertyDraft);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <FormSection title="Basic information">
        <Field label="Property name *" htmlFor="p-name" error={errors["name"]}>
          <Input
            id="p-name"
            value={draft.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Modern Apartment Thessaloniki"
          />
        </Field>
        <Field label="Property type" htmlFor="p-type">
          <Select
            value={draft.propertyType}
            onValueChange={(v) => set("propertyType", v as PropertyType)}
          >
            <SelectTrigger id="p-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Address" htmlFor="p-address" full>
          <Input
            id="p-address"
            value={text("address")}
            onChange={(e) => set("address", e.target.value)}
          />
        </Field>
        <Field label="City *" htmlFor="p-city" error={errors["city"]}>
          <Input id="p-city" value={draft.city} onChange={(e) => set("city", e.target.value)} />
        </Field>
        <Field label="Country *" htmlFor="p-country" error={errors["country"]}>
          <Input
            id="p-country"
            value={draft.country}
            onChange={(e) => set("country", e.target.value)}
          />
        </Field>
        <Field label="Description" htmlFor="p-desc" full>
          <Textarea
            id="p-desc"
            rows={4}
            value={text("description")}
            onChange={(e) => set("description", e.target.value)}
          />
        </Field>
        <Field label="Bedrooms" htmlFor="p-bed" error={errors["bedrooms"]}>
          <Input
            id="p-bed"
            type="number"
            min={0}
            value={draft.bedrooms}
            onChange={(e) => set("bedrooms", Number(e.target.value))}
          />
        </Field>
        <Field label="Bathrooms" htmlFor="p-bath" error={errors["bathrooms"]}>
          <Input
            id="p-bath"
            type="number"
            min={0}
            value={draft.bathrooms}
            onChange={(e) => set("bathrooms", Number(e.target.value))}
          />
        </Field>
        <Field label="Maximum guests" htmlFor="p-guests" error={errors["maxGuests"]}>
          <Input
            id="p-guests"
            type="number"
            min={1}
            value={draft.maxGuests}
            onChange={(e) => set("maxGuests", Number(e.target.value))}
          />
        </Field>
      </FormSection>

      <FormSection title="Accommodation">
        <Field label="Bed configuration" htmlFor="p-bedconf" full>
          <Textarea
            id="p-bedconf"
            rows={2}
            value={text("bedConfiguration")}
            onChange={(e) => set("bedConfiguration", e.target.value)}
            placeholder="1 queen bed, 1 sofa bed"
          />
        </Field>
        <Field label="Living room" htmlFor="p-living">
          <Textarea
            id="p-living"
            rows={2}
            value={text("livingRoom")}
            onChange={(e) => set("livingRoom", e.target.value)}
          />
        </Field>
        <Field label="Kitchen" htmlFor="p-kitchen">
          <Textarea
            id="p-kitchen"
            rows={2}
            value={text("kitchen")}
            onChange={(e) => set("kitchen", e.target.value)}
          />
        </Field>
        <Field label="Bathroom details" htmlFor="p-bathdet" full>
          <Textarea
            id="p-bathdet"
            rows={2}
            value={text("bathroomDetails")}
            onChange={(e) => set("bathroomDetails", e.target.value)}
          />
        </Field>
      </FormSection>

      <section className="rounded-xl border border-border bg-card p-6">
        <p className="eyebrow">Amenities</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {AMENITY_KEYS.map((key) => (
            <label key={key} className="flex items-center gap-2.5 text-sm">
              <Checkbox
                checked={draft.amenities[key]}
                onCheckedChange={(v) => set("amenities", { ...draft.amenities, [key]: v === true })}
              />
              {AMENITY_LABELS[key]}
            </label>
          ))}
        </div>
      </section>

      <FormSection title="Policies">
        <Field label="Check-in time" htmlFor="p-ci">
          <Input
            id="p-ci"
            value={text("checkInTime")}
            onChange={(e) => set("checkInTime", e.target.value)}
            placeholder="15:00"
          />
        </Field>
        <Field label="Check-out time" htmlFor="p-co">
          <Input
            id="p-co"
            value={text("checkOutTime")}
            onChange={(e) => set("checkOutTime", e.target.value)}
            placeholder="11:00"
          />
        </Field>
        <Field label="Quiet hours" htmlFor="p-quiet" full>
          <Input
            id="p-quiet"
            value={text("quietHours")}
            onChange={(e) => set("quietHours", e.target.value)}
            placeholder="23:00 – 08:00"
          />
        </Field>
        {(
          [
            ["smokingAllowed", "Smoking"],
            ["petsAllowed", "Pets"],
            ["partiesAllowed", "Parties / events"],
          ] as const
        ).map(([key, label]) => (
          <Field key={key} label={label} htmlFor={`p-${key}`}>
            <Select
              value={draft[key]}
              onValueChange={(v) => set(key, v as PropertyDraft["smokingAllowed"])}
            >
              <SelectTrigger id={`p-${key}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TRI.map((t) => (
                  <SelectItem key={t} value={t}>
                    {TRI_LABEL[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        ))}
      </FormSection>

      <FormSection title="Guest access">
        <Field label="Access method" htmlFor="p-access" full>
          <Input
            id="p-access"
            value={text("accessMethod")}
            onChange={(e) => set("accessMethod", e.target.value)}
            placeholder="Lockbox, self check-in, host greeting…"
          />
        </Field>
        <Field label="Check-in instructions" htmlFor="p-ciinst" full>
          <Textarea
            id="p-ciinst"
            rows={3}
            value={text("checkInInstructions")}
            onChange={(e) => set("checkInInstructions", e.target.value)}
          />
        </Field>
        <Field label="Parking instructions" htmlFor="p-parking" full>
          <Textarea
            id="p-parking"
            rows={2}
            value={text("parkingInstructions")}
            onChange={(e) => set("parkingInstructions", e.target.value)}
          />
        </Field>
        <Field label="Wi-Fi network" htmlFor="p-wifin">
          <Input
            id="p-wifin"
            value={text("wifiNetwork")}
            onChange={(e) => set("wifiNetwork", e.target.value)}
          />
        </Field>
        <Field label="Wi-Fi password" htmlFor="p-wifip">
          <Input
            id="p-wifip"
            type="password"
            autoComplete="off"
            value={text("wifiPassword")}
            onChange={(e) => set("wifiPassword", e.target.value)}
          />
        </Field>
        <p className="text-xs text-muted-foreground sm:col-span-2">
          Access details stay on this device and are only shared with the AI for the Welcome Message
          Generator.
        </p>
      </FormSection>

      <FormSection title="Location">
        <Field label="Neighborhood" htmlFor="p-hood" full>
          <Input
            id="p-hood"
            value={text("neighborhood")}
            onChange={(e) => set("neighborhood", e.target.value)}
          />
        </Field>
        <Field label="Nearby attractions" htmlFor="p-attr">
          <Textarea
            id="p-attr"
            rows={2}
            value={text("nearbyAttractions")}
            onChange={(e) => set("nearbyAttractions", e.target.value)}
          />
        </Field>
        <Field label="Nearby restaurants" htmlFor="p-rest">
          <Textarea
            id="p-rest"
            rows={2}
            value={text("nearbyRestaurants")}
            onChange={(e) => set("nearbyRestaurants", e.target.value)}
          />
        </Field>
        <Field label="Public transport" htmlFor="p-transport">
          <Textarea
            id="p-transport"
            rows={2}
            value={text("publicTransport")}
            onChange={(e) => set("publicTransport", e.target.value)}
          />
        </Field>
        <Field label="Important landmarks" htmlFor="p-land">
          <Textarea
            id="p-land"
            rows={2}
            value={text("importantLandmarks")}
            onChange={(e) => set("importantLandmarks", e.target.value)}
          />
        </Field>
      </FormSection>

      <FormSection title="Host notes">
        <Field label="Anything else the AI should know" htmlFor="p-notes" full>
          <Textarea
            id="p-notes"
            rows={4}
            value={text("hostNotes")}
            onChange={(e) => set("hostNotes", e.target.value)}
          />
        </Field>
      </FormSection>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : submitLabel}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

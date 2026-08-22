import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, PolicySelect, PanelTitle } from "@/components/portal/fields";
import {
  inputClass,
  textareaClass,
  emptyToNull,
  numberOrNull,
} from "@/lib/portal/form-utils";
import type { Property } from "@/lib/portal/types";
import {
  createEmptyPropertyForm,
  propertyToForm,
  type PropertyFormState,
} from "@/lib/portal/property-form-state";
import { supabase } from "@/lib/supabase";

export function PropertyForm({
  property,
  onCancel,
  onSaved,
}: {
  property: Property | null;
  onCancel: () => void;
  onSaved: (
    property: Property
  ) => void;
}) {
  const [
    form,
    setForm,
  ] = useState<PropertyFormState>(() =>
    property
      ? propertyToForm(property)
      : createEmptyPropertyForm()
  );

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    formError,
    setFormError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  const update = <
    K extends keyof PropertyFormState
  >(
    key: K,
    value: PropertyFormState[K]
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setFormError("");
    setSuccess("");

    if (!form.name.trim()) {
      setFormError(
        "Property name is required."
      );
      return;
    }

    setSaving(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error(
          "Your session has expired. Please sign in again."
        );
      }

      const amenities = form.amenities
        .split(",")
        .map((item) =>
          item.trim()
        )
        .filter(Boolean);

      const payload = {
        user_id: user.id,

        name: form.name.trim(),

        city: emptyToNull(
          form.city
        ),

        country: emptyToNull(
          form.country
        ),

        address: emptyToNull(
          form.address
        ),

        listing_url: emptyToNull(
          form.listing_url
        ),

        status:
          form.status ||
          "active",

        property_type:
          emptyToNull(
            form.property_type
          ),

        description:
          emptyToNull(
            form.description
          ),

        bedrooms:
          numberOrNull(
            form.bedrooms
          ),

        bathrooms:
          numberOrNull(
            form.bathrooms
          ),

        max_guests:
          numberOrNull(
            form.max_guests
          ),

        bed_configuration:
          emptyToNull(
            form.bed_configuration
          ),

        living_room:
          emptyToNull(
            form.living_room
          ),

        kitchen:
          emptyToNull(
            form.kitchen
          ),

        bathroom_details:
          emptyToNull(
            form.bathroom_details
          ),

        amenities:
          amenities.length > 0
            ? amenities
            : null,

        check_in_time:
          emptyToNull(
            form.check_in_time
          ),

        check_out_time:
          emptyToNull(
            form.check_out_time
          ),

        quiet_hours:
          emptyToNull(
            form.quiet_hours
          ),

        smoking:
          form.smoking ||
          "not_specified",

        pets:
          form.pets ||
          "not_specified",

        parties:
          form.parties ||
          "not_specified",

        access_method:
          emptyToNull(
            form.access_method
          ),

        check_in_instructions:
          emptyToNull(
            form.check_in_instructions
          ),

        parking_instructions:
          emptyToNull(
            form.parking_instructions
          ),

        wifi_network:
          emptyToNull(
            form.wifi_network
          ),

        wifi_password:
          emptyToNull(
            form.wifi_password
          ),

        neighborhood:
          emptyToNull(
            form.neighborhood
          ),

        nearby_attractions:
          emptyToNull(
            form.nearby_attractions
          ),

        nearby_restaurants:
          emptyToNull(
            form.nearby_restaurants
          ),

        public_transport:
          emptyToNull(
            form.public_transport
          ),

        important_landmarks:
          emptyToNull(
            form.important_landmarks
          ),

        host_notes:
          emptyToNull(
            form.host_notes
          ),
      };

      if (property) {
        const {
          data,
          error,
        } = await supabase
          .from("properties")
          .update(payload)
          .eq("id", property.id)
          .eq("user_id", user.id)
          .select("*")
          .single();

        if (error) {
          throw error;
        }

        setSuccess(
          "Property updated successfully."
        );

        onSaved(
          data as Property
        );
      } else {
        const {
          data,
          error,
        } = await supabase
          .from("properties")
          .insert(payload)
          .select("*")
          .single();

        if (error) {
          throw error;
        }

        setSuccess(
          "Property created successfully."
        );

        onSaved(
          data as Property
        );
      }
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Unable to save property."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <div className="flex items-start justify-between gap-4">
        <PanelTitle
          title={
            property
              ? "Edit Property"
              : "Add Property"
          }
          sub={
            property
              ? "Update the property details used by Webrya."
              : "Add the property information Webrya can use across your AI tools."
          }
        />

        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={saving}
        >
          <X className="size-4" />
          Cancel
        </Button>
      </div>

      {/* BASIC INFORMATION */}

      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Basic information
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field
            label="Property name *"
            htmlFor="property-name"
            className="sm:col-span-2"
          >
            <input
              id="property-name"
              value={form.name}
              onChange={(e) =>
                update(
                  "name",
                  e.target.value
                )
              }
              placeholder="e.g. Seaside Apartment"
              disabled={saving}
              className={inputClass}
            />
          </Field>

          <Field
            label="Property type"
            htmlFor="property-type"
          >
            <select
              id="property-type"
              value={
                form.property_type
              }
              onChange={(e) =>
                update(
                  "property_type",
                  e.target.value
                )
              }
              disabled={saving}
              className={inputClass}
            >
              <option value="">
                Select…
              </option>

              <option value="apartment">
                Apartment
              </option>

              <option value="house">
                House
              </option>

              <option value="villa">
                Villa
              </option>

              <option value="studio">
                Studio
              </option>

              <option value="room">
                Private room
              </option>

              <option value="guesthouse">
                Guesthouse
              </option>

              <option value="hotel">
                Hotel
              </option>

              <option value="other">
                Other
              </option>
            </select>
          </Field>

          <Field
            label="Status"
            htmlFor="property-status"
          >
            <select
              id="property-status"
              value={form.status}
              onChange={(e) =>
                update(
                  "status",
                  e.target.value
                )
              }
              disabled={saving}
              className={inputClass}
            >
              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>

              <option value="draft">
                Draft
              </option>
            </select>
          </Field>

          <Field
            label="Country"
            htmlFor="property-country"
          >
            <input
              id="property-country"
              value={form.country}
              onChange={(e) =>
                update(
                  "country",
                  e.target.value
                )
              }
              placeholder="e.g. Greece"
              disabled={saving}
              className={inputClass}
            />
          </Field>

          <Field
            label="City"
            htmlFor="property-city"
          >
            <input
              id="property-city"
              value={form.city}
              onChange={(e) =>
                update(
                  "city",
                  e.target.value
                )
              }
              placeholder="e.g. Thessaloniki"
              disabled={saving}
              className={inputClass}
            />
          </Field>

          <Field
            label="Address"
            htmlFor="property-address"
            className="sm:col-span-2"
          >
            <input
              id="property-address"
              value={form.address}
              onChange={(e) =>
                update(
                  "address",
                  e.target.value
                )
              }
              placeholder="Street and number"
              disabled={saving}
              className={inputClass}
            />
          </Field>

          <Field
            label="Listing URL"
            htmlFor="property-listing-url"
            className="sm:col-span-2"
          >
            <input
              id="property-listing-url"
              type="url"
              value={
                form.listing_url
              }
              onChange={(e) =>
                update(
                  "listing_url",
                  e.target.value
                )
              }
              placeholder="https://..."
              disabled={saving}
              className={inputClass}
            />
          </Field>

          <Field
            label="Description"
            htmlFor="property-description"
            className="sm:col-span-2"
          >
            <textarea
              id="property-description"
              rows={5}
              value={
                form.description
              }
              onChange={(e) =>
                update(
                  "description",
                  e.target.value
                )
              }
              placeholder="Describe the property, its atmosphere and its main selling points."
              disabled={saving}
              className={textareaClass}
            />
          </Field>
        </div>
      </div>

      {/* CAPACITY */}

      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Capacity & layout
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <Field
            label="Bedrooms"
            htmlFor="property-bedrooms"
          >
            <input
              id="property-bedrooms"
              type="number"
              min="0"
              value={
                form.bedrooms
              }
              onChange={(e) =>
                update(
                  "bedrooms",
                  e.target.value
                )
              }
              disabled={saving}
              className={inputClass}
            />
          </Field>

          <Field
            label="Bathrooms"
            htmlFor="property-bathrooms"
          >
            <input
              id="property-bathrooms"
              type="number"
              min="0"
              step="0.5"
              value={
                form.bathrooms
              }
              onChange={(e) =>
                update(
                  "bathrooms",
                  e.target.value
                )
              }
              disabled={saving}
              className={inputClass}
            />
          </Field>

          <Field
            label="Maximum guests"
            htmlFor="property-max-guests"
          >
            <input
              id="property-max-guests"
              type="number"
              min="1"
              value={
                form.max_guests
              }
              onChange={(e) =>
                update(
                  "max_guests",
                  e.target.value
                )
              }
              disabled={saving}
              className={inputClass}
            />
          </Field>

          <Field
            label="Bed configuration"
            htmlFor="bed-configuration"
            className="sm:col-span-3"
          >
            <input
              id="bed-configuration"
              value={
                form.bed_configuration
              }
              onChange={(e) =>
                update(
                  "bed_configuration",
                  e.target.value
                )
              }
              placeholder="e.g. 1 king bed + 2 single beds + sofa bed"
              disabled={saving}
              className={inputClass}
            />
          </Field>

          <Field
            label="Living room"
            htmlFor="living-room"
          >
            <textarea
              id="living-room"
              rows={3}
              value={
                form.living_room
              }
              onChange={(e) =>
                update(
                  "living_room",
                  e.target.value
                )
              }
              placeholder="Living room details"
              disabled={saving}
              className={textareaClass}
            />
          </Field>

          <Field
            label="Kitchen"
            htmlFor="kitchen"
          >
            <textarea
              id="kitchen"
              rows={3}
              value={
                form.kitchen
              }
              onChange={(e) =>
                update(
                  "kitchen",
                  e.target.value
                )
              }
              placeholder="Kitchen details"
              disabled={saving}
              className={textareaClass}
            />
          </Field>

          <Field
            label="Bathroom details"
            htmlFor="bathroom-details"
          >
            <textarea
              id="bathroom-details"
              rows={3}
              value={
                form.bathroom_details
              }
              onChange={(e) =>
                update(
                  "bathroom_details",
                  e.target.value
                )
              }
              placeholder="Bathroom details"
              disabled={saving}
              className={textareaClass}
            />
          </Field>

          <Field
            label="Amenities"
            htmlFor="property-amenities"
            className="sm:col-span-3"
          >
            <textarea
              id="property-amenities"
              rows={3}
              value={
                form.amenities
              }
              onChange={(e) =>
                update(
                  "amenities",
                  e.target.value
                )
              }
              placeholder="WiFi, air conditioning, washing machine, balcony, sea view..."
              disabled={saving}
              className={textareaClass}
            />

            <p className="mt-1.5 text-xs text-muted-foreground">
              Separate amenities with commas.
            </p>
          </Field>
        </div>
      </div>

      {/* CHECK IN */}

      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Check-in & house policies
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field
            label="Check-in time"
            htmlFor="check-in-time"
          >
            <input
              id="check-in-time"
              value={
                form.check_in_time
              }
              onChange={(e) =>
                update(
                  "check_in_time",
                  e.target.value
                )
              }
              placeholder="e.g. 15:00"
              disabled={saving}
              className={inputClass}
            />
          </Field>

          <Field
            label="Check-out time"
            htmlFor="check-out-time"
          >
            <input
              id="check-out-time"
              value={
                form.check_out_time
              }
              onChange={(e) =>
                update(
                  "check_out_time",
                  e.target.value
                )
              }
              placeholder="e.g. 11:00"
              disabled={saving}
              className={inputClass}
            />
          </Field>

          <Field
            label="Quiet hours"
            htmlFor="quiet-hours"
            className="sm:col-span-2"
          >
            <input
              id="quiet-hours"
              value={
                form.quiet_hours
              }
              onChange={(e) =>
                update(
                  "quiet_hours",
                  e.target.value
                )
              }
              placeholder="e.g. 23:00–08:00"
              disabled={saving}
              className={inputClass}
            />
          </Field>

          <PolicySelect
            label="Smoking"
            value={form.smoking}
            onChange={(value) =>
              update(
                "smoking",
                value
              )
            }
            disabled={saving}
          />

          <PolicySelect
            label="Pets"
            value={form.pets}
            onChange={(value) =>
              update(
                "pets",
                value
              )
            }
            disabled={saving}
          />

          <PolicySelect
            label="Parties"
            value={form.parties}
            onChange={(value) =>
              update(
                "parties",
                value
              )
            }
            disabled={saving}
          />

          <Field
            label="Access method"
            htmlFor="access-method"
            className="sm:col-span-2"
          >
            <input
              id="access-method"
              value={
                form.access_method
              }
              onChange={(e) =>
                update(
                  "access_method",
                  e.target.value
                )
              }
              placeholder="e.g. Smart lock, lockbox, host meets guest"
              disabled={saving}
              className={inputClass}
            />
          </Field>

          <Field
            label="Check-in instructions"
            htmlFor="check-in-instructions"
            className="sm:col-span-2"
          >
            <textarea
              id="check-in-instructions"
              rows={5}
              value={
                form.check_in_instructions
              }
              onChange={(e) =>
                update(
                  "check_in_instructions",
                  e.target.value
                )
              }
              placeholder="Detailed arrival and check-in instructions."
              disabled={saving}
              className={textareaClass}
            />
          </Field>

          <Field
            label="Parking instructions"
            htmlFor="parking-instructions"
            className="sm:col-span-2"
          >
            <textarea
              id="parking-instructions"
              rows={4}
              value={
                form.parking_instructions
              }
              onChange={(e) =>
                update(
                  "parking_instructions",
                  e.target.value
                )
              }
              placeholder="Parking location, access, restrictions, etc."
              disabled={saving}
              className={textareaClass}
            />
          </Field>
        </div>
      </div>

      {/* WIFI */}

      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Wi-Fi
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field
            label="Wi-Fi network"
            htmlFor="wifi-network"
          >
            <input
              id="wifi-network"
              value={
                form.wifi_network
              }
              onChange={(e) =>
                update(
                  "wifi_network",
                  e.target.value
                )
              }
              disabled={saving}
              className={inputClass}
            />
          </Field>

          <Field
            label="Wi-Fi password"
            htmlFor="wifi-password"
          >
            <input
              id="wifi-password"
              value={
                form.wifi_password
              }
              onChange={(e) =>
                update(
                  "wifi_password",
                  e.target.value
                )
              }
              disabled={saving}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      {/* LOCATION */}

      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Location & neighborhood
        </p>

        <div className="mt-6 grid gap-5">
          <Field
            label="Neighborhood"
            htmlFor="neighborhood"
          >
            <textarea
              id="neighborhood"
              rows={3}
              value={
                form.neighborhood
              }
              onChange={(e) =>
                update(
                  "neighborhood",
                  e.target.value
                )
              }
              placeholder="Describe the neighborhood and atmosphere."
              disabled={saving}
              className={textareaClass}
            />
          </Field>

          <Field
            label="Nearby attractions"
            htmlFor="nearby-attractions"
          >
            <textarea
              id="nearby-attractions"
              rows={4}
              value={
                form.nearby_attractions
              }
              onChange={(e) =>
                update(
                  "nearby_attractions",
                  e.target.value
                )
              }
              placeholder="Beaches, landmarks, museums, attractions..."
              disabled={saving}
              className={textareaClass}
            />
          </Field>

          <Field
            label="Nearby restaurants"
            htmlFor="nearby-restaurants"
          >
            <textarea
              id="nearby-restaurants"
              rows={4}
              value={
                form.nearby_restaurants
              }
              onChange={(e) =>
                update(
                  "nearby_restaurants",
                  e.target.value
                )
              }
              placeholder="Recommended restaurants, cafes, bars..."
              disabled={saving}
              className={textareaClass}
            />
          </Field>

          <Field
            label="Public transport"
            htmlFor="public-transport"
          >
            <textarea
              id="public-transport"
              rows={3}
              value={
                form.public_transport
              }
              onChange={(e) =>
                update(
                  "public_transport",
                  e.target.value
                )
              }
              placeholder="Bus, metro, train, taxi information..."
              disabled={saving}
              className={textareaClass}
            />
          </Field>

          <Field
            label="Important landmarks"
            htmlFor="important-landmarks"
          >
            <textarea
              id="important-landmarks"
              rows={3}
              value={
                form.important_landmarks
              }
              onChange={(e) =>
                update(
                  "important_landmarks",
                  e.target.value
                )
              }
              placeholder="Nearby landmarks and useful reference points."
              disabled={saving}
              className={textareaClass}
            />
          </Field>
        </div>
      </div>

      {/* HOST NOTES */}

      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Host notes
        </p>

        <div className="mt-6">
          <Field
            label="Private host notes"
            htmlFor="host-notes"
          >
            <textarea
              id="host-notes"
              rows={6}
              value={
                form.host_notes
              }
              onChange={(e) =>
                update(
                  "host_notes",
                  e.target.value
                )
              }
              placeholder="Anything else Webrya should know about this property."
              disabled={saving}
              className={textareaClass}
            />
          </Field>

          <p className="mt-2 text-xs text-muted-foreground">
            Do not store highly sensitive information
            here. These notes may be used as property
            context by enabled AI features.
          </p>
        </div>
      </div>

      {formError && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {formError}
        </div>
      )}

      {success && (
        <div className="rounded-lg border border-border bg-secondary px-4 py-3 text-sm">
          {success}
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : property
              ? "Save property"
              : "Create property"}
        </Button>
      </div>
    </form>
  );
}

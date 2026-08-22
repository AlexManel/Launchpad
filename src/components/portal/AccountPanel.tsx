import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, PolicySelect, PanelTitle } from "@/components/portal/fields";
import { inputClass, textareaClass, emptyToNull } from "@/lib/portal/form-utils";
import type { Profile } from "@/lib/portal/types";
import { supabase } from "@/lib/supabase";

export function AccountPanel({
  email,
  profile,
  loading,
  error,
  onProfileChange,
}: {
  email: string;
  profile: Profile | null;
  loading: boolean;
  error: string;
  onProfileChange: (
    profile: Profile
  ) => void;
}) {
  const [saving, setSaving] =
    useState(false);

  const [formError, setFormError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [hostDisplayName, setHostDisplayName] =
    useState("");

  const [hostType, setHostType] =
    useState("");

  const [country, setCountry] =
    useState("");

  const [city, setCity] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [businessName, setBusinessName] =
    useState("");

  const [businessEmail, setBusinessEmail] =
    useState("");

  const [businessPhone, setBusinessPhone] =
    useState("");

  const [website, setWebsite] =
    useState("");

  const [
    communicationTone,
    setCommunicationTone,
  ] = useState("professional");

  const [
    responseLength,
    setResponseLength,
  ] = useState("medium");

  const [emojiUsage, setEmojiUsage] =
    useState("minimal");

  const [signOff, setSignOff] =
    useState("");

  const [hostingStyle, setHostingStyle] =
    useState("");

  const [
    aiInstructions,
    setAiInstructions,
  ] = useState("");

  const [alwaysDo, setAlwaysDo] =
    useState("");

  const [neverDo, setNeverDo] =
    useState("");

  const [aiBeConcise, setAiBeConcise] =
    useState(true);

  const [aiBeProactive, setAiBeProactive] =
    useState(true);

  const [
    aiSuggestSolutions,
    setAiSuggestSolutions,
  ] = useState(true);

  const [aiUseEmojis, setAiUseEmojis] =
    useState(false);

  const [
    aiMentionPropertyName,
    setAiMentionPropertyName,
  ] = useState(true);

  const [
    aiUseGuestFirstName,
    setAiUseGuestFirstName,
  ] = useState(true);

  const [
    allowPropertyContextAi,
    setAllowPropertyContextAi,
  ] = useState(true);

  const [
    allowAnalytics,
    setAllowAnalytics,
  ] = useState(true);

  const [
    marketingEmails,
    setMarketingEmails,
  ] = useState(false);

  useEffect(() => {
    if (!profile) {
      setHostDisplayName("");
      setHostType("");
      setCountry("");
      setCity("");
      setPhone("");

      setBusinessName("");
      setBusinessEmail("");
      setBusinessPhone("");
      setWebsite("");

      setCommunicationTone(
        "professional"
      );
      setResponseLength("medium");
      setEmojiUsage("minimal");
      setSignOff("");
      setHostingStyle("");

      setAiInstructions("");
      setAlwaysDo("");
      setNeverDo("");

      setAiBeConcise(true);
      setAiBeProactive(true);
      setAiSuggestSolutions(true);
      setAiUseEmojis(false);
      setAiMentionPropertyName(true);
      setAiUseGuestFirstName(true);

      setAllowPropertyContextAi(true);
      setAllowAnalytics(true);
      setMarketingEmails(false);

      return;
    }

    setHostDisplayName(
      profile.host_display_name ?? ""
    );

    setHostType(
      profile.host_type ?? ""
    );

    setCountry(
      profile.country ?? ""
    );

    setCity(
      profile.city ?? ""
    );

    setPhone(
      profile.phone ?? ""
    );

    setBusinessName(
      profile.business_name ?? ""
    );

    setBusinessEmail(
      profile.business_email ?? ""
    );

    setBusinessPhone(
      profile.business_phone ?? ""
    );

    setWebsite(
      profile.website ?? ""
    );

    setCommunicationTone(
      profile.communication_tone ??
        "professional"
    );

    setResponseLength(
      profile.response_length ??
        "medium"
    );

    setEmojiUsage(
      profile.emoji_usage ??
        "minimal"
    );

    setSignOff(
      profile.sign_off ?? ""
    );

    setHostingStyle(
      profile.hosting_style ?? ""
    );

    setAiInstructions(
      profile.ai_instructions ?? ""
    );

    setAlwaysDo(
      profile.always_do ?? ""
    );

    setNeverDo(
      profile.never_do ?? ""
    );

    setAiBeConcise(
      profile.ai_be_concise ?? true
    );

    setAiBeProactive(
      profile.ai_be_proactive ?? true
    );

    setAiSuggestSolutions(
      profile.ai_suggest_solutions ??
        true
    );

    setAiUseEmojis(
      profile.ai_use_emojis ?? false
    );

    setAiMentionPropertyName(
      profile.ai_mention_property_name ??
        true
    );

    setAiUseGuestFirstName(
      profile.ai_use_guest_first_name ??
        true
    );

    setAllowPropertyContextAi(
      profile.allow_property_context_ai ??
        true
    );

    setAllowAnalytics(
      profile.allow_analytics ??
        true
    );

    setMarketingEmails(
      profile.marketing_emails ??
        false
    );
  }, [profile]);

  const handleSave = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setFormError("");
    setSuccess("");
    setSaving(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setFormError(
          "Your session has expired. Please sign in again."
        );
        return;
      }

      const payload = {
        id: user.id,

        host_display_name:
          emptyToNull(
            hostDisplayName
          ),

        host_type:
          emptyToNull(hostType),

        country:
          emptyToNull(country),

        city:
          emptyToNull(city),

        phone:
          emptyToNull(phone),

        business_name:
          emptyToNull(
            businessName
          ),

        business_email:
          emptyToNull(
            businessEmail
          ),

        business_phone:
          emptyToNull(
            businessPhone
          ),

        website:
          emptyToNull(website),

        communication_tone:
          communicationTone ||
          "professional",

        response_length:
          responseLength ||
          "medium",

        emoji_usage:
          emojiUsage ||
          "minimal",

        sign_off:
          emptyToNull(signOff),

        hosting_style:
          emptyToNull(
            hostingStyle
          ),

        ai_instructions:
          emptyToNull(
            aiInstructions
          ),

        always_do:
          emptyToNull(alwaysDo),

        never_do:
          emptyToNull(neverDo),

        ai_be_concise:
          aiBeConcise,

        ai_be_proactive:
          aiBeProactive,

        ai_suggest_solutions:
          aiSuggestSolutions,

        ai_use_emojis:
          aiUseEmojis,

        ai_mention_property_name:
          aiMentionPropertyName,

        ai_use_guest_first_name:
          aiUseGuestFirstName,

        allow_property_context_ai:
          allowPropertyContextAi,

        allow_analytics:
          allowAnalytics,

        marketing_emails:
          marketingEmails,

        updated_at:
          new Date().toISOString(),
      };

      const {
        data,
        error: saveError,
      } = await supabase
        .from("profiles")
        .upsert(payload, {
          onConflict: "id",
        })
        .select("*")
        .single();

      if (saveError) {
        throw saveError;
      }

      if (data) {
        onProfileChange(
          data as Profile
        );
      }

      setSuccess(
        "Profile saved successfully."
      );
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Unable to save profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
        Loading your profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
        Unable to load profile:{" "}
        {error}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSave}
      className="space-y-8"
    >
      <PanelTitle
        title="Account"
        sub="Your host profile and how Webrya should communicate on your behalf."
      />

      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Profile
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          Email is managed by your login and
          cannot be changed here.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field
            label="Email"
            htmlFor="account-email"
            className="sm:col-span-2"
          >
            <input
              id="account-email"
              value={email}
              readOnly
              disabled
              className={inputClass}
            />
          </Field>

          <Field
            label="Display name"
            htmlFor="host-display-name"
          >
            <input
              id="host-display-name"
              value={hostDisplayName}
              onChange={(e) =>
                setHostDisplayName(
                  e.target.value
                )
              }
              placeholder="e.g. Alex & Team"
              disabled={saving}
              className={inputClass}
            />
          </Field>

          <Field
            label="Host type"
            htmlFor="host-type"
          >
            <select
              id="host-type"
              value={hostType}
              onChange={(e) =>
                setHostType(
                  e.target.value
                )
              }
              disabled={saving}
              className={inputClass}
            >
              <option value="">
                Select…
              </option>

              <option value="individual_host">
                Individual host
              </option>

              <option value="professional_host">
                Professional host
              </option>

              <option value="property_manager">
                Property manager
              </option>

              <option value="co_host">
                Co-host
              </option>

              <option value="hospitality_business">
                Hospitality business
              </option>

              <option value="other">
                Other
              </option>
            </select>
          </Field>

          <Field
            label="Country"
            htmlFor="profile-country"
          >
            <input
              id="profile-country"
              value={country}
              onChange={(e) =>
                setCountry(
                  e.target.value
                )
              }
              disabled={saving}
              className={inputClass}
            />
          </Field>

          <Field
            label="City"
            htmlFor="profile-city"
          >
            <input
              id="profile-city"
              value={city}
              onChange={(e) =>
                setCity(
                  e.target.value
                )
              }
              disabled={saving}
              className={inputClass}
            />
          </Field>

          <Field
            label="Phone"
            htmlFor="profile-phone"
          >
            <input
              id="profile-phone"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
              disabled={saving}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Business details
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field
            label="Business name"
            htmlFor="business-name"
          >
            <input
              id="business-name"
              value={businessName}
              onChange={(e) =>
                setBusinessName(
                  e.target.value
                )
              }
              disabled={saving}
              className={inputClass}
            />
          </Field>

          <Field
            label="Website"
            htmlFor="business-website"
          >
            <input
              id="business-website"
              value={website}
              onChange={(e) =>
                setWebsite(
                  e.target.value
                )
              }
              placeholder="https://"
              disabled={saving}
              className={inputClass}
            />
          </Field>

          <Field
            label="Business email"
            htmlFor="business-email"
          >
            <input
              id="business-email"
              type="email"
              value={businessEmail}
              onChange={(e) =>
                setBusinessEmail(
                  e.target.value
                )
              }
              disabled={saving}
              className={inputClass}
            />
          </Field>

          <Field
            label="Business phone"
            htmlFor="business-phone"
          >
            <input
              id="business-phone"
              value={businessPhone}
              onChange={(e) =>
                setBusinessPhone(
                  e.target.value
                )
              }
              disabled={saving}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Communication style
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field
            label="Communication tone"
            htmlFor="communication-tone"
          >
            <select
              id="communication-tone"
              value={communicationTone}
              onChange={(e) =>
                setCommunicationTone(
                  e.target.value
                )
              }
              disabled={saving}
              className={inputClass}
            >
              <option value="professional">
                Professional
              </option>
              <option value="friendly">
                Friendly
              </option>
              <option value="warm">
                Warm
              </option>
              <option value="casual">
                Casual
              </option>
              <option value="luxury">
                Luxury
              </option>
              <option value="direct">
                Direct
              </option>
            </select>
          </Field>

          <Field
            label="Response length"
            htmlFor="response-length"
          >
            <select
              id="response-length"
              value={responseLength}
              onChange={(e) =>
                setResponseLength(
                  e.target.value
                )
              }
              disabled={saving}
              className={inputClass}
            >
              <option value="short">
                Short
              </option>
              <option value="medium">
                Medium
              </option>
              <option value="detailed">
                Detailed
              </option>
            </select>
          </Field>

          <Field
            label="Emoji usage"
            htmlFor="emoji-usage"
          >
            <select
              id="emoji-usage"
              value={emojiUsage}
              onChange={(e) =>
                setEmojiUsage(
                  e.target.value
                )
              }
              disabled={saving}
              className={inputClass}
            >
              <option value="none">
                None
              </option>
              <option value="minimal">
                Minimal
              </option>
              <option value="moderate">
                Moderate
              </option>
              <option value="frequent">
                Frequent
              </option>
            </select>
          </Field>

          <Field
            label="Sign-off"
            htmlFor="sign-off"
          >
            <input
              id="sign-off"
              value={signOff}
              onChange={(e) =>
                setSignOff(
                  e.target.value
                )
              }
              placeholder="e.g. Best, Alex"
              disabled={saving}
              className={inputClass}
            />
          </Field>

          <Field
            label="Hosting style"
            htmlFor="hosting-style"
            className="sm:col-span-2"
          >
            <select
              id="hosting-style"
              value={hostingStyle}
              onChange={(e) =>
                setHostingStyle(
                  e.target.value
                )
              }
              disabled={saving}
              className={inputClass}
            >
              <option value="">
                Select…
              </option>

              <option value="friendly_personal">
                Friendly and personal
              </option>

              <option value="professional_efficient">
                Professional and efficient
              </option>

              <option value="warm_welcoming">
                Warm and welcoming
              </option>

              <option value="premium_luxury">
                Premium / luxury
              </option>

              <option value="casual_relaxed">
                Casual and relaxed
              </option>
            </select>
          </Field>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          AI instructions
        </p>

        <div className="mt-6 grid gap-5">
          <Field
            label="Additional instructions"
            htmlFor="ai-instructions"
          >
            <textarea
              id="ai-instructions"
              value={aiInstructions}
              onChange={(e) =>
                setAiInstructions(
                  e.target.value
                )
              }
              rows={4}
              placeholder="Tell Webrya anything specific about how you want your AI assistant to respond."
              disabled={saving}
              className={textareaClass}
            />
          </Field>

          <Field
            label="Always do"
            htmlFor="always-do"
          >
            <textarea
              id="always-do"
              value={alwaysDo}
              onChange={(e) =>
                setAlwaysDo(
                  e.target.value
                )
              }
              rows={3}
              placeholder="Things the AI should consistently do."
              disabled={saving}
              className={textareaClass}
            />
          </Field>

          <Field
            label="Never do"
            htmlFor="never-do"
          >
            <textarea
              id="never-do"
              value={neverDo}
              onChange={(e) =>
                setNeverDo(
                  e.target.value
                )
              }
              rows={3}
              placeholder="Things the AI must never do."
              disabled={saving}
              className={textareaClass}
            />
          </Field>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          AI behavior
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {(
            [
              [
                "ai_be_concise",
                aiBeConcise,
                setAiBeConcise,
                "Be concise",
                "Prefer shorter, clearer replies.",
              ],
              [
                "ai_be_proactive",
                aiBeProactive,
                setAiBeProactive,
                "Be proactive",
                "Anticipate next steps when helpful.",
              ],
              [
                "ai_suggest_solutions",
                aiSuggestSolutions,
                setAiSuggestSolutions,
                "Suggest solutions",
                "Offer practical alternatives when issues arise.",
              ],
              [
                "ai_use_emojis",
                aiUseEmojis,
                setAiUseEmojis,
                "Use emojis",
                "Allow emojis according to emoji usage above.",
              ],
              [
                "ai_mention_property_name",
                aiMentionPropertyName,
                setAiMentionPropertyName,
                "Mention property name",
                "Include the property name when relevant.",
              ],
              [
                "ai_use_guest_first_name",
                aiUseGuestFirstName,
                setAiUseGuestFirstName,
                "Use guest first name",
                "Address the guest by first name when known.",
              ],
            ] as const
          ).map(
            ([
              key,
              value,
              setter,
              title,
              desc,
            ]) => (
              <label
                key={key}
                className="flex cursor-pointer gap-3 rounded-lg border border-border p-4"
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) =>
                    setter(
                      e.target.checked
                    )
                  }
                  disabled={saving}
                  className="mt-1 size-4"
                />

                <span>
                  <span className="block text-sm font-medium">
                    {title}
                  </span>

                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {desc}
                  </span>
                </span>
              </label>
            )
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Privacy & settings
        </p>

        <div className="mt-5 grid gap-3">
          <label className="flex cursor-pointer gap-3 rounded-lg border border-border p-4">
            <input
              type="checkbox"
              checked={
                allowPropertyContextAi
              }
              onChange={(e) =>
                setAllowPropertyContextAi(
                  e.target.checked
                )
              }
              disabled={saving}
              className="mt-1 size-4"
            />

            <span>
              <span className="block text-sm font-medium">
                Use property context for AI
              </span>

              <span className="mt-0.5 block text-xs text-muted-foreground">
                Allow Webrya to use your saved property
                details when generating responses.
              </span>
            </span>
          </label>

          <label className="flex cursor-pointer gap-3 rounded-lg border border-border p-4">
            <input
              type="checkbox"
              checked={allowAnalytics}
              onChange={(e) =>
                setAllowAnalytics(
                  e.target.checked
                )
              }
              disabled={saving}
              className="mt-1 size-4"
            />

            <span>
              <span className="block text-sm font-medium">
                Anonymous product analytics
              </span>

              <span className="mt-0.5 block text-xs text-muted-foreground">
                Help improve Webrya with anonymous usage
                data.
              </span>
            </span>
          </label>

          <label className="flex cursor-pointer gap-3 rounded-lg border border-border p-4">
            <input
              type="checkbox"
              checked={marketingEmails}
              onChange={(e) =>
                setMarketingEmails(
                  e.target.checked
                )
              }
              disabled={saving}
              className="mt-1 size-4"
            />

            <span>
              <span className="block text-sm font-medium">
                Marketing emails
              </span>

              <span className="mt-0.5 block text-xs text-muted-foreground">
                Product updates and occasional offers.
                Security emails are always sent.
              </span>
            </span>
          </label>
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

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save changes"}
        </Button>
      </div>
    </form>
  );
}

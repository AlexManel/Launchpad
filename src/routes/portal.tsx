import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Sparkles,
  Package,
  Home,
  BookOpen,
  User,
  LogOut,
  Plus,
  ArrowLeft,
  Pencil,
  Trash2,
  X,
  Loader2,
  Copy,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/Logo";
import { supabase } from "@/lib/supabase";
import { tools } from "@/data/webrya";
import { generateToolOutput } from "@/lib/ai-tools.functions";
import type { AiTool } from "@/lib/ai/types";
import { toast } from "sonner";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Webrya Workspace" },
      {
        name: "description",
        content: "Your Webrya tools, products and properties in one place.",
      },
    ],
  }),
  component: PortalPage,
});

type SectionId =
  | "overview"
  | "tools"
  | "products"
  | "properties"
  | "resources"
  | "account";

type Property = {
  id: string;
  user_id: string;
  name: string;
  city: string | null;
  country: string | null;
  address: string | null;
  listing_url: string | null;
  status: string;
  property_type: string | null;
  description: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  max_guests: number | null;
  bed_configuration: string | null;
  living_room: string | null;
  kitchen: string | null;
  bathroom_details: string | null;
  amenities: string[] | null;
  check_in_time: string | null;
  check_out_time: string | null;
  quiet_hours: string | null;
  smoking: string | null;
  pets: string | null;
  parties: string | null;
  access_method: string | null;
  check_in_instructions: string | null;
  parking_instructions: string | null;
  wifi_network: string | null;
  wifi_password: string | null;
  neighborhood: string | null;
  nearby_attractions: string | null;
  nearby_restaurants: string | null;
  public_transport: string | null;
  important_landmarks: string | null;
  host_notes: string | null;
};

type Profile = {
  id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  website: string | null;
  preferred_language: string;
  timezone: string | null;
  host_display_name: string | null;
  host_type: string | null;
  business_name: string | null;
  business_email: string | null;
  business_phone: string | null;
  country: string | null;
  city: string | null;
  phone: string | null;
  communication_tone: string | null;
  response_length: string | null;
  emoji_usage: string | null;
  sign_off: string | null;
  hosting_style: string | null;
  ai_instructions: string | null;
  never_do: string | null;
  always_do: string | null;
  ai_be_concise: boolean;
  ai_be_proactive: boolean;
  ai_suggest_solutions: boolean;
  ai_use_emojis: boolean;
  ai_mention_property_name: boolean;
  ai_use_guest_first_name: boolean;
  allow_property_context_ai: boolean;
  allow_analytics: boolean;
  marketing_emails: boolean;
};

const inputClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

const textareaClass =
  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

function Field({
  label,
  htmlFor,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}

function PolicySelect({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <Field label={label} htmlFor={`policy-${label}`}>
      <select
        id={`policy-${label}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={inputClass}
      >
        <option value="not_specified">Not specified</option>
        <option value="allowed">Allowed</option>
        <option value="not_allowed">Not allowed</option>
        <option value="upon_request">Upon request</option>
      </select>
    </Field>
  );
}

function PanelTitle({
  title,
  sub,
}: {
  title: string;
  sub: string;
}) {
  return (
    <div>
      <h1 className="text-2xl">{title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
    </div>
  );
}

function emptyToNull(value: string): string | null {
  const t = value.trim();
  return t.length > 0 ? t : null;
}

function numberOrNull(value: string): number | null {
  const t = value.trim();

  if (!t) {
    return null;
  }

  const n = Number(t);

  return Number.isFinite(n) ? n : null;
}

/* =========================================================
   PORTAL
========================================================= */

function PortalPage() {
  const navigate = useNavigate();

  const [section, setSection] =
    useState<SectionId>("overview");

  const [name, setName] = useState("Host");
  const [email, setEmail] = useState("");
  const [ready, setReady] = useState(false);

  const [properties, setProperties] =
    useState<Property[]>([]);

  const [propertiesLoading, setPropertiesLoading] =
    useState(true);

  const [propertiesError, setPropertiesError] =
    useState("");

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [profileLoading, setProfileLoading] =
    useState(true);

  const [profileError, setProfileError] =
    useState("");

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        void navigate({ to: "/login" });
        return;
      }

      const user = session.user;

      const metadataName =
        typeof user.user_metadata?.full_name === "string"
          ? user.user_metadata.full_name.trim()
          : "";

      if (mounted) {
        setName(
          metadataName ||
            user.email?.split("@")[0] ||
            "Host"
        );

        setEmail(user.email ?? "");
        setReady(true);
      }

      const {
        data,
        error,
      } = await supabase
        .from("properties")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (!mounted) return;

      if (error) {
        setPropertiesError(error.message);
      } else {
        setProperties(
          (data as Property[]) ?? []
        );
      }

      setPropertiesLoading(false);

      const {
        data: profileData,
        error: profileErr,
      } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (!mounted) return;

      if (profileErr) {
        setProfileError(profileErr.message);
      } else {
        setProfile(
          (profileData as Profile | null) ??
            null
        );
      }

      setProfileLoading(false);
    };

    void load();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          void navigate({ to: "/login" });
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    void navigate({ to: "/login" });
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Loading workspace...
      </div>
    );
  }

  const nav: {
    id: SectionId;
    label: string;
    icon: typeof Home;
  }[] = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      id: "tools",
      label: "AI Tools",
      icon: Sparkles,
    },
    {
      id: "products",
      label: "My Products",
      icon: Package,
    },
    {
      id: "properties",
      label: "My Properties",
      icon: Home,
    },
    {
      id: "resources",
      label: "Resources",
      icon: BookOpen,
    },
    {
      id: "account",
      label: "Account",
      icon: User,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <Logo />

            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
              Webrya Workspace
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
            >
              <Link to="/">
                <ArrowLeft className="size-4" />
                Back to site
              </Link>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => void signOut()}
            >
              <LogOut className="size-4" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[220px_1fr] lg:px-8">
        <aside className="space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active =
              section === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  setSection(item.id)
                }
                className={
                  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors " +
                  (active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground")
                }
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
              </button>
            );
          })}
        </aside>

        <main>
          {section === "overview" && (
            <div>
              <h1 className="text-3xl">
                Welcome back.
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Signed in as {name}. Your tools
                and properties live here.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    AI Tools
                  </p>

                  <p className="mt-2 text-3xl">
                    {tools.length}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    available
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Properties
                  </p>

                  <p className="mt-2 text-3xl">
                    {properties.length}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    connected
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Account
                  </p>

                  <p className="mt-2 text-lg">
                    {name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Free tools
                  </p>
                </div>
              </div>
            </div>
          )}

                    {section === "tools" && (
            <WorkspaceAIPanel properties={properties} />
          )}

          {section === "products" && (
            <div>
              <PanelTitle
                title="My Products"
                sub="Downloads for products you own will appear here."
              />

              <div className="mt-6 rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                No purchased products yet.
              </div>
            </div>
          )}

          {section === "properties" && (
            <PropertiesPanel
              properties={properties}
              loading={propertiesLoading}
              error={propertiesError}
              onPropertiesChange={
                setProperties
              }
            />
          )}

          {section === "resources" && (
            <div>
              <PanelTitle
                title="Resources"
                sub="Guides and playbooks for hosts."
              />

              <div className="mt-6">
                <Button
                  asChild
                  variant="outline"
                >
                  <Link to="/resources">
                    Browse all resources
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {section === "account" && (
            <AccountPanel
              email={email}
              profile={profile}
              loading={profileLoading}
              error={profileError}
              onProfileChange={
                setProfile
              }
            />
          )}
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   ACCOUNT PANEL
========================================================= */


function buildPropertyContext(property: Property): string {
  const lines: string[] = [];
  const add = (label: string, value: string | number | null | undefined) => {
    if (value === null || value === undefined) return;
    const s = String(value).trim();
    if (!s) return;
    lines.push(`${label}: ${s}`);
  };

  add("Property name", property.name);
  add("Type", property.property_type);
  add("City", property.city);
  add("Country", property.country);
  add("Address", property.address);
  add("Bedrooms", property.bedrooms);
  add("Bathrooms", property.bathrooms);
  add("Max guests", property.max_guests);
  add("Check-in", property.check_in_time);
  add("Check-out", property.check_out_time);
  add("Quiet hours", property.quiet_hours);
  add("Smoking", property.smoking);
  add("Pets", property.pets);
  add("Parties", property.parties);
  add("Access method", property.access_method);
  add("Check-in instructions", property.check_in_instructions);
  add("Parking", property.parking_instructions);
  add("Wi-Fi network", property.wifi_network);
  // Intentionally omit wifi_password from AI context by default (security)
  add("Neighborhood", property.neighborhood);
  add("Nearby attractions", property.nearby_attractions);
  add("Nearby restaurants", property.nearby_restaurants);
  add("Public transport", property.public_transport);
  add("Landmarks", property.important_landmarks);
  add("Host notes", property.host_notes);
  if (property.amenities && property.amenities.length > 0) {
    lines.push(`Amenities: ${property.amenities.join(", ")}`);
  }
  return lines.join("\n");
}

function WorkspaceAIPanel({ properties }: { properties: Property[] }) {
  const [activeSlug, setActiveSlug] = useState<string>(tools[0]?.slug ?? "");
  const [propertyId, setPropertyId] = useState<string>("");
  const [input, setInput] = useState("");
  const [extra, setExtra] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const tool = tools.find((t) => t.slug === activeSlug) ?? tools[0];
  const selected = properties.find((p) => p.id === propertyId) ?? null;

  const generate = async () => {
    if (!tool) return;
    if (!input.trim()) {
      toast.error("Add the guest message or review first.");
      return;
    }
    setLoading(true);
    setOutput("");
    setFeedback(null);
    try {
      const propertyContext =
        selected && propertyId
          ? buildPropertyContext(selected)
          : undefined;

      const res = await generateToolOutput({
        data: {
          tool: tool.slug as AiTool,
          input: input.trim(),
          ...(extra.trim() ? { extra: extra.trim() } : {}),
          ...(propertyContext
            ? { propertyContext }
            : {}),
        },
      });
      setOutput(res.text);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not generate a response."
      );
    } finally {
      setLoading(false);
    }
  };

  const saveFeedback = async (rating: "up" | "down") => {
    setFeedback(rating);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { error } = await supabase.from("ai_feedback").insert({
        tool: tool?.slug ?? activeSlug,
        rating,
        input_preview: input.trim().slice(0, 500) || null,
        output_preview: output.trim().slice(0, 500) || null,
        user_id: user?.id ?? null,
      });
      if (error) throw error;
      toast.success("Feedback saved.");
    } catch {
      toast.error("Could not save feedback.");
      setFeedback(null);
    }
  };

  return (
    <div>
      <PanelTitle
        title="AI Tools"
        sub="Logged-in tools can use a saved property so replies use your real parking, check-in and house details."
      />

      <div className="mt-4 rounded-lg border border-border bg-secondary/40 px-4 py-3 text-sm text-muted-foreground">
        Public free tools on the website stay simple (no property data). Here you
        can optionally attach one of your properties for more accurate answers.
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {tools.map((t) => (
          <button
            key={t.slug}
            type="button"
            onClick={() => {
              setActiveSlug(t.slug);
              setOutput("");
              setFeedback(null);
            }}
            className={
              "rounded-full border px-3 py-1.5 text-sm transition-colors " +
              (activeSlug === t.slug
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:bg-secondary")
            }
          >
            {t.name}
          </button>
        ))}
      </div>

      {tool && (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-xl border border-border bg-card p-6">
            <Field label="Property (optional)" htmlFor="ws-property">
              <select
                id="ws-property"
                value={propertyId}
                onChange={(e) => setPropertyId(e.target.value)}
                className={inputClass}
                disabled={loading}
              >
                <option value="">No property — type policy only</option>
                {properties.map((pr) => (
                  <option key={pr.id} value={pr.id}>
                    {pr.name}
                    {pr.city ? ` · ${pr.city}` : ""}
                  </option>
                ))}
              </select>
            </Field>
            {properties.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Add a property under My Properties to unlock context-aware replies.
              </p>
            )}
            {selected && (
              <p className="text-xs text-muted-foreground">
                Using saved details for this listing (parking, access, check-in,
                notes, etc.). Wi-Fi passwords are not sent to the model.
              </p>
            )}

            <Field label={tool.inputLabel} htmlFor="ws-input">
              <textarea
                id="ws-input"
                rows={6}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={tool.placeholder}
                disabled={loading}
                className={textareaClass}
              />
            </Field>

            {tool.secondaryLabel && (
              <Field label={tool.secondaryLabel} htmlFor="ws-extra">
                <textarea
                  id="ws-extra"
                  rows={3}
                  value={extra}
                  onChange={(e) => setExtra(e.target.value)}
                  placeholder={tool.secondaryPlaceholder}
                  disabled={loading}
                  className={textareaClass}
                />
              </Field>
            )}

            <Button
              type="button"
              className="w-full"
              disabled={loading}
              onClick={() => void generate()}
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              {loading ? "Generating…" : "Generate"}
            </Button>
          </div>

          <div className="flex flex-col rounded-xl border border-border bg-surface p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Result
              </p>
              {output ? (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    void navigator.clipboard.writeText(output);
                    toast.success("Copied");
                  }}
                >
                  <Copy className="size-4" /> Copy
                </Button>
              ) : null}
            </div>
            <div className="mt-4 flex-1 whitespace-pre-wrap text-sm leading-relaxed">
              {output || (
                <span className="text-muted-foreground">
                  Your generated text will appear here.
                </span>
              )}
            </div>
            {output ? (
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
                <span>Was this useful?</span>
                <Button
                  type="button"
                  size="sm"
                  variant={feedback === "up" ? "default" : "outline"}
                  onClick={() => void saveFeedback("up")}
                >
                  Yes
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={feedback === "down" ? "default" : "outline"}
                  onClick={() => void saveFeedback("down")}
                >
                  Needs work
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}


function AccountPanel({
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

/* =========================================================
   PROPERTY FORM DEFAULT
========================================================= */

function createEmptyPropertyForm() {
  return {
    name: "",
    city: "",
    country: "",
    address: "",
    listing_url: "",
    status: "active",
    property_type: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    max_guests: "",
    bed_configuration: "",
    living_room: "",
    kitchen: "",
    bathroom_details: "",
    amenities: "",
    check_in_time: "",
    check_out_time: "",
    quiet_hours: "",
    smoking: "not_specified",
    pets: "not_specified",
    parties: "not_specified",
    access_method: "",
    check_in_instructions: "",
    parking_instructions: "",
    wifi_network: "",
    wifi_password: "",
    neighborhood: "",
    nearby_attractions: "",
    nearby_restaurants: "",
    public_transport: "",
    important_landmarks: "",
    host_notes: "",
  };
}

type PropertyFormState = ReturnType<
  typeof createEmptyPropertyForm
>;

function propertyToForm(
  property: Property
): PropertyFormState {
  return {
    name: property.name ?? "",
    city: property.city ?? "",
    country: property.country ?? "",
    address: property.address ?? "",
    listing_url:
      property.listing_url ?? "",
    status:
      property.status ?? "active",
    property_type:
      property.property_type ?? "",
    description:
      property.description ?? "",
    bedrooms:
      property.bedrooms == null
        ? ""
        : String(property.bedrooms),
    bathrooms:
      property.bathrooms == null
        ? ""
        : String(property.bathrooms),
    max_guests:
      property.max_guests == null
        ? ""
        : String(property.max_guests),
    bed_configuration:
      property.bed_configuration ??
      "",
    living_room:
      property.living_room ?? "",
    kitchen:
      property.kitchen ?? "",
    bathroom_details:
      property.bathroom_details ??
      "",
    amenities:
      property.amenities?.join(", ") ??
      "",
    check_in_time:
      property.check_in_time ?? "",
    check_out_time:
      property.check_out_time ??
      "",
    quiet_hours:
      property.quiet_hours ?? "",
    smoking:
      property.smoking ??
      "not_specified",
    pets:
      property.pets ??
      "not_specified",
    parties:
      property.parties ??
      "not_specified",
    access_method:
      property.access_method ?? "",
    check_in_instructions:
      property.check_in_instructions ??
      "",
    parking_instructions:
      property.parking_instructions ??
      "",
    wifi_network:
      property.wifi_network ?? "",
    wifi_password:
      property.wifi_password ?? "",
    neighborhood:
      property.neighborhood ?? "",
    nearby_attractions:
      property.nearby_attractions ??
      "",
    nearby_restaurants:
      property.nearby_restaurants ??
      "",
    public_transport:
      property.public_transport ??
      "",
    important_landmarks:
      property.important_landmarks ??
      "",
    host_notes:
      property.host_notes ?? "",
  };
}

/* =========================================================
   PROPERTIES PANEL
========================================================= */

function PropertiesPanel({
  properties,
  loading,
  error,
  onPropertiesChange,
}: {
  properties: Property[];
  loading: boolean;
  error: string;
  onPropertiesChange: (
    properties: Property[]
  ) => void;
}) {
  const [
    editingProperty,
    setEditingProperty,
  ] = useState<Property | null>(null);

  const [
    showForm,
    setShowForm,
  ] = useState(false);

  const [
    deletingId,
    setDeletingId,
  ] = useState<string | null>(null);

  const [
    actionError,
    setActionError,
  ] = useState("");

  const openCreate = () => {
    setActionError("");
    setEditingProperty(null);
    setShowForm(true);
  };

  const openEdit = (
    property: Property
  ) => {
    setActionError("");
    setEditingProperty(property);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProperty(null);
  };

  const handleSaved = (
    property: Property
  ) => {
    if (editingProperty) {
      onPropertiesChange(
        properties.map((item) =>
          item.id === property.id
            ? property
            : item
        )
      );
    } else {
      onPropertiesChange([
        property,
        ...properties,
      ]);
    }

    closeForm();
  };

  const handleDelete = async (
    property: Property
  ) => {
    const confirmed =
      window.confirm(
        `Delete "${property.name}"? This cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    setDeletingId(property.id);
    setActionError("");

    try {
      const { error: deleteError } =
        await supabase
          .from("properties")
          .delete()
          .eq("id", property.id);

      if (deleteError) {
        throw deleteError;
      }

      onPropertiesChange(
        properties.filter(
          (item) =>
            item.id !== property.id
        )
      );
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : "Unable to delete property."
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div>
        <PanelTitle
          title="My Properties"
          sub="Save property details once and use them across Webrya."
        />

        <div className="mt-6 rounded-xl border border-border bg-card p-8 text-sm text-muted-foreground">
          Loading your properties...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <PanelTitle
          title="My Properties"
          sub="Save property details once and use them across Webrya."
        />

        <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
          Unable to load properties:{" "}
          {error}
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <PropertyForm
        property={editingProperty}
        onCancel={closeForm}
        onSaved={handleSaved}
      />
    );
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <PanelTitle
          title="My Properties"
          sub="Save property details once and use them across Webrya."
        />

        <Button onClick={openCreate}>
          <Plus className="size-4" />
          Add property
        </Button>
      </div>

      {actionError && (
        <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {actionError}
        </div>
      )}

      {properties.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-border p-10 text-center">
          <Home className="mx-auto size-8 text-muted-foreground" />

          <h2 className="mt-4 text-lg">
            No properties yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Add your first property so Webrya
            can use its details when generating
            guest replies, listings, house rules
            and other content.
          </p>

          <Button
            className="mt-5"
            onClick={openCreate}
          >
            <Plus className="size-4" />
            Add your first property
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl">
                      {property.name}
                    </h2>

                    <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                      {property.status ||
                        "active"}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {[
                      property.city,
                      property.country,
                    ]
                      .filter(Boolean)
                      .join(", ") ||
                      "Location not specified"}
                  </p>

                  <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Type
                      </p>
                      <p className="mt-1">
                        {property.property_type ||
                          "Not specified"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Guests
                      </p>
                      <p className="mt-1">
                        {property.max_guests ??
                          "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Bedrooms
                      </p>
                      <p className="mt-1">
                        {property.bedrooms ??
                          "—"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      openEdit(property)
                    }
                  >
                    <Pencil className="size-4" />
                    Edit
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={
                      deletingId ===
                      property.id
                    }
                    onClick={() =>
                      void handleDelete(
                        property
                      )
                    }
                  >
                    <Trash2 className="size-4" />
                    {deletingId ===
                    property.id
                      ? "Deleting..."
                      : "Delete"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   PROPERTY FORM
========================================================= */

function PropertyForm({
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
import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Sparkles,
  Package,
  Home,
  BookOpen,
  User,
  ArrowUpRight,
  LogOut,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/Logo";
import { tools, products, resources } from "@/data/webrya";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Webrya Workspace — Webrya" },
      {
        name: "description",
        content:
          "Your Webrya Workspace: AI tools, digital products, properties and resources in one place.",
      },
      { property: "og:title", content: "Webrya Workspace — Webrya" },
      {
        property: "og:description",
        content:
          "One workspace for your short-term rental tools, products and properties.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portal,
});

const sections = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "tools", label: "AI Tools", icon: Sparkles },
  { id: "products", label: "My Products", icon: Package },
  { id: "properties", label: "My Properties", icon: Home },
  { id: "resources", label: "Resources", icon: BookOpen },
  { id: "account", label: "Account", icon: User },
] as const;

type SectionId = (typeof sections)[number]["id"];

const owned = [
  "aircover-suite",
  "review-protection-suite",
  "guest-communication-suite",
];

type Property = {
  id: string;
  name: string;
  city: string | null;
  country: string | null;
  address: string | null;
  listing_url: string | null;
  status: string;
};

type ActivityItem = {
  text: string;
  when: string;
};

function Portal() {
  const navigate = useNavigate();

  const [section, setSection] = useState<SectionId>("overview");
  const [name, setName] = useState("Host");
  const [email, setEmail] = useState("");

  const [properties, setProperties] = useState<Property[]>([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [propertiesError, setPropertiesError] = useState("");

  const [activity] = useState<ActivityItem[]>([]);

  useEffect(() => {
    let mounted = true;

    const loadWorkspace = async () => {
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

      if (metadataName) {
        if (mounted) {
          setName(metadataName);
          setEmail(user.email ?? "");
        }
      } else {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .maybeSingle();

        if (mounted) {
          setName(
            profile?.full_name?.trim() ||
              user.email?.split("@")[0] ||
              "Host"
          );
          setEmail(user.email ?? "");
        }
      }

      const { data: propertyRows, error: propertyError } = await supabase
        .from("properties")
        .select(
          "id, name, city, country, address, listing_url, status"
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!mounted) {
        return;
      }

      if (propertyError) {
        setPropertiesError(propertyError.message);
        setProperties([]);
      } else {
        setProperties(propertyRows ?? []);
      }

      setPropertiesLoading(false);
    };

    void loadWorkspace();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        void navigate({ to: "/login" });
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    void navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <Logo />

            <span className="hidden rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground sm:inline">
              Webrya Workspace
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/">Back to site</Link>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
            >
              <LogOut className="size-4" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[220px_1fr] lg:px-8">
        <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSection(s.id)}
              className={
                "flex shrink-0 items-center gap-2.5 rounded-md px-3 py-2.5 text-sm transition-colors " +
                (section === s.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground")
              }
            >
              <s.icon className="size-4" />
              {s.label}
            </button>
          ))}
        </nav>

        <main>
          {section === "overview" && (
            <Overview
              name={name}
              propertyCount={properties.length}
              onNavigate={setSection}
            />
          )}

          {section === "tools" && <ToolsPanel />}
          {section === "products" && <ProductsPanel />}

          {section === "properties" && (
            <PropertiesPanel
              properties={properties}
              loading={propertiesLoading}
              error={propertiesError}
              onPropertiesChange={setProperties}
            />
          )}

          {section === "resources" && <ResourcesPanel />}

          {section === "account" && (
            <AccountPanel name={name} email={email} />
          )}
        </main>
      </div>
    </div>
  );
}

function PanelTitle({
  title,
  sub,
}: {
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl">{title}</h1>

      {sub && (
        <p className="mt-2 text-sm text-muted-foreground">
          {sub}
        </p>
      )}
    </div>
  );
}

function Overview({
  name,
  propertyCount,
  onNavigate,
}: {
  name: string;
  propertyCount: number;
  onNavigate: (s: SectionId) => void;
}) {
  const stats = [
    {
      label: "AI Tools",
      value: "5",
      note: "available",
      to: "tools" as SectionId,
    },
    {
      label: "Digital Products",
      value: "3",
      note: "owned",
      to: "products" as SectionId,
    },
    {
      label: "Properties",
      value: String(propertyCount),
      note: propertyCount === 1 ? "connected" : "connected",
      to: "properties" as SectionId,
    },
  ];

  return (
    <>
      <PanelTitle
        title="Welcome back."
        sub={`Signed in as ${name}. Everything you've purchased, created and saved — in one place.`}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => onNavigate(s.to)}
            className="rounded-xl border border-border bg-card p-6 text-left transition-shadow hover:shadow-[var(--shadow-card)]"
          >
            <p className="eyebrow">{s.label}</p>
            <p className="mt-3 font-display text-4xl">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {s.note}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-xl border border-border bg-card p-7">
          <p className="eyebrow">Quick actions</p>

          <div className="mt-5 grid gap-3">
            {[
              {
                label: "Generate Review Response",
                slug: "review-response-generator",
              },
              {
                label: "Reply to Guest",
                slug: "guest-reply-generator",
              },
              {
                label: "Optimize Listing",
                slug: "listing-optimizer",
              },
            ].map((a) => (
              <Link
                key={a.slug}
                to="/ai-tools/$slug"
                params={{ slug: a.slug }}
                className="flex items-center justify-between rounded-lg border border-border px-4 py-3.5 text-sm transition-colors hover:bg-secondary"
              >
                {a.label}
                <ArrowUpRight className="size-4 text-accent" />
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-7">
          <p className="eyebrow">Recent activity</p>

          {activity.length === 0 ? (
            <p className="mt-5 text-sm text-muted-foreground">
              No activity yet.
            </p>
          ) : (
            <ul className="mt-5 space-y-4">
              {activity.map((a) => (
                <li key={a.text} className="text-sm">
                  <p>{a.text}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {a.when}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

function ToolsPanel() {
  return (
    <>
      <PanelTitle
        title="AI Tools"
        sub="All five tools are available on your account."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {tools.map((t) => (
          <Link
            key={t.slug}
            to="/ai-tools/$slug"
            params={{ slug: t.slug }}
            className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-card)]"
          >
            <h2 className="text-lg">{t.name}</h2>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t.short}
            </p>

            <span className="mt-4 inline-block text-sm font-medium text-accent">
              Open tool
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}

function ProductsPanel() {
  return (
    <>
      <PanelTitle
        title="My Products"
        sub="Downloads and updates for everything you own."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {products.map((p) => {
          const isOwned = owned.includes(p.slug);

          return (
            <div
              key={p.slug}
              className="flex flex-col rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg">{p.name}</h2>

                <span
                  className={
                    "shrink-0 rounded-full px-2.5 py-0.5 text-xs " +
                    (isOwned
                      ? "bg-secondary text-secondary-foreground"
                      : "border border-border text-muted-foreground")
                  }
                >
                  {isOwned ? "Owned" : p.priceLabel}
                </span>
              </div>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.format}
              </p>

              <Button
                asChild
                variant={isOwned ? "outline" : "default"}
                className="mt-5 w-full"
              >
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                >
                  {isOwned ? "Download files" : "Get access"}
                </Link>
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
}

function PropertiesPanel({
  properties,
  loading,
  error,
  onPropertiesChange,
}: {
  properties: Property[];
  loading: boolean;
  error: string;
  onPropertiesChange: (properties: Property[]) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const [propertyName, setPropertyName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [listingUrl, setListingUrl] = useState("");
  const [formError, setFormError] = useState("");

  const resetForm = () => {
    setPropertyName("");
    setCity("");
    setCountry("");
    setAddress("");
    setListingUrl("");
    setFormError("");
  };

  const handleAddProperty = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setFormError("");

    const cleanName = propertyName.trim();

    if (!cleanName) {
      setFormError("Property name is required.");
      return;
    }

    setSaving(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setFormError("Your session has expired. Please sign in again.");
        return;
      }

      const { data, error: insertError } = await supabase
        .from("properties")
        .insert({
          user_id: user.id,
          name: cleanName,
          city: city.trim() || null,
          country: country.trim() || null,
          address: address.trim() || null,
          listing_url: listingUrl.trim() || null,
          status: "active",
        })
        .select(
          "id, name, city, country, address, listing_url, status"
        )
        .single();

      if (insertError) {
        throw insertError;
      }

      if (data) {
        onPropertiesChange([data, ...properties]);
      }

      resetForm();
      setShowForm(false);
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Unable to add property."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <PanelTitle
          title="My Properties"
          sub="Listings connected to your Webrya account."
        />

        <Button
          type="button"
          onClick={() => {
            setFormError("");
            setShowForm((value) => !value);
          }}
        >
          <Plus className="size-4" />
          Add Property
        </Button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg">Add a property</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Add the basic details of your short-term rental.
          </p>

          <form
            onSubmit={handleAddProperty}
            className="mt-6 grid gap-4 sm:grid-cols-2"
          >
            <div className="space-y-2 sm:col-span-2">
              <label
                htmlFor="property-name"
                className="text-sm font-medium"
              >
                Property name *
              </label>

              <input
                id="property-name"
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                placeholder="e.g. Casa Olivia"
                required
                disabled={saving}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="property-city"
                className="text-sm font-medium"
              >
                City
              </label>

              <input
                id="property-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Athens"
                disabled={saving}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="property-country"
                className="text-sm font-medium"
              >
                Country
              </label>

              <input
                id="property-country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Greece"
                disabled={saving}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label
                htmlFor="property-address"
                className="text-sm font-medium"
              >
                Address
              </label>

              <input
                id="property-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Optional"
                disabled={saving}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label
                htmlFor="property-listing-url"
                className="text-sm font-medium"
              >
                Listing URL
              </label>

              <input
                id="property-listing-url"
                type="url"
                value={listingUrl}
                onChange={(e) => setListingUrl(e.target.value)}
                placeholder="https://www.airbnb.com/..."
                disabled={saving}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {formError && (
              <div className="sm:col-span-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {formError}
              </div>
            )}

            <div className="flex gap-2 sm:col-span-2">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Property"}
              </Button>

              <Button
                type="button"
                variant="outline"
                disabled={saving}
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {loading && (
        <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
          Loading your properties...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
          Unable to load your properties: {error}
        </div>
      )}

      {!loading && !error && properties.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-10 text-center">
          <Home className="mx-auto size-8 text-muted-foreground" />

          <h2 className="mt-4 text-lg">
            No properties yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Add your first property to start building your Webrya
            workspace around your rental.
          </p>

          <Button
            type="button"
            className="mt-5"
            onClick={() => setShowForm(true)}
          >
            <Plus className="size-4" />
            Add your first property
          </Button>
        </div>
      )}

      {!loading && !error && properties.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {properties.map((property) => {
            const location = [property.city, property.country]
              .filter(Boolean)
              .join(" · ");

            return (
              <div
                key={property.id}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg">{property.name}</h2>

                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
                    {property.status === "active"
                      ? "Active"
                      : property.status}
                  </span>
                </div>

                {location && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {location}
                  </p>
                )}

                {property.address && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    {property.address}
                  </p>
                )}

                {property.listing_url && (
                  <a
                    href={property.listing_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent"
                  >
                    View listing
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

function ResourcesPanel() {
  return (
    <>
      <PanelTitle
        title="Resources"
        sub="Guides and playbooks saved to your account."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {resources.slice(0, 6).map((r) => (
          <div
            key={r.slug}
            className="rounded-xl border border-border bg-card p-6"
          >
            <p className="eyebrow">{r.category}</p>

            <h2 className="mt-3 text-base leading-snug">
              {r.title}
            </h2>

            <p className="mt-2 text-xs text-muted-foreground">
              {r.readTime} read
            </p>
          </div>
        ))}
      </div>

      <Button asChild variant="outline" className="mt-6">
        <Link to="/resources">Browse all resources</Link>
      </Button>
    </>
  );
}

function AccountPanel({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  return (
    <>
      <PanelTitle
        title="Account"
        sub="Your Webrya profile and plan."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="eyebrow">Profile</p>

          <p className="mt-3 text-lg">{name}</p>

          <p className="mt-1 text-sm text-muted-foreground">
            {email}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Host
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <p className="eyebrow">Current package</p>

          <p className="mt-3 text-lg">Free tools</p>

          <p className="text-sm text-muted-foreground">
            Upgrade with a one-time professional Webrya solution.
          </p>

          <Button asChild className="mt-4">
            <Link to="/pricing">View solutions</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
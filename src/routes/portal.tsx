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
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/Logo";
import { supabase } from "@/lib/supabase";
import { tools } from "@/data/webrya";

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

function PanelTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <h1 className="text-2xl">{title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
    </div>
  );
}

function PortalPage() {
  const navigate = useNavigate();
  const [section, setSection] = useState<SectionId>("overview");
  const [name, setName] = useState("Host");
  const [email, setEmail] = useState("");
  const [ready, setReady] = useState(false);

  const [properties, setProperties] = useState<Property[]>([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [propertiesError, setPropertiesError] = useState("");

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
        setName(metadataName || user.email?.split("@")[0] || "Host");
        setEmail(user.email ?? "");
        setReady(true);
      }

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!mounted) return;

      if (error) {
        setPropertiesError(error.message);
        setPropertiesLoading(false);
        return;
      }

      setProperties((data as Property[]) ?? []);
      setPropertiesLoading(false);
    };

    void load();

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

  const nav: { id: SectionId; label: string; icon: typeof Home }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "tools", label: "AI Tools", icon: Sparkles },
    { id: "products", label: "My Products", icon: Package },
    { id: "properties", label: "My Properties", icon: Home },
    { id: "resources", label: "Resources", icon: BookOpen },
    { id: "account", label: "Account", icon: User },
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
            <Button asChild variant="ghost" size="sm">
              <Link to="/">
                <ArrowLeft className="size-4" />
                Back to site
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => void signOut()}>
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
            const active = section === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSection(item.id)}
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
              <h1 className="text-3xl">Welcome back.</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Signed in as {name}. Your tools and properties live here.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    AI Tools
                  </p>
                  <p className="mt-2 text-3xl">{tools.length}</p>
                  <p className="text-sm text-muted-foreground">available</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Properties
                  </p>
                  <p className="mt-2 text-3xl">{properties.length}</p>
                  <p className="text-sm text-muted-foreground">connected</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Account
                  </p>
                  <p className="mt-2 text-lg">{name}</p>
                  <p className="text-sm text-muted-foreground">Free tools</p>
                </div>
              </div>
            </div>
          )}

          {section === "tools" && (
            <div>
              <PanelTitle
                title="AI Tools"
                sub="All five tools are available on your account."
              />
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {tools.map((tool) => (
                  <div
                    key={tool.slug}
                    className="rounded-xl border border-border bg-card p-6"
                  >
                    <h2 className="text-lg">{tool.name}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {tool.short}
                    </p>
                    <Link
                      to="/ai-tools/$slug"
                      params={{ slug: tool.slug }}
                      className="mt-4 inline-block text-sm font-medium text-primary"
                    >
                      Open tool
                    </Link>
                  </div>
                ))}
              </div>
            </div>
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
              onPropertiesChange={setProperties}
            />
          )}

          {section === "resources" && (
            <div>
              <PanelTitle
                title="Resources"
                sub="Guides and playbooks for hosts."
              />
              <div className="mt-6">
                <Button asChild variant="outline">
                  <Link to="/resources">Browse all resources</Link>
                </Button>
              </div>
            </div>
          )}

          {section === "account" && (
            <div>
              <PanelTitle
                title="Account"
                sub="Your Webrya profile and plan."
              />
              <div className="mt-6 rounded-xl border border-border bg-card p-6">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Profile
                </p>
                <p className="mt-2 text-lg">{name}</p>
                <p className="text-sm text-muted-foreground">{email}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/* ========== PropertiesPanel (το δικό σου form, χωρίς αλλαγές λογικής) ========== */

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
  const [formError, setFormError] = useState("");

  const [propertyName, setPropertyName] = useState("");
  const [propertyType, setPropertyType] = useState("apartment");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");

  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [maxGuests, setMaxGuests] = useState("");

  const [bedConfiguration, setBedConfiguration] = useState("");
  const [livingRoom, setLivingRoom] = useState("");
  const [kitchen, setKitchen] = useState("");
  const [bathroomDetails, setBathroomDetails] = useState("");

  const [amenities, setAmenities] = useState<string[]>([]);

  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [quietHours, setQuietHours] = useState("");

  const [smoking, setSmoking] = useState("not_specified");
  const [pets, setPets] = useState("not_specified");
  const [parties, setParties] = useState("not_specified");

  const [accessMethod, setAccessMethod] = useState("");
  const [checkInInstructions, setCheckInInstructions] = useState("");
  const [parkingInstructions, setParkingInstructions] = useState("");
  const [wifiNetwork, setWifiNetwork] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");

  const [neighborhood, setNeighborhood] = useState("");
  const [nearbyAttractions, setNearbyAttractions] = useState("");
  const [nearbyRestaurants, setNearbyRestaurants] = useState("");
  const [publicTransport, setPublicTransport] = useState("");
  const [importantLandmarks, setImportantLandmarks] = useState("");

  const [hostNotes, setHostNotes] = useState("");

  const propertyTypes = [
    ["apartment", "Apartment"],
    ["house", "House"],
    ["villa", "Villa"],
    ["studio", "Studio"],
    ["loft", "Loft"],
    ["cabin", "Cabin"],
    ["room", "Room"],
    ["other", "Other"],
  ];

  const amenityOptions = [
    ["wifi", "Wi-Fi"],
    ["air_conditioning", "Air conditioning"],
    ["heating", "Heating"],
    ["tv", "TV"],
    ["washing_machine", "Washing machine"],
    ["dishwasher", "Dishwasher"],
    ["coffee_machine", "Coffee machine"],
    ["iron", "Iron"],
    ["hair_dryer", "Hair dryer"],
    ["parking", "Parking"],
    ["balcony", "Balcony"],
    ["elevator", "Elevator"],
  ];

  const resetForm = () => {
    setPropertyName("");
    setPropertyType("apartment");
    setAddress("");
    setCity("");
    setCountry("");
    setDescription("");
    setBedrooms("");
    setBathrooms("");
    setMaxGuests("");
    setBedConfiguration("");
    setLivingRoom("");
    setKitchen("");
    setBathroomDetails("");
    setAmenities([]);
    setCheckInTime("");
    setCheckOutTime("");
    setQuietHours("");
    setSmoking("not_specified");
    setPets("not_specified");
    setParties("not_specified");
    setAccessMethod("");
    setCheckInInstructions("");
    setParkingInstructions("");
    setWifiNetwork("");
    setWifiPassword("");
    setNeighborhood("");
    setNearbyAttractions("");
    setNearbyRestaurants("");
    setPublicTransport("");
    setImportantLandmarks("");
    setHostNotes("");
    setFormError("");
  };

  const toggleAmenity = (value: string) => {
    setAmenities((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const handleAddProperty = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    const cleanName = propertyName.trim();
    const cleanCity = city.trim();
    const cleanCountry = country.trim();

    if (!cleanName || !cleanCity || !cleanCountry) {
      setFormError("Property name, city and country are required.");
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
          property_type: propertyType,
          address: address.trim() || null,
          city: cleanCity,
          country: cleanCountry,
          description: description.trim() || null,
          bedrooms: bedrooms ? Number.parseInt(bedrooms, 10) : null,
          bathrooms: bathrooms ? Number.parseFloat(bathrooms) : null,
          max_guests: maxGuests ? Number.parseInt(maxGuests, 10) : null,
          bed_configuration: bedConfiguration.trim() || null,
          living_room: livingRoom.trim() || null,
          kitchen: kitchen.trim() || null,
          bathroom_details: bathroomDetails.trim() || null,
          amenities,
          check_in_time: checkInTime || null,
          check_out_time: checkOutTime || null,
          quiet_hours: quietHours.trim() || null,
          smoking,
          pets,
          parties,
          access_method: accessMethod.trim() || null,
          check_in_instructions: checkInInstructions.trim() || null,
          parking_instructions: parkingInstructions.trim() || null,
          wifi_network: wifiNetwork.trim() || null,
          wifi_password: wifiPassword.trim() || null,
          neighborhood: neighborhood.trim() || null,
          nearby_attractions: nearbyAttractions.trim() || null,
          nearby_restaurants: nearbyRestaurants.trim() || null,
          public_transport: publicTransport.trim() || null,
          important_landmarks: importantLandmarks.trim() || null,
          host_notes: hostNotes.trim() || null,
          status: "active",
        })
        .select("*")
        .single();

      if (insertError) throw insertError;

      if (data) {
        onPropertiesChange([data as Property, ...properties]);
      }

      resetForm();
      setShowForm(false);
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Unable to save property."
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
            setShowForm((v) => !v);
          }}
        >
          <Plus className="size-4" />
          Add Property
        </Button>
      </div>

      {showForm && (
  <form onSubmit={handleAddProperty} className="space-y-8">
    {/* 1. BASIC INFORMATION */}
    <div className="rounded-xl border border-border bg-card p-6">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        Basic information
      </p>
      <h2 className="mt-2 text-xl">Tell us about your property</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Only the name, city and country are required.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field
          label="Property name *"
          htmlFor="property-name"
          className="sm:col-span-2"
        >
          <input
            id="property-name"
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
            placeholder="e.g. Casa Olivia"
            required
            disabled={saving}
            className={inputClass}
          />
        </Field>

        <Field label="Property type" htmlFor="property-type">
          <select
            id="property-type"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            disabled={saving}
            className={inputClass}
          >
            {propertyTypes.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Address" htmlFor="property-address">
          <input
            id="property-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street and number"
            disabled={saving}
            className={inputClass}
          />
        </Field>

        <Field label="City *" htmlFor="property-city">
          <input
            id="property-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Athens"
            required
            disabled={saving}
            className={inputClass}
          />
        </Field>

        <Field label="Country *" htmlFor="property-country">
          <input
            id="property-country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Greece"
            required
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Describe the property..."
            disabled={saving}
            className={textareaClass}
          />
        </Field>

        <Field label="Bedrooms" htmlFor="property-bedrooms">
          <input
            id="property-bedrooms"
            type="number"
            min="0"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            placeholder="2"
            disabled={saving}
            className={inputClass}
          />
        </Field>

        <Field label="Bathrooms" htmlFor="property-bathrooms">
          <input
            id="property-bathrooms"
            type="number"
            min="0"
            step="0.5"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            placeholder="1.5"
            disabled={saving}
            className={inputClass}
          />
        </Field>

        <Field label="Maximum guests" htmlFor="property-max-guests">
          <input
            id="property-max-guests"
            type="number"
            min="1"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            placeholder="4"
            disabled={saving}
            className={inputClass}
          />
        </Field>
      </div>
    </div>

    {/* 2. ACCOMMODATION */}
    <div className="rounded-xl border border-border bg-card p-6">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        Accommodation
      </p>
      <div className="mt-6 grid gap-5">
        <Field label="Bed configuration" htmlFor="bed-configuration">
          <textarea
            id="bed-configuration"
            value={bedConfiguration}
            onChange={(e) => setBedConfiguration(e.target.value)}
            rows={3}
            placeholder="e.g. 1 king bed, 2 single beds"
            disabled={saving}
            className={textareaClass}
          />
        </Field>
        <Field label="Living room" htmlFor="living-room">
          <textarea
            id="living-room"
            value={livingRoom}
            onChange={(e) => setLivingRoom(e.target.value)}
            rows={3}
            disabled={saving}
            className={textareaClass}
          />
        </Field>
        <Field label="Kitchen" htmlFor="kitchen">
          <textarea
            id="kitchen"
            value={kitchen}
            onChange={(e) => setKitchen(e.target.value)}
            rows={3}
            disabled={saving}
            className={textareaClass}
          />
        </Field>
        <Field label="Bathroom details" htmlFor="bathroom-details">
          <textarea
            id="bathroom-details"
            value={bathroomDetails}
            onChange={(e) => setBathroomDetails(e.target.value)}
            rows={3}
            disabled={saving}
            className={textareaClass}
          />
        </Field>
      </div>
    </div>

    {/* 3. AMENITIES */}
    <div className="rounded-xl border border-border bg-card p-6">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        Amenities
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Select everything available at the property.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {amenityOptions.map(([value, label]) => {
          const selected = amenities.includes(value);
          return (
            <label
              key={value}
              className={
                "flex cursor-pointer items-center gap-3 rounded-lg border p-4 text-sm transition-colors " +
                (selected
                  ? "border-primary bg-secondary"
                  : "border-border hover:bg-secondary")
              }
            >
              <input
                type="checkbox"
                checked={selected}
                onChange={() => toggleAmenity(value)}
                disabled={saving}
                className="size-4"
              />
              <span>{label}</span>
            </label>
          );
        })}
      </div>
    </div>

    {/* 4. POLICIES */}
    <div className="rounded-xl border border-border bg-card p-6">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        Policies
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Check-in time" htmlFor="check-in-time">
          <input
            id="check-in-time"
            type="time"
            value={checkInTime}
            onChange={(e) => setCheckInTime(e.target.value)}
            disabled={saving}
            className={inputClass}
          />
        </Field>
        <Field label="Check-out time" htmlFor="check-out-time">
          <input
            id="check-out-time"
            type="time"
            value={checkOutTime}
            onChange={(e) => setCheckOutTime(e.target.value)}
            disabled={saving}
            className={inputClass}
          />
        </Field>
        <Field label="Quiet hours" htmlFor="quiet-hours">
          <input
            id="quiet-hours"
            value={quietHours}
            onChange={(e) => setQuietHours(e.target.value)}
            placeholder="e.g. 23:00 – 08:00"
            disabled={saving}
            className={inputClass}
          />
        </Field>
        <PolicySelect
          label="Smoking"
          value={smoking}
          onChange={setSmoking}
          disabled={saving}
        />
        <PolicySelect
          label="Pets"
          value={pets}
          onChange={setPets}
          disabled={saving}
        />
        <PolicySelect
          label="Parties / events"
          value={parties}
          onChange={setParties}
          disabled={saving}
        />
      </div>
    </div>

    {/* 5. GUEST ACCESS */}
    <div className="rounded-xl border border-border bg-card p-6">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        Guest access
      </p>
      <div className="mt-6 grid gap-5">
        <Field label="Access method" htmlFor="access-method">
          <input
            id="access-method"
            value={accessMethod}
            onChange={(e) => setAccessMethod(e.target.value)}
            placeholder="e.g. Self check-in with lockbox"
            disabled={saving}
            className={inputClass}
          />
        </Field>
        <Field label="Check-in instructions" htmlFor="check-in-instructions">
          <textarea
            id="check-in-instructions"
            value={checkInInstructions}
            onChange={(e) => setCheckInInstructions(e.target.value)}
            rows={4}
            disabled={saving}
            className={textareaClass}
          />
        </Field>
        <Field label="Parking instructions" htmlFor="parking-instructions">
          <textarea
            id="parking-instructions"
            value={parkingInstructions}
            onChange={(e) => setParkingInstructions(e.target.value)}
            rows={3}
            disabled={saving}
            className={textareaClass}
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Wi-Fi network" htmlFor="wifi-network">
            <input
              id="wifi-network"
              value={wifiNetwork}
              onChange={(e) => setWifiNetwork(e.target.value)}
              disabled={saving}
              className={inputClass}
            />
          </Field>
          <Field label="Wi-Fi password" htmlFor="wifi-password">
            <input
              id="wifi-password"
              type="password"
              value={wifiPassword}
              onChange={(e) => setWifiPassword(e.target.value)}
              disabled={saving}
              className={inputClass}
            />
          </Field>
        </div>
        <div className="rounded-lg border border-border bg-secondary/50 p-4 text-sm text-muted-foreground">
          Access details are used only to help Webrya generate accurate guest
          messages for this property. They are visible only to your account.
        </div>
      </div>
    </div>

    {/* 6. LOCATION */}
    <div className="rounded-xl border border-border bg-card p-6">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        Location
      </p>
      <div className="mt-6 grid gap-5">
        <Field label="Neighborhood" htmlFor="neighborhood">
          <input
            id="neighborhood"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            placeholder="e.g. Koukaki"
            disabled={saving}
            className={inputClass}
          />
        </Field>
        <Field label="Nearby attractions" htmlFor="nearby-attractions">
          <textarea
            id="nearby-attractions"
            value={nearbyAttractions}
            onChange={(e) => setNearbyAttractions(e.target.value)}
            rows={3}
            disabled={saving}
            className={textareaClass}
          />
        </Field>
        <Field label="Nearby restaurants" htmlFor="nearby-restaurants">
          <textarea
            id="nearby-restaurants"
            value={nearbyRestaurants}
            onChange={(e) => setNearbyRestaurants(e.target.value)}
            rows={3}
            disabled={saving}
            className={textareaClass}
          />
        </Field>
        <Field label="Public transport" htmlFor="public-transport">
          <textarea
            id="public-transport"
            value={publicTransport}
            onChange={(e) => setPublicTransport(e.target.value)}
            rows={3}
            disabled={saving}
            className={textareaClass}
          />
        </Field>
        <Field label="Important landmarks" htmlFor="important-landmarks">
          <textarea
            id="important-landmarks"
            value={importantLandmarks}
            onChange={(e) => setImportantLandmarks(e.target.value)}
            rows={3}
            disabled={saving}
            className={textareaClass}
          />
        </Field>
      </div>
    </div>

    {/* 7. HOST NOTES */}
    <div className="rounded-xl border border-border bg-card p-6">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        Host notes
      </p>
      <div className="mt-5">
        <Field label="Anything else the AI should know" htmlFor="host-notes">
          <textarea
            id="host-notes"
            value={hostNotes}
            onChange={(e) => setHostNotes(e.target.value)}
            rows={6}
            placeholder="Anything specific about this property that would help Webrya generate better responses..."
            disabled={saving}
            className={textareaClass}
          />
        </Field>
      </div>
    </div>

    {formError && (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
        {formError}
      </div>
    )}

    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
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
      <Button type="submit" disabled={saving}>
        {saving ? "Saving property..." : "Save property"}
      </Button>
    </div>
  </form>
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

      {!loading && !error && !showForm && properties.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-10 text-center">
          <Home className="mx-auto size-8 text-muted-foreground" />
          <h2 className="mt-4 text-lg">No properties yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Add your first property to start building your Webrya workspace.
          </p>
          <Button type="button" className="mt-5" onClick={() => setShowForm(true)}>
            <Plus className="size-4" />
            Add your first property
          </Button>
        </div>
      )}

      {!loading && !error && !showForm && properties.length > 0 && (
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
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs">
                    {property.status === "active" ? "Active" : property.status}
                  </span>
                </div>
                {property.property_type && (
                  <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                    {property.property_type}
                  </p>
                )}
                {location && (
                  <p className="mt-2 text-sm text-muted-foreground">{location}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
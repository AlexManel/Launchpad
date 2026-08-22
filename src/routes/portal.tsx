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
  ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/Logo";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import { tools } from "@/data/webrya";
import {
  AccountPanel,
  PanelTitle,
  PropertiesPanel,
  WorkspaceAIPanel,
} from "@/components/portal";
import type { Profile, Property, SectionId } from "@/lib/portal/types";

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

function PortalPage() {
  const navigate = useNavigate();
  const [section, setSection] = useState<SectionId>("overview");
  const [name, setName] = useState("Host");
  const [email, setEmail] = useState("");
  const [ready, setReady] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [propertiesError, setPropertiesError] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState("");

  useEffect(() => {
    if (!supabaseConfigured) {
      void navigate({ to: "/login" });
      return;
    }

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
      if (error) setPropertiesError(error.message);
      else setProperties((data as Property[]) ?? []);
      setPropertiesLoading(false);

      const { data: profileData, error: profileErr } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (!mounted) return;
      if (profileErr) setProfileError(profileErr.message);
      else setProfile((profileData as Profile | null) ?? null);
      setProfileLoading(false);
    };

    void load();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) void navigate({ to: "/login" });
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
                  "flex w-full min-h-11 items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors " +
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

        <div>
          {section === "overview" && (
            <div>
              <h1 className="text-3xl">Welcome back.</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Signed in as {name}. Your tools and properties live here.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">AI Tools</p>
                  <p className="mt-2 text-3xl">{tools.length}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Properties</p>
                  <p className="mt-2 text-3xl">{properties.length}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Account</p>
                  <p className="mt-2 text-lg">{name}</p>
                </div>
              </div>
            </div>
          )}

          {section === "tools" && <WorkspaceAIPanel properties={properties} />}

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
              <PanelTitle title="Resources" sub="Guides and playbooks for hosts." />
              <div className="mt-6">
                <Button asChild variant="outline">
                  <Link to="/resources">Browse all resources</Link>
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
              onProfileChange={setProfile}
            />
          )}
        </div>
      </div>
    </div>
  );
}

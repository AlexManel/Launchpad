import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/site/Logo";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Webrya Workspace" },
      {
        name: "description",
        content:
          "Sign in to the Webrya Workspace to access your AI tools, purchased digital products and saved content.",
      },
      { property: "og:title", content: "Login — Webrya Workspace" },
      {
        property: "og:description",
        content: "Access your Webrya tools, products and resources.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted && session) {
        void navigate({ to: "/portal" });
      }
    };

    void checkSession();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    try {
      if (mode === "login") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (signInError) {
          throw signInError;
        }

        void navigate({ to: "/portal" });
        return;
      }

      if (!cleanName) {
        setError("Please enter your full name.");
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            full_name: cleanName,
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      if (data.session) {
        void navigate({ to: "/portal" });
        return;
      }

      setMessage(
        "Account created. Please check your email to confirm your account before signing in."
      );

      setMode("login");
      setPassword("");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-14 sm:px-12 lg:px-20">
        <Logo />

        <div className="mt-12 max-w-sm">
          <h1 className="text-3xl">
            {mode === "login"
              ? "Welcome back."
              : "Create your Webrya account."}
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {mode === "login"
              ? "Sign in to reach your AI tools, purchased products and saved content."
              : "Free to start. Your AI tool results and purchases live in one place."}
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            {mode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Moreau"
                  required
                  disabled={loading}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                disabled={loading}
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
              />
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
              >
                {error}
              </div>
            )}

            {message && (
              <div
                role="status"
                className="rounded-md border border-border bg-secondary px-3 py-2 text-sm text-secondary-foreground"
              >
                {message}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? mode === "login"
                  ? "Signing in..."
                  : "Creating account..."
                : mode === "login"
                  ? "Sign in"
                  : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            {mode === "login"
              ? "New to Webrya?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              className="font-medium text-accent"
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError("");
                setMessage("");
              }}
              disabled={loading}
            >
              {mode === "login" ? "Create an account" : "Sign in"}
            </button>
          </p>

          <p className="mt-8 text-xs text-muted-foreground">
            Your account is secured by Supabase Authentication.{" "}
            <Link to="/" className="underline">
              Back to webrya.com
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden flex-col justify-between bg-ink p-14 text-ink-foreground lg:flex">
        <p className="eyebrow text-accent">Webrya Workspace</p>

        <div>
          <p className="font-display text-4xl leading-tight">
            “Everything you need to run your short-term rental smarter.”
          </p>

          <p className="mt-6 max-w-md leading-relaxed opacity-75">
            AI tools, purchased products, your properties and your resources —
            one workspace, built for hosts who treat this like a business.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 text-sm opacity-80">
          <div>
            <p className="font-display text-2xl">5</p>
            <p className="mt-1">AI tools</p>
          </div>

          <div>
            <p className="font-display text-2xl">4</p>
            <p className="mt-1">Digital products</p>
          </div>

          <div>
            <p className="font-display text-2xl">1</p>
            <p className="mt-1">Portal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

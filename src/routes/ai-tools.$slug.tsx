import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Copy,
  Loader2,
  Star,
  MessageSquare,
  Sparkles,
  ScrollText,
  KeyRound,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Section } from "@/components/site/Section";
import { tools } from "@/data/webrya";
import { generateToolOutput } from "@/lib/ai-tools.functions";
import type { AiTool } from "@/lib/ai/types";
import { supabase } from "@/lib/supabase";

const iconMap = {
  star: Star,
  message: MessageSquare,
  sparkles: Sparkles,
  scroll: ScrollText,
  key: KeyRound,
};

export const Route = createFileRoute("/ai-tools/$slug")({
  loader: ({ params }) => {
    const tool = tools.find((t) => t.slug === params.slug);
    if (!tool) throw notFound();
    return { name: tool.name, short: tool.short };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Tool not found — Webrya" }, { name: "robots", content: "noindex" }],
      };
    }
    return {
      meta: [
        { title: `${loaderData.name} — Free AI Tool | Webrya` },
        { name: "description", content: loaderData.short },
        { property: "og:title", content: `${loaderData.name} — Webrya` },
        { property: "og:description", content: loaderData.short },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ToolPage,
});

function ToolPage() {
  const { slug } = Route.useParams();
  const tool = tools.find((t) => t.slug === slug)!;
  const Icon = iconMap[tool.icon];

  const [input, setInput] = useState("");
  const [extra, setExtra] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [freeUses, setFreeUses] = useState(0);
  const [limitOpen, setLimitOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const FREE_LIMIT = 3;
  const STORAGE_KEY = "webrya_free_ai_uses";

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const n = raw ? Number.parseInt(raw, 10) : 0;
      setFreeUses(Number.isFinite(n) && n > 0 ? n : 0);
    } catch {
      setFreeUses(0);
    }

    let mounted = true;
    void supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) setIsLoggedIn(!!session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => {
      setIsLoggedIn(!!session);
    });
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const remainingFree = Math.max(0, FREE_LIMIT - freeUses);

  const loadSample = () => {
    setInput(tool.placeholder);
    if (tool.secondaryPlaceholder) {
      setExtra(tool.secondaryPlaceholder);
    }
    setFeedback(null);
    toast.message("Sample loaded — press Generate when ready.");
  };

  const saveFeedback = async (rating: "up" | "down") => {
    setFeedback(rating);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase.from("ai_feedback").insert({
        tool: slug,
        rating,
        input_preview: input.trim().slice(0, 500) || null,
        output_preview: output.trim().slice(0, 500) || null,
        user_id: user?.id ?? null,
      });

      if (error) throw error;

      toast.success(
        rating === "up"
          ? "Thanks — that helps us improve Webrya."
          : "Thanks — we will keep improving the tools."
      );
    } catch {
      toast.error("Could not save feedback. Please try again.");
      setFeedback(null);
    }
  };

  const generate = async () => {
    if (!input.trim()) {
      toast.error("Add some input first so the tool has something to work with.");
      return;
    }

    // Free tools: max 3 uses without an account (tracked in this browser)
    if (!isLoggedIn && freeUses >= FREE_LIMIT) {
      setLimitOpen(true);
      return;
    }

    setLoading(true);
    setOutput("");
    setFeedback(null);

    try {
      const res = await generateToolOutput({
        data: {
          tool: slug as AiTool,
          input: input.trim(),
          ...(extra.trim() ? { extra: extra.trim() } : {}),
        },
      });
      setOutput(res.text);

      if (!isLoggedIn) {
        const next = freeUses + 1;
        setFreeUses(next);
        try {
          localStorage.setItem(STORAGE_KEY, String(next));
        } catch {
          /* ignore quota / private mode */
        }
        if (next >= FREE_LIMIT) {
          // Soft prompt after the last free generation
          setTimeout(() => setLimitOpen(true), 600);
        }
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not generate a response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
          <Link
            to="/ai-tools"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> All AI tools
          </Link>
          <div className="mt-6 flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
              <Icon className="size-5" />
            </span>
            <div>
              <h1 className="text-4xl leading-tight sm:text-5xl">{tool.name}</h1>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                {tool.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Section className="py-12 lg:py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-7">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="tool-input">{tool.inputLabel}</Label>
                <Textarea
                  id="tool-input"
                  rows={8}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={tool.placeholder}
                />
              </div>
              {tool.secondaryLabel && (
                <div className="space-y-2">
                  <Label htmlFor="tool-extra">{tool.secondaryLabel}</Label>
                  <Input
                    id="tool-extra"
                    value={extra}
                    onChange={(e) => setExtra(e.target.value)}
                    placeholder={tool.secondaryPlaceholder}
                  />
                </div>
              )}
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button onClick={generate} disabled={loading} className="w-full" size="lg">
                  {loading && <Loader2 className="size-4 animate-spin" />}
                  {loading ? "Generating…" : "Generate"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto shrink-0"
                  disabled={loading}
                  onClick={loadSample}
                >
                  Try sample
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {isLoggedIn
                  ? "Signed in — unlimited generations on free tools."
                  : remainingFree > 0
                    ? `Free preview: ${remainingFree} of ${FREE_LIMIT} left in this browser. Sign in for unlimited use.`
                    : "Free limit reached. Create a free account to continue."}
              </p>
            </div>
          </div>

          <div className="flex flex-col rounded-xl border border-border bg-surface p-7">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Result</p>
              {output && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    void navigator.clipboard.writeText(output);
                    toast.success("Copied to clipboard");
                  }}
                >
                  <Copy className="size-4" /> Copy
                </Button>
              )}
            </div>
            <div className="mt-4 flex-1 whitespace-pre-wrap text-sm leading-relaxed">
              {output ? (
                output
              ) : (
                <span className="text-muted-foreground">Your generated text will appear here.</span>
              )}
            </div>
            {output ? (
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
                <span>Was this useful?</span>
                <Button
                  type="button"
                  variant={feedback === "up" ? "default" : "outline"}
                  size="sm"
                  onClick={() => void saveFeedback("up")}
                >
                  Yes
                </Button>
                <Button
                  type="button"
                  variant={feedback === "down" ? "default" : "outline"}
                  size="sm"
                  onClick={() => void saveFeedback("down")}
                >
                  Needs work
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-14 rounded-xl border border-border bg-card p-8">
          <p className="eyebrow">Go further</p>
          <h2 className="mt-3 text-2xl">Pair this tool with a Webrya product.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The free tools handle one message at a time. The digital products give you the full
            library, the frameworks and the escalation paths — as a one-time purchase.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/products">View digital products</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/ai-tools">Try another tool</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Dialog open={limitOpen} onOpenChange={setLimitOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Free limit reached</DialogTitle>
            <DialogDescription className="text-left leading-relaxed">
              You have used your {FREE_LIMIT} free AI generations in this browser.
              Create a free Webrya account to keep generating guest replies, review
              responses and more — and unlock property-aware tools in your Workspace.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button asChild className="w-full">
              <Link to="/login">Create free account / Sign in</Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setLimitOpen(false)}
            >
              Not now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  );
}

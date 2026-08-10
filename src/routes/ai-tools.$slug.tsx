import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Section } from "@/components/site/Section";
import { tools } from "@/data/webrya";
import { generateToolOutput } from "@/lib/ai-tools.functions";
import type { AiTool } from "@/lib/ai/types";

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

  const generate = async () => {
    if (!input.trim()) {
      toast.error("Add some input first so the tool has something to work with.");
      return;
    }
    setLoading(true);
    setOutput("");

    try {
      const res = await generateToolOutput({
        data: {
          tool: slug as AiTool,
          input: input.trim(),
          ...(extra.trim() ? { extra: extra.trim() } : {}),
        },
      });
      setOutput(res.text);
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
              <Button onClick={generate} disabled={loading} className="w-full" size="lg">
                {loading && <Loader2 className="size-4 animate-spin" />}
                {loading ? "Generating…" : "Generate"}
              </Button>
              <p className="text-xs text-muted-foreground">
                Free preview. Sign in to save results to your Webrya Workspace.
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
    </>
  );
}

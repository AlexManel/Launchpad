import { useState } from "react";
import { Copy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tools } from "@/data/webrya";
import { generateToolOutput } from "@/lib/ai-tools.functions";
import type { AiTool } from "@/lib/ai/types";
import type { Property } from "@/lib/portal/types";
import { buildPropertyContext } from "@/lib/portal/property-context";
import { inputClass, textareaClass } from "@/lib/portal/form-utils";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { PanelTitle, Field } from "@/components/portal/fields";

export function WorkspaceAIPanel({ properties }: { properties: Property[] }) {
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


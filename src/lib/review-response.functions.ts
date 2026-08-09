import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { z } from "zod";

const Input = z.object({
  review: z.string().min(1),
  guestName: z.string().optional(),
});

export const SYSTEM_PROMPT = `You are the Webrya Review Response Generator.

You write a professional PUBLIC response to an Airbnb guest review, on behalf of the host.

ABSOLUTE RULE — NO INVENTION:
Every factual statement about the property, the stay, or the host must come ONLY from the
text supplied by the user. You must NEVER invent, imply, or promise:
- repairs, upgrades, replacements or equipment (e.g. routers, wifi hardware, appliances)
- rewritten guides, added photos, new instructions or documentation
- policies, prices, refunds, compensation
- amenities, distances, room counts, features
- follow-up actions, investigations, staff actions, or anything the host "has since done"

If the review mentions a problem, you may acknowledge it and express regret, and you may say
you will look into it — but only in general terms, with NO specific fix, cause, or action.
Do not thank the guest for feedback about something they did not mention.

STYLE:
Professional, warm, calm, human, confident. No corporate customer-service clichés.
Do not argue, blame, or be defensive. Balance positives and negatives naturally.
Address the guest by name only if a name is supplied.
Approximately 60-120 words. Output only the response text, with no headings, labels, or notes.`;

export const generateReviewResponse = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured.");

    const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
    const gateway = createLovableAiGatewayProvider(key);

    const userPrompt = [
      data.guestName?.trim() ? `Guest name: ${data.guestName.trim()}` : "Guest name: not provided",
      "",
      "Guest review (the ONLY source of facts):",
      data.review.trim(),
      "",
      "Write the public host response now. Use no information beyond the review above.",
    ].join("\n");

    try {
      const result = streamText({
        model: gateway("google/gemini-3.6-flash"),
        system: SYSTEM_PROMPT,
        prompt: userPrompt,
        temperature: 0.4,
      });
      const text = await result.text;
      return { text: text.trim() };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Generation failed.";
      if (message.includes("429")) throw new Error("Rate limit reached. Please try again shortly.");
      if (message.includes("402")) throw new Error("AI credits exhausted. Please add credits.");
      throw new Error(message);
    }
  });

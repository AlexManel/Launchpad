import { streamText } from "ai";
import { createLovableAiGatewayProvider } from "../ai-gateway.server";

export async function generateWithGateway(options: {
  system: string;
  prompt: string;
  temperature?: number;
}) {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI is not configured.");

  const gateway = createLovableAiGatewayProvider(key);

  try {
    const result = streamText({
      model: gateway("google/gemini-3.6-flash"),
      system: options.system,
      prompt: options.prompt,
      temperature: options.temperature ?? 0.4,
    });
    const text = (await result.text).trim();
    if (!text) throw new Error("The AI returned an empty response. Please try again.");
    return text;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Generation failed.";
    if (message.includes("429")) throw new Error("Rate limit reached. Please try again shortly.");
    if (message.includes("402")) throw new Error("AI credits exhausted. Please add credits.");
    if (message.includes("empty response")) throw new Error(message);
    throw new Error("Could not generate a response right now. Please try again.");
  }
}

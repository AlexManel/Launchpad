import { streamText } from "ai";
import { AI_DEFAULT_TEMPERATURE, AI_TEMPERATURE } from "./config";
import { buildUserPrompt, getSystemPrompt } from "./prompts";
import { getAIModel } from "./provider.server";
import type { AiGenerationRequest, AiGenerationResult } from "./types";

/** Maps any failure into a safe, user-facing error. Never leaks keys or stacks. */
function toUserFacingError(error: unknown): Error {
  const message = error instanceof Error ? error.message : "";
  if (message === "AI is not configured.") return new Error(message);
  if (message.includes("429")) return new Error("Rate limit reached. Please try again shortly.");
  if (message.includes("402")) return new Error("AI credits exhausted. Please add credits.");
  if (message.includes("empty response"))
    return new Error("The AI returned an empty response. Please try again.");
  return new Error("Could not generate a response right now. Please try again.");
}

/**
 * The single Webrya AI Engine. Every tool goes through here.
 * Server-only: credentials never leave this module chain.
 */
export async function generateAI(request: AiGenerationRequest): Promise<AiGenerationResult> {
  try {
    const model = getAIModel();

    const result = streamText({
      model,
      system: getSystemPrompt(request.tool),
      prompt: buildUserPrompt(request.tool, request.input, request.extra),
      temperature: AI_TEMPERATURE[request.tool] ?? AI_DEFAULT_TEMPERATURE,
    });

    const text = (await result.text).trim();
    if (!text) throw new Error("The AI returned an empty response.");
    return { text };
  } catch (error) {
    throw toUserFacingError(error);
  }
}

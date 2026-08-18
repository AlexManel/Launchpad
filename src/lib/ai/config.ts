import type { AiTool } from "./types";

/** Single place where the Webrya model is configured. */
export const AI_MODEL = "gemini-3.6-flash";

/**
 * Default sampling temperature.
 * 0.7 gives natural, warm phrasing without drifting from the facts —
 * low enough to stay accurate, high enough to not sound robotic.
 */
export const AI_DEFAULT_TEMPERATURE = 0.7;

/** Per-tool temperature overrides. */
export const AI_TEMPERATURE: Partial<Record<AiTool, number>> = {
  // Conversational, guest-facing tools: warmer, more natural phrasing.
  "review-response-generator": 0.7,
  "guest-reply-generator": 0.7,
  "welcome-message-generator": 0.75,
  // Structured / evaluative tools: slightly more controlled, still not flat.
  "listing-optimizer": 0.6,
  "house-rules-generator": 0.55,
};

/**
 * Max output tokens per tool. The default covers a normal warm reply;
 * the Listing Optimizer needs much more room because it returns five
 * full sections (title, description, improvements, missing info,
 * recommendations) — 300 tokens was silently truncating it mid-report.
 */
export const AI_DEFAULT_MAX_OUTPUT_TOKENS = 500;

export const AI_MAX_OUTPUT_TOKENS: Partial<Record<AiTool, number>> = {
  "listing-optimizer": 1100,
  "house-rules-generator": 700,
  "welcome-message-generator": 600,
};

export function getTemperature(tool: AiTool): number {
  return AI_TEMPERATURE[tool] ?? AI_DEFAULT_TEMPERATURE;
}

export function getMaxOutputTokens(tool: AiTool): number {
  return AI_MAX_OUTPUT_TOKENS[tool] ?? AI_DEFAULT_MAX_OUTPUT_TOKENS;
}

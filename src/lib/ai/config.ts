import type { AiTool } from "./types";

/** Model that works with typical Webrya Gemini API keys. */
export const AI_MODEL = "gemini-3.6-flash";

export const AI_DEFAULT_TEMPERATURE = 0.7;

export const AI_TEMPERATURE: Partial<Record<AiTool, number>> = {
  "review-response-generator": 0.7,
  "guest-reply-generator": 0.7,
  "welcome-message-generator": 0.75,
  "listing-optimizer": 0.6,
  "house-rules-generator": 0.55,
};

/**
 * Gemini 3.x counts thinking tokens against this budget.
 * Keep high enough so answers are not cut mid-sentence.
 */
export const AI_DEFAULT_MAX_OUTPUT_TOKENS = 3500;

export const AI_MAX_OUTPUT_TOKENS: Partial<Record<AiTool, number>> = {
  "listing-optimizer": 4000,
  "house-rules-generator": 2500,
  "welcome-message-generator": 3500,
  "review-response-generator": 2500,
  "guest-reply-generator": 3500,
};

export function getTemperature(tool: AiTool): number {
  return AI_TEMPERATURE[tool] ?? AI_DEFAULT_TEMPERATURE;
}

export function getMaxOutputTokens(tool: AiTool): number {
  return AI_MAX_OUTPUT_TOKENS[tool] ?? AI_DEFAULT_MAX_OUTPUT_TOKENS;
}

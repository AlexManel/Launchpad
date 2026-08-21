import type { AiTool } from "./types";

/** Model that works with your API key. */
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
 * Keep these high enough so visible answers are not cut mid-sentence.
 */
export const AI_DEFAULT_MAX_OUTPUT_TOKENS = 900;

export const AI_MAX_OUTPUT_TOKENS: Partial<Record<AiTool, number>> = {
  "listing-optimizer": 1800,
  "house-rules-generator": 1100,
  "welcome-message-generator": 1000,
  "review-response-generator": 900,
  "guest-reply-generator": 900,
};

export function getTemperature(tool: AiTool): number {
  return AI_TEMPERATURE[tool] ?? AI_DEFAULT_TEMPERATURE;
}

export function getMaxOutputTokens(tool: AiTool): number {
  return AI_MAX_OUTPUT_TOKENS[tool] ?? AI_DEFAULT_MAX_OUTPUT_TOKENS;
}
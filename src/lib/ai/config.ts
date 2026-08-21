import type { AiTool } from "./types";

/** Faster model for host tools (public + workspace). */
export const AI_MODEL = "gemini-3.6-flash";

export const AI_DEFAULT_TEMPERATURE = 0.7;

export const AI_TEMPERATURE: Partial<Record<AiTool, number>> = {
  "review-response-generator": 0.7,
  "guest-reply-generator": 0.7,
  "welcome-message-generator": 0.75,
  "listing-optimizer": 0.6,
  "house-rules-generator": 0.55,
};

export const AI_DEFAULT_MAX_OUTPUT_TOKENS = 500;

export const AI_MAX_OUTPUT_TOKENS: Partial<Record<AiTool, number>> = {
  "listing-optimizer": 1200,
  "house-rules-generator": 700,
  "welcome-message-generator": 600,
  "review-response-generator": 450,
  "guest-reply-generator": 400,
};

export function getTemperature(tool: AiTool): number {
  return AI_TEMPERATURE[tool] ?? AI_DEFAULT_TEMPERATURE;
}

export function getMaxOutputTokens(tool: AiTool): number {
  return AI_MAX_OUTPUT_TOKENS[tool] ?? AI_DEFAULT_MAX_OUTPUT_TOKENS;
}

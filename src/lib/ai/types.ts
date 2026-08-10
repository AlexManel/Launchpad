/**
 * Shared types for the Webrya AI Engine.
 */

export const AI_TOOLS = [
  "review-response-generator",
  "guest-reply-generator",
  "listing-optimizer",
  "house-rules-generator",
  "welcome-message-generator",
] as const;

export type AiTool = (typeof AI_TOOLS)[number];

export type AiGenerationRequest = {
  tool: AiTool;
  input: string;
  extra?: string | undefined;
};

export type AiGenerationResult = {
  text: string;
};

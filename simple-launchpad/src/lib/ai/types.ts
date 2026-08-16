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

import type { Property } from "@/lib/property/types";

export type AiGenerationRequest = {
  tool: AiTool;
  input: string;
  extra?: string | undefined;
  property?: Property | undefined;
};

export type AiGenerationResult = {
  text: string;
};

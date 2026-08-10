import { google } from "@ai-sdk/google";
import { AI_MODEL } from "./config";

/**
 * Google Gemini provider.
 * The API key is read server-side from GEMINI_API_KEY.
 */
export function getAIModel() {
  const key = process.env["GEMINI_API_KEY"];

  if (!key) {
    throw new Error("AI is not configured.");
  }

  return google(AI_MODEL, {
    apiKey: key,
  });
}
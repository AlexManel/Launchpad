/**
 * Gemini provider is handled directly through the Gemini REST API
 * in engine.server.ts.
 *
 * This file is intentionally kept as a compatibility placeholder.
 */

export function getAIModel(): never {
  throw new Error(
    "getAIModel() is no longer used. Gemini requests are handled by engine.server.ts."
  );
}
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

  const googleProvider = createGoogleGenerativeAI({
    apiKey: key,
  });

  return googleProvider(AI_MODEL);
}

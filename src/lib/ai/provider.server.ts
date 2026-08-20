/**
 * Gemini provider compatibility stub.
 *
 * All production generation goes through the Gemini REST API in
 * `engine.server.ts` (reads GEMINI_API_KEY server-side).
 *
 * This module exists so older imports do not break the build.
 * Do not add a second getAIModel implementation here.
 */

export function getAIModel(): never {
  throw new Error(
    "getAIModel() is no longer used. Gemini requests are handled by engine.server.ts."
  );
}

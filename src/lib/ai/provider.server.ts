import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { AI_MODEL } from "./config";

/**
 * Provider abstraction. The rest of Webrya only asks for "the AI model" —
 * swapping Lovable AI Gateway for another provider later happens here only.
 */
export function getAIModel() {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI is not configured.");

  const provider = createOpenAICompatible({
    name: "lovable",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: {
      "Lovable-API-Key": key,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
  });

  return provider(AI_MODEL);
}

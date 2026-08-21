import type { AiGenerationRequest, AiGenerationResult } from "./types";
import { buildUserPrompt, getSystemPrompt } from "./prompts";
import { AI_MODEL, getMaxOutputTokens, getTemperature } from "./config";

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${AI_MODEL}:generateContent`;

export async function generateAI(
  request: AiGenerationRequest
): Promise<AiGenerationResult> {
  const key = process.env["GEMINI_API_KEY"];

  if (!key) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  let resolvedInput = request.input;
  let fetchWarning: string | undefined;

  if (request.tool === "listing-optimizer") {
    const { resolveListingInput } = await import("./fetch-listing.server");
    const resolved = await resolveListingInput(request.input);
    resolvedInput = resolved.text;
    fetchWarning = resolved.warning;
  }

  const userPrompt = buildUserPrompt(
    request.tool,
    resolvedInput,
    request.extra,
    request.propertyContext
  );

  const systemPrompt = getSystemPrompt(request.tool);

  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": key,
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [
          {
            text: systemPrompt,
          },
        ],
      },
      contents: [
        {
          role: "user",
          parts: [
            {
              text: userPrompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: getTemperature(request.tool),
        maxOutputTokens: getMaxOutputTokens(request.tool),
        // Gemini 3.x thinks before answering; those tokens count against budget.
        thinkingConfig: {
          thinkingLevel: "low",
        },
      },
    }),
  });

  const responseText = await response.text();

  if (!response.ok) {
    console.error("Gemini API error:", {
      status: response.status,
      body: responseText,
    });

    throw new Error(`Gemini API request failed (${response.status}).`);
  }

  let data: {
    candidates?: Array<{
      content?: {
        parts?: Array<{
          text?: string;
        }>;
      };
      finishReason?: string;
    }>;
  };

  try {
    data = JSON.parse(responseText);
  } catch {
    throw new Error("Gemini returned an invalid JSON response.");
  }

  const text =
    data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("")
      .trim() ?? "";

  if (!text) {
    console.error("Gemini returned no text:", data);
    throw new Error("The AI returned an empty response.");
  }

  if (data.candidates?.[0]?.finishReason === "MAX_TOKENS") {
    console.warn(
      `Gemini output for "${request.tool}" was cut off at the token limit — consider raising AI_MAX_OUTPUT_TOKENS for this tool.`
    );
  }

  return {
    text: fetchWarning ? `${fetchWarning}\n\n---\n\n${text}` : text,
  };
}

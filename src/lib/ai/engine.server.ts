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

  const userPrompt = buildUserPrompt(
    request.tool,
    request.input,
    request.extra
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
        // Gemini 3.x models "think" before answering, and those invisible
        // reasoning tokens are counted against maxOutputTokens by default.
        // Without this, the model can burn most of the budget on hidden
        // reasoning and cut the visible answer off mid-sentence. "low"
        // keeps a bit of reasoning (Gemini 3 Flash can't fully disable it)
        // while leaving far more room for the actual response.
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

    throw new Error(
      `Gemini API request failed (${response.status}).`
    );
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

  // If Gemini stopped because it hit the token ceiling rather than
  // finishing naturally, log it — this is the exact failure mode that
  // used to silently clip the Listing Optimizer's report.
  if (data.candidates?.[0]?.finishReason === "MAX_TOKENS") {
    console.warn(
      `Gemini output for "${request.tool}" was cut off at the token limit — consider raising AI_MAX_OUTPUT_TOKENS for this tool.`
    );
  }

  return {
    text,
  };
}

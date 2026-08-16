import type { AiGenerationRequest, AiGenerationResult } from "./types";
import { buildUserPrompt, getSystemPrompt } from "./prompts";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

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
        temperature: 0.4,
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

  return {
    text,
  };
}

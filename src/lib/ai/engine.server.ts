import type { AiGenerationRequest, AiGenerationResult } from "./types";
import { buildUserPrompt, getSystemPrompt } from "./prompts";

export async function generateAI(
  request: AiGenerationRequest
): Promise<AiGenerationResult> {
  const key = process.env["GEMINI_API_KEY"];

  if (!key) {
    throw new Error("AI is not configured.");
  }

  const userPrompt = buildUserPrompt(
    request.tool,
    request.input,
    request.extra
  );

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: getSystemPrompt(request.tool),
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
      }),
    }
  );

if (!response.ok) {
  const errorText = await response.text();

  throw new Error(
    `Gemini API error ${response.status}: ${errorText}`
  );
}

  const data = await response.json();

  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text || "")
      .join("")
      .trim() || "";

  if (!text) {
    throw new Error("The AI returned an empty response.");
  }

  return { text };
}

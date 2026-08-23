import type { AiGenerationRequest, AiGenerationResult } from "./types";
import { buildUserPrompt, getSystemPrompt } from "./prompts";
import { getMaxOutputTokens, getTemperature } from "./config";

export async function generateAI(
  request: AiGenerationRequest,
): Promise<AiGenerationResult> {
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
    request.propertyContext,
    request.outputLanguage,
  );
  const systemPrompt = getSystemPrompt(request.tool);
  const max_tokens = getMaxOutputTokens(request.tool);
  const temperature = getTemperature(request.tool);

  const xai = process.env.XAI_API_KEY;
  const gemini = process.env.GEMINI_API_KEY;

  let text = "";

  if (xai) {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${xai}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature,
        max_tokens,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });
    if (!res.ok) throw new Error(`AI request failed (${res.status}).`);
    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    text = body.choices?.[0]?.message?.content?.trim() ?? "";
  } else if (gemini) {
    const geminiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";
    const res = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": gemini,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        generationConfig: { temperature, maxOutputTokens: max_tokens },
      }),
    });
    if (!res.ok) throw new Error(`AI request failed (${res.status}).`);
    const data = (await res.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    text =
      data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text ?? "")
        .join("")
        .trim() ?? "";
  } else {
    throw new Error("AI is not available in this environment yet.");
  }

  if (!text) throw new Error("The AI returned an empty response.");
  return { text: fetchWarning ? `${fetchWarning}\n\n---\n\n${text}` : text };
}

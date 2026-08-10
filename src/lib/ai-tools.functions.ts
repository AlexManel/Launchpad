import { createServerFn } from "@tanstack/react-start";
import { AiToolInput } from "./ai/schema";

export const generateToolOutput = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AiToolInput.parse(input))
  .handler(async ({ data }) => {
    const { toolPrompts, buildUserPrompt } = await import("./ai/prompts");
    const { generateWithGateway } = await import("./ai/generate.server");

    const text = await generateWithGateway({
      system: toolPrompts[data.slug],
      prompt: buildUserPrompt(data.slug, data.input, data.extra),
      temperature: data.slug === "listing-optimizer" ? 0.5 : 0.4,
    });

    return { text };
  });

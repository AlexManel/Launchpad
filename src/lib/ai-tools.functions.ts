import { createServerFn } from "@tanstack/react-start";
import { AiToolInput } from "./ai/schema";

/**
 * Single entry point for all five Webrya AI tools.
 * Validation happens here (server-side); generation happens in the AI engine.
 */
export const generateToolOutput = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AiToolInput.parse(input))
  .handler(async ({ data }) => {
    const { generateAI } = await import("./ai/engine.server");
    return generateAI(data);
  });

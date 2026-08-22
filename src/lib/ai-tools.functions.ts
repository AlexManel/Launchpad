import { createServerFn } from "@tanstack/react-start";
import { AiToolInput } from "@/lib/ai/schema";

export const generateToolOutput = createServerFn({ method: "POST" })
  .validator((input: unknown) => AiToolInput.parse(input))
  .handler(async ({ data }) => {
    const { generateAI } = await import("@/lib/ai/engine.server");
    return generateAI(data);
  });

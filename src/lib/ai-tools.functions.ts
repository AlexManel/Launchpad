import { createServerFn } from "@tanstack/react-start";
import { AiToolInput } from "@/lib/ai/schema";

export const generateToolOutput = createServerFn({ method: "POST" })
  .validator((input: unknown) => AiToolInput.parse(input))
  .handler(async ({ data }) => {
    const { assertFreeQuota, consumeAnonymousUse } = await import("@/lib/ai/quota.server");
    const quota = await assertFreeQuota(data.accessToken);

    if (data.propertyContext && !quota.userId) {
      throw new Error("Sign in to use saved property context.");
    }

    const { generateAI } = await import("@/lib/ai/engine.server");
    const result = await generateAI({
      tool: data.tool,
      input: data.input,
      extra: data.extra,
      propertyContext: quota.userId ? data.propertyContext : undefined,
    });

    if (!quota.unlimited) {
      const consumed = await consumeAnonymousUse();
      return {
        ...result,
        unlimited: false,
        remaining: consumed.remaining,
      };
    }

    return { ...result, unlimited: true, remaining: null };
  });

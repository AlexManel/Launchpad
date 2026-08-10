import { z } from "zod";
import { aiToolSlugs } from "./prompts";

export const AiToolInput = z.object({
  slug: z.enum(aiToolSlugs),
  input: z.string().trim().min(1, "Input is required.").max(6000, "Input is too long."),
  extra: z.string().trim().max(500, "Second field is too long.").optional(),
});

export type AiToolInput = z.infer<typeof AiToolInput>;

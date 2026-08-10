import { z } from "zod";
import { AI_TOOLS } from "./types";

/** Server-side validation for every AI tool request. */
export const AiToolInput = z.object({
  tool: z.enum(AI_TOOLS),
  input: z.string().trim().min(1, "Input is required.").max(6000, "Input is too long."),
  extra: z.string().trim().max(500, "Second field is too long.").optional(),
});

export type AiToolInput = z.infer<typeof AiToolInput>;

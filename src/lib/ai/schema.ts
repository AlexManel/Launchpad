import { z } from "zod";
import { AI_TOOLS } from "./types";

/** Server-side validation for every AI tool request. */
export const AiToolInput = z.object({
  tool: z.enum(AI_TOOLS),
  input: z
    .string()
    .trim()
    .min(1, "Input is required.")
    .max(6000, "Input is too long."),
  extra: z
    .string()
    .trim()
    .max(2000, "Second field is too long.")
    .optional(),
  /** Logged-in workspace only — never used by public free tools. */
  propertyContext: z
    .string()
    .trim()
    .max(4000, "Property context is too long.")
    .optional(),
  /** Supabase access token so the server can skip the anonymous free limit. */
  accessToken: z.string().max(4000).optional(),
  outputLanguage: z
    .string()
    .trim()
    .max(8)
    .optional(),
});

export type AiToolInput = z.infer<typeof AiToolInput>;

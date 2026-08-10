import type { AiTool } from "./types";

/** Single place where the Webrya model is configured. */
export const AI_MODEL = "gemini-3.6-flash";

export const AI_DEFAULT_TEMPERATURE = 0.4;

/** Per-tool temperature overrides. */
export const AI_TEMPERATURE: Partial<Record<AiTool, number>> = {
  "listing-optimizer": 0.5,
};

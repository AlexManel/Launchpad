import { redirect } from "@tanstack/react-router";

/** Old B2B marketing URLs still in Google — send them to the new site. */
export function legacyHome() {
  throw redirect({ to: "/", replace: true });
}

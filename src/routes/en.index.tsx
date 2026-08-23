import { createFileRoute } from "@tanstack/react-router";
import { legacyHome } from "@/lib/legacy-redirect";

export const Route = createFileRoute("/en/")({
  beforeLoad: legacyHome,
});

import { createFileRoute } from "@tanstack/react-router";
import { legacyHome } from "@/lib/legacy-redirect";

export const Route = createFileRoute("/about")({
  beforeLoad: legacyHome,
});

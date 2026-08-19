import { Link } from "@tanstack/react-router";

export function Logo({
  tone = "default",
}: {
  tone?: "default" | "inverse" | "hero";
}) {
  const isHero = tone === "hero";
  const isInverse = tone === "inverse";

  const textClass = isHero
    ? "text-white"
    : isInverse
      ? "text-ink-foreground"
      : "text-foreground";

  const markClass = isHero
    ? "text-white"
    : isInverse
      ? "text-ink-foreground"
      : "text-foreground";

  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-3"
      aria-label="Webrya home"
    >
      <svg
        viewBox="0 0 42 28"
        className={`h-7 w-10 ${markClass}`}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 4L10 24L21 9L32 24L40 4"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span
        className={`font-display text-[1.35rem] font-semibold leading-none tracking-[-0.035em] ${textClass}`}
      >
        Webrya
      </span>
    </Link>
  );
}
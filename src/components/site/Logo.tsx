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
      : "text-primary";

  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-2.5"
      aria-label="Webrya home"
    >
      {/* Monogram mark — W in a soft square */}
      <span
        className={`relative grid size-8 place-items-center rounded-lg ${
          isHero || isInverse
            ? "bg-white/15 ring-1 ring-white/25"
            : "bg-primary text-primary-foreground"
        }`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 32 32" className={`size-5 ${isHero || isInverse ? markClass : ""}`} fill="none">
          <path
            d="M6 8.5L10.2 23h2.35L16 12.2 19.45 23H21.8L26 8.5h-2.4l-2.55 10.4L18.2 8.5h-2.4l-2.85 10.4L10.4 8.5H6z"
            fill="currentColor"
          />
        </svg>
      </span>

      <span
        className={`font-display text-[1.3rem] font-semibold leading-none tracking-[-0.04em] ${textClass}`}
      >
        Webrya
      </span>
    </Link>
  );
}

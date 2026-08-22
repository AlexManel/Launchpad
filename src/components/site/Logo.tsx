import { Link } from "@tanstack/react-router";

function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 78 50"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3 5h13l11 29 11-29h13L27 45H16L3 5z" />
      <path d="M25 5h13l11 29 11-29h13L49 45H38L25 5z" />
    </svg>
  );
}

export function Logo({
  tone = "default",
}: {
  tone?: "default" | "inverse" | "hero";
}) {
  const onDark = tone === "hero" || tone === "inverse";
  const color = onDark ? "text-white" : "text-primary";

  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 ${color}`}
      aria-label="Webrya home"
    >
      <Mark className="h-8 w-11 shrink-0" />
      <span className="font-display text-[1.45rem] font-semibold leading-none tracking-[-0.04em]">
        Webrya
      </span>
    </Link>
  );
}

export function LogoMark({ className = "h-8 w-11" }: { className?: string }) {
  return <Mark className={className} />;
}

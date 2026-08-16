import { Link } from "@tanstack/react-router";

export function Logo({ tone = "default" }: { tone?: "default" | "inverse" }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-2.5">
      <span
        className={
          "grid size-8 place-items-center rounded-md " +
          (tone === "inverse" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground")
        }
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 10.5 12 4l9 6.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.5 12v7.5h13V12" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.5 19.5v-4.2h5v4.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span
        className={
          "font-display text-[1.35rem] leading-none tracking-tight " +
          (tone === "inverse" ? "text-ink-foreground" : "text-foreground")
        }
      >
        Webrya
      </span>
    </Link>
  );
}

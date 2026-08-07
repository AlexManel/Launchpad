import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`mx-auto max-w-6xl px-5 lg:px-8 ${className}`}>{children}</section>;
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] sm:text-5xl">{title}</h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{intro}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
}

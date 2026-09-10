export function HeroOverlay() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: "rgba(0, 0, 0, 0.62)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.28) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-3/4"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)",
        }}
      />
    </>
  );
}

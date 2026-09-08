export function HeroOverlay() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-10 bg-black/72" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/92 via-black/62 to-black/48" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/82 via-black/48 to-black/32" />
    </>
  );
}

export function HeroOverlay() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-10 bg-black/80" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black via-black/75 to-black/55" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/90 via-black/60 to-black/40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-black/85 to-transparent" />
    </>
  );
}

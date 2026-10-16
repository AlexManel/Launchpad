export function HeroMedia({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative mx-auto aspect-video w-full max-w-[560px] overflow-hidden rounded-2xl bg-[#050014] ring-1 ring-white/10 lg:max-w-none">
      {reduce ? (
        <img src="/hero-reel.jpg" alt="" className="h-full w-full object-cover" />
      ) : (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-reel.jpg"
          aria-label="Webrya"
        >
          <source src="/hero-reel.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}

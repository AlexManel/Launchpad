import { useEffect, useState } from "react";

const HERO_IMAGE = "/hero-interior.jpg";
const HERO_DESKTOP = "/hero.mp4";
const HERO_MOBILE = "/hero-mobile.mp4";

export function HeroMedia() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");
    const apply = () => {
      if (reduce.matches) {
        setSrc(null);
        return;
      }
      setSrc(desktop.matches ? HERO_DESKTOP : HERO_MOBILE);
    };
    apply();
    reduce.addEventListener("change", apply);
    desktop.addEventListener("change", apply);
    return () => {
      reduce.removeEventListener("change", apply);
      desktop.removeEventListener("change", apply);
    };
  }, []);

  return (
    <>
      <img
        src={HERO_IMAGE}
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-cover"
        fetchPriority="high"
        decoding="async"
      />
      {src ? (
        <video
          key={src}
          className="webrya-hero-video absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_IMAGE}
          aria-hidden="true"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
    </>
  );
}

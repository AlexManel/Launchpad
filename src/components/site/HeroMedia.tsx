import { useEffect, useState } from "react";

const HERO_IMAGE = "/hero-interior.jpg";
const HERO_VIDEO = "/hero.mp4";

export function HeroMedia() {
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPlayVideo(!reduce.matches);
    apply();
    reduce.addEventListener("change", apply);
    return () => reduce.removeEventListener("change", apply);
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
      {playVideo ? (
        <video
          className="webrya-hero-video absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_IMAGE}
          aria-hidden="true"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      ) : null}
    </>
  );
}

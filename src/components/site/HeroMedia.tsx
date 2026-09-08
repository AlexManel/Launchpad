import { useEffect, useState } from "react";

const HERO_IMAGE = "/hero-interior.jpg";

export function HeroMedia() {
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const apply = () => setPlayVideo(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
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
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      ) : null}
    </>
  );
}

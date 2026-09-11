import { useEffect, useRef, useState } from "react";

const HERO_IMAGE = "/hero-interior.jpg";
const HERO_VIDEO = "/hero.mp4";

export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playVideo, setPlayVideo] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPlayVideo(!reduce.matches);
    apply();
    reduce.addEventListener("change", apply);
    return () => reduce.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !playVideo) return;
    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    const tryPlay = () => {
      el.muted = true;
      el.play().catch(() => {});
    };
    tryPlay();
    el.addEventListener("canplay", tryPlay);
    const onFirstTouch = () => tryPlay();
    window.addEventListener("touchstart", onFirstTouch, { once: true });
    window.addEventListener("click", onFirstTouch, { once: true });
    return () => {
      el.removeEventListener("canplay", tryPlay);
      window.removeEventListener("touchstart", onFirstTouch);
      window.removeEventListener("click", onFirstTouch);
    };
  }, [playVideo]);

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
          ref={videoRef}
          className="webrya-hero-video absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          muted
          defaultMuted
          loop
          playsInline
          preload="auto"
          poster={HERO_IMAGE}
          aria-hidden="true"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      ) : null}
    </>
  );
}

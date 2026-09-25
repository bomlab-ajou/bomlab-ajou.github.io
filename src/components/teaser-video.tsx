"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { PauseIcon, PlayIcon } from "@/components/icons";

/**
 * A short muted loop that always starts on its own. The markup carries
 * `autoPlay`, so the browser begins playback without waiting for JavaScript;
 * once hydrated, the clip pauses while scrolled out of view and resumes when it
 * comes back. The visitor can still pause it, and that choice sticks.
 *
 * Some browsers refuse all autoplay (iOS Low Power Mode, for one); the poster
 * and the play button cover that case.
 */
export function TeaserVideo({
  src,
  poster,
  label,
  className,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Scrolling back into view must not override a pause the visitor chose.
  const pausedByVisitor = useRef(false);

  // Read the play state from the element itself: autoplay can begin before
  // React hydrates, so a `play` event may already have fired unseen.
  const subscribe = useCallback((onChange: () => void) => {
    const video = videoRef.current;
    if (!video) return () => {};
    video.addEventListener("play", onChange);
    video.addEventListener("pause", onChange);
    return () => {
      video.removeEventListener("play", onChange);
      video.removeEventListener("pause", onChange);
    };
  }, []);
  const playing = useSyncExternalStore(
    subscribe,
    () => (videoRef.current ? !videoRef.current.paused : false),
    () => false,
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React does not reliably apply `muted` before hydration, and unmuted
    // autoplay is blocked, so set it explicitly.
    video.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pausedByVisitor.current) {
          video.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausedByVisitor.current = false;
      video.play().catch(() => {});
    } else {
      pausedByVisitor.current = true;
      video.pause();
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        className={className}
        poster={poster}
        aria-label={label}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={src} type="video/mp4" />
        {label}
      </video>

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute bottom-2.5 left-2.5 inline-flex size-8 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75"
      >
        {playing ? <PauseIcon className="size-3.5" /> : <PlayIcon className="size-3.5" />}
      </button>
    </>
  );
}

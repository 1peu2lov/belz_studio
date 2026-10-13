/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef, useSyncExternalStore, useState } from "react";
import { encodePublicPath } from "@/lib/assets";

type LazyVideoProps = {
  src: string;
  poster?: string;
  alt?: string;
  /** When true, auto-plays muted in loop once visible. */
  autoplay?: boolean;
  /** Extra CSS class names to apply to <video>. */
  className?: string;
  /** ARIA label override (falls back to alt). */
  ariaLabel?: string;
  /** Additional attributes to spread on the <video> element. */
  videoProps?: React.VideoHTMLAttributes<HTMLVideoElement>;
};

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}

export function LazyVideo({
  src,
  poster,
  alt,
  autoplay = true,
  className,
  ariaLabel,
  videoProps,
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [srcSet, setSrcSet] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = el.closest("section") ?? el.parentElement ?? undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(Boolean(entry?.isIntersecting));
      },
      { root: null, threshold: 0.15, rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Do not load or play when user prefers reduced motion.
    if (reducedMotion) {
      el.pause();
      return;
    }

    if (isVisible) {
      if (!srcSet) {
        el.src = encodePublicPath(src);
        el.preload = "metadata";
        setSrcSet(true);
      }
      if (autoplay) {
        void el.play().catch(() => {
          // Ignore play errors (e.g. autoplay policies)
        });
      }
    } else {
      el.pause();
    }
  }, [isVisible, reducedMotion, srcSet, autoplay, src]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster ? encodePublicPath(poster) : undefined}
      // We never set src initially: assigned lazily when visible
      muted={autoplay}
      loop={autoplay}
      playsInline
      preload="none"
      controls={false}
      disablePictureInPicture={autoplay}
      disableRemotePlayback={autoplay}
      aria-label={ariaLabel ?? alt ?? "Vidéo du projet"}
      {...videoProps}
      onCanPlay={(e) => {
        if (autoplay && isVisible && !reducedMotion) {
          void (e.currentTarget as HTMLVideoElement).play().catch(() => {});
        }
        videoProps?.onCanPlay?.(e);
      }}
      onError={(e) => {
        videoProps?.onError?.(e);
      }}
    >
      Votre navigateur ne prend pas en charge la lecture vidéo.
    </video>
  );
}


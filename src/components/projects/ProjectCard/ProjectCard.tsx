"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent as ReactMouseEvent,
} from "react";

import type { Project } from "@/data/projects";
import { encodePublicPath } from "@/lib/assets";
import { cn } from "@/utils/cn";

import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
  className?: string;
  mediaClassName?: string;
  /** Aspect ratio variant for gallery vs index. */
  variant?: "index" | "gallery";
  onClick?: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
  draggable?: boolean;
};

function subscribeFinePointer(onStoreChange: () => void) {
  const media = window.matchMedia("(pointer: fine)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getFinePointerSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

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

export function ProjectCard({
  project,
  className,
  mediaClassName,
  variant = "index",
  onClick,
  draggable,
}: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverIntentRef = useRef(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [srcLoaded, setSrcLoaded] = useState(false);

  const finePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot,
  );
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const imageSrc = project.card?.image.src ?? null;
  const videoSrc = project.card?.hoverVideo
    ? encodePublicPath(project.card.hoverVideo)
    : null;

  const canHoverVideo =
    Boolean(videoSrc) && finePointer && !reducedMotion && !videoFailed;

  const resetVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.pause();
    try {
      video.currentTime = 0;
    } catch {
      // ignore seek errors before metadata
    }
    setVideoReady(false);
  }, []);

  const playVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !hoverIntentRef.current) {
      return;
    }

    try {
      await video.play();
      if (hoverIntentRef.current) {
        setVideoReady(true);
      }
    } catch {
      setVideoFailed(true);
      setVideoReady(false);
    }
  }, []);

  const ensureVideoSrc = useCallback(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) {
      return;
    }

    if (!srcLoaded) {
      video.src = videoSrc;
      video.load();
      setSrcLoaded(true);
    }
  }, [srcLoaded, videoSrc]);

  const onEnter = () => {
    if (!canHoverVideo) {
      return;
    }

    hoverIntentRef.current = true;
    ensureVideoSrc();

    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (video.readyState >= 2) {
      void playVideo();
    }
  };

  const onLeave = () => {
    hoverIntentRef.current = false;
    resetVideo();
  };

  useEffect(() => {
    return () => {
      hoverIntentRef.current = false;
    };
  }, []);

  const description = project.cardDescription ?? project.subtitle;
  const status = project.status ?? "ready";
  const isTeaser = status === "teaser";
  const isInProgress =
    status === "in-progress" || project.tags.includes("en-cours");
  const isSvg = Boolean(imageSrc?.toLowerCase().endsWith(".svg"));

  const media = (
    <span
      className={cn(
        styles.media,
        !imageSrc && styles[project.tone],
        isTeaser && styles.mediaTeaser,
        mediaClassName,
      )}
    >
      {imageSrc ? (
        <Image
          className={cn(styles.image, videoReady && styles.imageHidden)}
          src={imageSrc}
          alt=""
          fill
          draggable={false}
          unoptimized={isSvg}
          sizes={
            variant === "gallery"
              ? "(max-width: 48rem) 78vw, 26rem"
              : "(max-width: 40rem) 100vw, (max-width: 64rem) 50vw, 33vw"
          }
        />
      ) : (
        <span className={styles.mediaLabel} aria-hidden="true">
          {project.title}
        </span>
      )}

      {isInProgress ? <span className={styles.badge}>En cours</span> : null}

      {canHoverVideo && !isTeaser ? (
        <video
          ref={videoRef}
          className={cn(styles.video, videoReady && styles.videoVisible)}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onLoadedData={() => {
            if (hoverIntentRef.current) {
              void playVideo();
            }
          }}
          onCanPlay={() => {
            if (hoverIntentRef.current) {
              void playVideo();
            }
          }}
          onError={() => {
            setVideoFailed(true);
            setVideoReady(false);
          }}
        />
      ) : null}
    </span>
  );

  const meta = (
    <span className={styles.meta}>
      <span className={styles.title}>{project.title}</span>
      <span className={styles.description}>{description}</span>
      {project.cardServices ? (
        <span className={styles.services}>{project.cardServices}</span>
      ) : null}
    </span>
  );

  if (isTeaser) {
    return (
      <div
        className={cn(
          styles.card,
          styles.teaser,
          styles[variant],
          className,
        )}
        aria-label="Projet à venir"
      >
        {media}
        {meta}
      </div>
    );
  }

  return (
    <Link
      href={`/projets/${project.slug}`}
      className={cn(styles.card, styles[variant], className)}
      onClick={onClick}
      draggable={draggable}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      {media}
      {meta}
    </Link>
  );
}

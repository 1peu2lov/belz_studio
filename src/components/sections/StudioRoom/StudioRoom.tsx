"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import styles from "./StudioRoom.module.css";

const StudioRoomCanvas = dynamic(
  () =>
    import("./StudioRoomCanvas").then((module) => module.StudioRoomCanvas),
  { ssr: false },
);

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

function getWebGLSnapshot() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

function getWebGLServerSnapshot() {
  return true;
}

export function StudioRoom() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const webglOk = useSyncExternalStore(
    () => () => undefined,
    getWebGLSnapshot,
    getWebGLServerSnapshot,
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const mountObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldMount(true);
        }
      },
      { rootMargin: "320px 0px", threshold: 0 },
    );

    const activeObserver = new IntersectionObserver(
      ([entry]) => {
        setIsActive(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.12 },
    );

    mountObserver.observe(root);
    activeObserver.observe(root);

    return () => {
      mountObserver.disconnect();
      activeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.root} aria-hidden="true">
      <div className={styles.halo} />
      <div className={styles.vignette} />
      {shouldMount && webglOk ? (
        <div className={styles.canvasWrap}>
          <StudioRoomCanvas active={isActive} reducedMotion={reducedMotion} />
        </div>
      ) : null}
      <p className={styles.credit}>
        Modèle 3D : samiwaiba2001 (Sketchfab) — CC BY 4.0
      </p>
    </div>
  );
}

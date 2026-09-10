"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Button } from "@/components/ui/Button/Button";

import styles from "./ServicesSpaceship.module.css";

const SpaceshipCanvas = dynamic(
  () =>
    import("./SpaceshipCanvas").then((module) => module.SpaceshipCanvas),
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

export function ServicesSpaceship() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

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
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const mountObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldMount(true);
        }
      },
      { rootMargin: "400px 0px", threshold: 0 },
    );

    const activeObserver = new IntersectionObserver(
      ([entry]) => {
        setIsActive(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.15 },
    );

    mountObserver.observe(section);
    activeObserver.observe(section);

    return () => {
      mountObserver.disconnect();
      activeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const scene = sceneRef.current;

    if (!section || !content || !scene) {
      return;
    }

    if (reducedMotion) {
      gsap.set([content, scene], { clearProps: "all", opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    gsap.set(content, { opacity: 0, y: 40 });
    gsap.set(scene, { opacity: 0, y: 56, scale: 0.94 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
        end: "top 32%",
        scrub: 0.65,
      },
    });

    timeline
      .to(content, { opacity: 1, y: 0, duration: 1, ease: "none" }, 0)
      .to(
        scene,
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "none" },
        0.12,
      );

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="spaceship-title"
    >
      <div className={styles.inner}>
        <div className={styles.content} ref={contentRef}>
          <p className={styles.eyebrow}>Une idée, une trajectoire</p>
          <h2 id="spaceship-title" className={styles.title}>
            De l’idée à la mise en orbite.
          </h2>
          <p className={styles.description}>
            Identité, design et développement avancent dans une même direction
            pour transformer votre projet en une expérience cohérente et
            mémorable.
          </p>
          <Button href="/contact" className={styles.cta}>
            Parler de votre projet
          </Button>
          <p className={styles.credit}>
            Modèle 3D : Dennis Haupt (3DHaupt)
          </p>
        </div>

        <div className={styles.scene} ref={sceneRef} aria-hidden="true">
          <div className={styles.sceneHalo} />
          <div className={styles.sceneVignette} />
          {shouldMount && webglOk ? (
            <div className={styles.canvasWrap}>
              <SpaceshipCanvas active={isActive} reducedMotion={reducedMotion} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

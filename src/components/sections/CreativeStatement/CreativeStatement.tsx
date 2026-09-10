"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";

import styles from "./CreativeStatement.module.css";

const WORDS = ["idées.", "projets.", "identités.", "ambitions."] as const;

/** Mot le plus long — réserve la largeur du stage. */
const LONGEST_WORD = "identités.";

const SLICE_COUNT = 6;

const ANIMATION_CONFIG = {
  displayDuration: 1.5,
  transitionDuration: 0.75,
  sliceStagger: 0.035,
};

/** Déplacements déterministes par bande (évite le hasard à chaque cycle). */
const SLICE_MOTION = [
  { x: 0.04, y: 0.7 },
  { x: -0.055, y: -0.45 },
  { x: 0.03, y: 0.9 },
  { x: -0.065, y: -0.8 },
  { x: 0.07, y: 0.4 },
  { x: -0.025, y: -1 },
] as const;

const EASE = "power4.out";

function getSliceClip(index: number, total: number): string {
  const top = (index / total) * 100;
  const bottom = ((total - index - 1) / total) * 100;
  return `inset(${top}% 0 ${bottom}% 0)`;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isMobileViewport(): boolean {
  return window.matchMedia("(max-width: 47.9375rem)").matches;
}

function WordSlices({
  word,
  layerRef,
  secondary = false,
}: {
  word: string;
  layerRef: RefObject<HTMLSpanElement | null>;
  secondary?: boolean;
}) {
  return (
    <span
      className={`${styles.wordLayer}${secondary ? ` ${styles.wordLayerSecondary}` : ""}`}
      ref={layerRef}
      aria-hidden="true"
    >
      {Array.from({ length: SLICE_COUNT }, (_, index) => (
        <span
          key={index}
          className={styles.wordSlice}
          style={{ clipPath: getSliceClip(index, SLICE_COUNT) }}
          aria-hidden="true"
        >
          {word}
        </span>
      ))}
    </span>
  );
}

export function CreativeStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerARef = useRef<HTMLSpanElement>(null);
  const layerBRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const layerA = layerARef.current;
    const layerB = layerBRef.current;

    if (!section || !layerA || !layerB) {
      return;
    }

    if (prefersReducedMotion()) {
      const slices = layerA.querySelectorAll<HTMLElement>(`.${styles.wordSlice}`);
      slices.forEach((slice) => {
        slice.textContent = WORDS[0];
        gsap.set(slice, { clearProps: "transform,opacity", opacity: 1, x: 0, y: 0 });
      });
      gsap.set(layerB, { autoAlpha: 0 });
      return;
    }

    const layers = [layerA, layerB];
    let wordIndex = 0;
    let activeLayer = 0;
    let inView = false;
    let cancelled = false;
    let timeline: gsap.core.Timeline | null = null;

    const setLayerWord = (layer: HTMLElement, word: string) => {
      layer.querySelectorAll<HTMLElement>(`.${styles.wordSlice}`).forEach((slice) => {
        slice.textContent = word;
      });
    };

    const getSlices = (layer: HTMLElement) =>
      Array.from(layer.querySelectorAll<HTMLElement>(`.${styles.wordSlice}`));

    const resetLayer = (layer: HTMLElement, visible: boolean) => {
      const slices = getSlices(layer);
      gsap.set(layer, { autoAlpha: visible ? 1 : 0 });
      gsap.set(slices, { x: 0, y: 0, opacity: visible ? 1 : 0 });
    };

    setLayerWord(layerA, WORDS[0]);
    setLayerWord(layerB, WORDS[1]);
    resetLayer(layerA, true);
    resetLayer(layerB, false);

    const runCycle = () => {
      if (cancelled || !inView) {
        return;
      }

      const nextIndex = (wordIndex + 1) % WORDS.length;
      const outgoing = layers[activeLayer];
      const incoming = layers[1 - activeLayer];
      const nextWord = WORDS[nextIndex];

      setLayerWord(incoming, nextWord);

      const outSlices = getSlices(outgoing);
      const inSlices = getSlices(incoming);
      const measureSlice = outSlices[0] ?? inSlices[0];
      const wordWidth = measureSlice?.offsetWidth || outgoing.offsetWidth || 1;
      const wordHeight = measureSlice?.offsetHeight || outgoing.offsetHeight || 1;
      const sliceHeight = wordHeight / SLICE_COUNT;
      const xScale = isMobileViewport() ? 0.55 : 1;

      inSlices.forEach((slice, index) => {
        const motion = SLICE_MOTION[index] ?? SLICE_MOTION[0];
        gsap.set(slice, {
          x: -motion.x * wordWidth * xScale,
          y: -motion.y * sliceHeight,
          opacity: 0,
        });
      });

      gsap.set(incoming, { autoAlpha: 1 });

      timeline?.kill();
      timeline = gsap.timeline({
        defaults: { ease: EASE },
        onComplete: () => {
          wordIndex = nextIndex;
          activeLayer = 1 - activeLayer;
          resetLayer(outgoing, false);
          resetLayer(incoming, true);
          timeline = null;

          if (!cancelled && inView) {
            runCycle();
          }
        },
      });

      timeline.to({}, { duration: ANIMATION_CONFIG.displayDuration });

      outSlices.forEach((slice, index) => {
        const motion = SLICE_MOTION[index] ?? SLICE_MOTION[0];
        timeline!.to(
          slice,
          {
            x: motion.x * wordWidth * xScale,
            y: motion.y * sliceHeight,
            opacity: 0,
            duration: ANIMATION_CONFIG.transitionDuration,
          },
          ANIMATION_CONFIG.displayDuration + index * ANIMATION_CONFIG.sliceStagger,
        );
      });

      inSlices.forEach((slice, index) => {
        timeline!.to(
          slice,
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: ANIMATION_CONFIG.transitionDuration,
          },
          ANIMATION_CONFIG.displayDuration + index * ANIMATION_CONFIG.sliceStagger,
        );
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          inView = true;
          if (timeline) {
            timeline.play();
          } else {
            runCycle();
          }
          return;
        }

        inView = false;
        timeline?.pause();
      },
      { threshold: 0.35 },
    );

    observer.observe(section);

    return () => {
      cancelled = true;
      inView = false;
      observer.disconnect();
      timeline?.kill();
      timeline = null;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="creative-statement-title"
    >
      <p id="creative-statement-title" className="sr-only">
        Belz Studio donne forme à vos idées, vos projets, vos identités et vos
        ambitions.
      </p>

      <div className={styles.container}>
        <h2 className={styles.title} aria-hidden="true">
          <span className={styles.staticLine}>Belz Studio donne forme</span>

          <span className={styles.secondLine}>
            <span className={styles.prefix}>à vos&nbsp;</span>
            <span className={styles.wordStage}>
              <span className={styles.wordSizer} aria-hidden="true">
                {LONGEST_WORD}
              </span>
              <WordSlices word={WORDS[0]} layerRef={layerARef} />
              <WordSlices word={WORDS[0]} layerRef={layerBRef} secondary />
            </span>
          </span>
        </h2>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";

import { createScrollReveal } from "@/lib/scrollReveal";

import styles from "./StudioAudience.module.css";

const LINES = [
  "Studio créatif",
  "pour les petites",
  "entreprises et",
  "auto-entrepreneurs.",
] as const;

export function StudioAudience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const lines = lineRefs.current.filter(Boolean) as HTMLSpanElement[];

    if (!section || lines.length === 0) {
      return;
    }

    return createScrollReveal({
      trigger: section,
      targets: lines,
      from: { opacity: 0, y: 56 },
      start: "top 78%",
      end: "center 42%",
      tweens: lines.map((line, index) => ({
        targets: line,
        vars: {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "none",
        },
        position: index * 0.35,
      })),
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="studio-audience-title"
    >
      <div className={styles.container}>
        <h2 id="studio-audience-title" className={styles.title}>
          {LINES.map((line, index) => (
            <span
              key={line}
              className={styles.line}
              ref={(node) => {
                lineRefs.current[index] = node;
              }}
            >
              {line}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}

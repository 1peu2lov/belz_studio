"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./StudioAudience.module.css";

const LINES = [
  "Studio créatif pour",
  "les petites entreprises",
  "et auto-entrepreneurs.",
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

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(lines, { clearProps: "all", opacity: 1, y: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(lines, { opacity: 0, y: 56 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
        end: "center 42%",
        scrub: 0.65,
      },
    });

    lines.forEach((line, index) => {
      timeline.to(
        line,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "none",
        },
        index * 0.35,
      );
    });

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
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

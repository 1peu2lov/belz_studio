"use client";

import Link from "next/link";
import { useState } from "react";

import { aboutSlides } from "@/data/about";

import styles from "./AboutShowcase.module.css";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      className={styles.arrowIcon}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {direction === "left" ? (
        <path
          d="M14.5 6.5 9 12l5.5 5.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M9.5 6.5 15 12l-5.5 5.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export function AboutShowcase() {
  const [index, setIndex] = useState(0);
  const slide = aboutSlides[index] ?? aboutSlides[0];
  const total = aboutSlides.length;

  if (!slide) {
    return null;
  }

  const goPrev = () => {
    setIndex((current) => (current - 1 + total) % total);
  };

  const goNext = () => {
    setIndex((current) => (current + 1) % total);
  };

  return (
    <section
      className={styles.section}
      aria-labelledby="about-showcase-title"
    >
      <h2 id="about-showcase-title" className="sr-only">
        Le studio
      </h2>

      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.control}
              onClick={goPrev}
              aria-label="Texte précédent"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              className={styles.control}
              onClick={goNext}
              aria-label="Texte suivant"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>

          <div className={styles.content} key={slide.id}>
            <div className={styles.columns}>
              <p className={styles.copy}>{slide.left}</p>
              <p className={styles.copy}>{slide.right}</p>
            </div>

            <Link href="/le-studio" className={styles.cta}>
              <span className={styles.ctaLabel}>Le studio</span>
              <span className={styles.ctaIcon} aria-hidden="true">
                <ArrowIcon direction="right" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

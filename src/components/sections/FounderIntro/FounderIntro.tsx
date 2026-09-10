"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  founderIntro,
  type FounderHighlightIcon,
} from "@/data/founder";

import styles from "./FounderIntro.module.css";

function HighlightIcon({ name }: { name: FounderHighlightIcon }) {
  const common = {
    className: styles.cardIcon,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
    focusable: false as const,
  };

  switch (name) {
    case "spark":
      return (
        <svg {...common}>
          <path
            d="M12 3.5 13.6 9.4 19.5 11 13.6 12.6 12 18.5 10.4 12.6 4.5 11 10.4 9.4 12 3.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path
            d="m4.5 9 7.5 4 7.5-4M4.5 13.5 12 17.5l7.5-4M4.5 4.5 12 8.5l7.5-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "tag":
      return (
        <svg {...common}>
          <path
            d="M4.5 8.5h9.2a3.3 3.3 0 0 1 0 6.6H8.2M8.2 15.1H4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.2 5.9v12.2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common}>
          <path
            d="M13 3.5 6.5 13h5l-1 7.5L17.5 11h-5L13 3.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "handshake":
      return (
        <svg {...common}>
          <path
            d="M8 12.5 10.5 15a2.1 2.1 0 0 0 3 0l5-5a2.1 2.1 0 0 0-3-3l-1.2 1.2M8 12.5l-1.8-1.8a2.1 2.1 0 0 1 3-3L12 10.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.5 14.5v2a3 3 0 0 0 3 3h1M19.5 9.5v-2a3 3 0 0 0-3-3h-1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="m8.5 12.2 2.3 2.3 4.7-4.8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export function FounderIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const portrait = portraitRef.current;
    const cards = cardsRef.current
      ? Array.from(cardsRef.current.children)
      : [];

    if (!section || !content || !portrait) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([content, portrait, ...cards], { clearProps: "all" });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(content, { opacity: 0, y: 48 });
    gsap.set(portrait, { opacity: 0, y: 64 });
    if (cards.length > 0) {
      gsap.set(cards, { opacity: 0, y: 28 });
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
        end: "center 45%",
        scrub: 0.65,
      },
    });

    timeline
      .to(content, { opacity: 1, y: 0, duration: 1, ease: "none" }, 0)
      .to(portrait, { opacity: 1, y: 0, duration: 1, ease: "none" }, 0.12);

    if (cards.length > 0) {
      timeline.to(
        cards,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "none",
          stagger: 0.08,
        },
        0.35,
      );
    }

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="founder-intro-title"
    >
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.content} ref={contentRef}>
            <p className={styles.eyebrow}>{founderIntro.eyebrow}</p>
            <h2 id="founder-intro-title" className={styles.title}>
              {founderIntro.title}
            </h2>

            <div className={styles.copy}>
              {founderIntro.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <ul className={styles.cards} ref={cardsRef}>
              {founderIntro.highlights.map((item) => (
                <li key={item.id} className={styles.card}>
                  <span className={styles.cardLabel}>{item.label}</span>
                  <HighlightIcon name={item.icon} />
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.portrait} ref={portraitRef}>
            <div className={styles.portraitFrame}>
              <Image
                className={styles.portraitImage}
                src={founderIntro.portraitSrc}
                alt={founderIntro.portraitAlt}
                fill
                sizes="(max-width: 47.9375rem) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

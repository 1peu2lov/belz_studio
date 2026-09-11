"use client";

import Image from "next/image";
import { useEffect, useRef, type ComponentType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BadgeCheck,
  BadgeEuro,
  Handshake,
  Layers,
  Sparkles,
  Zap,
  type LucideProps,
} from "lucide-react";

import {
  founderIntro,
  type FounderHighlightIcon,
} from "@/data/founder";
import { shouldSkipScrollReveal } from "@/lib/scrollReveal";

import styles from "./FounderIntro.module.css";

const highlightIcons: Record<
  FounderHighlightIcon,
  ComponentType<LucideProps>
> = {
  sparkles: Sparkles,
  layers: Layers,
  "badge-euro": BadgeEuro,
  zap: Zap,
  handshake: Handshake,
  "badge-check": BadgeCheck,
};

function HighlightIcon({ name }: { name: FounderHighlightIcon }) {
  const Icon = highlightIcons[name];

  return (
    <Icon
      className={styles.cardIcon}
      strokeWidth={1.5}
      absoluteStrokeWidth
      aria-hidden
    />
  );
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

    if (shouldSkipScrollReveal()) {
      gsap.set([content, portrait, ...cards], {
        clearProps: "all",
        opacity: 1,
        y: 0,
      });
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
            <Image
              className={styles.portraitImage}
              src={founderIntro.portraitSrc}
              alt={founderIntro.portraitAlt}
              width={1600}
              height={1200}
              sizes="(max-width: 47.9375rem) 22rem, 28rem"
              quality={90}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

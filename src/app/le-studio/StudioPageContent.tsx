"use client";

import { useEffect, useRef } from "react";

import { ContactCTA } from "@/components/sections/ContactCTA/ContactCTA";
import { FounderIntro } from "@/components/sections/FounderIntro/FounderIntro";
import { StudioRoom } from "@/components/sections/StudioRoom/StudioRoom";
import { studioPage } from "@/data/studio";
import { createScrollReveal } from "@/lib/scrollReveal";

import styles from "./page.module.css";

function revealSection(
  section: HTMLElement | null,
  targets: Element[],
) {
  if (!section || targets.length === 0) {
    return () => undefined;
  }

  return createScrollReveal({
    trigger: section,
    targets,
    animation: {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "none",
      stagger: 0.12,
    },
  });
}

export function StudioPageContent() {
  const heroRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLElement>(null);
  const manifestoCopyRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLElement>(null);
  const principlesListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const cleanups = [
      revealSection(
        heroRef.current,
        heroRef.current ? Array.from(heroRef.current.children) : [],
      ),
      revealSection(manifestoRef.current, [
        ...(manifestoCopyRef.current
          ? Array.from(manifestoCopyRef.current.children)
          : []),
      ]),
      revealSection(principlesRef.current, [
        ...(principlesRef.current
          ? Array.from(
              principlesRef.current.querySelectorAll(`.${styles.blockHead}`),
            )
          : []),
        ...(principlesListRef.current
          ? Array.from(principlesListRef.current.children)
          : []),
      ]),
    ];

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero} ref={heroRef}>
          <h1 id="studio-title" className={styles.title}>
            {studioPage.title}
          </h1>
          <p className={styles.lead}>{studioPage.lead}</p>
        </header>

        <section
          className={styles.manifesto}
          aria-labelledby="manifesto-title"
          ref={manifestoRef}
        >
          <div className={styles.manifestoCopy} ref={manifestoCopyRef}>
            <h2 id="manifesto-title" className={styles.manifestoTitle}>
              {studioPage.manifesto.title}
            </h2>
            {studioPage.manifesto.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className={styles.manifestoScene}>
            <StudioRoom />
          </div>
        </section>

        <section
          className={styles.block}
          aria-labelledby="principles-title"
          ref={principlesRef}
        >
          <div className={styles.blockHead}>
            <h2 id="principles-title" className={styles.blockTitle}>
              {studioPage.principlesTitle}
            </h2>
          </div>

          <ul className={styles.principleList} ref={principlesListRef}>
            {studioPage.principles.map((principle) => (
              <li key={principle.id} className={styles.principleRow}>
                <h3 className={styles.principleLabel}>{principle.label}</h3>
                <p className={styles.principleCopy}>{principle.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <FounderIntro />
      <ContactCTA />
    </div>
  );
}

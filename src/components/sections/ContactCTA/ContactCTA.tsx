"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { Button } from "@/components/ui/Button/Button";
import { createScrollReveal } from "@/lib/scrollReveal";

import styles from "./ContactCTA.module.css";

export function ContactCTA({
  title = (
    <>
      Prêt à faire décoller
      <br />
      votre activité&nbsp;?
    </>
  ),
  buttonLabel = "On en parle\u00a0?",
  href = "/contact",
}: {
  title?: ReactNode;
  buttonLabel?: string;
  href?: string;
} = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const eyebrow = eyebrowRef.current;
    const titleEl = titleRef.current;
    const button = buttonRef.current;

    if (!section || !eyebrow || !titleEl || !button) {
      return;
    }

    const targets = [eyebrow, titleEl, button];

    return createScrollReveal({
      trigger: section,
      targets,
      from: { opacity: 0, y: 48 },
      start: "top 78%",
      end: "center 48%",
      tweens: [
        {
          targets: eyebrow,
          vars: { opacity: 1, y: 0, duration: 1, ease: "none" },
          position: 0,
        },
        {
          targets: titleEl,
          vars: { opacity: 1, y: 0, duration: 1, ease: "none" },
          position: 0.18,
        },
        {
          targets: button,
          vars: { opacity: 1, y: 0, duration: 1, ease: "none" },
          position: 0.36,
        },
      ],
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="contact-cta-title"
    >
      <div className={styles.inner}>
        <p className={styles.eyebrow} ref={eyebrowRef}>
          (c&apos;est parti.)
        </p>

        <h2 id="contact-cta-title" className={styles.title} ref={titleRef}>
          {title}
        </h2>

        <div ref={buttonRef}>
          <Button href={href} className={styles.button}>
            {buttonLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";

import { ServicesSpaceship } from "@/components/sections/ServicesSpaceship/ServicesSpaceship";
import {
  serviceDomains,
  serviceFormulas,
  serviceProcess,
} from "@/data/services";
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

export function ServicesPageContent() {
  const heroRef = useRef<HTMLElement>(null);
  const domainsRef = useRef<HTMLElement>(null);
  const formulasRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const domainsListRef = useRef<HTMLUListElement>(null);
  const formulasListRef = useRef<HTMLUListElement>(null);
  const processListRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const cleanups = [
      revealSection(
        heroRef.current,
        heroRef.current ? Array.from(heroRef.current.children) : [],
      ),
      revealSection(domainsRef.current, [
        ...(domainsRef.current
          ? Array.from(domainsRef.current.querySelectorAll(`.${styles.blockHead}`))
          : []),
        ...(domainsListRef.current
          ? Array.from(domainsListRef.current.children)
          : []),
      ]),
      revealSection(formulasRef.current, [
        ...(formulasRef.current
          ? Array.from(formulasRef.current.querySelectorAll(`.${styles.blockHead}`))
          : []),
        ...(formulasListRef.current
          ? Array.from(formulasListRef.current.children)
          : []),
      ]),
      revealSection(processRef.current, [
        ...(processRef.current
          ? Array.from(processRef.current.querySelectorAll(`.${styles.blockHead}`))
          : []),
        ...(processListRef.current
          ? Array.from(processListRef.current.children)
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
          <h1 id="services-title" className={styles.title}>
            Services
          </h1>
          <p className={styles.lead}>
            Des solutions simples et pro pour les petites entreprises et
            auto-entrepreneurs — sans usine à gaz.
          </p>
        </header>

        <section
          className={styles.block}
          aria-labelledby="domains-title"
          ref={domainsRef}
        >
          <div className={styles.blockHead}>
            <h2 id="domains-title" className={styles.blockTitle}>
              Là où je peux t’aider concrètement.
            </h2>
          </div>

          <ul className={styles.domainList} ref={domainsListRef}>
            {serviceDomains.map((domain) => (
              <li key={domain.id} className={styles.domainRow}>
                <h3 className={styles.domainLabel}>{domain.label}</h3>
                <p className={styles.domainCopy}>{domain.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          className={styles.block}
          aria-labelledby="formulas-title"
          ref={formulasRef}
        >
          <div className={styles.blockHead}>
            <h2 id="formulas-title" className={styles.blockTitle}>
              Formules
            </h2>
            <p className={styles.blockLead}>
              Des packs clairs. Les tarifs seront précisés bientôt.
            </p>
          </div>

          <ul className={styles.formulaGrid} ref={formulasListRef}>
            {serviceFormulas.map((formula) => (
              <li key={formula.id} className={styles.formulaCard}>
                <div className={styles.formulaTop}>
                  <h3 className={styles.formulaName}>{formula.name}</h3>
                  <p className={styles.formulaPrice}>{formula.priceLabel}</p>
                </div>
                <p className={styles.formulaSummary}>{formula.summary}</p>
                <ul className={styles.formulaIncludes}>
                  {formula.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section
          className={styles.block}
          aria-labelledby="process-title"
          ref={processRef}
        >
          <div className={styles.blockHead}>
            <h2 id="process-title" className={styles.blockTitle}>
              Comment je procède
            </h2>
            <p className={styles.blockLead}>
              Une méthode courte, lisible, faite pour avancer.
            </p>
          </div>

          <ol className={styles.processList} ref={processListRef}>
            {serviceProcess.map((item) => (
              <li key={item.step} className={styles.processStep}>
                <span className={styles.processIndex}>
                  {String(item.step).padStart(2, "0")}
                </span>
                <div className={styles.processBody}>
                  <h3 className={styles.processName}>{item.title}</h3>
                  <p className={styles.processCopy}>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <ServicesSpaceship />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

import { ServicesSpaceship } from "@/components/sections/ServicesSpaceship/ServicesSpaceship";
import { ContactCTA } from "@/components/sections/ContactCTA/ContactCTA";
import { Button } from "@/components/ui/Button/Button";
import {
  serviceDomains,
  serviceFormulas,
  serviceProcess,
  servicesPage,
  maintenancePlans,
  maintenanceNote,
  identityOptions,
  launchOfferNote,
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
  const domainsRef = useRef<HTMLElement>(null);
  const formulasRef = useRef<HTMLElement>(null);
  const identityRef = useRef<HTMLElement>(null);
  const maintenanceRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const domainsListRef = useRef<HTMLUListElement>(null);
  const formulasListRef = useRef<HTMLUListElement>(null);
  const identityListRef = useRef<HTMLUListElement>(null);
  const maintenanceListRef = useRef<HTMLUListElement>(null);
  const faqListRef = useRef<HTMLUListElement>(null);
  const processListRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const cleanups = [
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
      revealSection(identityRef.current, [
        ...(identityRef.current
          ? Array.from(identityRef.current.querySelectorAll(`.${styles.blockHead}`))
          : []),
        ...(identityListRef.current
          ? Array.from(identityListRef.current.children)
          : []),
      ]),
      revealSection(maintenanceRef.current, [
        ...(maintenanceRef.current
          ? Array.from(
              maintenanceRef.current.querySelectorAll(`.${styles.blockHead}`),
            )
          : []),
        ...(maintenanceListRef.current
          ? Array.from(maintenanceListRef.current.children)
          : []),
      ]),
      revealSection(faqRef.current, [
        ...(faqRef.current
          ? Array.from(faqRef.current.querySelectorAll(`.${styles.blockHead}`))
          : []),
        ...(faqListRef.current ? Array.from(faqListRef.current.children) : []),
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

  const faqItems = [
    {
      q: "Pourrai‑je modifier moi‑même le site ?",
      a: "Oui, de deux façons : une interface d’édition simple (horaires, tarifs, actualités, galerie) ou, plus simplement, vous m’envoyez vos changements et je les applique (inclus dans la maintenance Sérénité).",
    },
    {
      q: "Et la réservation en ligne ?",
      a: "J’intègre votre outil existant (lien ou widget Planity) ou je mets en place Cal.com/Calendly, directement dans le site.",
    },
    {
      q: "Où est hébergé le site ?",
      a: "Sur Vercel (équipe Pro). Le site et le nom de domaine vous appartiennent. Les frais tiers (domaine, Planity, Cal.com…) sont à votre nom.",
    },
    {
      q: "Pourquoi payer plus qu’un Wix ?",
      a: "Pas d’abonnement à vie, de meilleures performances, pas d’extensions à risque, un design vraiment à votre image et l’aide d’un interlocuteur unique, sur place.",
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <section
          className={styles.block}
          aria-labelledby="formulas-title"
          ref={formulasRef}
        >
          <div className={`${styles.blockHead} ${styles.intro}`}>
            <h1 id="formulas-title" className={styles.title}>
              {servicesPage.formulasTitle}
            </h1>
            <p className={styles.lead}>{servicesPage.formulasLead}</p>
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
                {formula.ctaHref && formula.ctaLabel ? (
                  <div>
                    <Button href={formula.ctaHref} className={styles.cardCta}>
                      {formula.ctaLabel}
                    </Button>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>

          <p className={styles.notice}>{launchOfferNote}</p>
        </section>

        <section
          className={styles.block}
          aria-labelledby="identity-title"
          ref={identityRef}
        >
          <div className={styles.blockHead}>
            <h2 id="identity-title" className={styles.blockTitle}>
              Identité visuelle seule
            </h2>
          </div>

          <ul className={styles.identityList} ref={identityListRef}>
            {identityOptions.map((opt) => (
              <li key={opt.id} className={styles.identityRow}>
                <h3 className={styles.identityName}>{opt.name}</h3>
                <p className={styles.identityPrice}>{opt.priceLabel}</p>
                <p className={styles.identitySummary}>{opt.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          className={styles.block}
          aria-labelledby="maintenance-title"
          ref={maintenanceRef}
        >
          <div className={styles.blockHead}>
            <h2 id="maintenance-title" className={styles.blockTitle}>
              Maintenance & accompagnement
            </h2>
          </div>

          <ul className={styles.formulaGrid} ref={maintenanceListRef}>
            {maintenancePlans.map((plan) => (
              <li key={plan.id} className={styles.formulaCard}>
                <div className={styles.formulaTop}>
                  <h3 className={styles.formulaName}>{plan.name}</h3>
                  <p className={styles.planPrice}>{plan.priceLabel}</p>
                </div>
                <ul className={styles.formulaIncludes}>
                  {plan.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className={styles.blockLead}>{maintenanceNote}</p>
        </section>

        <section className={styles.block} aria-labelledby="faq-title" ref={faqRef}>
          <div className={styles.blockHead}>
            <h2 id="faq-title" className={styles.blockTitle}>
              Questions fréquentes
            </h2>
          </div>
          <ul className={styles.faqList} ref={faqListRef}>
            {faqItems.map((item) => (
              <li key={item.q} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{item.q}</h3>
                <p className={styles.faqAnswer}>{item.a}</p>
              </li>
            ))}
          </ul>
        </section>


      </div>

      <ServicesSpaceship />
    </div>
  );
}

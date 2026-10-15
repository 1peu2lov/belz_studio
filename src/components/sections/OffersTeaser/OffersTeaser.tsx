"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/Button/Button";

import styles from "./OffersTeaser.module.css";

type Teaser = {
  id: string;
  name: string;
  priceFrom: string;
  href: string;
  tagline: string;
};

const teasers: Teaser[] = [
  {
    id: "presence",
    name: "Présence",
    priceFrom: "à partir de 1 190 € HT",
    href: "/services#formulas-title",
    tagline: "One‑page codée, rapide et efficace",
  },
  {
    id: "vitrine",
    name: "Vitrine",
    priceFrom: "à partir de 2 200 € HT",
    href: "/services#formulas-title",
    tagline: "4 à 6 pages sur mesure + interface d’édition",
  },
  {
    id: "univers",
    name: "Univers",
    priceFrom: "à partir de 3 900 € HT",
    href: "/services#formulas-title",
    tagline: "Identité essentielle + site vitrine",
  },
  {
    id: "signature",
    name: "Signature",
    priceFrom: "à partir de 6 000 € HT",
    href: "/services#formulas-title",
    tagline: "Direction artistique, motion et développement sur mesure",
  },
];

function offersPerView(width: number) {
  if (width >= 1280) {
    return 3;
  }
  if (width >= 768) {
    return 2;
  }
  return 1;
}

export function OffersTeaser() {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);
  const maxIndex = Math.max(0, teasers.length - perView);

  useEffect(() => {
    const update = () => {
      const nextPerView = offersPerView(window.innerWidth);
      setPerView(nextPerView);
      setIndex((current) =>
        Math.min(current, Math.max(0, teasers.length - nextPerView)),
      );
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  function showPrevious() {
    setIndex((current) => Math.max(0, current - 1));
  }

  function showNext() {
    setIndex((current) => Math.min(maxIndex, current + 1));
  }

  return (
    <section className={styles.section} aria-labelledby="offers-teaser-title">
      <div className={styles.container}>
        <div className={styles.headRow}>
          <div className={styles.head}>
            <h2 id="offers-teaser-title" className={styles.title}>
              Offres
            </h2>
            <p className={styles.lead}>
              Des forfaits clairs pour démarrer vite, sans abonnement imposé.
            </p>
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.arrow}
              aria-label="Offre précédente"
              disabled={index === 0}
              onClick={showPrevious}
            >
              <ChevronLeft aria-hidden="true" size={20} />
            </button>
            <button
              type="button"
              className={styles.arrow}
              aria-label="Offre suivante"
              disabled={index >= maxIndex}
              onClick={showNext}
            >
              <ChevronRight aria-hidden="true" size={20} />
            </button>
          </div>
        </div>

        <div className={styles.viewport}>
          <ul
            className={styles.track}
            aria-label="Offres"
            style={{
              transform: `translateX(calc(${index} * -1 * (100% + var(--offer-gap)) / ${perView}))`,
            }}
          >
            {teasers.map((item) => (
              <li key={item.id} className={styles.slide}>
                <article className={styles.card}>
                  <div className={styles.cardTop}>
                    <h3 className={styles.cardName}>{item.name}</h3>
                    <p className={styles.cardPrice}>{item.priceFrom}</p>
                  </div>
                  <p className={styles.cardTagline}>{item.tagline}</p>
                  <div className={styles.cardAction}>
                    <Button href={item.href} className={styles.cardCta}>
                      Découvrir
                    </Button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.notice}>
          Offre de lancement pour les 5 premiers projets signés.
        </div>

        <div className={styles.actions}>
          <Button href="/services" variant="secondary">
            Voir toutes les offres
          </Button>
        </div>
      </div>
    </section>
  );
}

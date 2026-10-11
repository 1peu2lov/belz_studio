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
];

export function OffersTeaser() {
  return (
    <section className={styles.section} aria-labelledby="offers-teaser-title">
      <div className={styles.container}>
        <div className={styles.head}>
          <h2 id="offers-teaser-title" className={styles.title}>
            Offres
          </h2>
          <p className={styles.lead}>
            Des forfaits clairs pour démarrer vite, sans abonnement imposé.
          </p>
        </div>

        <ul className={styles.grid}>
          {teasers.map((item) => (
            <li key={item.id} className={styles.card}>
              <div className={styles.cardTop}>
                <h3 className={styles.cardName}>{item.name}</h3>
                <p className={styles.cardPrice}>{item.priceFrom}</p>
              </div>
              <p className={styles.cardTagline}>{item.tagline}</p>
              <div>
                <Button href={item.href} className={styles.cardCta}>
                  Découvrir
                </Button>
              </div>
            </li>
          ))}
        </ul>

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


import { Button } from "@/components/ui/Button/Button";

import styles from "./status.module.css";

export const metadata = {
  title: "Page introuvable",
  description: "Cette page n’existe pas ou n’est plus disponible.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className={styles.page}>
      <section className={styles.section} aria-labelledby="not-found-title">
        <div className={styles.container}>
          <p className={styles.eyebrow}>Erreur 404</p>
          <h1 id="not-found-title" className={styles.title}>
            Page introuvable.
          </h1>
          <p className={styles.lead}>
            Cette adresse n’existe pas, ou la page a été déplacée.
          </p>
          <div className={styles.actions}>
            <Button href="/">Retour à l’accueil</Button>
            <Button href="/contact" variant="secondary">
              Contact
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

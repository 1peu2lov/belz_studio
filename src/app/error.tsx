"use client";

import { Button } from "@/components/ui/Button/Button";

import styles from "./status.module.css";

type ErrorPageProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function ErrorPage({ retry }: ErrorPageProps) {
  return (
    <div className={styles.page}>
      <section className={styles.section} aria-labelledby="error-title">
        <div className={styles.container}>
          <p className={styles.eyebrow}>Erreur</p>
          <h1 id="error-title" className={styles.title}>
            Un souci est apparu.
          </h1>
          <p className={styles.lead}>
            La page n’a pas pu s’afficher. Tu peux réessayer, ou revenir à
            l’accueil.
          </p>
          <div className={styles.actions}>
            <Button onClick={retry}>Réessayer</Button>
            <Button href="/" variant="secondary">
              Accueil
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

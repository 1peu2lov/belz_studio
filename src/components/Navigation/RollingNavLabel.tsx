import styles from "./RollingNavLabel.module.css";

type RollingNavLabelProps = {
  children: string;
};

/**
 * Deux copies du libellé pour l’effet de défilement vertical au hover.
 * Le lien parent doit fournir le nom accessible (aria-label).
 */
export function RollingNavLabel({ children }: RollingNavLabelProps) {
  return (
    <span className={styles.viewport} aria-hidden="true">
      <span className={styles.track}>
        <span className={styles.label}>{children}</span>
        <span className={styles.label}>{children}</span>
      </span>
    </span>
  );
}

import Link from "next/link";

import { RollingNavLabel } from "@/components/Navigation/RollingNavLabel";
import { mainNavigation } from "@/data/navigation";
import { siteConfig } from "@/lib/site";

import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandBlock}>
          <p className={styles.brand}>{siteConfig.name}</p>
          <p className={styles.tagline}>
            Studio créatif à {siteConfig.location.city}
            {siteConfig.location.remote ? ", aussi à distance" : ""}.
          </p>
        </div>

        <nav className={styles.nav} aria-label="Navigation pied de page">
          <ul className={styles.list}>
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  className={styles.link}
                  href={item.href}
                  aria-label={item.label}
                >
                  <RollingNavLabel>{item.label}</RollingNavLabel>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className={styles.copyright}>
          © {year} {siteConfig.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

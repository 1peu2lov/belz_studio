import Image from "next/image";

import { Button } from "@/components/ui/Button/Button";
import { siteConfig } from "@/lib/site";

import styles from "./Hero.module.css";
import { HeroShader } from "./HeroShader";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.fallbackBackground} aria-hidden="true" />

      <div className={styles.shaderWrapper} aria-hidden="true">
        <HeroShader />
      </div>

      <div className={styles.fadeBottom} aria-hidden="true" />

      <div className={styles.foreground}>
        <div className={styles.heroContent}>
          <h1 id="hero-title" className="sr-only">
            {siteConfig.name} — studio créatif pour entrepreneurs et indépendants
          </h1>

          <div className={`${styles.logo} ${styles.reveal}`}>
            <Image
              className={styles.logoImage}
              src="/logo/belz-studio.svg"
              alt={siteConfig.name}
              width={222}
              height={267}
              priority
            />
          </div>

          <div className={`${styles.actions} ${styles.revealDelayed}`}>
            <Button href="/projets" className={styles.ctaPrimary}>
              Voir les projets
            </Button>
            <Button href="/contact" variant="secondary" className={styles.ctaSecondary}>
              Discuter d&apos;un projet
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

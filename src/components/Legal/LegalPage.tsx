import type { ReactNode } from "react";

import styles from "./LegalPage.module.css";

type LegalPageProps = {
  title: string;
  headingId: string;
  children: ReactNode;
};

export function LegalPage({ title, headingId, children }: LegalPageProps) {
  return (
    <div className={styles.page}>
      <article className={styles.section} aria-labelledby={headingId}>
        <div className={styles.container}>
          <h1 id={headingId} className={styles.title}>
            {title}
          </h1>
          <div className={styles.body}>{children}</div>
        </div>
      </article>
    </div>
  );
}

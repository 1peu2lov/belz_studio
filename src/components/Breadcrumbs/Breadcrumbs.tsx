"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { buildBreadcrumbs } from "@/lib/breadcrumbs";

import styles from "./Breadcrumbs.module.css";

export function Breadcrumbs() {
  const pathname = usePathname();
  const crumbs = buildBreadcrumbs(pathname);

  if (crumbs.length === 0) {
    return null;
  }

  return (
    <nav className={styles.nav} aria-label="Fil d’Ariane">
      <div className={styles.inner}>
        <ol className={styles.list}>
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            const isFirst = index === 0;

            return (
              <li key={`${crumb.label}-${index}`} className={styles.item}>
                {!isFirst ? (
                  <span className={styles.sep} aria-hidden="true">
                    /
                  </span>
                ) : null}

                {crumb.href && !isLast ? (
                  <Link href={crumb.href} className={styles.link}>
                    {isFirst ? (
                      <span className={styles.arrow} aria-hidden="true">
                        ←
                      </span>
                    ) : null}
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={styles.current} aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

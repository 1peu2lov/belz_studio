"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { RollingNavLabel } from "@/components/Navigation/RollingNavLabel";
import { mainNavigation } from "@/data/navigation";
import { cn } from "@/utils/cn";

import styles from "./Navigation.module.css";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Navigation principale">
      <ul className={styles.list}>
        {mainNavigation.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href}>
              <Link
                className={cn(styles.link, isActive && styles.active)}
                href={item.href}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                <RollingNavLabel>{item.label}</RollingNavLabel>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

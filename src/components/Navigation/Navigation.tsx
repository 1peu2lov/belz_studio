"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

import { RollingNavLabel } from "@/components/Navigation/RollingNavLabel";
import { mainNavigation } from "@/data/navigation";
import { scrollToTop } from "@/lib/scrollToTop";
import { cn } from "@/utils/cn";

import styles from "./Navigation.module.css";

type NavigationProps = {
  className?: string;
};

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();

  const onNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (pathname !== href) {
      return;
    }

    event.preventDefault();
    scrollToTop();
  };

  return (
    <nav className={cn(styles.nav, className)} aria-label="Navigation principale">
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
                scroll={false}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                onClick={(event) => onNavClick(event, item.href)}
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

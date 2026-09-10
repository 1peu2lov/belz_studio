"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

import { Navigation } from "@/components/Navigation/Navigation";
import { siteConfig } from "@/lib/site";
import { cn } from "@/utils/cn";

import styles from "./Header.module.css";

const SCROLL_THRESHOLD_PX = 80;

function subscribeScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

function getScrollSnapshot() {
  return window.scrollY >= SCROLL_THRESHOLD_PX;
}

function getServerScrollSnapshot() {
  return false;
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isScrolled = useSyncExternalStore(
    subscribeScroll,
    getScrollSnapshot,
    getServerScrollSnapshot,
  );

  const isTransparent = isHome && !isScrolled;

  return (
    <header
      className={cn(
        styles.header,
        isTransparent ? styles.transparent : styles.solid,
      )}
    >
      <div className={`container ${styles.inner}`}>
        <Link className={styles.brand} href="/" aria-label={`${siteConfig.name} — Accueil`}>
          <span className={styles.brandMark}>{siteConfig.name}</span>
        </Link>
        <Navigation />
      </div>
    </header>
  );
}

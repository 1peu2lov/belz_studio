"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState, useSyncExternalStore } from "react";

import { Navigation } from "@/components/Navigation/Navigation";
import { mainNavigation } from "@/data/navigation";
import { siteConfig } from "@/lib/site";
import { scrollToTop } from "@/lib/scrollToTop";
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
  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === "/";
  const isScrolled = useSyncExternalStore(
    subscribeScroll,
    getScrollSnapshot,
    getServerScrollSnapshot,
  );

  const isTransparent = isHome && !isScrolled && !menuOpen;

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        styles.header,
        isTransparent ? styles.transparent : styles.solid,
        menuOpen && styles.menuOpen,
      )}
    >
      <div className={`container ${styles.inner}`}>
        <Link
          className={styles.brand}
          href="/"
          scroll={false}
          aria-label={`${siteConfig.name} — Accueil`}
          onClick={(event) => {
            setMenuOpen(false);
            if (pathname === "/") {
              event.preventDefault();
              scrollToTop();
            }
          }}
        >
          <span className={styles.brandMark}>{siteConfig.name}</span>
        </Link>

        <Navigation className={styles.desktopNav} />

        <button
          type="button"
          className={styles.burger}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles.burgerLines} aria-hidden="true">
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </span>
        </button>
      </div>

      <div
        id={menuId}
        className={cn(styles.mobilePanel, menuOpen && styles.mobilePanelOpen)}
        aria-hidden={!menuOpen}
        inert={menuOpen ? undefined : true}
      >
        <nav className={styles.mobileNav} aria-label="Navigation mobile">
          <ul className={styles.mobileList}>
            {mainNavigation.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
              const isExactPage = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    className={cn(
                      styles.mobileLink,
                      isActive && styles.mobileLinkActive,
                    )}
                    href={item.href}
                    scroll={false}
                    aria-current={isActive ? "page" : undefined}
                    onClick={(event) => {
                      setMenuOpen(false);
                      if (isExactPage) {
                        event.preventDefault();
                        scrollToTop();
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

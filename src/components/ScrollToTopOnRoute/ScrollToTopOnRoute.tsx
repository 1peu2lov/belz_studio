"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { scrollToTop } from "@/lib/scrollToTop";

/** Remonte en haut à chaque changement de route. */
export function ScrollToTopOnRoute() {
  const pathname = usePathname();

  useEffect(() => {
    scrollToTop({ immediate: true });
  }, [pathname]);

  return null;
}

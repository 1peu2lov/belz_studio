"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Smooth scroll Lenis — desktop uniquement.
 * Sur mobile / touch, on laisse le scroll natif.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 48rem) and (pointer: fine)");

    let lenis: Lenis | null = null;
    let onTick: ((time: number) => void) | null = null;

    const teardown = () => {
      document.documentElement.classList.remove("lenis-smooth");
      if (onTick) {
        gsap.ticker.remove(onTick);
        onTick = null;
      }
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
    };

    const setup = () => {
      teardown();

      if (reducedMotion.matches || !desktop.matches) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        autoRaf: false,
        lerp: 0.075,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.2,
        syncTouch: false,
      });

      lenis.on("scroll", ScrollTrigger.update);

      onTick = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
      document.documentElement.classList.add("lenis-smooth");
    };

    setup();
    reducedMotion.addEventListener("change", setup);
    desktop.addEventListener("change", setup);

    return () => {
      reducedMotion.removeEventListener("change", setup);
      desktop.removeEventListener("change", setup);
      teardown();
    };
  }, []);

  return null;
}

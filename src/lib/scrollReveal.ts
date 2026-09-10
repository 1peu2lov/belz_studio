import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Desktop : scrub GSAP. Mobile : contenu visible, scroll natif. */
export const SCROLL_REVEAL_DESKTOP_MQ = "(min-width: 48rem)";

export function shouldSkipScrollReveal(): boolean {
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !window.matchMedia(SCROLL_REVEAL_DESKTOP_MQ).matches
  );
}

type ScrollRevealOptions = {
  trigger: Element;
  targets: gsap.TweenTarget;
  from?: gsap.TweenVars;
  animation?: gsap.TweenVars;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  /** Positions relatives dans la timeline (pour enchaîner plusieurs tweens). */
  tweens?: Array<{
    targets: gsap.TweenTarget;
    vars: gsap.TweenVars;
    position?: gsap.Position;
  }>;
};

/**
 * Reveal lié au scroll.
 * - Desktop : scrub
 * - Mobile / reduced-motion : état final immédiat (évite les blocs invisibles / jank)
 */
export function createScrollReveal({
  trigger,
  targets,
  from = { opacity: 0, y: 44 },
  animation = { opacity: 1, y: 0, duration: 1, ease: "none" },
  start = "top 80%",
  end = "top 35%",
  scrub = 0.65,
  tweens,
}: ScrollRevealOptions): () => void {
  if (shouldSkipScrollReveal()) {
    gsap.set(targets, {
      clearProps: "all",
      opacity: 1,
      y: 0,
      scale: 1,
      autoAlpha: 1,
    });
    return () => undefined;
  }

  gsap.registerPlugin(ScrollTrigger);
  gsap.set(targets, from);

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
    },
  });

  if (tweens && tweens.length > 0) {
    tweens.forEach(({ targets: tweenTargets, vars, position }) => {
      timeline.to(tweenTargets, vars, position);
    });
  } else {
    timeline.to(targets, animation);
  }

  return () => {
    timeline.scrollTrigger?.kill();
    timeline.kill();
  };
}

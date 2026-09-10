"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import gsap from "gsap";

import { ProjectCard } from "@/components/projects/ProjectCard/ProjectCard";
import { projects } from "@/data/projects";

import styles from "./ProjectGallery.module.css";

const DRAG_THRESHOLD_PX = 6;

export function ProjectGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const xRef = useRef(0);
  const startXRef = useRef(0);
  const pointerStartRef = useRef(0);
  const isDraggingRef = useRef(false);
  const didDragRef = useRef(false);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const activePointerRef = useRef<number | null>(null);

  const getBounds = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) {
      return { min: 0, max: 0 };
    }

    const overflow = track.scrollWidth - viewport.clientWidth;
    return {
      min: overflow > 0 ? -overflow : 0,
      max: 0,
    };
  }, []);

  const setX = useCallback((value: number, withBounds = true) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const { min, max } = getBounds();
    const next = withBounds ? Math.min(max, Math.max(min, value)) : value;
    xRef.current = next;
    gsap.set(track, { x: next });
  }, [getBounds]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    gsap.set(track, { x: 0 });

    const onResize = () => {
      setX(xRef.current, true);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setX]);

  useEffect(() => {
    const section = sectionRef.current;
    const cursor = cursorRef.current;
    if (!section || !cursor) {
      return;
    }

    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    gsap.set(cursor, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const syncCursorMode = () => {
      const enabled = finePointer.matches && !reducedMotion.matches;
      section.classList.toggle(styles.cursorActive, enabled);
      if (!enabled) {
        gsap.set(cursor, { autoAlpha: 0 });
      }
    };

    syncCursorMode();
    finePointer.addEventListener("change", syncCursorMode);
    reducedMotion.addEventListener("change", syncCursorMode);

    const onMove = (event: MouseEvent) => {
      if (!finePointer.matches || reducedMotion.matches) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inside) {
        gsap.to(cursor, { autoAlpha: 0, duration: 0.15, overwrite: true });
        return;
      }

      gsap.to(cursor, {
        autoAlpha: 1,
        x: event.clientX,
        y: event.clientY,
        duration: 0.18,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onLeave = () => {
      gsap.to(cursor, { autoAlpha: 0, duration: 0.15, overwrite: true });
    };

    window.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      finePointer.removeEventListener("change", syncCursorMode);
      reducedMotion.removeEventListener("change", syncCursorMode);
      window.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === "mouse") {
      return;
    }

    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    activePointerRef.current = event.pointerId;
    viewport.setPointerCapture(event.pointerId);

    isDraggingRef.current = true;
    didDragRef.current = false;
    startXRef.current = xRef.current;
    pointerStartRef.current = event.clientX;
    lastXRef.current = event.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;

    gsap.killTweensOf(trackRef.current);
    viewport.classList.add(styles.isDragging);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || activePointerRef.current !== event.pointerId) {
      return;
    }

    const delta = event.clientX - pointerStartRef.current;
    if (Math.abs(delta) > DRAG_THRESHOLD_PX) {
      didDragRef.current = true;
    }

    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      velocityRef.current = ((event.clientX - lastXRef.current) / dt) * 16;
    }
    lastXRef.current = event.clientX;
    lastTimeRef.current = now;

    const { min, max } = getBounds();
    const raw = startXRef.current + delta;
    // Légère résistance hors bornes
    let next = raw;
    if (raw > max) {
      next = max + (raw - max) * 0.25;
    } else if (raw < min) {
      next = min + (raw - min) * 0.25;
    }

    xRef.current = next;
    gsap.set(trackRef.current, { x: next });
  };

  const endDrag = (pointerId: number) => {
    if (activePointerRef.current !== pointerId) {
      return;
    }

    const viewport = viewportRef.current;
    const track = trackRef.current;
    isDraggingRef.current = false;
    activePointerRef.current = null;
    viewport?.classList.remove(styles.isDragging);

    if (!track) {
      return;
    }

    const { min, max } = getBounds();
    const projected = xRef.current + velocityRef.current * 18;
    const target = Math.min(max, Math.max(min, projected));

    gsap.to(track, {
      x: target,
      duration: 0.85,
      ease: "power3.out",
      onUpdate: () => {
        xRef.current = Number(gsap.getProperty(track, "x"));
      },
      onComplete: () => {
        xRef.current = target;
      },
    });
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    endDrag(event.pointerId);
  };

  const onPointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    endDrag(event.pointerId);
  };

  const onCardClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (didDragRef.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="project-gallery-title"
    >
      <h2 id="project-gallery-title" className="sr-only">
        Projets sélectionnés
      </h2>

      <div
        ref={viewportRef}
        className={styles.viewport}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <ul ref={trackRef} className={styles.track}>
          {projects.map((project) => (
            <li key={project.slug} className={styles.slide}>
              <ProjectCard
                project={project}
                variant="gallery"
                className={styles.card}
                mediaClassName={styles.media}
                draggable={false}
                onClick={onCardClick}
              />
            </li>
          ))}
        </ul>
      </div>

      <div ref={cursorRef} className={styles.dragCursor} aria-hidden="true">
        Drag
      </div>
    </section>
  );
}

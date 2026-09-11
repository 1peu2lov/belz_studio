type LenisLike = {
  scrollTo: (
    target: number | string,
    options?: { immediate?: boolean; force?: boolean },
  ) => void;
};

let lenisInstance: LenisLike | null = null;

export function setLenisInstance(instance: LenisLike | null) {
  lenisInstance = instance;
}

/** Remonte en haut — Lenis si actif, sinon scroll natif. */
export function scrollToTop(options?: { immediate?: boolean }) {
  const immediate = options?.immediate ?? false;

  if (typeof window === "undefined") {
    return;
  }

  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate, force: true });
    return;
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: immediate ? "auto" : "smooth",
  });
}

import { setConsoleFunction } from "three";

/**
 * R3F 9.x crée encore un THREE.Clock au montage du Canvas.
 * Three r183+ émet un warn de dépréciation à chaque new Clock().
 * À retirer quand on passera à @react-three/fiber v10 (Timer natif).
 */

let installed = false;

export function silenceThreeClockDeprecation() {
  if (installed || typeof window === "undefined") {
    return;
  }

  installed = true;

  setConsoleFunction((type, message, ...params) => {
    if (
      type === "warn" &&
      String(message).includes("THREE.Clock: This module has been deprecated")
    ) {
      return;
    }

    const method =
      type === "warn"
        ? console.warn
        : type === "error"
          ? console.error
          : console.log;

    method(message, ...params);
  });
}

"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
  type MutableRefObject,
} from "react";
import {
  ShaderMaterial,
  Vector2,
  Vector3,
  type IUniform,
} from "three";

import { heroFragmentShader, heroVertexShader } from "./shader/heroShader";
import styles from "./Hero.module.css";

type ShaderConfig = {
  colors: {
    background: string;
    deepBlack: string;
    darkPetrol: string;
    mediumPetrol: string;
    greenPetrol: string;
    softReflection: string;
    brightReflection: string;
  };
  motion: {
    idleSpeed: number;
    pointerSmoothing: number;
    velocityDecay: number;
    returnSpeed: number;
  };
  interaction: {
    influenceRadius: number;
    distortionStrength: number;
    velocityInfluence: number;
    trailStretch: number;
  };
  glass: {
    refractionStrength: number;
    aberrationStrength: number;
    highlightStrength: number;
    ribDensity: number;
    irregularity: number;
  };
  grain: {
    desktop: number;
    mobile: number;
  };
};

/** Configuration artistique — verre pétrole Belz Studio */
const SHADER_CONFIG: ShaderConfig = {
  colors: {
    background: "#101B1E",
    deepBlack: "#080C0D",
    darkPetrol: "#123E41",
    mediumPetrol: "#184B4B",
    greenPetrol: "#11453A",
    softReflection: "#57666A",
    brightReflection: "#BAC5C6",
  },
  motion: {
    idleSpeed: 0.08,
    pointerSmoothing: 1,
    velocityDecay: 0.9,
    returnSpeed: 0.0,
  },
  interaction: {
    influenceRadius: 0.0,
    distortionStrength: 0.02,
    velocityInfluence: 0.05,
    trailStretch: 0.02,
  },
  glass: {
    refractionStrength: 1,
    aberrationStrength: 0.02,
    highlightStrength: 0.18,
    ribDensity: 20,
    irregularity: 0.20,
  },
  grain: {
    desktop: 0.018,
    mobile: 0.01,
  },
};

const REST_X = 0.42;
const REST_Y = 0.38;

function hexToVec3(hex: string): Vector3 {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);
  return new Vector3(
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  );
}

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

type ShaderUniforms = {
  uTime: IUniform<number>;
  uResolution: IUniform<Vector2>;
  uPointer: IUniform<Vector2>;
  uPointerVelocity: IUniform<Vector2>;
  uReducedMotion: IUniform<number>;
  uIsMobile: IUniform<number>;
  uPointerActive: IUniform<number>;
  uBackground: IUniform<Vector3>;
  uDeepBlack: IUniform<Vector3>;
  uDarkPetrol: IUniform<Vector3>;
  uMediumPetrol: IUniform<Vector3>;
  uGreenPetrol: IUniform<Vector3>;
  uSoftReflection: IUniform<Vector3>;
  uBrightReflection: IUniform<Vector3>;
  uIdleSpeed: IUniform<number>;
  uInfluenceRadius: IUniform<number>;
  uDistortionStrength: IUniform<number>;
  uVelocityInfluence: IUniform<number>;
  uTrailStretch: IUniform<number>;
  uRefractionStrength: IUniform<number>;
  uAberrationStrength: IUniform<number>;
  uHighlightStrength: IUniform<number>;
  uRibDensity: IUniform<number>;
  uIrregularity: IUniform<number>;
  uGrainStrength: IUniform<number>;
};

type SharedPointer = {
  target: Vector2;
  hasPointer: boolean;
};

type SceneProps = {
  reducedMotion: boolean;
  isMobile: boolean;
  isVisible: boolean;
  sharedPointer: MutableRefObject<SharedPointer>;
};

function HeroShaderScene({
  reducedMotion,
  isMobile,
  isVisible,
  sharedPointer,
}: SceneProps) {
  const materialRef = useRef<ShaderMaterial | null>(null);
  const { size } = useThree();
  const elapsed = useRef(0);
  const autoPhase = useRef(0);

  // Inertie locale (target / smoothed / velocity)
  const targetPointer = useRef(new Vector2(REST_X, REST_Y));
  const smoothedPointer = useRef(new Vector2(REST_X, REST_Y));
  const pointerVelocity = useRef(new Vector2(0, 0));
  const pointerActive = useRef(0.2);

  const uniforms = useMemo<ShaderUniforms>(() => {
    const c = SHADER_CONFIG.colors;
    return {
      uTime: { value: 0 },
      uResolution: { value: new Vector2(1, 1) },
      uPointer: { value: new Vector2(REST_X, REST_Y) },
      uPointerVelocity: { value: new Vector2(0, 0) },
      uReducedMotion: { value: reducedMotion ? 1 : 0 },
      uIsMobile: { value: isMobile ? 1 : 0 },
      uPointerActive: { value: 0 },
      uBackground: { value: hexToVec3(c.background) },
      uDeepBlack: { value: hexToVec3(c.deepBlack) },
      uDarkPetrol: { value: hexToVec3(c.darkPetrol) },
      uMediumPetrol: { value: hexToVec3(c.mediumPetrol) },
      uGreenPetrol: { value: hexToVec3(c.greenPetrol) },
      uSoftReflection: { value: hexToVec3(c.softReflection) },
      uBrightReflection: { value: hexToVec3(c.brightReflection) },
      uIdleSpeed: { value: SHADER_CONFIG.motion.idleSpeed },
      uInfluenceRadius: { value: SHADER_CONFIG.interaction.influenceRadius },
      uDistortionStrength: { value: SHADER_CONFIG.interaction.distortionStrength },
      uVelocityInfluence: { value: SHADER_CONFIG.interaction.velocityInfluence },
      uTrailStretch: { value: SHADER_CONFIG.interaction.trailStretch },
      uRefractionStrength: { value: SHADER_CONFIG.glass.refractionStrength },
      uAberrationStrength: { value: SHADER_CONFIG.glass.aberrationStrength },
      uHighlightStrength: { value: SHADER_CONFIG.glass.highlightStrength },
      uRibDensity: { value: SHADER_CONFIG.glass.ribDensity },
      uIrregularity: { value: SHADER_CONFIG.glass.irregularity },
      uGrainStrength: {
        value: isMobile ? SHADER_CONFIG.grain.mobile : SHADER_CONFIG.grain.desktop,
      },
    };
  }, [isMobile, reducedMotion]);

  useEffect(() => {
    const material = materialRef.current;
    if (!material) {
      return;
    }
    (material.uniforms.uResolution as IUniform<Vector2>).value.set(
      size.width,
      size.height,
    );
  }, [size.height, size.width]);

  useFrame((_, delta) => {
    if (!isVisible) {
      return;
    }

    const material = materialRef.current;
    if (!material) {
      return;
    }

    const dt = Math.min(delta, 0.05);
    const motionScale = reducedMotion ? 0.04 : 1;
    elapsed.current += dt * motionScale;

    const shared = sharedPointer.current;
    const { motion } = SHADER_CONFIG;
    const hasPointer = shared.hasPointer;

    if (hasPointer) {
      targetPointer.current.copy(shared.target);
      pointerActive.current += (1 - pointerActive.current) * (1 - Math.exp(-dt * 3));
    } else {
      autoPhase.current += dt * (reducedMotion ? 0.05 : motion.idleSpeed * 1.4);
      const ax = 0.38 + Math.sin(autoPhase.current * 0.31) * 0.2;
      const ay = 0.42 + Math.cos(autoPhase.current * 0.23) * 0.16;
      const blend = 1 - Math.exp(-dt * motion.returnSpeed * 8);
      targetPointer.current.x += (ax - targetPointer.current.x) * blend;
      targetPointer.current.y += (ay - targetPointer.current.y) * blend;
      pointerActive.current += (0.2 - pointerActive.current) * (1 - Math.exp(-dt * 1.2));
    }

    const stiffness =
      (reducedMotion ? motion.pointerSmoothing * 0.3 : motion.pointerSmoothing) * 55;
    const damping = reducedMotion ? 4.5 : 2.6;
    const accelX =
      (targetPointer.current.x - smoothedPointer.current.x) * stiffness -
      pointerVelocity.current.x * damping;
    const accelY =
      (targetPointer.current.y - smoothedPointer.current.y) * stiffness -
      pointerVelocity.current.y * damping;

    pointerVelocity.current.x += accelX * dt;
    pointerVelocity.current.y += accelY * dt;
    smoothedPointer.current.x += pointerVelocity.current.x * dt;
    smoothedPointer.current.y += pointerVelocity.current.y * dt;

    if (!hasPointer) {
      const decay = Math.pow(motion.velocityDecay, dt * 60);
      pointerVelocity.current.x *= decay;
      pointerVelocity.current.y *= decay;
    }

    const speed = Math.hypot(pointerVelocity.current.x, pointerVelocity.current.y);
    if (speed > 2.2) {
      pointerVelocity.current.multiplyScalar(2.2 / speed);
    }

    const { uniforms: u } = material;
    (u.uTime as IUniform<number>).value = elapsed.current;
    (u.uPointer as IUniform<Vector2>).value.copy(smoothedPointer.current);
    (u.uPointerVelocity as IUniform<Vector2>).value.copy(pointerVelocity.current);
    (u.uPointerActive as IUniform<number>).value = pointerActive.current;
    (u.uReducedMotion as IUniform<number>).value = reducedMotion ? 1 : 0;
    (u.uIsMobile as IUniform<number>).value = isMobile ? 1 : 0;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={heroVertexShader}
        fragmentShader={heroFragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

function subscribeNoop() {
  return () => undefined;
}

function subscribeMatchMedia(query: string) {
  return (onStoreChange: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener("change", onStoreChange);
    return () => media.removeEventListener("change", onStoreChange);
  };
}

function subscribeVisibility(onStoreChange: () => void) {
  document.addEventListener("visibilitychange", onStoreChange);
  return () => document.removeEventListener("visibilitychange", onStoreChange);
}

export function HeroShader() {
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
  const webglOk = useSyncExternalStore(
    subscribeNoop,
    isWebGLAvailable,
    () => false,
  );
  const reducedMotion = useSyncExternalStore(
    subscribeMatchMedia("(prefers-reduced-motion: reduce)"),
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const isMobile = useSyncExternalStore(
    subscribeMatchMedia("(max-width: 48rem), (pointer: coarse)"),
    () =>
      window.matchMedia("(max-width: 48rem)").matches ||
      window.matchMedia("(pointer: coarse)").matches,
    () => false,
  );
  const isVisible = useSyncExternalStore(
    subscribeVisibility,
    () => document.visibilityState === "visible",
    () => true,
  );

  const sharedPointer = useRef<SharedPointer>({
    target: new Vector2(REST_X, REST_Y),
    hasPointer: false,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = containerRef.current?.closest("section");
    if (!root || !webglOk) {
      return;
    }

    const readUv = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();
      if (bounds.width === 0 || bounds.height === 0) {
        return null;
      }
      return {
        x: (event.clientX - bounds.left) / bounds.width,
        y: 1 - (event.clientY - bounds.top) / bounds.height,
      };
    };

    const onMove = (event: PointerEvent) => {
      const uv = readUv(event);
      if (!uv) {
        return;
      }
      sharedPointer.current.target.set(uv.x, uv.y);
      sharedPointer.current.hasPointer = true;
    };

    const onDown = (event: PointerEvent) => {
      const uv = readUv(event);
      if (!uv) {
        return;
      }
      sharedPointer.current.target.set(uv.x, uv.y);
      sharedPointer.current.hasPointer = true;
    };

    const onUpOrLeave = () => {
      sharedPointer.current.hasPointer = false;
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointerup", onUpOrLeave);
    root.addEventListener("pointercancel", onUpOrLeave);
    root.addEventListener("pointerleave", onUpOrLeave);

    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerup", onUpOrLeave);
      root.removeEventListener("pointercancel", onUpOrLeave);
      root.removeEventListener("pointerleave", onUpOrLeave);
    };
  }, [webglOk]);

  if (!mounted || !webglOk) {
    return <div ref={containerRef} className={styles.shaderWrapperInner} />;
  }

  return (
    <div ref={containerRef} className={styles.shaderWrapperInner}>
      <Canvas
        className={styles.canvas}
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1, near: 0.1, far: 10 }}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
        }}
        frameloop={isVisible ? "always" : "never"}
        resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
      >
        <HeroShaderScene
          reducedMotion={reducedMotion}
          isMobile={isMobile}
          isVisible={isVisible}
          sharedPointer={sharedPointer}
        />
      </Canvas>
    </div>
  );
}

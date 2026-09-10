"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import { SpaceshipModel } from "./SpaceshipModel";
import { silenceThreeClockDeprecation } from "@/lib/silenceThreeClockDeprecation";

silenceThreeClockDeprecation();

type SpaceshipCanvasProps = {
  active: boolean;
  reducedMotion: boolean;
};

export function SpaceshipCanvas({ active, reducedMotion }: SpaceshipCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "demand"}
      camera={{ position: [0, 0.15, 20], fov: 38, near: 0.1, far:100}}
      gl={{
        alpha: true,
        antialias: true,
        premultipliedAlpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl, scene, invalidate }) => {
        scene.background = null;
        gl.setClearColor(0x000000, 0);
        gl.setClearAlpha(0);
        invalidate();
      }}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        background: "transparent",
      }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 6]} intensity={2.2} color="#bac5c6" />
      <pointLight position={[-4, 1, 2]} intensity={8} color="#184b4b" />
      <pointLight position={[2, -2, -3]} intensity={3.5} color="#123e41" />

      <Suspense fallback={null}>
        <SpaceshipModel active={active} reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}

"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import { silenceThreeClockDeprecation } from "@/lib/silenceThreeClockDeprecation";

import { StudioRoomModel } from "./StudioRoomModel";

silenceThreeClockDeprecation();

type StudioRoomCanvasProps = {
  active: boolean;
  reducedMotion: boolean;
};

export function StudioRoomCanvas({
  active,
  reducedMotion,
}: StudioRoomCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "demand"}
      orthographic
      camera={{
        position: [6.5, 5.6, 6.5],
        zoom: 1,
        near: 0.1,
        far: 200,
      }}
      gl={{
        alpha: true,
        antialias: true,
        premultipliedAlpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl, scene, camera, invalidate }) => {
        scene.background = null;
        gl.setClearColor(0x000000, 0);
        gl.setClearAlpha(0);
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.15;
        camera.lookAt(0, 0, 0);
        invalidate();
      }}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        background: "transparent",
      }}
    >
      {/* Éclairage calé sur la DA Belz : pétrole, cyan doux, blanc froid */}
      <hemisphereLight
        intensity={0.85}
        color="#bac5c6"
        groundColor="#0c1618"
      />
      <ambientLight intensity={0.42} color="#d7e0e0" />
      <directionalLight
        position={[4.5, 7, 3.5]}
        intensity={1.75}
        color="#e8efef"
      />
      <directionalLight
        position={[-5, 2.2, -2.5]}
        intensity={1.15}
        color="#184b4b"
      />
      <pointLight position={[1.4, 2.4, 1.6]} intensity={7} color="#bac5c6" />
      <pointLight position={[-1.8, 1.1, 2.2]} intensity={9} color="#184b4b" />
      <pointLight position={[0.2, 0.6, -1.8]} intensity={4} color="#123e41" />

      <Suspense fallback={null}>
        <StudioRoomModel active={active} reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}

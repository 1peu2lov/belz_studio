"use client";

import { useLayoutEffect, useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const SPACESHIP_MODEL_URL = "/models/intergalactic-spaceship.gltf";

type SpaceshipModelProps = {
  active: boolean;
  reducedMotion: boolean;
};

export function SpaceshipModel({ active, reducedMotion }: SpaceshipModelProps) {
  const rootRef = useRef<THREE.Group>(null);
  const pointerRef = useRef<THREE.Group>(null);
  const floatRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);

  const { scene, animations } = useGLTF(SPACESHIP_MODEL_URL);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const { actions } = useAnimations(animations, modelRef);

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    // Normalise la taille pour un cadrage caméra ~z=5 / fov 38
    const targetSize = 2.35;
    clonedScene.scale.setScalar(targetSize / maxDim);
  }, [clonedScene]);

  useEffect(() => {
    const action = actions.Animation;
    if (!action) {
      return;
    }

    if (reducedMotion || !active) {
      action.stop();
      return;
    }

    // AnimationAction (Three.js) est mutable par design.
    action.reset();
    action.setLoop(THREE.LoopRepeat, Infinity);
    // eslint-disable-next-line react-hooks/immutability -- timeScale sur AnimationAction
    action.timeScale = 0.8;
    action.fadeIn(0.4).play();

    return () => {
      action.fadeOut(0.2);
      action.stop();
    };
  }, [actions, active, reducedMotion]);

  const elapsedRef = useRef(0);

  useFrame((_state, delta) => {
    if (!pointerRef.current || !floatRef.current) {
      return;
    }

    if (!active || reducedMotion) {
      pointerRef.current.rotation.x = THREE.MathUtils.damp(
        pointerRef.current.rotation.x,
        0,
        3,
        delta,
      );
      pointerRef.current.rotation.y = THREE.MathUtils.damp(
        pointerRef.current.rotation.y,
        0,
        3,
        delta,
      );
      floatRef.current.position.y = THREE.MathUtils.damp(
        floatRef.current.position.y,
        0,
        3,
        delta,
      );
      return;
    }

    elapsedRef.current += delta;
    const t = elapsedRef.current;
    floatRef.current.position.y = Math.sin(t * 0.45) * 0.07;
    floatRef.current.rotation.y += delta * 0.12;
    floatRef.current.rotation.z = Math.sin(t * 0.3) * 0.035;

    const targetX = _state.pointer.y * 0.14;
    const targetY = _state.pointer.x * 0.2;

    pointerRef.current.rotation.x = THREE.MathUtils.damp(
      pointerRef.current.rotation.x,
      targetX,
      4,
      delta,
    );
    pointerRef.current.rotation.y = THREE.MathUtils.damp(
      pointerRef.current.rotation.y,
      targetY,
      4,
      delta,
    );
  });

  return (
    <group ref={rootRef}>
      <group ref={pointerRef}>
        <group ref={floatRef}>
          <Center cacheKey={SPACESHIP_MODEL_URL}>
            <group ref={modelRef}>
              <primitive object={clonedScene} />
            </group>
          </Center>
        </group>
      </group>
    </group>
  );
}

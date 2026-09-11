"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  type RefObject,
} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Center, useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const SPACESHIP_MODEL_URL = "/models/intergalactic-spaceship.gltf";

/** Taille monde stable — la distance caméra s’adapte au canvas. */
const SHIP_WORLD_SIZE = 2.6;

type SpaceshipModelProps = {
  active: boolean;
  reducedMotion: boolean;
};

/**
 * Perspective : sans recalcul, le cadrage change avec la taille / le ratio
 * du canvas (et avec les anciens scales mobile/tablette).
 */
function FitPerspectiveToShip({
  targetRef,
  fill = 0.62,
}: {
  targetRef: RefObject<THREE.Object3D | null>;
  fill?: number;
}) {
  const size = useThree((state) => state.size);
  const camera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);

  useLayoutEffect(() => {
    const fit = () => {
      const target = targetRef.current;
      if (!target || !(camera instanceof THREE.PerspectiveCamera)) {
        return;
      }

      if (size.width <= 1 || size.height <= 1) {
        return;
      }

      target.updateWorldMatrix(true, true);
      const box = new THREE.Box3().setFromObject(target);
      if (box.isEmpty()) {
        return;
      }

      const sphere = box.getBoundingSphere(new THREE.Sphere());
      const radius = Math.max(sphere.radius, 0.001);
      const aspect = size.width / size.height;
      const vFov = THREE.MathUtils.degToRad(camera.fov);
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);

      const distV = radius / (Math.tan(vFov / 2) * fill);
      const distH = radius / (Math.tan(hFov / 2) * fill);
      const distance = Math.max(distV, distH);

      camera.position.set(0, 0.15, distance);
      camera.near = Math.max(0.1, distance / 100);
      camera.far = Math.max(100, distance * 12);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      invalidate();
    };

    fit();
    const frame = requestAnimationFrame(fit);
    return () => cancelAnimationFrame(frame);
  }, [camera, fill, invalidate, size.height, size.width, targetRef]);

  return null;
}

export function SpaceshipModel({ active, reducedMotion }: SpaceshipModelProps) {
  const rootRef = useRef<THREE.Group>(null);
  const pointerRef = useRef<THREE.Group>(null);
  const floatRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);

  const { scene, animations } = useGLTF(SPACESHIP_MODEL_URL);
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const dims = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(dims.x, dims.y, dims.z) || 1;
    clone.scale.setScalar(SHIP_WORLD_SIZE / maxDim);
    return clone;
  }, [scene]);
  const { actions } = useAnimations(animations, modelRef);

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
    <>
      <FitPerspectiveToShip targetRef={rootRef} />
      <group ref={rootRef}>
        <group ref={pointerRef}>
          <group ref={floatRef}>
            <Center cacheKey={`${SPACESHIP_MODEL_URL}-fit`}>
              <group ref={modelRef}>
                <primitive object={clonedScene} />
              </group>
            </Center>
          </group>
        </group>
      </group>
    </>
  );
}

"use client";

import { useLayoutEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const STUDIO_ROOM_MODEL_URL = "/models/scene.gltf";

/** Taille monde cible (stable) — le zoom caméra s’adapte au canvas. */
const ROOM_WORLD_SIZE = 2.8;

type StudioRoomModelProps = {
  active: boolean;
  reducedMotion: boolean;
};

function prepareMaterials(root: THREE.Object3D) {
  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) {
      return;
    }

    object.castShadow = false;
    object.receiveShadow = false;
    object.frustumCulled = false;

    const materials = Array.isArray(object.material)
      ? object.material
      : [object.material];

    materials.forEach((material) => {
      if (!material || !(material instanceof THREE.Material)) {
        return;
      }

      material.side = THREE.DoubleSide;

      if ("map" in material && material.map instanceof THREE.Texture) {
        material.map.colorSpace = THREE.SRGBColorSpace;
        material.map.anisotropy = 8;
        material.map.needsUpdate = true;
      }

      if ("envMapIntensity" in material) {
        material.envMapIntensity = 0.85;
      }

      if ("metalness" in material && typeof material.metalness === "number") {
        material.metalness = Math.min(material.metalness, 0.35);
      }

      material.needsUpdate = true;
    });
  });
}

/**
 * Ortho : le zoom R3F est en pixels. Sans recalcul, la room paraît
 * plus petite sur un grand canvas et plus grosse sur un petit.
 */
function FitOrthographicToRoom({
  targetRef,
  fill = 0.78,
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
      if (!target || !(camera instanceof THREE.OrthographicCamera)) {
        return;
      }

      const view = Math.min(size.width, size.height);
      if (view <= 1) {
        return;
      }

      target.updateWorldMatrix(true, true);
      const box = new THREE.Box3().setFromObject(target);
      if (box.isEmpty()) {
        return;
      }

      const sphere = box.getBoundingSphere(new THREE.Sphere());
      const diameter = Math.max(sphere.radius * 2, 0.001);

      camera.zoom = (view * fill) / diameter;
      camera.position.set(6.5, 5.6, 6.5);
      camera.near = 0.1;
      camera.far = 200;
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      invalidate();
    };

    // Après Center (layout enfant) + un frame pour une bbox fiable.
    fit();
    const frame = requestAnimationFrame(fit);
    return () => cancelAnimationFrame(frame);
  }, [camera, fill, invalidate, size.height, size.width, targetRef]);

  return null;
}

export function StudioRoomModel({
  active,
  reducedMotion,
}: StudioRoomModelProps) {
  const rootRef = useRef<THREE.Group>(null);
  const pointerRef = useRef<THREE.Group>(null);
  const floatRef = useRef<THREE.Group>(null);

  const { scene } = useGLTF(STUDIO_ROOM_MODEL_URL);
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    prepareMaterials(clone);

    const box = new THREE.Box3().setFromObject(clone);
    const dims = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(dims.x, dims.y, dims.z) || 1;
    clone.scale.setScalar(ROOM_WORLD_SIZE / maxDim);

    return clone;
  }, [scene]);

  const elapsedRef = useRef(0);

  useFrame((state, delta) => {
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
      floatRef.current.rotation.y = THREE.MathUtils.damp(
        floatRef.current.rotation.y,
        0,
        3,
        delta,
      );
      return;
    }

    elapsedRef.current += delta;
    const t = elapsedRef.current;
    floatRef.current.position.y = Math.sin(t * 0.4) * 0.02;
    floatRef.current.rotation.y = Math.sin(t * 0.16) * 0.025;

    const targetX = state.pointer.y * 0.035;
    const targetY = state.pointer.x * 0.04;

    pointerRef.current.rotation.x = THREE.MathUtils.damp(
      pointerRef.current.rotation.x,
      targetX,
      3.5,
      delta,
    );
    pointerRef.current.rotation.y = THREE.MathUtils.damp(
      pointerRef.current.rotation.y,
      targetY,
      3.5,
      delta,
    );
  });

  return (
    <>
      <FitOrthographicToRoom targetRef={rootRef} />
      <group ref={rootRef}>
        <group ref={pointerRef}>
          <group ref={floatRef}>
            <Center cacheKey={`${STUDIO_ROOM_MODEL_URL}-fit`}>
              <primitive object={clonedScene} />
            </Center>
          </group>
        </group>
      </group>
    </>
  );
}

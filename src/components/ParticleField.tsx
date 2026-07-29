"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { EnvironmentTheme } from "./ThemeProvider";

function sphere(count: number, min: number, max: number) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = min + Math.random() * (max - min);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
}

function Cloud({
  count,
  min,
  max,
  spaceColor,
  oceanColor,
  spaceSize,
  oceanSize,
  speed,
  spaceOpacity,
  oceanOpacity,
  oceanWaveAmplitude,
  oceanFlowSpeed,
  environment,
  motionEnabled,
  pointerPosition,
  scrollProgress,
}: {
  count: number;
  min: number;
  max: number;
  spaceColor: string;
  oceanColor: string;
  spaceSize: number;
  oceanSize: number;
  speed: number;
  spaceOpacity: number;
  oceanOpacity: number;
  oceanWaveAmplitude: number;
  oceanFlowSpeed: number;
  environment: EnvironmentTheme;
  motionEnabled: boolean;
  pointerPosition: { current: THREE.Vector2 };
  scrollProgress: { current: number };
}) {
  const ref = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const orbitAngle = useRef(0);
  const elapsed = useRef(0);
  const positionsWereDisplaced = useRef(false);
  const pointerOffset = useRef(new THREE.Vector2());
  const positions = useMemo(() => sphere(count, min, max), [count, min, max]);
  const renderedPositions = useMemo(
    () => new Float32Array(positions),
    [positions],
  );
  const targetColor = useMemo(
    () => new THREE.Color(environment === "space" ? spaceColor : oceanColor),
    [environment, oceanColor, spaceColor],
  );
  const ocean = environment === "ocean";

  useFrame((_, delta) => {
    const p = ref.current;
    const material = materialRef.current;
    if (!p || !material) return;

    const response = 1 - Math.exp(-delta * 3);
    material.color.lerp(targetColor, response);
    material.opacity = THREE.MathUtils.lerp(
      material.opacity,
      ocean ? oceanOpacity : spaceOpacity,
      response,
    );
    material.size = THREE.MathUtils.lerp(
      material.size,
      ocean ? oceanSize : spaceSize,
      response,
    );

    if (!ocean && positionsWereDisplaced.current && geometryRef.current) {
      const positionAttribute = geometryRef.current.getAttribute(
        "position",
      ) as THREE.BufferAttribute;
      (positionAttribute.array as Float32Array).set(positions);
      positionAttribute.needsUpdate = true;
      positionsWereDisplaced.current = false;
    }

    if (!motionEnabled) return;

    elapsed.current += delta;
    pointerOffset.current.x = THREE.MathUtils.damp(
      pointerOffset.current.x,
      pointerPosition.current.x,
      ocean ? 1.2 : 1.8,
      delta,
    );
    pointerOffset.current.y = THREE.MathUtils.damp(
      pointerOffset.current.y,
      pointerPosition.current.y,
      ocean ? 1.2 : 1.8,
      delta,
    );

    if (ocean) {
      const current = elapsed.current;
      const positionAttribute = geometryRef.current?.getAttribute(
        "position",
      ) as THREE.BufferAttribute | undefined;

      if (positionAttribute) {
        const currentPositions = positionAttribute.array as Float32Array;
        for (let index = 0; index < count; index++) {
          const offset = index * 3;
          const baseX = positions[offset];
          const baseY = positions[offset + 1];
          const baseZ = positions[offset + 2];
          const travelWidth = max * 2;
          const flowDistance = current * oceanFlowSpeed * 0.45;
          const wrappedX =
            ((((baseX + flowDistance + max) % travelWidth) + travelWidth) %
              travelWidth) -
            max;
          const primaryWave = Math.sin(
            wrappedX * 1.55 +
              baseZ * 0.72 +
              current * oceanFlowSpeed * 0.35,
          );
          const crossCurrent = Math.sin(
            baseZ * 1.1 -
              current * oceanFlowSpeed * 0.42 +
              baseY * 0.35,
          );

          currentPositions[offset] =
            wrappedX +
            crossCurrent * oceanWaveAmplitude * 0.08;
          currentPositions[offset + 1] =
            baseY +
            primaryWave * oceanWaveAmplitude +
            crossCurrent * oceanWaveAmplitude * 0.24;
          currentPositions[offset + 2] =
            baseZ +
            Math.sin(baseY + current * oceanFlowSpeed * 0.36) *
              oceanWaveAmplitude *
              0.12;
        }
        positionAttribute.needsUpdate = true;
        positionsWereDisplaced.current = true;
      }

      p.rotation.x = -pointerOffset.current.y * 0.14;
      p.rotation.y = pointerOffset.current.x * 0.22;
      p.rotation.z = Math.sin(current * oceanFlowSpeed * 0.3) * 0.024;
      p.position.x = THREE.MathUtils.lerp(
        p.position.x,
        pointerOffset.current.x * 0.16,
        delta * 0.5,
      );
      p.position.y = -scrollProgress.current * 0.12;
      return;
    }

    orbitAngle.current =
      (orbitAngle.current + delta * speed) % (Math.PI * 2);
    p.position.x = THREE.MathUtils.lerp(p.position.x, 0, delta);
    p.position.y = THREE.MathUtils.lerp(p.position.y, 0, delta);
    p.rotation.y =
      orbitAngle.current + pointerOffset.current.x * 0.4;
    p.rotation.x =
      orbitAngle.current * 0.4 -
      pointerOffset.current.y * 0.3 +
      scrollProgress.current * 0.12;
  });

  return (
    <points ref={ref}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[renderedPositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        color={environment === "space" ? spaceColor : oceanColor}
        size={environment === "space" ? spaceSize : oceanSize}
        sizeAttenuation
        transparent
        opacity={environment === "space" ? spaceOpacity : oceanOpacity}
        depthWrite={false}
        blending={ocean ? THREE.NormalBlending : THREE.AdditiveBlending}
      />
    </points>
  );
}

function SceneEnvironment({
  environment,
}: {
  environment: EnvironmentTheme;
}) {
  return (
    <fogExp2
      attach="fog"
      args={
        environment === "ocean"
          ? ["#69c7d0", 0.06]
          : ["#070a12", 0.045]
      }
    />
  );
}

export default function ParticleField({
  environment,
  motionEnabled,
}: {
  environment: EnvironmentTheme;
  motionEnabled: boolean;
}) {
  const scrollProgress = useRef(0);
  const pointerPosition = useRef(new THREE.Vector2());

  useEffect(() => {
    const updateScroll = () => {
      scrollProgress.current = Math.min(
        window.scrollY / Math.max(window.innerHeight, 1),
        1,
      );
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      pointerPosition.current.set(
        (event.clientX / Math.max(window.innerWidth, 1)) * 2 - 1,
        -(event.clientY / Math.max(window.innerHeight, 1)) * 2 + 1,
      );
    };
    const resetPointer = () => pointerPosition.current.set(0, 0);

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("blur", resetPointer);
    document.documentElement.addEventListener("pointerleave", resetPointer);
    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("blur", resetPointer);
      document.documentElement.removeEventListener("pointerleave", resetPointer);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.25]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={motionEnabled ? "always" : "demand"}
    >
      <SceneEnvironment environment={environment} />
      <Cloud
        count={1800}
        min={2.4}
        max={4.2}
        spaceColor="#c6ff3a"
        oceanColor="#07505e"
        spaceSize={0.02}
        oceanSize={0.018}
        speed={0.04}
        spaceOpacity={0.85}
        oceanOpacity={0.56}
        oceanWaveAmplitude={0.12}
        oceanFlowSpeed={0.58}
        environment={environment}
        motionEnabled={motionEnabled}
        pointerPosition={pointerPosition}
        scrollProgress={scrollProgress}
      />
      <Cloud
        count={900}
        min={1.2}
        max={2.4}
        spaceColor="#22d3ee"
        oceanColor="#f7ffff"
        spaceSize={0.018}
        oceanSize={0.03}
        speed={0.06}
        spaceOpacity={0.6}
        oceanOpacity={0.78}
        oceanWaveAmplitude={0.2}
        oceanFlowSpeed={0.76}
        environment={environment}
        motionEnabled={motionEnabled}
        pointerPosition={pointerPosition}
        scrollProgress={scrollProgress}
      />
      <Cloud
        count={48}
        min={1.5}
        max={3.8}
        spaceColor="#f5f5f5"
        oceanColor="#f7ffff"
        spaceSize={0.014}
        oceanSize={0.09}
        speed={0.025}
        spaceOpacity={0}
        oceanOpacity={0.6}
        oceanWaveAmplitude={0.32}
        oceanFlowSpeed={1.05}
        environment={environment}
        motionEnabled={motionEnabled}
        pointerPosition={pointerPosition}
        scrollProgress={scrollProgress}
      />
    </Canvas>
  );
}

"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

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
  color,
  size,
  speed,
  opacity,
}: {
  count: number;
  min: number;
  max: number;
  color: string;
  size: number;
  speed: number;
  opacity: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => sphere(count, min, max), [count, min, max]);

  useFrame((state, delta) => {
    const p = ref.current;
    if (!p) return;
    p.rotation.y += delta * speed;
    p.rotation.x += delta * speed * 0.4;
    // gentle drift toward the pointer
    const targetY = state.pointer.x * 0.4;
    const targetX = -state.pointer.y * 0.3;
    p.rotation.y += (targetY - p.rotation.y % (Math.PI * 2)) * delta * 0.15;
    p.rotation.x += (targetX - p.rotation.x % (Math.PI * 2)) * delta * 0.15;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.25]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Cloud count={1800} min={2.4} max={4.2} color="#c6ff3a" size={0.02} speed={0.04} opacity={0.85} />
      <Cloud count={900} min={1.2} max={2.4} color="#22d3ee" size={0.018} speed={0.06} opacity={0.6} />
    </Canvas>
  );
}

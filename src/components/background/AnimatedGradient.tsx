import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { fragmentShader, vertexShader } from "./GradientShader";

const GradientPlane: React.FC = () => {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },

      uBlue: { value: new THREE.Color("#69eaf5") },
      uCyan: { value: new THREE.Color("#a065f3") },
      uPink: { value: new THREE.Color("#f58bd7") },
      uRed: { value: new THREE.Color("#62f69e") },
    }),
    [],
  );

  useFrame((_, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value += delta * 0.15;
  });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!materialRef.current) return;
      materialRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(
          e.clientX / window.innerWidth,
          1.0 - e.clientY / window.innerHeight,
        ),
        0.08,
      );
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />

      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};

const AnimatedGradient: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 1], fov: 75 }}
      gl={{ antialias: true, alpha: true }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <GradientPlane />
    </Canvas>
  );
};

export default AnimatedGradient;

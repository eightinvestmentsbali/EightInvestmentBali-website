import { Canvas } from "@react-three/fiber";
import { ShaderPlane } from "./ShaderPlane";

export default function ShaderBackground() {
  return (
    <Canvas
      orthographic
      camera={{ zoom: 1, position: [0, 0, 1] }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none", // allows clicks to pass through
      }}
      gl={{ antialias: true }}
    >
      <ShaderPlane />
    </Canvas>
  );
}

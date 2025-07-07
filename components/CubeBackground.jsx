"use client";
import { Canvas } from "@react-three/fiber";
export default function CubeBackground() {
  return (
    <div>
      <Canvas

        style={{ pointerEvents: "none" }} // pour que le canvas ne bloque pas les clics
        camera={{ position: [0, 0, 5] }}
      >
        <ambientLight />
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="lightblue" />
        </mesh>
      </Canvas>
    </div>
  );
}

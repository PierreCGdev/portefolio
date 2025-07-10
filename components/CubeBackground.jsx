"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useRef } from "react";

export default function CubeBackground({ scrollY }) {
  const groupRef = useRef();
  const { theme, setTheme } = useTheme();
  const cubeColor = theme === "light" ? "#ffffff" : "#000000";
  const gridX = 20;
  const gridY = 10;
  const cubeSpacing = 1;

  useFrame(() => {
    if (groupRef.current) {
      const offset = scrollY.current * 0.01;

      // Animation du groupe global
      groupRef.current.position.y = offset;
    }
  });

  const cubesGrid = [];
  for (let x = 0; x < gridX; x++) {
    for (let z = 0; z < gridY; z++) {
      const xPos = (x - (gridX - 1) / 2) * cubeSpacing;
      const zPos = (z - (gridY - 1) / 2) * cubeSpacing;
      cubesGrid.push(
        <mesh key={`cube-${x}-${z}`} position={[xPos, zPos, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={cubeColor} />
        </mesh>
      );
    }
  }
  return <group ref={groupRef}>{cubesGrid}</group>;
}

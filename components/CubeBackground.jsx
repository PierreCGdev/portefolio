"use client";
import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";

export default function CubeBackground() {
  const { theme, setTheme } = useTheme();
  const cubeColor = theme === "light" ? "#ffffff" : "#000000";
  const gridX = 20;
  const gridY = 20;
  const cubeSpacing = 3;

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
  return <group>{cubesGrid}</group>;
}

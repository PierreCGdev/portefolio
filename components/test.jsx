import { useRef, useMemo, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

const initalY = 5;
// Cube individuel avec effet falloff
function Cube({ position, cubeColor }) {
  const ref = useRef();
  const baseZ = position[1];

  const targetZ = baseZ - initalY;

  useFrame(() => {
    if (!ref.current) return;
    // ref.current.position.y += (targetZ - ref.current.position.y) * 0.06;
    // ref.current.rotation.x -= 0.01;
  });

  return (
    <mesh ref={ref} position={[position[0], position[1], position[2]]} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={cubeColor} />
    </mesh>
  );
}

// Grille de cubes
export default function CubeBackground({ yScroll }) {
  const groupRef = useRef();
  const { theme } = useTheme();
  const { size } = useThree();

  const cubeColor = theme === "light" ? "#ffffff" : "#121212";
  const hoverColor = theme === "light" ? "#aaaaaa" : "#4d4d4d";
  // Calcul de la grille de cubes en fonction de la taille de la fenêtre
  const gridX = Math.floor(size.width / 130);
  const gridY = Math.floor(size.height / 150);
  const cubeSpacing = 1;

  // Génération des positions des cubes et mémorisation avec useMemo
  const cubePositions = useMemo(() => {
    const list = [];
    for (let x = 0; x < gridX; x++) {
      for (let z = 0; z < gridY; z++) {
        const xPos = (x - (gridX - 1) / 2) * cubeSpacing;
        const zPos = (z - (gridY - 1) / 2) * (cubeSpacing + 1);
        list.push([xPos, zPos, 0]);
      }
    }
    return list;
  }, [gridX, gridY, cubeSpacing]);

  return (
    <group ref={groupRef} position={[0, gridY / 2, 0]}>
      {cubePositions.map((position, idx) => (
        <Cube key={idx} position={position} cubeColor={cubeColor} />
      ))}
    </group>
  );
}

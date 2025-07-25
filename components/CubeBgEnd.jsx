import { useRef, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";

// Cube individuel avec un effet de position/rotation basé sur le scroll avec un random speed factor
function Cube({ position, screenScroll, gridY }) {
  const { theme } = useTheme();
  const ref = useRef();
  const cubeColor = theme === "light" ? "#ffffff" : "#121212";
  // random pour le rotation et position
  const speedFactor = useRef(0.3 + Math.random() * 0.7).current; // ∈ [0.3, 1)
  useFrame(() => {
    if (!ref.current) return;
    const targetRotation = screenScroll * (Math.PI / 2);

    // Calcul de la position de base en fonction du scroll et de la grille
    const baseZ = position[2] + 8 * (position[1] + (gridY - 1) / 2) * screenScroll;
    const baseY = position[1] - (position[1] - (gridY - 1) / 4) * screenScroll;
    ref.current.rotation.x += (targetRotation - ref.current.rotation.x) * (0.05 * speedFactor);
    ref.current.position.z +=
      (baseZ - ref.current.position.z - 8 * (position[1] + (gridY - 1) / 2)) * (0.05 * speedFactor);
    ref.current.position.y +=
      (baseY - ref.current.position.y + (position[1] - (gridY - 1) / 4)) * (0.05 * speedFactor);
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

  const { size } = useThree();
  // début du scroll avant l'affichage du composant
  const startScroll = size.height * 1.3;
  const totalScroll = size.height * 2 - startScroll;
  // calcul de la hauteur du scroll en fonction de la position actuelle du composant dans page.js (ne pas dépasser 1)
  const currentScroll =
    (yScroll.current - startScroll) / totalScroll > 1
      ? 1
      : yScroll.current - startScroll < 0
        ? 0
        : (yScroll.current - startScroll) / totalScroll;
  // Calcul de la grille de cubes en fonction de la taille de la fenêtre
  const gridX = Math.floor(size.width / 130);
  const gridY = Math.floor(size.height / 150);
  const cubeSpacing = 1;

  // Génération des positions des cubes et mémorisation avec useMemo
  const cubePositions = useMemo(() => {
    const list = [];
    for (let x = 0; x < gridX; x++) {
      for (let y = 0; y < gridY; y++) {
        const xPos = (x - (gridX - 1) / 2) * cubeSpacing;
        const yPos = (y - (gridY - 1) / 2) * cubeSpacing;
        list.push([xPos, yPos, 0]);
      }
    }
    return list;
  }, [gridX, gridY, cubeSpacing]);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {cubePositions.map((position, idx) => (
        <Cube key={idx} position={position} screenScroll={currentScroll} gridY={gridY} />
      ))}
    </group>
  );
}

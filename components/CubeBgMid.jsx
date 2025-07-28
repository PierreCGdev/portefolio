import { useRef, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";

// Cube individuel avec un effet de position/rotation basé sur le scroll avec un random speed factor
function Cube({ position, screenScroll, gridY }) {
  // le scroll pour que de 0 à 0.7 on scale de 0 à 1, de 0.7 à 1.3 c'est égal à 1, et de 1.3 à 2 on scale de 1 à 0
  const screenScrollCtrl =
    screenScroll <= 0
      ? 0
      : screenScroll <= 0.7
        ? screenScroll / 0.7
        : screenScroll <= 1.3
          ? 1
          : screenScroll <= 2
            ? 1 - (screenScroll - 1.3) / 0.7
            : 0;
  const { theme } = useTheme();
  const ref = useRef();
  const cubeColor = theme === "light" ? "#ffffff" : "#121212";
  // random pour le rotation et position
  const speedFactor = useRef(0.3 + Math.random() * 0.7).current; // ∈ [0.3, 1)
  useFrame(() => {
    if (!ref.current) return;
    const targetRotation = screenScrollCtrl * (Math.PI / 2);
    const targetPosY =
      screenScroll > 1 ? 1 * (position[1] + (gridY - 1) / 4) : 1 * (position[1] - (gridY - 1) / 4);

    const targetPosZ =
      screenScroll > 1
        ? 1.5 * (position[2] + (gridY - 1) / 4)
        : 1.5 * (position[2] - (gridY - 1) / 4);

    // Calcul de la position de base en fonction du scroll et de la grille
    const baseZ = position[2] + targetPosZ * screenScrollCtrl;
    const baseY = position[1] - targetPosY * screenScrollCtrl;
    ref.current.rotation.x += (targetRotation - ref.current.rotation.x) * (0.05 * speedFactor);
    ref.current.position.z += (baseZ - ref.current.position.z - targetPosZ) * (0.05 * speedFactor);
    ref.current.position.y += (baseY - ref.current.position.y + targetPosY) * (0.05 * speedFactor);
    const targetScale = screenScrollCtrl;
    const speed = 0.05 * speedFactor;

    ref.current.scale.x += (targetScale - ref.current.scale.x) * speed;
    ref.current.scale.y += (targetScale - ref.current.scale.y) * speed;
    ref.current.scale.z += (targetScale - ref.current.scale.z) * speed;
  });

  return (
    <mesh ref={ref} position={[position[0], position[1], position[2]]} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={cubeColor} />
    </mesh>
  );
}

// Grille de cubes
export default function CubeBackground({ yScroll, widthDivier = 130, heightDivider = 150 }) {
  const groupRef = useRef();

  const { size } = useThree();
  // début du scroll avant l'affichage du composant
  const startScroll = size.height * 0.5;
  const middleScroll = size.height * 1 - startScroll;

  const endScroll = size.height * 1.5 - middleScroll;

  // calcul de la hauteur du scroll en fonction de la position actuelle du composant dans page.js (ne pas dépasser 1)
  const currentScroll = (yScroll.current - startScroll) / middleScroll;

  // Calcul de la grille de cubes en fonction de la taille de la fenêtre
  const gridX = Math.floor(size.width / widthDivier);
  const gridY = Math.floor(size.height / heightDivider);
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

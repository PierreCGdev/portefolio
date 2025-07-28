import { useRef, useMemo, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

// Cube individuel avec effet falloff
function Cube({
  position,
  cubeColor,
  hoverColor,
  hoveredPosition,
  setHoveredPosition,
  screenScroll,
  gridY,
}) {
  const ref = useRef();

  const baseZ = position[2];
  const baseRX = 0;
  const speedFactor = useRef(0.3 + Math.random() * 0.7).current;
  const screenScrollCtrl = Math.max(0, Math.min(1, screenScroll));
  useFrame(() => {
    if (!ref.current) return;

    let hoverFactor = 0;

    if (hoveredPosition) {
      const dx = position[0] - hoveredPosition[0];
      const dz = position[1] - hoveredPosition[1];
      const dist = Math.sqrt(dx * dx + dz * dz);

      const falloff = 2;
      hoverFactor = Math.exp(-dist / falloff);
    }

    const targetZ = baseZ + 7 * hoverFactor + (position[1] + (gridY - 1) / 2) * screenScrollCtrl;
    const targetRX = baseRX + 1.7 * hoverFactor;
    const targetPosY = 1 * (position[1] - (gridY - 1) / 2) * screenScrollCtrl;
    const targetScale = screenScrollCtrl * 0.3;
    const baseY = position[1] - targetPosY * screenScrollCtrl;

    ref.current.position.z += (targetZ - ref.current.position.z) * 0.06;
    ref.current.rotation.x += (targetRX - ref.current.rotation.x) * 0.06;
    ref.current.position.y += (baseY - ref.current.position.y + targetPosY) * (0.05 * speedFactor);
    ref.current.scale.x += (1 - targetScale - ref.current.scale.x) * 0.05 * speedFactor;
    ref.current.scale.y += (1 - targetScale - ref.current.scale.y) * 0.05 * speedFactor;
    ref.current.scale.z += (1 - targetScale - ref.current.scale.z) * 0.05 * speedFactor;
    const base = new THREE.Color(cubeColor);
    const hover = new THREE.Color(hoverColor);
    ref.current.material.color.copy(base).lerp(hover, hoverFactor);
  });

  return (
    <mesh
      ref={ref}
      position={position}
      castShadow
      receiveShadow
      onPointerOver={() => setHoveredPosition(position)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={cubeColor} />
    </mesh>
  );
}

// Grille de cubes
export default function CubeBackground({ yScroll, widthDivier = 130, heightDivider = 150 }) {
  const groupRef = useRef();
  const { theme } = useTheme();
  const { size } = useThree();

  // calcul de la hauteur du scroll en fonction de la position actuelle du composant dans page.js (ne pas dépasser 1)
  const currentScroll = yScroll.current / size.height;

  const cubeColor = theme === "light" ? "#ffffff" : "#121212";
  const hoverColor = theme === "light" ? "#aaaaaa" : "#4d4d4d";
  // Calcul de la grille de cubes en fonction de la taille de la fenêtre
  const gridX = Math.floor(size.width / widthDivier);
  const gridY = Math.floor(size.height / heightDivider);
  const cubeSpacing = 1;

  const [hoveredPosition, setHoveredPosition] = useState(null);
  // Génération des positions des cubes et mémorisation avec useMemo
  const cubePositions = useMemo(() => {
    const list = [];
    for (let x = 0; x < gridX; x++) {
      for (let z = 0; z < gridY; z++) {
        const xPos = (x - (gridX - 1) / 2) * cubeSpacing;
        const zPos = (z - (gridY - 1) / 2) * cubeSpacing;
        list.push([xPos, zPos, 0]);
      }
    }
    return list;
  }, [gridX, gridY, cubeSpacing]);

  return (
    <group
      ref={groupRef}
      onPointerMove={(e) => {
        e.stopPropagation();
        const point = e.intersections[0];
        if (point?.object?.position) {
          setHoveredPosition([
            point.object.position.x,
            point.object.position.y,
            point.object.position.z,
          ]);
        }
      }}
      onPointerLeave={() => setHoveredPosition(null)}
    >
      {cubePositions.map((position, idx) => (
        <Cube
          key={idx}
          position={position}
          cubeColor={cubeColor}
          hoverColor={hoverColor}
          hoveredPosition={hoveredPosition}
          setHoveredPosition={setHoveredPosition}
          screenScroll={currentScroll}
          gridY={gridY}
        />
      ))}
    </group>
  );
}

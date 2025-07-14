"use client";
import { useRef, useMemo, useState, useEffect } from "react";
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
}) {
  const ref = useRef();

  const baseZ = position[2];
  const baseRX = 0;

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

    const targetZ = baseZ + 7 * hoverFactor;
    const targetRX = baseRX + 1.7 * hoverFactor;

    ref.current.position.z += (targetZ - ref.current.position.z) * 0.06;
    ref.current.rotation.x += (targetRX - ref.current.rotation.x) * 0.06;

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
      // onPointerOut={() => setHoveredPosition(null)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={cubeColor} />
    </mesh>
  );
}

// Grille de cubes
export default function CubeBackground({ scrollY }) {
  const groupRef = useRef();
  const { theme } = useTheme();
  const { size } = useThree();

  const cubeColor = theme === "light" ? "#ffffff" : "#121212";
  const hoverColor = theme === "light" ? "#aaaaaa" : "#4d4d4d";

  const gridX = Math.floor(size.width / 145);
  const gridY = Math.floor(size.height / 160);
  const cubeSpacing = 1;

  const [hoveredPosition, setHoveredPosition] = useState(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = scrollY.current * 0.008;
    }
  });

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
        />
      ))}
    </group>
  );
}

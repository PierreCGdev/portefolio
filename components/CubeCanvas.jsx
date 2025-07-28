import { Canvas } from "@react-three/fiber";
export default function CubeCanvas({ children }) {
  return (
    <Canvas shadows camera={{ position: [0, 0, 29], fov: 22 }} dpr={1}>
      <ambientLight intensity={4} color={"#ffffff"} />
      <directionalLight
        color={"#ffffff"}
        position={[0, 10, 10]}
        intensity={4}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-20}
        shadow-camera-right={20}
      />
      {children}
    </Canvas>
  );
}

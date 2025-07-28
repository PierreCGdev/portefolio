import { Canvas } from "@react-three/fiber";
export default function CubeCanvas({ children }) {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* affiché sur desktop */}
      <div className="hidden md:block w-full h-full">
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
      </div>

      {/* Affiché sur mobile */}
      <div className="block md:hidden w-4/5 h-4/5 bg-zinc-900"></div>
    </div>
  );
}

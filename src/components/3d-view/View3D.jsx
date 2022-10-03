import { Box } from "@components";
import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export function View3D({ nftImg }) {
  return (
    <Canvas>
      <OrbitControls
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate
        enableZoom={false}
        maxDistance={1.5}
      />
      <Stars />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      {/* <Physics> */}
      <Box nftImg={nftImg} />
      {/* <Plane /> */}
      {/* </Physics> */}
    </Canvas>
  );
}

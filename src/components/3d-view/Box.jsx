import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { TextureLoader } from "three";
import qmark from "../../questionmark.jpg";

export function Box({ nftImg }) {
  const [nftTexture] = useLoader(TextureLoader, [nftImg ? nftImg : qmark]);

  return (
    <mesh position={[0, 0, 0]}>
      <boxBufferGeometry attach='geometry' />
      <meshStandardMaterial attach='material' color='white' map={nftTexture} />
    </mesh>
  );
}

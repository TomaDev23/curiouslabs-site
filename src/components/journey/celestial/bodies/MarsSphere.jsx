import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

export const metadata = {
  id: 'mars_sphere_3d',
  scs: 'SCS-BODY-SPHERE',
  type: 'three-mesh',
  doc: 'LEGIT_contract_planetTextureMap.md'
};

export default function MarsSphere({ position = [0, 0, 0], radius = 1, rotation = [0, 0, 0] }) {
  // Load texture maps
  const surfaceMap = useLoader(TextureLoader, '/assets/images/planets/4k/mars_surface_4k.jpg');
  const bumpMap = useLoader(TextureLoader, '/assets/images/planets/4k/mars_bump_4k.jpg');

  return (
    <mesh position={position} rotation={rotation}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial
        map={surfaceMap}
        bumpMap={bumpMap}
        bumpScale={0.03}
        metalness={0.1}
        roughness={0.8}
      />
    </mesh>
  );
} 
import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';

export const metadata = {
  id: 'pluto_sphere_3d',
  scs: 'SCS-BODY-SPHERE',
  type: 'three-mesh',
  doc: 'LEGIT_contract_planetTextureMap.md'
};

export default function PlutoSphere({ position = [0, 0, 0], radius = 1, rotation = [0, 0, 0] }) {
  // Reference for rotation animation
  const meshRef = useRef();
  
  // Load texture maps
  const surfaceMap = useLoader(TextureLoader, '/assets/images/planets/4k/plutomap2k.jpg');
  const bumpMap = useLoader(TextureLoader, '/assets/images/planets/4k/plutobump2k.jpg');
  
  // Animate rotation - Pluto has a slow rotation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005; // Very slow rotation
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial
        map={surfaceMap}
        bumpMap={bumpMap}
        bumpScale={0.02}
        metalness={0.1}
        roughness={0.9}
      />
    </mesh>
  );
} 
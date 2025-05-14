import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';

export const metadata = {
  id: 'jupiter_sphere_3d',
  scs: 'SCS-BODY-SPHERE',
  type: 'three-mesh',
  doc: 'LEGIT_contract_planetTextureMap.md'
};

export default function JupiterSphere({ position = [0, 0, 0], radius = 1, rotation = [0, 0, 0] }) {
  // Reference for rotation animation
  const meshRef = useRef();
  
  // Load texture map
  const surfaceMap = useLoader(TextureLoader, '/assets/images/planets/4k/jupiter2_4k.jpg');
  
  // Animate rotation - Jupiter has a fast rotation period
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002; // Faster rotation for Jupiter
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial
        map={surfaceMap}
        metalness={0.1}
        roughness={0.8}
      />
    </mesh>
  );
} 
import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';

export const metadata = {
  id: 'venus_sphere_3d',
  scs: 'SCS-BODY-SPHERE',
  type: 'three-mesh',
  doc: 'LEGIT_contract_planetTextureMap.md'
};

export default function VenusSphere({ position = [0, 0, 0], radius = 1, rotation = [0, 0, 0] }) {
  // Reference for rotation animation
  const meshRef = useRef();
  const atmosphereRef = useRef();
  
  // Load texture maps
  const surfaceMap = useLoader(TextureLoader, '/assets/images/planets/4k/venusmap_LE_upscale_balanced_x4.jpg');
  const bumpMap = useLoader(TextureLoader, '/assets/images/planets/4k/venusbump_LE_upscale_balanced_x4.jpg');
  
  // Animate rotation - Venus has a very slow retrograde rotation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= 0.0001; // Slow retrograde rotation
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= 0.0005; // Atmosphere rotates faster than surface
    }
  });

  return (
    <group position={position}>
      {/* Main planet sphere */}
      <mesh ref={meshRef} rotation={rotation}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={surfaceMap}
          bumpMap={bumpMap}
          bumpScale={0.02}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
      
      {/* Atmospheric glow effect */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[radius * 1.03, 32, 32]} />
        <meshStandardMaterial
          color="#ffcc99"
          transparent={true}
          opacity={0.2}
          emissive="#ffaa77"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
} 
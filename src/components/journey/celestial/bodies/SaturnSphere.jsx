import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { DoubleSide } from 'three';

export const metadata = {
  id: 'saturn_sphere_3d',
  scs: 'SCS-BODY-SPHERE',
  type: 'three-mesh',
  doc: 'LEGIT_contract_planetTextureMap.md'
};

export default function SaturnSphere({ position = [0, 0, 0], radius = 1, rotation = [0, 0, 0] }) {
  // References for rotation animation
  const planetRef = useRef();
  const ringsRef = useRef();
  
  // Load texture maps
  const surfaceMap = useLoader(TextureLoader, '/assets/images/planets/4k/saturnmap_LE_upscale_balanced_x4.jpg');
  const ringColorMap = useLoader(TextureLoader, '/assets/images/planets/4k/saturnringcolor.jpg');
  
  // Animate rotation - Saturn has a fast rotation
  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.0015; // Fast rotation
    }
    // Rings rotate slightly differently
    if (ringsRef.current) {
      ringsRef.current.rotation.z += 0.0005;
    }
  });

  // Calculate ring dimensions
  const innerRadius = radius * 1.4;
  const outerRadius = radius * 2.5;

  return (
    <group position={position}>
      {/* Back rings (behind planet) */}
      <mesh rotation={[Math.PI / 3, 0, 0]} position={[0, 0, 0]} renderOrder={1}>
        <ringGeometry args={[innerRadius, outerRadius, 64]} />
        <meshStandardMaterial 
          map={ringColorMap}
          transparent={true}
          opacity={0.8}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>
      
      {/* Main planet sphere */}
      <mesh ref={planetRef} rotation={rotation} renderOrder={2}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={surfaceMap}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
      
      {/* Front rings (in front of planet) */}
      <mesh ref={ringsRef} rotation={[Math.PI / 3, 0, 0]} position={[0, 0, 0]} renderOrder={3}>
        <ringGeometry args={[innerRadius, outerRadius, 64]} />
        <meshStandardMaterial 
          map={ringColorMap}
          transparent={true}
          opacity={0.8}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
} 
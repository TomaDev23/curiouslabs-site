import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { DoubleSide } from 'three';

export const metadata = {
  id: 'uranus_sphere_3d',
  scs: 'SCS-BODY-SPHERE',
  type: 'three-mesh',
  doc: 'LEGIT_contract_planetTextureMap.md'
};

export default function UranusSphere({ position = [0, 0, 0], radius = 1, rotation = [0, 0, 0] }) {
  // References for rotation animation
  const planetRef = useRef();
  const ringsRef = useRef();
  
  // Load texture maps
  const surfaceMap = useLoader(TextureLoader, '/assets/images/planets/4k/uranusmap_LE_upscale_balanced_x4.jpg');
  const ringColorMap = useLoader(TextureLoader, '/assets/images/planets/4k/uranusringcolour_LE_upscale_balanced_x4.jpg');
  
  // Animate rotation - Uranus has a unique rotation (it's tilted on its side)
  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.001; // Moderate rotation
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z += 0.0003; // Slow ring rotation
    }
  });

  // Calculate ring dimensions - Uranus has thin rings
  const innerRadius = radius * 1.4;
  const outerRadius = radius * 2.0;
  
  // Uranus is tilted 97 degrees on its axis
  const tiltAngle = Math.PI / 2 + Math.PI / 10;

  return (
    <group position={position}>
      {/* Back rings (behind planet) */}
      <mesh rotation={[0, Math.PI / 2, tiltAngle]} position={[0, 0, 0]} renderOrder={1}>
        <ringGeometry args={[innerRadius, outerRadius, 64]} />
        <meshStandardMaterial 
          map={ringColorMap}
          transparent={true}
          opacity={0.7}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>
      
      {/* Main planet sphere - Uranus is tilted on its axis */}
      <mesh ref={planetRef} rotation={[0, 0, tiltAngle]} renderOrder={2}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={surfaceMap}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
      
      {/* Front rings (in front of planet) */}
      <mesh ref={ringsRef} rotation={[0, Math.PI / 2, tiltAngle]} position={[0, 0, 0]} renderOrder={3}>
        <ringGeometry args={[innerRadius, outerRadius, 64]} />
        <meshStandardMaterial 
          map={ringColorMap}
          transparent={true}
          opacity={0.7}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
} 
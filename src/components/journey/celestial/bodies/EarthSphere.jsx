import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';

export const metadata = {
  id: 'earth_sphere_3d',
  scs: 'SCS-BODY-SPHERE',
  type: 'three-mesh',
  doc: 'LEGIT_contract_planetTextureMap.md'
};

export default function EarthSphere({ position = [0, 0, 0], radius = 1, rotation = [0, 0, 0] }) {
  // References for rotation animation
  const earthRef = useRef();
  const cloudsRef = useRef();
  
  // Load texture maps
  const surfaceMap = useLoader(TextureLoader, '/assets/images/planets/4k/earthmap1k_LE_upscale_balanced_x4.jpg');
  const bumpMap = useLoader(TextureLoader, '/assets/images/planets/4k/earthbump1k_LE_upscale_balanced_x4.jpg');
  const cloudMap = useLoader(TextureLoader, '/assets/images/planets/4k/earthcloudmap_LE_upscale_balanced_x4.jpg');
  
  // Animate rotation - Earth rotates once per day
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001; // Earth rotation
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0012; // Clouds rotate slightly faster
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Main Earth sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={surfaceMap}
          bumpMap={bumpMap}
          bumpScale={0.05}
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>
      
      {/* Cloud layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[radius * 1.01, 64, 64]} />
        <meshStandardMaterial
          map={cloudMap}
          transparent={true}
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
} 
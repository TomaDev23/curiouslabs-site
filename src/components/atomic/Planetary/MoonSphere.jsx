/**
 * @component MoonSphere
 * @description Cinematic moon with directional lighting, glow, and distant appearance
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - MoonSphere passes LEGIT protocol
 */

import React, { useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';

// Scene setup for the 3D moon with cinematic lighting
const MoonScene = () => {
  const moonRef = useRef();
  
  // Slow rotation animation
  useFrame(() => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.0005; // Very slow rotation
    }
  });

  // Load texture maps
  const moonTexture = useLoader(TextureLoader, '/assets/images/planets/4k/moonmap2k.jpg');
  const moonBumpMap = useLoader(TextureLoader, '/assets/images/planets/4k/moonbump2k.jpg');
  
  // Apply texture scaling to imply distance
  moonTexture.repeat.set(0.65, 0.65);
  moonTexture.offset.set(0.175, 0.175);
  
  // Apply same scaling to bump map
  moonBumpMap.repeat.set(0.65, 0.65);
  moonBumpMap.offset.set(0.175, 0.175);
  
  return (
    <>
      {/* Ambient light (subtle) */}
      <ambientLight intensity={0.5} />
      
      {/* Key light from screen-left (sunlight simulation) */}
      <directionalLight
        position={[5, 5, -10]} // From left-top-rear
        intensity={2.4}
        color="#ffffff"
      />
      
      {/* Fill light (subtle) */}
      <directionalLight
        position={[-3, -2, 5]} // From right-bottom-front
        intensity={0.3}
        color="#fff6e0"
      />
      
      {/* Dark-side gradient light (negative fill) */}
      <directionalLight
        position={[3, -4, 4]} // From bottom-right
        intensity={-0.2}
        color="#1a1a2e"
      />
      
      {/* Lens flare / rim halo layer */}
      <Sphere args={[4.28, 64, 64]}>
        <meshBasicMaterial
          color="#eaeaea"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Glow & Rimlight */}
      <Sphere args={[4.22, 64, 64]}>
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Invisible interaction sphere */}
      <mesh>
        <sphereGeometry args={[4.5, 32, 32]} />
        <meshBasicMaterial 
          transparent 
          opacity={0} 
        />
      </mesh>
      
      {/* Rim highlight for subtle edge glow */}
      <Sphere args={[4.17, 64, 64]}>
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.12}
          side={THREE.FrontSide}
        />
      </Sphere>
      
      {/* Moon sphere with refined material */}
      <mesh ref={moonRef}>
        <sphereGeometry args={[4.16, 64, 64]} />
        <meshStandardMaterial 
          map={moonTexture}
          bumpMap={moonBumpMap}
          bumpScale={0.035}
          color="#d8d8d8"
          metalness={0.04}
          roughness={0.8}
          emissive={'#ffffff'}
          emissiveIntensity={0.28}
        />
      </mesh>
      
      {/* Rim highlight for subtle edge glow */}
      <Sphere args={[4.16, 64, 64]}>
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.08}
          side={THREE.FrontSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </>
  );
};

// Texture preloader component
const TexturePreloader = () => {
  useLoader(TextureLoader, '/assets/images/planets/4k/moonmap2k.jpg');
  useLoader(TextureLoader, '/assets/images/planets/4k/moonbump2k.jpg');
  return null;
};

// WebGL support check utility
const checkWebGLSupport = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
};

// Main MoonSphere component
const MoonSphere = ({ className = "", fallbackToEclipse = false }) => {
  // WebGL detection happens inside the component
  const [supportsWebGL, setSupportsWebGL] = React.useState(true);
  
  React.useEffect(() => {
    setSupportsWebGL(checkWebGLSupport());
  }, []);
  
  // Fallback to CSS eclipse if needed
  if (fallbackToEclipse || !supportsWebGL) {
    return (
      <div 
        className={`relative rounded-full flex items-center justify-center ${className}`}
        style={{
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at center, rgba(20,20,20,1) 40%, rgba(20,20,20,0.5) 70%, rgba(0,0,0,0) 100%)'
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 80% 20%, rgba(0,0,0,0.35) 0%, transparent 50%)',
            filter: 'blur(20px)',
            pointerEvents: 'none'
          }}
        ></div>
      </div>
    );
  }
  
  return (
    <div className={`relative rounded-full overflow-hidden ${className}`} style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 25], fov: 25 }} dpr={[1, 2]}>
        <React.Suspense fallback={null}>
          <TexturePreloader />
          <MoonScene />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default MoonSphere; 
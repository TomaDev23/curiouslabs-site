/**
 * @component JupiterSphere
 * @description Cinematic Jupiter with directional lighting, glow, and gas giant appearance
 * @base MoonSphere.jsx - Using superior Moon rendering system
 * @future_use AEGIS page integration
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - JupiterSphere passes LEGIT protocol
 */

import React, { useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';

// Scene setup for the 3D Jupiter with cinematic lighting
const JupiterScene = ({ scaleFactor = 1, rotationY = 0 }) => {
  const jupiterRef = useRef();
  
  // Rotation animation with optional override (Jupiter rotates fast - ~10 hour day)
  useFrame(() => {
    if (jupiterRef.current) {
      jupiterRef.current.rotation.y += 0.002; // Faster rotation for gas giant
      // Apply additional rotation if provided (for scroll animations)
      if (rotationY) {
        jupiterRef.current.rotation.y = rotationY;
      }
    }
  });

  // Load texture maps
  const jupiterTexture = useLoader(TextureLoader, '/assets/images/planets/4k/jupitermap.jpg');
  
  // Apply texture scaling to imply distance
  jupiterTexture.repeat.set(0.65, 0.65);
  jupiterTexture.offset.set(0.175, 0.175);
  
  return (
    <group scale={scaleFactor}>
      {/* Ambient light (subtle) */}
      <ambientLight intensity={0.6} />
      
      {/* Key light from screen-left (sunlight simulation) */}
      <directionalLight
        position={[5, 5, -10]} // From left-top-rear
        intensity={2.8}
        color="#ffffff"
      />
      
      {/* Fill light (subtle warm) */}
      <directionalLight
        position={[-3, -2, 5]} // From right-bottom-front
        intensity={0.4}
        color="#ffaa77"
      />
      
      {/* Dark-side gradient light (negative fill) */}
      <directionalLight
        position={[3, -4, 4]} // From bottom-right
        intensity={-0.15}
        color="#1a1a2e"
      />
      
      {/* Lens flare / rim halo layer - larger for gas giant */}
      <Sphere args={[4.35, 64, 64]}>
        <meshBasicMaterial
          color="#d4a574"
          transparent
          opacity={0.18}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Glow & Rimlight - enhanced for gas giant */}
      <Sphere args={[4.28, 64, 64]}>
        <meshBasicMaterial
          color="#ffcc88"
          transparent
          opacity={0.12}
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
          color="#d4a574"
          transparent
          opacity={0.12}
          side={THREE.FrontSide}
        />
      </Sphere>
      
      {/* Jupiter sphere with refined material */}
      <mesh ref={jupiterRef}>
        <sphereGeometry args={[4.16, 64, 64]} />
        <meshStandardMaterial 
          map={jupiterTexture}
          color="#d4a574"
          metalness={0.02}
          roughness={0.9}
          emissive={'#ffaa77'}
          emissiveIntensity={0.08}
        />
      </mesh>
      
      {/* Rim highlight for subtle edge glow */}
      <Sphere args={[4.16, 64, 64]}>
        <meshBasicMaterial
          color="#d4a574"
          transparent
          opacity={0.08}
          side={THREE.FrontSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
      
      {/* Atmospheric bands effect */}
      <Sphere args={[4.18, 64, 64]}>
        <meshBasicMaterial
          color="#ffcc88"
          transparent
          opacity={0.04}
          side={THREE.FrontSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </group>
  );
};

// Texture preloader component
const TexturePreloader = () => {
  useLoader(TextureLoader, '/assets/images/planets/4k/jupitermap.jpg');
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

// Main JupiterSphere component
const JupiterSphere = ({ 
  className = "", 
  fallbackToEclipse = false,
  scaleFactor = 1,
  rotationY = null
}) => {
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
          background: 'radial-gradient(ellipse at center, rgba(212,165,116,0.8) 40%, rgba(212,165,116,0.3) 70%, rgba(0,0,0,0) 100%)'
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 80% 20%, rgba(0,0,0,0.25) 0%, transparent 50%)',
            filter: 'blur(20px)',
            pointerEvents: 'none'
          }}
        ></div>
        {/* Gas giant bands effect in fallback */}
        <div
          style={{
            position: 'absolute',
            width: '90%',
            height: '90%',
            borderRadius: '50%',
            background: 'linear-gradient(0deg, transparent 0%, rgba(255,204,136,0.2) 25%, transparent 50%, rgba(255,204,136,0.2) 75%, transparent 100%)',
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
          <JupiterScene scaleFactor={scaleFactor} rotationY={rotationY} />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

// Export metadata for LEGIT compliance
export const metadata = {
  id: 'jupiter_sphere_cinematic',
  scs: 'SCS-PLANETARY-JUPITER',
  type: 'atomic',
  doc: 'contract_jupiter_sphere.md',
  base: 'MoonSphere.jsx',
  future_use: 'AEGIS page integration'
};

export default JupiterSphere; 